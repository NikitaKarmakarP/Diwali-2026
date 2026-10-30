import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { parseWishFromUrl } from '../utils/shareUtils';
import { WishEnvelope } from '../components/WishEnvelope';
import { Sparkles, AlertCircle, PlusCircle, Home } from 'lucide-react';

export const WishPage: React.FC = () => {
  const location = useLocation();

  const { wish, error } = useMemo(() => {
    return parseWishFromUrl(location.search);
  }, [location.search]);

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center justify-center">
      {wish ? (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          {/* Subtle Top Indicator */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-galaxy-gold/15 border border-galaxy-gold/30 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Cosmic Diwali Greeting</span>
            </span>
            <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-galaxy-ivory tracking-tight">
              A Starlit Message for {wish.recipient}
            </h1>
            <p className="text-sm sm:text-base text-galaxy-lavender/80 mt-2 max-w-md mx-auto">
              Sent with warm festive blessings across the cosmic galaxy.
            </p>
          </div>

          {/* The Magical Interactive Envelope */}
          <WishEnvelope wish={wish} initiallyOpen={false} />
        </div>
      ) : (
        /* Empty or Error State */
        <div className="w-full max-w-lg glass-panel rounded-3xl p-8 sm:p-12 border border-galaxy-gold/30 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-rose-400" />
          </div>

          <h2 className="font-serif font-black text-2xl sm:text-3xl text-galaxy-ivory mb-2">
            No Wish Found in the Starlight
          </h2>

          <p className="text-sm text-galaxy-lavender/80 mb-6 leading-relaxed">
            {error ||
              "This link may be missing its festive parameters, or the cosmic envelope has drifted away into a distant galaxy."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
              to="/create"
              className="flex-1 inline-flex items-center justify-center space-x-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-sm shadow-lg hover:brightness-105 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create a New Wish</span>
            </Link>

            <Link
              to="/"
              className="flex-1 inline-flex items-center justify-center space-x-2 py-3.5 px-5 rounded-2xl bg-galaxy-royal/80 hover:bg-galaxy-royal border border-galaxy-gold/30 text-galaxy-ivory text-sm font-medium transition-colors"
            >
              <Home className="w-4 h-4 text-galaxy-gold" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
