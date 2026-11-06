import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BLESSINGS_LIST } from '../utils/wishTemplates';
import { BlessingItem, DiyaState } from '../types/wish';
import { BlessingReveal } from './BlessingReveal';
import { soundEngine } from '../utils/soundEffects';
import { Flame, RotateCcw, Sparkles, Sun, Star } from 'lucide-react';

const INITIAL_DIYAS: DiyaState[] = [
  { id: 1, name: 'Arogya Diya',  meaning: 'Health & Vitality',    isLit: false, blessing: BLESSINGS_LIST[0] },
  { id: 2, name: 'Shanti Diya',  meaning: 'Inner Serenity',       isLit: false, blessing: BLESSINGS_LIST[1] },
  { id: 3, name: 'Lakshmi Diya', meaning: 'Endless Abundance',    isLit: false, blessing: BLESSINGS_LIST[2] },
  { id: 4, name: 'Vidya Diya',   meaning: 'Wisdom & Light',       isLit: false, blessing: BLESSINGS_LIST[3] },
  { id: 5, name: 'Preeti Diya',  meaning: 'Cosmic Love',          isLit: false, blessing: BLESSINGS_LIST[4] },
  { id: 6, name: 'Vijaya Diya',  meaning: 'Noble Victory',        isLit: false, blessing: BLESSINGS_LIST[5] },
  { id: 7, name: 'Ananda Diya',  meaning: 'Eternal Joy',          isLit: false, blessing: BLESSINGS_LIST[6] },
];

