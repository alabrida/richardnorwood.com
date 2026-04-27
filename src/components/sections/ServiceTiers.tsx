'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './ServiceTiers.module.css'
import Link from 'next/link'
import GlowCard from '@/components/ui/GlowCard'

interface Tier {
  id: string
  name: string
  subtitle: string
  description: string
  includes: string[]
  cta: string
}

interface TiersProps {
  data: Tier[]
}

export default function ServiceTiers({ data }: TiersProps) {
  return (
    <section className={styles.tiersGrid}>   
      {data.map((tier, index) => (
        <motion.div
          key={tier.id}
          initial={{ opacity: 0, y: 30 }}    
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
        >
          <GlowCard className={styles.tierCard} glowColor="var(--color-secondary)">
            <div className={styles.tierContent}>
              <div className={styles.tierSubtitle}>{tier.subtitle}</div>
              <h2 className={styles.tierName}>{tier.name}</h2>
              <p className={styles.tierDesc}>{tier.description}</p>

              <ul className={styles.tierIncludesList}>
                {tier.includes.map((item, i) => (
                  <li key={i}>{item}</li>        
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <Link 
                  href={`/services/${tier.id}`}
                  className={styles.tierCta}
                >
                  {tier.cta} →
                </Link>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      ))}
    </section>
  )
}
