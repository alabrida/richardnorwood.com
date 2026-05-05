export const STAR_COUNT = 600;
export const MIN_ADAPTIVE_STAR_COUNT = 180;
export const STAR_DENSITY_DIVISOR = 2500;
export const MAX_CANVAS_DPR = 1.5;
export const CURSOR_RADIUS = 120;
export const GATHER_STRENGTH = 0.015;
export const DISPERSE_STRENGTH = 0.008;
export const MAX_STAR_SIZE = 1.2;
export const MIN_STAR_SIZE = 0.2;

export const MAX_BODIES = 3;
export const BODY_SPAWN_CHANCE = 0.003;
export const METEOR_CHANCE = 0.35;

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function starColor(warmth: number, alpha: number): string {
  const r = Math.round(lerp(180, 240, warmth));
  const g = Math.round(lerp(200, 232, warmth));
  const b = Math.round(lerp(255, 220, warmth));
  return `rgba(${r},${g},${b},${alpha})`;
}

export function glowColor(warmth: number, alpha: number): string {
  const r = Math.round(lerp(140, 240, warmth));
  const g = Math.round(lerp(170, 200, warmth));
  const b = Math.round(lerp(255, 160, warmth));
  return `rgba(${r},${g},${b},${alpha})`;
}
