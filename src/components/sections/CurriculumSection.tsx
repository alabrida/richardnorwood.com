'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './Services.module.css'

interface CurriculumWeek {
  week: number
  topic: string
  description: string
}

interface CurriculumProps {
  data: CurriculumWeek[]
}

export default function CurriculumSection({ data }: CurriculumProps) {
  return (
    <section className={styles.curriculumSection}>
      <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
        The 90-Day Curriculum
      </h2>
      <div className={styles.curriculumList}>
        {data.map((item, i) => (
          <motion.div 
            key={item.week}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 5) * 0.1 }}
            className={styles.curriculumRow}
          >
            <div className={styles.curriculumWeek}>W{item.week}</div>
            <div>
              <div className={styles.curriculumTopic}>{item.topic}</div>
              <div className={styles.curriculumDesc}>{item.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
