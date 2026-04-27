'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import styles from './About.module.css'
import common from './SectionCommon.module.css'

interface AboutProps {
  data: {
    title: string
    name: string
    role: string
    bio: string
    cta_text: string
  }
}

export default function AboutSection({ data }: AboutProps) {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.sectionContainer}>
        <div className={styles.aboutGrid}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.aboutImage}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <Image 
              src="/images/richard-headshot-2.jpg" 
              alt="Richard Norwood" 
              fill
              style={{ 
                objectFit: 'cover', 
                objectPosition: 'top center'
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.aboutText}
          >
            <h2 className={styles.sectionTitle}>{data.title}</h2>
            <div className={styles.titleDecoration} />
            
            <h3>{data.name}</h3>
            <span className={styles.aboutRole}>{data.role}</span>

            <div className={styles.certBadges}>
              <a href="https://www.credly.com/badges/08947dff-1909-4bc0-97c5-3228020092f8/public_url" target="_blank" rel="noopener noreferrer" className={styles.certBadge}>
                <div className={styles.certBadgeImage}>PMP</div>
                <span className={styles.certBadgeText}>PMP® Certified</span>
              </a>
              <a href="https://www.coursera.org/account/accomplishments/specialization/certificate/E7WYXFS85H79" target="_blank" rel="noopener noreferrer" className={styles.certBadge}>
                <div className={styles.certBadgeImage}>GDA</div>
                <span className={styles.certBadgeText}>Data Analytics</span>
              </a>
            </div>

            <p className={styles.aboutBio}>{data.bio}</p>
            
            <Link href="/about" className={styles.secondaryCta}>
              {data.cta_text}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
