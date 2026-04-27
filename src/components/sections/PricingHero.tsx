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
        Align. Build. Command.
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={styles.heroSubtitle}
      >
        Choose the engagement that matches where your business is today.
      </motion.p>
    </section>
  )
}
