'use client';

import { useEffect, useRef, useState } from 'react';
import { useStarLogic } from './useStarLogic';
import { 
  CURSOR_RADIUS, GATHER_STRENGTH, DISPERSE_STRENGTH,
  MAX_BODIES, BODY_SPAWN_CHANCE, starColor, glowColor 
} from './utils';

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);
  const { starsRef, bodiesRef, initStars, spawnBody } = useStarLogic();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext('2d')) return;
    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;

    const setCanvasSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { width: w, height: h };
    };

    let { width, height } = setCanvasSize();
    initStars(width, height);

    const handleMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY, active: true }; };
    const handleMouseLeave = () => { mouseRef.current.active = false; };
    const handleResize = () => {
      const dims = setCanvasSize();
      width = dims.width; height = dims.height;
      starsRef.current.forEach((s) => {
        s.baseX = Math.random() * width; s.baseY = Math.random() * height;
        s.x = s.baseX; s.y = s.baseY;
      });
    };

    let time = 0;
    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);
      
      starsRef.current.forEach(s => {
        const twinkle = 0.7 + 0.3 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
        s.opacity = s.baseOpacity * twinkle;
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - s.x, dy = mouseRef.current.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_RADIUS) {
            const force = (1 - dist / CURSOR_RADIUS) * GATHER_STRENGTH;
            s.x += dx * force; s.y += dy * force;
            s.opacity = Math.min(s.baseOpacity + 0.15, s.opacity + (1 - dist / CURSOR_RADIUS) * 0.12);
          } else { s.x += (s.baseX - s.x) * DISPERSE_STRENGTH; s.y += (s.baseY - s.y) * DISPERSE_STRENGTH; }
        } else { s.x += (s.baseX - s.x) * DISPERSE_STRENGTH; s.y += (s.baseY - s.y) * DISPERSE_STRENGTH; }

        if (s.baseOpacity > 0.3) {
          ctx.globalAlpha = s.opacity * 0.15; ctx.fillStyle = glowColor(s.warmth, 1);
          ctx.beginPath(); ctx.arc(s.x, s.y, s.size * 2.5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = s.opacity; ctx.fillStyle = starColor(s.warmth, 1);
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
      });

      if (bodiesRef.current.length < MAX_BODIES && Math.random() < BODY_SPAWN_CHANCE) 
        bodiesRef.current.push(spawnBody(width, height));

      for (let i = bodiesRef.current.length - 1; i >= 0; i--) {
        const b = bodiesRef.current[i];
        b.x += b.vx; b.y += b.vy; b.life++;
        const fadeIn = Math.min(1, b.life / 30), fadeOut = Math.max(0, 1 - (b.life - b.maxLife + 40) / 40);
        const alpha = b.opacity * fadeIn * (b.life > b.maxLife - 40 ? fadeOut : 1);

        if (b.kind === 'meteor' && b.tailLength > 0) {
          const grad = ctx.createLinearGradient(b.x, b.y, b.x - b.vx * b.tailLength * 0.3, b.y - b.vy * b.tailLength * 0.3);
          grad.addColorStop(0, starColor(b.warmth, alpha)); grad.addColorStop(1, starColor(b.warmth, 0));
          ctx.globalAlpha = 1; ctx.strokeStyle = grad; ctx.lineWidth = b.size * 0.6; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x - b.vx * b.tailLength * 0.3, b.y - b.vy * b.tailLength * 0.3); ctx.stroke();
        }
        ctx.globalAlpha = alpha; ctx.fillStyle = starColor(b.warmth, 1);
        ctx.beginPath(); ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = alpha * 0.2; ctx.fillStyle = glowColor(b.warmth, 1);
        ctx.beginPath(); ctx.arc(b.x, b.y, b.size * 2, 0, Math.PI * 2); ctx.fill();

        if (b.life > b.maxLife || b.x < -50 || b.x > width + 50 || b.y < -50 || b.y > height + 50) 
          bodiesRef.current.splice(i, 1);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [mounted, initStars, spawnBody, starsRef, bodiesRef]);

  if (!mounted) return null;
  return <canvas ref={canvasRef} aria-hidden="true" className="starfield-canvas" />;
}
