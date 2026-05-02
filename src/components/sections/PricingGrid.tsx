'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './Pricing.module.css'
import GlowCard from '@/components/ui/GlowCard'

interface Tier {
  id: string
  name: string
  term: string
  price?: string
  features: string[]
  cta_text: string
  cta_url?: string
  highlighted: boolean
}

interface PricingGridProps {
  data: Tier[]
}

export default function PricingGrid({ data }: PricingGridProps) {
  return (
    <section className={styles.pricingGrid}>
      {data.map((tier, i) => (
        <motion.div
          key={tier.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          whileHover={{ y: -10, scale: 1.02 }}
          className="relative h-full"
          style={{ overflow: 'visible' }}
        >
          <GlowCard
            className={`${styles.pricingCard} ${tier.highlighted ? styles.highlightedCard : ''}`}
            glowColor={tier.highlighted ? 'var(--color-secondary)' : 'var(--color-accent)'}
          >
            <div className={styles.pricingContent}>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', color: 'var(--color-text)' }}>{tier.name}</h3>
                  {tier.highlighted && (
                    <span style={{ fontSize: '10px', background: 'rgba(240, 180, 41, 0.1)', color: 'var(--color-secondary)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      Recommended
                    </span>
                  )}
                </div>
                <p style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-sm)' }}>{tier.term}</p>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', flexGrow: 1 }}>
                {tier.features.map((feature, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>
                    <span style={{ color: tier.highlighted ? 'var(--color-secondary)' : 'var(--color-accent)', flexShrink: 0 }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <motion.div whileTap={{ scale: 0.98 }} className={styles.pricingBtn}>
              <Link
                href={tier.cta_url || '/calculator'}
                className={`${styles.primaryBtn} ${tier.highlighted ? styles.highlightedBtn : ''}`}
              >
                {tier.cta_text}
              </Link>
            </motion.div>
          </GlowCard>
        </motion.div>
      ))}
    </section>
  )
}
