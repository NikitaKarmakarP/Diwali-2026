import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { WishData } from '../types/wish';
import { WishCard } from './WishCard';
import { ShareControls } from './ShareControls';
import { DownloadCardButton } from './DownloadCardButton';
import { soundEngine } from '../utils/soundEffects';
import { generateWishUrl } from '../utils/shareUtils';
import { Sparkles, PlusCircle, Flame } from 'lucide-react';

interface WishEnvelopeProps {
  wish: WishData;
  initiallyOpen?: boolean;
}

export const WishEnvelope: React.FC<WishEnvelopeProps> = ({ wish, initiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const cardRef = useRef<HTMLDivElement>(null);
  const shareUrl = generateWishUrl(wish);

  const handleOpen = () => {
    if (isOpen) return;

    soundEngine.playEnvelopeOpenSound();

    // Trigger celebratory golden sparkle burst
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#B9B8FF'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }

    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Sealed Floating Envelope */
          <motion.div
            key="sealed-envelope"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.08, y: -20, transition: { duration: 0.4 } }}
            className="flex flex-col items-center text-center cursor-pointer group focus:outline-none"
            onClick={handleOpen}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label="Click or press Enter to open your Diwali wish envelope"
          >
            {/* Ambient Envelope Glow */}
            <div className="relative mb-6">
              <div className="absolute inset-0 -m-6 rounded-3xl bg-galaxy-gold/25 filter blur-xl group-hover:bg-galaxy-gold/45 group-hover:scale-105 transition-all duration-500 animate-pulse-glow" />

              {/* The Envelope Body */}
              <div className="relative w-72 sm:w-96 h-48 sm:h-64 rounded-2xl bg-gradient-to-br from-[#1B2758] via-[#101D48] to-[#0B1437] border-2 border-galaxy-gold/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center p-6 overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-1">
                {/* Envelope Fold Pattern */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                  viewBox="0 0 400 260"
                  preserveAspectRatio="none"
                >
                  <path d="M 0 0 L 200 140 L 400 0" fill="none" stroke="#F7C85B" strokeWidth="1.5" />
                  <path d="M 0 260 L 150 110" fill="none" stroke="#F7C85B" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 400 260 L 250 110" fill="none" stroke="#F7C85B" strokeWidth="1" strokeDasharray="3 3" />
                </svg>

                {/* Golden Wax Diya Seal */}
                <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-galaxy-gold via-galaxy-amber to-[#944D12] border-2 border-galaxy-ivory shadow-[0_0_25px_rgba(247,200,91,0.8)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-galaxy-midnight fill-current diya-flame-anim" />
                </div>

                {/* Recipient Tagline */}
                <div className="relative z-10 mt-4 text-center">
                  <p className="text-[11px] uppercase tracking-widest text-galaxy-lavender/90 font-mono">
                    Festive Cosmic Dispatch
                  </p>
                  <p className="font-serif font-bold text-lg sm:text-xl text-galaxy-ivory mt-0.5">
                    For {wish.recipient || 'You'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tap Prompt with pulsing sparkle */}
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-galaxy-royal/80 border border-galaxy-gold/30 text-galaxy-gold text-sm font-semibold tracking-wide shadow-lg group-hover:border-galaxy-gold transition-colors">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Tap to Open Your Diwali Blessing</span>
            </div>
          </motion.div>
        ) : (
          /* Revealed Greeting Card + Actions */
          <motion.div
            key="opened-card"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center space-y-6"
          >
            {/* The Greeting Card */}
            <div className="w-full flex justify-center">
              <WishCard ref={cardRef} wish={wish} />
            </div>

            {/* Share & Download Actions */}
            <div className="w-full max-w-lg glass-panel rounded-3xl p-5 sm:p-7 space-y-5">
              <div className="text-center">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-galaxy-ivory">
                  Share the Radiance
                </h3>
                <p className="text-xs text-galaxy-lavender/80 mt-1">
                  Forward this personalized cosmic wish or export it as a keepsake.
                </p>
              </div>

              {/* Share Controls */}
              <ShareControls wish={wish} shareUrl={shareUrl} />

              {/* Download and Create Another Wish Action */}
              <div className="pt-2 border-t border-galaxy-gold/15 flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <DownloadCardButton cardRef={cardRef} fileName={`Diwali-Wish-for-${wish.recipient || 'Friend'}.png`} />
                </div>
                <Link
                  to="/create"
                  className="inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-galaxy-midnight/80 hover:bg-galaxy-royal text-galaxy-gold border border-galaxy-gold/30 hover:border-galaxy-gold/60 text-sm font-medium transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Another Wish</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
