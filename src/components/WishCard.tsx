import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { WishData, WishTheme } from '../types/wish';
import { Sparkles, Flame } from 'lucide-react';

interface WishCardProps {
  wish: WishData;
  isExporting?: boolean;
}

export const WishCard = forwardRef<HTMLDivElement, WishCardProps>(({ wish, isExporting = false }, ref) => {
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const getThemeStyles = (theme: WishTheme) => {
    switch (theme) {
      case 'royal-blue':
        return {
          wrapper: 'bg-gradient-to-b from-[#0B1538] via-[#0E1E52] to-[#080E28] border-[#B9B8FF]/40 shadow-[0_20px_50px_rgba(23,41,87,0.7)]',
          innerBorder: 'border-[#B9B8FF]/30',
          accentColor: '#B9B8FF',
          badge: 'bg-[#B9B8FF]/20 text-[#B9B8FF] border-[#B9B8FF]/40',
          titleColor: 'text-[#FFF1D0]',
          diyaColor: '#F7C85B',
          glow: 'rgba(185, 184, 255, 0.35)',
        };
      case 'traditional-diwali':
        return {
          wrapper: 'bg-gradient-to-b from-[#3B0E14] via-[#52131D] to-[#24080D] border-[#F7C85B]/50 shadow-[0_20px_50px_rgba(75,15,25,0.7)]',
          innerBorder: 'border-[#F7C85B]/40',
          accentColor: '#FFA439',
          badge: 'bg-[#F7C85B]/20 text-[#F7C85B] border-[#F7C85B]/50',
          titleColor: 'text-[#FFF1D0]',
          diyaColor: '#FFD700',
          glow: 'rgba(255, 164, 57, 0.35)',
        };
      case 'golden-galaxy':
      default:
        return {
          wrapper: 'bg-gradient-to-b from-[#111A3E] via-[#0D1535] to-[#080F27] border-galaxy-gold/45 shadow-[0_20px_50px_rgba(0,0,0,0.65)]',
          innerBorder: 'border-galaxy-gold/30',
          accentColor: '#F7C85B',
          badge: 'bg-galaxy-gold/20 text-galaxy-gold border-galaxy-gold/40',
          titleColor: 'text-galaxy-gold',
          diyaColor: '#F7C85B',
          glow: 'rgba(247, 200, 91, 0.35)',
        };
    }
  };

  const themeStyle = getThemeStyles(wish.theme);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExporting || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 10), y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: `0 25px 60px rgba(0,0,0,0.7), 0 0 35px ${themeStyle.glow}`,
        transform: !isExporting ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : 'none',
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
      }}
      className={`relative w-full max-w-lg mx-auto rounded-3xl p-6 sm:p-9 border-2 overflow-hidden ${themeStyle.wrapper}`}
    >
      {/* Background Starry Galaxy Texture with Shimmer */}
      <div className="absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="cardGlow" cx="50%" cy="30%" r="55%">
              <stop offset="0%" stopColor={themeStyle.accentColor} stopOpacity="0.35" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#cardGlow)" />
        </svg>
      </div>

      {/* Ornate Indian Corner Borders */}
      <div className={`absolute inset-3 sm:inset-4 rounded-2xl border ${themeStyle.innerBorder} pointer-events-none`}>
        {/* Top Left Corner Motif */}
        <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-galaxy-gold" />
        {/* Top Right Corner Motif */}
        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-2 border-r-2 border-galaxy-gold" />
        {/* Bottom Left Corner Motif */}
        <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-2 border-l-2 border-galaxy-gold" />
        {/* Bottom Right Corner Motif */}
        <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-galaxy-gold" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Top Category Badge & Sanskrit Invocation */}
        <div className="flex items-center space-x-2 mb-4">
          <span className={`px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border shadow-sm ${themeStyle.badge}`}>
            {wish.category} Blessing
          </span>
          <span className="text-galaxy-gold text-xs font-serif font-bold opacity-90">
            ✦ शुभ दीपावली ✦
          </span>
        </div>

        {/* Decorative Glowing Diya Icon */}
        <div className="relative w-24 h-24 mb-3 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full filter blur-lg opacity-60 animate-pulse"
            style={{ backgroundColor: themeStyle.accentColor }}
          />
          <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-[0_0_18px_rgba(247,200,91,0.9)]">
            {/* Sacred Diya Flame */}
            <g className={!isExporting ? 'diya-flame-anim' : ''} style={{ transformOrigin: '50px 45px' }}>
              <path
                d="M50 12 C44 26 42 34 50 46 C58 34 56 26 50 12 Z"
                fill={themeStyle.diyaColor}
                filter="drop-shadow(0 0 8px #FFA439)"
              />
              <path
                d="M50 22 C46 30 45 36 50 44 C55 36 54 30 50 22 Z"
                fill="#FFFFFF"
                opacity="0.9"
              />
              <circle cx="50" cy="38" r="4" fill="#FFF1D0" />
            </g>

            {/* Clay / Brass Vessel Bowl */}
            <path
              d="M20 52 Q50 78 80 52 Q72 80 50 80 Q28 80 20 52 Z"
              fill={themeStyle.diyaColor}
              stroke="#B8860B"
              strokeWidth="1.5"
            />
            <ellipse cx="50" cy="52" rx="30" ry="7" fill="#8C4A14" stroke="#B8860B" strokeWidth="1" />
          </svg>
        </div>

        {/* Greeting Header: Recipient Name */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest text-galaxy-lavender/90 font-sans mb-1 font-semibold">
            Specially Crafted For
          </p>
          <h2 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-galaxy-ivory tracking-wide break-words drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            {wish.recipient || 'Beloved Soul'}
          </h2>
        </div>

        {/* Gold Divider Line */}
        <div className="flex items-center justify-center space-x-3 w-48 my-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-galaxy-gold/70" />
          <Sparkles className="w-3.5 h-3.5 text-galaxy-gold animate-spin-slow" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-galaxy-gold/70" />
        </div>

        {/* The Heartfelt Personalized Message (Preserves Bengali and Unicode!) */}
        <div className="my-4 px-3 sm:px-5 min-h-[90px] flex items-center justify-center">
          <p
            className="text-base sm:text-lg text-galaxy-ivory font-sans leading-relaxed italic break-words whitespace-pre-wrap select-text font-medium"
            style={{
              fontFamily: "'Outfit', 'Noto Sans Bengali', system-ui, sans-serif",
            }}
          >
            “{wish.message || 'May the celestial lights of Diwali fill your universe with endless joy and prosperity.'}”
          </p>
        </div>

        {/* Gold Divider Line */}
        <div className="flex items-center justify-center space-x-3 w-48 my-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-galaxy-gold/70" />
          <div className="w-2 h-2 rounded-full bg-galaxy-gold animate-pulse" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-galaxy-gold/70" />
        </div>

        {/* Sender Attribution */}
        <div className="mt-3">
          <p className="text-xs uppercase tracking-widest text-galaxy-lavender/90 font-sans mb-0.5 font-semibold">
            With Cosmic Warmth & Love
          </p>
          <p className="font-serif font-black text-xl sm:text-2xl text-galaxy-gold tracking-wide break-words drop-shadow-[0_2px_8px_rgba(247,200,91,0.4)]">
            {wish.sender || 'A Friend in the Starlight'}
          </p>
        </div>

        {/* Website Watermark Branding */}
        <div className="mt-6 pt-3 border-t border-galaxy-gold/20 w-full flex items-center justify-between text-[11px] text-galaxy-lavender/70 font-medium">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-galaxy-gold" />
            <span className="text-galaxy-ivory/90">Diwali Galaxy Wishes</span>
          </span>
          <span className="italic text-galaxy-gold">Light Up Someone’s Universe</span>
        </div>
      </div>
    </div>
  );
});

WishCard.displayName = 'WishCard';
