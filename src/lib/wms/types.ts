import type { ComponentType } from 'react';

/* ── App Props ──
   Every app component receives these props from the <Window> wrapper. */
export interface AppProps {
  windowId: string;
  isActive: boolean;
  onTitleChange?: (title: string) => void;
}

/* ── App Config ──
   Stage 2 apps register one of these via registerApp(). */
export interface AppConfig {
  id: string;
  title: string;
  icon: string;             // path relative to public/ e.g. '/icons/notepad.png'
  defaultSize: { width: number; height: number };
  minSize: { width: number; height: number };
  component: ComponentType<AppProps>;
}

/* ── Window State ──
   Represents a single open window instance in the WMS. */
export interface WindowState {
  id: string;               // unique instance ID (uuid)
  appId: string;           // matches AppConfig.id
  title: string;
  icon: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize: { width: number; height: number };
  zIndex: number;
  state: 'normal' | 'minimized' | 'maximized';
  isActive: boolean;
  /** Stored pre-maximize bounds so we can restore to them */
  prevBounds?: { x: number; y: number; width: number; height: number };
}

/* ── Desktop Icon Layout ── */
export interface DesktopIconConfig {
  appId: string;
  label: string;
  icon: string;
  gridPosition: [col: number, row: number];
}

/* ── Start Menu Pin ── */
export interface StartMenuEntry {
  appId: string;
  section: 'pinned' | 'frequent' | 'system';
}
