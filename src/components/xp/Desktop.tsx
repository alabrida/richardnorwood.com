'use client';

import { useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { useWMSStore } from '@/lib/wms/WindowManager';
import { desktopIcons, getApp } from '@/lib/apps/registry';
import Window from './Window';
import { useIsMobile } from '@/hooks/useIsMobile';
import styles from './Desktop.module.css';

export default function Desktop() {
  const windows = useWMSStore((s) => s.windows);
  const openWindow = useWMSStore((s) => s.openWindow);

  const handleIconDoubleClick = useCallback(
    (appId: string) => {
      const app = getApp(appId);
      if (app) {
        openWindow(app);
      }
    },
    [openWindow]
  );

  const isMobile = useIsMobile();

  return (
    <div className={styles.desktop}>
      {/* Wallpaper */}
      <div className={styles.wallpaper} />

      {/* Desktop Icons */}
      <div className={styles.iconGrid}>
        {desktopIcons.map((icon) => (
          <button
            key={icon.appId}
            className={styles.desktopIcon}
            onClick={() => isMobile && handleIconDoubleClick(icon.appId)}
            onDoubleClick={() => !isMobile && handleIconDoubleClick(icon.appId)}
            title={icon.label}
          >
            <img
              src={icon.icon}
              alt={icon.label}
              className={styles.iconImage}
              draggable={false}
            />
            <span className={styles.iconLabel}>{icon.label}</span>
          </button>
        ))}
      </div>

      {/* Windows */}
      <div className={styles.windowsLayer}>
        <AnimatePresence>
          {windows
            .filter((w) => w.state !== 'minimized')
            .map((w) => (
              <Window key={w.id} windowState={w} />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
