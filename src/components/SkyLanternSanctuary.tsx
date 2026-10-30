import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Send, Wind, Flame } from 'lucide-react';

interface SkyLantern {
  id: string;
  prayer: string;
  sender: string;
  x: number; // percentage across screen 10-90%
  speed: number;
  scale: number;
  swayPhase: number;
}

export const SkyLanternSanctuary: React.FC = () => {
  const [lanterns, setLanterns] = useState<SkyLantern[]>([
    {
      id: 'l-1',
      prayer: 'May all families be blessed with health & laughter',
      sender: 'Ananya',
      x: 25,
      speed: 0.15,
      scale: 0.85,
      swayPhase: 0,
    },
    {
      id: 'l-2',
      prayer: 'সকলের জীবন সুখ ও শান্তিতে ভরে উঠুক (Peace for all)',
      sender: 'Sourav',
      x: 70,
      speed: 0.12,
      scale: 0.9,
      swayPhase: 2.1,
    },
    {
      id: 'l-3',
      prayer: 'Wisdom to lead with courage and kindness',
      sender: 'Karan',
      x: 48,
      speed: 0.18,
      scale: 1,
      swayPhase: 4.5,
    },
  ]);

  const [prayerInput, setPrayerInput] = useState('');
  const [senderInput, setSenderInput] = useState('');
  const [isReleasing, setIsReleasing] = useState(false);

  // Lantern ascending animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setLanterns((prev) =>
        prev.map((l) => ({
          ...l,
          swayPhase: l.swayPhase + 0.03,
        }))
      );
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleRelease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerInput.trim()) return;

    soundEngine.playEnvelopeOpenSound();

    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#F7C85B', '#FFA439', '#FFF1D0'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }

    const newLantern: SkyLantern = {
      id: `l-${Date.now()}`,
      prayer: prayerInput.trim(),
      sender: senderInput.trim() || 'A Soul in Prayer',
      x: Math.random() * 60 + 20, // 20% to 80%
      speed: Math.random() * 0.08 + 0.12,
      scale: Math.random() * 0.2 + 0.9,
      swayPhase: Math.random() * Math.PI * 2,
    };

    setLanterns((prev) => [newLantern, ...prev]);
    setPrayerInput('');
    setIsReleasing(true);
    setTimeout(() => setIsReleasing(false), 2000);
  };

  return (
    <section id="sky-lanterns" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background celestial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#101D48]/40 to-transparent pointer-events-none" />
      {/* Starfield overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_2px_at_20%_20%,#fff4_0%,transparent_70%)] opacity-30 animate-pulse-slow" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 relative">
          {/* Decorative animated stars */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 w-6 h-6 bg-galaxy-gold rounded-full opacity-30 animate-pulse-slow" style={{ transform: 'translateX(-50%)' }} />
            <div className="absolute bottom-0 right-1/3 w-4 h-4 bg-galaxy-gold rounded-full opacity-30 animate-pulse-slow" />
            <div className="absolute top-2 left-2 w-2 h-2 bg-galaxy-gold rounded-full opacity-20 animate-spin-slow" />
          </div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-galaxy-gold/15 border border-galaxy-gold/30 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 animate-pulse-slow">
            <Wind className="w-4 h-4 text-galaxy-gold" />
            <span>Sacred Akash Deep Ritual</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-galaxy-ivory tracking-tight mb-3 animate-fade-in">
            Release a Sky Lantern of Light
          </h2>
          <p className="text-sm sm:text-base text-galaxy-ivory/80 leading-relaxed font-sans animate-fade-in">
            In sacred Diwali tradition, sky lanterns carry our silent prayers upward into the starlight. Write a prayer or blessing to set free into the cosmos.
          </p>
        </div>

        {/* The Lantern Sky Viewport */}
        <div className="relative w-full h-[360px] sm:h-[440px] rounded-3xl glass-panel-gold border border-galaxy-gold/30 overflow-hidden mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[radial-gradient(circle,_#fff4_0.5px,_transparent_0.5px)] bg-[size:3px_3px]">
          {/* Subtle starry background inside viewport */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1C2C65]/50 via-[#0B1538]/70 to-[#070D22]/90 pointer-events-none" />

          {/* Floating Lanterns */}
          {/* Enhanced starry background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-4 h-4 bg-galaxy-gold rounded-full opacity-30 animate-pulse-slow" />
            <div className="absolute bottom-0 right-1/4 w-6 h-6 bg-galaxy-gold rounded-full opacity-30 animate-pulse-slow" />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-galaxy-gold rounded-full opacity-20 animate-spin-slow" />
          </div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {lanterns.map((l, index) => {
              const swayX = Math.sin(l.swayPhase) * 14;
              // Staggered vertical position with smooth floating
              const topPos = 20 + (index % 4) * 70 + Math.sin(l.swayPhase * 0.8) * 10;

              return (
                <div
                  key={l.id}
                  style={{
                    left: `calc(${l.x}% + ${swayX}px)`,
                    top: `${topPos}px`,
                    transform: `scale(${l.scale})`,
                    transition: 'left 0.8s ease-out, top 1.5s ease-out',
                  }}
                  className="absolute pointer-events-auto cursor-pointer group flex flex-col items-center select-none"
                  title={`${l.prayer} — ${l.sender}`}
                >
                  {/* Glowing Lantern SVG */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-galaxy-gold/40 filter blur-md animate-pulse" />
                    <svg width="44" height="60" viewBox="0 0 100 130" className="relative drop-shadow-[0_0_15px_rgba(247,200,91,0.9)]">
                      {/* Lantern Paper Body */}
                      <path
                        d="M20 30 Q50 15 80 30 Q88 85 75 110 Q50 120 25 110 Q12 85 20 30 Z"
                        fill="url(#lanternGlowGrad)"
                        stroke="#F7C85B"
                        strokeWidth="1.5"
                      />
                      {/* Inner Candle Flame */}
                      <circle cx="50" cy="95" r="9" fill="#FFF1D0" className="diya-flame-anim" />
                      <circle cx="50" cy="95" r="18" fill="#F7C85B" opacity="0.6" filter="blur(4px)" />
                      {/* Base Ring */}
                      <ellipse cx="50" cy="110" rx="25" ry="5" fill="#8C4A14" stroke="#F7C85B" strokeWidth="1" />
                      <defs>
                        <radialGradient id="lanternGlowGrad" cx="50%" cy="80%" r="65%">
                          <stop offset="0%" stopColor="#FFF1D0" />
                          <stop offset="40%" stopColor="#F7C85B" />
                          <stop offset="80%" stopColor="#FF7A00" stopOpacity="0.85" />
                          <stop offset="100%" stopColor="#C0392B" stopOpacity="0.7" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Prayer Preview Tooltip */}
                  <div className="mt-1 px-2.5 py-1 rounded-lg bg-galaxy-gold/20 border border-galaxy-gold/40 text-[10px] text-galaxy-midnight/90 opacity-80 group-hover:opacity-100 max-w-[170px] text-center truncate shadow-lg transition-opacity">
                    “{l.prayer}”
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom horizon starlight prompt */}
          <div className="absolute bottom-3 inset-x-0 text-center text-xs text-galaxy-lavender/60 pointer-events-none">
            ✦ Hover over any floating lantern to read prayers sent across the cosmos ✦
          </div>
        </div>

        {/* Lantern Release Form */}
        <div className="max-w-xl mx-auto glass-panel-gold rounded-2xl p-5 sm:p-7 border border-galaxy-gold/30 backdrop-blur-xl shadow-[0_0_20px_rgba(247,200,91,0.4)] animate-fade-in" style={{ background: 'rgba(10,15,30,0.6)' }}>
          <form onSubmit={handleRelease} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={senderInput}
                  onChange={(e) => setSenderInput(e.target.value)}
                  placeholder="e.g. Diya"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-galaxy-midnight/80 border border-galaxy-gold/25 text-galaxy-ivory text-xs focus:ring-1 focus:ring-galaxy-gold focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-1">
                  Your Prayer / Sacred Wish <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  maxLength={120}
                  value={prayerInput}
                  onChange={(e) => setPrayerInput(e.target.value)}
                  placeholder="e.g. Good health, inner peace, and happiness for everyone..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-galaxy-midnight/80 border border-galaxy-gold/25 text-galaxy-ivory text-xs focus:ring-1 focus:ring-galaxy-gold focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!prayerInput.trim() || isReleasing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Flame className="w-4 h-4 text-galaxy-midnight fill-current" />
              <span>{isReleasing ? 'Illuminating & Ascending...' : 'Ignite & Release Lantern into the Sky'}</span>
              <Send className="w-3.5 h-3.5 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
