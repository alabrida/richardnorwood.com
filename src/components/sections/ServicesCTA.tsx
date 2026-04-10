'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './ServicesCTA.module.css'

export default function ServicesCTA() {
  return (
    <section className={styles.ctaSection}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
          Ready to Orchestrate?
        </h2>
        <p style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-xl)', maxWidth: '600px', margin: '0 auto' }}>
          Stop guessing and start measuring. Take the Commercial EKG to define your baseline.
        </p>
        
        <Link href="/calculator" className={styles.ctaBtn}>
          Run the Assessment
        </Link>
      </motion.div>
    </section>
  )
}
