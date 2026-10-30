import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';
import { Sparkles } from 'lucide-react';

export const FloatingPatakaButton: React.FC = () => {
  const [isBlasting, setIsBlasting] = useState(false);

  const handleBurst = (e: React.MouseEvent) => {
    soundEngine.playCelebrationSound();
    setIsBlasting(true);

    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      // Double firecracker burst
      confetti({
        particleCount: 45,
        spread: 80,
        origin: { x, y: Math.max(0.2, y - 0.2) },
        colors: ['#F7C85B', '#FFA439', '#FF5500', '#FFF1D0', '#2ECC71'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { x: Math.max(0.1, x - 0.1), y: Math.max(0.1, y - 0.3) },
          colors: ['#B9B8FF', '#F7C85B', '#E74C3C'],
        });
        setIsBlasting(false);
      }, 350);
    } catch {
      setIsBlasting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
      <button
        type="button"
        onClick={handleBurst}
        disabled={isBlasting}
        className="group flex items-center space-x-2 px-4 py-3 rounded-full bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-xs shadow-[0_4px_25px_rgba(247,200,91,0.5)] hover:shadow-[0_6px_35px_rgba(247,200,91,0.8)] hover:scale-105 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-white"
        title="Tap to ignite a festive celebration pataka!"
        aria-label="Ignite celebratory firecracker"
      >
        <span className="text-base group-hover:rotate-12 transition-transform">💥</span>
        <span className="tracking-wide">Burst Pataka</span>
        <Sparkles className="w-3.5 h-3.5 text-galaxy-midnight animate-spin-slow" />
      </button>
    </div>
  );
};
