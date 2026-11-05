import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Send, Wind, Flame, Sparkles, Star, Heart } from 'lucide-react';

interface SkyLantern {
  id: string;
  prayer: string;
  sender: string;
  x: number; // percentage 10-90%
  y: number; // percentage 5-90%
  speed: number;
  scale: number;
  swayPhase: number;
  hueOffset?: number;
}

const INITIAL_LANTERNS: SkyLantern[] = [
  {
    id: 'l-1',
    prayer: 'May all families be blessed with health, peace & boundless joy',
    sender: 'Ananya & Family',
    x: 22,
    y: 42,
    speed: 0.12,
    scale: 0.95,
    swayPhase: 0.4,
  },
  {
    id: 'l-2',
    prayer: 'সকলের জীবন সুখ ও শান্তিতে ভরে উঠুক (Peace & light for all beings)',
    sender: 'Sourav',
    x: 68,
    y: 28,
    speed: 0.09,
    scale: 0.88,
    swayPhase: 2.3,
  },
  {
    id: 'l-3',
    prayer: 'Wisdom to lead with compassion, courage and inner quiet',
    sender: 'Karan',
    x: 44,
    y: 60,
    speed: 0.15,
    scale: 1.05,
    swayPhase: 4.8,
  },
  {
    id: 'l-4',
    prayer: 'सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः (May all be happy and free from illness)',
    sender: 'Rohan & Meera',
    x: 82,
    y: 18,
    speed: 0.08,
    scale: 0.82,
    swayPhase: 1.2,
  },
  {
    id: 'l-5',
    prayer: 'May darkness in every home be dispelled by divine wisdom and love',
    sender: 'Devika',
    x: 12,
    y: 72,
    speed: 0.14,
    scale: 0.9,
    swayPhase: 3.5,
  },
];

const INSPIRATION_PRAYERS = [
  'सर्वे भवन्तु सुखिनः (Peace & joy for all beings)',
  'Health, vitality & harmony for our families',
  'Wisdom to dissolve darkness with gentle love',
  'Abundance, prosperity & fulfillment in every home',
];

