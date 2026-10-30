import React, { useState } from 'react';
import { Sparkles, Calendar } from 'lucide-react';

interface DiwaliDay {
  dayNumber: number;
  name: string;
  regionalNames: string[];
  theme: string;
  deity: string;
  significance: string;
  ritual: string;
  shloka: string;
  shlokaMeaning: string;
  color: string;
}

export const DIWALI_DAYS: DiwaliDay[] = [
  {
    dayNumber: 1,
    name: 'Dhanteras',
    regionalNames: ['Dhantrayodashi', 'Dhanvantari Jayanti'],
    theme: 'Health, Vitality & Auspicious Wealth',
    deity: 'Lord Dhanvantari & Goddess Lakshmi',
    significance:
      'The cosmic dawn of Diwali celebrating the divine physician Lord Dhanvantari who emerged with the nectar of immortality (Amrita).',
    ritual:
      'Purifying the home, lighting the sacred Yamadeep pointing South for protection, and welcoming auspicious metals or utensils.',
    shloka: 'ॐ नमो भगवते महासुदर्शनाय वासुदेवाय धन्वन्तरये अमृतकलशहस्ताय नमः',
    shlokaMeaning: 'Salutations to Lord Dhanvantari holding the pot of nectar, who dispels all ailments.',
    color: 'from-amber-400 to-yellow-600',
  },
  {
    dayNumber: 2,
    name: 'Choti Diwali',
    regionalNames: ['Naraka Chaturdashi', 'Roop Chaudas', 'Kali Puja'],
    theme: 'Triumph over Fear & Spiritual Cleanliness',
    deity: 'Lord Krishna, Satyabhama & Goddess Kali',
    significance:
      'Commemorates the elimination of tyrant Narakasura by Lord Krishna and Satyabhama, liberating 16,000 souls from captivity.',
    ritual:
      'Dawn fragrance bath (Abhyanga Snan) with sesame oil and herbs before sunrise to banish fatigue and negative energy.',
    shloka: 'नमो देव्यै महादेव्यै शिवायै सततं नमः। नमः प्रकृत्यै भद्रायै नियताः प्रणताः स्म ताम्॥',
    shlokaMeaning: 'Bow to the Divine Mother, the auspicious supreme energy who guides the soul.',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    dayNumber: 3,
    name: 'Lakshmi Puja',
    regionalNames: ['Deepavali', 'Badi Diwali', 'Diwali Night'],
    theme: 'The Pinnacle Festival of Celestial Light',
    deity: 'Goddess Lakshmi, Lord Ganesha & Lord Kuber',
    significance:
      'The moonless Amavasya night turns into radiant dawn as millions of golden diyas welcome Goddess Lakshmi into righteous hearts.',
    ritual:
      'Arranging illuminated diyas in every corner, drawing colorful rangolis, performing Lakshmi-Ganesha puja, and sharing sweets with neighbors.',
    shloka: 'ॐ महालक्ष्म्यै च विद्महे विष्णुपत्नी च धीमहि तन्नो लक्ष्मीः प्रचोदयात्॥',
    shlokaMeaning: 'May Goddess Lakshmi, consort of Vishnu, guide our intellect toward supreme abundance.',
    color: 'from-yellow-400 to-amber-500',
  },
  {
    dayNumber: 4,
    name: 'Govardhan Puja',
    regionalNames: ['Annakut', 'Bali Pratipada', 'Nutankatha Varsh'],
    theme: 'Gratitude to Nature, Earth & Sustenance',
    deity: 'Lord Krishna & Mount Govardhan',
    significance:
      'Lord Krishna lifted the sacred Govardhan hill with his little finger to shield innocent villagers and herds from torrential storms.',
    ritual:
      'Preparing a ceremonial "Mountain of Food" (Annakut) featuring 56 wholesome preparations in thanksgiving to nature.',
    shloka: 'गोवर्धनधरो देवः श्रीधरो धरणीधरः। रक्ष मां मन्दमतिं दीनम् अनघं सुखदायकम्॥',
    shlokaMeaning: 'O Lord who lifted Mount Govardhan, protector of the earth, grant benevolence and peace.',
    color: 'from-emerald-400 to-teal-600',
  },
  {
    dayNumber: 5,
    name: 'Bhai Dooj',
    regionalNames: ['Bhai Phonta (বাংলা)', 'Bhratri Dwitiya', 'Yama Dwitiya'],
    theme: 'Sacred Bond of Sibling Love & Protection',
    deity: 'Goddess Yamuna & Lord Yama',
    significance:
      'Goddess Yamuna warmly welcomed her brother Yama (God of Justice) with a sacred tilak and feast, declaring that siblings who celebrate this bond are blessed with longevity.',
    ritual:
      'Sisters apply vermilion and sandalwood tilak on their brothers’ foreheads with mantras for their protection, followed by heartfelt gift exchanges.',
    shloka: 'भ्रातुस्तवानुजाताहं भुङ्क्ष्व भक्तमिमं प्रभो। मया दत्तं महाभाग दीर्घायुस्त्वं सदा भव॥',
    shlokaMeaning: 'O dear brother, accept this holy blessing. May you be graced with a long, healthy and joyful life.',
    color: 'from-rose-400 to-pink-600',
  },
];

