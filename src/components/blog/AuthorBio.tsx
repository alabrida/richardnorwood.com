import React from 'react'
import Link from 'next/link'
import styles from './AuthorBio.module.css'

export function AuthorBio() {
  return (
    <div className={styles.authorBio}>
      <div className={styles.authorAvatar}>
        RN
      </div>
      <div className={styles.authorInfo}>
        <h3>Richard Norwood, PMP</h3>
        <p className={styles.authorRole}>
          Revenue Architecture Advisor
        </p>
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
