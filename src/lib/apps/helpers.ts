/* ── App Helper Abstraction Layer ──
   Stage 3: Real implementations.
   App components call these helpers — they NEVER import backends directly. */

import { SoundManager } from '@/lib/sounds/SoundManager';
import { useBalloonStore } from '@/lib/xp/balloonStore';

/**
 * Play a sound effect via the SoundManager singleton.
 */
export function playSound(id: string): void {
  if (typeof window === 'undefined') return;
  SoundManager.getInstance().play(id);
}

/**
 * Show a balloon tip notification in the System Tray.
 */
export function showBalloonTip(title: string, body: string, icon?: string): void {
  useBalloonStore.getState().show(title, body, icon);
}

/**
 * Submit form data to an endpoint via POST.
 */
export async function submitForm(
  endpoint: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { success: false, error: `Request failed: ${res.status}` };
    }

    return await res.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, error: message };
  }
}
