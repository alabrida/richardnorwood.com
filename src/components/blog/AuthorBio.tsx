'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './AuthorBio.module.css'

export function AuthorBio() {
  return (
    <div className={styles.authorBio}>
      <div className={styles.authorAvatar}>
        <Image 
          src="/images/author_pic.jpg" 
          alt="Richard Norwood" 
          width={80} 
          height={80} 
          className={styles.avatarImage}
        />
      </div>
      <div className={styles.authorInfo}>
        <h3>Richard Norwood, PMP</h3>
        <p className={styles.authorRole}>
          Revenue Architect
        </p>
        <div className={styles.certBadges}>
          <motion.a 
            href="https://www.credly.com/badges/08947dff-1909-4bc0-97c5-3228020092f8/public_url" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.certBadge}
            whileHover={{ scale: 1.05 }}
            data-benefit="Ensures structured delivery and project accountability."
          >
            <div className={styles.certIcon}>PMP</div>
            <span className={styles.certLabel}>PMP® Certified</span>
          </motion.a>
          <motion.a 
            href="https://coursera.org/share/380889997f4b4bcf04d4a250d5ce7df9" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.certBadge}
            whileHover={{ scale: 1.05 }}
            data-benefit="Uncovers hidden revenue leaks via statistical analysis."
          >
            <div className={styles.certIcon}>GDA</div>
            <span className={styles.certLabel}>Data Analytics</span>
          </motion.a>
        </div>
        <p className={styles.authorDescription}>
          Richard specializes in uncovering hidden friction points in the customer journey. With over 15 years of experience spanning continuous improvement and sales leadership, he brings PMP-certified delivery discipline to fix systemic revenue leaks and turn strategy into measurable outcomes.
        </p>
        <Link 
          href="https://www.linkedin.com/in/richardnorwoodpmp"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.authorLink}
        >
          Connect on LinkedIn →
        </Link>
      </div>
    </div>
  )
}
