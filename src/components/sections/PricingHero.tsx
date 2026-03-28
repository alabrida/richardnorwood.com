'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './Pricing.module.css'

export default function PricingHero() {
  return (
    <section className={styles.heroSection}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.heroTitle}
      >
        Simple, Transparent Pricing
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={styles.heroSubtitle}
      >
        Select the level of orchestration required to untangle your engine. All phases compound symmetrically.
      </motion.p>
    </section>
  )
}