export const DiyaGarden: React.FC = () => {
  const [diyas, setDiyas] = useState<DiyaState[]>(INITIAL_DIYAS);
  const [activeBlessing, setActiveBlessing] = useState<BlessingItem | null>(null);

  const litCount = diyas.filter((d) => d.isLit).length;
  const progressPercent = Math.round((litCount / diyas.length) * 100);
  const allLit = litCount === diyas.length;

  const handleLightDiya = (id: number, event?: React.MouseEvent) => {
    soundEngine.playDiyaLightSound();
    try {
      const rect = event?.currentTarget?.getBoundingClientRect();
      const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
      const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.6;
      confetti({ particleCount: 45, spread: 65, origin: { x, y }, colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#FF6B6B'], disableForReducedMotion: true });
    } catch { /* ignore */ }

    setDiyas((prev) => prev.map((d) => d.id === id ? { ...d, isLit: true } : d));
    const targetDiya = diyas.find((d) => d.id === id);
    if (targetDiya) setActiveBlessing(targetDiya.blessing);
  };

  const handleLightAll = () => {
    soundEngine.playDiyaLightSound();
    confetti({ particleCount: 140, spread: 110, origin: { y: 0.55 }, colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#B9B8FF', '#FF5500'] });
    setDiyas((prev) => prev.map((d) => ({ ...d, isLit: true })));
    setActiveBlessing(BLESSINGS_LIST[Math.floor(Math.random() * BLESSINGS_LIST.length)]);
  };

  const handleReset = () => { setDiyas(INITIAL_DIYAS); setActiveBlessing(null); };

  return (
    <section id="light-diya" className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* ── Dynamic Aurora that grows as diyas are lit ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        animate={{ opacity: 0.3 + (litCount / diyas.length) * 0.55 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-gradient-to-r from-galaxy-amber/30 via-galaxy-gold/35 to-amber-600/25 rounded-full blur-[160px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-galaxy-nebula/40 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-galaxy-gold/15 rounded-full blur-[120px]" />
      </motion.div>

      {/* ── Floating Stardust Embers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-galaxy-gold"
            style={{
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              top: `${(i * 19 + 5) % 100}%`,
              left: `${(i * 31 + 10) % 100}%`,
            }}
            animate={{ y: [0, -35 - (i % 20), 0], opacity: [0.1, 0.7, 0.1] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.22 }}
          />
        ))}
      </div>

      {/* ── Orbiting Decorative Stars around header ── */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none -z-10" aria-hidden="true">
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2"
            style={{ transformOrigin: '0 0' }}
            animate={{ rotate: [deg, deg + 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
          >
            <div
              className="absolute w-1.5 h-1.5 rounded-full bg-galaxy-gold opacity-40"
              style={{ top: '-120px', left: 0 }}
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          {/* Sanskrit badge */}
          <motion.div
            className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-gradient-to-r from-galaxy-gold/15 via-galaxy-amber/20 to-galaxy-gold/15 border border-galaxy-gold/40 text-galaxy-gold text-xs sm:text-sm font-medium tracking-wider uppercase mb-5 shadow-[0_0_25px_rgba(247,200,91,0.25)] backdrop-blur-md"
            animate={{ boxShadow: ['0 0 15px rgba(247,200,91,0.2)', '0 0 35px rgba(247,200,91,0.5)', '0 0 15px rgba(247,200,91,0.2)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Flame className="w-4 h-4 text-galaxy-amber" />
            </motion.span>
            <span className="font-serif">दीपज्योतिः परब्रह्म दीपज्योतिर्जनार्दनः</span>
          </motion.div>

          <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-5">
            <motion.span
              className="gold-gradient-text drop-shadow-[0_4px_24px_rgba(247,200,91,0.4)] inline-block"
              animate={{ textShadow: ['0 0 20px rgba(247,200,91,0.3)', '0 0 50px rgba(247,200,91,0.7)', '0 0 20px rgba(247,200,91,0.3)'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Ignite Light in the Universe
            </motion.span>
          </h2>

          <p className="text-base sm:text-lg text-galaxy-ivory/85 leading-relaxed font-sans max-w-2xl mx-auto">
            Each diya carries an eternal Vedic blessing. Touch any lamp to awaken its sacred flame,
            dissolve cosmic darkness, and reveal the auspicious fortune destined for you.
          </p>

          {/* ── Cosmic Illumination Progress Meter ── */}
          <motion.div
            className="mt-10 max-w-md mx-auto p-5 rounded-2xl glass-panel border border-galaxy-gold/30 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-3">
              <span className="flex items-center space-x-1.5 text-galaxy-ivory">
                <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
                  <Sun className="w-4 h-4 text-galaxy-gold" />
                </motion.span>
                <span>Cosmic Illumination</span>
              </span>
              <motion.span
                key={litCount}
                initial={{ scale: 1.4, color: '#F7C85B' }}
                animate={{ scale: 1, color: '#F7C85B' }}
                transition={{ duration: 0.4 }}
                className="font-mono font-bold text-galaxy-gold"
              >
                {litCount} / {diyas.length} Diyas ({progressPercent}%)
              </motion.span>
            </div>

            {/* Progress track */}
            <div className="w-full h-3 bg-galaxy-midnight/80 rounded-full overflow-hidden border border-galaxy-gold/30 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 rounded-full relative"
              >
                {progressPercent > 0 && (
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(247,200,91,0.9)] -mr-2"
                    animate={{ boxShadow: ['0 0 6px rgba(247,200,91,0.6)', '0 0 18px rgba(247,200,91,1)', '0 0 6px rgba(247,200,91,0.6)'] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            </div>

            {/* Diya dots row */}
            <div className="flex justify-between mt-2.5 px-0.5">
              {diyas.map((d) => (
                <motion.div
                  key={d.id}
                  className={`w-2 h-2 rounded-full ${d.isLit ? 'bg-galaxy-gold' : 'bg-white/15'}`}
                  animate={d.isLit ? { scale: [1, 1.5, 1], boxShadow: ['0 0 4px #F7C85B', '0 0 12px #F7C85B', '0 0 4px #F7C85B'] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {!allLit ? (
                <motion.button
                  type="button"
                  onClick={handleLightAll}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(247,200,91,0.5)' }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-galaxy-gold/20 via-galaxy-amber/25 to-galaxy-gold/20 hover:from-galaxy-gold/35 hover:to-galaxy-amber/40 border border-galaxy-gold/50 text-xs sm:text-sm text-galaxy-ivory hover:text-galaxy-gold font-semibold tracking-wide transition-all shadow-[0_0_18px_rgba(247,200,91,0.25)] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-galaxy-gold animate-spin-slow" />
                  <span>Light All Diyas</span>
                </motion.button>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-full bg-galaxy-gold/20 border border-galaxy-gold/50 text-xs font-semibold text-galaxy-gold"
                >
                  <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
                    <Star className="w-3.5 h-3.5 fill-galaxy-gold" />
                  </motion.span>
                  <span>The Universe is Fully Radiating! ✦</span>
                </motion.div>
              )}

              {litCount > 0 && (
                <motion.button
                  type="button"
                  onClick={handleReset}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-xs sm:text-sm text-galaxy-lavender hover:text-galaxy-ivory transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Relight Again</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Diyas Grid ── */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {diyas.map((diya, index) => {
            const isSeventh = index === 6;
            return (
              <motion.button
                key={diya.id}
                type="button"
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => handleLightDiya(diya.id, e)}
                className={`relative group rounded-3xl p-5 sm:p-6 transition-colors duration-500 flex flex-col items-center text-center outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold min-h-[240px] justify-between cursor-pointer ${
                  isSeventh ? 'col-span-2 sm:col-span-3 lg:col-span-1' : ''
                } ${
                  diya.isLit
                    ? 'glass-panel-gold border-galaxy-gold/70 shadow-[0_0_50px_rgba(247,200,91,0.45)]'
                    : 'glass-panel border-white/10 hover:border-galaxy-gold/50 hover:shadow-[0_0_30px_rgba(247,200,91,0.2)]'
                }`}
                aria-pressed={diya.isLit}
                aria-label={`${diya.name}: ${diya.meaning}. ${diya.isLit ? 'Lit' : 'Tap to light'}`}
              >
                {/* Pulsing aura rings when lit */}
                <AnimatePresence>
                  {diya.isLit && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.5, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-3xl border border-galaxy-gold/50 pointer-events-none"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 rounded-3xl bg-gradient-to-t from-galaxy-gold/20 via-galaxy-amber/10 to-transparent filter blur-xl pointer-events-none"
                      />
                      {/* Shimmer sparkles */}
                      {Array.from({ length: 5 }).map((_, si) => (
                        <motion.div
                          key={si}
                          className="absolute w-1 h-1 rounded-full bg-galaxy-gold pointer-events-none"
                          style={{ top: `${20 + si * 15}%`, left: `${10 + si * 18}%` }}
                          animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: si * 0.4 }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Top Badge */}
                <div className="relative z-10 w-full flex items-center justify-between text-[11px]">
                  <span className={`font-mono font-bold tracking-wider ${diya.isLit ? 'text-galaxy-gold' : 'text-galaxy-lavender/50'}`}>
                    0{diya.id}
                  </span>
                  <motion.span
                    animate={diya.isLit ? { opacity: [0.7, 1, 0.7] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      diya.isLit
                        ? 'bg-galaxy-gold/25 text-galaxy-gold border border-galaxy-gold/50 shadow-[0_0_10px_rgba(247,200,91,0.3)]'
                        : 'bg-white/5 text-galaxy-lavender/60 group-hover:bg-galaxy-gold/10 group-hover:text-galaxy-gold'
                    }`}
                  >
                    {diya.isLit ? '✦ Radiant' : 'Tap to Light'}
                  </motion.span>
                </div>

                {/* Diya SVG */}
                <div className="relative z-10 my-2 sm:my-3 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                  {diya.isLit && (
                    <motion.div
                      className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-600 opacity-60 filter blur-xl"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.75, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}

                  <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    <defs>
                      <radialGradient id={`flameGrad-${diya.id}`} cx="50%" cy="80%" r="65%">
                        <stop offset="0%"   stopColor="#FFFFFF" />
                        <stop offset="30%"  stopColor="#FFF1D0" />
                        <stop offset="65%"  stopColor="#F7C85B" />
                        <stop offset="90%"  stopColor="#FF7A00" />
                        <stop offset="100%" stopColor="#D9383A" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id={`brassRim-${diya.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stopColor={diya.isLit ? '#FFF1D0' : '#8A5832'} />
                        <stop offset="50%"  stopColor={diya.isLit ? '#F7C85B' : '#5E381C'} />
                        <stop offset="100%" stopColor={diya.isLit ? '#8C4A14' : '#2A180C'} />
                      </linearGradient>
                      <linearGradient id={`bowlGrad-${diya.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%"   stopColor={diya.isLit ? '#D49228' : '#4A2A16'} />
                        <stop offset="60%"  stopColor={diya.isLit ? '#8C4A14' : '#2D160A'} />
                        <stop offset="100%" stopColor={diya.isLit ? '#4A2207' : '#170B04'} />
                      </linearGradient>
                    </defs>

                    {/* Flame */}
                    {diya.isLit ? (
                      <g className="diya-flame-anim" style={{ transformOrigin: '60px 58px' }}>
                        <circle cx="60" cy="38" r="24" fill="#F7C85B" opacity="0.3" />
                        <path d="M60 12 C50 30 46 44 60 60 C74 44 70 30 60 12 Z" fill={`url(#flameGrad-${diya.id})`} filter="drop-shadow(0 0 10px #F7C85B)" />
                        <path d="M60 26 C55 36 52 46 60 56 C68 46 65 36 60 26 Z" fill="#FFFFFF" opacity="0.95" />
                        <circle cx="60" cy="48" r="4" fill="#FFF8E7" />
                      </g>
                    ) : (
                      <g className="transition-transform group-hover:scale-110" style={{ transformOrigin: '60px 60px' }}>
                        <path d="M60 60 Q58 52 60 46" stroke="#5A351C" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="60" cy="45" r="2" fill="#2E180B" />
                      </g>
                    )}

                    <ellipse cx="60" cy="66" rx="42" ry="12" fill={`url(#brassRim-${diya.id})`} stroke={diya.isLit ? '#F7C85B' : '#7C4825'} strokeWidth="1.5" />
                    <ellipse cx="60" cy="67" rx="36" ry="7" fill={diya.isLit ? '#662804' : '#1C0D05'} />
                    {diya.isLit && <ellipse cx="60" cy="66" rx="16" ry="3.5" fill="#F7C85B" opacity="0.7" />}
                    <path d="M20 66 Q60 106 100 66 Q88 108 60 108 Q32 108 20 66 Z" fill={`url(#bowlGrad-${diya.id})`} stroke={diya.isLit ? '#F7C85B' : '#5E381C'} strokeWidth="1.5" />
                    <path d="M46 106 Q60 114 74 106 L70 114 Q60 117 50 114 Z" fill={diya.isLit ? '#8C4A14' : '#2D160A'} stroke={diya.isLit ? '#F7C85B' : '#5E381C'} strokeWidth="1" />
                    <circle cx="60" cy="88" r="2.5" fill={diya.isLit ? '#F7C85B' : '#6A3D22'} opacity="0.9" />
                    <circle cx="47" cy="83" r="2"   fill={diya.isLit ? '#F7C85B' : '#6A3D22'} opacity="0.8" />
                    <circle cx="73" cy="83" r="2"   fill={diya.isLit ? '#F7C85B' : '#6A3D22'} opacity="0.8" />
                    <circle cx="36" cy="76" r="1.5" fill={diya.isLit ? '#F7C85B' : '#6A3D22'} opacity="0.7" />
                    <circle cx="84" cy="76" r="1.5" fill={diya.isLit ? '#F7C85B' : '#6A3D22'} opacity="0.7" />
                  </svg>
                </div>

                {/* Name & Meaning */}
                <div className="relative z-10 w-full mt-1">
                  <motion.h3
                    animate={diya.isLit ? { textShadow: ['0 0 8px rgba(247,200,91,0.3)', '0 0 20px rgba(247,200,91,0.7)', '0 0 8px rgba(247,200,91,0.3)'] } : {}}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className={`font-serif font-black text-base sm:text-lg transition-colors ${diya.isLit ? 'text-galaxy-gold' : 'text-galaxy-ivory'}`}
                  >
                    {diya.name}
                  </motion.h3>
                  <p className="text-xs text-galaxy-lavender/80 mt-1 font-sans font-medium line-clamp-1">
                    {diya.meaning}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Blessing Reveal Modal */}
      <BlessingReveal blessing={activeBlessing} onClose={() => setActiveBlessing(null)} />
    </section>
  );
};
