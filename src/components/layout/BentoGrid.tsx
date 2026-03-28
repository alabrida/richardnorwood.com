'use client';

import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import styles from './BentoGrid.module.css';

/* ── Grid ── */
interface BentoGridProps {
  children: ReactNode;
  columns?: 3 | 4;
  asymmetric?: boolean;
  className?: string;
}

export function BentoGrid({
  children,
  columns = 3,
  asymmetric = false,
  className = '',
}: BentoGridProps) {
  const gridClass = asymmetric
    ? styles.asymmetric
    : columns === 4
      ? styles.grid4
      : styles.grid;

  return <div className={`${gridClass} ${className}`}>{children}</div>;
}

/* ── Card ── */
interface BentoCardProps {
  children: ReactNode;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  featured?: boolean;
  className?: string;
  index?: number;
}

const spanClasses: Record<number, string> = {
  2: styles.colSpan2,
  3: styles.colSpan3,
};

export function BentoCard({
  children,
  colSpan = 1,
  rowSpan = 1,
  featured = false,
  className = '',
  index = 0,
}: BentoCardProps) {
  const classes = [
    featured ? styles.featured : styles.card,
    colSpan > 1 ? spanClasses[colSpan] : '',
    rowSpan > 1 ? styles.rowSpan2 : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Convenience sub-components ── */
interface CardIconProps {
  children: ReactNode;
  color?: string;
}

export function BentoCardIcon({ children, color }: CardIconProps) {
  return (
    <div
      className={styles.cardIcon}
      style={{
        background: color
          ? `${color}15`
          : 'rgba(240, 180, 41, 0.1)',
        color: color || 'var(--color-secondary)',
      }}
    >
      {children}
    </div>
  );
}

export function BentoCardTitle({ children }: { children: ReactNode }) {
  return <h3 className={styles.cardTitle}>{children}</h3>;
}

export function BentoCardDescription({ children }: { children: ReactNode }) {
  return <p className={styles.cardDescription}>{children}</p>;
}
