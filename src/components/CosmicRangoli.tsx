import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Download, Palette, Flame, CircleDot, Play, Pause, Wand2 } from 'lucide-react';

interface RangoliPoint {
  x: number;
  y: number;
  color: string;
  size: number;
  type: 'diya' | 'spark' | 'petal';
}

export const CosmicRangoli: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [points, setPoints] = useState<RangoliPoint[]>([]);
  const [currentColor, setCurrentColor] = useState<string>('#F7C85B');
  const [currentTool, setCurrentTool] = useState<'diya' | 'spark' | 'petal'>('diya');
  const [symmetry, setSymmetry] = useState<number>(8);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(true);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const colors = [
    { label: 'Diya Gold', hex: '#F7C85B' },
    { label: 'Royal Saffron', hex: '#FF9933' },
    { label: 'Lotus Rose', hex: '#FF5E7E' },
    { label: 'Peacock Teal', hex: '#00D2D3' },
    { label: 'Celestial Lavender', hex: '#B9B8FF' },
    { label: 'Warm Ivory', hex: '#FFF8E7' },
    { label: 'Crimson Ruby', hex: '#E74C3C' },
    { label: 'Emerald Mint', hex: '#2ECC71' },
  ];

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Deep cosmic radial background
    const bgGrad = ctx.createRadialGradient(centerX, centerY, 15, centerX, centerY, width / 2);
    bgGrad.addColorStop(0, '#12204D');
    bgGrad.addColorStop(0.5, '#0B1437');
    bgGrad.addColorStop(1, '#050918');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Sacred concentric cosmic guide rings
    ctx.strokeStyle = 'rgba(247, 200, 91, 0.16)';
    ctx.lineWidth = 1;
    [width * 0.15, width * 0.28, width * 0.42].forEach((radius) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Radial symmetry guide axis lines (subtle)
    ctx.strokeStyle = 'rgba(247, 200, 91, 0.08)';
    for (let i = 0; i < symmetry; i++) {
      const angle = (i * 2 * Math.PI) / symmetry;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + (width / 2) * Math.cos(angle), centerY + (height / 2) * Math.sin(angle));
      ctx.stroke();
    }

    // Sacred Central Golden Bindu Core
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.fillStyle = '#F7C85B';
    ctx.shadowColor = '#F7C85B';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFF8E7';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Render all points with symmetry
    points.forEach((p) => {
      const relX = p.x - centerX;
      const relY = p.y - centerY;
      const radius = Math.sqrt(relX * relX + relY * relY);
      const baseAngle = Math.atan2(relY, relX);

      for (let i = 0; i < symmetry; i++) {
        const angle = baseAngle + (i * 2 * Math.PI) / symmetry;
        const px = centerX + radius * Math.cos(angle);
        const py = centerY + radius * Math.sin(angle);

        ctx.save();
        ctx.translate(px, py);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;

        if (p.type === 'diya') {
          // Miniature glowing sacred diya
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Golden inner core flame
          ctx.fillStyle = '#FFF1D0';
          ctx.beginPath();
          ctx.arc(0, -p.size * 0.6, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'petal') {
          // Pointed lotus mandala petal
          ctx.fillStyle = p.color;
          ctx.rotate(angle + Math.PI / 2);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.65, p.size * 1.5, 0, 0, Math.PI * 2);
          ctx.fill();

          // Inner gold highlight
          ctx.fillStyle = '#FFF8E7';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.25, p.size * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Starlight gem sparkle
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.75, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    });
  }, [points, symmetry]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = Math.min(window.innerWidth - 32, 520);
    canvas.width = size;
    canvas.height = size;
    redraw();
  }, [redraw]);

  // Load a beautiful initial template so canvas starts illuminated
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const initialTemplate: RangoliPoint[] = [];
    const r1 = canvas.width * 0.16;
    const r2 = canvas.width * 0.28;
    const r3 = canvas.width * 0.38;

    initialTemplate.push({ x: cx + r1, y: cy, color: '#F7C85B', size: 9, type: 'diya' });
    initialTemplate.push({ x: cx + r2, y: cy, color: '#FF5E7E', size: 10, type: 'petal' });
    initialTemplate.push({ x: cx + r3, y: cy, color: '#00D2D3', size: 7, type: 'spark' });

    setPoints(initialTemplate);
  }, []);

  const addPointFromEvent = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    const newPoint: RangoliPoint = {
      x,
      y,
      color: currentColor,
      size: currentTool === 'diya' ? 8 : currentTool === 'petal' ? 9 : 5,
      type: currentTool,
    };

    setPoints((prev) => [...prev, newPoint]);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    soundEngine.playDiyaLightSound();
    addPointFromEvent(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    // Throttle slightly by distance
    addPointFromEvent(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const handlePreset = (presetName: 'lotus' | 'diya12' | 'chakra') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const pts: RangoliPoint[] = [];

    soundEngine.playCelebrationSound();

    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#FF5E7E', '#00D2D3'],
      });
    } catch {
      // ignore
    }

    if (presetName === 'lotus') {
      setSymmetry(8);
      pts.push({ x: cx + cx * 0.25, y: cy, color: '#F7C85B', size: 9, type: 'diya' });
      pts.push({ x: cx + cx * 0.45, y: cy, color: '#FF5E7E', size: 12, type: 'petal' });
      pts.push({ x: cx + cx * 0.65, y: cy + 15, color: '#FFA439', size: 10, type: 'petal' });
      pts.push({ x: cx + cx * 0.78, y: cy, color: '#FFF8E7', size: 6, type: 'spark' });
    } else if (presetName === 'diya12') {
      setSymmetry(12);
      pts.push({ x: cx + cx * 0.3, y: cy, color: '#FF9933', size: 8, type: 'diya' });
      pts.push({ x: cx + cx * 0.55, y: cy, color: '#F7C85B', size: 10, type: 'diya' });
      pts.push({ x: cx + cx * 0.75, y: cy, color: '#00D2D3', size: 7, type: 'spark' });
    } else {
      setSymmetry(6);
      pts.push({ x: cx + cx * 0.2, y: cy, color: '#B9B8FF', size: 7, type: 'spark' });
      pts.push({ x: cx + cx * 0.42, y: cy + 20, color: '#00D2D3', size: 11, type: 'petal' });
      pts.push({ x: cx + cx * 0.62, y: cy, color: '#F7C85B', size: 10, type: 'diya' });
      pts.push({ x: cx + cx * 0.8, y: cy - 20, color: '#FF5E7E', size: 6, type: 'spark' });
    }

    setPoints(pts);
  };

  const handleClear = () => {
    setPoints([]);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsExporting(true);

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'My-Sacred-Cosmic-Rangoli.png';
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 45,
        spread: 60,
        colors: ['#F7C85B', '#FFA439', '#FFF1D0', '#FF5E7E'],
      });
    } catch (e) {
      console.error('Error saving Rangoli:', e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="cosmic-rangoli" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-galaxy-amber/15 via-galaxy-gold/20 to-teal-500/10 rounded-full filter blur-[150px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-5xl mx-auto glass-panel-gold rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-galaxy-gold/35 text-center shadow-[0_20px_70px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Title */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-galaxy-gold/15 border border-galaxy-gold/30 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(247,200,91,0.2)] backdrop-blur-md">
          <Palette className="w-4 h-4 text-galaxy-gold animate-spin-slow" />
          <span>✦ Interactive Sacred Sand Art ✦</span>
        </div>

        <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4 text-galaxy-ivory">
          <span className="gold-gradient-text drop-shadow-[0_4px_24px_rgba(247,200,91,0.35)]">
            Design Your Sacred Cosmic Rangoli
          </span>
        </h2>

        <p className="text-sm sm:text-base text-galaxy-ivory/85 max-w-2xl mx-auto mb-8 font-sans leading-relaxed">
          Tap or drag across the celestial canvas. Every touch blossoms radially with divine cosmic symmetry.
          Choose sacred petals, glowing diyas, or vibrant colors, and download your blessed masterpiece!
        </p>

        {/* Quick Sacred Preset Templates Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          <span className="text-xs text-galaxy-lavender/80 font-bold uppercase tracking-wider flex items-center space-x-1 mr-1">
            <Wand2 className="w-3.5 h-3.5 text-galaxy-gold" />
            <span>Sacred Templates:</span>
          </span>
          <button
            type="button"
            onClick={() => handlePreset('lotus')}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-galaxy-gold/20 border border-galaxy-gold/30 text-galaxy-ivory hover:text-galaxy-gold text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            🌸 Sacred Lotus (अष्टदल कमल)
          </button>
          <button
            type="button"
            onClick={() => handlePreset('diya12')}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-galaxy-gold/20 border border-galaxy-gold/30 text-galaxy-ivory hover:text-galaxy-gold text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            🪔 12-Flame Deepavali Mandala
          </button>
          <button
            type="button"
            onClick={() => handlePreset('chakra')}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-galaxy-gold/20 border border-galaxy-gold/30 text-galaxy-ivory hover:text-galaxy-gold text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            ✨ Celestial Chakra Wheel
          </button>
        </div>

        {/* Tools, Palette, and Symmetry Control Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          {/* Tool Selector */}
          <div className="flex items-center space-x-1.5 p-1 rounded-2xl bg-galaxy-midnight/90 border border-galaxy-gold/30 shadow-md">
            <button
              type="button"
              onClick={() => setCurrentTool('diya')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentTool === 'diya'
                  ? 'bg-gradient-to-r from-galaxy-gold to-galaxy-amber text-galaxy-midnight shadow-md'
                  : 'text-galaxy-ivory/80 hover:text-galaxy-gold'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Diya</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentTool('petal')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentTool === 'petal'
                  ? 'bg-gradient-to-r from-galaxy-gold to-galaxy-amber text-galaxy-midnight shadow-md'
                  : 'text-galaxy-ivory/80 hover:text-galaxy-gold'
              }`}
            >
              <CircleDot className="w-3.5 h-3.5" />
              <span>Petal</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentTool('spark')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentTool === 'spark'
                  ? 'bg-gradient-to-r from-galaxy-gold to-galaxy-amber text-galaxy-midnight shadow-md'
                  : 'text-galaxy-ivory/80 hover:text-galaxy-gold'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sparkle</span>
            </button>
          </div>

          {/* Color Palette */}
          <div className="flex items-center space-x-2 p-1.5 rounded-2xl bg-galaxy-midnight/90 border border-galaxy-gold/30 shadow-md">
            {colors.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => setCurrentColor(c.hex)}
                style={{ backgroundColor: c.hex }}
                className={`w-6 h-6 rounded-full transition-transform outline-none cursor-pointer ${
                  currentColor === c.hex ? 'scale-125 ring-2 ring-white shadow-lg' : 'opacity-80 hover:opacity-100 hover:scale-110'
                }`}
                title={c.label}
                aria-label={c.label}
              />
            ))}
          </div>

          {/* Symmetry Options */}
          <div className="flex items-center space-x-1 p-1 rounded-2xl bg-galaxy-midnight/90 border border-galaxy-gold/30 text-xs shadow-md">
            <span className="px-2.5 text-galaxy-lavender/70 font-bold uppercase tracking-wider text-[11px]">Symmetry:</span>
            {[6, 8, 12].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setSymmetry(num)}
                className={`px-2.5 py-1.5 rounded-xl transition-all font-bold cursor-pointer ${
                  symmetry === num ? 'bg-galaxy-gold text-galaxy-midnight shadow-sm' : 'text-galaxy-ivory/70 hover:text-galaxy-ivory'
                }`}
              >
                {num}x
              </button>
            ))}
          </div>

          {/* Animation Spin Toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-galaxy-midnight/90 border border-galaxy-gold/30 shadow-md">
            <button
              type="button"
              onClick={() => setIsSpinning(!isSpinning)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSpinning ? 'text-galaxy-gold bg-galaxy-gold/20' : 'text-galaxy-lavender/70 hover:text-galaxy-ivory'
              }`}
              title="Toggle slow rotation animation"
            >
              {isSpinning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSpinning ? 'Spinning' : 'Static'}</span>
            </button>
          </div>
        </div>

        {/* The Sacred Celestial Canvas with Brass Halo Border */}
        <div className="flex justify-center mb-8">
          <div className="relative rounded-full p-3 sm:p-4 bg-gradient-to-tr from-galaxy-gold/40 via-galaxy-amber/25 to-galaxy-gold/40 border-2 border-galaxy-gold/60 shadow-[0_0_60px_rgba(247,200,91,0.35)]">
            {/* Outer Radiating Aura */}
            <div className="absolute inset-0 rounded-full bg-galaxy-gold/15 filter blur-xl pointer-events-none animate-pulse-slow" />

            <div className={`${isSpinning ? 'animate-spin-slow' : ''}`} style={{ animationDuration: '60s' }}>
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="rounded-full cursor-crosshair touch-none select-none max-w-full drop-shadow-2xl"
                style={{ width: '100%', maxWidth: '480px', height: 'auto', aspectRatio: '1/1' }}
                aria-label="Cosmic Rangoli design canvas. Tap or drag anywhere to place sacred elements."
              />
            </div>
          </div>
        </div>

        {/* Bottom Actions: Clear & Download */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-2xl bg-galaxy-midnight/80 hover:bg-white/10 text-galaxy-lavender hover:text-galaxy-ivory border border-white/20 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear Canvas</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting || points.length === 0}
            className="inline-flex items-center space-x-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-galaxy-gold via-galaxy-amber to-amber-500 hover:from-yellow-300 hover:to-galaxy-amber text-galaxy-midnight text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(247,200,91,0.4)] hover:shadow-[0_0_35px_rgba(247,200,91,0.6)] transition-all disabled:opacity-40 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download My Sacred Rangoli (PNG)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
