'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CallButton from '@/components/ui/CallButton'
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
          Ready to See Where the Friction Lives?
        </h2>
        <p style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-xl)', maxWidth: '600px', margin: '0 auto' }}>
          A short diagnostic to identify what's working, what's stalling, and where to focus first.
        </p>
        
        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--space-8)' }}>
          <Link href="/calculator" className={styles.ctaBtn} style={{ marginTop: 0 }}>
            Run the Assessment
          </Link>
          <CallButton size="large" />
          <Link 
            href="/blueprint" 
            className={styles.ctaBtn} 
            style={{ marginTop: 0, background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
          >
            Get the Blueprint (PDF)
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
