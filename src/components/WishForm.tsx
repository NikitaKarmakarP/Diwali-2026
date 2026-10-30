import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { WishCategory, WishData, WishTheme } from '../types/wish';
import { WishCard } from './WishCard';
import { WishCategorySelector } from './WishCategorySelector';
import { WISH_TEMPLATES } from '../utils/wishTemplates';
import { LIMITS, validateWish, sanitizeText } from '../utils/validation';
import { generateWishUrl } from '../utils/shareUtils';
import { Sparkles, Palette, Wand2, ArrowRight } from 'lucide-react';

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
    setMessage(templateMessage);
    if (errors.message) {
      setErrors((prev) => ({ ...prev, message: '' }));
    }
  };

  const handleCategoryChange = (newCategory: WishCategory) => {
    setCategory(newCategory);
    // Find first template in this category to suggest
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

    if (onWishCreated) {
      onWishCreated(wishToValidate);
    } else {
      // Navigate to the shared wish page
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
      color: 'from-amber-400 to-yellow-600',
    },
    {
      id: 'royal-blue',
      label: 'Royal Blue',
      desc: 'Nebula sapphire & celestial lavender',
      color: 'from-blue-600 to-indigo-800',
    },
    {
      id: 'traditional-diwali',
      label: 'Traditional Diwali',
      desc: 'Sacred festive crimson & marigold gold',
      color: 'from-red-600 to-amber-700',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-9 border border-galaxy-gold/30">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cosmic Wish Studio</span>
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-galaxy-ivory">
              Personalize Your Diwali Greeting
            </h2>
            <p className="text-sm text-galaxy-lavender/80 mt-1">
              Create a personalized cosmic greeting card for your loved ones anywhere in the world.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Sender and Recipient Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="recipientName"
                  className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold/90 mb-2"
                >
                  Recipient's Name <span className="text-rose-400">*</span>
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
                  className={`w-full px-4 py-3 rounded-xl bg-galaxy-midnight/80 border text-galaxy-ivory placeholder-galaxy-lavender/40 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.recipient && touched.recipient
                      ? 'border-rose-500 focus:ring-rose-400'
                      : 'border-galaxy-gold/25 focus:ring-galaxy-gold focus:border-galaxy-gold'
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
                  className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold/90 mb-2"
                >
                  Your Name / Signature <span className="text-rose-400">*</span>
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
                  className={`w-full px-4 py-3 rounded-xl bg-galaxy-midnight/80 border text-galaxy-ivory placeholder-galaxy-lavender/40 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.sender && touched.sender
                      ? 'border-rose-500 focus:ring-rose-400'
                      : 'border-galaxy-gold/25 focus:ring-galaxy-gold focus:border-galaxy-gold'
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold/90 mb-2.5">
                <span className="flex items-center space-x-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Greeting Card Theme</span>
                </span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {themes.map((t) => {
                  const isSelected = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold ${
                        isSelected
                          ? 'border-galaxy-gold bg-galaxy-gold/15 shadow-[0_0_15px_rgba(247,200,91,0.3)] scale-[1.02]'
                          : 'border-white/10 bg-galaxy-midnight/60 hover:border-galaxy-gold/40'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 mb-1.5">
                        <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${t.color}`} />
                        <span className="font-serif font-bold text-xs sm:text-sm text-galaxy-ivory">
                          {t.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-galaxy-lavender/70 line-clamp-1">{t.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Template Quick Selectors */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-galaxy-gold/90 flex items-center space-x-1.5">
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Choose Inspiring Message Preset</span>
                </label>
                <span className="text-[11px] text-galaxy-lavender/60">Click to use</span>
              </div>
              <div className="flex flex-col gap-2 max-h-44 overflow-y-auto pr-1">
                {filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleApplyTemplate(template.message)}
                    className="text-left p-3 rounded-xl bg-galaxy-midnight/70 border border-galaxy-gold/15 hover:border-galaxy-gold/40 hover:bg-galaxy-royal/60 transition-colors text-xs text-galaxy-ivory/80 group"
                  >
                    <div className="flex items-center justify-between font-serif font-bold text-galaxy-gold mb-1">
                      <span>{template.title}</span>
                      {template.language && (
                        <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-galaxy-gold/20 text-galaxy-gold">
                          {template.language}
                        </span>
                      )}
                    </div>
                    <p className="line-clamp-2 italic text-galaxy-ivory/70 group-hover:text-galaxy-ivory">
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
                  className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold/90"
                >
                  Your Personalized Message <span className="text-rose-400">*</span>
                </label>
                <span className="text-xs text-galaxy-lavender/70 font-mono">
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
                className={`w-full px-4 py-3 rounded-xl bg-galaxy-midnight/80 border text-galaxy-ivory placeholder-galaxy-lavender/40 text-sm focus:outline-none focus:ring-2 transition-all resize-y ${
                  errors.message && touched.message
                    ? 'border-rose-500 focus:ring-rose-400'
                    : 'border-galaxy-gold/25 focus:ring-galaxy-gold focus:border-galaxy-gold'
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
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-base shadow-[0_0_25px_rgba(247,200,91,0.4)] hover:shadow-[0_0_35px_rgba(247,200,91,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold"
              >
                <Sparkles className="w-5 h-5" />
                <span>Create My Wish & Reveal Magic</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="sticky top-28 w-full flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-galaxy-gold/90">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Card Preview</span>
            </div>

            {/* The Live Interactive Preview Card */}
            <WishCard ref={previewCardRef} wish={currentWishData} />

            <p className="text-xs text-galaxy-lavender/60 text-center max-w-sm">
              Your recipient will open an animated golden envelope in space before seeing this greeting!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
