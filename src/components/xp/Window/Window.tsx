'use client';

import { useRef, useCallback, useEffect, createElement } from 'react';
import { motion } from 'framer-motion';
import { useWMSStore } from '@/lib/wms/WindowManager';
import { getApp } from '@/lib/apps/registry';
import type { WindowState } from '@/lib/wms/types';
import TitleBar from './TitleBar';
import ResizeHandles from './ResizeHandles';
import styles from '../Window.module.css';

interface WindowProps {
  windowState: WindowState;
}

export default function Window({ windowState }: WindowProps) {
  const { id, appId, title, icon, position, size, zIndex, state, isActive } = windowState;
  const windowRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const isResizing = useRef(false);
  const resizeDir = useRef('');
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0, px: 0, py: 0 });
  const store = useWMSStore;
  const appConfig = getApp(appId);

  const handleFocus = useCallback(() => { if (!isActive) store.getState().focusWindow(id); }, [id, isActive, store]);

  const handleDragStart = useCallback((e: React.PointerEvent) => {
    if (windowState.state === 'maximized') return;
    e.preventDefault(); isDragging.current = true;
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [position, windowState.state]);

  const handleDragMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !windowRef.current) return;
    windowRef.current.style.left = `${e.clientX - dragOffset.current.x}px`;
    windowRef.current.style.top = `${Math.max(0, e.clientY - dragOffset.current.y)}px`;
  }, []);

  const handleDragEnd = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false; (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    store.getState().updatePosition(id, { x: e.clientX - dragOffset.current.x, y: Math.max(0, e.clientY - dragOffset.current.y) });
  }, [id, store]);

  const handleResizeStart = useCallback((dir: string) => (e: React.PointerEvent) => {
    if (windowState.state === 'maximized') return;
    e.preventDefault(); e.stopPropagation(); isResizing.current = true; resizeDir.current = dir;
    resizeStart.current = { x: e.clientX, y: e.clientY, w: size.width, h: size.height, px: position.x, py: position.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [size, position, windowState.state]);

  const handleResizeMove = useCallback((e: React.PointerEvent) => {
    if (!isResizing.current || !windowRef.current) return;
    const dx = e.clientX - resizeStart.current.x, dy = e.clientY - resizeStart.current.y, dir = resizeDir.current;
    let newW = resizeStart.current.w, newH = resizeStart.current.h, newX = resizeStart.current.px, newY = resizeStart.current.py;
    if (dir.includes('e')) newW = Math.max(windowState.minSize.width, resizeStart.current.w + dx);
    if (dir.includes('w')) { newW = Math.max(windowState.minSize.width, resizeStart.current.w - dx); if (newW > windowState.minSize.width) newX = resizeStart.current.px + dx; }
    if (dir.includes('s')) newH = Math.max(windowState.minSize.height, resizeStart.current.h + dy);
    if (dir.includes('n')) { newH = Math.max(windowState.minSize.height, resizeStart.current.h - dy); if (newH > windowState.minSize.height) newY = resizeStart.current.py + dy; }
    Object.assign(windowRef.current.style, { width: `${newW}px`, height: `${newH}px`, left: `${newX}px`, top: `${newY}px` });
  }, [windowState.minSize]);

  const handleResizeEnd = useCallback((e: React.PointerEvent) => {
    if (!isResizing.current || !windowRef.current) return;
    isResizing.current = false; (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    const rect = windowRef.current.getBoundingClientRect();
    store.getState().updateSize(id, { width: rect.width, height: rect.height });
    store.getState().updatePosition(id, { x: rect.left, y: rect.top });
  }, [id, store]);

  const handleMinimize = useCallback(() => store.getState().minimizeWindow(id), [id, store]);
  const handleMaximize = useCallback(() => { if (windowState.state === 'maximized') store.getState().restoreWindow(id); else store.getState().maximizeWindow(id); }, [id, windowState.state, store]);
  const handleClose = useCallback(() => store.getState().closeWindow(id), [id, store]);
  const handleTitleChange = useCallback((t: string) => store.getState().updateTitle(id, t), [id, store]);

  useEffect(() => {
    if (!isActive) return;
    const h = (e: KeyboardEvent) => { if ((e.altKey && e.key === 'F4') || (e.ctrlKey && e.key === 'w')) { e.preventDefault(); handleClose(); } };
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  }, [isActive, handleClose]);

  if (state === 'minimized') return null;

  return (
    <motion.div ref={windowRef} className={styles.window} style={{ left: position.x, top: position.y, width: size.width, height: size.height, zIndex }}
      initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.15, ease: 'easeOut' }} onPointerDown={handleFocus}>
      <TitleBar title={title} icon={icon} isActive={isActive} state={state} onMinimize={handleMinimize} onMaximize={handleMaximize} onClose={handleClose} onDragStart={handleDragStart} onDragMove={handleDragMove} onDragEnd={handleDragEnd} onDoubleClick={handleMaximize} />
      <div className={styles.windowBody}>{appConfig?.component && createElement(appConfig.component, { windowId: id, isActive, onTitleChange: handleTitleChange, onClose: handleClose })}</div>
      {state !== 'maximized' && <ResizeHandles onResizeStart={handleResizeStart} onResizeMove={handleResizeMove} onResizeEnd={handleResizeEnd} />}
    </motion.div>
  );
}
