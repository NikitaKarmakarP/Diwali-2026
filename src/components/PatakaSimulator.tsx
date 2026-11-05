import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';
import { Sparkles, Flame, Volume2, ShieldCheck, Zap } from 'lucide-react';

type PatakaType = 'anaar' | 'rocket' | 'chakri' | 'ladi' | 'fuljhadi';

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
    tagline: 'Cascading golden fountain shooting majestic stars into the nocturnal sky',
    icon: '🌋',
    accentColor: '#F7C85B',
  },
  {
    id: 'rocket',
    name: 'Cosmic Sky Rocket',
    hindi: 'रॉकेट',
    bengali: 'রকেট',
    tagline: 'Soars straight into the stratosphere and bursts in celestial starlight bursts',
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
    id: 'fuljhadi',
    name: 'Fuljhadi (Sparkler)',
    hindi: 'फुलझड़ी',
    bengali: 'ফুলঝুড়ি (Fuljhuri)',
    tagline: 'Magical handheld wand showering endless dancing stars and warm glitter',
    icon: '✨',
    accentColor: '#FF9933',
  },
  {
    id: 'ladi',
    name: 'Festive 100-Ladi String',
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
      }, 550);

      setTimeout(() => {
        setAnimationStage('exploded');
        confetti({
          particleCount: 110,
          spread: 120,
          origin: { y: 0.3 },
          colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#B9B8FF', '#FF5500', '#FF5E7E'],
        });
      }, 1200);

      setTimeout(() => {
        setIsIgnited(false);
        setAnimationStage('idle');
      }, 3200);
    } else if (activePataka === 'anaar') {
      soundEngine.playAnaarSound();

      setTimeout(() => {
        setAnimationStage('fountain');
        const end = Date.now() + 2.8 * 1000;
        (function frame() {
          confetti({
            particleCount: 6,
            angle: 90,
            spread: 40,
            startVelocity: 50,
            origin: { y: 0.72 },
            colors: ['#FFFFFF', '#F7C85B', '#FFA439', '#FFD700', '#FFF1D0'],
          });
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      }, 400);

      setTimeout(() => {
        setIsIgnited(false);
        setAnimationStage('idle');
      }, 3400);
    } else if (activePataka === 'chakri') {
      soundEngine.playChakriSound();

      setTimeout(() => {
        setAnimationStage('spinning');
        const end = Date.now() + 2.6 * 1000;
        (function frame() {
          confetti({
            particleCount: 7,
            spread: 360,
            startVelocity: 30,
            origin: { y: 0.65 },
            colors: ['#2ECC71', '#F7C85B', '#FFA439', '#FFF1D0', '#00D2D3'],
          });
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      }, 400);

      setTimeout(() => {
        setIsIgnited(false);
        setAnimationStage('idle');
      }, 3300);
    } else if (activePataka === 'fuljhadi') {
      soundEngine.playDiyaLightSound();

      setTimeout(() => {
        setAnimationStage('sparkling');
        const end = Date.now() + 3.2 * 1000;
        (function frame() {
          confetti({
            particleCount: 4,
            spread: 120,
            startVelocity: 22,
            origin: { y: 0.55 },
            colors: ['#FFFFFF', '#F7C85B', '#FFA439', '#FFD700'],
          });
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      }, 300);

      setTimeout(() => {
        setIsIgnited(false);
        setAnimationStage('idle');
      }, 3800);
    } else if (activePataka === 'ladi') {
      soundEngine.playLadiSound();

      setTimeout(() => {
        setAnimationStage('bursting');
        let count = 0;
        const interval = setInterval(() => {
          count++;
          confetti({
            particleCount: 18,
            spread: 70,
            origin: { y: 0.45 + (count % 4) * 0.08 },
            colors: ['#E74C3C', '#F7C85B', '#FFFFFF', '#FFA439'],
          });
          if (count >= 12) {
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
    <section id="pataka-simulator" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radial Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[550px] bg-gradient-to-r from-galaxy-amber/15 via-orange-600/20 to-galaxy-gold/15 rounded-full filter blur-[150px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-galaxy-amber/15 border border-galaxy-amber/40 text-galaxy-amber text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(255,164,57,0.2)] backdrop-blur-md">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Eco-Friendly Digital Firecrackers ✦ डिजिटल ग्रीन पटाखे</span>
          </div>

          <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4 text-galaxy-ivory">
            <span className="gold-gradient-text drop-shadow-[0_4px_24px_rgba(247,200,91,0.35)]">
              Ignite the Magical Cosmic Patakas
            </span>
          </h2>

          <p className="text-base sm:text-lg text-galaxy-ivory/85 leading-relaxed font-sans max-w-2xl mx-auto">
            Experience the nostalgic joy of traditional Indian Diwali crackers with zero smoke, zero pollution,
            and pure starlight wonder. Completely safe for pets and planet Earth.
          </p>
        </div>

        {/* Pataka Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
          {PATAKAS.map((p) => {
            const isSelected = activePataka === p.id;
            return (
              <motion.button
                key={p.id}
                type="button"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.96 }}
                onClick={() => selectPataka(p.id)}
                disabled={isIgnited}
                className={`p-4 rounded-3xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[120px] ${
                  isSelected
                    ? 'glass-panel-gold border-2 border-galaxy-gold shadow-[0_0_30px_rgba(247,200,91,0.4)] scale-105'
                    : 'glass-panel border-white/10 hover:border-galaxy-gold/40 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{p.icon}</span>
                  <span className="text-[10px] uppercase font-bold text-galaxy-gold font-mono px-2 py-0.5 rounded-full bg-galaxy-midnight/80 border border-galaxy-gold/30">
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
              </motion.button>
            );
          })}
        </div>

        {/* Interactive Pataka Arena */}
        <div
          ref={stageRef}
          className="relative w-full h-[400px] sm:h-[480px] rounded-3xl glass-panel-gold border-2 border-galaxy-gold/45 shadow-[0_25px_70px_rgba(0,0,0,0.65)] flex flex-col items-center justify-between p-6 sm:p-10 overflow-hidden"
        >
          {/* Top Description Badge */}
          <div className="relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-galaxy-gold bg-galaxy-midnight/90 border border-galaxy-gold/40 mb-1.5 shadow-md">
              {currentMeta.name} ✦ {currentMeta.bengali}
            </span>
            <p className="text-xs sm:text-sm text-galaxy-ivory/85 max-w-lg mx-auto">
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
                    ? '-translate-y-72 scale-75 opacity-90'
                    : animationStage === 'exploded'
                    ? '-translate-y-96 scale-125 opacity-0'
                    : 'translate-y-0 scale-100'
                }`}
              >
                <svg width="76" height="160" viewBox="0 0 100 200" className="drop-shadow-[0_0_20px_rgba(247,200,91,0.9)]">
                  {/* Rocket Nose Cone */}
                  <polygon points="50,8 18,58 82,58" fill="#E74C3C" stroke="#F7C85B" strokeWidth="2" />
                  {/* Cylinder Body */}
                  <rect x="23" y="58" width="54" height="92" fill="url(#rocketBodyGrad)" rx="3" stroke="#F7C85B" strokeWidth="1.5" />
                  {/* Festive Pattern */}
                  <circle cx="50" cy="104" r="15" fill="#F7C85B" />
                  <path d="M33 104 L67 104" stroke="#E74C3C" strokeWidth="2.5" />
                  {/* Wooden Stick */}
                  <rect x="47" y="150" width="6" height="50" fill="#8C4A14" />
                  {/* Fuse Spark */}
                  {animationStage === 'fuse' && (
                    <circle cx="50" cy="155" r="6" fill="#FFF1D0" className="animate-ping" />
                  )}
                  {animationStage === 'launching' && (
                    <polygon points="38,150 50,200 62,150" fill="#FFA439" className="animate-pulse" />
                  )}
                  <defs>
                    <linearGradient id="rocketBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFA439" />
                      <stop offset="50%" stopColor="#E74C3C" />
                      <stop offset="100%" stopColor="#8C1D18" />
                    </linearGradient>
                  </defs>
                </svg>

                {animationStage === 'launching' && (
                  <div className="w-5 h-28 bg-gradient-to-b from-galaxy-amber via-yellow-200 to-transparent filter blur-sm animate-pulse" />
                )}
              </div>
            )}

            {/* Visual: Anaar / Flowerpot */}
            {activePataka === 'anaar' && (
              <div className="relative flex flex-col items-center">
                {animationStage === 'fountain' && (
                  <div className="absolute bottom-28 w-52 h-72 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-t from-galaxy-gold via-yellow-200 to-transparent filter blur-md animate-pulse opacity-95" />
                    <div className="absolute inset-x-8 bottom-0 h-full bg-gradient-to-t from-white via-galaxy-gold to-transparent filter blur-sm" />
                  </div>
                )}

                <svg width="120" height="130" viewBox="0 0 120 120" className="drop-shadow-[0_0_25px_rgba(247,200,91,0.9)]">
                  <polygon
                    points="60,18 12,112 108,112"
                    fill="url(#anaarGrad)"
                    stroke="#F7C85B"
                    strokeWidth="2.5"
                  />
                  <ellipse cx="60" cy="18" rx="15" ry="4.5" fill="#D49228" stroke="#F7C85B" strokeWidth="1" />
                  <path d="M38 68 Q60 80 82 68" stroke="#F7C85B" strokeWidth="2.5" fill="none" />
                  <path d="M28 92 Q60 104 92 92" stroke="#F7C85B" strokeWidth="2.5" fill="none" />
                  <path d="M60 18 Q58 8 60 4" stroke="#3E2415" strokeWidth="2.5" fill="none" />

                  {animationStage === 'fuse' && (
                    <circle cx="60" cy="4" r="5" fill="#FFF1D0" className="animate-ping" />
                  )}
                  {animationStage === 'fountain' && (
                    <circle cx="60" cy="18" r="10" fill="#FFFFFF" className="animate-pulse" />
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
                <div
                  className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-transform ${
                    animationStage === 'spinning' ? 'animate-spin [animation-duration:0.18s]' : ''
                  }`}
                >
                  <svg viewBox="0 0 140 140" className="w-full h-full drop-shadow-[0_0_30px_rgba(46,204,113,0.8)]">
                    <circle cx="70" cy="70" r="64" fill="#145A32" stroke="#2ECC71" strokeWidth="3.5" />
                    <path
                      d="M70 70 M70 40 A30 30 0 0 1 100 70 M70 20 A50 50 0 0 1 120 70 M70 8 A62 62 0 0 1 132 70"
                      stroke="#F7C85B"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx="70" cy="70" r="12" fill="#F7C85B" />
                    <circle cx="132" cy="70" r="5" fill="#FFF1D0" className={animationStage === 'fuse' ? 'animate-ping' : ''} />
                  </svg>
                </div>

                {animationStage === 'spinning' && (
                  <div className="absolute inset-0 -m-10 rounded-full border-4 border-dashed border-galaxy-gold animate-spin filter blur-[1px] opacity-95" />
                )}
              </div>
            )}

            {/* Visual: Fuljhadi (Sparkler) */}
            {activePataka === 'fuljhadi' && (
              <div className="relative flex flex-col items-center">
                <div className="relative flex flex-col items-center">
                  {/* Glowing Wire */}
                  <div className="w-1.5 h-36 bg-gradient-to-b from-[#8C4A14] to-[#555] rounded-full shadow-md" />

                  {/* Sparkler Coated Tip */}
                  <div className="absolute top-0 w-3 h-20 bg-gradient-to-b from-gray-400 via-gray-300 to-gray-500 rounded-full" />

                  {/* Dancing Starfire when ignited */}
                  {animationStage === 'sparkling' && (
                    <div className="absolute -top-6 w-20 h-20 rounded-full bg-yellow-200/40 filter blur-sm flex items-center justify-center animate-ping">
                      <div className="w-8 h-8 rounded-full bg-white filter blur-[2px] animate-spin" />
                    </div>
                  )}

                  {animationStage === 'fuse' && (
                    <circle cx="0" cy="0" r="6" fill="#FFF1D0" className="absolute -top-2 animate-ping" />
                  )}
                </div>
              </div>
            )}

            {/* Visual: Ladi / String */}
            {activePataka === 'ladi' && (
              <div className="relative flex flex-col items-center">
                <div className="flex flex-col items-center space-y-1.5">
                  <div className="w-1.5 h-8 bg-[#D49228]" />
                  <div className="grid grid-cols-2 gap-2 p-4 rounded-3xl bg-galaxy-midnight/90 border border-red-500/50 shadow-2xl">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-12 h-5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-700 border border-yellow-300/70 shadow flex items-center justify-between px-1.5 transition-all ${
                          animationStage === 'bursting' && i % 2 === 0 ? 'opacity-25 scale-90' : 'opacity-100'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                    ))}
                  </div>
                </div>

                {animationStage === 'bursting' && (
                  <div className="absolute inset-0 bg-yellow-300/40 rounded-full filter blur-2xl animate-ping" />
                )}
              </div>
            )}
          </div>

          {/* Ignition Action Button */}
          <div className="relative z-10 w-full max-w-md text-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={ignitePataka}
              disabled={isIgnited}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center space-x-2.5 transition-all shadow-[0_0_30px_rgba(247,200,91,0.4)] cursor-pointer ${
                isIgnited
                  ? 'bg-galaxy-midnight text-galaxy-gold border-2 border-galaxy-gold/60 cursor-wait animate-pulse'
                  : 'bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 hover:from-yellow-300 hover:to-galaxy-amber text-galaxy-midnight hover:shadow-[0_0_40px_rgba(247,200,91,0.6)]'
              }`}
            >
              <Flame className="w-5 h-5 fill-current" />
              <span>
                {isIgnited ? '💥 Sizzling & Popping Starlight...' : `Ignite ${currentMeta.name} (पटाखा जलाओ)`}
              </span>
              <Sparkles className="w-4 h-4" />
            </motion.button>

            <p className="text-xs text-galaxy-lavender/80 font-sans mt-2.5 flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Digital Green Cracker ✦ Safe for Pets, Elders & Mother Earth</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
