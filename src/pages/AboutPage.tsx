import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Flame,
  Shield,
  Heart,
  ArrowRight,
  Sun,
  Moon,
  Globe,
  Lock,
  Compass,
  Star,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface DiyaPart {
  id: string;
  name: string;
  sanskrit: string;
  symbolism: string;
  lesson: string;
  glowColor: string;
}

const DIYA_PARTS: DiyaPart[] = [
  {
    id: 'clay',
    name: 'The Clay Vessel',
    sanskrit: 'मृत्तिका पात्र (Mṛttikā)',
    symbolism: 'The Human Mortal Body & Earth Element',
    lesson: 'Born of humble earth and clay, reminding us that true inner divinity resides in simplicity and humility.',
    glowColor: '#D49228',
  },
  {
    id: 'oil',
    name: 'The Sacred Oil & Cow Ghee',
    sanskrit: 'स्नेह / घृत (Sneha & Ghrita)',
    symbolism: 'Negative Tendencies, Ego & Anxieties',
    lesson: 'As the oil is consumed to generate light, our ego and jealousies must be willingly surrendered into cosmic wisdom.',
    glowColor: '#FFA439',
  },
  {
    id: 'wick',
    name: 'The Cotton Wick',
    sanskrit: 'वर्तिका (Vartikā)',
    symbolism: 'The One-Pointed Focused Mind',
    lesson: 'Twisted single-mindedly toward the heavens, teaching that unwavering focus and pure intention elevate the spirit.',
    glowColor: '#FFF1D0',
  },
  {
    id: 'flame',
    name: 'The Radiant Flame',
    sanskrit: 'ज्योतिः (Jyotiḥ)',
    symbolism: 'The Eternal Soul / Ātman',
    lesson: 'Always pointing upward despite wind or gravity, representing the inextinguishable light of truth and divine courage.',
    glowColor: '#F7C85B',
  },
];

