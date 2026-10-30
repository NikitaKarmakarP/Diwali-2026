import React, { useState } from 'react';
import { WishForm } from '../components/WishForm';
import { WishEnvelope } from '../components/WishEnvelope';
import { WishData } from '../types/wish';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CreatePage: React.FC = () => {
  const [createdWish, setCreatedWish] = useState<WishData | null>(null);

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {!createdWish ? (
          <div>
            <div className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 text-xs sm:text-sm text-galaxy-lavender/80 hover:text-galaxy-gold transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Galaxy Home</span>
              </Link>
            </div>
            <WishForm onWishCreated={(wish) => setCreatedWish(wish)} />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <button
                type="button"
                onClick={() => setCreatedWish(null)}
                className="inline-flex items-center space-x-2 text-xs sm:text-sm text-galaxy-lavender/80 hover:text-galaxy-gold transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Edit Your Wish Details</span>
              </button>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Magical Wish Generated!</span>
              </div>
              <h1 className="font-serif font-black text-3xl sm:text-4xl text-galaxy-ivory">
                Your Cosmic Diya Wish is Ready
              </h1>
              <p className="text-sm text-galaxy-lavender/80 mt-1 max-w-md mx-auto">
                Test the envelope opening experience below, or share the personalized link directly with {createdWish.recipient}!
              </p>
            </div>

            {/* Magical Envelope */}
            <WishEnvelope wish={createdWish} initiallyOpen={false} />
          </div>
        )}
      </div>
    </div>
  );
};
