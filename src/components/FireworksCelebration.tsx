import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Play, Pause, Flame, Heart, Volume2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

type FireworkStyle = 'golden' | 'rainbow' | 'emerald';

export const FireworksCelebration: React.FC = () => {
  const [isPlayingSkyShow, setIsPlayingSkyShow] = useState<boolean>(false);
  const [activeStyle, setActiveStyle] = useState<FireworkStyle>('golden');
  const [burstCount, setBurstCount] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const styleColors: Record<FireworkStyle, string[]> = {
    golden: ['#F7C85B', '#FFA439', '#FFF1D0', '#FFD700', '#FF8C00'],
    rainbow: ['#FF5E7E', '#A78BFA', '#38BDF8', '#4ADE80', '#FACC15', '#FB923C'],
    emerald: ['#2ECC71', '#00D2D3', '#F7C85B', '#FFF1D0', '#10B981'],
  };

  const triggerCelebration = (e?: React.MouseEvent) => {
    soundEngine.playCelebrationSound();
    setBurstCount((prev) => prev + 1);

    const colors = styleColors[activeStyle];

    if (e && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const originX = Math.max(0.1, Math.min(0.9, (e.clientX - rect.left) / rect.width));
      const originY = Math.max(0.1, Math.min(0.9, (e.clientY - rect.top) / rect.height));

      confetti({
        particleCount: 50,
        spread: 80,
        origin: { x: originX, y: originY },
        colors,
        disableForReducedMotion: true,
      });
      return;
    }

    // Default grand dual-cannon celebration
    const end = Date.now() + 1.4 * 1000;
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0.05, y: 0.75 },
        colors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 0.95, y: 0.75 },
        colors,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Continuous auto sky show loop
  useEffect(() => {
    if (!isPlayingSkyShow) return;

    const interval = setInterval(() => {
      const colors = styleColors[activeStyle];
      const randomX = 0.2 + Math.random() * 0.6;
      const randomY = 0.3 + Math.random() * 0.4;

      confetti({
        particleCount: 35,
        spread: 70,
        startVelocity: 35,
        origin: { x: randomX, y: randomY },
        colors,
        disableForReducedMotion: true,
      });

      soundEngine.playDiyaLightSound();
      setBurstCount((prev) => prev + 1);
    }, 1800);

    return () => clearInterval(interval);
  }, [isPlayingSkyShow, activeStyle]);

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Celestial Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-gradient-to-r from-galaxy-gold/20 via-orange-600/15 to-purple-800/20 rounded-full filter blur-[150px] pointer-events-none -z-10 animate-pulse-slow" />

      {/* Floating Stardust Embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-galaxy-gold"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 19) % 100}%`,
              left: `${(i * 29) % 100}%`,
              opacity: 0.35 + (i % 5) * 0.12,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.25,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          ref={cardRef}
          onClick={(e) => triggerCelebration(e)}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="glass-panel-gold rounded-3xl p-8 sm:p-14 border-2 border-galaxy-gold/45 text-center relative overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.65)] cursor-crosshair group"
        >
          {/* Rotating Celestial Mandala in background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-galaxy-gold/15 rounded-full animate-spin-slow pointer-events-none opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-galaxy-amber/20 rounded-full animate-spin-reverse pointer-events-none opacity-50" />

          {/* Decorative corner sparks */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-galaxy-gold/50 rounded-tl-2xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-galaxy-gold/50 rounded-tr-2xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-galaxy-gold/50 rounded-bl-2xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-galaxy-gold/50 rounded-br-2xl pointer-events-none" />

          {/* Top Pill / Mode Toggles */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-galaxy-midnight/80 border border-galaxy-gold/40 text-galaxy-gold text-xs font-semibold shadow-md">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Tap Anywhere to Spark Firework ✦ {burstCount} Bursts Fired</span>
              </span>

              {/* Sky Show Auto-Play Toggle */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playDiyaLightSound();
                  setIsPlayingSkyShow(!isPlayingSkyShow);
                }}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer ${
                  isPlayingSkyShow
                    ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                    : 'bg-galaxy-midnight/80 border border-white/20 text-galaxy-ivory/80 hover:text-galaxy-gold'
                }`}
                title="Continuous Fireworks Display"
              >
                {isPlayingSkyShow ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Auto Sky Show: ON</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-galaxy-gold" />
                    <span>Auto Sky Show: OFF</span>
                  </>
                )}
              </button>
            </div>

            {/* Main Headline */}
            <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-galaxy-ivory tracking-tight mb-4 leading-tight">
              Celebrate the Triumph of{' '}
              <span className="gold-gradient-text drop-shadow-[0_4px_24px_rgba(247,200,91,0.4)]">
                Light & Boundless Joy
              </span>
            </h2>

            <p className="text-base sm:text-lg text-galaxy-ivory/85 leading-relaxed mb-6 font-sans max-w-xl mx-auto">
              May every dark corner of the world be illuminated with laughter, prosperity, and the eternal warmth of pure love.
            </p>

            {/* Firework Palette Switcher */}
            <div
              className="flex items-center justify-center space-x-2 mb-8 bg-galaxy-midnight/80 p-1.5 rounded-2xl border border-galaxy-gold/30"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[11px] font-semibold text-galaxy-lavender/70 px-2 uppercase tracking-wider font-mono">
                Spark Theme:
              </span>
              {(['golden', 'rainbow', 'emerald'] as FireworkStyle[]).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => {
                    soundEngine.playDiyaLightSound();
                    setActiveStyle(style);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                    activeStyle === style
                      ? 'bg-galaxy-gold text-galaxy-midnight shadow-md'
                      : 'text-galaxy-ivory/70 hover:text-galaxy-gold'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Link
                to="/create"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-base shadow-[0_0_30px_rgba(247,200,91,0.5)] hover:shadow-[0_0_45px_rgba(247,200,91,0.7)] hover:scale-105 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold cursor-pointer"
              >
                <Sparkles className="w-5 h-5 fill-current" />
                <span>Create & Share Cosmic Greeting</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => triggerCelebration()}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-galaxy-midnight/90 hover:bg-galaxy-royal text-galaxy-gold border-2 border-galaxy-gold/40 hover:border-galaxy-gold text-base font-bold transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 fill-current text-galaxy-amber" />
                <span>Grand Firework Burst ✨</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
