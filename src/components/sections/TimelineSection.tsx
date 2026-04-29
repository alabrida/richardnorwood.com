'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './Timeline.module.css'
import GlowCard from '@/components/ui/GlowCard'

interface Milestone {
  name: string
  days: string
  description: string
  milestones: string[]
}

interface TimelineProps {
  data: {
    title: string
    phases: Milestone[]
  }
}

export default function TimelineSection({ data }: TimelineProps) {
  return (
    <section className={styles.timelineSection}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-3xl)', fontWeight: 800 }}>
          {data.title}
        </h2>
      </div>

      <div className={styles.timelineGrid}>
        {data.phases.map((phase, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className={styles.timelinePhase}
          >
            <GlowCard className={styles.phaseCard} glowColor="var(--color-secondary)">
              <div className={styles.phaseMarker} />
              <div className={styles.phaseContent}>
                <div className={styles.phaseDays}>{phase.days}</div>
                <h3 className={styles.phaseName}>{phase.name}</h3>
                <p className={styles.phaseDesc}>
                  {phase.description}
                </p>
                <ul className={styles.milestonesList}>
                  {phase.milestones.map((ms, j) => (
                    <motion.li 
                      key={j}
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (j * 0.1) }}
                    >
                      <span>✓</span>
                      {ms}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
