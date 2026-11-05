import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Flame, ArrowRight, Star, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';

export const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleHeroDiyaClick = (e: React.MouseEvent) => {
    soundEngine.playDiyaLightSound();
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 45,
        spread: 75,
        origin: { x, y },
        colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#FF8C00', '#B9B8FF'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden">
      {/* Background Cosmic Aurora Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[750px] h-[420px] sm:h-[750px] bg-gradient-to-r from-galaxy-nebula/35 via-galaxy-gold/20 to-galaxy-amber/25 rounded-full filter blur-[140px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[480px] h-[280px] sm:h-[480px] bg-galaxy-gold/25 rounded-full filter blur-[90px] pointer-events-none -z-10" />

      {/* Floating Animated Starlight Embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{ y: [0, -110], opacity: [0, 0.8, 0], x: [0, 20] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeOut' }}
          className="absolute bottom-24 left-[18%] w-2 h-2 rounded-full bg-galaxy-gold blur-[0.5px]"
        />
        <motion.div
          animate={{ y: [0, -140], opacity: [0, 0.9, 0], x: [0, -25] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeOut', delay: 2.2 }}
          className="absolute bottom-28 right-[22%] w-2.5 h-2.5 rounded-full bg-galaxy-amber blur-[0.5px]"
        />
        <motion.div
          animate={{ y: [0, -90], opacity: [0, 0.6, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeOut', delay: 4 }}
          className="absolute bottom-16 left-[50%] w-1.5 h-1.5 rounded-full bg-yellow-200 blur-[0.5px]"
        />
      </div>

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Central Visual: Luminous Sacred Lotus Mandala + Grand Golden Diya */}
          <motion.div variants={itemVariants} className="relative mb-8 sm:mb-12">
            {/* Pulsing Aura Halo */}
            <div className="absolute inset-0 -m-10 sm:-m-16 rounded-full bg-gradient-to-r from-galaxy-gold/30 via-galaxy-amber/25 to-transparent filter blur-3xl animate-pulse-glow" />

            {/* Rotating Sacred Lotus Mandala */}
            <div
              onClick={handleHeroDiyaClick}
              className="relative w-48 h-48 sm:w-72 sm:h-72 flex items-center justify-center cursor-pointer group"
              title="Click the Sacred Diya to illuminate celestial blessings!"
            >
              {/* Outer Counter-Rotating Geometric Star Mandala */}
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full text-galaxy-gold/20 select-none pointer-events-none drop-shadow-[0_0_15px_rgba(247,200,91,0.3)] animate-spin-slow"
                style={{ animationDirection: 'reverse', animationDuration: '60s' }}
                fill="none"
              >
                <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="1" />
                {Array.from({ length: 16 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={100 + 86 * Math.cos((i * 2 * Math.PI) / 16)}
                    cy={100 + 86 * Math.sin((i * 2 * Math.PI) / 16)}
                    r="2"
                    fill="#F7C85B"
                    opacity="0.8"
                  />
                ))}
              </svg>

              {/* Inner 12-Petal Sacred Lotus Mandala */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-galaxy-gold/35 animate-spin-slow select-none pointer-events-none drop-shadow-[0_0_20px_rgba(247,200,91,0.35)]"
                fill="none"
              >
                <circle cx="100" cy="100" r="74" stroke="currentColor" strokeWidth="0.75" />
                <circle cx="100" cy="100" r="62" stroke="currentColor" strokeWidth="0.5" />
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 360) / 12;
                  return (
                    <g key={i} transform={`rotate(${angle} 100 100)`}>
                      <path
                        d="M100 22 C108 50 115 68 100 88 C85 68 92 50 100 22 Z"
                        fill="currentColor"
                        fillOpacity="0.14"
                        stroke="currentColor"
                        strokeWidth="0.85"
                      />
                      <circle cx="100" cy="25" r="2.5" fill="#F7C85B" />
                    </g>
                  );
                })}
              </svg>

              {/* The Hero Golden Diya Vessel & Sacred Dancing Flame */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  {/* Concentric Diya Light Burst */}
                  <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-600 opacity-60 filter blur-xl animate-pulse" />

                  <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_0_30px_rgba(247,200,91,0.85)]">
                    <defs>
                      <radialGradient id="heroFlameGrad" cx="50%" cy="80%" r="65%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="25%" stopColor="#FFF1D0" />
                        <stop offset="55%" stopColor="#F7C85B" />
                        <stop offset="85%" stopColor="#FF7A00" />
                        <stop offset="100%" stopColor="#D9383A" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="heroDiyaBrass" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF1D0" />
                        <stop offset="35%" stopColor="#F7C85B" />
                        <stop offset="70%" stopColor="#D49228" />
                        <stop offset="100%" stopColor="#7C3A18" />
                      </linearGradient>
                      <linearGradient id="heroDiyaBase" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#F7C85B" />
                        <stop offset="50%" stopColor="#8C4A14" />
                        <stop offset="100%" stopColor="#4A2207" />
                      </linearGradient>
                    </defs>

                    {/* Sacred Flame */}
                    <g className="diya-flame-anim">
                      {/* Outer Flame Glow */}
                      <path
                        d="M80 18 C70 38 66 54 80 72 C94 54 90 38 80 18 Z"
                        fill="url(#heroFlameGrad)"
                        filter="drop-shadow(0 0 12px #F7C85B)"
                      />
                      {/* Inner White-hot Flame Core */}
                      <path
                        d="M80 34 C74 46 72 56 80 68 C88 56 86 46 80 34 Z"
                        fill="#FFFFFF"
                        opacity="0.95"
                      />
                      <circle cx="80" cy="58" r="5" fill="#FFF8E7" />
                    </g>

                    {/* Diya Clay & Brass Vessel */}
                    {/* Diya Lip & Rim */}
                    <ellipse cx="80" cy="80" rx="46" ry="12" fill="url(#heroDiyaBrass)" stroke="#F7C85B" strokeWidth="1" />
                    <ellipse cx="80" cy="80" rx="41" ry="8" fill="#5A2407" />

                    {/* Oil puddle with golden reflection */}
                    <ellipse cx="80" cy="81" rx="36" ry="6" fill="#8C3B0E" />
                    <ellipse cx="80" cy="80" rx="14" ry="3" fill="#F7C85B" opacity="0.65" />

                    {/* Diya Bowl Body */}
                    <path
                      d="M34 80 Q80 125 126 80 Q112 128 80 128 Q48 128 34 80 Z"
                      fill="url(#heroDiyaBase)"
                      stroke="#F7C85B"
                      strokeWidth="1.5"
                    />

                    {/* Diya Carved Base Stand */}
                    <path
                      d="M62 126 Q80 134 98 126 L94 136 Q80 140 66 136 Z"
                      fill="url(#heroDiyaBrass)"
                      stroke="#8C4A14"
                      strokeWidth="1"
                    />

                    {/* Delicate Indian ornamental etchings */}
                    <circle cx="80" cy="104" r="3" fill="#F7C85B" />
                    <circle cx="64" cy="98" r="2.5" fill="#F7C85B" opacity="0.8" />
                    <circle cx="96" cy="98" r="2.5" fill="#F7C85B" opacity="0.8" />
                    <circle cx="50" cy="89" r="2" fill="#F7C85B" opacity="0.7" />
                    <circle cx="110" cy="89" r="2" fill="#F7C85B" opacity="0.7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Subtitle Badge */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-galaxy-gold/15 border border-galaxy-gold/40 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md shadow-[0_0_20px_rgba(247,200,91,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-galaxy-gold animate-spin-slow" />
              <span>✦ ॐ दीपज्योतिषे नमः ✦ Cosmic Diwali Experience</span>
              <Sparkles className="w-3.5 h-3.5 text-galaxy-gold animate-spin-slow" />
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] mb-6 max-w-4xl"
          >
            <span className="gold-gradient-text drop-shadow-[0_4px_28px_rgba(247,200,91,0.4)]">
              Light Up
            </span>{' '}
            <span className="text-galaxy-ivory">Someone’s</span>{' '}
            <span className="cosmic-gradient-text drop-shadow-[0_4px_28px_rgba(185,184,255,0.4)]">
              Universe.
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-xl text-galaxy-ivory/85 max-w-2xl leading-relaxed mb-8 sm:mb-10 font-sans"
          >
            Turn your Diwali wishes into a little piece of cosmic magic. Send a glowing celestial envelope,
            light interactive diyas in the starlight, and illuminate hearts across the universe.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <Link
              to="/create"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 hover:from-yellow-300 hover:to-galaxy-amber text-galaxy-midnight font-bold text-base shadow-[0_0_30px_rgba(247,200,91,0.5)] hover:shadow-[0_0_45px_rgba(247,200,91,0.75)] hover:scale-105 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Create Your Cosmic Wish</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            {/* Secondary CTA */}
            <a
              href="#light-diya"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-full bg-galaxy-royal/70 border border-galaxy-gold/40 text-galaxy-ivory hover:text-galaxy-gold hover:border-galaxy-gold hover:bg-galaxy-royal/90 font-medium text-base backdrop-blur-md shadow-[0_0_20px_rgba(247,200,91,0.2)] hover:shadow-[0_0_30px_rgba(247,200,91,0.35)] transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold cursor-pointer"
            >
              <Flame className="w-5 h-5 text-galaxy-amber animate-pulse" />
              <span>Light a Diya</span>
            </a>
          </motion.div>

          {/* Quick Festive Insight Chips */}
          <motion.div
            variants={itemVariants}
            className="mt-14 pt-6 border-t border-galaxy-gold/20 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-galaxy-lavender/90"
          >
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-galaxy-midnight/60 border border-galaxy-gold/25 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-galaxy-gold animate-pulse" />
              <span className="font-medium text-galaxy-ivory">100% Free & Personalized</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-galaxy-midnight/60 border border-galaxy-gold/25 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-galaxy-amber animate-pulse" />
              <span className="font-medium text-galaxy-ivory">Bengali, Hindi & Global Unicode</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-galaxy-midnight/60 border border-galaxy-gold/25 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-galaxy-lavender animate-pulse" />
              <span className="font-medium text-galaxy-ivory">PNG Greeting Card Download</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
