'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './Sections.module.css'

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
      <div className={common.sectionContainer}>
        <div className={styles.aboutGrid}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.aboutImage}
          >
            {/* Replace with actual image in production */}
            [ PMP / GDA Navigator Image ]
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.aboutText}
          >
            <h2 className={common.sectionTitle}>{data.title}</h2>
            <div className={common.titleDecoration} />
            
            <h3>{data.name}</h3>
            <span className={styles.aboutRole}>{data.role}</span>
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
    </div>
      </div>
    </section>
  )
}
