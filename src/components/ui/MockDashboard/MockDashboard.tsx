'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './MockDashboard.module.css'

const metrics = [
  { label: 'Signal Strength', value: '94%', color: 'var(--color-accent)' },
  { label: 'Structural Friction', value: 'LOW', color: 'var(--color-accent)' },
  { label: 'Revenue Velocity', value: '+32.4%', color: 'var(--color-secondary)' },
]

export default function MockDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <div className={styles.statusDot} />
        <span className={styles.statusText}>Revenue Engine: ACTIVE</span>
      </div>

      <div className={styles.metricsGrid}>
        {metrics.map((m, i) => (
          <div key={i} className={styles.metricItem}>
            <span className={styles.metricLabel}>{m.label}</span>
            <motion.span 
              className={styles.metricValue}
              style={{ color: m.color }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.2) }}
            >
              {m.value}
            </motion.span>
          </div>
        ))}
      </div>

      <div className={styles.ekgContainer}>
        <svg viewBox="0 0 400 100" className={styles.ekgSvg} preserveAspectRatio="none">
          <motion.path
            d="M0,50 L40,50 L50,20 L60,80 L70,50 L120,50 L130,10 L145,90 L160,50 L220,50 L230,30 L240,70 L250,50 L300,50 L315,5 L330,95 L345,50 L400,50"
            fill="transparent"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: [0.3, 1, 0.3] }}
            transition={{ 
              pathLength: { duration: 3, repeat: Infinity, ease: "linear" },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </svg>
      </div>

      <div className={styles.dashboardFooter}>
        <span className={styles.footerLabel}>LAST DIAGNOSTIC</span>
        <span className={styles.footerValue}>JUST NOW</span>
        <div className={styles.liveBadge}>
          <div className={styles.pulse} />
          PULSE CAPTURE LIVE
        </div>
      </div>
    </div>
  )
}
