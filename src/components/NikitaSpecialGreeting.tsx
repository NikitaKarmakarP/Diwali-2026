import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Heart, Star, Sun } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';

export const NikitaSpecialGreeting: React.FC = () => {
  const [loveCount, setLoveCount] = useState<number>(108);
  const [isLoved, setIsLoved] = useState<boolean>(false);

  const handleSendLove = (event: React.MouseEvent) => {
    if (!isLoved) {
      setLoveCount((prev) => prev + 1);
      setIsLoved(true);
    }

    soundEngine.playCelebrationSound();

    try {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { x, y },
        colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#FF69B4', '#FF4500'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Cosmic Radial Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[400px] bg-gradient-to-r from-galaxy-gold/20 via-amber-500/25 to-galaxy-amber/20 rounded-full filter blur-[130px] pointer-events-none -z-10 animate-pulse-slow" />

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 left-[20%] w-2 h-2 rounded-full bg-galaxy-gold animate-ping opacity-60" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-16 right-[22%] w-2.5 h-2.5 rounded-full bg-galaxy-amber animate-pulse opacity-70" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative rounded-3xl p-8 sm:p-12 lg:p-14 glass-panel-gold border-2 border-galaxy-gold/50 shadow-[0_20px_60px_rgba(247,200,91,0.3)] text-center overflow-hidden"
        >
          {/* Rotating Lotus Mandala Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none select-none">
            <svg viewBox="0 0 200 200" className="w-full h-full text-galaxy-gold animate-spin-slow" fill="none">
              <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1" />
              {Array.from({ length: 12 }).map((_, i) => (
                <path
                  key={i}
                  d="M100 20 C108 55 115 75 100 100 C85 75 92 55 100 20 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="currentColor"
                  fillOpacity="0.1"
                  transform={`rotate(${i * 30} 100 100)`}
                />
              ))}
            </svg>
          </div>

          {/* Top Sacred Auspicious Tag */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-galaxy-gold/15 border border-galaxy-gold/40 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 shadow-[0_0_15px_rgba(247,200,91,0.25)] backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-galaxy-gold animate-spin-slow" />
            <span>✦ A Special Deepavali Dedication ✦</span>
            <Sparkles className="w-4 h-4 text-galaxy-gold animate-spin-slow" />
          </div>

          {/* Main Headline */}
          <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4">
            <span className="text-galaxy-ivory">Happy Diwali from </span>
            <span className="gold-gradient-text drop-shadow-[0_4px_20px_rgba(247,200,91,0.5)]">
              Nikita
            </span>
            <span className="inline-block ml-2 text-3xl sm:text-4xl animate-bounce">🪔</span>
          </h2>

          {/* Sanskrit Divine Mantra */}
          <p className="font-serif text-sm sm:text-base text-galaxy-gold font-semibold tracking-wide italic mb-6">
            “तमसो मा ज्योतिर्गमय, मृत्योर्माऽमृतं गमय”
          </p>

          {/* Heartfelt Quote Card */}
          <div className="relative my-6 max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/30 shadow-inner">
            <div className="text-galaxy-gold/30 text-5xl font-serif absolute -top-5 left-6 select-none pointer-events-none">
              “
            </div>
            <p className="font-serif italic text-base sm:text-xl text-galaxy-ivory/95 leading-relaxed tracking-wide font-medium">
              May the golden glow of countless diyas illuminate your path, banish every shadow of doubt,
              and fill your world with peace, radiant health, prosperity, and boundless laughter.
              May this Diwali light up the universe in your heart.
            </p>
            <div className="text-galaxy-gold/30 text-5xl font-serif absolute -bottom-10 right-6 select-none pointer-events-none">
              ”
            </div>

            <div className="mt-5 pt-4 border-t border-galaxy-gold/20 flex items-center justify-center space-x-2 text-xs sm:text-sm text-galaxy-lavender/90 font-sans">
              <span>Warmest festive wishes & prayers</span>
              <span className="text-galaxy-gold font-bold">✦ Nikita ✦</span>
            </div>
          </div>

          {/* Interactive Send Love Button */}
          <div className="mt-8 flex flex-col items-center justify-center space-y-3">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={handleSendLove}
              className={`inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(247,200,91,0.4)] transition-all cursor-pointer ${
                isLoved
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white shadow-[0_0_35px_rgba(244,63,94,0.5)]'
                  : 'bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight hover:shadow-[0_0_40px_rgba(247,200,91,0.65)]'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLoved ? 'fill-current text-white animate-bounce' : 'fill-current text-galaxy-midnight'}`} />
              <span>{isLoved ? 'Blessings Sent to Nikita!' : 'Send Warm Wishes & Love to Nikita'}</span>
              <Flame className="w-4 h-4 text-amber-200 fill-current" />
            </motion.button>

            <span className="text-xs text-galaxy-lavender/80 font-mono">
              ✨ <strong>{loveCount}</strong> hearts ignited with festive love
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
