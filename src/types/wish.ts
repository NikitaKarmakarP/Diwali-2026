export type WishCategory =
  | 'Family'
  | 'Friends'
  | 'Love'
  | 'Happiness'
  | 'Prosperity'
  | 'Success'
  | 'Universal';

export type WishTheme = 'golden-galaxy' | 'royal-blue' | 'traditional-diwali';

export interface WishData {
  sender: string;
  recipient: string;
  message: string;
  category: WishCategory;
  theme: WishTheme;
  timestamp?: number;
}

export interface BlessingItem {
  id: string;
  title: string;
  sanskrit?: string;
  text: string;
  category: string;
}

export interface DiyaState {
  id: number;
  name: string;
  meaning: string;
  isLit: boolean;
  blessing: BlessingItem;
}

export interface CommunityWish {
  id: string;
  sender: string;
  recipient: string;
  message: string;
  category: WishCategory;
  sparksCount: number;
  location?: string;
  timestamp: number;
  theme: WishTheme;
}

