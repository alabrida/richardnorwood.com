'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './Services.module.css'

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
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-3xl)' }}>
          {data.title}
        </h2>
      </div>

      <div className={styles.timelineGrid}>
        {data.phases.map((phase, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={styles.timelinePhase}
          >
            <div className={styles.phaseMarker} />
            <div className={styles.phaseDays}>{phase.days}</div>
            <h3 className={styles.phaseName}>{phase.name}</h3>
            <p style={{ color: 'var(--color-text-subtle)', marginBottom: 'var(--space-4)' }}>
              {phase.description}
            </p>
            <ul className={styles.tierIncludesList}>
              {phase.milestones.map((ms, j) => (
                <li key={j}>{ms}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
