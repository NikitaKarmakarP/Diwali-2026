import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { WishForm } from '../components/WishForm';
import { DiyaGarden } from '../components/DiyaGarden';
import { SkyLanternSanctuary } from '../components/SkyLanternSanctuary';
import { CosmicRangoli } from '../components/CosmicRangoli';
import { PatakaSimulator } from '../components/PatakaSimulator';
import { DiwaliFiveDays } from '../components/DiwaliFiveDays';
import { CommunityWishWall } from '../components/CommunityWishWall';
import { FireworksCelebration } from '../components/FireworksCelebration';

export const HomePage: React.FC = () => {
  const [rotateDeg, setRotateDeg] = useState(0);
  const handleRotate = () => setRotateDeg(prev => prev + 360);


    return (
    <div className="flex flex-col w-full relative z-10">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* Kali Mata Image – animated & cosmic */}
      <div className='relative flex justify-center my-8 overflow-hidden rounded-xl shadow-xl'>
        {/* subtle glowing gradient background */}
        <div className='absolute inset-0 bg-gradient-to-br from-galaxy-amber/20 via-galaxy-gold/10 to-galaxy-amber/20 opacity-40 animate-pulse-slow' />
        {/* decorative cosmic stars */}
        <div className='absolute top-2 left-2 w-4 h-4 bg-galaxy-gold rounded-full opacity-30 animate-pulse-slow' />
        <div className='absolute bottom-2 right-2 w-5 h-5 bg-galaxy-gold rounded-full opacity-30 animate-pulse-slow' />
        <div className='absolute top-1/2 left-1/2 w-3 h-3 bg-galaxy-gold rounded-full opacity-20 animate-spin-slow' style={{ transform: 'translate(-50%, -50%)' }} />
        <img
            src='https://i.pinimg.com/736x/73/a0/4c/73a04c66e9762afc04ba504cc3641df9.jpg'
            alt='Kali Mata'
            onClick={handleRotate}
            className='relative w-full max-w-2xl rounded-lg object-cover transition-transform duration-700 ease-out hover:scale-105 cursor-pointer'
            style={{ transform: `rotate(${rotateDeg}deg)` }} />


      </div>

      {/* 2. Interactive Diya Garden */}
      <DiyaGarden />

      {/* 3. Create Your Wish Studio Section */}
      <section id="create-wish" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <WishForm />
        </div>
      </section>

      {/* 4. Interactive Pataka (Firecracker) Simulator */}
      <PatakaSimulator />

      {/* 5. Sky Lantern Sanctuary */}
      <SkyLanternSanctuary />

      {/* 6. Interactive Cosmic Rangoli Creator */}
      <CosmicRangoli />

      {/* 7. The 5 Sacred Days of Diwali Guide */}
      <DiwaliFiveDays />

      {/* 8. Community Wish Wall */}
      <CommunityWishWall />

      {/* 9. Fireworks Celebration */}
      <FireworksCelebration />
    </div>
  );
};
