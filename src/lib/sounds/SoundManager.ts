'use client';

/* ── SoundManager ──
   Singleton managing XP sound effects via HTMLAudioElement.
   Reads mute/volume from localStorage. Respects prefers-reduced-motion.
   Degrades silently if audio files are missing. */

const SOUND_MAP: Record<string, string> = {
  startup:        '/sounds/startup.mp3',
  error:          '/sounds/error.mp3',
  notification:   '/sounds/notification.mp3',
  click:          '/sounds/click.mp3',
  'youve-got-mail': '/sounds/youve-got-mail.mp3',
  'door-open':    '/sounds/door-open.mp3',
  'door-close':   '/sounds/door-close.mp3',
  minimize:       '/sounds/minimize.mp3',
  maximize:       '/sounds/maximize.mp3',
  shutdown:       '/sounds/shutdown.mp3',
};

const LS_MUTED_KEY = 'xp-sound-muted';
const LS_VOLUME_KEY = 'xp-sound-volume';

class SoundManager {
  private static instance: SoundManager | null = null;
  private muted: boolean;
  private volume: number;
  private prefersReducedMotion: boolean;

  private constructor() {
    // Read initial state from localStorage
    if (typeof window !== 'undefined') {
      this.muted = localStorage.getItem(LS_MUTED_KEY) === 'true';
      const storedVol = localStorage.getItem(LS_VOLUME_KEY);
      this.volume = storedVol ? parseFloat(storedVol) : 0.5;
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } else {
      this.muted = false;
      this.volume = 0.5;
      this.prefersReducedMotion = false;
    }
  }

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  play(soundId: string): void {
    if (typeof window === 'undefined') return;
    if (this.muted) return;
    if (this.prefersReducedMotion) return;

    const src = SOUND_MAP[soundId];
    if (!src) {
      console.warn(`[SoundManager] Unknown sound ID: ${soundId}`);
      return;
    }

    try {
      const audio = new Audio(src);
      audio.volume = this.volume;
      audio.play().catch(() => {
        // Silently fail — browser may block autoplay or file may be missing
      });
    } catch {
      // Graceful degradation
    }
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem(LS_MUTED_KEY, String(muted));
    }
  }

  isMuted(): boolean {
    return this.muted;
  }

  setVolume(level: number): void {
    this.volume = Math.max(0, Math.min(1, level));
    if (typeof window !== 'undefined') {
      localStorage.setItem(LS_VOLUME_KEY, String(this.volume));
    }
  }

  getVolume(): number {
    return this.volume;
  }
}

export { SoundManager };
export default SoundManager;
