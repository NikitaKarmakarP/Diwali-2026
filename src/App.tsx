import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GalaxyBackground } from './components/GalaxyBackground';
import { FloatingDiyas } from './components/FloatingDiyas';
import { HomePage } from './pages/HomePage';
import { CreatePage } from './pages/CreatePage';
import { WishPage } from './pages/WishPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { soundEngine } from './utils/soundEffects';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const handleToggleMute = () => {
    const updated = soundEngine.toggleMute();
    setIsMuted(updated);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen flex flex-col bg-galaxy-midnight text-galaxy-ivory overflow-x-hidden selection:bg-galaxy-gold selection:text-galaxy-midnight">
        {/* Ambient Canvas Galaxy & Particle Field */}
        <GalaxyBackground />

        {/* Floating Background Diyas */}
        <FloatingDiyas />

        {/* Global Navigation Bar */}
        <Navbar isMuted={isMuted} onToggleMute={handleToggleMute} />

        {/* Application Page Routes */}
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/wish" element={<WishPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
