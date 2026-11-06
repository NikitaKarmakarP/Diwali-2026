import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   Sky Lantern SVG
───────────────────────────────────────────── */
const SkyLantern: React.FC<{ color: string; size: number; glow: string }> = ({ color, size, glow }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 60 90" fill="none" style={{ filter: `drop-shadow(0 0 8px ${glow})` }}>
    {/* Glow aura */}
    <ellipse cx="30" cy="45" rx="28" ry="38" fill={color} opacity="0.08" />
    {/* Body */}
    <path d="M10 30 Q10 70 30 72 Q50 70 50 30 Q50 10 30 10 Q10 10 10 30 Z" fill={color} opacity="0.75" />
    {/* Highlight */}
    <path d="M18 22 Q18 50 30 54 Q22 46 20 28 Z" fill="white" opacity="0.18" />
    {/* Bottom rim */}
    <ellipse cx="30" cy="70" rx="20" ry="4" fill={color} opacity="0.5" />
    {/* Flame */}
    <ellipse cx="30" cy="74" rx="5" ry="3" fill="#FFA439" opacity="0.9" />
    <path d="M30 74 Q28 68 30 65 Q32 68 30 74 Z" fill="#FFF1D0" opacity="0.9" />
    {/* String tassels */}
    <line x1="22" y1="74" x2="20" y2="84" stroke={color} strokeWidth="1" opacity="0.6" />
    <line x1="30" y1="74" x2="30" y2="86" stroke={color} strokeWidth="1" opacity="0.6" />
    <line x1="38" y1="74" x2="40" y2="84" stroke={color} strokeWidth="1" opacity="0.6" />
  </svg>
);

/* ─────────────────────────────────────────────
   Cute Ghost SVG
───────────────────────────────────────────── */
const CuteGhost: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 60 70" fill="none" style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}>
    {/* Body */}
    <path d="M10 30 Q10 10 30 10 Q50 10 50 30 L50 58 Q44 52 38 58 Q32 64 26 58 Q20 52 14 58 L10 58 Z" fill={color} opacity="0.7" />
    {/* Eyes */}
    <ellipse cx="22" cy="32" rx="4" ry="5" fill="#1a0a3a" />
    <ellipse cx="38" cy="32" rx="4" ry="5" fill="#1a0a3a" />
    {/* Eye shine */}
    <circle cx="23.5" cy="30.5" r="1.5" fill="white" opacity="0.9" />
    <circle cx="39.5" cy="30.5" r="1.5" fill="white" opacity="0.9" />
    {/* Cute smile */}
    <path d="M22 40 Q30 46 38 40" stroke="#1a0a3a" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
    {/* Blush */}
    <ellipse cx="17" cy="38" rx="4" ry="2.5" fill="#ff9eb5" opacity="0.5" />
    <ellipse cx="43" cy="38" rx="4" ry="2.5" fill="#ff9eb5" opacity="0.5" />
    {/* Little stars around */}
    <text x="2" y="18" fontSize="8" opacity="0.7">✦</text>
    <text x="50" y="22" fontSize="6" opacity="0.6">✦</text>
  </svg>
);

/* ─────────────────────────────────────────────
   Diwali Diya SVG (small)
───────────────────────────────────────────── */
const MiniDiya: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={{ filter: 'drop-shadow(0 0 5px #F7C85B88)' }}>
    <ellipse cx="30" cy="22" rx="10" ry="12" fill="#F7C85B" opacity="0.85" />
    <circle cx="30" cy="22" r="4" fill="white" opacity="0.9" />
    <path d="M10 32 Q30 48 50 32 Q44 50 30 50 Q16 50 10 32 Z" fill="#D49228" opacity="0.85" />
    <ellipse cx="30" cy="32" rx="20" ry="5" fill="#8C4A14" opacity="0.9" />
  </svg>
);

/* ─────────────────────────────────────────────
   Sparkle SVG
───────────────────────────────────────────── */
const Sparkle: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill={color} opacity="0.85" />
  </svg>
);

