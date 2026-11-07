import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  Flame,
  Sliders,
  Music,
  Globe,
  Home,
  Heart,
  Moon,
  Wind,
  Sun,
  Gift,
  Radio,
} from 'lucide-react';
import { soundEngine, SoundscapeType } from '../utils/soundEffects';

interface NavbarProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isMuted, onToggleMute }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundMenuOpen, setSoundMenuOpen] = useState(false);
  const [soundscape, setSoundscape] = useState<SoundscapeType>('tanpura');
  const [volume, setVolume] = useState<number>(0.5);
  const soundMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Create Wish', path: '/create', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Light Diya', path: '/#light-diya', icon: <Flame className="w-4 h-4" /> },
    { name: 'Lanterns', path: '/#sky-lanterns', icon: <Wind className="w-4 h-4" /> },
    { name: 'Rangoli', path: '/#cosmic-rangoli', icon: <Moon className="w-4 h-4" /> },
    { name: 'Sweets', path: '/#diwali-sweets', icon: <Gift className="w-4 h-4" /> },
    { name: '5 Days', path: '/#five-days', icon: <Sun className="w-4 h-4" /> },
    { name: 'Wish Wall', path: '/#community-wall', icon: <Globe className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <Heart className="w-4 h-4" /> },
  ];

  // Close sound menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (soundMenuRef.current && !soundMenuRef.current.contains(e.target as Node)) {
        setSoundMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSoundscapeChange = (type: SoundscapeType) => {
    setSoundscape(type);
    soundEngine.setSoundscape(type);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    soundEngine.setVolume(v);
  };

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path && !location.hash;
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-gradient-to-r from-[#070D24]/95 via-[#0F1B3E]/90 to-[#070D24]/95 border-b border-galaxy-gold/25 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5),0_0_25px_rgba(247,200,91,0.15)]">
      {/* ── Top Radiant Ambient Nebula Streak ── */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-galaxy-gold/70 to-transparent pointer-events-none" />

      {/* ── Subtle Floating Stardust in Navbar ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-galaxy-gold"
            style={{
              width: `${(i % 2) + 1.5}px`,
              height: `${(i % 2) + 1.5}px`,
              top: `${(i * 13 + 7) % 70}%`,
              left: `${(i * 14 + 5) % 95}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ── Logo with Sacred Breathing Flame & Orbiting Radiance ── */}
          <Link
            to="/"
            className="flex items-center space-x-3.5 group outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold rounded-xl p-1.5 transition-all duration-300"
            aria-label="Diwali Galaxy Wishes Home"
          >
            <motion.div
              className="relative w-11 h-11 flex items-center justify-center"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Pulsing Concentric Golden Rings */}
              <motion.div
                className="absolute inset-0 rounded-full bg-galaxy-gold/20 filter blur-md"
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -inset-1 rounded-full border border-galaxy-gold/40"
                animate={{
                  rotate: [0, 360],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  rotate: { duration: 16, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
              />

              {/* Handcrafted Diya SVG with Flickering Flame */}
              <svg viewBox="0 0 100 100" className="w-10 h-10 relative z-10 drop-shadow-[0_0_12px_rgba(247,200,91,0.85)]">
                <defs>
                  <radialGradient id="navFlameGrad" cx="50%" cy="80%" r="70%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor="#FFF1D0" />
                    <stop offset="70%" stopColor="#F7C85B" />
                    <stop offset="100%" stopColor="#FF7A00" />
                  </radialGradient>
                </defs>
                {/* Flame with CSS & SVG Animation */}
                <g className="diya-flame-anim" style={{ transformOrigin: '50px 38px' }}>
                  <circle cx="50" cy="30" r="14" fill="#F7C85B" opacity="0.3" filter="blur(4px)" />
                  <path
                    d="M50 12 C44 24 42 32 50 44 C58 32 56 24 50 12 Z"
                    fill="url(#navFlameGrad)"
                  />
                  <circle cx="50" cy="36" r="4.5" fill="#FFFFFF" opacity="0.95" />
                </g>
                <path
                  d="M22 52 Q50 76 78 52 Q70 78 50 78 Q30 78 22 52 Z"
                  fill="#F7C85B"
                  stroke="#D49228"
                  strokeWidth="2"
                />
                <ellipse cx="50" cy="52" rx="28" ry="6" fill="#D49228" />
              </svg>
            </motion.div>

            {/* Brand Title with Cosmic Shimmer */}
            <div className="flex flex-col">
              <span className="font-serif font-black text-lg sm:text-xl tracking-wide bg-gradient-to-r from-galaxy-ivory via-galaxy-gold to-amber-300 bg-clip-text text-transparent group-hover:brightness-125 transition-all">
                Diwali Galaxy Wishes
              </span>
              <span className="text-[10px] tracking-widest uppercase text-galaxy-gold/90 font-sans font-semibold hidden sm:flex items-center space-x-1">
                <span>✦ Light Up Someone’s Universe ✦</span>
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation Links with Animated Glow Pills ── */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-all outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold group"
                >
                  {/* Active/Hover Background Pill */}
                  {active ? (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-galaxy-gold/25 via-galaxy-amber/20 to-galaxy-gold/25 border border-galaxy-gold/60 shadow-[0_0_16px_rgba(247,200,91,0.35)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-white/5 border border-white/10 transition-opacity duration-200" />
                  )}

                  {/* Content */}
                  <span
                    className={`relative z-10 flex items-center space-x-1.5 transition-colors duration-200 ${
                      active
                        ? 'text-galaxy-gold font-bold drop-shadow-[0_0_8px_rgba(247,200,91,0.5)]'
                        : 'text-galaxy-ivory/80 group-hover:text-galaxy-gold'
                    }`}
                  >
                    <motion.span
                      whileHover={{ rotate: 15, scale: 1.15 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {link.icon}
                    </motion.span>
                    <span>{link.name}</span>
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* ── Controls: Cosmic Sound Controller & Mobile Toggle ── */}
          <div className="flex items-center space-x-3">
            {/* Sound Menu */}
            <div className="relative" ref={soundMenuRef}>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  if (isMuted) onToggleMute();
                  setSoundMenuOpen(!soundMenuOpen);
                }}
                className={`relative px-3.5 py-2 rounded-full border transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold flex items-center space-x-2 min-h-[42px] cursor-pointer ${
                  !isMuted
                    ? 'border-galaxy-gold/70 bg-gradient-to-r from-galaxy-gold/20 via-amber-500/15 to-galaxy-gold/20 text-galaxy-gold shadow-[0_0_20px_rgba(247,200,91,0.35)]'
                    : 'border-white/15 bg-galaxy-midnight/80 text-galaxy-ivory/70 hover:text-galaxy-ivory hover:border-galaxy-gold/40'
                }`}
                title={isMuted ? 'Turn Sound On & Open Cosmic Soundscapes' : 'Cosmic Sound Settings'}
                aria-label={isMuted ? 'Turn Sound On & Open Cosmic Soundscapes' : 'Cosmic Sound Settings'}
              >
                {!isMuted ? (
                  <>
                    {/* Animated Sound Equalizer Bars */}
                    <div className="flex items-end space-x-0.5 h-4 w-4 justify-center">
                      <motion.span
                        className="w-1 bg-galaxy-gold rounded-full"
                        animate={{ height: ['4px', '14px', '6px', '16px', '4px'] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <motion.span
                        className="w-1 bg-galaxy-amber rounded-full"
                        animate={{ height: ['12px', '4px', '16px', '8px', '12px'] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                      />
                      <motion.span
                        className="w-1 bg-galaxy-gold rounded-full"
                        animate={{ height: ['8px', '16px', '4px', '12px', '8px'] }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                      />
                    </div>
                    <span className="text-xs font-bold hidden sm:inline">Playing</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-galaxy-lavender/60" />
                    <span className="text-xs font-semibold hidden sm:inline text-galaxy-lavender/70">Sound</span>
                  </>
                )}
              </motion.button>

              {/* Sound Menu Dropdown with Framer Motion */}
              <AnimatePresence>
                {soundMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 mt-3 w-72 glass-panel-gold rounded-3xl p-5 border-2 border-galaxy-gold/45 shadow-[0_20px_50px_rgba(0,0,0,0.65)] z-50 text-xs backdrop-blur-2xl"
                  >
                    <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-galaxy-gold/25">
                      <span className="font-serif font-black text-sm text-galaxy-ivory flex items-center space-x-2">
                        <Music className="w-4 h-4 text-galaxy-gold animate-bounce" />
                        <span>Cosmic Soundscapes</span>
                      </span>
                      <button
                        onClick={onToggleMute}
                        className={`text-[10px] px-2.5 py-1 rounded-full border font-bold transition-all ${
                          isMuted
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30 shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                        }`}
                      >
                        {isMuted ? 'Muted' : '✦ Active'}
                      </button>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-[10px] uppercase tracking-wider text-galaxy-gold font-bold">
                        Select Sacred Drone
                      </p>
                      <button
                        type="button"
                        onClick={() => handleSoundscapeChange('tanpura')}
                        className={`w-full text-left px-3 py-2.5 rounded-2xl transition-all flex items-center justify-between border cursor-pointer ${
                          soundscape === 'tanpura'
                            ? 'bg-galaxy-gold/20 text-galaxy-gold font-bold border-galaxy-gold/50 shadow-sm'
                            : 'hover:bg-white/5 text-galaxy-ivory/80 border-transparent'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Radio className="w-3.5 h-3.5" />
                          <span>Celestial Tanpura Drone</span>
                        </div>
                        {soundscape === 'tanpura' && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-md bg-galaxy-gold/30 text-galaxy-gold">
                            Active
                          </span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSoundscapeChange('bells')}
                        className={`w-full text-left px-3 py-2.5 rounded-2xl transition-all flex items-center justify-between border cursor-pointer ${
                          soundscape === 'bells'
                            ? 'bg-galaxy-gold/20 text-galaxy-gold font-bold border-galaxy-gold/50 shadow-sm'
                            : 'hover:bg-white/5 text-galaxy-ivory/80 border-transparent'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Temple Night Bells</span>
                        </div>
                        {soundscape === 'bells' && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-md bg-galaxy-gold/30 text-galaxy-gold">
                            Active
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="pt-2 border-t border-galaxy-gold/20">
                      <div className="flex items-center justify-between text-[11px] text-galaxy-ivory/90 mb-1.5 font-semibold">
                        <span className="flex items-center space-x-1.5">
                          <Sliders className="w-3.5 h-3.5 text-galaxy-gold" />
                          <span>Volume</span>
                        </span>
                        <span className="font-mono text-galaxy-gold">{Math.round(volume * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full accent-galaxy-gold cursor-pointer"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/30 text-galaxy-ivory hover:text-galaxy-gold hover:border-galaxy-gold/60 focus-visible:ring-2 focus-visible:ring-galaxy-gold"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-galaxy-gold" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* ── Mobile Drawer with Staggered Framer Motion ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden border-t border-galaxy-gold/25 bg-gradient-to-b from-[#09112F]/98 to-[#05091A]/98 backdrop-blur-2xl rounded-b-3xl shadow-2xl"
            >
              <nav className="flex flex-col p-4 space-y-1">
                {navLinks.map((link, i) => {
                  const active = isActive(link.path);
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm transition-all ${
                          active
                            ? 'bg-gradient-to-r from-galaxy-gold/25 via-galaxy-amber/20 to-transparent text-galaxy-gold font-bold border border-galaxy-gold/40 shadow-sm'
                            : 'text-galaxy-ivory/85 hover:bg-white/5 hover:text-galaxy-gold'
                        }`}
                      >
                        <span className={active ? 'text-galaxy-gold' : 'text-galaxy-lavender'}>
                          {link.icon}
                        </span>
                        <span>{link.name}</span>
                        {active && <span className="ml-auto text-galaxy-gold text-xs">✦</span>}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom Decorative Toran Festoon Garland ── */}
      <div className="absolute -bottom-[2px] inset-x-0 h-[3px] flex items-center justify-around overflow-hidden pointer-events-none opacity-80" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-galaxy-gold shadow-[0_0_6px_#F7C85B]"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.09,
            }}
          />
        ))}
      </div>
    </header>
  );
};
