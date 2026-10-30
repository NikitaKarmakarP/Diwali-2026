import React from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export const FireworksCelebration: React.FC = () => {
  const triggerCelebration = () => {
    soundEngine.playCelebrationSound();

    const end = Date.now() + 1.2 * 1000;
    const colors = ['#F7C85B', '#FFA439', '#FFF1D0', '#B9B8FF'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto glass-panel-gold rounded-3xl p-8 sm:p-14 border border-galaxy-gold/35 text-center relative overflow-hidden">
        {/* Decorative corner sparks */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-galaxy-gold/40 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-galaxy-gold/40 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-galaxy-gold/40 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-galaxy-gold/40 rounded-br-xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <button
            type="button"
            onClick={triggerCelebration}
            className="mb-4 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-galaxy-gold/20 hover:bg-galaxy-gold/30 border border-galaxy-gold/40 text-galaxy-gold text-xs sm:text-sm font-semibold transition-all active:scale-95"
            title="Click to launch celebration sparklers"
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Launch Golden Sparklers ✦ Tap Here</span>
          </button>

          <h2 className="font-serif font-black text-3xl sm:text-5xl text-galaxy-ivory tracking-tight mb-4 leading-tight">
            Celebrate the Triumph of <span className="gold-gradient-text">Light & Joy</span>
          </h2>

          <p className="text-base sm:text-lg text-galaxy-ivory/80 leading-relaxed mb-8 font-sans">
            May your year ahead shimmer with boundless laughter, prosperous beginnings, and the sweet
            warmth of loved ones near and far.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/create"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-base shadow-[0_0_25px_rgba(247,200,91,0.4)] hover:shadow-[0_0_35px_rgba(247,200,91,0.6)] hover:scale-105 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold"
            >
              <Sparkles className="w-5 h-5" />
              <span>Create & Share a Greeting</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={triggerCelebration}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-galaxy-midnight/80 hover:bg-galaxy-royal text-galaxy-ivory border border-galaxy-gold/30 hover:border-galaxy-gold/60 text-base font-medium transition-colors"
            >
              Spark More Fireworks ✨
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
