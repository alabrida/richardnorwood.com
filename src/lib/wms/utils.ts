let instanceCounter = 0;

export function generateWindowId(): string {
  instanceCounter += 1;
  return `win-${Date.now()}-${instanceCounter}`;
}

/** Cascade offset for new windows so they don't stack perfectly */
export function getCascadePosition(index: number): { x: number; y: number } {
  const offset = (index % 8) * 30;
  return { x: 50 + offset, y: 50 + offset };
}
