import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';
import { Sparkles, Flame } from 'lucide-react';

type PatakaType = 'rocket' | 'anaar' | 'chakri' | 'ladi';

interface PatakaMeta {
  id: PatakaType;
  name: string;
  hindi: string;
  bengali: string;
  tagline: string;
  icon: string;
  accentColor: string;
}

const PATAKAS: PatakaMeta[] = [
  {
    id: 'anaar',
    name: 'Anaar (Flowerpot)',
    hindi: 'अनार',
    bengali: 'তুবড়ি (Tubri)',
    tagline: 'Cascading golden fountain shooting majestic stars into the night',
    icon: '🌋',
    accentColor: '#F7C85B',
  },
  {
    id: 'rocket',
    name: 'Cosmic Sky Rocket',
    hindi: 'रॉकेट',
    bengali: 'রকেট',
    tagline: 'Soars straight into the stratosphere and bursts in celestial starlight',
    icon: '🚀',
    accentColor: '#FFA439',
  },
  {
    id: 'chakri',
    name: 'Chakri (Ground Spinner)',
    hindi: 'चक्री',
    bengali: 'চরকি (Chorki)',
    tagline: 'Fierce spinning wheel ejecting swirling vortexes of emerald & gold sparks',
    icon: '🌀',
    accentColor: '#2ECC71',
  },
  {
    id: 'ladi',
    name: 'Festive Ladi String',
    hindi: 'पटाखा लड़ी',
    bengali: 'পটকা মালা (Ladi)',
    tagline: 'Rapid-fire rhythmic burst of joyful celebration and auspicious pops',
    icon: '💥',
    accentColor: '#E74C3C',
  },
];

