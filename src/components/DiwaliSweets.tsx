import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  Gift,
  Share2,
  X,
  Check,
  RotateCcw,
  Star,
  Award,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface SweetItem {
  id: string;
  name: string;
  hindi: string;
  bengali: string;
  category: 'Ghee Classics' | 'Royal Silver' | 'Syrupy Delights' | 'Festive Pastries';
  tagline: string;
  blessing: string;
  sanskritVerse: string;
  ingredients: string[];
  emoji: string;
  image: string;
  badge: string;
  color: string;
  accentGradient: string;
  borderColor: string;
  description: string;
}

const SWEETS_DATA: SweetItem[] = [
  {
    id: 'kaju-katli',
    name: 'Kaju Katli',
    hindi: 'काजू कतली',
    bengali: 'কাজু বরফি',
    category: 'Royal Silver',
    tagline: 'The Silver-Crowned Royal Jewel of Deepavali Gifts',
    blessing: 'May your bond with loved ones remain as pure, enduring, and precious as silver-kissed Kaju Katli.',
    sanskritVerse: 'मधुरेण समापयेत् — May every journey end in divine sweetness.',
    ingredients: ['Goan Cashews', 'Edible Silver Varq', 'Green Cardamom', 'Organic Cane Sugar'],
    emoji: '💎',
    image: 'https://i.pinimg.com/736x/65/23/b4/6523b47bdf51b6ada6839ea1e86d0c17.jpg',
    badge: '👑 Royal Favorite',
    color: '#E2E8F0',
    accentGradient: 'from-slate-100 via-amber-100 to-amber-200 text-slate-900',
    borderColor: 'border-slate-300/40 hover:border-slate-200',
    description: 'Diamond-cut delicacies made by gently cooking hand-ground cashews into silky fudge, adorned with gossamer silver foil for royalty and prestige.',
  },
  {
    id: 'motichoor-ladoo',
    name: 'Motichoor Ladoo',
    hindi: 'मोतीचूर के लड्डू',
    bengali: 'মতিচূর লাড্ডু',
    category: 'Ghee Classics',
    tagline: "Ganesha's Beloved Golden Spheres of Good Fortune",
    blessing: 'May every tiny effort of yours bind together into magnificent golden success and prosperity.',
    sanskritVerse: 'मोदकप्रियाय नमः — Salutations to the Lord who loves sweet Modakas.',
    ingredients: ['Micro Gram Flour Pearls', 'Pure Desi Ghee', 'Kashmiri Saffron', 'Melon Seeds'],
    emoji: '🟡',
    image: 'https://i.pinimg.com/736x/c2/0e/d5/c20ed5077582d06806417237237b7058.jpg',
    badge: '🪔 Puja Special',
    color: '#FFA439',
    accentGradient: 'from-amber-400 via-orange-500 to-amber-600 text-slate-950',
    borderColor: 'border-amber-400/40 hover:border-amber-300',
    description: 'Golden micro-droplets of chickpea flour fried to crisp perfection in desi cow ghee, steeped in fragrant saffron syrup and shaped into joyous spheres.',
  },
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    hindi: 'शाही गुलाब जामुन',
    bengali: 'গোলাপ জাম',
    category: 'Syrupy Delights',
    tagline: 'Melt-in-Mouth Velvet Dumplings in Rose Nectar',
    blessing: 'May all bitterness in your life dissolve away into the warmth of forgiveness and sweet contentment.',
    sanskritVerse: 'आनन्दो ब्रह्मेति व्यजानात् — Realize that ultimate Joy is divine.',
    ingredients: ['Reduced Milk Mawa', 'Rosewater Nectar', 'Kewra Essence', 'Pistachio Flakes'],
    emoji: '🍯',
    image: 'https://i.pinimg.com/736x/2d/01/4f/2d014f0c4ef9b657e8cacbb21460dd6b.jpg',
    badge: '🌹 Velvet Nectar',
    color: '#8C4A14',
    accentGradient: 'from-amber-700 via-rose-800 to-red-950 text-amber-100',
    borderColor: 'border-amber-600/40 hover:border-amber-400',
    description: 'Soft, golden-brown dumplings kneaded from reduced whole-milk khoya, deep-fried until tender and rested in fragrant rosewater-cardamom syrup.',
  },
  {
    id: 'rasgulla',
    name: 'Spongy Rasgulla',
    hindi: 'रसगुल्ला',
    bengali: 'রসগোল্লা (স্পঞ্জ)',
    category: 'Syrupy Delights',
    tagline: 'The Cloud-Soft Pristine Jewel of Bengal',
    blessing: 'May your heart stay as light, unburdened, and luminous as fresh spongy Rasgulla.',
    sanskritVerse: 'शुद्धं शान्तं सुकोमलम् — Pure, tranquil, and tender.',
    ingredients: ['Fresh Cow Chenna', 'Crystalline Light Syrup', 'Crushed Green Cardamom'],
    emoji: '⚪',
    image: 'https://i.pinimg.com/736x/65/48/aa/6548aa29df831eff6e4494a04fe5728e.jpg',
    badge: '☁️ Cloud Pure',
    color: '#FFF1D0',
    accentGradient: 'from-amber-50 via-yellow-100 to-orange-100 text-slate-900',
    borderColor: 'border-amber-200/40 hover:border-amber-100',
    description: 'Hand-kneaded fresh cottage cheese dumplings simmered gently in light cane sugar syrup until they expand into featherlight, juicy orbs of bliss.',
  },
  {
    id: 'jalebi',
    name: 'Shahi Jalebi',
    hindi: 'कुरकुरी जलेबी',
    bengali: 'কেশর জিলিপি',
    category: 'Syrupy Delights',
    tagline: 'Crisp Spirals Bursting with Saffron Dew',
    blessing: 'No matter how tangled and twisty life gets, may the final outcome always be crisply sweet!',
    sanskritVerse: 'कुण्डलीकृत्य मधुरम् — Joy coiled in golden concentric rings.',
    ingredients: ['Fermented Wheat Batter', 'Saffron Strands', 'Cardamom Dew', 'Pure Desi Ghee'],
    emoji: '🌀',
    image: 'https://i.pinimg.com/736x/8a/74/28/8a74282a90b87d45d9dcd3aed534b425.jpg',
    badge: '🔥 Fresh & Crisp',
    color: '#FF6B00',
    accentGradient: 'from-orange-500 via-amber-500 to-yellow-400 text-slate-950',
    borderColor: 'border-orange-500/40 hover:border-orange-300',
    description: 'Fermented batter squeezed in rapid concentric swirls into piping hot desi ghee, then immediately soaked in thick saffron-scented syrup for that legendary crunch.',
  },
  {
    id: 'besan-ladoo',
    name: 'Desi Ghee Besan Ladoo',
    hindi: 'बेसन के लड्डू',
    bengali: 'বেসন লাড্ডু',
    category: 'Ghee Classics',
    tagline: 'The Soul-Warming Aroma of Festive Indian Homes',
    blessing: 'May your home always be fragrant with health, loving gatherings, and nourishing abundance.',
    sanskritVerse: 'पुष्टिवर्धनम् — The nourisher of vital energy and joy.',
    ingredients: ['Coarse Chickpea Flour', 'Bilona Cow Ghee', 'Boora Sugar', 'Nutmeg & Pistachios'],
    emoji: '🍪',
    image: 'https://i.pinimg.com/1200x/96/cf/c5/96cfc51db2d182eb72045a3d684d04a5.jpg',
    badge: '🧈 Pure Cow Ghee',
    color: '#D49228',
    accentGradient: 'from-yellow-500 via-amber-500 to-yellow-600 text-slate-950',
    borderColor: 'border-yellow-400/40 hover:border-yellow-300',
    description: 'Coarsely milled gram flour slow-roasted on gentle embers with pure cow ghee until nutty and golden, blended with aromatic cardamom and garnished with nuts.',
  },
  {
    id: 'gujiya',
    name: 'Mawa Gujiya',
    hindi: 'करंजी / गुझिया',
    bengali: 'গুজিয়া / চন্দ্রপুলি',
    category: 'Festive Pastries',
    tagline: 'Golden Crescent Pockets Stuffed with Sweet Khoya',
    blessing: 'May your life be like a crescent moon, continuously expanding into full, radiant joy.',
    sanskritVerse: 'चन्द्रवत् वर्धमानम् — Growing like the auspicious moon.',
    ingredients: ['Crisp Flour Crust', 'Roasted Khoya', 'Grated Dry Coconut', 'Chironji & Almonds'],
    emoji: '🥟',
    image: 'https://i.pinimg.com/736x/30/d2/fa/30d2faa019bf820e00274a85031b4196.jpg',
    badge: '🌙 Crescent Moon',
    color: '#F7C85B',
    accentGradient: 'from-amber-300 via-yellow-400 to-amber-500 text-slate-950',
    borderColor: 'border-amber-300/40 hover:border-amber-200',
    description: 'Flaky crescent turnovers crimped by hand, enclosing a sumptuous stuffing of roasted khoya, fragrant coconut, green raisins, and sliced dry fruits.',
  },
  {
    id: 'mathura-peda',
    name: 'Mathura Peda',
    hindi: 'मथुरा का पेड़ा',
    bengali: 'বৃন্দাবন প্যারা',
    category: 'Ghee Classics',
    tagline: 'Caramelized Divine Fudge Blessed with Sacred Tradition',
    blessing: 'May peace and sweet contentment fill your days through every celebration.',
    sanskritVerse: 'शान्तिः पुष्टिस्तुष्टिश्च — Peace, vitality, and deep satisfaction.',
    ingredients: ['Slow-Caramelized Khoya', 'Cardamom Powder', 'Crushed Pistachios', 'Cane Boora'],
    emoji: '🟤',
    image: 'https://i.pinimg.com/736x/b1/93/15/b1931595ca10149d46e49baf85a977d9.jpg',
    badge: '🙏 Temple Heritage',
    color: '#A0522D',
    accentGradient: 'from-amber-600 via-yellow-700 to-amber-900 text-amber-50',
    borderColor: 'border-amber-700/40 hover:border-amber-500',
    description: 'Deeply caramelized condensed milk solids cooked slowly with desi ghee, rolled in aromatic cardamom powder and dusted with sugar.',
  },
];

