'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid/index.js'
import { StarIcon as StarOutline } from '@heroicons/react/24/outline/index.js'
import styles from './StarRating.module.css'

interface StarRatingProps {
  postId: number
}

export default function StarRating({ postId }: StarRatingProps) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleRating = (value: number) => {
    setRating(value)
    setSubmitted(true)
    // In a real implementation, we would persist this to Supabase
    console.log(`Rated post ${postId}: ${value} stars`)
  }

  return (
    <div className={styles.ratingContainer}>
      <span className={styles.ratingLabel}>
        {submitted ? 'Thank you for rating!' : 'Rate this Field Note:'}
      </span>
      
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            className={styles.starButton}
            onMouseEnter={() => !submitted && setHover(star)}
            onMouseLeave={() => !submitted && setHover(0)}
            onClick={() => !submitted && handleRating(star)}
            whileHover={!submitted ? { scale: 1.2 } : {}}
            whileTap={!submitted ? { scale: 0.9 } : {}}
            disabled={submitted}
          >
            {(hover || rating) >= star ? (
              <StarSolid className={styles.starIconActive} />
            ) : (
              <StarOutline className={styles.starIcon} />
            )}
          </motion.button>
        ))}
      </div>

      {submitted && (
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className={styles.submittedValue}
        >
          {rating}/5
        </motion.div>
      )}
    </div>
  )
}
