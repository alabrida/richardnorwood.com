'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './Hero.module.css'

interface HeroProps {
  data: {
    headline: string
    subhead: string
    cta_text: string
    cta_url: string
  }
}

export default function HeroSection({ data }: HeroProps) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <div className={styles.heroGradientOverlay} />
        {/* Synthetic grid lines for the "engine" feel */}
        <div className={styles.heroGrid} />
      </div>

      <div className={styles.heroContent}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.titleWrapper}
        >
          <h1 className={styles.heroTitle}>{data.headline}</h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={styles.heroSubhead}
        >
          {data.subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 100 }}
          className={styles.ctaWrapper}
        >
          <Link href={data.cta_url} className={styles.primaryCta}>
            {data.cta_text}
            <span className={styles.ctaArrow}>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
