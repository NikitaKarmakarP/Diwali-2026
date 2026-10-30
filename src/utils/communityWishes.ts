import { CommunityWish, WishCategory, WishTheme } from '../types/wish';

const STORAGE_KEY = 'diwali_galaxy_community_wishes_v1';
const SPARKS_KEY = 'diwali_galaxy_sparked_ids_v1';

export const INITIAL_COMMUNITY_WISHES: CommunityWish[] = [
  {
    id: 'cw-1',
    sender: 'Aarav & Meera',
    recipient: 'Grandparents in Varanasi',
    message: 'Dadi and Dadu, lighting 101 diyas tonight thinking of your stories, sweets, and loving hugs. Wishing you vibrant health and peace!',
    category: 'Family',
    sparksCount: 142,
    location: 'Bengaluru, India',
    timestamp: Date.now() - 1000 * 60 * 60 * 3,
    theme: 'golden-galaxy',
  },
  {
    id: 'cw-2',
    sender: 'রূপম ও তিতাস (Rupam & Titas)',
    recipient: 'কলকাতা ও সারা বিশ্বের বন্ধুদের জন্য (Friends in Kolkata & Worldwide)',
    message: 'আলোর উৎসব দীপাবলি সবার জীবনে আনন্দ, সুস্বাস্থ্য আর নতুন আশার আলো নিয়ে আসুক। শুভ দীপাবলি ও আন্তরিক ভালোবাসা সবাইকে!',
    category: 'Universal',
    sparksCount: 98,
    location: 'Kolkata, India',
    timestamp: Date.now() - 1000 * 60 * 60 * 7,
    theme: 'royal-blue',
  },
  {
    id: 'cw-3',
    sender: 'Vikram',
    recipient: 'Ananya',
    message: 'Even across 8,000 miles, every diya I light tonight shines with thoughts of you. Happy Diwali, my constant cosmic light.',
    category: 'Love',
    sparksCount: 215,
    location: 'Toronto, Canada',
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
    theme: 'traditional-diwali',
  },
  {
    id: 'cw-4',
    sender: 'Dev & Startup Team',
    recipient: 'Dreamers & Creators Everywhere',
    message: 'May this festive new year ignite fresh breakthroughs, fearless creativity, and abundance for everyone chasing noble dreams!',
    category: 'Success',
    sparksCount: 87,
    location: 'San Francisco, USA',
    timestamp: Date.now() - 1000 * 60 * 60 * 16,
    theme: 'golden-galaxy',
  },
  {
    id: 'cw-5',
    sender: 'Kavita Sharma',
    recipient: 'Our Childhood Friends Circle',
    message: 'Missing our rooftop sparkler fights and Kaju Katli raids! May your lives forever glitter brighter than thousand sky lanterns!',
    category: 'Friends',
    sparksCount: 164,
    location: 'Mumbai, India',
    timestamp: Date.now() - 1000 * 60 * 60 * 22,
    theme: 'golden-galaxy',
  },
  {
    id: 'cw-6',
    sender: 'Shantanu Sen',
    recipient: 'Peace for All Living Beings',
    message: 'May every home find peace, every hungry heart find nourishing kindness, and may darkness yield to boundless celestial compassion.',
    category: 'Universal',
    sparksCount: 310,
    location: 'London, UK',
    timestamp: Date.now() - 1000 * 60 * 60 * 28,
    theme: 'royal-blue',
  },
];

// Simple friendly moderation check
const BLOCKED_WORDS = ['hate', 'kill', 'scam', 'spam', 'abuse'];

export function moderateContent(text: string): { isSafe: boolean; reason?: string } {
  const lower = text.toLowerCase();
  for (const word of BLOCKED_WORDS) {
    if (lower.includes(word)) {
      return { isSafe: false, reason: 'Please maintain a warm and respectful festive spirit.' };
    }
  }
  return { isSafe: true };
}

export function getCommunityWishes(): CommunityWish[] {
  if (typeof window === 'undefined') return INITIAL_COMMUNITY_WISHES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMMUNITY_WISHES));
      return INITIAL_COMMUNITY_WISHES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_COMMUNITY_WISHES;
  } catch (e) {
    console.warn('Error reading community wishes:', e);
    return INITIAL_COMMUNITY_WISHES;
  }
}

export function saveCommunityWish(wish: {
  sender: string;
  recipient: string;
  message: string;
  category: WishCategory;
  theme: WishTheme;
  location?: string;
}): { success: boolean; error?: string; newWish?: CommunityWish } {
  const moderation = moderateContent(`${wish.sender} ${wish.recipient} ${wish.message}`);
  if (!moderation.isSafe) {
    return { success: false, error: moderation.reason };
  }

  const existing = getCommunityWishes();
  const newEntry: CommunityWish = {
    id: `cw-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    sender: wish.sender.trim(),
    recipient: wish.recipient.trim(),
    message: wish.message.trim(),
    category: wish.category,
    theme: wish.theme,
    location: wish.location?.trim() || 'Cosmic Starlight',
    sparksCount: 1,
    timestamp: Date.now(),
  };

  const updated = [newEntry, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { success: true, newWish: newEntry };
  } catch (e) {
    console.error('Failed to save to local community wishes:', e);
    return { success: false, error: 'Could not post wish to community starlight.' };
  }
}

export function sparkWish(wishId: string): { success: boolean; newCount: number } {
  if (typeof window === 'undefined') return { success: false, newCount: 0 };
  try {
    const sparkedRaw = localStorage.getItem(SPARKS_KEY);
    const sparkedIds: string[] = sparkedRaw ? JSON.parse(sparkedRaw) : [];

    if (sparkedIds.includes(wishId)) {
      return { success: false, newCount: 0 }; // Already sparked
    }

    const wishes = getCommunityWishes();
    let newCount = 0;
    const updated = wishes.map((w) => {
      if (w.id === wishId) {
        newCount = w.sparksCount + 1;
        return { ...w, sparksCount: newCount };
      }
      return w;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(SPARKS_KEY, JSON.stringify([...sparkedIds, wishId]));
    return { success: true, newCount };
  } catch (e) {
    console.error('Error sparking wish:', e);
    return { success: false, newCount: 0 };
  }
}

export function isWishSparked(wishId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const sparkedRaw = localStorage.getItem(SPARKS_KEY);
    const sparkedIds: string[] = sparkedRaw ? JSON.parse(sparkedRaw) : [];
    return sparkedIds.includes(wishId);
  } catch {
    return false;
  }
}
