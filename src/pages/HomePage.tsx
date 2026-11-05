import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { DeityGallery } from '../components/DeityGallery';
import { WishForm } from '../components/WishForm';
import { DiyaGarden } from '../components/DiyaGarden';
import { SkyLanternSanctuary } from '../components/SkyLanternSanctuary';
import { CosmicRangoli } from '../components/CosmicRangoli';
import { PatakaSimulator } from '../components/PatakaSimulator';
import { DiwaliFiveDays } from '../components/DiwaliFiveDays';
import { NikitaSpecialGreeting } from '../components/NikitaSpecialGreeting';
import { CommunityWishWall } from '../components/CommunityWishWall';
import { FireworksCelebration } from '../components/FireworksCelebration';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full relative z-10">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* Divine Gallery */}
      <DeityGallery />

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

      {/* Special Festive Greeting from Nikita */}
      <NikitaSpecialGreeting />

      {/* 8. Community Wish Wall */}
      <CommunityWishWall />

      {/* 9. Fireworks Celebration */}
      <FireworksCelebration />
    </div>
  );
};
