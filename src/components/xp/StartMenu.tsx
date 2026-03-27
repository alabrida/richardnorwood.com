'use client';

import { useCallback, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useWMSStore } from '@/lib/wms/WindowManager';
import { getAllApps, getApp, startMenuEntries } from '@/lib/apps/registry';
import styles from './StartMenu.module.css';

interface StartMenuProps {
  onClose: () => void;
  userName?: string;
}

export default function StartMenu({ onClose, userName = 'Guest' }: StartMenuProps) {
  const openWindow = useWMSStore((s) => s.openWindow);
  const menuRef = useRef<HTMLDivElement>(null);

  // ── Close on click outside ──
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    // Delay to avoid catching the Start button click
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('keydown', handleKey);
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const launchApp = useCallback(
    (appId: string) => {
      const app = getApp(appId);
      if (app) {
        openWindow(app);
        onClose();
      }
    },
    [openWindow, onClose]
  );

  // Build sections from registry
  const pinnedApps = startMenuEntries
    .filter((e) => e.section === 'pinned')
    .map((e) => getApp(e.appId))
    .filter(Boolean);

  const frequentApps = startMenuEntries
    .filter((e) => e.section === 'frequent')
    .map((e) => getApp(e.appId))
    .filter(Boolean);

  const systemApps = startMenuEntries
    .filter((e) => e.section === 'system')
    .map((e) => getApp(e.appId))
    .filter(Boolean);

  const allApps = getAllApps();

  return (
    <>
      {/* Invisible overlay for click-outside */}
      <div className={styles.overlay} />

      <motion.div
        ref={menuRef}
        className={styles.startMenu}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        {/* Header — User */}
        <div className={styles.header}>
          <img
            src="/icons/user-avatar.png"
            alt=""
            className={styles.avatar}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className={styles.username}>{userName}</span>
        </div>

        {/* Body — Two Columns */}
        <div className={styles.body}>
          {/* Left Column — Programs */}
          <div className={styles.leftColumn}>
            {pinnedApps.length > 0 && (
              <>
                {pinnedApps.map((app) =>
                  app ? (
                    <button
                      key={app.id}
                      className={styles.menuItem}
                      onClick={() => launchApp(app.id)}
                    >
                      <img
                        src={app.icon}
                        alt=""
                        className={styles.menuItemIcon}
                      />
                      <span className={`${styles.menuItemLabel} ${styles.menuItemBold}`}>
                        {app.title}
                      </span>
                    </button>
                  ) : null
                )}
                <div className={styles.separator} />
              </>
            )}

            {frequentApps.length > 0 &&
              frequentApps.map((app) =>
                app ? (
                  <button
                    key={app.id}
                    className={styles.menuItem}
                    onClick={() => launchApp(app.id)}
                  >
                    <img
                      src={app.icon}
                      alt=""
                      className={styles.menuItemIcon}
                    />
                    <span className={styles.menuItemLabel}>{app.title}</span>
                  </button>
                ) : null
              )}

            <div className={styles.spacer} />
            <div className={styles.separator} />

            {/* All Programs */}
            <button className={styles.allPrograms}>
              <span className={styles.menuItemLabel}>All Programs</span>
              <span className={styles.allProgramsArrow}>▶</span>
            </button>
          </div>

          {/* Right Column — System */}
          <div className={styles.rightColumn}>
            {systemApps.map((app) =>
              app ? (
                <button
                  key={app.id}
                  className={styles.menuItem}
                  onClick={() => launchApp(app.id)}
                >
                  <img
                    src={app.icon}
                    alt=""
                    className={styles.menuItemSmIcon}
                  />
                  <span className={styles.menuItemLabel}>{app.title}</span>
                </button>
              ) : null
            )}

            {allApps.length === 0 && (
              <span
                className={`${styles.menuItem} ${styles.disabledItem}`}
              >
                No programs installed
              </span>
            )}
          </div>
        </div>

        {/* Footer — Log Off / Shut Down */}
        <div className={styles.footer}>
          <button className={styles.footerBtn} title="Log Off">
            <span>Log Off</span>
          </button>
          <button className={styles.footerBtn} title="Shut Down">
            <span>Shut Down</span>
          </button>
        </div>
      </motion.div>
    </>
  );
}
