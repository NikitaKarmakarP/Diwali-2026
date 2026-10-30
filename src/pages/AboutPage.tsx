import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Flame, Shield, Heart, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-galaxy-gold/15 border border-galaxy-gold/30 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Philosophy & Heritage</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-galaxy-ivory tracking-tight mb-4">
            The Cosmic Spirit of Diwali
          </h1>
          <p className="text-base sm:text-lg text-galaxy-ivory/80 leading-relaxed font-sans max-w-2xl mx-auto">
            Light Up Someone’s Universe — where timeless Vedic traditions meet the infinite beauty of the cosmos.
          </p>
        </div>

        {/* Section 1: The Festival of Lights */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-galaxy-gold/25 space-y-4">
          <div className="flex items-center space-x-3 text-galaxy-gold">
            <Flame className="w-6 h-6 diya-flame-anim" />
            <h2 className="font-serif font-bold text-2xl text-galaxy-ivory">
              Why We Light the Diya
            </h2>
          </div>
          <p className="text-sm sm:text-base text-galaxy-ivory/85 leading-relaxed font-sans">
            Diwali (Deepavali), the festival of lights, symbolizes the eternal triumph of light over
            darkness, knowledge over ignorance, and righteousness over despair. In ancient thought:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/20 text-center">
              <span className="font-serif font-bold text-galaxy-gold block mb-1">The Clay Vessel</span>
              <p className="text-xs text-galaxy-lavender/80">
                Represents the human body and mortal vessel crafted from the earth.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/20 text-center">
              <span className="font-serif font-bold text-galaxy-gold block mb-1">The Sacred Oil</span>
              <p className="text-xs text-galaxy-lavender/80">
                Represents our negative tendencies, ego, and doubts surrendered to the fire.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/20 text-center">
              <span className="font-serif font-bold text-galaxy-gold block mb-1">The Pure Flame</span>
              <p className="text-xs text-galaxy-lavender/80">
                Represents the awakened soul, radiating warmth and cosmic wisdom.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Universal Harmony & Linguistic Diversity */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-galaxy-gold/25 space-y-4">
          <div className="flex items-center space-x-3 text-galaxy-gold">
            <Heart className="w-6 h-6 text-rose-400" />
            <h2 className="font-serif font-bold text-2xl text-galaxy-ivory">
              Inclusive, Multilingual & Truly Unicode
            </h2>
          </div>
          <p className="text-sm sm:text-base text-galaxy-ivory/85 leading-relaxed font-sans">
            Diwali transcends geography and languages. Whether you share greetings in English,
            Hindi (शुभ दीपावली), or Bengali (শুভ দীপাবলি), Diwali Galaxy Wishes ensures every
            letter, accent, and emoji renders with typographic fidelity and elegance across all devices.
          </p>
        </div>

        {/* Section 3: Privacy & Security by Design */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-galaxy-gold/25 space-y-4">
          <div className="flex items-center space-x-3 text-galaxy-gold">
            <Shield className="w-6 h-6 text-galaxy-gold" />
            <h2 className="font-serif font-bold text-2xl text-galaxy-ivory">
              Transparent, Client-First Privacy
            </h2>
          </div>
          <p className="text-sm sm:text-base text-galaxy-ivory/85 leading-relaxed font-sans">
            When you create a wish on Diwali Galaxy Wishes, your greeting data is encoded directly into
            the URL parameters using standard URL-safe formatting. We do not require account sign-ups,
            passwords, or intrusive tracking. Your greetings remain entirely yours to share.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <Link
            to="/create"
            className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-base shadow-[0_0_25px_rgba(247,200,91,0.4)] hover:shadow-[0_0_35px_rgba(247,200,91,0.6)] hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            <span>Create Your Cosmic Greeting Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
