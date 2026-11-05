import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BLESSINGS_LIST } from '../utils/wishTemplates';
import { BlessingItem, DiyaState } from '../types/wish';
import { BlessingReveal } from './BlessingReveal';
import { soundEngine } from '../utils/soundEffects';
import { Flame, RotateCcw, Sparkles, Sun, Star } from 'lucide-react';

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
  const progressPercent = Math.round((litCount / diyas.length) * 100);

  const handleLightDiya = (id: number, event?: React.MouseEvent) => {
    soundEngine.playDiyaLightSound();

    try {
      const rect = event?.currentTarget?.getBoundingClientRect();
      const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
      const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.6;

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x, y },
        colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#FF6B6B'],
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
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#B9B8FF', '#FF5500'],
    });
    setDiyas((prev) => prev.map((d) => ({ ...d, isLit: true })));
    setActiveBlessing(BLESSINGS_LIST[Math.floor(Math.random() * BLESSINGS_LIST.length)]);
  };

  const handleReset = () => {
    setDiyas(INITIAL_DIYAS);
    setActiveBlessing(null);
  };

  return (
    <section id="light-diya" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Cosmic Aurora Glow that brightens as more Diyas are lit */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 -z-10"
        style={{ opacity: 0.35 + (litCount / diyas.length) * 0.45 }}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-gradient-to-r from-galaxy-amber/25 via-galaxy-gold/30 to-amber-600/20 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-galaxy-nebula/40 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-galaxy-gold/15 rounded-full blur-[120px]" />
      </div>

      {/* Decorative Floating Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-12 left-[15%] w-2 h-2 rounded-full bg-galaxy-gold/60 animate-ping opacity-75" style={{ animationDuration: '4s' }} />
        <div className="absolute top-28 right-[18%] w-1.5 h-1.5 rounded-full bg-galaxy-amber/80 animate-ping opacity-60" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-20 left-[25%] w-2 h-2 rounded-full bg-galaxy-ivory/50 animate-pulse" />
        <div className="absolute bottom-40 right-[12%] w-1.5 h-1.5 rounded-full bg-galaxy-gold/70 animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 relative">
          {/* Sacred Sanskrit Motto Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-galaxy-gold/15 via-galaxy-amber/20 to-galaxy-gold/15 border border-galaxy-gold/40 text-galaxy-gold text-xs sm:text-sm font-medium tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(247,200,91,0.2)] backdrop-blur-md">
            <Flame className="w-4 h-4 text-galaxy-amber animate-pulse" />
            <span className="font-serif">दीपज्योतिः परब्रह्म दीपज्योतिर्जनार्दनः</span>
          </div>

          <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4">
            <span className="gold-gradient-text drop-shadow-[0_4px_24px_rgba(247,200,91,0.35)]">
              Ignite Light in the Universe
            </span>
          </h2>

          <p className="text-base sm:text-lg text-galaxy-ivory/85 leading-relaxed font-sans max-w-2xl mx-auto">
            Each diya carries an eternal Vedic blessing. Touch any lamp to awaken its sacred flame,
            dissolve cosmic darkness, and reveal the auspicious fortune destined for you.
          </p>

          {/* Interactive Universe Illumination Meter */}
          <div className="mt-8 max-w-md mx-auto p-4 rounded-2xl glass-panel border border-galaxy-gold/25 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-2.5">
              <span className="flex items-center space-x-1.5 text-galaxy-ivory">
                <Sun className="w-4 h-4 text-galaxy-gold animate-spin-slow" />
                <span>Cosmic Illumination</span>
              </span>
              <span className="font-mono text-galaxy-gold font-bold">
                {litCount} / {diyas.length} Diyas ({progressPercent}%)
              </span>
            </div>

            {/* Glowing Progress Track */}
            <div className="w-full h-2.5 bg-galaxy-midnight/80 rounded-full overflow-hidden p-0.5 border border-galaxy-gold/30">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 rounded-full shadow-[0_0_12px_rgba(247,200,91,0.8)]"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {litCount < diyas.length ? (
                <button
                  type="button"
                  onClick={handleLightAll}
                  className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-gradient-to-r from-galaxy-gold/20 via-galaxy-amber/25 to-galaxy-gold/20 hover:from-galaxy-gold/30 hover:to-galaxy-amber/35 border border-galaxy-gold/50 text-xs sm:text-sm text-galaxy-ivory hover:text-galaxy-gold font-semibold tracking-wide transition-all duration-300 shadow-[0_0_18px_rgba(247,200,91,0.25)] hover:shadow-[0_0_28px_rgba(247,200,91,0.45)] hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-galaxy-gold" />
                  <span>Light All Diyas</span>
                </button>
              ) : (
                <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-galaxy-gold/20 border border-galaxy-gold/50 text-xs font-semibold text-galaxy-gold animate-pulse">
                  <Star className="w-3.5 h-3.5 fill-galaxy-gold" />
                  <span>The Universe is Fully Radiating!</span>
                </div>
              )}

              {litCount > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-xs sm:text-sm text-galaxy-lavender hover:text-galaxy-ivory transition-all hover:scale-105 active:scale-95"
                  title="Reset all diyas to unlit"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Relight Again</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Diyas Grid with Rich Animated Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {diyas.map((diya, index) => {
            const isSeventh = index === 6;
            return (
              <motion.button
                key={diya.id}
                type="button"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => handleLightDiya(diya.id, e)}
                className={`relative group rounded-3xl p-5 sm:p-6 transition-all duration-500 flex flex-col items-center text-center outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold min-h-[230px] justify-between cursor-pointer ${
                  isSeventh ? 'col-span-2 sm:col-span-3 lg:col-span-1' : ''
                } ${
                  diya.isLit
                    ? 'glass-panel-gold border-galaxy-gold/70 shadow-[0_0_40px_rgba(247,200,91,0.4)]'
                    : 'glass-panel border-white/10 hover:border-galaxy-gold/50 hover:shadow-[0_0_25px_rgba(247,200,91,0.2)]'
                }`}
                aria-pressed={diya.isLit}
                aria-label={`${diya.name}: ${diya.meaning}. Status: ${diya.isLit ? 'Lit' : 'Unlit. Tap to light'}`}
              >
                {/* Luminous Radiance Halo when Lit */}
                {diya.isLit && (
                  <>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-galaxy-gold/20 via-galaxy-amber/15 to-transparent filter blur-xl pointer-events-none animate-pulse-glow" />
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-galaxy-gold/40 via-amber-400/20 to-galaxy-gold/40 opacity-70 blur-sm pointer-events-none" />
                  </>
                )}

                {/* Top Badge: Number & Status */}
                <div className="relative z-10 w-full flex items-center justify-between text-[11px]">
                  <span className={`font-mono font-bold tracking-wider ${diya.isLit ? 'text-galaxy-gold' : 'text-galaxy-lavender/50'}`}>
                    0{diya.id}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      diya.isLit
                        ? 'bg-galaxy-gold/25 text-galaxy-gold border border-galaxy-gold/50 shadow-[0_0_10px_rgba(247,200,91,0.3)]'
                        : 'bg-white/5 text-galaxy-lavender/60 group-hover:bg-galaxy-gold/10 group-hover:text-galaxy-gold'
                    }`}
                  >
                    {diya.isLit ? '✦ Radiant' : 'Tap to Light'}
                  </span>
                </div>

                {/* Diya SVG Vessel & Sacred Flame */}
                <div className="relative z-10 my-2 sm:my-3 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                  {/* Radial golden flame glow aura */}
                  {diya.isLit && (
                    <div className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-600 opacity-60 filter blur-xl animate-pulse" />
                  )}

                  <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    <defs>
                      <radialGradient id={`flameGrad-${diya.id}`} cx="50%" cy="80%" r="65%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="30%" stopColor="#FFF1D0" />
                        <stop offset="65%" stopColor="#F7C85B" />
                        <stop offset="90%" stopColor="#FF7A00" />
                        <stop offset="100%" stopColor="#D9383A" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id={`brassRim-${diya.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={diya.isLit ? '#FFF1D0' : '#8A5832'} />
                        <stop offset="50%" stopColor={diya.isLit ? '#F7C85B' : '#5E381C'} />
                        <stop offset="100%" stopColor={diya.isLit ? '#8C4A14' : '#2A180C'} />
                      </linearGradient>
                      <linearGradient id={`bowlGrad-${diya.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={diya.isLit ? '#D49228' : '#4A2A16'} />
                        <stop offset="60%" stopColor={diya.isLit ? '#8C4A14' : '#2D160A'} />
                        <stop offset="100%" stopColor={diya.isLit ? '#4A2207' : '#170B04'} />
                      </linearGradient>
                    </defs>

                    {/* Sacred Flame */}
                    {diya.isLit ? (
                      <g className="diya-flame-anim" style={{ transformOrigin: '60px 58px' }}>
                        {/* Outer Glow Halo */}
                        <circle cx="60" cy="38" r="24" fill="#F7C85B" opacity="0.3" filter="blur(8px)" />
                        {/* Main Sacred Flame Teardrop */}
                        <path
                          d="M60 12 C50 30 46 44 60 60 C74 44 70 30 60 12 Z"
                          fill={`url(#flameGrad-${diya.id})`}
                          filter="drop-shadow(0 0 10px #F7C85B)"
                        />
                        {/* Inner White-Hot Flame Core */}
                        <path
                          d="M60 26 C55 36 52 46 60 56 C68 46 65 36 60 26 Z"
                          fill="#FFFFFF"
                          opacity="0.95"
                        />
                        <circle cx="60" cy="48" r="4" fill="#FFF8E7" />
                      </g>
                    ) : (
                      /* Unlit Cotton Wick */
                      <g className="transition-transform group-hover:scale-110" style={{ transformOrigin: '60px 60px' }}>
                        <path d="M60 60 Q58 52 60 46" stroke="#5A351C" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="60" cy="45" r="2" fill="#2E180B" />
                      </g>
                    )}

                    {/* Diya Brass Lip & Upper Rim */}
                    <ellipse
                      cx="60"
                      cy="66"
                      rx="42"
                      ry="12"
                      fill={`url(#brassRim-${diya.id})`}
                      stroke={diya.isLit ? '#F7C85B' : '#7C4825'}
                      strokeWidth="1.5"
                    />

                    {/* Oil Reservoir Surface */}
                    <ellipse
                      cx="60"
                      cy="67"
                      rx="36"
                      ry="7"
                      fill={diya.isLit ? '#662804' : '#1C0D05'}
                    />
                    {diya.isLit && (
                      <ellipse
                        cx="60"
                        cy="66"
                        rx="16"
                        ry="3.5"
                        fill="#F7C85B"
                        opacity="0.7"
                        filter="blur(1px)"
                      />
                    )}

                    {/* Diya Clay & Brass Curvature Body */}
                    <path
                      d="M20 66 Q60 106 100 66 Q88 108 60 108 Q32 108 20 66 Z"
                      fill={`url(#bowlGrad-${diya.id})`}
                      stroke={diya.isLit ? '#F7C85B' : '#5E381C'}
                      strokeWidth="1.5"
                    />

                    {/* Decorative Carved Pedestal Base */}
                    <path
                      d="M46 106 Q60 114 74 106 L70 114 Q60 117 50 114 Z"
                      fill={diya.isLit ? '#8C4A14' : '#2D160A'}
                      stroke={diya.isLit ? '#F7C85B' : '#5E381C'}
                      strokeWidth="1"
                    />

                    {/* Traditional Indian Sacred Petal Etchings on Diya Body */}
                    <circle cx="60" cy="88" r="2.5" fill={diya.isLit ? '#F7C85B' : '#6A3D22'} opacity="0.9" />
                    <circle cx="47" cy="83" r="2" fill={diya.isLit ? '#F7C85B' : '#6A3D22'} opacity="0.8" />
                    <circle cx="73" cy="83" r="2" fill={diya.isLit ? '#F7C85B' : '#6A3D22'} opacity="0.8" />
                    <circle cx="36" cy="76" r="1.5" fill={diya.isLit ? '#F7C85B' : '#6A3D22'} opacity="0.7" />
                    <circle cx="84" cy="76" r="1.5" fill={diya.isLit ? '#F7C85B' : '#6A3D22'} opacity="0.7" />
                  </svg>
                </div>

                {/* Diya Name and Meaning */}
                <div className="relative z-10 w-full mt-1">
                  <h3
                    className={`font-serif font-black text-base sm:text-lg transition-colors ${
                      diya.isLit ? 'text-galaxy-gold drop-shadow-[0_2px_10px_rgba(247,200,91,0.5)]' : 'text-galaxy-ivory'
                    }`}
                  >
                    {diya.name}
                  </h3>
                  <p className="text-xs text-galaxy-lavender/80 mt-1 font-sans font-medium line-clamp-1">
                    {diya.meaning}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Blessing Reveal Modal */}
      <BlessingReveal blessing={activeBlessing} onClose={() => setActiveBlessing(null)} />
    </section>
  );
};
