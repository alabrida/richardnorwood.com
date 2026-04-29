'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './ServiceTiers.module.css'
import Link from 'next/link'
import GlowCard from '@/components/ui/GlowCard'

interface Tier {
  id: string
  name: string
  badge?: string
  subtitle: string
  description: string
  includes: string[]
  cta: string
  highlighted?: boolean
}

interface TiersProps {
  data: Tier[]
}

export default function ServiceTiers({ data }: TiersProps) {
  return (
    <section className={styles.tiersGrid}>   
      {data.map((tier, index) => {
        const isBuild = tier.id === 'build'
        return (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 30 }}    
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -8, scale: 1.01 }}
          >
            <GlowCard 
              className={`${styles.tierCard} ${isBuild ? styles.highlightedCard : ''}`} 
              glowColor={isBuild ? 'var(--color-secondary)' : 'var(--color-accent)'}
              glow={isBuild ? { r: 240, g: 180, b: 41 } : { r: 32, g: 201, b: 151 }}
            >
              {tier.badge && (
                <div className={isBuild ? styles.popularBadge : styles.topRightBadge}>
                  {isBuild && <span className="mr-1.5">★</span>}
                  {!isBuild && <span className="mr-1.5">✦</span>}
                  {tier.badge}
                </div>
              )}
              <div className={styles.tierContent}>
                <div className={styles.tierSubtitle}>{tier.subtitle}</div>
                <h2 className={styles.tierName}>{tier.name}</h2>
                <p className={styles.tierDesc}>{tier.description}</p>

                <ul className={styles.tierIncludesList}>
                  {tier.includes.map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                    >
                    <span className="text-accent mr-2">✓</span>
                      {item}
                    </motion.li>        
                  ))}
                </ul>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-auto"
                >
                  <Link 
                    href={`/services/${tier.id}`}
                    className={`${styles.tierCta} ${isBuild ? styles.highlightedBtn : ''}`}
                  >
                    {tier.cta}
                  </Link>
                </motion.div>
              </div>
            </GlowCard>
          </motion.div>
        )
      })}
    </section>
  )
}
