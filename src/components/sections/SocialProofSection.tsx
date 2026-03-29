'use client'

import React, { useRef, useState, useCallback } from 'react'
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

/* ─── Glow Metric Card ─── */
function GlowMetricCard({ metric, index }: { metric: Metric; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovering, setHovering] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }, [])

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, type: 'spring' }}
      className={styles.metricCardWrapper}
    >
      <div
        ref={cardRef}
        className={styles.metricCard}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false)
          setGlowPos({ x: 50, y: 50 })
        }}
      >
        {/* Edge glow that radiates from borders toward cursor */}
        <div
          className={styles.metricEdgeGlow}
          style={{
            opacity: hovering ? 1 : 0,
            mask: `radial-gradient(ellipse at ${glowPos.x}% ${glowPos.y}%, transparent 20%, black 70%)`,
            WebkitMask: `radial-gradient(ellipse at ${glowPos.x}% ${glowPos.y}%, transparent 20%, black 70%)`,
          }}
        />

        {/* Soft inner highlight near cursor */}
        <div
          className={styles.metricInnerGlow}
          style={{
            opacity: hovering ? 1 : 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.04) 0%, transparent 50%)`,
          }}
        />

        <div className={styles.metricValue}>{metric.value}</div>
        <div className={styles.metricLabel}>{metric.label}</div>
      </div>
    </motion.div>
  )
}

/* ─── Main Section ─── */
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
