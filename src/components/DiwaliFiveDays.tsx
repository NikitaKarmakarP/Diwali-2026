import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Flame, Sun, Heart, Play, Pause, ChevronRight, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface DiwaliDay {
  dayNumber: number;
  name: string;
  hindiName: string;
  regionalNames: string[];
  theme: string;
  deity: string;
  significance: string;
  ritual: string;
  shloka: string;
  shlokaMeaning: string;
  colorGrad: string;
  accentColor: string;
  bgGlow: string;
  badge: string;
  symbolIcon: string;
}

export const DIWALI_DAYS: DiwaliDay[] = [
  {
    dayNumber: 1,
    name: 'Dhanteras',
    hindiName: 'धनतेरस ✦ धनत्रयोदशी',
    regionalNames: ['Dhantrayodashi', 'Dhanvantari Jayanti', 'Yamadeepdaan'],
    theme: 'Health, Immortality & Auspicious Prosperity',
    deity: 'Lord Dhanvantari & Goddess Maha Lakshmi',
    significance:
      'The cosmic dawn of Diwali celebrating Lord Dhanvantari, the divine physician of the cosmos who emerged from the Samudra Manthan carrying the golden urn filled with Amrita (nectar of eternal vitality).',
    ritual:
      'Purifying the abode, lighting the sacred Yamadeep pointing South to dispel fear of untimely death, and welcoming brass, copper, silver, or gold into the home as an auspicious symbol of lasting abundance.',
    shloka: 'ॐ नमो भगवते महासुदर्शनाय वासुदेवाय धन्वन्तरये अमृतकलशहस्ताय सर्वभयविनाशाय नमः॥',
    shlokaMeaning: 'Salutations to Lord Dhanvantari, who holds the golden pot of celestial nectar and dispels all ailments, granting radiant health and longevity.',
    colorGrad: 'from-amber-400 via-galaxy-gold to-yellow-600',
    accentColor: '#F7C85B',
    bgGlow: 'rgba(247, 200, 91, 0.25)',
    badge: 'Day 1 ✦ Cosmic Dawn',
    symbolIcon: '🪙',
  },
  {
    dayNumber: 2,
    name: 'Choti Diwali',
    hindiName: 'छोटी दिवाली ✦ नरक चतुर्दशी',
    regionalNames: ['Naraka Chaturdashi', 'Roop Chaudas', 'Kali Puja (বাংলা)', 'Bhoot Chaturdashi'],
    theme: 'Triumph over Fear, Evil & Spiritual Purification',
    deity: 'Lord Krishna, Satyabhama & Goddess Mahakali',
    significance:
      'Commemorates the vanquishing of the demon tyrant Narakasura by Lord Krishna and Goddess Satyabhama, emancipating 16,000 imprisoned souls. In Bengal, this sacred Amavasya eve is dedicated to Goddess Kali.',
    ritual:
      'The sacred dawn Abhyanga Snan bath with sesame oil and fragrant ubtan herbs before sunrise to purify body and spirit, lighting 14 diyas (Choddo Pradip) to banish all fears and negative energies.',
    shloka: 'नमो देव्यै महादेव्यै शिवायै सततं नमः। नमः प्रकृत्यै भद्रायै नियताः प्रणताः स्म ताम्॥',
    shlokaMeaning: 'Bow to the Divine Mother, the auspicious supreme primordial energy who destroys ignorance and shields every soul on the path of truth.',
    colorGrad: 'from-purple-500 via-indigo-500 to-galaxy-gold',
    accentColor: '#B9B8FF',
    bgGlow: 'rgba(185, 184, 255, 0.25)',
    badge: 'Day 2 ✦ Divine Victory',
    symbolIcon: '⚔️',
  },
  {
    dayNumber: 3,
    name: 'Lakshmi Puja',
    hindiName: 'लक्ष्मी पूजा ✦ बडी दिवाली',
    regionalNames: ['Deepavali', 'Badi Diwali', 'The Festival of Lights', 'Chopda Pujan'],
    theme: 'The Grand Pinnacle of Celestial Light & Wealth',
    deity: 'Goddess Lakshmi, Lord Ganesha & Lord Kubera',
    significance:
      'The moonless Amavasya night is transformed into a sparkling golden realm as millions of sacred diyas welcome Goddess Lakshmi into clean, pure, and loving hearts to bless homes with timeless spiritual and material wealth.',
    ritual:
      'Illuminating every doorstep with clay diyas, designing vibrant floral rangolis, performing the sacred Lakshmi-Ganesha Abhishek, opening auspicious new account books (Chopda), and sharing sweets with loved ones.',
    shloka: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः॥',
    shlokaMeaning: 'O Goddess Maha Lakshmi, seated upon the cosmic lotus of grace, bestow Thy compassionate gaze, dispelling all sorrow and filling our universe with divine light.',
    colorGrad: 'from-galaxy-gold via-galaxy-amber to-amber-500',
    accentColor: '#FFA439',
    bgGlow: 'rgba(255, 164, 57, 0.3)',
    badge: 'Day 3 ✦ Supreme Illumination',
    symbolIcon: '🪔',
  },
  {
    dayNumber: 4,
    name: 'Govardhan Puja',
    hindiName: 'गोवर्धन पूजा ✦ अन्नकूट',
    regionalNames: ['Annakut', 'Bali Pratipada', 'Nutankatha Varsh', 'Gowardhan Parvat'],
    theme: 'Gratitude to Mother Nature, Cattle & Sustenance',
    deity: 'Lord Sri Krishna & Mount Govardhan',
    significance:
      'Lord Krishna lifted the monumental Govardhan Hill upon his little finger for seven days, sheltering villagers, cattle, and forests from Indra’s torrential deluge, teaching humanity humility and reverence for nature.',
    ritual:
      'Preparing a ceremonial "Mountain of Food" (Annakut) featuring 56 traditional delicacies (Chhappan Bhog) in deep gratitude to the Earth, decorating cows with garlands, and celebrating the Gujarati New Year.',
    shloka: 'गोवर्धनधरो देवः श्रीधरो धरणीधरः। रक्ष मां मन्दमतिं दीनम् अनघं सुखदायकम्॥',
    shlokaMeaning: 'O Lord Krishna who lifted Mount Govardhan, supporter of all living beings, protect our minds and grant eternal peace, nourishment, and benevolence.',
    colorGrad: 'from-emerald-400 via-teal-500 to-galaxy-gold',
    accentColor: '#34D399',
    bgGlow: 'rgba(52, 211, 153, 0.25)',
    badge: 'Day 4 ✦ Sacred Ecology',
    symbolIcon: '🏔️',
  },
  {
    dayNumber: 5,
    name: 'Bhai Dooj',
    hindiName: 'भाई दूज ✦ यम द्वितीया',
    regionalNames: ['Bhai Phonta (বাংলা)', 'Bhratri Dwitiya', 'Bhav Bij', 'Yama Dwitiya'],
    theme: 'Sacred Bond of Sibling Love & Divine Protection',
    deity: 'Goddess Yamuna & Lord Yama (Dharmaraja)',
    significance:
      'Goddess Yamuna joyfully welcomed her brother Yama (God of Dharma) with an auspicious vermilion tilak and feast. Deeply moved, Yama proclaimed that any brother who receives a sister’s prayer on this day will be blessed with longevity and freedom from fear.',
    ritual:
      'Sisters apply the sacred tilak of sandalwood, curd, and vermilion on their brothers’ foreheads chanting holy blessings for their life, exchanging sweets, gifts, and vows of lifelong protection.',
    shloka: 'भ्रातुस्तवानुजाताहं भुङ्क्ष्व भक्तमिमं प्रभो। मया दत्तं महाभाग दीर्घायुस्त्वं सदा भव॥',
    shlokaMeaning: 'Accept this offering and auspicious blessing, dear brother. May your days be filled with happiness, long life, noble purpose, and divine grace.',
    colorGrad: 'from-rose-400 via-pink-500 to-galaxy-gold',
    accentColor: '#F472B6',
    bgGlow: 'rgba(244, 114, 182, 0.25)',
    badge: 'Day 5 ✦ Eternal Love',
    symbolIcon: '🌸',
  },
];