export const SkyLanternSanctuary: React.FC = () => {
  const [lanterns, setLanterns] = useState<SkyLantern[]>(INITIAL_LANTERNS);
  const [prayerInput, setPrayerInput] = useState('');
  const [senderInput, setSenderInput] = useState('');
  const [isReleasing, setIsReleasing] = useState(false);
  const [hoveredLantern, setHoveredLantern] = useState<SkyLantern | null>(null);
  const [releasedTotal, setReleasedTotal] = useState(148);

  // Gentle real-time ascending and swaying loop
  useEffect(() => {
    const interval = setInterval(() => {
      setLanterns((prev) =>
        prev.map((l) => {
          let newY = l.y - l.speed * 0.4;
          // Wrap around smoothly when reaching top of the sky
          if (newY < -12) {
            newY = 105;
          }
          return {
            ...l,
            y: newY,
            swayPhase: l.swayPhase + 0.025,
          };
        })
      );
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleRelease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerInput.trim()) return;

    soundEngine.playEnvelopeOpenSound();

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#FF8C00', '#B9B8FF'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }

    const newLantern: SkyLantern = {
      id: `l-${Date.now()}`,
      prayer: prayerInput.trim(),
      sender: senderInput.trim() || 'A Soul in Prayer',
      x: Math.random() * 65 + 18, // 18% to 83%
      y: 92, // starts at bottom and rises up
      speed: Math.random() * 0.06 + 0.12,
      scale: Math.random() * 0.2 + 0.95,
      swayPhase: Math.random() * Math.PI * 2,
    };

    setLanterns((prev) => [newLantern, ...prev]);
    setPrayerInput('');
    setReleasedTotal((prev) => prev + 1);
    setIsReleasing(true);
    setTimeout(() => setIsReleasing(false), 2200);
  };

  const handleQuickPrayer = (prayer: string) => {
    setPrayerInput(prayer);
  };

  return (
    <section id="sky-lanterns" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Deep Celestial Nebula Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1538]/60 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-galaxy-amber/15 via-galaxy-royal/20 to-transparent filter blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 relative">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-galaxy-gold/15 border border-galaxy-gold/30 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(247,200,91,0.2)] backdrop-blur-md">
            <Wind className="w-4 h-4 text-galaxy-gold animate-pulse" />
            <span>Sacred Akash Deep Ritual ✦ आकाशदीप पूजा</span>
          </div>

          <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4 text-galaxy-ivory">
            <span className="gold-gradient-text drop-shadow-[0_4px_24px_rgba(247,200,91,0.35)]">
              Release a Sky Lantern of Light
            </span>
          </h2>

          <p className="text-base sm:text-lg text-galaxy-ivory/85 leading-relaxed font-sans max-w-2xl mx-auto">
            In sacred Diwali tradition, the <em>Akash Deep</em> is lit and sent into the nocturnal sky to guide ancestors,
            carry gratitude, and send heartfelt prayers soaring into the cosmos.
          </p>

          <div className="mt-4 flex items-center justify-center space-x-2 text-xs sm:text-sm text-galaxy-lavender/80">
            <Sparkles className="w-4 h-4 text-galaxy-gold" />
            <span><strong>{releasedTotal}</strong> Sacred Prayers Released Into the Starlight</span>
          </div>
        </div>

        {/* The Enchanted Celestial Sky Viewport */}
        <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl glass-panel-gold border border-galaxy-gold/40 overflow-hidden mb-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
          {/* Deep Midnight Sky Gradient with Cosmic Horizon */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050B20] via-[#0A163D] to-[#122359] pointer-events-none" />

          {/* Twinkling Constellation Starfield */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,_#fff9_1px,_transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,_#F7C85B66_1.5px,_transparent_1.5px)] bg-[size:64px_64px] opacity-60 pointer-events-none animate-pulse-slow" />

          {/* Golden Starlight Crescent Moon & Aura */}
          <div className="absolute top-6 right-10 pointer-events-none flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-galaxy-gold/15 filter blur-xl animate-pulse-slow" />
            <svg width="40" height="40" viewBox="0 0 100 100" className="relative drop-shadow-[0_0_15px_rgba(247,200,91,0.8)]">
              <path
                d="M50 10 A40 40 0 1 0 90 50 A32 32 0 1 1 50 10 Z"
                fill="#FFF1D0"
              />
            </svg>
          </div>

          {/* Floating Atmospheric Clouds */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#080F27] via-[#080F27]/60 to-transparent pointer-events-none z-10" />

          {/* Floating Sky Lanterns Canvas */}
          <div className="absolute inset-0 overflow-hidden">
            {lanterns.map((l) => {
              const swayX = Math.sin(l.swayPhase) * 16;
              const isHovered = hoveredLantern?.id === l.id;

              return (
                <div
                  key={l.id}
                  style={{
                    left: `calc(${l.x}% + ${swayX}px)`,
                    top: `${l.y}%`,
                    transform: `scale(${isHovered ? l.scale * 1.15 : l.scale})`,
                    transition: 'transform 0.3s ease, filter 0.3s ease',
                  }}
                  onMouseEnter={() => setHoveredLantern(l)}
                  onMouseLeave={() => setHoveredLantern(null)}
                  className="absolute pointer-events-auto cursor-pointer group flex flex-col items-center select-none z-20"
                >
                  {/* Glowing Lantern SVG & Pulsing Flame Aura */}
                  <div className="relative">
                    {/* Golden Light Bloom Aura */}
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-t from-galaxy-amber via-galaxy-gold to-yellow-200 opacity-60 filter blur-lg animate-pulse" />

                    <svg width="50" height="68" viewBox="0 0 100 135" className="relative drop-shadow-[0_0_20px_rgba(247,200,91,0.95)]">
                      <defs>
                        <radialGradient id={`lanternSilk-${l.id}`} cx="50%" cy="80%" r="70%">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="20%" stopColor="#FFF2D6" />
                          <stop offset="55%" stopColor="#F7C85B" />
                          <stop offset="85%" stopColor="#FF7A00" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#D9383A" stopOpacity="0.8" />
                        </radialGradient>
                        <linearGradient id={`bambooRing-${l.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8C4A14" />
                          <stop offset="50%" stopColor="#F7C85B" />
                          <stop offset="100%" stopColor="#8C4A14" />
                        </linearGradient>
                      </defs>

                      {/* Translucent Traditional Paper Silk Lantern Body */}
                      <path
                        d="M20 28 Q50 12 80 28 Q90 85 76 112 Q50 122 24 112 Q10 85 20 28 Z"
                        fill={`url(#lanternSilk-${l.id})`}
                        stroke="#F7C85B"
                        strokeWidth="1.5"
                      />

                      {/* Paper Ribbing Structure Lines */}
                      <path d="M35 22 Q42 70 36 116" stroke="#FFA439" strokeWidth="0.8" opacity="0.6" fill="none" />
                      <path d="M50 18 Q50 70 50 118" stroke="#FFA439" strokeWidth="1" opacity="0.7" fill="none" />
                      <path d="M65 22 Q58 70 64 116" stroke="#FFA439" strokeWidth="0.8" opacity="0.6" fill="none" />

                      {/* Central Sacred Candle Flame */}
                      <g className="diya-flame-anim">
                        <circle cx="50" cy="98" r="10" fill="#FFF1D0" />
                        <circle cx="50" cy="98" r="22" fill="#F7C85B" opacity="0.75" filter="blur(6px)" />
                        <path d="M50 78 C46 88 44 94 50 104 C56 94 54 88 50 78 Z" fill="#FFFFFF" />
                      </g>

                      {/* Bamboo Base Hoop */}
                      <ellipse cx="50" cy="115" rx="26" ry="6" fill={`url(#bambooRing-${l.id})`} stroke="#F7C85B" strokeWidth="1.2" />

                      {/* Sacred Auspicious Tassels */}
                      <path d="M50 121 L50 133" stroke="#D9383A" strokeWidth="1.5" />
                      <circle cx="50" cy="134" r="2" fill="#F7C85B" />
                    </svg>
                  </div>

                  {/* Prayer Preview Label / Tooltip */}
                  <motion.div
                    initial={{ opacity: 0.85 }}
                    animate={{ opacity: isHovered ? 1 : 0.85 }}
                    className={`mt-2 px-3 py-1.5 rounded-xl border text-xs max-w-[200px] text-center shadow-2xl transition-all backdrop-blur-md ${
                      isHovered
                        ? 'bg-galaxy-midnight/95 border-galaxy-gold text-galaxy-gold scale-105 z-30'
                        : 'bg-galaxy-midnight/70 border-galaxy-gold/30 text-galaxy-ivory/90'
                    }`}
                  >
                    <p className="line-clamp-2 italic font-serif leading-tight">
                      “{l.prayer}”
                    </p>
                    <p className="text-[10px] text-galaxy-amber font-sans font-semibold mt-0.5">
                      — {l.sender}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Bottom horizon starlight prompt */}
          <div className="absolute bottom-4 inset-x-0 text-center text-xs text-galaxy-lavender/90 pointer-events-none z-20 flex items-center justify-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-galaxy-gold animate-spin-slow" />
            <span>Hover over any floating lantern to read prayers sent across the cosmos</span>
            <Sparkles className="w-3.5 h-3.5 text-galaxy-gold animate-spin-slow" />
          </div>
        </div>

        {/* Interactive Lantern Release Studio Card */}
        <div className="max-w-2xl mx-auto glass-panel-gold rounded-3xl p-6 sm:p-8 border border-galaxy-gold/40 shadow-[0_15px_40px_rgba(247,200,91,0.25)] relative">
          <div className="flex items-center space-x-2 text-galaxy-gold text-sm font-semibold mb-4">
            <Flame className="w-4 h-4 text-galaxy-amber animate-pulse" />
            <span>Light Your Own Celestial Lantern</span>
          </div>

          {/* Quick Prayer Inspirations */}
          <div className="mb-5">
            <span className="block text-xs text-galaxy-lavender/80 mb-2 font-medium">
              ✦ Or choose a sacred prayer inspiration:
            </span>
            <div className="flex flex-wrap gap-2">
              {INSPIRATION_PRAYERS.map((ip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickPrayer(ip)}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-galaxy-gold/20 border border-galaxy-gold/25 text-galaxy-ivory hover:text-galaxy-gold text-xs transition-colors text-left"
                >
                  {ip}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleRelease} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={senderInput}
                  onChange={(e) => setSenderInput(e.target.value)}
                  placeholder="e.g. Priyanshu"
                  className="w-full px-4 py-3 rounded-xl bg-galaxy-midnight/90 border border-galaxy-gold/30 text-galaxy-ivory text-sm focus:border-galaxy-gold focus:ring-2 focus:ring-galaxy-gold/20 focus:outline-none transition-all placeholder:text-galaxy-lavender/40"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-1.5">
                  Your Sacred Prayer / Blessing <span className="text-galaxy-amber">*</span>
                </label>
                <input
                  type="text"
                  maxLength={140}
                  value={prayerInput}
                  onChange={(e) => setPrayerInput(e.target.value)}
                  placeholder="Write your heart's prayer to send into the starlight..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-galaxy-midnight/90 border border-galaxy-gold/30 text-galaxy-ivory text-sm focus:border-galaxy-gold focus:ring-2 focus:ring-galaxy-gold/20 focus:outline-none transition-all placeholder:text-galaxy-lavender/40"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!prayerInput.trim() || isReleasing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 hover:from-yellow-300 hover:to-galaxy-amber text-galaxy-midnight font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(247,200,91,0.4)] hover:shadow-[0_0_35px_rgba(247,200,91,0.6)] active:scale-[0.98] transition-all flex items-center justify-center space-x-2.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Flame className="w-5 h-5 text-galaxy-midnight fill-current" />
              <span>
                {isReleasing ? 'Illuminating & Ascending into Starlight...' : 'Ignite & Send Lantern Into the Cosmos'}
              </span>
              <Send className="w-4 h-4 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
