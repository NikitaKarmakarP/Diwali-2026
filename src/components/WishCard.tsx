import React, { forwardRef, useState } from 'react';
import { WishData, WishTheme } from '../types/wish';
import { Sparkles } from 'lucide-react';

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
          wrapper: 'bg-gradient-to-b from-[#0B1538] via-[#0E1E52] to-[#080E28] border-[#B9B8FF]/30 shadow-[0_15px_45px_rgba(23,41,87,0.7)]',
          innerBorder: 'border-[#B9B8FF]/20',
          accentColor: '#B9B8FF',
          badge: 'bg-[#B9B8FF]/15 text-[#B9B8FF] border-[#B9B8FF]/30',
          titleColor: 'text-[#FFF1D0]',
          diyaColor: '#F7C85B',
          glow: 'rgba(185, 184, 255, 0.25)',
        };
      case 'traditional-diwali':
        return {
          wrapper: 'bg-gradient-to-b from-[#3B0E14] via-[#52131D] to-[#24080D] border-[#F7C85B]/40 shadow-[0_15px_45px_rgba(75,15,25,0.7)]',
          innerBorder: 'border-[#F7C85B]/30',
          accentColor: '#FFA439',
          badge: 'bg-[#F7C85B]/20 text-[#F7C85B] border-[#F7C85B]/40',
          titleColor: 'text-[#FFF1D0]',
          diyaColor: '#FFD700',
          glow: 'rgba(255, 164, 57, 0.3)',
        };
      case 'golden-galaxy':
      default:
        return {
          wrapper: 'bg-gradient-to-b from-[#111A3E] via-[#0D1535] to-[#080F27] border-galaxy-gold/35 shadow-[0_15px_45px_rgba(0,0,0,0.6)]',
          innerBorder: 'border-galaxy-gold/25',
          accentColor: '#F7C85B',
          badge: 'bg-galaxy-gold/15 text-galaxy-gold border-galaxy-gold/30',
          titleColor: 'text-galaxy-gold',
          diyaColor: '#F7C85B',
          glow: 'rgba(247, 200, 91, 0.3)',
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
    setTilt({ x: -(y * 8), y: x * 8 });
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
        boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 30px ${themeStyle.glow}`,
        transform: !isExporting ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : 'none',
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
      }}
      className={`relative w-full max-w-lg mx-auto rounded-3xl p-6 sm:p-9 border overflow-hidden ${themeStyle.wrapper}`}
    >
      {/* Background Starry Galaxy Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="cardGlow" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor={themeStyle.accentColor} stopOpacity="0.3" />
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
          <span className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider border ${themeStyle.badge}`}>
            {wish.category} Blessing
          </span>
          <span className="text-galaxy-gold text-xs font-serif opacity-80">
            ✦ शुभ दीपावली ✦
          </span>
        </div>

        {/* Decorative Glowing Diya Icon */}
        <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full filter blur-md opacity-50"
            style={{ backgroundColor: themeStyle.accentColor }}
          />
          <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(247,200,91,0.8)]">
            <path
              d="M50 14 C44 26 42 34 50 46 C58 34 56 26 50 14 Z"
              fill={themeStyle.diyaColor}
              className={!isExporting ? 'diya-flame-anim' : ''}
            />
            <circle cx="50" cy="38" r="5" fill="#FFF1D0" />
            <path
              d="M22 52 Q50 76 78 52 Q70 78 50 78 Q30 78 22 52 Z"
              fill={themeStyle.diyaColor}
              stroke="#B8860B"
              strokeWidth="1.5"
            />
            <ellipse cx="50" cy="52" rx="28" ry="6" fill="#8C4A14" />
          </svg>
        </div>

        {/* Greeting Header: Recipient Name */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest text-galaxy-lavender/90 font-sans mb-1">
            Specially Crafted For
          </p>
          <h2 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-galaxy-ivory tracking-wide break-words">
            {wish.recipient || 'Beloved Soul'}
          </h2>
        </div>

        {/* Gold Divider Line */}
        <div className="flex items-center justify-center space-x-3 w-48 my-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-galaxy-gold/60" />
          <Sparkles className="w-3.5 h-3.5 text-galaxy-gold" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-galaxy-gold/60" />
        </div>

        {/* The Heartfelt Personalized Message (Preserves Bengali and Unicode!) */}
        <div className="my-4 px-2 sm:px-4 min-h-[90px] flex items-center justify-center">
          <p
            className="text-base sm:text-lg text-galaxy-ivory/95 font-sans leading-relaxed italic break-words whitespace-pre-wrap select-text"
            style={{
              fontFamily: "'Outfit', 'Noto Sans Bengali', system-ui, sans-serif",
            }}
          >
            “{wish.message || 'May the celestial lights of Diwali fill your universe with endless joy and prosperity.'}”
          </p>
        </div>

        {/* Gold Divider Line */}
        <div className="flex items-center justify-center space-x-3 w-48 my-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-galaxy-gold/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-galaxy-gold" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-galaxy-gold/60" />
        </div>

        {/* Sender Attribution */}
        <div className="mt-3">
          <p className="text-xs uppercase tracking-widest text-galaxy-lavender/80 font-sans mb-0.5">
            With Cosmic Warmth & Love
          </p>
          <p className="font-serif font-bold text-xl sm:text-2xl text-galaxy-gold tracking-wide break-words">
            {wish.sender || 'A Friend in the Starlight'}
          </p>
        </div>

        {/* Website Watermark Branding */}
        <div className="mt-6 pt-3 border-t border-galaxy-gold/15 w-full flex items-center justify-between text-[11px] text-galaxy-lavender/60">
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-galaxy-gold" />
            <span>Diwali Galaxy Wishes</span>
          </span>
          <span className="italic">Light Up Someone’s Universe</span>
        </div>
      </div>
    </div>
  );
});

WishCard.displayName = 'WishCard';
