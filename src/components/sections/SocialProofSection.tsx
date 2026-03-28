'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './Sections.module.css'

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
            <motion.div 
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring" }}
              className={styles.metricCard}
            >
              <div className={styles.metricValue}>{metric.value}</div>
              <div className={styles.metricLabel}>{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
