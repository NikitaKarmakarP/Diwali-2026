import React from 'react';
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
      <label className="block text-xs font-semibold uppercase tracking-wider text-galaxy-gold/90 mb-2.5">
        Wish Category
      </label>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onSelectCategory(cat.value)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold ${
                isSelected
                  ? 'bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight shadow-[0_0_15px_rgba(247,200,91,0.4)] font-bold scale-105'
                  : 'bg-galaxy-midnight/70 text-galaxy-ivory/80 border border-galaxy-gold/20 hover:border-galaxy-gold/50 hover:bg-galaxy-royal/60'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
