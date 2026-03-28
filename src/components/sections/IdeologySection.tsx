'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './Sections.module.css'

interface Stage {
  title: string
  description: string
  icon: string
}

interface IdeologyProps {
  data: {
    title: string
    stages: Stage[]
  }
}

export default function IdeologySection({ data }: IdeologyProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 50 } }
  }

  // Map to global CSS stage tokens mapped in globals.css
  const stageColors = [
    'var(--stage-awareness)',
    'var(--stage-consideration)',
    'var(--stage-decision)',
    'var(--stage-conversion)',
    'var(--stage-retention)'
  ]

  return (
    <section className={styles.ideologySection} id="ideology">
      <div className={styles.sectionContainer}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>{data.title}</h2>
          <div className={styles.titleDecoration} />
        </motion.div>

        <motion.div 
          className={styles.timelineGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {data.stages.map((stage, i) => (
            <motion.div key={i} className={styles.timelineCard} variants={itemVariants}>
              <div 
                className={styles.stageIndicator} 
                style={{ backgroundColor: stageColors[i % stageColors.length] }} 
              />
              <div className={styles.stageContent}>
                <h3 className={styles.stageTitle}>{stage.title}</h3>
                <p className={styles.stageDescription}>{stage.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
