import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CommunityWish, WishCategory } from '../types/wish';
import {
  getCommunityWishes,
  saveCommunityWish,
  sparkWish,
  isWishSparked,
} from '../utils/communityWishes';
import { generateWishUrl } from '../utils/shareUtils';
import { soundEngine } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Flame,
  PlusCircle,
  Globe,
  X,
  MapPin,
  Check,
  Star,
  Heart,
  Send,
  MailOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORY_META: Record<string, { label: string; icon: string }> = {
  All: { label: 'All Wishes', icon: '🌌' },
  Universal: { label: 'Universal', icon: '✨' },
  Family: { label: 'Family', icon: '👨‍👩‍👧‍👦' },
  Friends: { label: 'Friends', icon: '🤝' },
  Love: { label: 'Love', icon: '💖' },
  Prosperity: { label: 'Prosperity', icon: '🪙' },
  Happiness: { label: 'Happiness', icon: '🌸' },
  Success: { label: 'Success', icon: '🏆' },
};

export const CommunityWishWall: React.FC = () => {
  const [wishes, setWishes] = useState<CommunityWish[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for new wish
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<WishCategory>('Universal');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    setWishes(getCommunityWishes());
  }, []);

  const categories = ['All', 'Universal', 'Family', 'Friends', 'Love', 'Prosperity', 'Happiness', 'Success'];

  const filteredWishes =
    selectedCategory === 'All'
      ? wishes
      : wishes.filter((w) => w.category === selectedCategory);

  const totalSparks = wishes.reduce((acc, w) => acc + w.sparksCount, 0);

  const handleSpark = (wishId: string, event: React.MouseEvent) => {
    const result = sparkWish(wishId);
    if (result.success) {
      soundEngine.playDiyaLightSound();

      try {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { x, y },
          colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#FF8C00', '#B9B8FF'],
          disableForReducedMotion: true,
        });
      } catch {
        // ignore
      }

      setWishes(getCommunityWishes());
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!sender.trim() || !recipient.trim() || !message.trim()) {
      setFormError('Please fill in your name, recipient name, and heartfelt wish.');
      return;
    }

    const result = saveCommunityWish({
      sender,
      recipient,
      message,
      category,
      theme: 'golden-galaxy',
      location: location.trim() || 'Cosmic Starlight',
    });

    if (!result.success) {
      setFormError(result.error || 'Failed to save wish.');
      return;
    }

    soundEngine.playCelebrationSound();
    setWishes(getCommunityWishes());
    setFormSuccess(true);

    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#B9B8FF'],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setFormSuccess(false);
      setIsModalOpen(false);
      setSender('');
      setRecipient('');
      setLocation('');
      setMessage('');
    }, 1600);
  };

  return (
    <section id="community-wall" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background celestial nebula & constellation glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-gradient-to-r from-galaxy-amber/15 via-galaxy-royal/25 to-galaxy-gold/15 rounded-full filter blur-[140px] pointer-events-none -z-10" />

      {/* Constellation Star Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#F7C85B33_1px,_transparent_1px)] bg-[size:32px_32px] opacity-35 pointer-events-none -z-10" />

      {/* Floating Animated Golden Sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{ y: [-10, -120], opacity: [0, 0.7, 0], x: [0, 20] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeOut' }}
          className="absolute bottom-20 left-[10%] w-2 h-2 rounded-full bg-galaxy-gold blur-[0.5px]"
        />
        <motion.div
          animate={{ y: [-20, -150], opacity: [0, 0.8, 0], x: [0, -15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeOut', delay: 2.5 }}
          className="absolute bottom-28 right-[15%] w-2 h-2 rounded-full bg-galaxy-amber blur-[0.5px]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 relative">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-galaxy-gold/15 border border-galaxy-gold/30 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(247,200,91,0.2)] backdrop-blur-md">
            <Globe className="w-4 h-4 text-galaxy-gold animate-spin-slow" />
            <span>The Constellation of Community Wishes</span>
          </div>

          <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4 text-galaxy-ivory">
            <span className="gold-gradient-text drop-shadow-[0_4px_24px_rgba(247,200,91,0.35)]">
              Wishes Across the Starlight
            </span>
          </h2>

          <p className="text-base sm:text-lg text-galaxy-ivory/85 leading-relaxed font-sans max-w-2xl mx-auto mb-6">
            Every festive greeting ignited here shines like an eternal star in our shared cosmos.
            Read heartfelt prayers from souls across the globe, send sparks of divine light, or add your own blessing.
          </p>

          {/* Real-time Constellation Stats Badge & CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-galaxy-midnight/80 border border-galaxy-gold/30 text-xs sm:text-sm text-galaxy-ivory backdrop-blur-md">
              <Flame className="w-4 h-4 text-galaxy-amber animate-pulse" />
              <span><strong>{totalSparks}</strong> Sparks of Light Radiating Across <strong>{wishes.length}</strong> Wishes</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(247,200,91,0.4)] hover:shadow-[0_0_35px_rgba(247,200,91,0.6)] transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Your Wish to the Constellation</span>
            </motion.button>
          </div>
        </div>

        {/* Category Filter Pills with Smooth Animated Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const meta = CATEGORY_META[cat] || { label: cat, icon: '✨' };

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 outline-none flex items-center space-x-2 cursor-pointer ${
                  isSelected
                    ? 'text-galaxy-midnight font-bold shadow-lg scale-105'
                    : 'glass-panel text-galaxy-ivory/80 hover:text-galaxy-gold hover:border-galaxy-gold/40'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 shadow-[0_0_20px_rgba(247,200,91,0.45)] -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{meta.icon}</span>
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>

        {/* Wishes Grid with Animated Entrance */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredWishes.map((item) => {
              const alreadySparked = isWishSparked(item.id);
              const meta = CATEGORY_META[item.category] || { label: item.category, icon: '✨' };
              const wishShareUrl = generateWishUrl({
                sender: item.sender,
                recipient: item.recipient,
                message: item.message,
                category: item.category,
                theme: item.theme,
              });

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="glass-panel-gold rounded-3xl p-6 sm:p-7 border border-galaxy-gold/30 hover:border-galaxy-gold/70 hover:shadow-[0_15px_40px_rgba(247,200,91,0.3)] transition-all duration-400 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle Corner Constellation Watermark */}
                  <div className="absolute top-2 right-2 opacity-10 pointer-events-none text-4xl">
                    {meta.icon}
                  </div>

                  <div>
                    {/* Top Header: Category & Location */}
                    <div className="flex items-center justify-between text-xs mb-3.5">
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-galaxy-gold/15 text-galaxy-gold font-bold uppercase tracking-wider text-[10px] border border-galaxy-gold/35 shadow-sm">
                        <span>{meta.icon}</span>
                        <span>{item.category}</span>
                      </span>

                      {item.location && (
                        <span className="flex items-center space-x-1 text-galaxy-lavender/80 text-[11px] bg-galaxy-midnight/60 px-2.5 py-0.5 rounded-full border border-galaxy-gold/20">
                          <MapPin className="w-3 h-3 text-galaxy-amber" />
                          <span className="truncate max-w-[130px]">{item.location}</span>
                        </span>
                      )}
                    </div>

                    {/* Dedicated To & From */}
                    <div className="mb-4">
                      <h3 className="font-serif font-black text-xl text-galaxy-ivory group-hover:text-galaxy-gold transition-colors flex items-center space-x-1.5">
                        <span>For:</span>
                        <span className="gold-gradient-text">{item.recipient}</span>
                      </h3>
                      <p className="text-xs text-galaxy-lavender/80 font-sans mt-0.5">
                        From: <span className="text-galaxy-ivory font-semibold">{item.sender}</span>
                      </p>
                    </div>

                    {/* Message Box with Sacred Parchment Styling */}
                    <div className="my-3 p-4 rounded-2xl bg-galaxy-midnight/85 border border-galaxy-gold/20 min-h-[90px] flex items-center relative shadow-inner group-hover:border-galaxy-gold/40 transition-colors">
                      <p
                        className="text-sm text-galaxy-ivory/95 italic leading-relaxed break-words"
                        style={{ fontFamily: "'Outfit', 'Noto Sans Bengali', system-ui, sans-serif" }}
                      >
                        “{item.message}”
                      </p>
                    </div>
                  </div>

                  {/* Bottom Actions: Send Light Button & Envelope Preview */}
                  <div className="pt-4 border-t border-galaxy-gold/20 flex items-center justify-between text-xs mt-3">
                    {/* Spark Diya Button */}
                    <motion.button
                      whileTap={{ scale: 0.93 }}
                      type="button"
                      onClick={(e) => handleSpark(item.id, e)}
                      disabled={alreadySparked}
                      className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                        alreadySparked
                          ? 'bg-galaxy-gold/25 text-galaxy-gold border-galaxy-gold/60 shadow-[0_0_12px_rgba(247,200,91,0.4)] cursor-default'
                          : 'bg-galaxy-royal/90 hover:bg-galaxy-gold hover:text-galaxy-midnight text-galaxy-ivory border-galaxy-gold/40 shadow-sm'
                      }`}
                      title={alreadySparked ? 'You sparked light for this wish!' : 'Send a spark of light'}
                    >
                      <Flame
                        className={`w-4 h-4 ${alreadySparked ? 'text-galaxy-amber fill-current animate-pulse' : 'text-galaxy-gold'}`}
                      />
                      <span className="font-bold">{item.sparksCount}</span>
                      <span className="text-[11px] font-medium">
                        {alreadySparked ? 'Radiating' : 'Send Light'}
                      </span>
                    </motion.button>

                    {/* View in Magical Cosmic Envelope */}
                    <Link
                      to={`/wish${new URL(wishShareUrl).search}`}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-galaxy-gold/15 text-galaxy-lavender hover:text-galaxy-gold border border-white/10 hover:border-galaxy-gold/30 transition-all text-xs font-semibold"
                      title="Open in Magical Envelope"
                    >
                      <MailOpen className="w-3.5 h-3.5 text-galaxy-gold" />
                      <span>Open Envelope</span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Add Wish to Constellation Modal with Enhanced Visuals */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-galaxy-midnight/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg glass-panel-gold rounded-3xl p-6 sm:p-8 border-2 border-galaxy-gold/45 shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-galaxy-ivory/70 hover:text-galaxy-gold hover:bg-white/10 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-galaxy-gold bg-galaxy-gold/15 border border-galaxy-gold/35 mb-2.5">
                  ✦ Cosmic Constellation ✦
                </span>
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-galaxy-ivory">
                  Contribute Your Diwali Light
                </h3>
                <p className="text-xs sm:text-sm text-galaxy-lavender/80 mt-1">
                  Your blessing will be woven into the constellation for all souls across the world to celebrate.
                </p>
              </div>

              {formSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.4)] animate-bounce">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="font-serif font-black text-2xl text-galaxy-ivory">
                    Your Wish Shines in the Galaxy!
                  </h4>
                  <p className="text-sm text-galaxy-lavender/90">
                    Thank you for spreading sacred warmth and light across the universe.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        maxLength={40}
                        value={sender}
                        placeholder="e.g. Priyanshu & Family"
                        onChange={(e) => setSender(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-galaxy-midnight/90 border border-galaxy-gold/30 text-galaxy-ivory text-xs focus:ring-1 focus:ring-galaxy-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-1.5">
                        Recipient / Dedication
                      </label>
                      <input
                        type="text"
                        maxLength={40}
                        value={recipient}
                        placeholder="e.g. My Parents, Friends Everywhere"
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-galaxy-midnight/90 border border-galaxy-gold/30 text-galaxy-ivory text-xs focus:ring-1 focus:ring-galaxy-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-1.5">
                        Your City / Country
                      </label>
                      <input
                        type="text"
                        maxLength={40}
                        value={location}
                        placeholder="e.g. Delhi, Kolkata, London"
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-galaxy-midnight/90 border border-galaxy-gold/30 text-galaxy-ivory text-xs focus:ring-1 focus:ring-galaxy-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-1.5">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as WishCategory)}
                        className="w-full px-4 py-2.5 rounded-xl bg-galaxy-midnight/90 border border-galaxy-gold/30 text-galaxy-ivory text-xs focus:ring-1 focus:ring-galaxy-gold focus:outline-none"
                      >
                        <option value="Universal">Universal</option>
                        <option value="Family">Family</option>
                        <option value="Friends">Friends</option>
                        <option value="Love">Love</option>
                        <option value="Prosperity">Prosperity</option>
                        <option value="Happiness">Happiness</option>
                        <option value="Success">Success</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-1.5">
                      Your Festive Blessing (Bengali, Hindi, English supported!)
                    </label>
                    <textarea
                      rows={3}
                      maxLength={300}
                      value={message}
                      placeholder="May this Diwali illuminate your path with joy, good health, and eternal starlight..."
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-galaxy-midnight/90 border border-galaxy-gold/30 text-galaxy-ivory text-xs focus:ring-1 focus:ring-galaxy-gold focus:outline-none"
                    />
                    <div className="text-right text-[10px] text-galaxy-lavender/60 mt-0.5">
                      {message.length}/300
                    </div>
                  </div>

                  {formError && (
                    <p className="text-xs text-rose-400 font-medium">{formError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 hover:from-yellow-300 hover:to-galaxy-amber text-galaxy-midnight font-bold text-sm shadow-[0_0_20px_rgba(247,200,91,0.4)] hover:shadow-[0_0_30px_rgba(247,200,91,0.6)] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Ignite Wish in the Universe</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
