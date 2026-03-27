'use client';

import { useRef, useCallback, useEffect, createElement } from 'react';
import { motion } from 'motion/react';
import { useWMSStore } from '@/lib/wms/WindowManager';
import { getApp } from '@/lib/apps/registry';
import type { WindowState } from '@/lib/wms/types';
import styles from './Window.module.css';

/* ── Window Component ──
   Renders a single XP window: title bar chrome + app content.
   Handles drag (via title bar) and resize (via edge handles). */

interface WindowProps {
  windowState: WindowState;
}

export default function Window({ windowState }: WindowProps) {
  const { id, appId, title, icon, position, size, zIndex, state, isActive } =
    windowState;

  const windowRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const isResizing = useRef(false);
  const resizeDir = useRef('');
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0, px: 0, py: 0 });

  const store = useWMSStore;
  const appConfig = getApp(appId);

  // ── Focus on click ──
  const handleFocus = useCallback(() => {
    if (!isActive) {
      store.getState().focusWindow(id);
    }
  }, [id, isActive, store]);

  // ── Drag ──
  const handleDragStart = useCallback(
    (e: React.PointerEvent) => {
      if (windowState.state === 'maximized') return;
      e.preventDefault();
      isDragging.current = true;
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [position, windowState.state]
  );

  const handleDragMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current || !windowRef.current) return;
      const x = e.clientX - dragOffset.current.x;
      const y = Math.max(0, e.clientY - dragOffset.current.y); // can't drag above viewport
      // Direct DOM for performance
      windowRef.current.style.left = `${x}px`;
      windowRef.current.style.top = `${y}px`;
    },
    []
  );

  const handleDragEnd = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      // Sync to Zustand
      const x = e.clientX - dragOffset.current.x;
      const y = Math.max(0, e.clientY - dragOffset.current.y);
      store.getState().updatePosition(id, { x, y });
    },
    [id, store]
  );

  // ── Resize ──
  const handleResizeStart = useCallback(
    (dir: string) => (e: React.PointerEvent) => {
      if (windowState.state === 'maximized') return;
      e.preventDefault();
      e.stopPropagation();
      isResizing.current = true;
      resizeDir.current = dir;
      resizeStart.current = {
        x: e.clientX,
        y: e.clientY,
        w: size.width,
        h: size.height,
        px: position.x,
        py: position.y,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [size, position, windowState.state]
  );

  const handleResizeMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isResizing.current || !windowRef.current) return;
      const dx = e.clientX - resizeStart.current.x;
      const dy = e.clientY - resizeStart.current.y;
      const dir = resizeDir.current;
      const minW = windowState.minSize.width;
      const minH = windowState.minSize.height;

      let newW = resizeStart.current.w;
      let newH = resizeStart.current.h;
      let newX = resizeStart.current.px;
      let newY = resizeStart.current.py;

      if (dir.includes('e')) newW = Math.max(minW, resizeStart.current.w + dx);
      if (dir.includes('w')) {
        newW = Math.max(minW, resizeStart.current.w - dx);
        if (newW > minW) newX = resizeStart.current.px + dx;
      }
      if (dir.includes('s')) newH = Math.max(minH, resizeStart.current.h + dy);
      if (dir.includes('n')) {
        newH = Math.max(minH, resizeStart.current.h - dy);
        if (newH > minH) newY = resizeStart.current.py + dy;
      }

      windowRef.current.style.width = `${newW}px`;
      windowRef.current.style.height = `${newH}px`;
      windowRef.current.style.left = `${newX}px`;
      windowRef.current.style.top = `${newY}px`;
    },
    [windowState.minSize]
  );

  const handleResizeEnd = useCallback(
    (e: React.PointerEvent) => {
      if (!isResizing.current || !windowRef.current) return;
      isResizing.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);

      const rect = windowRef.current.getBoundingClientRect();
      const wmsActions = store.getState();
      wmsActions.updateSize(id, { width: rect.width, height: rect.height });
      wmsActions.updatePosition(id, { x: rect.left, y: rect.top });
    },
    [id, store]
  );

  // ── Title actions ──
  const handleMinimize = useCallback(() => {
    store.getState().minimizeWindow(id);
  }, [id, store]);

  const handleMaximize = useCallback(() => {
    if (windowState.state === 'maximized') {
      store.getState().restoreWindow(id);
    } else {
      store.getState().maximizeWindow(id);
    }
  }, [id, windowState.state, store]);

  const handleClose = useCallback(() => {
    store.getState().closeWindow(id);
  }, [id, store]);

  const handleTitleChange = useCallback(
    (newTitle: string) => {
      store.getState().updateTitle(id, newTitle);
    },
    [id, store]
  );

  // ── Double-click title bar → toggle maximize ──
  const handleTitleDoubleClick = useCallback(() => {
    handleMaximize();
  }, [handleMaximize]);

  // ── Keyboard: Escape closes, Alt+F4 closes ──
  useEffect(() => {
    if (!isActive) return;
    const handleKey = (e: KeyboardEvent) => {
      if ((e.altKey && e.key === 'F4') || (e.ctrlKey && e.key === 'w')) {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isActive, handleClose]);

  if (state === 'minimized') return null;

  const resizeDirs = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

  return (
    <motion.div
      ref={windowRef}
      className={styles.window}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      onPointerDown={handleFocus}
    >
      {/* Title Bar */}
      <div
        className={`${styles.titleBar} ${!isActive ? styles.inactive : ''}`}
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onDoubleClick={handleTitleDoubleClick}
      >
        {icon && (
          <img src={icon} alt="" className={styles.titleIcon} draggable={false} />
        )}
        <span className={styles.titleText}>{title}</span>
        <div className={styles.titleButtons}>
          <button
            className={`${styles.windowBtn} ${styles.btnMinMax}`}
            onClick={handleMinimize}
            aria-label="Minimize"
          >
            <svg viewBox="0 0 9 9" fill="white">
              <rect x="1" y="7" width="7" height="2" />
            </svg>
          </button>
          <button
            className={`${styles.windowBtn} ${styles.btnMinMax}`}
            onClick={handleMaximize}
            aria-label={state === 'maximized' ? 'Restore' : 'Maximize'}
          >
            {state === 'maximized' ? (
              <svg viewBox="0 0 9 9" fill="white">
                <rect x="2" y="0" width="7" height="7" fill="none" stroke="white" strokeWidth="1.5" />
                <rect x="0" y="2" width="7" height="7" fill="none" stroke="white" strokeWidth="1.5" />
              </svg>
            ) : (
              <svg viewBox="0 0 9 9" fill="white">
                <rect x="0" y="0" width="9" height="9" fill="none" stroke="white" strokeWidth="2" />
              </svg>
            )}
          </button>
          <button
            className={`${styles.windowBtn} ${styles.btnClose}`}
            onClick={handleClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 9 9" stroke="white" strokeWidth="1.5">
              <line x1="1" y1="1" x2="8" y2="8" />
              <line x1="8" y1="1" x2="1" y2="8" />
            </svg>
          </button>
        </div>
      </div>

      {/* Window Body — renders the app component */}
      <div className={styles.windowBody}>
        {appConfig?.component &&
          createElement(appConfig.component, {
            windowId: id,
            isActive,
            onTitleChange: handleTitleChange,
          })}
      </div>

      {/* Resize Handles (only when not maximized) */}
      {state !== 'maximized' &&
        resizeDirs.map((dir) => (
          <div
            key={dir}
            className={`${styles.resizeHandle} ${styles[`resize${dir.toUpperCase()}`]}`}
            onPointerDown={handleResizeStart(dir)}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeEnd}
          />
        ))}
    </motion.div>
  );
}
