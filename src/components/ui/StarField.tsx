'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Types ─── */
interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  /** color temperature: 0 = cool blue-white, 1 = warm white */
  warmth: number;
}

interface MovingBody {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  tailLength: number;
  life: number;
  maxLife: number;
  /** 'meteor' = fast streak, 'drift' = slow float */
  kind: 'meteor' | 'drift';
  warmth: number;
}

/* ─── Tuning ─── */
const STAR_COUNT = 600;
const CURSOR_RADIUS = 120;
const GATHER_STRENGTH = 0.015;       // very gentle pull
const DISPERSE_STRENGTH = 0.008;     // slow return
const MAX_STAR_SIZE = 1.2;
const MIN_STAR_SIZE = 0.2;

// Moving bodies
const MAX_BODIES = 3;                 // cap simultaneous
const BODY_SPAWN_CHANCE = 0.003;      // per-frame chance (~0.3 % @ 60fps)
const METEOR_CHANCE = 0.35;           // 35 % meteor, 65 % slow drift

/* ─── Helpers ─── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function starColor(warmth: number, alpha: number): string {
  // Cool blue-white → warm white-gold
  const r = Math.round(lerp(180, 240, warmth));
  const g = Math.round(lerp(200, 232, warmth));
  const b = Math.round(lerp(255, 220, warmth));
  return `rgba(${r},${g},${b},${alpha})`;
}

function glowColor(warmth: number, alpha: number): string {
  const r = Math.round(lerp(140, 240, warmth));
  const g = Math.round(lerp(170, 200, warmth));
  const b = Math.round(lerp(255, 160, warmth));
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const bodiesRef = useRef<MovingBody[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  /* ─── Star initialisation ─── */
  const initStars = useCallback((w: number, h: number) => {
    const stars: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      // Most stars are very faint; a few are brighter
      const bright = Math.random();
      const baseOpacity = bright < 0.85
        ? 0.08 + Math.random() * 0.2       // 85 % faint
        : bright < 0.97
          ? 0.25 + Math.random() * 0.3      // 12 % moderate
          : 0.55 + Math.random() * 0.35;    // 3 % bright anchor stars
      const size = bright < 0.85
        ? MIN_STAR_SIZE + Math.random() * 0.3
        : bright < 0.97
          ? 0.4 + Math.random() * 0.4
          : 0.7 + Math.random() * (MAX_STAR_SIZE - 0.7);
      stars.push({
        x, y,
        baseX: x,
        baseY: y,
        size,
        opacity: baseOpacity,
        baseOpacity,
        twinkleSpeed: 0.3 + Math.random() * 1.5,
        twinkleOffset: Math.random() * Math.PI * 2,
        warmth: Math.random(),
      });
    }
    starsRef.current = stars;
  }, []);

  /* ─── Spawn a moving body ─── */
  const spawnBody = useCallback((w: number, h: number): MovingBody => {
    const isMeteor = Math.random() < METEOR_CHANCE;
    if (isMeteor) {
      // Fast streak — enters from an edge
      const edge = Math.random();
      let x: number, y: number, vx: number, vy: number;
      if (edge < 0.5) {
        // enter from left or right
        x = edge < 0.25 ? -10 : w + 10;
        y = Math.random() * h;
        vx = (edge < 0.25 ? 1 : -1) * (3 + Math.random() * 5);
        vy = (Math.random() - 0.5) * 2;
      } else {
        // enter from top or bottom
        x = Math.random() * w;
        y = edge < 0.75 ? -10 : h + 10;
        vx = (Math.random() - 0.5) * 2;
        vy = (edge < 0.75 ? 1 : -1) * (3 + Math.random() * 5);
      }
      return {
        x, y, vx, vy,
        size: 0.8 + Math.random() * 0.8,
        opacity: 0.3 + Math.random() * 0.35,
        tailLength: 30 + Math.random() * 60,
        life: 0,
        maxLife: 120 + Math.random() * 180,   // frames
        kind: 'meteor',
        warmth: 0.3 + Math.random() * 0.7,
      };
    } else {
      // Slow drifter — gentle float
      const x = Math.random() < 0.5 ? -10 : w + 10;
      const y = Math.random() * h;
      const direction = x < 0 ? 1 : -1;
      return {
        x, y,
        vx: direction * (0.15 + Math.random() * 0.4),
        vy: (Math.random() - 0.5) * 0.15,
        size: 0.6 + Math.random() * 0.6,
        opacity: 0.12 + Math.random() * 0.2,
        tailLength: 0,
        life: 0,
        maxLife: 600 + Math.random() * 900,
        kind: 'drift',
        warmth: Math.random(),
      };
    }
  }, []);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => { mouseRef.current.active = false; };
    const handleResize = () => {
      const dims = setCanvasSize();
      width = dims.width;
      height = dims.height;
      starsRef.current.forEach((s) => {
        s.baseX = Math.random() * width;
        s.baseY = Math.random() * height;
        s.x = s.baseX;
        s.y = s.baseY;
      });
    };

    let time = 0;

    const animate = () => {
      time += 0.016;
      const stars = starsRef.current;
      const bodies = bodiesRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);

      /* ── Stars ── */
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Gentle twinkle
        const twinkle = 0.7 + 0.3 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
        s.opacity = s.baseOpacity * twinkle;

        if (mouse.active) {
          const dx = mouse.x - s.x;
          const dy = mouse.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_RADIUS) {
            const force = (1 - dist / CURSOR_RADIUS) * GATHER_STRENGTH;
            s.x += dx * force;
            s.y += dy * force;
            // Subtle brighten near cursor
            s.opacity = Math.min(s.baseOpacity + 0.15, s.opacity + (1 - dist / CURSOR_RADIUS) * 0.12);
          } else {
            s.x += (s.baseX - s.x) * DISPERSE_STRENGTH;
            s.y += (s.baseY - s.y) * DISPERSE_STRENGTH;
          }
        } else {
          s.x += (s.baseX - s.x) * DISPERSE_STRENGTH;
          s.y += (s.baseY - s.y) * DISPERSE_STRENGTH;
        }

        // Faint glow for brighter stars only
        if (s.baseOpacity > 0.3) {
          ctx.globalAlpha = s.opacity * 0.15;
          ctx.fillStyle = glowColor(s.warmth, 1);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core dot
        ctx.globalAlpha = s.opacity;
        ctx.fillStyle = starColor(s.warmth, 1);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      /* ── Moving bodies ── */
      // Maybe spawn
      if (bodies.length < MAX_BODIES && Math.random() < BODY_SPAWN_CHANCE) {
        bodies.push(spawnBody(width, height));
      }

      for (let i = bodies.length - 1; i >= 0; i--) {
        const b = bodies[i];
        b.x += b.vx;
        b.y += b.vy;
        b.life++;

        // Fade in/out
        const fadeIn = Math.min(1, b.life / 30);
        const fadeOut = Math.max(0, 1 - (b.life - b.maxLife + 40) / 40);
        const alpha = b.opacity * fadeIn * (b.life > b.maxLife - 40 ? fadeOut : 1);

        if (b.kind === 'meteor' && b.tailLength > 0) {
          // Draw tail (streak)
          const grad = ctx.createLinearGradient(
            b.x, b.y,
            b.x - b.vx * b.tailLength * 0.3,
            b.y - b.vy * b.tailLength * 0.3,
          );
          grad.addColorStop(0, starColor(b.warmth, alpha));
          grad.addColorStop(1, starColor(b.warmth, 0));
          ctx.globalAlpha = 1;
          ctx.strokeStyle = grad;
          ctx.lineWidth = b.size * 0.6;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(
            b.x - b.vx * b.tailLength * 0.3,
            b.y - b.vy * b.tailLength * 0.3,
          );
          ctx.stroke();
        }

        // Body head
        ctx.globalAlpha = alpha;
        ctx.fillStyle = starColor(b.warmth, 1);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();

        // Tiny glow
        ctx.globalAlpha = alpha * 0.2;
        ctx.fillStyle = glowColor(b.warmth, 1);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Remove if expired or off-screen
        const margin = 50;
        if (
          b.life > b.maxLife ||
          b.x < -margin || b.x > width + margin ||
          b.y < -margin || b.y > height + margin
        ) {
          bodies.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
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
  }, [mounted, initStars, spawnBody]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="starfield-canvas"
    />
  );
}
