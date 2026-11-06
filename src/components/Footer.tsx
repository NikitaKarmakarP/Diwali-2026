import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Flame,
  ShieldCheck,
  Heart,
  ArrowUp,
  Globe,
  Compass,
  Palette,
  Wind,
  Calendar,
  Send,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const greetings = [
    { lang: 'Bengali (বাংলা)', text: 'শুভ দীপাবলি' },
    { lang: 'Hindi (हिन्दी)', text: 'शुभ दीपावली' },
    { lang: 'Sanskrit (संस्कृतम्)', text: 'दीपावल्याः शुभाशयाः' },
    { lang: 'Tamil (தமிழ்)', text: 'இனிய தீபாவளி நல்வாழ்த்துக்கள்' },
    { lang: 'Gujarati (ગુજરાતી)', text: 'દિવાળીની હાર્દિક શુભકામનાઓ' },
    { lang: 'Telugu (తెలుగు)', text: 'దీపావళి శుభాకాంక్షలు' },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const colVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const linkHover = {
    x: 5,
    color: '#F7C85B',
    transition: { duration: 0.2 },
  };

  return (
    <footer className="relative mt-24 border-t border-galaxy-gold/30 bg-gradient-to-b from-[#09112F]/95 via-[#060B1E] to-[#040714] text-galaxy-lavender/80 text-sm overflow-hidden">

      {/* ── Animated Toran Border ── */}
      <div className="absolute top-0 inset-x-0 h-5 flex items-center justify-center overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="w-full flex items-center justify-around">
          {Array.from({ length: 32 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex items-center space-x-1"
              animate={{ opacity: [0.3, 1, 0.3], scaleY: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.06, ease: 'easeInOut' }}
            >
              <span className="w-2 h-2 rounded-full bg-galaxy-gold shadow-[0_0_6px_rgba(247,200,91,0.8)]" />
              <div className="w-4 h-[1px] bg-gradient-to-r from-transparent via-galaxy-gold/60 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Floating Stardust Embers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-galaxy-gold"
            style={{
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              top: `${(i * 23) % 100}%`,
              left: `${(i * 37) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* ── Atmospheric Nebula Glow ── */}
      <motion.div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-galaxy-gold/10 rounded-full filter blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-galaxy-nebula/20 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">

        {/* ── Main Footer Grid ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Column 1: Brand & Shloka */}
          <motion.div variants={colVariants} className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center space-x-3.5 group outline-none">
              <motion.div
                className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-galaxy-gold/25 via-galaxy-amber/15 to-transparent border border-galaxy-gold/40 flex items-center justify-center shadow-[0_0_20px_rgba(247,200,91,0.3)]"
                whileHover={{ scale: 1.12, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg viewBox="0 0 100 100" className="w-8 h-8 drop-shadow-[0_0_8px_rgba(247,200,91,0.8)]">
                  <path d="M50 14 C44 26 42 34 50 46 C58 34 56 26 50 14 Z" fill="#F7C85B" className="diya-flame-anim" />
                  <circle cx="50" cy="38" r="6" fill="#FFF1D0" />
                  <path d="M22 52 Q50 76 78 52 Q70 78 50 78 Q30 78 22 52 Z" fill="#F7C85B" stroke="#D49228" strokeWidth="2" />
                  <ellipse cx="50" cy="52" rx="28" ry="6" fill="#D49228" />
                </svg>
              </motion.div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-xl text-galaxy-ivory tracking-wide group-hover:text-galaxy-gold transition-colors duration-300">
                  Diwali Galaxy Wishes
                </span>
                <span className="text-[11px] tracking-widest uppercase text-galaxy-gold font-sans">
                  Light Up Someone's Universe
                </span>
              </div>
            </Link>

            <p className="text-sm text-galaxy-ivory/80 leading-relaxed font-sans">
              An immersive celestial sanctuary blending ancient Vedic traditions with the cosmic
              beauty of the night sky. Send heartfelt greetings, light interactive diyas, and ignite
              love across the universe.
            </p>

            {/* Sacred Shloka Plaque */}
            <motion.div
              className="p-4 rounded-2xl bg-gradient-to-r from-galaxy-midnight/90 to-galaxy-royal/60 border border-galaxy-gold/25 shadow-inner"
              whileHover={{ borderColor: 'rgba(247,200,91,0.5)', boxShadow: '0 0 20px rgba(247,200,91,0.15)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-2 text-galaxy-gold text-xs font-serif mb-1">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                <span className="font-bold tracking-wider uppercase">Brihadaranyaka Upanishad</span>
              </div>
              <p className="font-serif text-sm text-galaxy-ivory italic leading-snug">
                "ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥"
              </p>
              <p className="text-[11px] text-galaxy-lavender/70 font-sans mt-1">
                Lead us from the unreal to the real, from darkness to light, from mortality to immortality.
              </p>
            </motion.div>

            {/* Live Status */}
            <div className="flex items-center space-x-2.5 text-xs text-galaxy-gold/90 font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Cosmic Sanctuary Active ✦ Shining Globally</span>
            </div>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div variants={colVariants} className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-galaxy-gold flex items-center space-x-2">
              <Compass className="w-4 h-4 text-galaxy-gold" />
              <span>Cosmic Experiences</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { to: '/', icon: <span className="w-1.5 h-1.5 rounded-full bg-galaxy-gold/50 inline-block" />, label: 'Sanctuary (Home)', isLink: true },
                { to: '/create', icon: <Send className="w-3.5 h-3.5 text-galaxy-gold" />, label: 'Personalize a Wish', isLink: true },
                { to: '/#light-diya', icon: <Flame className="w-3.5 h-3.5 text-galaxy-amber" />, label: 'Light a Diya (7 Blessings)', isLink: false },
                { to: '/#sky-lanterns', icon: <Wind className="w-3.5 h-3.5 text-galaxy-lavender" />, label: 'Release an Akash Deep', isLink: false },
                { to: '/#cosmic-rangoli', icon: <Palette className="w-3.5 h-3.5 text-galaxy-gold" />, label: 'Cosmic Rangoli Art', isLink: false },
                { to: '/#five-days', icon: <Calendar className="w-3.5 h-3.5 text-emerald-400" />, label: 'Five Days of Diwali', isLink: false },
                { to: '/#community-wall', icon: <Globe className="w-3.5 h-3.5 text-sky-400" />, label: 'Constellation of Wishes', isLink: false },
                { to: '/about', icon: <span className="w-1.5 h-1.5 rounded-full bg-galaxy-gold/50 inline-block" />, label: 'Symbolism & Philosophy', isLink: true },
              ].map((item, i) => (
                <motion.li key={item.label} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  {item.isLink ? (
                    <motion.div whileHover={linkHover}>
                      <Link to={item.to} className="flex items-center space-x-2 hover:text-galaxy-gold transition-colors">
                        {item.icon}<span>{item.label}</span>
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={linkHover}>
                      <a href={item.to} className="flex items-center space-x-2 hover:text-galaxy-gold transition-colors">
                        {item.icon}<span>{item.label}</span>
                      </a>
                    </motion.div>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Voices of Light */}
          <motion.div variants={colVariants} className="lg:col-span-2 space-y-4">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-galaxy-gold flex items-center space-x-2">
              <Globe className="w-4 h-4 text-galaxy-gold" />
              <span>Voices of Light</span>
            </h4>
            <div className="space-y-2">
              {greetings.map((g, i) => (
                <motion.div
                  key={g.lang}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.03, borderColor: 'rgba(247,200,91,0.5)' }}
                  className="p-2 rounded-xl bg-galaxy-midnight/60 border border-galaxy-gold/15 transition-colors cursor-default"
                >
                  <p className="text-[10px] text-galaxy-lavender/60 font-sans uppercase tracking-wider">{g.lang}</p>
                  <p className="text-xs font-serif font-bold text-galaxy-ivory">{g.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Column 4: Privacy */}
          <motion.div variants={colVariants} className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-galaxy-gold flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-galaxy-gold" />
              <span>Client-First Privacy</span>
            </h4>

            <motion.div
              className="p-4 rounded-2xl bg-gradient-to-br from-galaxy-royal/60 to-galaxy-midnight/80 border border-galaxy-gold/20 space-y-2"
              whileHover={{ borderColor: 'rgba(52,211,153,0.4)', boxShadow: '0 0 20px rgba(52,211,153,0.1)' }}
              transition={{ duration: 0.3 }}
            >
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-semibold uppercase tracking-wider border border-emerald-500/30">
                Zero Tracker Architecture
              </span>
              <p className="text-xs text-galaxy-ivory/80 leading-relaxed font-sans">
                Greetings are encoded directly into safe URL parameters. No private messages or
                contact details are saved to external databases or shared with third parties.
              </p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/create"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-xs shadow-md hover:brightness-110 active:scale-98 transition-all"
              >
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                <span>Create Your Greeting Now</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Ornate Divider ── */}
        <motion.div
          className="relative my-8 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-galaxy-gold/30 to-transparent" />
          <div className="absolute px-4 bg-[#060B1E] flex items-center space-x-3 text-galaxy-gold text-xs font-serif">
            <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>✦</motion.span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >🪔</motion.span>
            <span>शुभं करोति कल्याणम् आरोग्यं धनसंपदाम्</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="inline-block"
            >🪔</motion.span>
            <motion.span animate={{ rotate: [0, -360] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>✦</motion.span>
          </div>
        </motion.div>

        {/* ── Bottom Bar ── */}
        <motion.div
          className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-galaxy-lavender/70 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Diwali Galaxy Wishes. All rights reserved.</p>
            <span className="hidden sm:inline text-galaxy-gold/40">•</span>
            <p className="flex items-center space-x-1.5">
              <span>Made with heartfelt devotion & cosmic wonder</span>
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
              </motion.span>
            </p>
          </div>

          {/* Back to Top */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(247,200,91,0.4)' }}
            whileTap={{ scale: 0.94 }}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-galaxy-midnight/80 hover:bg-galaxy-royal text-galaxy-gold border border-galaxy-gold/40 hover:border-galaxy-gold transition-all duration-200 shadow-md font-semibold"
            aria-label="Scroll back to top of the page"
          >
            <span>Back to Top</span>
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};