export const AboutPage: React.FC = () => {
  const [selectedDiyaPart, setSelectedDiyaPart] = useState<string>('flame');

  const activePart = DIYA_PARTS.find((p) => p.id === selectedDiyaPart) || DIYA_PARTS[3];

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-14 sm:py-24 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      {/* ── Background Nebulae & Rotating Aura ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-galaxy-amber/15 via-galaxy-gold/20 to-purple-900/15 rounded-full filter blur-[160px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-galaxy-nebula/30 rounded-full filter blur-[140px] pointer-events-none -z-10" />

      {/* Floating Stardust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-galaxy-gold"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 13) % 95}%`,
              left: `${(i * 19) % 95}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.75, 0.2],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.25,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20 relative z-10">
        {/* ── Header with Breathing Sacred Chakra ── */}
        <div className="text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-galaxy-gold/20 via-galaxy-amber/25 to-galaxy-gold/20 border border-galaxy-gold/50 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 shadow-[0_0_25px_rgba(247,200,91,0.3)] backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-galaxy-gold animate-spin-slow" />
            <span className="font-serif">सनातन दर्शन ✦ Timeless Vedic Philosophy & Heritage</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif font-black text-4xl sm:text-6xl lg:text-7xl text-galaxy-ivory tracking-tight mb-6 leading-tight"
          >
            The Cosmic Spirit of{' '}
            <span className="gold-gradient-text drop-shadow-[0_4px_30px_rgba(247,200,91,0.45)]">
              Deepavali
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-galaxy-ivory/85 leading-relaxed font-sans max-w-3xl mx-auto"
          >
            <strong className="text-galaxy-gold font-serif">Light Up Someone’s Universe</strong> — an
            ethereal digital sanctuary where ancient Vedic metaphysics, cosmic starlight, and modern
            privacy-first engineering unite to spread boundless joy.
          </motion.p>
        </div>

        {/* ── Sacred Upanishadic Shloka Plaque ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel-gold rounded-3xl p-8 sm:p-10 border-2 border-galaxy-gold/45 shadow-[0_20px_60px_rgba(0,0,0,0.6)] text-center relative overflow-hidden"
        >
          {/* Subtle rotating chakra */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-galaxy-gold/15 rounded-full pointer-events-none animate-spin-slow opacity-30" />

          <span className="text-xs uppercase tracking-widest text-galaxy-gold font-bold font-mono px-3 py-1 rounded-full bg-galaxy-midnight/80 border border-galaxy-gold/30 inline-block mb-3">
            Brihadaranyaka Upanishad (1.3.28)
          </span>

          <h2 className="font-serif font-black text-2xl sm:text-4xl text-galaxy-ivory mb-3 leading-snug drop-shadow-md">
            “ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥”
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-galaxy-gold max-w-2xl mx-auto leading-relaxed mb-4">
            “Lead us from the unreal to the real, from darkness into eternal light, and from the fear
            of mortality into the nectar of immortality.”
          </p>

          <div className="flex items-center justify-center space-x-2 text-xs text-galaxy-lavender/80">
            <span>✦</span>
            <span>The foundational spiritual beacon of every lamp lit across the cosmos</span>
            <span>✦</span>
          </div>
        </motion.div>

        {/* ── Section 1: The Interactive Anatomy & Symbolism of the Diya ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel-gold rounded-3xl p-6 sm:p-12 border-2 border-galaxy-gold/40 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-galaxy-gold/25 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-galaxy-gold text-xs uppercase font-bold tracking-wider mb-1">
                <Flame className="w-4 h-4 text-galaxy-amber animate-pulse" />
                <span>Deepa Tattva • The Anatomy of Light</span>
              </div>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-galaxy-ivory">
                Why We Light the Diya
              </h2>
            </div>
            <span className="text-xs text-galaxy-lavender/80 font-sans italic">
              Tap any component to reveal its esoteric meaning
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Diya Presentation */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-galaxy-midnight/80 border border-galaxy-gold/30 shadow-inner relative">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
                {/* Glowing Aura Ring */}
                <motion.div
                  className="absolute w-36 h-36 rounded-full filter blur-xl"
                  style={{ backgroundColor: activePart.glowColor }}
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.35, 0.7, 0.35],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Diya SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                  {/* Flame */}
                  <g className="diya-flame-anim" style={{ transformOrigin: '50px 38px' }}>
                    <circle cx="50" cy="30" r="16" fill="#F7C85B" opacity="0.3" filter="blur(6px)" />
                    <path
                      d="M50 10 C42 24 40 34 50 46 C60 34 58 24 50 10 Z"
                      fill={selectedDiyaPart === 'flame' ? '#FFF1D0' : '#F7C85B'}
                    />
                    <circle cx="50" cy="36" r="5" fill="#FFFFFF" opacity="0.95" />
                  </g>

                  {/* Wick */}
                  <path
                    d="M50 48 Q48 42 50 38"
                    stroke={selectedDiyaPart === 'wick' ? '#FFFFFF' : '#8A5832'}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Brass Rim */}
                  <ellipse
                    cx="50"
                    cy="52"
                    rx="34"
                    ry="8"
                    fill={selectedDiyaPart === 'oil' ? '#FFD700' : '#D49228'}
                    stroke="#F7C85B"
                    strokeWidth="1.5"
                  />
                  <ellipse cx="50" cy="52" rx="28" ry="5" fill="#5C2E0B" />

                  {/* Clay Vessel */}
                  <path
                    d="M16 52 Q50 86 84 52 Q74 88 50 88 Q26 88 16 52 Z"
                    fill={selectedDiyaPart === 'clay' ? '#E67E22' : '#8C4A14'}
                    stroke="#F7C85B"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <span className="text-xs font-mono font-bold text-galaxy-gold mt-4">
                ✦ {activePart.name} ({activePart.sanskrit}) ✦
              </span>
            </div>

            {/* Interactive Selector & Lore Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-2 gap-2.5">
                {DIYA_PARTS.map((part) => {
                  const isSelected = selectedDiyaPart === part.id;
                  return (
                    <button
                      key={part.id}
                      type="button"
                      onClick={() => {
                        soundEngine.playDiyaLightSound();
                        setSelectedDiyaPart(part.id);
                      }}
                      className={`p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-galaxy-gold bg-galaxy-gold/25 shadow-[0_0_20px_rgba(247,200,91,0.35)]'
                          : 'border-white/10 bg-galaxy-midnight/80 hover:border-galaxy-gold/40'
                      }`}
                    >
                      <span className="font-serif font-bold text-xs sm:text-sm text-galaxy-ivory block mb-0.5">
                        {part.name}
                      </span>
                      <span className="text-[10px] text-galaxy-gold font-mono block">
                        {part.sanskrit}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Detail Card for Active Part */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePart.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 sm:p-6 rounded-2xl bg-galaxy-midnight/90 border border-galaxy-gold/30 shadow-md space-y-3"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-galaxy-gold block mb-1">
                      Spiritual Symbolism
                    </span>
                    <h3 className="font-serif font-black text-lg sm:text-xl text-galaxy-ivory">
                      {activePart.symbolism}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-galaxy-ivory/85 leading-relaxed font-sans">
                    {activePart.lesson}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ── Section 2: The 4 Sacred Pillars of Deepavali ── */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-galaxy-ivory tracking-tight mb-2">
              The Four Cosmic Pillars
            </h2>
            <p className="text-xs sm:text-sm text-galaxy-ivory/80 font-sans">
              Why this auspicious festival continues to unite millions of souls across continents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-galaxy-gold/30 shadow-lg space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-galaxy-gold text-2xl mb-2 shadow-sm">
                🏹
              </div>
              <h3 className="font-serif font-black text-xl text-galaxy-ivory">
                The Triumph of Dharma (Light over Darkness)
              </h3>
              <p className="text-xs sm:text-sm text-galaxy-ivory/85 leading-relaxed font-sans">
                Commemorating Lord Rama’s triumphant return to Ayodhya after defeating Ravana, and
                Maa Kali’s ferocious destruction of ego-bound demons. Deepavali reminds us that no matter
                how vast the night, a single sincere flame dispels the darkness.
              </p>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-galaxy-gold/30 shadow-lg space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-galaxy-gold/20 border border-galaxy-gold/40 flex items-center justify-center text-galaxy-gold text-2xl mb-2 shadow-sm">
                🌸
              </div>
              <h3 className="font-serif font-black text-xl text-galaxy-ivory">
                The Divine Emergence of Lakshmi & Ganesha
              </h3>
              <p className="text-xs sm:text-sm text-galaxy-ivory/85 leading-relaxed font-sans">
                Emerging from the churning of the cosmic ocean (Samudra Manthan), Goddess Lakshmi brings
                spiritual and material abundance. Coupled with Lord Ganesha’s intellect and wisdom,
                prosperity remains balanced, noble, and benevolent.
              </p>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-galaxy-gold/30 shadow-lg space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 text-2xl mb-2 shadow-sm">
                🌱
              </div>
              <h3 className="font-serif font-black text-xl text-galaxy-ivory">
                Eco-Friendly Digital Celebration
              </h3>
              <p className="text-xs sm:text-sm text-galaxy-ivory/85 leading-relaxed font-sans">
                Our digital patakas, virtual sky lanterns, and cosmic diyas celebrate the grand spectacle
                of firecrackers with zero toxic smoke, zero carbon emissions, and zero noise trauma for
                cherished pets, elders, and mother earth.
              </p>
            </motion.div>

            {/* Pillar 4 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-galaxy-gold/30 shadow-lg space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 text-2xl mb-2 shadow-sm">
                ❤️
              </div>
              <h3 className="font-serif font-black text-xl text-galaxy-ivory">
                Multilingual Unicode Harmony
              </h3>
              <p className="text-xs sm:text-sm text-galaxy-ivory/85 leading-relaxed font-sans">
                Whether sharing heartfelt blessings in Bengali (শুভ দীপাবলি), Hindi (शुभ दीपावली),
                Sanskrit, Tamil, or English, every glyph renders with typographic beauty and emotional
                fidelity across every smartphone, tablet, and screen.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Section 3: Transparent, Client-First Privacy Architecture ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel-gold rounded-3xl p-6 sm:p-10 border-2 border-galaxy-gold/35 shadow-xl relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-black text-xl sm:text-2xl text-galaxy-ivory">
                  Zero Tracker, Zero Database Architecture
                </h3>
                <p className="text-xs text-galaxy-gold font-mono">
                  ✦ Client-Side Cryptographic URL Parameter Encoding ✦
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              100% Private
            </span>
          </div>

          <p className="text-xs sm:text-sm text-galaxy-ivory/85 leading-relaxed font-sans mb-6">
            When you create a wish on Diwali Galaxy Wishes, your greeting message, sender name, and
            chosen cosmic theme are packed directly into safe URL query parameters. No user accounts,
            no tracking cookies, and no centralized databases store your private moments. The greeting
            lives only between you and the loved one you send it to.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/20 flex items-center space-x-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-galaxy-ivory/90">No login or password required</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/20 flex items-center space-x-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-galaxy-ivory/90">No personal data collected or sold</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/20 flex items-center space-x-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-galaxy-ivory/90">Instant link sharing on WhatsApp & SMS</span>
            </div>
          </div>
        </motion.div>

        {/* ── Grand Final Festive CTA ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center pt-6"
        >
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-galaxy-royal/80 via-galaxy-midnight/90 to-galaxy-midnight border-2 border-galaxy-gold/45 shadow-[0_20px_60px_rgba(0,0,0,0.65)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-galaxy-gold/15 rounded-full filter blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-galaxy-amber/15 rounded-full filter blur-3xl pointer-events-none" />

            <h3 className="font-serif font-black text-2xl sm:text-4xl text-galaxy-ivory tracking-tight mb-3">
              Ready to Send Light to the Universe?
            </h3>
            <p className="text-xs sm:text-base text-galaxy-ivory/80 font-sans max-w-xl mx-auto mb-8">
              Personalize an enchanted greeting card with sacred blessings, animated envelopes, and
              starlight fireworks for someone special.
            </p>

            <Link
              to="/create"
              className="inline-flex items-center space-x-2.5 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-base shadow-[0_0_30px_rgba(247,200,91,0.5)] hover:shadow-[0_0_45px_rgba(247,200,91,0.7)] hover:scale-105 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-current" />
              <span>Create Your Cosmic Greeting Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
