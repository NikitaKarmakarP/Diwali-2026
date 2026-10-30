import React, { useRef, useState, useEffect, useCallback } from 'react';
import { soundEngine } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Download, Palette, Flame, CircleDot } from 'lucide-react';

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

  const colors = [
    { label: 'Diya Gold', hex: '#F7C85B' },
    { label: 'Amber Orange', hex: '#FFA439' },
    { label: 'Crimson Ruby', hex: '#E74C3C' },
    { label: 'Celestial Lavender', hex: '#B9B8FF' },
    { label: 'Warm Ivory', hex: '#FFF1D0' },
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

    // Deep cosmic background
    const bgGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, width / 2);
    bgGrad.addColorStop(0, '#101B3F');
    bgGrad.addColorStop(0.7, '#0B122C');
    bgGrad.addColorStop(1, '#070C1E');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle guide rings
    ctx.strokeStyle = 'rgba(247, 200, 91, 0.12)';
    ctx.lineWidth = 1;
    [width * 0.15, width * 0.28, width * 0.4].forEach((radius) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Draw central lotus icon
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.fillStyle = '#F7C85B';
    ctx.shadowColor = '#F7C85B';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, Math.PI * 2);
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
        ctx.shadowBlur = 10;

        if (p.type === 'diya') {
          // Miniature glowing diya flame
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Tiny flame top
          ctx.fillStyle = '#FFF1D0';
          ctx.beginPath();
          ctx.arc(0, -p.size * 0.6, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'petal') {
          // Elliptical mandala petal
          ctx.fillStyle = p.color;
          ctx.rotate(angle + Math.PI / 2);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.6, p.size * 1.4, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Starlight gem
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    });
  }, [points, symmetry]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = Math.min(window.innerWidth - 32, 540);
    canvas.width = size;
    canvas.height = size;
    redraw();
  }, [redraw]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    soundEngine.playDiyaLightSound();

    const newPoint: RangoliPoint = {
      x,
      y,
      color: currentColor,
      size: currentTool === 'diya' ? 7 : currentTool === 'petal' ? 8 : 4.5,
      type: currentTool,
    };

    setPoints((prev) => [...prev, newPoint]);
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
      link.download = 'My-Diwali-Cosmic-Rangoli.png';
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 35,
        spread: 60,
        colors: ['#F7C85B', '#FFA439', '#FFF1D0'],
      });
    } catch (e) {
      console.error('Error saving Rangoli:', e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="cosmic-rangoli" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-galaxy-gold/30 text-center">
        {/* Title */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-galaxy-gold/15 border border-galaxy-gold/30 text-galaxy-gold text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
          <Palette className="w-4 h-4 text-galaxy-gold" />
          <span>Interactive Cosmic Sand Art</span>
        </div>
        <h2 className="font-serif font-black text-2xl sm:text-4xl text-galaxy-ivory mb-2">
          Design Your Sacred Cosmic Rangoli
        </h2>
        <p className="text-xs sm:text-sm text-galaxy-lavender/80 max-w-lg mx-auto mb-6">
          Tap anywhere on the sacred celestial canvas. Each glowing diya or petal radiates radially with
          divine 8-fold harmony. Download and share your blessed artwork!
        </p>

        {/* Tools and Color Palette Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
          {/* Tool Selector */}
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-galaxy-midnight/80 border border-galaxy-gold/20">
            <button
              type="button"
              onClick={() => setCurrentTool('diya')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTool === 'diya'
                  ? 'bg-galaxy-gold text-galaxy-midnight'
                  : 'text-galaxy-ivory/80 hover:text-galaxy-gold'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Diya</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentTool('petal')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTool === 'petal'
                  ? 'bg-galaxy-gold text-galaxy-midnight'
                  : 'text-galaxy-ivory/80 hover:text-galaxy-gold'
              }`}
            >
              <CircleDot className="w-3.5 h-3.5" />
              <span>Petal</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentTool('spark')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTool === 'spark'
                  ? 'bg-galaxy-gold text-galaxy-midnight'
                  : 'text-galaxy-ivory/80 hover:text-galaxy-gold'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sparkle</span>
            </button>
          </div>

          {/* Color Palette */}
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-galaxy-midnight/80 border border-galaxy-gold/20">
            {colors.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => setCurrentColor(c.hex)}
                style={{ backgroundColor: c.hex }}
                className={`w-6 h-6 rounded-full transition-transform outline-none ${
                  currentColor === c.hex ? 'scale-125 ring-2 ring-white shadow-md' : 'opacity-80 hover:opacity-100'
                }`}
                title={c.label}
                aria-label={c.label}
              />
            ))}
          </div>

          {/* Symmetry Options */}
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-galaxy-midnight/80 border border-galaxy-gold/20 text-xs">
            <span className="px-2 text-galaxy-lavender/70">Symmetry:</span>
            {[6, 8, 12].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setSymmetry(num)}
                className={`px-2 py-1 rounded-md transition-colors font-medium ${
                  symmetry === num ? 'bg-galaxy-gold/20 text-galaxy-gold' : 'text-galaxy-ivory/60 hover:text-galaxy-ivory'
                }`}
              >
                {num}x
              </button>
            ))}
          </div>
        </div>

        {/* The Interactive Canvas */}
        <div className="flex justify-center mb-6">
          <div className="relative rounded-full p-2 bg-gradient-to-tr from-galaxy-gold/30 via-galaxy-amber/20 to-transparent border border-galaxy-gold/40 shadow-[0_0_40px_rgba(247,200,91,0.2)]">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="rounded-full cursor-crosshair touch-none select-none max-w-full"
              style={{ width: '100%', maxWidth: '500px', height: 'auto', aspectRatio: '1/1' }}
              aria-label="Cosmic Rangoli design canvas. Tap anywhere to place sacred elements."
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-3">
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-galaxy-midnight/80 hover:bg-white/10 text-galaxy-lavender border border-white/20 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Canvas</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting || points.length === 0}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-galaxy-gold to-galaxy-amber text-galaxy-midnight text-xs sm:text-sm font-bold shadow-md hover:brightness-105 transition-all disabled:opacity-40"
          >
            <Download className="w-4 h-4" />
            <span>Download My Rangoli (PNG)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
