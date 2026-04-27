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
        >
          <GlowCard
            className={`${styles.pricingCard} ${tier.highlighted ? styles.highlightedCard : ''}`}
            glowColor={tier.highlighted ? 'var(--color-secondary)' : 'var(--color-accent)'}
            glow={tier.highlighted ? { r: 240, g: 180, b: 41 } : { r: 32, g: 201, b: 151 }}
          >
            <div className={styles.pricingContent}>
              {tier.highlighted && <div className={styles.popularBadge}>Recommended</div>}
              
              <h3 className={styles.tierName}>{tier.name}</h3>
              <p className={styles.tierTagline}>{tier.tagline}</p>
              
              <div className={styles.priceBlock}>
                <span className={styles.termLabel}>Engagement Term</span>
                <span className={styles.price}>{tier.term}</span>
              </div>
              
              <ul className={styles.featuresList}>
                {tier.features.map((feature, idx) => (
                  <li key={`f-${idx}`} className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
                {tier.locked_features.map((locked, idx) => (
                  <li key={`l-${idx}`} className={`${styles.featureItem} ${styles.lockedItem}`}>
                    <span className={styles.lockedIcon}>✕</span>
                    <span>{locked}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={`/services/${tier.id}`} 
                className={`${styles.ctaBtn} ${tier.highlighted ? styles.highlightedBtn : styles.primaryBtn}`}
              >
                {tier.cta_text}
              </Link>
            </div>
          </GlowCard>
        </motion.div>
      ))}
    </section>
  )
}
