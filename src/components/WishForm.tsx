import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WishCategory, WishData, WishTheme } from '../types/wish';
import { WishCard } from './WishCard';
import { WishCategorySelector } from './WishCategorySelector';
import { WISH_TEMPLATES } from '../utils/wishTemplates';
import { LIMITS, validateWish, sanitizeText } from '../utils/validation';
import { generateWishUrl } from '../utils/shareUtils';
import { soundEngine } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, Palette, Wand2, ArrowRight, Check, Heart, MailOpen, Flame } from 'lucide-react';

interface WishFormProps {
  initialWish?: Partial<WishData>;
  onWishCreated?: (wish: WishData) => void;
}

export const WishForm: React.FC<WishFormProps> = ({ initialWish, onWishCreated }) => {
  const navigate = useNavigate();

  const [sender, setSender] = useState(initialWish?.sender || '');
  const [recipient, setRecipient] = useState(initialWish?.recipient || '');
  const [category, setCategory] = useState<WishCategory>(initialWish?.category || 'Family');
  const [theme, setTheme] = useState<WishTheme>(initialWish?.theme || 'golden-galaxy');
  const [message, setMessage] = useState(
    initialWish?.message ||
      'May the divine light of Diwali illuminate your life with endless peace, health, and cosmic prosperity. Shubh Deepavali!'
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const previewCardRef = useRef<HTMLDivElement>(null);

  // Available templates for selected category
  const filteredTemplates = WISH_TEMPLATES.filter((t) => t.category === category);

  const handleApplyTemplate = (templateMessage: string) => {
    soundEngine.playDiyaLightSound();
    setMessage(templateMessage);
    if (errors.message) {
      setErrors((prev) => ({ ...prev, message: '' }));
    }
  };

  const handleCategoryChange = (newCategory: WishCategory) => {
    soundEngine.playDiyaLightSound();
    setCategory(newCategory);
    const match = WISH_TEMPLATES.find((t) => t.category === newCategory);
    if (match) {
      setMessage(match.message);
    }
  };

  const currentWishData: WishData = {
    sender: sender || 'Your Well-Wisher',
    recipient: recipient || 'Beloved Friend',
    category,
    theme,
    message: message || 'May the light of Diwali bless your home with eternal joy.',
    timestamp: Date.now(),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const wishToValidate: WishData = {
      sender: sanitizeText(sender),
      recipient: sanitizeText(recipient),
      message: sanitizeText(message),
      category,
      theme,
      timestamp: Date.now(),
    };

    const validation = validateWish(wishToValidate);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setTouched({ sender: true, recipient: true, message: true });
      return;
    }

    soundEngine.playCelebrationSound();

    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#FF8C00', '#B9B8FF'],
      });
    } catch {
      // ignore
    }

    if (onWishCreated) {
      onWishCreated(wishToValidate);
    } else {
      const url = generateWishUrl(wishToValidate);
      const urlObj = new URL(url);
      navigate(`/wish${urlObj.search}`);
    }
  };

  const themes: { id: WishTheme; label: string; desc: string; color: string }[] = [
    {
      id: 'golden-galaxy',
      label: 'Golden Galaxy',
      desc: 'Cosmic midnight & celestial gold',
      color: 'from-amber-400 via-galaxy-gold to-yellow-600',
    },
    {
      id: 'royal-blue',
      label: 'Royal Blue',
      desc: 'Nebula sapphire & celestial lavender',
      color: 'from-blue-600 via-indigo-600 to-purple-800',
    },
    {
      id: 'traditional-diwali',
      label: 'Traditional Diwali',
      desc: 'Sacred festive crimson & marigold gold',
      color: 'from-red-600 via-rose-600 to-amber-700',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto relative">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-gradient-to-r from-galaxy-amber/15 via-galaxy-gold/20 to-purple-900/15 rounded-full filter blur-[140px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 glass-panel-gold rounded-3xl p-6 sm:p-10 border-2 border-galaxy-gold/40 shadow-[0_20px_60px_rgba(0,0,0,0.55)] relative overflow-hidden"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-3 px-3.5 py-1.5 rounded-full bg-galaxy-gold/15 border border-galaxy-gold/30 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-galaxy-gold animate-spin-slow" />
              <span>Cosmic Wish Studio ✦ सर्वकल्याणकामना</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-galaxy-ivory tracking-tight mb-2">
              <span className="gold-gradient-text drop-shadow-[0_4px_20px_rgba(247,200,91,0.35)]">
                Personalize Your Diwali Greeting
              </span>
            </h2>
            <p className="text-sm text-galaxy-ivory/85 leading-relaxed font-sans">
              Create an enchanted, personalized cosmic greeting card for your loved ones anywhere in the world.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Sender and Recipient Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="recipientName"
                  className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-2"
                >
                  Recipient's Name <span className="text-galaxy-amber">*</span>
                </label>
                <input
                  id="recipientName"
                  type="text"
                  maxLength={LIMITS.NAME_MAX}
                  value={recipient}
                  placeholder="e.g. Priyanshu, Ananya, Maa..."
                  onChange={(e) => {
                    setRecipient(e.target.value);
                    if (errors.recipient) setErrors((prev) => ({ ...prev, recipient: '' }));
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, recipient: true }))}
                  className={`w-full px-4 py-3 rounded-2xl bg-galaxy-midnight/90 border text-galaxy-ivory placeholder-galaxy-lavender/40 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.recipient && touched.recipient
                      ? 'border-rose-500 focus:ring-rose-400'
                      : 'border-galaxy-gold/30 focus:ring-galaxy-gold focus:border-galaxy-gold shadow-inner'
                  }`}
                  aria-invalid={!!(errors.recipient && touched.recipient)}
                  aria-describedby={errors.recipient ? 'recipient-error' : undefined}
                />
                {errors.recipient && touched.recipient && (
                  <p id="recipient-error" className="text-xs text-rose-400 mt-1.5 font-medium">
                    {errors.recipient}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="senderName"
                  className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-2"
                >
                  Your Name / Signature <span className="text-galaxy-amber">*</span>
                </label>
                <input
                  id="senderName"
                  type="text"
                  maxLength={LIMITS.NAME_MAX}
                  value={sender}
                  placeholder="e.g. Rahul & Family, Joyita..."
                  onChange={(e) => {
                    setSender(e.target.value);
                    if (errors.sender) setErrors((prev) => ({ ...prev, sender: '' }));
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, sender: true }))}
                  className={`w-full px-4 py-3 rounded-2xl bg-galaxy-midnight/90 border text-galaxy-ivory placeholder-galaxy-lavender/40 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.sender && touched.sender
                      ? 'border-rose-500 focus:ring-rose-400'
                      : 'border-galaxy-gold/30 focus:ring-galaxy-gold focus:border-galaxy-gold shadow-inner'
                  }`}
                  aria-invalid={!!(errors.sender && touched.sender)}
                  aria-describedby={errors.sender ? 'sender-error' : undefined}
                />
                {errors.sender && touched.sender && (
                  <p id="sender-error" className="text-xs text-rose-400 mt-1.5 font-medium">
                    {errors.sender}
                  </p>
                )}
              </div>
            </div>

            {/* Category Selector */}
            <WishCategorySelector
              selectedCategory={category}
              onSelectCategory={handleCategoryChange}
            />

            {/* Theme Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-2.5">
                <span className="flex items-center space-x-1.5">
                  <Palette className="w-3.5 h-3.5 text-galaxy-amber" />
                  <span>Greeting Card Cosmic Theme</span>
                </span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {themes.map((t) => {
                  const isSelected = theme === t.id;
                  return (
                    <motion.button
                      key={t.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        soundEngine.playDiyaLightSound();
                        setTheme(t.id);
                      }}
                      className={`p-4 rounded-2xl text-left border-2 transition-all outline-none cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-galaxy-gold bg-galaxy-gold/20 shadow-[0_0_20px_rgba(247,200,91,0.35)]'
                          : 'border-white/10 bg-galaxy-midnight/80 hover:border-galaxy-gold/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`w-4 h-4 rounded-full bg-gradient-to-tr ${t.color} shadow-sm`} />
                        {isSelected && <Check className="w-4 h-4 text-galaxy-gold" />}
                      </div>
                      <span className="font-serif font-bold text-xs sm:text-sm text-galaxy-ivory">
                        {t.label}
                      </span>
                      <p className="text-[11px] text-galaxy-lavender/70 line-clamp-1 mt-0.5">{t.desc}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Template Quick Selectors */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-galaxy-gold flex items-center space-x-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-galaxy-gold" />
                  <span>Inspiring Sacred Message Presets</span>
                </label>
                <span className="text-[11px] text-galaxy-lavender/70">Click to fill message</span>
              </div>
              <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-1.5 custom-scrollbar">
                {filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleApplyTemplate(template.message)}
                    className="text-left p-3.5 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/20 hover:border-galaxy-gold/50 hover:bg-galaxy-royal/60 transition-all text-xs text-galaxy-ivory/85 group cursor-pointer shadow-sm hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between font-serif font-bold text-galaxy-gold mb-1">
                      <span>{template.title}</span>
                      {template.language && (
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-galaxy-gold/20 text-galaxy-gold border border-galaxy-gold/30">
                          {template.language}
                        </span>
                      )}
                    </div>
                    <p className="line-clamp-2 italic text-galaxy-ivory/80 group-hover:text-galaxy-ivory">
                      "{template.message}"
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Personalized Message Textarea */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="customMessage"
                  className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold"
                >
                  Your Personalized Message <span className="text-galaxy-amber">*</span>
                </label>
                <span className="text-xs text-galaxy-lavender/80 font-mono">
                  {message.length}/{LIMITS.MESSAGE_MAX}
                </span>
              </div>
              <textarea
                id="customMessage"
                rows={4}
                maxLength={LIMITS.MESSAGE_MAX}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
                placeholder="Write your custom blessing or festival wishes here (Bengali, Hindi & any Unicode supported!)..."
                className={`w-full px-4 py-3 rounded-2xl bg-galaxy-midnight/90 border text-galaxy-ivory placeholder-galaxy-lavender/40 text-sm focus:outline-none focus:ring-2 transition-all resize-y ${
                  errors.message && touched.message
                    ? 'border-rose-500 focus:ring-rose-400'
                    : 'border-galaxy-gold/30 focus:ring-galaxy-gold focus:border-galaxy-gold shadow-inner'
                }`}
                aria-invalid={!!(errors.message && touched.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && touched.message && (
                <p id="message-error" className="text-xs text-rose-400 mt-1.5 font-medium">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center space-x-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 hover:from-yellow-300 hover:to-galaxy-amber text-galaxy-midnight font-bold text-base shadow-[0_0_30px_rgba(247,200,91,0.45)] hover:shadow-[0_0_45px_rgba(247,200,91,0.7)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-galaxy-midnight fill-current" />
                <span>Create My Cosmic Wish & Reveal Magic</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Live Preview Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 flex flex-col items-center"
        >
          <div className="sticky top-28 w-full flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-galaxy-midnight/80 border border-galaxy-gold/30 text-xs font-semibold uppercase tracking-wider text-galaxy-gold shadow-md backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Cosmic Card Preview</span>
            </div>

            {/* The Live Interactive Preview Card */}
            <div className="w-full flex justify-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <WishCard ref={previewCardRef} wish={currentWishData} />
            </div>

            <div className="flex items-center space-x-2 text-xs text-galaxy-lavender/80 text-center max-w-sm bg-galaxy-midnight/60 px-4 py-2 rounded-2xl border border-galaxy-gold/20">
              <MailOpen className="w-4 h-4 text-galaxy-gold shrink-0" />
              <span>Your recipient will open a magical 3D golden cosmic envelope before this greeting is revealed!</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