type CategoryFilter = 'All' | 'Ghee Classics' | 'Royal Silver' | 'Syrupy Delights' | 'Festive Pastries';

export const DiwaliSweets: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All');
  const [selectedSweet, setSelectedSweet] = useState<SweetItem | null>(null);
  const [mithaiThal, setMithaiThal] = useState<string[]>(['kaju-katli', 'motichoor-ladoo']);
  const [totalOfferedCount, setTotalOfferedCount] = useState<number>(108);

  const categories: CategoryFilter[] = [
    'All',
    'Royal Silver',
    'Ghee Classics',
    'Syrupy Delights',
    'Festive Pastries',
  ];

  const filteredSweets =
    activeFilter === 'All'
      ? SWEETS_DATA
      : SWEETS_DATA.filter((s) => s.category === activeFilter);

  const handleAddToThal = (sweet: SweetItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundEngine.playDiyaLightSound();

    if (!mithaiThal.includes(sweet.id)) {
      setMithaiThal((prev) => [...prev, sweet.id]);
    }

    setTotalOfferedCount((prev) => prev + 1);

    try {
      const rect = e?.currentTarget?.getBoundingClientRect();
      const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
      const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.6;

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { x, y },
        colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#FF8C00', '#B9B8FF'],
        disableForReducedMotion: true,
      });
    } catch {
      // fallback
    }
  };

  const handleOfferThalToAll = () => {
    soundEngine.playCelebrationSound();
    setTotalOfferedCount((prev) => prev + mithaiThal.length * 5);

    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#FF6BA8', '#2ECC71'],
    });
  };

  const handleResetThal = () => {
    soundEngine.playDiyaLightSound();
    setMithaiThal([]);
  };

  return (
    <section id="diwali-sweets" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* ── Ambient Radial Atmosphere Glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-gradient-to-r from-amber-500/15 via-galaxy-gold/20 to-orange-600/15 rounded-full filter blur-[150px] pointer-events-none -z-10 animate-pulse-slow" />

      {/* ── Floating Saffron Threads & Golden Embers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-galaxy-amber"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 17) % 95}%`,
              left: `${(i * 23) % 95}%`,
              opacity: 0.4,
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, i % 2 === 0 ? 12 : -12, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-galaxy-gold/15 via-galaxy-amber/20 to-galaxy-gold/15 border border-galaxy-gold/40 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(247,200,91,0.25)] backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-galaxy-gold animate-spin-slow" />
            <span className="font-serif">दीपावली मिष्ठान्न थाली ✦ Divine Mithai Collection</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4 text-galaxy-ivory leading-tight"
          >
            Taste the Sweetness of{' '}
            <span className="gold-gradient-text drop-shadow-[0_4px_24px_rgba(247,200,91,0.4)]">
              Cosmic Joy & Blessings
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-galaxy-ivory/85 leading-relaxed font-sans max-w-2xl mx-auto"
          >
            Diwali is incomplete without the sacred aroma of desi ghee and warm saffron nectar.
            Explore authentic Indian festive sweets, build your virtual mithai thal, and send sweet
            blessings across the universe!
          </motion.p>
        </div>

        {/* ── Interactive Virtual Mithai Thal (Platter) Builder ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel-gold rounded-3xl p-6 sm:p-8 border-2 border-galaxy-gold/45 mb-12 shadow-[0_20px_60px_rgba(0,0,0,0.55)] relative overflow-hidden"
        >
          {/* Subtle Rotating Thal Ring in Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-galaxy-gold/15 rounded-full pointer-events-none animate-spin-slow opacity-30" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            {/* Left: Thal Information */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-galaxy-gold/30 via-galaxy-amber/20 to-transparent border border-galaxy-gold/50 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(247,200,91,0.4)]">
                🪔
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <h3 className="font-serif font-black text-xl text-galaxy-ivory">
                    Your Sacred Diwali Mithai Thal
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-galaxy-gold/20 text-galaxy-gold font-bold font-mono">
                    {mithaiThal.length} Sweets Selected
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-galaxy-ivory/80 mt-1 max-w-xl">
                  {mithaiThal.length === 0
                    ? 'Your thal is currently empty. Tap "Add to Thal" on any sweet below to fill it with divine festive treats!'
                    : 'Your sweet thali is radiating with auspicious warmth and ready to be shared with friends and family.'}
                </p>
                <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2 text-[11px] text-galaxy-gold font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
                  <span>{totalOfferedCount} Mithais Offered Globally ✦ मिठाई बांटो</span>
                </div>
              </div>
            </div>

            {/* Right: Selected Sweet Emojis & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center space-x-2 p-2 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/30 min-h-[56px] max-w-full overflow-x-auto custom-scrollbar">
                {mithaiThal.length === 0 ? (
                  <span className="text-xs text-galaxy-lavender/60 px-3">Thali is awaiting sweets...</span>
                ) : (
                  mithaiThal.map((id) => {
                    const item = SWEETS_DATA.find((s) => s.id === id);
                    if (!item) return null;
                    return (
                      <motion.button
                        key={id}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => setSelectedSweet(item)}
                        className="relative w-12 h-12 rounded-xl overflow-hidden border border-galaxy-gold/50 flex items-center justify-center hover:border-galaxy-gold transition-all cursor-pointer shadow-md group"
                        title={`${item.name} (Click for details)`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      </motion.button>
                    );
                  })
                )}
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleOfferThalToAll}
                  disabled={mithaiThal.length === 0}
                  className={`px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-md transition-all cursor-pointer ${
                    mithaiThal.length > 0
                      ? 'bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight shadow-[0_0_20px_rgba(247,200,91,0.4)] hover:shadow-[0_0_30px_rgba(247,200,91,0.6)]'
                      : 'bg-galaxy-midnight text-galaxy-lavender/50 border border-white/10 cursor-not-allowed'
                  }`}
                >
                  <Gift className="w-4 h-4" />
                  <span>Offer Thal to Cosmos ✦</span>
                </motion.button>

                {mithaiThal.length > 0 && (
                  <button
                    type="button"
                    onClick={handleResetThal}
                    className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-galaxy-lavender hover:text-galaxy-ivory border border-white/15 transition-all"
                    title="Reset Mithai Thal"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Category Filter Pills ── */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = activeFilter === cat;
            return (
              <motion.button
                key={cat}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  soundEngine.playDiyaLightSound();
                  setActiveFilter(cat);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight shadow-[0_0_15px_rgba(247,200,91,0.4)]'
                    : 'glass-panel border-white/15 text-galaxy-ivory/80 hover:text-galaxy-gold hover:border-galaxy-gold/40'
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* ── Mithai Cards Grid with Authentic Photos ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSweets.map((sweet, index) => {
            const isInThal = mithaiThal.includes(sweet.id);

            return (
              <motion.div
                key={sweet.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedSweet(sweet)}
                className={`glass-panel-gold rounded-3xl p-5 border-2 ${sweet.borderColor} shadow-[0_15px_40px_rgba(0,0,0,0.55)] flex flex-col justify-between cursor-pointer group relative overflow-hidden transition-all duration-300`}
              >
                {/* Background Ambient Glow on Hover */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-galaxy-gold/10 rounded-full filter blur-2xl group-hover:bg-galaxy-gold/25 transition-all pointer-events-none" />

                <div>
                  {/* Photo Container with Rounded Frame & Badge */}
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 border border-galaxy-gold/30 shadow-md">
                    <img
                      src={sweet.image}
                      alt={sweet.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback in case of network glitch
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-galaxy-midnight via-transparent to-black/20" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-galaxy-gold px-2.5 py-1 rounded-full bg-galaxy-midnight/90 border border-galaxy-gold/40 shadow-sm backdrop-blur-md">
                        {sweet.badge}
                      </span>
                    </div>

                    {/* Emoji watermark */}
                    <div className="absolute bottom-2 right-2.5 text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {sweet.emoji}
                    </div>
                  </div>

                  {/* Sweet Title & Vernacular Names */}
                  <div className="mb-2.5">
                    <h3 className="font-serif font-black text-xl text-galaxy-ivory group-hover:text-galaxy-gold transition-colors">
                      {sweet.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs font-mono text-galaxy-gold/90 mt-0.5">
                      <span>{sweet.hindi}</span>
                      <span>•</span>
                      <span className="text-galaxy-lavender/80">{sweet.bengali}</span>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs text-galaxy-ivory/80 font-sans leading-relaxed line-clamp-2 mb-3">
                    {sweet.tagline}
                  </p>

                  {/* Sacred Blessing Pill */}
                  <div className="p-3 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/20 mb-3 text-[11px] text-galaxy-ivory/90 italic font-serif leading-snug">
                    "{sweet.blessing}"
                  </div>

                  {/* Key Ingredients */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {sweet.ingredients.slice(0, 3).map((ing) => (
                      <span
                        key={ing}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-galaxy-lavender border border-white/10"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-galaxy-gold/20 flex items-center justify-between gap-2">
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    type="button"
                    onClick={(e) => handleAddToThal(sweet, e)}
                    className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                      isInThal
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                        : 'bg-gradient-to-r from-galaxy-gold/20 via-galaxy-amber/25 to-galaxy-gold/20 hover:from-galaxy-gold hover:to-galaxy-amber text-galaxy-ivory hover:text-galaxy-midnight border border-galaxy-gold/40'
                    }`}
                  >
                    {isInThal ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>In Your Thal</span>
                      </>
                    ) : (
                      <>
                        <Gift className="w-3.5 h-3.5" />
                        <span>Add to Thal</span>
                      </>
                    )}
                  </motion.button>

                  <button
                    type="button"
                    className="p-2.5 rounded-xl bg-galaxy-midnight/80 hover:bg-galaxy-royal text-galaxy-gold border border-galaxy-gold/30 hover:border-galaxy-gold transition-colors"
                    title="View Sweet Lore & Blessing"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Sweet Lore & Blessing Modal with Large Image ── */}
      <AnimatePresence>
        {selectedSweet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-xl glass-panel-gold rounded-3xl p-6 sm:p-8 border-2 border-galaxy-gold/50 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedSweet(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-galaxy-midnight/80 text-galaxy-ivory hover:text-galaxy-gold border border-galaxy-gold/30 transition-all cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image Showcase in Modal */}
              <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden mb-5 border border-galaxy-gold/40 shadow-lg">
                <img
                  src={selectedSweet.image}
                  alt={selectedSweet.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-galaxy-midnight via-transparent to-black/30" />

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-galaxy-gold px-3 py-1 rounded-full bg-galaxy-midnight/90 border border-galaxy-gold/40">
                    {selectedSweet.badge}
                  </span>
                  <span className="text-3xl drop-shadow-md">{selectedSweet.emoji}</span>
                </div>
              </div>

              {/* Title & Vernacular */}
              <div className="mb-4">
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-galaxy-ivory">
                  {selectedSweet.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-galaxy-gold font-bold mt-0.5">
                  {selectedSweet.hindi} ✦ {selectedSweet.bengali}
                </p>
              </div>

              {/* Sanskrit Shloka Badge */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-galaxy-midnight/90 to-galaxy-royal/70 border border-galaxy-gold/30 mb-4">
                <p className="font-serif text-xs text-galaxy-gold font-bold mb-0.5">
                  ✦ वैदिक मिष्ठान्न श्लोक ✦
                </p>
                <p className="font-serif italic text-sm text-galaxy-ivory">
                  {selectedSweet.sanskritVerse}
                </p>
              </div>

              {/* Description & Lore */}
              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-galaxy-gold mb-1 font-sans">
                  The Heritage & Artistry
                </h4>
                <p className="text-xs sm:text-sm text-galaxy-ivory/85 leading-relaxed font-sans">
                  {selectedSweet.description}
                </p>
              </div>

              {/* Ingredients */}
              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-galaxy-gold mb-1.5 font-sans">
                  Sacred Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSweet.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="text-xs px-3 py-1 rounded-xl bg-galaxy-midnight/90 text-galaxy-ivory border border-galaxy-gold/30"
                    >
                      ✦ {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Diwali Blessing */}
              <div className="p-4 rounded-2xl bg-galaxy-gold/15 border border-galaxy-gold/40 mb-6 text-center">
                <p className="text-[11px] uppercase tracking-wider text-galaxy-gold font-bold mb-1">
                  Sacred Festive Blessing
                </p>
                <p className="font-serif text-sm sm:text-base text-galaxy-ivory font-bold italic">
                  "{selectedSweet.blessing}"
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={(e) => {
                    handleAddToThal(selectedSweet, e);
                    setSelectedSweet(null);
                  }}
                  className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 text-galaxy-midnight font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(247,200,91,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Gift className="w-4 h-4" />
                  <span>Add to Diwali Thal</span>
                </motion.button>

                <Link
                  to={`/create?recipient=${encodeURIComponent('My Loved Ones')}&sender=${encodeURIComponent('Well-Wisher')}&message=${encodeURIComponent(
                    `Shubh Deepavali! May your life be filled with sweet blessings: "${selectedSweet.blessing}"`
                  )}`}
                  className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-galaxy-midnight/90 hover:bg-galaxy-royal text-galaxy-gold border border-galaxy-gold/40 font-bold text-xs sm:text-sm text-center flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Send as Greeting</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
