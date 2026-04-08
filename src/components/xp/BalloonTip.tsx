'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useBalloonStore } from '@/lib/xp/balloonStore';
import styles from './BalloonTip.module.css';

export default function BalloonTip() {
  const tips = useBalloonStore((s) => s.tips);
  const dismiss = useBalloonStore((s) => s.dismiss);

  // Only show the most recent tip (XP shows one at a time)
  const currentTip = tips[tips.length - 1] ?? null;

  // Dismiss on Escape key
  useEffect(() => {
    if (!currentTip) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss(currentTip.id);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentTip, dismiss]);

  return (
    <AnimatePresence>
      {currentTip && (
        <motion.div
          key={currentTip.id}
          className={styles.balloon}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={() => dismiss(currentTip.id)}
          role="status"
          aria-live="polite"
        >
          <div className={styles.pointer} />
          <button
            className={styles.closeBtn}
            onClick={(e) => {
              e.stopPropagation();
              dismiss(currentTip.id);
            }}
            aria-label="Dismiss notification"
          >
            ✕
          </button>
          <div className={styles.content}>
            <div className={styles.icon}>
              {currentTip.icon || 'ℹ️'}
            </div>
            <div className={styles.text}>
              <div className={styles.title}>{currentTip.title}</div>
              <div className={styles.body}>{currentTip.body}</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
