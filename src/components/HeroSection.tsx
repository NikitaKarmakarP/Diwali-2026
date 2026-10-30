import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Flame, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] h-[340px] sm:h-[580px] bg-galaxy-nebula/40 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[380px] h-[220px] sm:h-[380px] bg-galaxy-gold/20 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Central Visual: Luminous Mandala + Grand Golden Diya */}
          <motion.div variants={itemVariants} className="relative mb-8 sm:mb-12">
            {/* Pulsing Aura Halo */}
            <div className="absolute inset-0 -m-8 sm:-m-14 rounded-full bg-gradient-to-r from-galaxy-gold/25 via-galaxy-amber/20 to-transparent filter blur-2xl animate-pulse-glow" />

            {/* Rotating Sacred Lotus Mandala */}
            <div className="relative w-44 h-44 sm:w-64 sm:h-64 flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-galaxy-gold/30 animate-spin-slow select-none pointer-events-none drop-shadow-[0_0_12px_rgba(247,200,91,0.25)]"
                fill="none"
              >
                {/* 12-petal sacred lotus mandala */}
                <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" />
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 360) / 12;
                  return (
                    <g key={i} transform={`rotate(${angle} 100 100)`}>
                      <path
                        d="M100 20 C108 50 115 70 100 90 C85 70 92 50 100 20 Z"
                        fill="currentColor"
                        fillOpacity="0.12"
                        stroke="currentColor"
                        strokeWidth="0.8"
                      />
                      <circle cx="100" cy="24" r="2.5" fill="#F7C85B" />
                    </g>
                  );
                })}
              </svg>

              {/* The Hero Golden Diya */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center">
                  {/* Concentric Diya Light Burst */}
                  <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-600 opacity-40 filter blur-xl animate-pulse" />

                  <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_0_25px_rgba(247,200,91,0.7)]">
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
                        filter="drop-shadow(0 0 10px #F7C85B)"
                      />
                      {/* Inner White-hot Flame Core */}
                      <path
                        d="M80 34 C74 46 72 56 80 68 C88 56 86 46 80 34 Z"
                        fill="#FFFFFF"
                        opacity="0.9"
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
            <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-galaxy-gold/10 border border-galaxy-gold/30 text-galaxy-gold text-xs sm:text-sm font-medium tracking-wider uppercase backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-galaxy-gold animate-spin-slow" />
              <span>Cosmic Diwali Experience</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif font-black text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1] mb-6 max-w-4xl"
          >
            <span className="gold-gradient-text">Light Up</span>{' '}
            <span className="text-galaxy-ivory">Someone’s</span>{' '}
            <span className="cosmic-gradient-text">Universe.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-xl text-galaxy-ivory/80 max-w-2xl leading-relaxed mb-8 sm:mb-10 font-sans"
          >
            Turn your Diwali wishes into a little piece of magic. Send a glowing cosmic envelope,
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
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-base shadow-[0_0_25px_rgba(247,200,91,0.45)] hover:shadow-[0_0_40px_rgba(247,200,91,0.7)] hover:scale-105 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold"
            >
              <Sparkles className="w-5 h-5" />
              <span>Create Your Wish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary CTA */}
            <a
              href="#light-diya"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-full bg-galaxy-royal/60 border border-galaxy-gold/30 text-galaxy-ivory hover:text-galaxy-gold hover:border-galaxy-gold/60 hover:bg-galaxy-royal/90 font-medium text-base backdrop-blur-md transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold"
            >
              <Flame className="w-5 h-5 text-galaxy-amber" />
              <span>Light a Diya</span>
            </a>
          </motion.div>

          {/* Quick Festive Insight */}
          <motion.div
            variants={itemVariants}
            className="mt-14 pt-6 border-t border-galaxy-gold/15 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm text-galaxy-lavender/80"
          >
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-galaxy-gold animate-pulse" />
              <span>100% Free & Personalized</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-galaxy-amber animate-pulse" />
              <span>Bengali, Hindi & Global Unicode</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-galaxy-lavender animate-pulse" />
              <span>PNG Greeting Card Download</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