export const DiwaliFiveDays: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(3); // Default to Lakshmi Puja
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Auto-tour animation cycle
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveDay((prev) => (prev === 5 ? 1 : prev + 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleSelectDay = (dayNum: number) => {
    soundEngine.playDiyaLightSound();
    setActiveDay(dayNum);
  };

  const current = DIWALI_DAYS.find((d) => d.dayNumber === activeDay) || DIWALI_DAYS[2];

  return (
    <section id="five-days" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Ambient Background Aura adapted to the Active Day */}
      <motion.div
        animate={{
          background: `radial-gradient(ellipse at 50% 40%, ${current.bgGlow} 0%, rgba(8, 15, 39, 0) 70%)`,
        }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none -z-10"
      />

      {/* Floating Animated Golden Embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{ y: [-20, -120], opacity: [0, 0.7, 0], x: [0, 15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeOut' }}
          className="absolute bottom-20 left-[15%] w-2.5 h-2.5 rounded-full bg-galaxy-gold blur-[1px]"
        />
        <motion.div
          animate={{ y: [-10, -140], opacity: [0, 0.8, 0], x: [0, -20] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeOut', delay: 2 }}
          className="absolute bottom-24 right-[20%] w-2 h-2 rounded-full bg-galaxy-amber blur-[1px]"
        />
        <motion.div
          animate={{ y: [-15, -100], opacity: [0, 0.6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeOut', delay: 3.5 }}
          className="absolute bottom-32 left-[50%] w-1.5 h-1.5 rounded-full bg-yellow-200 blur-[0.5px]"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 relative">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-galaxy-gold/15 border border-galaxy-gold/30 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(247,200,91,0.2)] backdrop-blur-md"
          >
            <Calendar className="w-4 h-4 text-galaxy-gold animate-pulse" />
            <span>Pancha Parva ✦ The 5 Sacred Days</span>
          </motion.div>

          <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4 text-galaxy-ivory">
            <span className="gold-gradient-text drop-shadow-[0_4px_24px_rgba(247,200,91,0.35)]">
              The Five Sacred Days of Diwali
            </span>
          </h2>

          <p className="text-base sm:text-lg text-galaxy-ivory/85 leading-relaxed font-sans max-w-2xl mx-auto mb-6">
            From the dawn of Dhanteras to the eternal devotion of Bhai Dooj, journey through the sacred
            shlokas, deities, and timeless spiritual rituals that form the heart of Diwali.
          </p>

          {/* Auto-Tour Animation Toggle */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-galaxy-midnight/80 border border-galaxy-gold/30 text-xs text-galaxy-ivory">
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-galaxy-gold/20 hover:bg-galaxy-gold/30 text-galaxy-gold font-medium transition-all"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Auto-Tour</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Auto-Tour Days</span>
                </>
              )}
            </button>
            <span className="text-galaxy-lavender/60 text-[11px] hidden sm:inline">
              {isAutoPlaying ? '✦ Gracefully cycling through all 5 days' : 'Click to automatically animate through the 5 days'}
            </span>
          </div>
        </div>

        {/* 5-Day Visual Timeline Stepper / Tabs */}
        <div className="relative mb-12">
          {/* Subtle Connecting Golden Progress Line */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-galaxy-gold/20 via-galaxy-gold/50 to-galaxy-gold/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 relative z-10">
            {DIWALI_DAYS.map((day) => {
              const isActive = day.dayNumber === activeDay;
              return (
                <motion.button
                  key={day.dayNumber}
                  type="button"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectDay(day.dayNumber)}
                  className={`relative group rounded-2xl p-4 text-center transition-all duration-400 outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold flex flex-col items-center justify-between min-h-[110px] cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-b from-galaxy-royal/90 to-galaxy-midnight border-2 shadow-[0_0_30px_rgba(247,200,91,0.5)] scale-105'
                      : 'glass-panel border border-white/10 hover:border-galaxy-gold/50 hover:shadow-[0_0_20px_rgba(247,200,91,0.2)]'
                  }`}
                  style={{
                    borderColor: isActive ? day.accentColor : undefined,
                  }}
                >
                  {/* Top Badge: Number + Icon with gentle float */}
                  <div className="flex items-center space-x-1.5 mb-1.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-galaxy-gold to-galaxy-amber text-galaxy-midnight shadow-md'
                          : 'bg-white/10 text-galaxy-ivory group-hover:bg-galaxy-gold/20 group-hover:text-galaxy-gold'
                      }`}
                    >
                      {day.dayNumber}
                    </span>
                    <motion.span
                      animate={isActive ? { scale: [1, 1.25, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-lg"
                    >
                      {day.symbolIcon}
                    </motion.span>
                  </div>

                  {/* Day Name */}
                  <h3
                    className={`font-serif font-bold text-sm sm:text-base leading-tight transition-colors ${
                      isActive ? 'text-galaxy-gold' : 'text-galaxy-ivory group-hover:text-galaxy-gold'
                    }`}
                  >
                    {day.name}
                  </h3>

                  {/* Subtitle / Day Theme */}
                  <span className="text-[10px] text-galaxy-lavender/70 font-sans line-clamp-1 mt-0.5">
                    Day {day.dayNumber}
                  </span>

                  {/* Active glowing indicator light */}
                  {isActive && (
                    <motion.div
                      layoutId="activeDayGlow"
                      className="absolute -bottom-1.5 w-8 h-1 rounded-full bg-galaxy-gold shadow-[0_0_12px_#F7C85B]"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active Day Showcase Feature Card with Rich Animated Entrance */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.dayNumber}
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -22, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel-gold rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-galaxy-gold/40 shadow-[0_25px_70px_rgba(0,0,0,0.6)] relative overflow-hidden"
          >
            {/* Pulsing Aura Ring around Card */}
            <div
              className="absolute -inset-1 rounded-3xl opacity-20 filter blur-xl pointer-events-none animate-pulse-slow -z-10"
              style={{ backgroundColor: current.accentColor }}
            />

            {/* Sacred Rotating Mandala Watermark in Background */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 opacity-10 pointer-events-none select-none">
              <svg viewBox="0 0 200 200" className="w-full h-full text-galaxy-gold animate-spin-slow" fill="currentColor">
                <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <path
                    key={i}
                    d="M100 20 C108 55 115 75 100 100 C85 75 92 55 100 20 Z"
                    transform={`rotate(${i * 45} 100 100)`}
                  />
                ))}
              </svg>
            </div>

            {/* Top Bar: Day Number, Sanskrit Name, Deities */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-galaxy-gold/20 mb-8 relative z-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-galaxy-gold to-galaxy-amber text-galaxy-midnight font-serif font-black text-xs uppercase tracking-wider shadow-md">
                  {current.badge}
                </span>
                <span className="text-sm sm:text-base font-serif text-galaxy-gold font-semibold">
                  {current.hindiName}
                </span>
              </div>

              <div className="inline-flex items-center space-x-2 text-xs sm:text-sm text-galaxy-ivory/90 font-serif bg-galaxy-midnight/80 px-4 py-1.5 rounded-full border border-galaxy-gold/40 shadow-sm">
                <Flame className="w-3.5 h-3.5 text-galaxy-amber animate-pulse" />
                <span>Presiding Deity: <strong className="text-galaxy-gold">{current.deity}</strong></span>
              </div>
            </div>

            {/* Card Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative z-10">
              {/* Left Column: Title, Significance, Rituals, Regional Traditions */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-4xl animate-bounce" style={{ animationDuration: '3s' }}>
                      {current.symbolIcon}
                    </span>
                    <h3 className="font-serif font-black text-3xl sm:text-4xl text-galaxy-ivory tracking-tight">
                      {current.name}
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-galaxy-gold font-serif italic">
                    ✦ {current.theme}
                  </p>
                </div>

                {/* Regional Names Badge List */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-galaxy-lavender/70 font-semibold uppercase tracking-wider">
                    Known As:
                  </span>
                  {current.regionalNames.map((rn, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-galaxy-midnight/80 border border-galaxy-gold/30 text-xs text-galaxy-ivory/90 font-medium"
                    >
                      {rn}
                    </span>
                  ))}
                </div>

                {/* Significance Section with Animated Hover Sheen */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-5 rounded-2xl bg-galaxy-midnight/70 border border-galaxy-gold/25 shadow-lg relative overflow-hidden"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-galaxy-gold flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-galaxy-gold animate-spin-slow" />
                    <span>Sacred Spiritual Significance</span>
                  </h4>
                  <p className="text-sm sm:text-base text-galaxy-ivory/90 leading-relaxed font-sans">
                    {current.significance}
                  </p>
                </motion.div>

                {/* Traditional Rituals Section */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-5 rounded-2xl bg-galaxy-midnight/70 border border-galaxy-gold/25 shadow-lg relative overflow-hidden"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-galaxy-amber flex items-center space-x-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-galaxy-amber" />
                    <span>Auspicious Customs & Rituals</span>
                  </h4>
                  <p className="text-sm sm:text-base text-galaxy-ivory/90 leading-relaxed font-sans">
                    {current.ritual}
                  </p>
                </motion.div>
              </div>

              {/* Right Column: Sacred Vedic Shloka Parchment Box with Divine Glow */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0F1B3E]/95 to-[#070D22]/98 border-2 border-galaxy-gold/45 shadow-2xl relative">
                {/* Luminous Inner Glow Aura */}
                <div className="absolute inset-0 rounded-3xl bg-galaxy-gold/10 pointer-events-none animate-pulse-slow" />

                <div className="flex items-center space-x-2.5 text-galaxy-gold mb-5 pb-3 border-b border-galaxy-gold/30 relative z-10">
                  <Sparkles className="w-4 h-4 text-galaxy-gold animate-spin-slow" />
                  <span className="font-serif font-black text-xs uppercase tracking-wider">
                    Sacred Vedic Shloka & Invocation
                  </span>
                </div>

                {/* Sanskrit Shloka with Golden Calligraphic Styling */}
                <div className="p-5 rounded-2xl bg-galaxy-midnight/90 border border-galaxy-gold/40 mb-5 shadow-inner relative z-10">
                  <blockquote className="font-serif text-base sm:text-lg text-galaxy-gold leading-relaxed text-center font-bold drop-shadow-[0_2px_8px_rgba(247,200,91,0.35)]">
                    “{current.shloka}”
                  </blockquote>
                </div>

                {/* English Spiritual Meaning */}
                <div className="space-y-1.5 relative z-10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-galaxy-lavender/70 block">
                    Divine Meaning & Translation
                  </span>
                  <p className="text-xs sm:text-sm text-galaxy-ivory/85 leading-relaxed font-sans italic">
                    {current.shlokaMeaning}
                  </p>
                </div>

                {/* Next Day Navigation Button */}
                <div className="mt-6 pt-4 border-t border-galaxy-gold/25 flex items-center justify-between relative z-10">
                  <span className="text-xs text-galaxy-lavender/60">
                    Day {current.dayNumber} of 5
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSelectDay(current.dayNumber === 5 ? 1 : current.dayNumber + 1)}
                    className="inline-flex items-center space-x-1.5 text-xs text-galaxy-gold hover:text-yellow-300 font-semibold transition-colors cursor-pointer"
                  >
                    <span>{current.dayNumber === 5 ? 'Back to Dhanteras' : 'Next Sacred Day'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
