import { WishCategory } from '../types/wish';

export interface WishTemplate {
  id: string;
  category: WishCategory;
  title: string;
  message: string;
  language?: string;
}

export const WISH_TEMPLATES: WishTemplate[] = [
  // Family
  {
    id: 'fam-1',
    category: 'Family',
    title: 'Warmth of Home',
    message: 'May the divine light of Diwali illuminate our home with endless happiness, health, and togetherness. Grateful for your constant warmth and love in my life.',
  },
  {
    id: 'fam-2',
    category: 'Family',
    title: 'Blessed Abode',
    message: 'Wishing our wonderful family a Diwali filled with laughter, delicious sweets, and the sacred blessings of Goddess Lakshmi and Lord Ganesha.',
  },
  {
    id: 'fam-3',
    category: 'Family',
    title: 'Bengali Festive Joy (পারিবারিক আনন্দ)',
    message: 'এই শুভ দীপাবলিতে আমাদের পরিবারে সুখ, শান্তি ও সমৃদ্ধি আসুক। মা লক্ষ্মীর আশীর্বাদে সবার জীবন আলোয় ভরে উঠুক। শুভ দীপাবলি!',
    language: 'Bengali',
  },

  // Friends
  {
    id: 'frn-1',
    category: 'Friends',
    title: 'Cosmic Sparkling Friendship',
    message: 'Just as diyas banish the dark, your friendship brings warmth and joy to my entire universe! Wishing you a dazzling and joyful Diwali, my dear friend!',
  },
  {
    id: 'frn-2',
    category: 'Friends',
    title: 'Laughter & Light',
    message: 'Here’s to another year of unforgettable memories, crazy celebrations, and endless joy. May your life shine brighter than a thousand sparklers this Diwali!',
  },
  {
    id: 'frn-3',
    category: 'Friends',
    title: 'Bond of Light (বন্ধুত্ব ও আলো)',
    message: 'দীপাবলির এই শুভক্ষণে তোমার জীবনে আনন্দ ও সাফল্যের নতুন দিগন্ত উন্মোচিত হোক। শুভ দীপাবলি বন্ধু!',
    language: 'Bengali',
  },

  // Love
  {
    id: 'lov-1',
    category: 'Love',
    title: 'My Guiding Light',
    message: 'You are the brightest diya in my life, lighting up even my darkest days. May our bond continue to glow with timeless warmth and cosmic love. Happy Diwali, my heartbeat.',
  },
  {
    id: 'lov-2',
    category: 'Love',
    title: 'Celestial Romance',
    message: 'With you by my side, every single moment feels as golden and joyful as Diwali night. Sending you all my love under this starry festive sky.',
  },

  // Prosperity
  {
    id: 'pro-1',
    category: 'Prosperity',
    title: 'Golden Abundance',
    message: 'May Goddess Lakshmi grace your life with boundless wealth, radiant health, and peaceful abundance this festive season. Wishing you a truly prosperous Diwali!',
  },
  {
    id: 'pro-2',
    category: 'Prosperity',
    title: 'Shubh Labh & Glory',
    message: 'May every diya you ignite bring new opportunities, endless wealth, and triumphant accomplishments into your home. Shubh Deepavali!',
  },

  // Success
  {
    id: 'suc-1',
    category: 'Success',
    title: 'Soaring Heights',
    message: 'May the holy radiance of Diwali fuel your ambitions and illuminate every step of your journey toward grand success. Keep shining brightly across the universe!',
  },
  {
    id: 'suc-2',
    category: 'Success',
    title: 'Bright Horizons',
    message: 'Wishing you breakthrough achievements, immense wisdom, and unwavering confidence this festive year. Shine on!',
  },

  // Happiness
  {
    id: 'hap-1',
    category: 'Happiness',
    title: 'Peace & Serenity',
    message: 'May peace transcend your worries, happiness fill every corner of your heart, and sweet memories delight your soul this Diwali. Have an uplifting celebration!',
  },
  {
    id: 'hap-2',
    category: 'Happiness',
    title: 'Pure Joy & Sweetness',
    message: 'May this festival of lights fill your life with the sweetness of mithai and the sparkle of golden diyas. Wishing you and yours boundless joy!',
  },

  // Universal
  {
    id: 'uni-1',
    category: 'Universal',
    title: 'Light Over Darkness',
    message: 'Tamaso Ma Jyotir Gamaya — May the divine light of Diwali triumph over all darkness, leading humanity to knowledge, kindness, and eternal peace.',
  },
  {
    id: 'uni-2',
    category: 'Universal',
    title: 'Celestial Wishes',
    message: 'Wishing you and your loved ones a sparkling Diwali that radiates love, harmony, and celestial light throughout the coming year. Shubh Deepavali!',
  },
  {
    id: 'uni-3',
    category: 'Universal',
    title: 'Universal Harmony (শুভ দীপাবলি)',
    message: 'আলোর উৎসব দীপাবলি সবার জীবনে বয়ে আনুক অনাবিল আনন্দ, শান্তি ও সৌভাগ্য। শুভ দীপাবলির আন্তরিক প্রীতি ও শুভেচ্ছা!',
    language: 'Bengali',
  },
];

export const BLESSINGS_LIST = [
  {
    id: 'bless-1',
    title: 'Arogya (Health & Vitality)',
    sanskrit: 'सर्वे सन्तु निरामयाः',
    text: 'May you and your family be blessed with radiant health, vitality, and freedom from all distress.',
    category: 'Health',
  },
  {
    id: 'bless-2',
    title: 'Shanti (Inner Peace)',
    sanskrit: 'ॐ शान्तिः शान्तिः शान्तिः',
    text: 'May tranquility settle in your mind, gentle calmness soothe your spirit, and peaceful harmony fill your home.',
    category: 'Peace',
  },
  {
    id: 'bless-3',
    title: 'Lakshmi Kripa (Abundance)',
    sanskrit: 'धनं धान्यं पशुं बहुपुत्रलाभम्',
    text: 'May the golden radiance of Goddess Lakshmi bless your household with sustained wealth and boundless generosity.',
    category: 'Prosperity',
  },
  {
    id: 'bless-4',
    title: 'Vidya (Wisdom & Clarity)',
    sanskrit: 'तमसो मा ज्योतिर्गमय',
    text: 'May the sacred flame dispel ignorance, bringing lucid clarity, creative wisdom, and discerning intellect.',
    category: 'Wisdom',
  },
  {
    id: 'bless-5',
    title: 'Preeti (Cosmic Love & Harmony)',
    sanskrit: 'परस्परं भावयन्तः श्रेयः परमवाप्स्यथ',
    text: 'May your relationships flourish with unconditional empathy, heartfelt joy, and unbreakable loyalty.',
    category: 'Love',
  },
  {
    id: 'bless-6',
    title: 'Vijaya (Triumph & Success)',
    sanskrit: 'यतो धर्मस्ततो जयः',
    text: 'May righteousness guide every decision and pave the way for noble victories in all your endeavors.',
    category: 'Success',
  },
  {
    id: 'bless-7',
    title: 'Ananda (Pure Eternal Joy)',
    sanskrit: 'आनन्दो ब्रह्मेति व्यजानात्',
    text: 'May your heart overflow with pure joy, celebration, and contentment that echoes through the universe.',
    category: 'Joy',
  },
];
