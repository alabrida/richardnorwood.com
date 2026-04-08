'use client';

import { motion } from 'motion/react';
import styles from './MetroTile.module.css';

interface TileConfig {
  id: string;
  label: string;
  icon: string;
  size: 'small' | 'medium' | 'wide';
  color: string;
  subtitle?: string;
  appId: string;
}

interface MetroTileProps {
  tile: TileConfig;
  index: number;
  isPressed: boolean;
  onTap: () => void;
}

export default function MetroTile({ tile, index, isPressed, onTap }: MetroTileProps) {
  const sizeClass =
    tile.size === 'wide'
      ? styles.wide
      : tile.size === 'medium'
        ? styles.medium
        : styles.small;

  return (
    <motion.button
      className={`${styles.tile} ${sizeClass}`}
      style={{ backgroundColor: tile.color }}
      onClick={onTap}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: isPressed ? 0.95 : 1,
      }}
      transition={{
        opacity: { delay: index * 0.05, duration: 0.3 },
        scale: { duration: 0.1 },
      }}
      whileTap={{ scale: 0.92 }}
      aria-label={tile.label}
    >
      <span className={styles.icon}>{tile.icon}</span>
      <span className={styles.label}>{tile.label}</span>
      {tile.subtitle && <span className={styles.subtitle}>{tile.subtitle}</span>}
    </motion.button>
  );
}
