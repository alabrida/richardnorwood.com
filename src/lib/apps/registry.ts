import type { AppConfig, DesktopIconConfig, StartMenuEntry } from '@/lib/wms/types';

/* ── App Registry ──
   Central map of all registered apps. Stage 2 populates this
   by calling registerApp() for each retro app.

   The Desktop, Start Menu, and Taskbar all read from here. */

const appRegistry = new Map<string, AppConfig>();

export function registerApp(config: AppConfig): void {
  appRegistry.set(config.id, config);
}

export function getApp(id: string): AppConfig | undefined {
  return appRegistry.get(id);
}

export function getAllApps(): AppConfig[] {
  return Array.from(appRegistry.values());
}

/* ── Desktop Icon Layout ──
   Defines which apps appear as desktop icons and where.
   Stage 2 populates this after registering all apps. */

export const desktopIcons: DesktopIconConfig[] = [
  // Stage 2 will push entries here via addDesktopIcon()
];

export function addDesktopIcon(icon: DesktopIconConfig): void {
  desktopIcons.push(icon);
}

/* ── Start Menu Configuration ──
   Defines pinned programs, frequent programs, and system entries. */

export const startMenuEntries: StartMenuEntry[] = [
  // Stage 2 populates via addStartMenuEntry()
];

export function addStartMenuEntry(entry: StartMenuEntry): void {
  startMenuEntries.push(entry);
}

export { appRegistry };
