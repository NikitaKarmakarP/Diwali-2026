import React from 'react';
import { motion } from 'framer-motion';
import { WishCategory } from '../types/wish';
import { Users, Heart, Smile, Coins, Trophy, Globe, Flame } from 'lucide-react';

interface WishCategorySelectorProps {
  selectedCategory: WishCategory;
  onSelectCategory: (category: WishCategory) => void;
}

interface CategoryOption {
  value: WishCategory;
  label: string;
  icon: React.ReactNode;
}

export const WishCategorySelector: React.FC<WishCategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories: CategoryOption[] = [
    { value: 'Family', label: 'Family', icon: <Users className="w-4 h-4" /> },
    { value: 'Friends', label: 'Friends', icon: <Flame className="w-4 h-4" /> },
    { value: 'Love', label: 'Love', icon: <Heart className="w-4 h-4" /> },
    { value: 'Prosperity', label: 'Prosperity', icon: <Coins className="w-4 h-4" /> },
    { value: 'Happiness', label: 'Happiness', icon: <Smile className="w-4 h-4" /> },
    { value: 'Success', label: 'Success', icon: <Trophy className="w-4 h-4" /> },
    { value: 'Universal', label: 'Universal', icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full">
      <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold mb-2.5">
        ✦ Select Wish Blessing Category ✦
      </label>
      <div className="flex flex-wrap gap-2.5">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onSelectCategory(cat.value)}
              className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 outline-none cursor-pointer ${
                isSelected
                  ? 'text-galaxy-midnight font-bold shadow-lg scale-105'
                  : 'glass-panel text-galaxy-ivory/80 hover:text-galaxy-gold hover:border-galaxy-gold/40'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeWishCatPill"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 shadow-[0_0_20px_rgba(247,200,91,0.45)] -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
