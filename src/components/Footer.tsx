import React from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <footer className="relative mt-24 border-t border-galaxy-gold/30 bg-gradient-to-b from-[#09112F]/95 via-[#060B1E] to-[#040714] text-galaxy-lavender/80 text-sm overflow-hidden">
      {/* Decorative Ornate Toran (Festive Indian Arch Border) along top */}
      <div className="absolute top-0 inset-x-0 h-4 flex items-center justify-center overflow-hidden opacity-70 pointer-events-none" aria-hidden="true">
        <div className="w-full flex items-center justify-around space-x-1">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-galaxy-gold animate-pulse" />
              <div className="w-4 h-[1px] bg-gradient-to-r from-transparent via-galaxy-gold/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Atmospheric Background Nebula Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-galaxy-gold/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-galaxy-nebula/20 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-14">
          {/* Column 1: Brand & Sacred Invocation (5 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center space-x-3.5 group outline-none">
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-galaxy-gold/25 via-galaxy-amber/15 to-transparent border border-galaxy-gold/40 flex items-center justify-center shadow-[0_0_20px_rgba(247,200,91,0.3)] group-hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 100 100" className="w-8 h-8 drop-shadow-[0_0_8px_rgba(247,200,91,0.8)]">
                  <path
                    d="M50 14 C44 26 42 34 50 46 C58 34 56 26 50 14 Z"
                    fill="#F7C85B"
                    className="diya-flame-anim"
                  />
                  <circle cx="50" cy="38" r="6" fill="#FFF1D0" />
                  <path
                    d="M22 52 Q50 76 78 52 Q70 78 50 78 Q30 78 22 52 Z"
                    fill="#F7C85B"
                    stroke="#D49228"
                    strokeWidth="2"
                  />
                  <ellipse cx="50" cy="52" rx="28" ry="6" fill="#D49228" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-xl text-galaxy-ivory tracking-wide group-hover:text-galaxy-gold transition-colors">
                  Diwali Galaxy Wishes
                </span>
                <span className="text-[11px] tracking-widest uppercase text-galaxy-gold font-sans">
                  Light Up Someone’s Universe
                </span>
              </div>
            </Link>

            <p className="text-sm text-galaxy-ivory/80 leading-relaxed font-sans">
              An immersive celestial sanctuary blending ancient Vedic traditions with the cosmic
              beauty of the night sky. Send heartfelt greetings, light interactive diyas, and ignite
              love across the universe.
            </p>

            {/* Sacred Shloka Plaque */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-galaxy-midnight/90 to-galaxy-royal/60 border border-galaxy-gold/25 shadow-inner">
              <div className="flex items-center space-x-2 text-galaxy-gold text-xs font-serif mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-bold tracking-wider uppercase">Brihadaranyaka Upanishad</span>
              </div>
              <p className="font-serif text-sm text-galaxy-ivory italic leading-snug">
                “ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥”
              </p>
              <p className="text-[11px] text-galaxy-lavender/70 font-sans mt-1">
                Lead us from the unreal to the real, from darkness to light, from mortality to immortality.
              </p>
            </div>

            {/* Live Cosmic Status Indicator */}
            <div className="flex items-center space-x-2.5 text-xs text-galaxy-gold/90 font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Cosmic Sanctuary Active ✦ Shining Globally</span>
            </div>
          </div>

          {/* Column 2: Cosmic Navigation (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-galaxy-gold flex items-center space-x-2">
              <Compass className="w-4 h-4 text-galaxy-gold" />
              <span>Cosmic Experiences</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="flex items-center space-x-2 hover:text-galaxy-gold transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-galaxy-gold/50" />
                  <span>Sanctuary (Home)</span>
                </Link>
              </li>
              <li>
                <Link to="/create" className="flex items-center space-x-2 hover:text-galaxy-gold transition-colors">
                  <Send className="w-3.5 h-3.5 text-galaxy-gold" />
                  <span>Personalize a Wish</span>
                </Link>
              </li>
              <li>
                <a href="/#light-diya" className="flex items-center space-x-2 hover:text-galaxy-gold transition-colors">
                  <Flame className="w-3.5 h-3.5 text-galaxy-amber" />
                  <span>Light a Diya (7 Blessings)</span>
                </a>
              </li>
              <li>
                <a href="/#sky-lanterns" className="flex items-center space-x-2 hover:text-galaxy-gold transition-colors">
                  <Wind className="w-3.5 h-3.5 text-galaxy-lavender" />
                  <span>Release an Akash Deep</span>
                </a>
              </li>
              <li>
                <a href="/#cosmic-rangoli" className="flex items-center space-x-2 hover:text-galaxy-gold transition-colors">
                  <Palette className="w-3.5 h-3.5 text-galaxy-gold" />
                  <span>Cosmic Rangoli Art</span>
                </a>
              </li>
              <li>
                <a href="/#five-days" className="flex items-center space-x-2 hover:text-galaxy-gold transition-colors">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Five Days of Diwali</span>
                </a>
              </li>
              <li>
                <a href="/#community-wall" className="flex items-center space-x-2 hover:text-galaxy-gold transition-colors">
                  <Globe className="w-3.5 h-3.5 text-sky-400" />
                  <span>Constellation of Wishes</span>
                </a>
              </li>
              <li>
                <Link to="/about" className="flex items-center space-x-2 hover:text-galaxy-gold transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-galaxy-gold/50" />
                  <span>Symbolism & Philosophy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Multilingual Festive Voices (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-galaxy-gold flex items-center space-x-2">
              <Globe className="w-4 h-4 text-galaxy-gold" />
              <span>Voices of Light</span>
            </h4>
            <div className="space-y-2">
              {greetings.map((g) => (
                <div
                  key={g.lang}
                  className="p-2 rounded-xl bg-galaxy-midnight/60 border border-galaxy-gold/15 hover:border-galaxy-gold/40 transition-colors"
                >
                  <p className="text-[10px] text-galaxy-lavender/60 font-sans uppercase tracking-wider">
                    {g.lang}
                  </p>
                  <p className="text-xs font-serif font-bold text-galaxy-ivory">
                    {g.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Client-First Privacy & Architecture (2.5 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-galaxy-gold flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-galaxy-gold" />
              <span>Client-First Privacy</span>
            </h4>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-galaxy-royal/60 to-galaxy-midnight/80 border border-galaxy-gold/20 space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-semibold uppercase tracking-wider border border-emerald-500/30">
                Zero Tracker Architecture
              </span>
              <p className="text-xs text-galaxy-ivory/80 leading-relaxed font-sans">
                Greetings are encoded directly into safe URL parameters. No private messages or
                contact details are saved to external databases or shared with third parties.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/create"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-xs shadow-md hover:brightness-110 active:scale-98 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Your Greeting Now</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Ornate Divider with Auspicious Diya */}
        <div className="relative my-8 flex items-center justify-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-galaxy-gold/30 to-transparent" />
          <div className="absolute px-4 bg-[#060B1E] flex items-center space-x-3 text-galaxy-gold text-xs font-serif">
            <span>✦</span>
            <span className="diya-flame-anim inline-block">🪔</span>
            <span>शुभं करोति कल्याणम् आरोग्यं धनसंपदाम्</span>
            <span className="diya-flame-anim inline-block">🪔</span>
            <span>✦</span>
          </div>
        </div>

        {/* Bottom Attribution & Back to Top */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-galaxy-lavender/70 gap-4">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Diwali Galaxy Wishes. All rights reserved.</p>
            <span className="hidden sm:inline text-galaxy-gold/40">•</span>
            <p className="flex items-center space-x-1.5">
              <span>Made with heartfelt devotion & cosmic wonder</span>
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-current animate-pulse" />
            </p>
          </div>

          {/* Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-galaxy-midnight/80 hover:bg-galaxy-royal text-galaxy-gold border border-galaxy-gold/30 hover:border-galaxy-gold transition-all duration-200 active:scale-95 shadow-md"
            aria-label="Scroll back to top of the page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
