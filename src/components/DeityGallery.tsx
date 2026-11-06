import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Eye, X, ZoomIn, Heart, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';

interface DeityCard {
  id: string;
  name: string;
  title: string;
  sanskritMantra: string;
  category: 'Lakshmi' | 'Ganesh' | 'Kali';
  image: string;
  fallbackGradient: string;
  blessing: string;
}

const resolveImageUrl = (url: string) => {
  if (url.includes('pinterest.com/pin/1089871178608889875')) {
    return 'https://i.pinimg.com/1200x/87/e2/a9/87e2a9190f985a7b3d72fb95b58e004f.jpg';
  }
  if (url.includes('pinterest.com/pin/1090997079024153565')) {
    return 'https://i.pinimg.com/736x/87/e2/a9/87e2a9190f985a7b3d72fb95b58e004f.jpg';
  }
  return url;
};

const DEITIES_DATA: DeityCard[] = [
  {
    id: 'lakshmi-1',
    name: 'Goddess Maha Lakshmi',
    title: 'Goddess of Wealth, Fortune & Purity',
    sanskritMantra: 'ॐ महालक्ष्म्यै च विद्महे विष्णुपत्नी च धीमहि तन्नो लक्ष्मीः प्रचोदयात्॥',
    category: 'Lakshmi',
    image: 'https://i.pinimg.com/736x/27/49/53/274953580e86442d6f78e9f90a8bdeaf.jpg',
    fallbackGradient: 'from-amber-600 via-yellow-500 to-amber-700',
    blessing: 'May Goddess Lakshmi bestow boundless abundance, auspicious fortune, and golden light upon your home.',
  },
  {
    id: 'ganesh-1',
    name: 'Lord Ganesha',
    title: 'Vighnaharta — The Lord of Beginnings & Wisdom',
    sanskritMantra: 'ॐ गं गणपतये नमः ✦ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ॥',
    category: 'Ganesh',
    image: 'https://i.pinimg.com/1200x/46/dc/c4/46dcc49cb86a65a42b7eb4fbb46872ea.jpg',
    fallbackGradient: 'from-orange-600 via-amber-500 to-yellow-600',
    blessing: 'May Lord Ganesha remove every obstacle from your path and bless you with intellect, peace, and triumph.',
  },
  {
    id: 'kali-1',
    name: 'Maa Kali (Adya Shakti)',
    title: 'The Supreme Mother & Annihilator of Darkness',
    sanskritMantra: 'ॐ क्रीं कालिकायै नमः ✦ सर्वमङ्गलमङ्गल्ये शिवे सर्वार्थसाधिके॥',
    category: 'Kali',
    image: 'https://i.pinimg.com/1200x/87/e2/a9/87e2a9190f985a7b3d72fb95b58e004f.jpg',
    fallbackGradient: 'from-purple-900 via-indigo-900 to-slate-900',
    blessing: 'May Maa Kali shield you from all fear, destroy ignorance, and awaken profound divine courage in your heart.',
  },
  {
    id: 'kali-2',
    name: 'Maa Kali (Bhavatarini)',
    title: 'Loving Mother & Liberator of the Cosmos',
    sanskritMantra: 'नमो देव्यै महादेव्यै शिवायै सततं नमः॥',
    category: 'Kali',
    image: 'https://i.pinimg.com/736x/73/a0/4c/73a04c66e9762afc04ba504cc3641df9.jpg',
    fallbackGradient: 'from-blue-950 via-indigo-900 to-purple-900',
    blessing: 'May the compassionate gaze of Mother Bhavatarini illuminate every dark night and guide you toward eternal peace.',
  },
  {
    id: 'lakshmi-ganesh-puja',
    name: 'Lakshmi & Ganesha Darshan',
    title: 'Sacred Deepavali Joint Divine Blessing',
    sanskritMantra: 'शुभं करोति कल्याणम् आरोग्यम् धनसंपदा॥',
    category: 'Lakshmi',
    image: 'https://i.pinimg.com/736x/d1/e2/e0/d1e2e0bcac5ec0fbdfb4e50cd752ef74.jpg',
    fallbackGradient: 'from-amber-500 via-yellow-600 to-red-600',
    blessing: 'May the sacred union of Wisdom and Prosperity grant harmony, righteousness, and auspicious joy to your family.',
  },
  {
    id: 'kali-3',
    name: 'Maa Kali (Mahavidya)',
    title: 'Eternal Light Behind the Cosmic Void',
    sanskritMantra: 'ॐ जयन्ती मङ्गला काली भद्रकाली कपालिनी। दुर्गा क्षमा शिवा धात्री स्वाहा स्वधा नमोऽस्तु ते॥',
    category: 'Kali',
    image: 'https://i.pinimg.com/736x/8f/67/70/8f67700d44d317351ab6a3dc2f2bc46b.jpg',
    fallbackGradient: 'from-slate-950 via-purple-950 to-indigo-950',
    blessing: 'May the eternal Shakti empower your spirit to overcome every trial with unwavering serenity and righteous power.',
  },
];

