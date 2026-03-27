/* ── App Helper Abstraction Layer ──
   Stage 2 stubs. Stage 3 replaces implementations with real backends.
   App components call these helpers — they NEVER import backends directly. */

/**
 * Play a sound effect.
 * Stage 2: console.log
 * Stage 3: SoundManager.getInstance().play(id)
 */
export function playSound(id: string): void {
  console.log(`🔊 sound: ${id}`);
}

/**
 * Show a balloon tip notification in the System Tray.
 * Stage 2: console.log
 * Stage 3: balloonTipStore.show({ title, body, icon })
 */
export function showBalloonTip(title: string, body: string): void {
  console.log(`💬 balloon: ${title} — ${body}`);
}

/**
 * Submit form data to an endpoint.
 * Stage 2: console.log + return mock success
 * Stage 3: fetch(endpoint, { method: 'POST', body })
 */
export async function submitForm(
  endpoint: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; message: string }> {
  console.log(`📤 form: ${endpoint}`, data);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: true, message: 'Submitted successfully (stub)' };
}
