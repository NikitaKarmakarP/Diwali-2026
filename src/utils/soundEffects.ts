// Procedural Web Audio API sound engine for Diwali Galaxy Wishes
// Zero external asset dependencies, zero network requests, instant and customizable

export type SoundscapeType = 'tanpura' | 'bells';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private ambientOscillators: (OscillatorNode | number)[] = [];
  private isAmbientPlaying: boolean = false;
  private currentSoundscape: SoundscapeType = 'tanpura';
  private volume: number = 0.5;

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getSoundscape(): SoundscapeType {
    return this.currentSoundscape;
  }

  public setSoundscape(soundscape: SoundscapeType): void {
    this.currentSoundscape = soundscape;
    if (!this.isMuted && this.isAmbientPlaying) {
      this.stopAmbient();
      setTimeout(() => this.startAmbient(), 300);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0.12 * this.volume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.initContext();
      this.startAmbient();
    }
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.initContext();
      this.startAmbient();
    }
  }

  /**
   * Starts soothing ambient sound according to the chosen soundscape
   */
  public startAmbient(): void {
    if (this.isMuted || this.isAmbientPlaying) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      this.stopAmbient();

      // Master ambient gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.12 * this.volume, ctx.currentTime + 2.5);

      if (this.currentSoundscape === 'tanpura') {
        // Lowpass filter for smooth warmth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, ctx.currentTime);

        masterGain.connect(filter);
        filter.connect(ctx.destination);
        this.ambientGain = masterGain;

        // Base Tanpura frequencies (C#3 fundamental ~ 138.5 Hz, Pa ~ 207.7 Hz, Sa ~ 277.1 Hz, celestial overtone)
        const frequencies = [138.59, 207.65, 277.18, 554.37];

        this.ambientOscillators = frequencies.map((freq, index) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();

          osc.type = index % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.detune.setValueAtTime((index - 1.5) * 4, ctx.currentTime);
          oscGain.gain.setValueAtTime(0.24 / (index + 1), ctx.currentTime);

          osc.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();
          return osc;
        });
      } else {
        // Temple Night Bells Soundscape: periodic gentle chime ripples
        masterGain.connect(ctx.destination);
        this.ambientGain = masterGain;

        const intervalId = window.setInterval(() => {
          if (!this.isAmbientPlaying || this.isMuted) return;
          this.playGentleChimePattern();
        }, 4200);

        this.ambientOscillators = [intervalId as unknown as OscillatorNode];
        this.playGentleChimePattern();
      }

      this.isAmbientPlaying = true;
    } catch (e) {
      console.warn('Failed to start ambient audio:', e);
    }
  }

  private playGentleChimePattern(): void {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const randomNote = notes[Math.floor(Math.random() * notes.length)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(randomNote, now);

    gain.gain.setValueAtTime(0.08 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 3.3);
  }

  public stopAmbient(): void {
    if (!this.isAmbientPlaying) return;
    try {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
      }
      setTimeout(() => {
        this.ambientOscillators.forEach((item) => {
          if (typeof item === 'number') {
            clearInterval(item);
          } else {
            try {
              item.stop();
              item.disconnect();
            } catch {
              // ignore
            }
          }
        });
        this.ambientOscillators = [];
        this.isAmbientPlaying = false;
      }, 450);
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  /**
   * Sound effect when a Diya is lit
   */
  public playDiyaLightSound(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [587.33, 880, 1174.66]; // D5, A5, D6 harmonic chime

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime((0.18 / (idx + 1)) * this.volume, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6 + idx * 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + 2.0);
      });
    } catch (e) {
      console.warn('Diya sound error:', e);
    }
  }

  /**
   * Sound effect when opening the magical wish envelope
   */
  public playEnvelopeOpenSound(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const arpeggio = [440, 554.37, 659.25, 830.61, 880, 1108.73, 1318.51];

      arpeggio.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.15 * this.volume, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.9);
      });
    } catch (e) {
      console.warn('Envelope sound error:', e);
    }
  }

  /**
   * Celebration burst sound
   */
  public playCelebrationSound(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const sparkles = [784, 987.77, 1174.66, 1318.51, 1567.98, 1760];

      sparkles.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.12 * this.volume, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.8);
      });
    } catch (e) {
      console.warn('Celebration sound error:', e);
    }
  }

  /**
   * Sound effect: Rocket Pataka (Whistle ascending sweep + sparkling explosion boom)
   */
  public playRocketSound(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Whistle up
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.6);

      gain.gain.setValueAtTime(0.08 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.65);

      // Boom burst at top
      setTimeout(() => {
        this.playCelebrationSound();
      }, 580);
    } catch (e) {
      console.warn('Rocket sound error:', e);
    }
  }

  /**
   * Sound effect: Anaar / Flowerpot (Cascading roaring fountain sizzle)
   */
  public playAnaarSound(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      for (let i = 0; i < 6; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600 + Math.random() * 800, now + i * 0.12);

        gain.gain.setValueAtTime(0.1 * this.volume, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.35);
      }
    } catch (e) {
      console.warn('Anaar sound error:', e);
    }
  }

  /**
   * Sound effect: Chakri / Ground Spinner (Spinning whir and sizzle)
   */
  public playChakriSound(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(480, now + 0.8);
      osc.frequency.linearRampToValueAtTime(150, now + 1.8);

      gain.gain.setValueAtTime(0.1 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.85);
    } catch (e) {
      console.warn('Chakri sound error:', e);
    }
  }

  /**
   * Sound effect: Ladi / Firecracker String (Rapid rhythmic crackles)
   */
  public playLadiSound(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const count = 10;
      for (let i = 0; i < count; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(280 + Math.random() * 200, now + i * 0.08);

        gain.gain.setValueAtTime(0.14 * this.volume, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.06);
      }
    } catch (e) {
      console.warn('Ladi sound error:', e);
    }
  }
}

export const soundEngine = new SoundEngine();