/* ─────────────────────────────────────────────
   Petal SVG
───────────────────────────────────────────── */
const Petal: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="8" rx="5" ry="10" fill={color} opacity="0.6" transform="rotate(0 12 12)" />
  </svg>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export const FloatingDiyas: React.FC = () => {

  // Seed all items once so they're stable across renders
  const lanterns = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 5 + (i * 8.3) % 92,
    delay: i * 1.4,
    duration: 18 + (i % 7) * 3,
    size: 32 + (i % 4) * 10,
    sway: (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 15),
    color: ['#F7C85B', '#FFA439', '#FF6BA8', '#B9B8FF', '#67E8F9', '#86EFAC', '#FCD34D'][i % 7],
    glow:  ['#F7C85B', '#FFA439', '#FF6BA8', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'][i % 7],
    startY: 110 + (i % 4) * 15, // start below screen
  })), []);

  const ghosts = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: 8 + (i * 15.5) % 85,
    delay: i * 2.2,
    duration: 14 + (i % 5) * 2,
    size: 36 + (i % 3) * 10,
    sway: (i % 2 === 0 ? 1 : -1) * (25 + i * 8),
    color: ['#c4b5fd', '#93c5fd', '#86efac', '#fde68a', '#f9a8d4', '#a5f3fc'][i % 6],
  })), []);

  const diyas = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 3 + (i * 12.7) % 95,
    y: 10 + (i * 11.3) % 85,
    delay: i * 1.8,
    duration: 6 + (i % 4),
    size: 22 + (i % 3) * 8,
  })), []);

  const sparkles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (i * 5.3) % 100,
    y: (i * 7.1) % 100,
    delay: i * 0.4,
    duration: 3 + (i % 4),
    size: 8 + (i % 3) * 6,
    color: ['#F7C85B', '#FFA439', '#FFF1D0', '#B9B8FF', '#86EFAC'][i % 5],
  })), []);

  const petals = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: (i * 7.1) % 98,
    delay: i * 1.1,
    duration: 12 + (i % 6) * 2,
    size: 10 + (i % 4) * 5,
    color: ['#FCA5A5', '#FDBA74', '#FDE68A', '#F9A8D4', '#C4B5FD'][i % 5],
    rotate: i * 25,
    sway: (i % 2 === 0 ? 1 : -1) * 30,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">

      {/* ── Sky Lanterns: drift upward, sway gently ── */}
      {lanterns.map((l) => (
        <motion.div
          key={`lantern-${l.id}`}
          className="absolute"
          style={{ left: `${l.x}%`, bottom: `-${l.size * 1.5}px`, opacity: 0.55 }}
          animate={{
            y: [0, -(window.innerHeight + l.size * 2)],
            x: [0, l.sway, 0, -l.sway * 0.5, 0],
          }}
          transition={{
            y: { duration: l.duration, repeat: Infinity, ease: 'linear', delay: l.delay },
            x: { duration: l.duration * 0.5, repeat: Infinity, ease: 'easeInOut', delay: l.delay },
          }}
        >
          <motion.div
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 4 + l.id % 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <SkyLantern color={l.color} size={l.size} glow={l.glow} />
          </motion.div>
        </motion.div>
      ))}

      {/* ── Cute Ghosts: float up with gentle wobble ── */}
      {ghosts.map((g) => (
        <motion.div
          key={`ghost-${g.id}`}
          className="absolute"
          style={{ left: `${g.x}%`, bottom: `-${g.size}px`, opacity: 0.35 }}
          animate={{
            y: [0, -(window.innerHeight + g.size * 2)],
            x: [0, g.sway, 0],
          }}
          transition={{
            y: { duration: g.duration, repeat: Infinity, ease: 'linear', delay: g.delay + 5 },
            x: { duration: g.duration * 0.6, repeat: Infinity, ease: 'easeInOut', delay: g.delay },
          }}
        >
          <motion.div
            animate={{ rotate: [-8, 8, -8], scaleX: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: g.id * 0.5 }}
          >
            <CuteGhost color={g.color} size={g.size} />
          </motion.div>
        </motion.div>
      ))}

      {/* ── Mini Diyas: float & pulse at random positions ── */}
      {diyas.map((d) => (
        <motion.div
          key={`diya-${d.id}`}
          className="absolute"
          style={{ left: `${d.x}%`, top: `${d.y}%`, opacity: 0.3 }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: d.duration, repeat: Infinity, ease: 'easeInOut', delay: d.delay }}
        >
          <MiniDiya size={d.size} />
        </motion.div>
      ))}

      {/* ── Sparkles: twinkle in & out ── */}
      {sparkles.map((s) => (
        <motion.div
          key={`sparkle-${s.id}`}
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%`, opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        >
          <Sparkle color={s.color} size={s.size} />
        </motion.div>
      ))}

      {/* ── Flower Petals: fall & spin ── */}
      {petals.map((p) => (
        <motion.div
          key={`petal-${p.id}`}
          className="absolute"
          style={{ left: `${p.x}%`, top: '-20px', opacity: 0.5 }}
          animate={{
            y: [0, window.innerHeight + 40],
            x: [0, p.sway, 0, -p.sway, 0],
            rotate: [p.rotate, p.rotate + 360],
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay },
            x: { duration: p.duration * 0.4, repeat: Infinity, ease: 'easeInOut', delay: p.delay },
            rotate: { duration: p.duration * 0.6, repeat: Infinity, ease: 'linear' },
          }}
        >
          <Petal color={p.color} size={p.size} />
        </motion.div>
      ))}

      {/* ── Soft ambient nebula corner glows ── */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-galaxy-gold/8 rounded-full filter blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-900/15 rounded-full filter blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-900/10 rounded-full filter blur-[100px]"
        animate={{ y: [0, -60, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
    </div>
  );
};
