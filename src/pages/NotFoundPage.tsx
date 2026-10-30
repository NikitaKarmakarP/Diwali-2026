import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] py-16 px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center justify-center text-center">
      <div className="max-w-md w-full glass-panel rounded-3xl p-8 sm:p-12 border border-galaxy-gold/30">
        <span className="font-serif font-black text-6xl text-galaxy-gold block mb-3">404</span>
        <h1 className="font-serif font-bold text-2xl text-galaxy-ivory mb-2">Lost in the Cosmos</h1>
        <p className="text-sm text-galaxy-lavender/80 mb-6 leading-relaxed">
          The starlight couldn't find the page you were looking for. Return to the festive galaxy to ignite a diya.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-galaxy-gold to-galaxy-amber text-galaxy-midnight font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};
