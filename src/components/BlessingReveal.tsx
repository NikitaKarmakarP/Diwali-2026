import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlessingItem } from '../types/wish';
import { Sparkles, X, Flame, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/shareUtils';

interface BlessingRevealProps {
  blessing: BlessingItem | null;
  onClose: () => void;
}

export const BlessingReveal: React.FC<BlessingRevealProps> = ({ blessing, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!blessing) return null;

  const handleCopyBlessing = async () => {
    const text = `🪔 *Diwali Blessing of ${blessing.title}*\n${blessing.sanskrit ? `"${blessing.sanskrit}"\n` : ''}${blessing.text}\n\n— Diwali Galaxy Wishes`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-galaxy-midnight/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg glass-panel-gold rounded-3xl p-6 sm:p-8 border-2 border-galaxy-gold/40 shadow-[0_20px_60px_rgba(247,200,91,0.35)] text-center"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-galaxy-ivory/70 hover:text-galaxy-gold hover:bg-white/10 transition-colors"
            aria-label="Close blessing dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Diya Flame Icon */}
          <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-galaxy-gold/20 flex items-center justify-center border border-galaxy-gold/40 shadow-[0_0_20px_rgba(247,200,91,0.5)]">
            <Flame className="w-9 h-9 text-galaxy-gold diya-flame-anim" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-galaxy-gold bg-galaxy-gold/15 border border-galaxy-gold/30 mb-2">
            Diya Lit ✦ Blessing Unlocked
          </span>

          <h3 className="font-serif font-black text-2xl sm:text-3xl text-galaxy-ivory mt-1 mb-2">
            {blessing.title}
          </h3>

          {blessing.sanskrit && (
            <p className="font-serif text-sm sm:text-base text-galaxy-gold italic mb-3 opacity-90">
              {blessing.sanskrit}
            </p>
          )}

          <div className="my-4 p-4 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/20">
            <p className="text-base sm:text-lg text-galaxy-ivory/95 leading-relaxed font-sans">
              “{blessing.text}”
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleCopyBlessing}
              className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-galaxy-royal/80 hover:bg-galaxy-royal border border-galaxy-gold/30 text-galaxy-ivory text-sm font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Blessing Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-galaxy-gold" />
                  <span>Copy Blessing</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-galaxy-gold to-galaxy-amber text-galaxy-midnight text-sm font-bold shadow-md hover:brightness-105 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Keep Lighting Diyas</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
