'use client';

import { create } from 'zustand';
import type { WindowState, AppConfig } from './types';
import { generateWindowId, getCascadePosition } from './utils';

/* ── WMS Store ──
   Global state for all open windows. The single source of truth
   for window positions, sizes, z-index order, and active state. */

interface WMSStore {
  windows: WindowState[];
  nextZIndex: number;
  headerVisible: boolean;

  setHeaderVisible: (visible: boolean) => void;
  openWindow: (app: AppConfig, initialProps?: Partial<Pick<WindowState, 'position' | 'size'>>) => string;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  updateTitle: (id: string, title: string) => void;
  minimizeAll: () => void;
}

export const useWMSStore = create<WMSStore>((set, get) => ({
  windows: [],
  nextZIndex: 100,
  headerVisible: false,

  setHeaderVisible: (visible) => set({ headerVisible: visible }),

  openWindow: (app, initialProps) => {
    const { windows, nextZIndex } = get();
    const id = generateWindowId();
    const cascadePos = getCascadePosition(windows.length);

    let startWidth = initialProps?.size?.width ?? app.defaultSize.width;
    let startHeight = initialProps?.size?.height ?? app.defaultSize.height;
    let startX = initialProps?.position?.x ?? cascadePos.x;
    let startY = initialProps?.position?.y ?? cascadePos.y;
    let clampMinWidth = app.minSize.width;
    let clampMinHeight = app.minSize.height;

    if (typeof window !== 'undefined') {
      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight - 30; // taskbar height
      startWidth = Math.min(startWidth, maxWidth);
      startHeight = Math.min(startHeight, maxHeight);
      clampMinWidth = Math.min(clampMinWidth, maxWidth);
      clampMinHeight = Math.min(clampMinHeight, maxHeight);
      if (startX + startWidth > maxWidth) startX = Math.max(0, maxWidth - startWidth);
      if (startY + startHeight > maxHeight) startY = Math.max(0, maxHeight - startHeight);
    }

    const newWindow: WindowState = {
      id, appId: app.id, title: app.title, icon: app.icon,
      position: { x: startX, y: startY },
      size: { width: startWidth, height: startHeight },
      minSize: { width: clampMinWidth, height: clampMinHeight },
      zIndex: nextZIndex, state: 'normal', isActive: true,
    };

    set({
      windows: [...windows.map((w) => ({ ...w, isActive: false })), newWindow],
      nextZIndex: nextZIndex + 1,
    });
    return id;
  },

  closeWindow: (id) => {
    set((state) => {
      const remaining = state.windows.filter((w) => w.id !== id);
      if (remaining.length > 0) {
        const topWindow = remaining.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
        return { windows: remaining.map((w) => ({ ...w, isActive: w.id === topWindow.id })) };
      }
      return { windows: remaining };
    });
  },

  minimizeWindow: (id) => {
    set((state) => {
      const remaining = state.windows.map((w) =>
        w.id === id ? { ...w, state: 'minimized' as const, isActive: false } : w
      );
      const visible = remaining.filter((w) => w.state !== 'minimized');
      if (visible.length > 0) {
        const topVisible = visible.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
        return { windows: remaining.map((w) => ({ ...w, isActive: w.id === topVisible.id })) };
      }
      return { windows: remaining };
    });
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id
          ? {
              ...w, state: 'maximized' as const,
              prevBounds: { x: w.position.x, y: w.position.y, width: w.size.width, height: w.size.height },
              position: { x: 0, y: 0 },
              size: {
                width: typeof window !== 'undefined' ? window.innerWidth : 1024,
                height: (typeof window !== 'undefined' ? window.innerHeight : 768) - 30,
              },
            }
          : w
      ),
    }));
  },

  restoreWindow: (id) => {
    const { nextZIndex } = get();
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id !== id) return { ...w, isActive: false };
        if (w.state === 'maximized' && w.prevBounds) {
          return {
            ...w, state: 'normal' as const, position: { x: w.prevBounds.x, y: w.prevBounds.y },
            size: { width: w.prevBounds.width, height: w.prevBounds.height },
            prevBounds: undefined, isActive: true, zIndex: nextZIndex,
          };
        }
        return { ...w, state: 'normal' as const, isActive: true, zIndex: nextZIndex };
      }),
      nextZIndex: nextZIndex + 1,
    }));
  },

  focusWindow: (id) => {
    const { nextZIndex } = get();
    set((state) => ({
      windows: state.windows.map((w) => ({
        ...w, isActive: w.id === id, zIndex: w.id === id ? nextZIndex : w.zIndex,
        state: w.id === id && w.state === 'minimized' ? 'normal' as const : w.state,
      })),
      nextZIndex: nextZIndex + 1,
    }));
  },

  updatePosition: (id, position) => {
    set((state) => ({ windows: state.windows.map((w) => (w.id === id ? { ...w, position } : w)) }));
  },

  updateSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size: { width: Math.max(size.width, w.minSize.width), height: Math.max(size.height, w.minSize.height) } } : w
      ),
    }));
  },

  updateTitle: (id, title) => {
    set((state) => ({ windows: state.windows.map((w) => (w.id === id ? { ...w, title } : w)) }));
  },

  minimizeAll: () => {
    set((state) => ({ windows: state.windows.map((w) => ({ ...w, state: 'minimized' as const, isActive: false })) }));
  },
}));
