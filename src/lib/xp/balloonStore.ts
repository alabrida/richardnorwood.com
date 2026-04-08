'use client';

/* ── Balloon Tip Store ──
   Zustand store managing XP-style notification balloons
   anchored to the System Tray. Queues multiple tips. */

import { create } from 'zustand';

export interface BalloonTip {
  id: string;
  title: string;
  body: string;
  icon?: string;
  createdAt: number;
}

interface BalloonStore {
  tips: BalloonTip[];
  show: (title: string, body: string, icon?: string) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

let tipCounter = 0;

export const useBalloonStore = create<BalloonStore>((set) => ({
  tips: [],

  show: (title, body, icon) => {
    tipCounter += 1;
    const tip: BalloonTip = {
      id: `balloon-${Date.now()}-${tipCounter}`,
      title,
      body,
      icon,
      createdAt: Date.now(),
    };
    set((state) => ({ tips: [...state.tips, tip] }));

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      set((state) => ({
        tips: state.tips.filter((t) => t.id !== tip.id),
      }));
    }, 5000);
  },

  dismiss: (id) => {
    set((state) => ({
      tips: state.tips.filter((t) => t.id !== id),
    }));
  },

  dismissAll: () => {
    set({ tips: [] });
  },
}));
