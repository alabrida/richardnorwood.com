'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './Pricing.module.css'
import GlowCard from '@/components/ui/GlowCard'

interface Tier {
  id: string
  name: string
  tagline: string
  term: string
  badge?: string
  badge_tooltip?: string
  value_nudge?: string
  features: string[]
  locked_features: string[]
  cta_text: string
  highlighted: boolean
}

export default function PricingGrid({ data }: { data: Tier[] }) {
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
            glow={tier.highlighted ? { r: 240, g: 180, b: 41 } : { r: 32, g: 201, b: 151 }}
          >
            {tier.badge && (
              <div 
                className={`${styles.popularBadge} ${!tier.highlighted ? styles.neutralBadge : ''}`}
                data-tooltip={tier.badge_tooltip}
              >
                <span className="mr-1.5">{tier.highlighted ? '★' : '✦'}</span>
                {tier.badge}
              </div>
            )}
            <div className={styles.pricingContent}>
              <p className={styles.tierTagline}>{tier.tagline}</p>
              <h3 className={styles.tierName}>{tier.name}</h3>

              {tier.value_nudge && (
                <p className={styles.tierDesc}>
                  {tier.value_nudge}
                </p>
              )}
              
              <div className={styles.priceBlock}>
                <span className={styles.termLabel}>Commitment</span>
                <span className={styles.price}>{tier.term}</span>
              </div>
              
              <ul className={styles.featuresList}>
                {tier.features.map((feature, idx) => (
                  <motion.li 
                    key={`f-${idx}`} 
                    className={styles.featureItem}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (idx * 0.05) }}
                  >
                    <span className={styles.featureIcon}>✓</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
                {tier.locked_features.map((locked, idx) => (
                  <li key={`l-${idx}`} className={`${styles.featureItem} ${styles.lockedItem}`}>
                    <span className={styles.lockedIcon}>✕</span>
                    <span>{locked}</span>
                  </li>
                ))}
              </ul>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href={`/services/${tier.id}`} 
                  className={`${styles.ctaBtn} ${tier.highlighted ? styles.highlightedBtn : styles.primaryBtn}`}
                >
                  {tier.cta_text}
                </Link>
              </motion.div>
            </div>
          </GlowCard>
        </motion.div>
      ))}
    </section>
  )
}
