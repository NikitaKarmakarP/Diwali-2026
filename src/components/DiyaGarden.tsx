import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BLESSINGS_LIST } from '../utils/wishTemplates';
import { BlessingItem, DiyaState } from '../types/wish';
import { BlessingReveal } from './BlessingReveal';
import { soundEngine } from '../utils/soundEffects';
import { Flame, RotateCcw, Sparkles } from 'lucide-react';

const INITIAL_DIYAS: DiyaState[] = [
  {
    id: 1,
    name: 'Arogya Diya',
    meaning: 'Health & Vitality',
    isLit: false,
    blessing: BLESSINGS_LIST[0],
  },
  {
    id: 2,
    name: 'Shanti Diya',
    meaning: 'Inner Serenity',
    isLit: false,
    blessing: BLESSINGS_LIST[1],
  },
  {
    id: 3,
    name: 'Lakshmi Diya',
    meaning: 'Endless Abundance',
    isLit: false,
    blessing: BLESSINGS_LIST[2],
  },
  {
    id: 4,
    name: 'Vidya Diya',
    meaning: 'Wisdom & Light',
    isLit: false,
    blessing: BLESSINGS_LIST[3],
  },
  {
    id: 5,
    name: 'Preeti Diya',
    meaning: 'Cosmic Love',
    isLit: false,
    blessing: BLESSINGS_LIST[4],
  },
  {
    id: 6,
    name: 'Vijaya Diya',
    meaning: 'Noble Victory',
    isLit: false,
    blessing: BLESSINGS_LIST[5],
  },
  {
    id: 7,
    name: 'Ananda Diya',
    meaning: 'Eternal Joy',
    isLit: false,
    blessing: BLESSINGS_LIST[6],
  },
];

