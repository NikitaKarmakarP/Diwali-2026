import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  depth: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  maxAlpha: number;
  color: string;
}

export const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = width < 768;

    // Density based on device size
    const starCount = isMobile ? 90 : 180;
    const particleCount = isMobile ? 25 : 45;

    // Stars
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const baseAlpha = Math.random() * 0.7 + 0.2;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.6,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.7 + 0.3,
      });
    }

    // Golden dust particles drifting like festive light
    const particles: Particle[] = [];
    const colors = ['#F7C85B', '#FFA439', '#FFF1D0', '#B9B8FF'];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.6 + 0.2,
        maxAlpha: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle celestial nebula radial glow in center/top
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.25,
        width * 0.05,
        width * 0.5,
        height * 0.25,
        width * 0.75
      );
      grad.addColorStop(0, 'rgba(23, 41, 87, 0.45)');
      grad.addColorStop(0.5, 'rgba(17, 33, 77, 0.25)');
      grad.addColorStop(1, 'rgba(8, 15, 39, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (!prefersReducedMotion) {
          star.twinklePhase += star.twinkleSpeed;
          star.alpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.3;
        }

        ctx.fillStyle = `rgba(255, 241, 208, ${Math.max(0.1, Math.min(1, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra flare for larger stars
        if (star.size > 1.8 && star.alpha > 0.6) {
          ctx.strokeStyle = `rgba(247, 200, 91, ${star.alpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2, star.y);
          ctx.lineTo(star.x + star.size * 2, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2);
          ctx.lineTo(star.x, star.y + star.size * 2);
          ctx.stroke();
        }
      }

      // Render golden cosmic dust
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      tick++;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