export const DiwaliFiveDays: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(3); // Default to Lakshmi Puja

  const current = DIWALI_DAYS.find((d) => d.dayNumber === activeDay) || DIWALI_DAYS[2];

  return (
    <section id="five-days" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-galaxy-gold/15 border border-galaxy-gold/30 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
            <Calendar className="w-4 h-4 text-galaxy-gold" />
            <span>Sacred Festive Calendar</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-galaxy-ivory tracking-tight mb-3">
            The Five Sacred Days of Diwali
          </h2>
          <p className="text-sm sm:text-base text-galaxy-ivory/80 leading-relaxed font-sans">
            Explore the spiritual meaning, deities, and timeless rituals behind each sacred day of the
            Pancha Parva.
          </p>
        </div>

        {/* 5 Day Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {DIWALI_DAYS.map((day) => {
            const isActive = day.dayNumber === activeDay;
            return (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => setActiveDay(day.dayNumber)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold ${
                  isActive
                    ? 'bg-gradient-to-r from-galaxy-gold to-galaxy-amber text-galaxy-midnight font-bold shadow-lg scale-105'
                    : 'glass-panel text-galaxy-ivory/80 hover:text-galaxy-gold hover:border-galaxy-gold/40'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-bold ${
                    isActive ? 'bg-galaxy-midnight text-galaxy-gold' : 'bg-white/10 text-galaxy-ivory'
                  }`}
                >
                  {day.dayNumber}
                </span>
                <span className="text-xs sm:text-sm font-serif">{day.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Day Showcase Card */}
        <div className="glass-panel-gold rounded-3xl p-6 sm:p-12 border-2 border-galaxy-gold/35 shadow-2xl relative overflow-hidden">
          {/* Top Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-galaxy-gold/20 mb-6">
            <div className="flex items-center space-x-3">
              <span className="px-3.5 py-1.5 rounded-full bg-galaxy-gold text-galaxy-midnight font-serif font-black text-xs uppercase tracking-wider">
                Day {current.dayNumber} of 5
              </span>
              <span className="text-sm text-galaxy-lavender/80 font-sans">
                {current.regionalNames.join(' ✦ ')}
              </span>
            </div>
            <div className="text-xs text-galaxy-gold font-serif italic">
              ✦ {current.deity} ✦
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="font-serif font-black text-2xl sm:text-4xl text-galaxy-ivory mb-2">
                  {current.name}
                </h3>
                <p className="text-base text-galaxy-gold font-serif italic">
                  {current.theme}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-galaxy-lavender/90 mb-1">
                  Sacred Significance
                </h4>
                <p className="text-sm sm:text-base text-galaxy-ivory/90 leading-relaxed font-sans">
                  {current.significance}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-galaxy-lavender/90 mb-1">
                  Traditional Festive Rituals
                </h4>
                <p className="text-sm sm:text-base text-galaxy-ivory/90 leading-relaxed font-sans">
                  {current.ritual}
                </p>
              </div>
            </div>

            {/* Right Shloka & Invocation Box */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-galaxy-midnight/80 border border-galaxy-gold/30 space-y-4">
              <div className="flex items-center space-x-2 text-galaxy-gold">
                <Sparkles className="w-4 h-4" />
                <span className="font-serif font-bold text-xs uppercase tracking-wider">
                  Vedic Mantra & Shloka
                </span>
              </div>

              <blockquote className="font-serif text-sm sm:text-base text-galaxy-gold italic leading-relaxed">
                “{current.shloka}”
              </blockquote>

              <div className="pt-2 border-t border-galaxy-gold/20">
                <span className="text-[10px] uppercase tracking-wider text-galaxy-lavender/60 block mb-0.5">
                  English Translation
                </span>
                <p className="text-xs text-galaxy-ivory/80 leading-relaxed font-sans">
                  {current.shlokaMeaning}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
