export interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  warmth: number;
}

export interface MovingBody {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  tailLength: number;
  life: number;
  maxLife: number;
  kind: 'meteor' | 'drift';
  warmth: number;
}
