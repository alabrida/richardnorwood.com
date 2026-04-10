'use client';

import React from 'react';
import styles from '../Window.module.css';

interface TitleBarProps {
  title: string;
  icon?: string;
  isActive: boolean;
  state: 'normal' | 'maximized' | 'minimized';
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onDragStart: (e: React.PointerEvent) => void;
  onDragMove: (e: React.PointerEvent) => void;
  onDragEnd: (e: React.PointerEvent) => void;
  onDoubleClick: () => void;
}

export default function TitleBar({
  title, icon, isActive, state,
  onMinimize, onMaximize, onClose,
  onDragStart, onDragMove, onDragEnd, onDoubleClick
}: TitleBarProps) {
  return (
    <div
      className={`${styles.titleBar} ${!isActive ? styles.inactive : ''}`}
      onPointerDown={onDragStart}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      onDoubleClick={onDoubleClick}
    >
      {icon && <img src={icon} alt="" className={styles.titleIcon} draggable={false} />}
      <span className={styles.titleText}>{title}</span>
      <div className={styles.titleButtons}>
        <button className={`${styles.windowBtn} ${styles.btnMinMax}`} onClick={onMinimize} aria-label="Minimize">
          <svg viewBox="0 0 9 9" fill="white"><rect x="1" y="7" width="7" height="2" /></svg>
        </button>
        <button className={`${styles.windowBtn} ${styles.btnMinMax}`} onClick={onMaximize} aria-label={state === 'maximized' ? 'Restore' : 'Maximize'}>
          {state === 'maximized' ? (
            <svg viewBox="0 0 9 9" fill="white">
              <rect x="2" y="0" width="7" height="7" fill="none" stroke="white" strokeWidth="1.5" />
              <rect x="0" y="2" width="7" height="7" fill="none" stroke="white" strokeWidth="1.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 9 9" fill="white"><rect x="0" y="0" width="9" height="9" fill="none" stroke="white" strokeWidth="2" /></svg>
          )}
        </button>
        <button className={`${styles.windowBtn} ${styles.btnClose}`} onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 9 9" stroke="white" strokeWidth="1.5">
            <line x1="1" y1="1" x2="8" y2="8" /><line x1="8" y1="1" x2="1" y2="8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
