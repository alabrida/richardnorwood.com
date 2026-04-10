'use client';

import React from 'react';
import styles from '../Window.module.css';

interface ResizeHandlesProps {
  onResizeStart: (dir: string) => (e: React.PointerEvent) => void;
  onResizeMove: (e: React.PointerEvent) => void;
  onResizeEnd: (e: React.PointerEvent) => void;
}

const RESIZE_DIRS = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

export default function ResizeHandles({ onResizeStart, onResizeMove, onResizeEnd }: ResizeHandlesProps) {
  return (
    <>
      {RESIZE_DIRS.map((dir) => (
        <div
          key={dir}
          className={`${styles.resizeHandle} ${styles[`resize${dir.toUpperCase()}` as keyof typeof styles]}`}
          onPointerDown={onResizeStart(dir)}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeEnd}
        />
      ))}
    </>
  );
}