export const PatakaSimulator: React.FC = () => {
  const [activePataka, setActivePataka] = useState<PatakaType>('anaar');
  const [isIgnited, setIsIgnited] = useState<boolean>(false);
  const [animationStage, setAnimationStage] = useState<string>('idle');
  const stageRef = useRef<HTMLDivElement>(null);

  // Clean animation state when changing selection
  const selectPataka = (type: PatakaType) => {
    if (isIgnited) return;
    setActivePataka(type);
    setAnimationStage('idle');
  };

  const ignitePataka = () => {
    if (isIgnited) return;
    setIsIgnited(true);
    setAnimationStage('fuse');

    if (activePataka === 'rocket') {
      soundEngine.playRocketSound();

      setTimeout(() => {
        setAnimationStage('launching');
      }, 500);

      setTimeout(() => {
        setAnimationStage('exploded');
        // High altitude fireworks burst
        confetti({
          particleCount: 90,
          spread: 100,
          origin: { y: 0.35 },
          colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#B9B8FF', '#FF5500'],
        });
      }, 1100);

      setTimeout(() => {
        setIsIgnited(false);
        setAnimationStage('idle');
      }, 3000);
    } else if (activePataka === 'anaar') {
      soundEngine.playAnaarSound();

      setTimeout(() => {
        setAnimationStage('fountain');
        // Continuous fountain stream
        const end = Date.now() + 2.5 * 1000;
        (function frame() {
          confetti({
            particleCount: 5,
            angle: 90,
            spread: 35,
            startVelocity: 45,
            origin: { y: 0.72 },
            colors: ['#FFFFFF', '#F7C85B', '#FFA439', '#FFD700'],
          });
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      }, 400);

      setTimeout(() => {
        setIsIgnited(false);
        setAnimationStage('idle');
      }, 3200);
    } else if (activePataka === 'chakri') {
      soundEngine.playChakriSound();

      setTimeout(() => {
        setAnimationStage('spinning');
        const end = Date.now() + 2.4 * 1000;
        (function frame() {
          confetti({
            particleCount: 6,
            spread: 360,
            startVelocity: 25,
            origin: { y: 0.68 },
            colors: ['#2ECC71', '#F7C85B', '#FFA439', '#FFF1D0'],
          });
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      }, 400);

      setTimeout(() => {
        setIsIgnited(false);
        setAnimationStage('idle');
      }, 3200);
    } else if (activePataka === 'ladi') {
      soundEngine.playLadiSound();

      setTimeout(() => {
        setAnimationStage('bursting');
        let count = 0;
        const interval = setInterval(() => {
          count++;
          confetti({
            particleCount: 16,
            spread: 60,
            origin: { y: 0.45 + (count % 3) * 0.1 },
            colors: ['#E74C3C', '#F7C85B', '#FFFFFF'],
          });
          if (count >= 10) {
            clearInterval(interval);
            setIsIgnited(false);
            setAnimationStage('idle');
          }
        }, 110);
      }, 350);
    }
  };

  const currentMeta = PATAKAS.find((p) => p.id === activePataka) || PATAKAS[0];

  return (
    <section id="pataka-simulator" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-galaxy-amber/15 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-galaxy-amber/15 border border-galaxy-amber/35 text-galaxy-amber text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Eco-Friendly Digital Firecrackers (पटाखे / পটকা)</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-galaxy-ivory tracking-tight mb-3">
            Ignite the Magical Cosmic Patakas
          </h2>
          <p className="text-sm sm:text-base text-galaxy-ivory/80 leading-relaxed font-sans">
            Experience the nostalgic joy of traditional Indian Diwali crackers with zero smoke, zero pollution,
            and pure starlight wonder.
          </p>
        </div>

        {/* Pataka Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {PATAKAS.map((p) => {
            const isSelected = activePataka === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => selectPataka(p.id)}
                disabled={isIgnited}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'glass-panel-gold border-galaxy-gold shadow-[0_0_25px_rgba(247,200,91,0.3)] scale-[1.03]'
                    : 'glass-panel border-white/10 hover:border-galaxy-gold/30 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{p.icon}</span>
                  <span className="text-[10px] uppercase font-bold text-galaxy-gold font-mono">
                    {p.hindi}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-galaxy-ivory">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-galaxy-lavender/70 font-sans line-clamp-1 mt-0.5">
                    {p.bengali}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Pataka Arena */}
        <div
          ref={stageRef}
          className="relative w-full h-[380px] sm:h-[460px] rounded-3xl glass-panel-gold border-2 border-galaxy-gold/35 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col items-center justify-between p-6 sm:p-10 overflow-hidden"
        >
          {/* Top Description Badge */}
          <div className="relative z-10 text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-galaxy-gold bg-galaxy-midnight/80 border border-galaxy-gold/30 mb-1">
              {currentMeta.name} ✦ {currentMeta.bengali}
            </span>
            <p className="text-xs text-galaxy-ivory/80 max-w-md mx-auto">
              {currentMeta.tagline}
            </p>
          </div>

          {/* Central Interactive Animation Zone */}
          <div className="relative w-full flex-1 flex items-center justify-center">
            {/* Visual: Rocket Pataka */}
            {activePataka === 'rocket' && (
              <div
                className={`relative flex flex-col items-center transition-all duration-700 ${
                  animationStage === 'launching'
                    ? '-translate-y-64 scale-75 opacity-90'
                    : animationStage === 'exploded'
                    ? '-translate-y-80 scale-125 opacity-0'
                    : 'translate-y-0 scale-100'
                }`}
              >
                {/* Rocket Nose Cone & Body */}
                <svg width="70" height="150" viewBox="0 0 100 200" className="drop-shadow-[0_0_15px_rgba(247,200,91,0.8)]">
                  {/* Pointed Head */}
                  <polygon points="50,10 20,60 80,60" fill="#E74C3C" stroke="#F7C85B" strokeWidth="2" />
                  {/* Cylinder Body */}
                  <rect x="25" y="60" width="50" height="90" fill="url(#rocketBodyGrad)" rx="3" stroke="#F7C85B" strokeWidth="1.5" />
                  {/* Festive Pattern */}
                  <circle cx="50" cy="105" r="14" fill="#F7C85B" />
                  <path d="M35 105 L65 105" stroke="#E74C3C" strokeWidth="2" />
                  {/* Wooden Stick */}
                  <rect x="47" y="150" width="6" height="50" fill="#8C4A14" />
                  {/* Fuse & Spark */}
                  {animationStage === 'fuse' && (
                    <circle cx="50" cy="155" r="5" fill="#FFF1D0" className="animate-ping" />
                  )}
                  {animationStage === 'launching' && (
                    <polygon points="40,150 50,195 60,150" fill="#FFA439" className="animate-pulse" />
                  )}
                  <defs>
                    <linearGradient id="rocketBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFA439" />
                      <stop offset="50%" stopColor="#E74C3C" />
                      <stop offset="100%" stopColor="#8C1D18" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Smoke & Fire Trail when Launching */}
                {animationStage === 'launching' && (
                  <div className="w-4 h-24 bg-gradient-to-b from-galaxy-amber via-yellow-300 to-transparent filter blur-sm animate-pulse" />
                )}
              </div>
            )}

            {/* Visual: Anaar / Flowerpot */}
            {activePataka === 'anaar' && (
              <div className="relative flex flex-col items-center">
                {/* Roaring fountain of light */}
                {animationStage === 'fountain' && (
                  <div className="absolute bottom-28 w-44 h-64 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-t from-galaxy-gold via-yellow-200 to-transparent filter blur-md animate-pulse opacity-90" />
                    <div className="absolute inset-x-8 bottom-0 h-full bg-gradient-to-t from-white via-galaxy-gold to-transparent filter blur-sm" />
                  </div>
                )}

                {/* Anaar Clay Cone */}
                <svg width="110" height="120" viewBox="0 0 120 120" className="drop-shadow-[0_0_20px_rgba(247,200,91,0.8)]">
                  {/* Triangular Cone Body */}
                  <polygon
                    points="60,20 15,110 105,110"
                    fill="url(#anaarGrad)"
                    stroke="#F7C85B"
                    strokeWidth="2"
                  />
                  {/* Top Rim */}
                  <ellipse cx="60" cy="20" rx="14" ry="4" fill="#D49228" stroke="#F7C85B" strokeWidth="1" />
                  {/* Decorative Golden Rings */}
                  <path d="M40 70 Q60 80 80 70" stroke="#F7C85B" strokeWidth="2" fill="none" />
                  <path d="M30 90 Q60 102 90 90" stroke="#F7C85B" strokeWidth="2" fill="none" />
                  {/* Wick */}
                  <path d="M60 20 Q58 10 60 5" stroke="#3E2415" strokeWidth="2" fill="none" />

                  {/* Sparkling Fuse */}
                  {animationStage === 'fuse' && (
                    <circle cx="60" cy="5" r="4" fill="#FFF1D0" className="animate-ping" />
                  )}
                  {animationStage === 'fountain' && (
                    <circle cx="60" cy="18" r="8" fill="#FFFFFF" className="animate-pulse" />
                  )}
                  <defs>
                    <linearGradient id="anaarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C0392B" />
                      <stop offset="50%" stopColor="#8C1D18" />
                      <stop offset="100%" stopColor="#4A0B09" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}

            {/* Visual: Chakri / Ground Spinner */}
            {activePataka === 'chakri' && (
              <div className="relative flex flex-col items-center">
                {/* Spiral Chakri Body */}
                <div
                  className={`relative w-36 h-36 rounded-full flex items-center justify-center ${
                    animationStage === 'spinning' ? 'animate-spin [animation-duration:0.2s]' : ''
                  }`}
                >
                  <svg viewBox="0 0 140 140" className="w-full h-full drop-shadow-[0_0_25px_rgba(46,204,113,0.7)]">
                    <circle cx="70" cy="70" r="64" fill="#145A32" stroke="#2ECC71" strokeWidth="3" />
                    {/* Spiral Coils */}
                    <path
                      d="M70 70 M70 40 A30 30 0 0 1 100 70 M70 20 A50 50 0 0 1 120 70 M70 8 A62 62 0 0 1 132 70"
                      stroke="#F7C85B"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx="70" cy="70" r="10" fill="#F7C85B" />
                    {/* Fuse on edge */}
                    <circle cx="132" cy="70" r="4" fill="#FFF1D0" className={animationStage === 'fuse' ? 'animate-ping' : ''} />
                  </svg>
                </div>

                {/* Spinning Sparks Halo */}
                {animationStage === 'spinning' && (
                  <div className="absolute inset-0 -m-8 rounded-full border-4 border-dashed border-galaxy-gold animate-spin filter blur-[1px] opacity-90" />
                )}
              </div>
            )}

            {/* Visual: Ladi / String */}
            {activePataka === 'ladi' && (
              <div className="relative flex flex-col items-center">
                <div className="flex flex-col items-center space-y-1">
                  {/* Hanging Thread */}
                  <div className="w-1 h-6 bg-[#D49228]" />
                  {/* Red Crackers Grid */}
                  <div className="grid grid-cols-2 gap-1.5 p-3 rounded-2xl bg-galaxy-midnight/80 border border-red-500/40 shadow-xl">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-10 h-4 rounded-full bg-gradient-to-r from-red-600 to-rose-700 border border-yellow-300/60 shadow flex items-center justify-center transition-opacity ${
                          animationStage === 'bursting' && i % 2 === 0 ? 'opacity-30 scale-90' : 'opacity-100'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flash Bursts */}
                {animationStage === 'bursting' && (
                  <div className="absolute inset-0 bg-yellow-300/30 rounded-full filter blur-xl animate-ping" />
                )}
              </div>
            )}
          </div>

          {/* Ignition Control Button */}
          <div className="relative z-10 w-full max-w-sm text-center">
            <button
              type="button"
              onClick={ignitePataka}
              disabled={isIgnited}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center space-x-2.5 transition-all shadow-[0_0_25px_rgba(247,200,91,0.4)] ${
                isIgnited
                  ? 'bg-galaxy-midnight text-galaxy-gold border border-galaxy-gold/60 cursor-wait animate-pulse'
                  : 'bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight hover:scale-105 active:scale-95'
              }`}
            >
              <Flame className="w-5 h-5 fill-current" />
              <span>
                {isIgnited ? '💥 Sizzling & Popping...' : `Light the ${currentMeta.name} (पटाखा जलाओ)`}
              </span>
            </button>

            <p className="text-[11px] text-galaxy-lavender/70 font-sans mt-2">
              🍃 100% Digital Green Cracker ✦ Safe for Pets & Nature
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
