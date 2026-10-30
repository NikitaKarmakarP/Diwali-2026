import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const categories = ['All', 'Family', 'Friends', 'Love', 'Prosperity', 'Happiness', 'Success', 'Universal'];

  const filteredWishes =
    selectedCategory === 'All'
      ? wishes
      : wishes.filter((w) => w.category === selectedCategory);

  const handleSpark = (wishId: string, event: React.MouseEvent) => {
    const result = sparkWish(wishId);
    if (result.success) {
      soundEngine.playDiyaLightSound();

      // Trigger sparkle burst from button
      try {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { x, y },
          colors: ['#F7C85B', '#FFA439', '#FFF1D0'],
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

    setTimeout(() => {
      setFormSuccess(false);
      setIsModalOpen(false);
      setSender('');
      setRecipient('');
      setLocation('');
      setMessage('');
    }, 1500);
  };

  return (
    <section id="community-wall" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-galaxy-nebula/25 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-galaxy-gold/15 border border-galaxy-gold/30 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
            <Globe className="w-4 h-4 text-galaxy-gold" />
            <span>The Constellation of Community Wishes</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-galaxy-ivory tracking-tight mb-4">
            Wishes Across the Starlight
          </h2>
          <p className="text-base sm:text-lg text-galaxy-ivory/80 leading-relaxed font-sans">
            Every festive greeting ignited here shines like a star in our shared cosmos.
            Read wishes from around the world, send sparks of light, or add your own blessing to the universe.
          </p>

          {/* Action to add wish */}
          <div className="mt-6 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-galaxy-gold to-galaxy-amber text-galaxy-midnight font-bold text-sm shadow-[0_0_20px_rgba(247,200,91,0.35)] hover:scale-105 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Your Wish to the Constellation</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-galaxy-gold text-galaxy-midnight font-bold shadow-md scale-105'
                    : 'bg-galaxy-midnight/80 text-galaxy-ivory/70 border border-galaxy-gold/20 hover:border-galaxy-gold/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWishes.map((item) => {
            const alreadySparked = isWishSparked(item.id);
            const wishShareUrl = generateWishUrl({
              sender: item.sender,
              recipient: item.recipient,
              message: item.message,
              category: item.category,
              theme: item.theme,
            });

            return (
              <div
                key={item.id}
                className="glass-panel rounded-3xl p-6 sm:p-7 border border-galaxy-gold/25 hover:border-galaxy-gold/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Top Header: Category & Location */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-galaxy-gold/15 text-galaxy-gold font-semibold uppercase tracking-wider text-[10px] border border-galaxy-gold/30">
                      {item.category}
                    </span>
                    {item.location && (
                      <span className="flex items-center space-x-1 text-galaxy-lavender/60 text-[11px]">
                        <MapPin className="w-3 h-3 text-galaxy-amber" />
                        <span className="truncate max-w-[140px]">{item.location}</span>
                      </span>
                    )}
                  </div>

                  {/* To / From */}
                  <div className="mb-3">
                    <h3 className="font-serif font-bold text-lg text-galaxy-ivory group-hover:text-galaxy-gold transition-colors">
                      For: {item.recipient}
                    </h3>
                    <p className="text-xs text-galaxy-lavender/80 font-sans">
                      From: <span className="text-galaxy-gold font-medium">{item.sender}</span>
                    </p>
                  </div>

                  {/* Message (Preserves Bengali & Unicode!) */}
                  <div className="my-3 p-3.5 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/15 min-h-[75px] flex items-center">
                    <p
                      className="text-sm text-galaxy-ivory/90 italic leading-relaxed break-words"
                      style={{ fontFamily: "'Outfit', 'Noto Sans Bengali', system-ui, sans-serif" }}
                    >
                      “{item.message}”
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-galaxy-gold/15 flex items-center justify-between text-xs mt-3">
                  {/* Spark Diya Button */}
                  <button
                    type="button"
                    onClick={(e) => handleSpark(item.id, e)}
                    disabled={alreadySparked}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border transition-all active:scale-95 ${
                      alreadySparked
                        ? 'bg-galaxy-gold/20 text-galaxy-gold border-galaxy-gold/50 cursor-default'
                        : 'bg-galaxy-royal/80 hover:bg-galaxy-gold hover:text-galaxy-midnight text-galaxy-ivory border-galaxy-gold/30'
                    }`}
                    title={alreadySparked ? 'You sparked light for this wish!' : 'Send a spark of light'}
                  >
                    <Flame
                      className={`w-4 h-4 ${alreadySparked ? 'text-galaxy-amber fill-current' : 'text-galaxy-gold'}`}
                    />
                    <span className="font-semibold">{item.sparksCount}</span>
                    <span className="hidden sm:inline text-[11px] font-normal">
                      {alreadySparked ? 'Lit' : 'Send Light'}
                    </span>
                  </button>

                  {/* View in Magical Envelope */}
                  <Link
                    to={`/wish${new URL(wishShareUrl).search}`}
                    className="inline-flex items-center space-x-1 text-galaxy-lavender hover:text-galaxy-gold transition-colors p-1"
                    title="Open in Magical Envelope"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open Envelope</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Wish Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-galaxy-midnight/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-panel-gold rounded-3xl p-6 sm:p-8 border-2 border-galaxy-gold/40 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-galaxy-ivory/70 hover:text-galaxy-gold"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-galaxy-gold bg-galaxy-gold/15 border border-galaxy-gold/30 mb-2">
                Cosmic Constellation
              </span>
              <h3 className="font-serif font-black text-2xl text-galaxy-ivory">
                Contribute Your Diwali Light
              </h3>
              <p className="text-xs text-galaxy-lavender/80 mt-1">
                Your blessing will be added to the universe for all visitors to celebrate.
              </p>
            </div>

            {formSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Check className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="font-serif font-bold text-xl text-galaxy-ivory">
                  Your Wish Shines in the Galaxy!
                </h4>
                <p className="text-xs text-galaxy-lavender/80">
                  Thank you for spreading festive joy across the universe.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      maxLength={40}
                      value={sender}
                      placeholder="e.g. Diya & Family"
                      onChange={(e) => setSender(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-galaxy-midnight/80 border border-galaxy-gold/25 text-galaxy-ivory text-xs focus:ring-1 focus:ring-galaxy-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-1">
                      Recipient / Dedication
                    </label>
                    <input
                      type="text"
                      maxLength={40}
                      value={recipient}
                      placeholder="e.g. My Parents, Friends Everywhere"
                      onChange={(e) => setRecipient(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-galaxy-midnight/80 border border-galaxy-gold/25 text-galaxy-ivory text-xs focus:ring-1 focus:ring-galaxy-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-1">
                      Your City / Country
                    </label>
                    <input
                      type="text"
                      maxLength={40}
                      value={location}
                      placeholder="e.g. Delhi, Kolkata, London"
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-galaxy-midnight/80 border border-galaxy-gold/25 text-galaxy-ivory text-xs focus:ring-1 focus:ring-galaxy-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as WishCategory)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-galaxy-midnight/80 border border-galaxy-gold/25 text-galaxy-ivory text-xs focus:ring-1 focus:ring-galaxy-gold focus:outline-none"
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-1">
                    Your Festive Blessing (Bengali, Hindi, English supported!)
                  </label>
                  <textarea
                    rows={3}
                    maxLength={300}
                    value={message}
                    placeholder="May this Diwali illuminate your path with joy and starlight..."
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-galaxy-midnight/80 border border-galaxy-gold/25 text-galaxy-ivory text-xs focus:ring-1 focus:ring-galaxy-gold focus:outline-none"
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
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-sm shadow-lg hover:brightness-105 active:scale-98 transition-all"
                >
                  Ignite Wish in the Universe
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
