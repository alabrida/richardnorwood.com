'use client'

import React from 'react'
import { PhoneIcon } from '@heroicons/react/24/solid/index.js'
import styles from './CallButton.module.css'

interface CallButtonProps {
  className?: string
  size?: 'default' | 'large'
}

export default function CallButton({ className = '', size = 'default' }: CallButtonProps) {
  const sizeClass = size === 'large' ? styles.large : '';
  return (
    <a href="tel:8138071193" className={`${styles.callButton} ${sizeClass} ${className}`}>
      <PhoneIcon className={styles.icon} />
      <span>Call (813) 807-1193</span>
    </a>
  )
}
