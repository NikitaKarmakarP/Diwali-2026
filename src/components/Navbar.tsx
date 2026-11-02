import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    { name: 'Home', path: '/', icon: <Home className='w-4 h-4' /> },
    { name: 'Create Wish', path: '/create', icon: <Sparkles className='w-4 h-4' /> },
    { name: 'Light Diya', path: '/#light-diya', icon: <Flame className='w-4 h-4' /> },
    { name: 'Lanterns', path: '/#sky-lanterns', icon: <Wind className='w-4 h-4' /> },
    { name: 'Rangoli', path: '/#cosmic-rangoli', icon: <Moon className='w-4 h-4' /> },
    { name: '5 Days', path: '/#five-days', icon: <Sun className='w-4 h-4' /> },
    { name: 'Wish Wall', path: '/#community-wall', icon: <Globe className='w-4 h-4' /> },
    { name: 'About', path: '/about', icon: <Heart className='w-4 h-4' /> },
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
    return location.pathname === path;
  };

  return (
    <header className='sticky top-0 z-40 w-full backdrop-blur-md bg-gradient-to-r from-[#080F27] via-[#172957] to-[#080F27] border-b border-galaxy-gold/15 transition-all relative shadow-[0_0_30px_rgba(247,200,91,0.8)]'>
      {/* Cosmic sparkle overlay */}
      <div className='absolute inset-0 pointer-events-none bg-[radial-gradient(circle_1px_at_30%_30%,#fff4_0%,transparent_70%)] opacity-20 animate-pulse-slow' />

      {/* Decorative stars */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-2 left-1/3 w-3 h-3 bg-galaxy-gold rounded-full opacity-30 animate-pulse-slow' />
        <div className='absolute bottom-2 right-1/4 w-4 h-4 bg-galaxy-gold rounded-full opacity-30 animate-pulse-slow' />
        <div className='absolute top-1/2 left-1/2 w-2 h-2 bg-galaxy-gold rounded-full opacity-20 animate-spin-slow' />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <Link
            to='/'
            className='flex items-center space-x-3 group outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold rounded-lg p-1 hover:scale-105 transition-transform'
            aria-label='Diwali Galaxy Wishes Home'
          >
            <div className='relative w-10 h-10 flex items-center justify-center'>
              <div className='absolute inset-0 rounded-full bg-galaxy-gold/20 filter blur-sm group-hover:bg-galaxy-gold/35 transition-all duration-300' />
              <svg viewBox='0 0 100 100' className='w-9 h-9 relative z-10 drop-shadow-[0_0_8px_rgba(247,200,91,0.6)]'>
                <path d='M50 14 C44 26 42 34 50 46 C58 34 56 26 50 14 Z' fill='#F7C85B' className='diya-flame-anim' />
                <circle cx='50' cy='38' r='6' fill='#FFF1D0' />
                <path d='M22 52 Q50 76 78 52 Q70 78 50 78 Q30 78 22 52 Z' fill='#F7C85B' stroke='#D49228' strokeWidth='2' />
                <ellipse cx='50' cy='52' rx='28' ry='6' fill='#D49228' />
              </svg>
            </div>
            <div className='flex flex-col'>
              <span className='font-serif font-bold text-lg sm:text-xl text-galaxy-ivory tracking-wide group-hover:text-galaxy-gold transition-colors'>
                Diwali Galaxy Wishes
              </span>
              <span className='text-[10px] tracking-widest uppercase text-galaxy-lavender/70 font-sans hidden sm:block'>
                Light Up Someone’s Universe
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className='hidden md:flex items-center space-x-4' aria-label='Main Navigation'>
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-galaxy-gold focus-visible:ring-2 focus-visible:ring-galaxy-gold rounded px-2 py-1 ${
                  isActive(link.path)
                    ? 'text-galaxy-gold font-semibold underline underline-offset-8 decoration-galaxy-gold/60'
                    : 'text-galaxy-ivory/80'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Sound & mute controls */}
          <div className='hidden md:flex items-center space-x-3.5 relative' ref={soundMenuRef}>
            <div className='relative'>
              <button
                onClick={() => {
                  if (isMuted) onToggleMute();
                  setSoundMenuOpen(!soundMenuOpen);
                }}
                className={`p-2.5 rounded-full border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold flex items-center justify-center min-w-[44px] min-h-[44px] ${
                  !isMuted
                    ? 'border-galaxy-gold/60 bg-galaxy-gold/15 text-galaxy-gold shadow-[0_0_12px_rgba(247,200,91,0.3)]'
                    : 'border-white/10 bg-galaxy-royal/40 text-galaxy-ivory/60 hover:text-galaxy-ivory hover:border-white/20'
                }`}
                title={isMuted ? 'Turn Sound On & Open Settings' : 'Sound Settings'}
                aria-label={isMuted ? 'Turn Sound On & Open Settings' : 'Sound Settings'}
              >
                {!isMuted ? <Volume2 className='w-5 h-5 animate-pulse' /> : <VolumeX className='w-5 h-5' />}
              </button>

              {/* Sound menu dropdown */}
              {soundMenuOpen && (
                <div className='absolute right-0 mt-3 w-64 glass-panel-gold rounded-2xl p-4 border border-galaxy-gold/40 shadow-2xl z-50 text-xs'>
                  <div className='flex items-center justify-between pb-2 mb-3 border-b border-galaxy-gold/20'>
                    <span className='font-serif font-bold text-galaxy-ivory flex items-center space-x-1.5'>
                      <Music className='w-3.5 h-3.5 text-galaxy-gold' />
                      <span>Cosmic Soundscapes</span>
                    </span>
                    <button
                      onClick={onToggleMute}
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${
                        isMuted
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      }`}
                    >
                      {isMuted ? 'Muted' : 'Playing'}
                    </button>
                  </div>

                  <div className='space-y-1.5 mb-3'>
                    <p className='text-[10px] uppercase tracking-wider text-galaxy-lavender/60 font-semibold mb-1'>Choose Soundscape</p>
                    <button
                      type='button'
                      onClick={() => handleSoundscapeChange('tanpura')}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                        soundscape === 'tanpura'
                          ? 'bg-galaxy-gold/20 text-galaxy-gold font-semibold border border-galaxy-gold/30'
                          : 'hover:bg-white/5 text-galaxy-ivory/80'
                      }`}
                    >
                      <span>Celestial Tanpura Drone</span>
                      {soundscape === 'tanpura' && <span className='text-[10px]'>Active</span>}
                    </button>

                    <button
                      type='button'
                      onClick={() => handleSoundscapeChange('bells')}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                        soundscape === 'bells'
                          ? 'bg-galaxy-gold/20 text-galaxy-gold font-semibold border border-galaxy-gold/30'
                          : 'hover:bg-white/5 text-galaxy-ivary/80'
                      }`}
                    >
                      <span>Temple Night Bells</span>
                      {soundscape === 'bells' && <span className='text-[10px]'>Active</span>}
                    </button>
                  </div>

                  <div className='flex items-center justify-between text-[10px] text-galaxy-lavender/70 mb-1'>
                    <span className='flex items-center space-x-1'>
                      <Sliders className='w-3 h-3' />
                      <span>Volume</span>
                    </span>
                    <span>{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    value={volume}
                    onChange={handleVolumeChange}
                    className='w-full'
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className='md:hidden p-2 rounded-full hover:bg-galaxy-gold/10 focus-visible:ring-2 focus-visible:ring-galaxy-gold'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label='Toggle mobile menu'
          >
            {mobileMenuOpen ? <X className='w-6 h-6 text-galaxy-gold' /> : <Menu className='w-6 h-6 text-galaxy-ivory' />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className='md:hidden absolute inset-x-0 top-full bg-galaxy-midnight/90 backdrop-blur-md border-t border-galaxy-gold/20 z-20'>
            <nav className='flex flex-col items-start p-4 space-y-3'>
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 text-galaxy-ivory/90 hover:text-galaxy-gold w-full ${
                    isActive(link.path) ? 'font-semibold' : ''
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