export const DeityGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Lakshmi' | 'Ganesh' | 'Kali'>('All');
  const [selectedDeity, setSelectedDeity] = useState<DeityCard | null>(null);
  const [offeredDiyas, setOfferedDiyas] = useState<Record<string, number>>({});

  const filteredDeities =
    activeFilter === 'All'
      ? DEITIES_DATA
      : DEITIES_DATA.filter((d) => d.category === activeFilter);

  const handleOfferDiya = (id: string, event: React.MouseEvent) => {
    soundEngine.playDiyaLightSound();

    setOfferedDiyas((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    try {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { x, y },
        colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#FF4500'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="divine-gallery" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-gradient-to-r from-galaxy-amber/15 via-galaxy-gold/20 to-purple-900/15 rounded-full filter blur-[150px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 relative">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-galaxy-gold/15 border border-galaxy-gold/30 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(247,200,91,0.2)] backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-galaxy-gold animate-spin-slow" />
            <span>✦ दिव्य दर्शन ✦ Sacred Darshan</span>
            <Sparkles className="w-4 h-4 text-galaxy-gold animate-spin-slow" />
          </div>

          <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4 text-galaxy-ivory">
            <span className="gold-gradient-text drop-shadow-[0_4px_24px_rgba(247,200,91,0.35)]">
              Divine Gallery of Gods & Goddesses
            </span>
          </h2>

          <p className="text-base sm:text-lg text-galaxy-ivory/85 leading-relaxed font-sans max-w-2xl mx-auto">
            Experience the divine grace of Goddess Maha Lakshmi, Lord Ganesha, and Maa Kali.
            Offer a sacred diya, receive holy blessings, and immerse your soul in radiant cosmic devotion.
          </p>

          {/* Filter Tabs with Animated Indicator */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {(['All', 'Lakshmi', 'Ganesh', 'Kali'] as const).map((filter) => {
              const isSelected = activeFilter === filter;
              const labels: Record<string, string> = {
                All: 'All Deities (समस्त देव)',
                Lakshmi: 'Maa Lakshmi (लक्ष्मी)',
                Ganesh: 'Lord Ganesha (गणेश)',
                Kali: 'Maa Kali (माँ काली)',
              };

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 outline-none cursor-pointer ${
                    isSelected
                      ? 'text-galaxy-midnight font-bold shadow-lg scale-105'
                      : 'glass-panel text-galaxy-ivory/80 hover:text-galaxy-gold hover:border-galaxy-gold/40'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeDeityFilter"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 shadow-[0_0_20px_rgba(247,200,91,0.45)] -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span>{labels[filter]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Cards Grid with Framer Motion Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredDeities.map((deity) => {
              const offerCount = offeredDiyas[deity.id] || 0;

              return (
                <motion.div
                  key={deity.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="glass-panel-gold rounded-3xl overflow-hidden border-2 border-galaxy-gold/35 hover:border-galaxy-gold/70 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(247,200,91,0.35)] transition-all duration-400 flex flex-col justify-between group relative"
                >
                  {/* Image Container with Zoom & Vignette */}
                  <div className="relative w-full h-80 overflow-hidden bg-galaxy-midnight">
                    <img
                      src={resolveImageUrl(deity.image)}
                      alt={deity.name}
                      onError={(e) => {
                        // Fallback graceful background if image fails to load
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Gradient Overlay for Text Readability & Mood */}
                    <div className="absolute inset-0 bg-gradient-to-t from-galaxy-midnight via-galaxy-midnight/20 to-transparent pointer-events-none" />

                    {/* Top Deity Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full bg-galaxy-midnight/80 border border-galaxy-gold/40 text-galaxy-gold text-xs font-serif font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                        {deity.category === 'Kali' ? '✦ Maa Kali ✦' : deity.category === 'Lakshmi' ? '✦ Maa Lakshmi ✦' : '✦ Lord Ganesha ✦'}
                      </span>
                    </div>

                    {/* View Fullscreen Zoom Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedDeity(deity)}
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-galaxy-midnight/80 border border-galaxy-gold/40 text-galaxy-gold flex items-center justify-center backdrop-blur-md hover:scale-110 hover:bg-galaxy-gold hover:text-galaxy-midnight transition-all shadow-md cursor-pointer"
                      title="View Fullscreen Sacred Darshan"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>

                    {/* Bottom Floating Diya Flame Count */}
                    {offerCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute bottom-4 left-4 z-10 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-galaxy-gold/90 text-galaxy-midnight font-bold text-xs shadow-lg"
                      >
                        <Flame className="w-3.5 h-3.5 fill-current text-galaxy-midnight" />
                        <span>{offerCount} {offerCount === 1 ? 'Diya Offered' : 'Diyas Offered'}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Card Body: Name, Title, Mantra, Blessing */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-serif font-black text-2xl text-galaxy-ivory group-hover:text-galaxy-gold transition-colors">
                        {deity.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-galaxy-amber font-serif italic mt-0.5">
                        {deity.title}
                      </p>

                      {/* Sacred Mantra Box */}
                      <div className="mt-3 p-3 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/25 shadow-inner">
                        <p className="font-serif text-xs text-galaxy-gold text-center font-bold leading-relaxed">
                          “{deity.sanskritMantra}”
                        </p>
                      </div>

                      {/* Blessing Text */}
                      <p className="text-xs text-galaxy-ivory/85 leading-relaxed font-sans mt-3">
                        {deity.blessing}
                      </p>
                    </div>

                    {/* Action Button: Offer Diya to Deity */}
                    <div className="pt-4 border-t border-galaxy-gold/20 flex items-center justify-between">
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        type="button"
                        onClick={(e) => handleOfferDiya(deity.id, e)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-galaxy-gold/20 via-galaxy-amber/25 to-galaxy-gold/20 hover:from-galaxy-gold hover:to-galaxy-amber text-galaxy-ivory hover:text-galaxy-midnight border border-galaxy-gold/50 font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                      >
                        <Flame className="w-4 h-4 text-galaxy-amber group-hover:text-galaxy-midnight fill-current" />
                        <span>Offer a Diya & Pranam (प्रणाम)</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Sacred Darshan Lightbox Modal */}
      <AnimatePresence>
        {selectedDeity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-galaxy-midnight/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl glass-panel-gold rounded-3xl p-6 sm:p-8 border-2 border-galaxy-gold/50 shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setSelectedDeity(null)}
                className="absolute top-5 right-5 z-20 p-2 rounded-full bg-galaxy-midnight/80 text-galaxy-ivory hover:text-galaxy-gold border border-galaxy-gold/30 hover:bg-white/10 transition-colors"
                aria-label="Close darshan dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 sm:h-96">
                  <img
                    src={resolveImageUrl(selectedDeity.image)}
                    alt={selectedDeity.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 border-2 border-galaxy-gold/40 rounded-2xl pointer-events-none" />
                </div>

                <div className="space-y-4 text-center md:text-left">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-galaxy-gold bg-galaxy-gold/15 border border-galaxy-gold/30">
                    ✦ Sacred Darshan ✦
                  </span>

                  <h3 className="font-serif font-black text-3xl text-galaxy-ivory">
                    {selectedDeity.name}
                  </h3>

                  <p className="font-serif text-sm text-galaxy-amber italic font-semibold">
                    {selectedDeity.title}
                  </p>

                  <div className="p-4 rounded-2xl bg-galaxy-midnight/90 border border-galaxy-gold/30 shadow-inner">
                    <p className="font-serif text-sm text-galaxy-gold font-bold leading-relaxed text-center">
                      “{selectedDeity.sanskritMantra}”
                    </p>
                  </div>

                  <p className="text-sm text-galaxy-ivory/90 leading-relaxed font-sans">
                    {selectedDeity.blessing}
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={(e) => handleOfferDiya(selectedDeity.id, e)}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-sm shadow-[0_0_25px_rgba(247,200,91,0.4)] hover:shadow-[0_0_35px_rgba(247,200,91,0.6)] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Flame className="w-4 h-4 text-galaxy-midnight fill-current" />
                      <span>Offer Sacred Diya with Devotion</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