export const DiyaGarden: React.FC = () => {
  const [diyas, setDiyas] = useState<DiyaState[]>(INITIAL_DIYAS);
  const [activeBlessing, setActiveBlessing] = useState<BlessingItem | null>(null);

  const litCount = diyas.filter((d) => d.isLit).length;

  const handleLightDiya = (id: number, event?: React.MouseEvent) => {
    soundEngine.playDiyaLightSound();

    // Spawn golden particles from click location
    try {
      const rect = event?.currentTarget?.getBoundingClientRect();
      const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
      const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.6;

      confetti({
        particleCount: 35,
        spread: 55,
        origin: { x, y },
        colors: ['#F7C85B', '#FFA439', '#FFF1D0'],
        disableForReducedMotion: true,
      });
    } catch {
      // fallback
    }

    setDiyas((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          return { ...d, isLit: true };
        }
        return d;
      })
    );

    const targetDiya = diyas.find((d) => d.id === id);
    if (targetDiya) {
      setActiveBlessing(targetDiya.blessing);
    }
  };

  const handleLightAll = () => {
    soundEngine.playDiyaLightSound();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#B9B8FF'],
    });
    setDiyas((prev) => prev.map((d) => ({ ...d, isLit: true })));
    setActiveBlessing(BLESSINGS_LIST[Math.floor(Math.random() * BLESSINGS_LIST.length)]);
  };

  const handleReset = () => {
    setDiyas(INITIAL_DIYAS);
    setActiveBlessing(null);
  };

  return (
    <section id="light-diya" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-galaxy-gold/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-galaxy-gold/10 border border-galaxy-gold/30 text-galaxy-gold text-xs sm:text-sm font-medium tracking-wider uppercase mb-3">
            <Flame className="w-4 h-4 text-galaxy-amber" />
            <span>Sacred Garden of Diyas</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-galaxy-ivory tracking-tight mb-4">
            Ignite Light in the Universe
          </h2>
          <p className="text-base sm:text-lg text-galaxy-ivory/80 leading-relaxed font-sans">
            Each diya carries an eternal Vedic blessing. Tap any unlit lamp to awaken its sacred flame,
            dispel ignorance, and unlock the blessing waiting for you.
          </p>

          {/* Lit counter & Controls */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <span className="px-4 py-2 rounded-full bg-galaxy-midnight/80 border border-galaxy-gold/30 text-xs sm:text-sm text-galaxy-gold font-medium">
              ✨ <strong className="text-galaxy-ivory">{litCount}</strong> of{' '}
              <strong className="text-galaxy-ivory">{diyas.length}</strong> Diyas Glowing
            </span>

            {litCount < diyas.length ? (
              <button
                type="button"
                onClick={handleLightAll}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-galaxy-royal/80 hover:bg-galaxy-royal border border-galaxy-gold/40 text-xs sm:text-sm text-galaxy-ivory hover:text-galaxy-gold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-galaxy-gold" />
                <span>Light All Diyas</span>
              </button>
            ) : null}

            {litCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-galaxy-midnight/80 hover:bg-white/10 border border-white/20 text-xs sm:text-sm text-galaxy-lavender hover:text-galaxy-ivory transition-colors"
                title="Reset all diyas to unlit"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Relight Again</span>
              </button>
            )}
          </div>
        </div>

        {/* Diyas Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {diyas.map((diya, index) => {
            const isSeventh = index === 6;
            return (
              <button
                key={diya.id}
                type="button"
                onClick={(e) => handleLightDiya(diya.id, e)}
                className={`relative group rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col items-center text-center outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold min-h-[210px] justify-between ${
                  isSeventh ? 'col-span-2 sm:col-span-3 lg:col-span-1' : ''
                } ${
                  diya.isLit
                    ? 'glass-panel-gold border-galaxy-gold shadow-[0_0_30px_rgba(247,200,91,0.35)] scale-[1.02]'
                    : 'glass-panel border-white/10 hover:border-galaxy-gold/40 hover:scale-[1.02]'
                }`}
                aria-pressed={diya.isLit}
                aria-label={`${diya.name}: ${diya.meaning}. Status: ${diya.isLit ? 'Lit' : 'Unlit. Tap to light'}`}
              >
                {/* Illumination Halo when Lit */}
                {diya.isLit && (
                  <div className="absolute inset-0 rounded-3xl bg-galaxy-gold/15 filter blur-lg pointer-events-none animate-pulse-glow" />
                )}

                {/* Top Status Indicator */}
                <div className="relative z-10 w-full flex items-center justify-between text-[11px]">
                  <span className={`font-mono ${diya.isLit ? 'text-galaxy-gold' : 'text-galaxy-lavender/50'}`}>
                    0{diya.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                      diya.isLit
                        ? 'bg-galaxy-gold/20 text-galaxy-gold border border-galaxy-gold/40'
                        : 'bg-white/5 text-galaxy-lavender/60'
                    }`}
                  >
                    {diya.isLit ? 'Glowing' : 'Tap to Light'}
                  </span>
                </div>

                {/* Diya SVG Vessel & Flame */}
                <div className="relative z-10 my-3 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    {/* Flame (Only visible when lit) */}
                    {diya.isLit ? (
                      <g className="diya-flame-anim">
                        {/* Outer Flame Glow */}
                        <circle cx="50" cy="32" r="22" fill="#F7C85B" opacity="0.35" filter="blur(6px)" />
                        <path
                          d="M50 10 C42 24 40 34 50 48 C60 34 58 24 50 10 Z"
                          fill="#F7C85B"
                          filter="drop-shadow(0 0 8px #FFA439)"
                        />
                        <path
                          d="M50 20 C46 28 44 36 50 46 C56 36 54 28 50 20 Z"
                          fill="#FFFFFF"
                          opacity="0.9"
                        />
                      </g>
                    ) : (
                      /* Unlit Wick */
                      <path d="M50 48 Q49 42 50 38" stroke="#4A2609" strokeWidth="2.5" strokeLinecap="round" />
                    )}

                    {/* Clay Diya Bowl */}
                    <path
                      d="M20 54 Q50 82 80 54 Q72 84 50 84 Q28 84 20 54 Z"
                      fill={diya.isLit ? '#D49228' : '#3E2415'}
                      stroke={diya.isLit ? '#F7C85B' : '#6A3D22'}
                      strokeWidth="1.5"
                    />
                    <ellipse
                      cx="50"
                      cy="54"
                      rx="30"
                      ry="8"
                      fill={diya.isLit ? '#8C4A14' : '#27170E'}
                      stroke={diya.isLit ? '#F7C85B' : '#4E2B17'}
                      strokeWidth="1"
                    />
                  </svg>
                </div>

                {/* Diya Name and Meaning */}
                <div className="relative z-10">
                  <h3
                    className={`font-serif font-bold text-base sm:text-lg transition-colors ${
                      diya.isLit ? 'text-galaxy-gold' : 'text-galaxy-ivory'
                    }`}
                  >
                    {diya.name}
                  </h3>
                  <p className="text-xs text-galaxy-lavender/70 mt-0.5 font-sans line-clamp-1">
                    {diya.meaning}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Blessing Reveal Modal */}
      <BlessingReveal blessing={activeBlessing} onClose={() => setActiveBlessing(null)} />
    </section>
  );
};
