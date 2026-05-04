'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './SocialProof.module.css'

interface Metric {
  label: string
  value: string
}

interface SocialProofProps {
  data: {
    title: string
    description: string
    metrics: Metric[]
  }
}

import GlowCard from '@/components/ui/GlowCard'

function GlowMetricCard({ metric, index }: { metric: Metric; index: number }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, type: 'spring' }}
    >
      <GlowCard className={styles.metricCard}>
        <div className={styles.metricContent}>
          <div className={styles.metricValue}>{metric.value}</div>
          <div className={styles.metricLabel}>{metric.label}</div>
        </div>
      </GlowCard>
    </motion.div>
  )
}

export default function SocialProofSection({ data }: SocialProofProps) {
  return (
    <section className={styles.socialProofSection}>
      <div className={styles.sectionContainer}>
        <div className={styles.socialProofHeader}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.sectionTitle}
          >
            {data.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={styles.sectionDescription}
          >
            {data.description}
          </motion.p>
        </div>

        <div className={styles.metricsGrid}>
          {data.metrics.map((metric, i) => (
            <GlowMetricCard key={i} metric={metric} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
