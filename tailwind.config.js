/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        galaxy: {
          midnight: '#080F27',
          deep: '#0B1437',
          nebula: '#172957',
          royal: '#11214D',
          border: 'rgba(247, 200, 91, 0.25)',
          gold: '#F7C85B',
          amber: '#FFA439',
          ivory: '#FFF1D0',
          lavender: '#B9B8FF',
          crimson: '#D9383A',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Outfit', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'diya-glow': '0 0 25px rgba(247, 200, 91, 0.55), 0 0 50px rgba(255, 164, 57, 0.3)',
        'diya-glow-lg': '0 0 40px rgba(247, 200, 91, 0.75), 0 0 80px rgba(255, 164, 57, 0.45)',
        'cosmic-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45), inset 0 0 0 1px rgba(247, 200, 91, 0.2)',
        'gold-border': '0 0 15px rgba(247, 200, 91, 0.35)',
      },
      animation: {
        'flicker': 'flicker 2.5s ease-in-out infinite alternate',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'spin-slow': 'spin 40s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.95' },
          '25%': { transform: 'scale(1.05, 0.95) rotate(1deg)', opacity: '1' },
          '50%': { transform: 'scale(0.96, 1.04) rotate(-0.5deg)', opacity: '0.9' },
          '75%': { transform: 'scale(1.02, 0.98) rotate(1.5deg)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.08)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
