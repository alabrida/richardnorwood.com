'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './ServicesHero.module.css'

interface HeroProps {
  data: {
    title: string
    subtitle: string
  }
}

export default function ServicesHero({ data }: HeroProps) {
  return (
    <section className={styles.heroSection}>
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={styles.heroTitle}
      >
        {data.title}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={styles.heroSubtitle}
      >
        {data.subtitle}
      </motion.p>
    </section>
  )
}
