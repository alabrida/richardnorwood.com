'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './ServiceTiers.module.css'
import Link from 'next/link'
import GlowCard from '@/components/ui/GlowCard'

interface Tier {
  id: string
  name: string
  badge: string
  badge_tooltip: string
  subtitle: string
  description: string
  includes: string[]
  cta: string
}

interface ServiceTiersProps {
  data: Tier[]
}

export default function ServiceTiers({ data }: ServiceTiersProps) {
  return (
    <section className={styles.tiersGrid}>
      {data.map((tier, index) => {
        const isBuild = tier.id === 'build'
        const isAlign = tier.id === 'align'
        
        return (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 30 }}    
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="h-full"
            style={{ overflow: 'visible' }}
          >
            <GlowCard 
              className={`${styles.tierCard} ${isBuild ? styles.highlightedCard : ''}`} 
              glowColor={isBuild ? 'var(--color-secondary)' : 'var(--color-accent)'}
            >
              {/* Badge with Tooltip */}
              <div 
                className={isBuild ? styles.popularBadge : styles.topRightBadge}
                data-tooltip={tier.badge_tooltip}
              >
                {tier.badge}
              </div>

              <div className={styles.tierContent}>
                <h3 className={styles.tierName}>{tier.name}</h3>
                <div className={styles.tierSubtitle}>{tier.subtitle}</div>
                <p className={styles.tierDesc}>{tier.description}</p>
                
                <ul className={styles.tierIncludesList}>
                  {tier.includes.map((item, i) => (
                    <li key={i}><span>✓</span> {item}</li>
                  ))}
                </ul>
              </div>

              <motion.div whileTap={{ scale: 0.98 }} className={styles.tierBtn}>
                <Link 
                  href={`/services/${tier.id}`}
                  className={`${styles.tierCta} ${isBuild ? styles.highlightedBtn : ''}`}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            </GlowCard>
          </motion.div>
        )
      })}
    </section>
  )
}
