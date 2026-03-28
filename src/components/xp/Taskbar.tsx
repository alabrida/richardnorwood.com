'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWMSStore } from '@/lib/wms/WindowManager';
import styles from './Taskbar.module.css';

interface TaskbarProps {
  onStartClick: () => void;
  startMenuOpen: boolean;
  onFullscreenClick?: () => void;
}

export default function Taskbar({ onStartClick, startMenuOpen, onFullscreenClick }: TaskbarProps) {
  const windows = useWMSStore((s) => s.windows);
  const focusWindow = useWMSStore((s) => s.focusWindow);
  const minimizeWindow = useWMSStore((s) => s.minimizeWindow);
  const restoreWindow = useWMSStore((s) => s.restoreWindow);

  const [clock, setClock] = useState('');

  // ── Clock tick ──
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  // ── Task button click: toggle minimize/focus ──
  const handleTaskClick = useCallback(
    (windowId: string, isActive: boolean, windowState: string) => {
      if (isActive && windowState !== 'minimized') {
        minimizeWindow(windowId);
      } else if (windowState === 'minimized') {
        restoreWindow(windowId);
      } else {
        focusWindow(windowId);
      }
    },
    [focusWindow, minimizeWindow, restoreWindow]
  );

  return (
    <div className={styles.taskbar}>
      {/* Start Button */}
      <button
        className={`${styles.startButton} ${startMenuOpen ? styles.pressed : ''}`}
        onClick={onStartClick}
      >
        <img
          src="/icons/start-flag.png"
          alt=""
          className={styles.startLogo}
          draggable={false}
        />
        start
      </button>

      {/* Quick Launch */}
      <div className={styles.quickLaunch}>
        <button className={styles.quickIcon} title="Show Desktop">
          <img src="/icons/quick-desktop.png" alt="Show Desktop" />
        </button>
        {onFullscreenClick && (
          <button className={styles.quickIcon} title="Fullscreen Toggle" onClick={onFullscreenClick}>
            <span style={{ fontSize: '12px' }}>🔲</span>
          </button>
        )}
      </div>

      {/* Task Buttons */}
      <div className={styles.taskButtons}>
        {windows.map((w) => (
          <button
            key={w.id}
            className={`${styles.taskButton} ${w.isActive && w.state !== 'minimized' ? styles.active : ''}`}
            onClick={() => handleTaskClick(w.id, w.isActive, w.state)}
            title={w.title}
          >
            <img
              src={w.icon}
              alt=""
              className={styles.taskButtonIcon}
              draggable={false}
            />
            <span className={styles.taskButtonLabel}>{w.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className={styles.systemTray}>
        <span className={styles.clock}>{clock}</span>
      </div>
    </div>
  );
}
