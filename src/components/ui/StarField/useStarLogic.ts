import { useRef, useCallback } from 'react';
import { Star, MovingBody } from './types';
import { 
  STAR_COUNT, MIN_STAR_SIZE, MAX_STAR_SIZE, 
  METEOR_CHANCE, MIN_ADAPTIVE_STAR_COUNT, STAR_DENSITY_DIVISOR,
} from './utils';

export function useStarLogic() {
  const starsRef = useRef<Star[]>([]);
  const bodiesRef = useRef<MovingBody[]>([]);

  const initStars = useCallback((w: number, h: number) => {
    const stars: Star[] = [];
    const adaptiveStarCount = Math.min(
      STAR_COUNT,
      Math.max(MIN_ADAPTIVE_STAR_COUNT, Math.round((w * h) / STAR_DENSITY_DIVISOR)),
    );
    for (let i = 0; i < adaptiveStarCount; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const bright = Math.random();
      const baseOpacity = bright < 0.85
        ? 0.08 + Math.random() * 0.2
        : bright < 0.97
          ? 0.25 + Math.random() * 0.3
          : 0.55 + Math.random() * 0.35;
      const size = bright < 0.85
        ? MIN_STAR_SIZE + Math.random() * 0.3
        : bright < 0.97
          ? 0.4 + Math.random() * 0.4
          : 0.7 + Math.random() * (MAX_STAR_SIZE - 0.7);
      stars.push({
        x, y, baseX: x, baseY: y, size,
        opacity: baseOpacity, baseOpacity,
        twinkleSpeed: 0.3 + Math.random() * 1.5,
        twinkleOffset: Math.random() * Math.PI * 2,
        warmth: Math.random(),
      });
    }
    starsRef.current = stars;
  }, []);

  const spawnBody = useCallback((w: number, h: number): MovingBody => {
    const isMeteor = Math.random() < METEOR_CHANCE;
    if (isMeteor) {
      const edge = Math.random();
      let x: number, y: number, vx: number, vy: number;
      if (edge < 0.5) {
        x = edge < 0.25 ? -10 : w + 10;
        y = Math.random() * h;
        vx = (edge < 0.25 ? 1 : -1) * (3 + Math.random() * 5);
        vy = (Math.random() - 0.5) * 2;
      } else {
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
        life: 0, maxLife: 120 + Math.random() * 180,
        kind: 'meteor', warmth: 0.3 + Math.random() * 0.7,
      };
    } else {
      const x = Math.random() < 0.5 ? -10 : w + 10;
      const y = Math.random() * h;
      const direction = x < 0 ? 1 : -1;
      return {
        x, y,
        vx: direction * (0.15 + Math.random() * 0.4),
        vy: (Math.random() - 0.5) * 0.15,
        size: 0.6 + Math.random() * 0.6,
        opacity: 0.12 + Math.random() * 0.2,
        tailLength: 0, life: 0, maxLife: 600 + Math.random() * 900,
        kind: 'drift', warmth: Math.random(),
      };
    }
  }, []);

  return { starsRef, bodiesRef, initStars, spawnBody };
}
