'use client'

import React, { useRef, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Sections.module.css'

interface Stage {
  title: string
  subtitle?: string
  description: string
  icon: string
}

interface IdeologyProps {
  data: {
    title: string
    subtitle?: string
    stages: Stage[]
  }
}

/* ─── Stage color tokens ─── */
const stageColors = [
  'var(--stage-awareness)',
  'var(--stage-consideration)',
  'var(--stage-decision)',
  'var(--stage-conversion)',
  'var(--stage-retention)',
]

/* ─── Raw hex values for rgba glow layers ─── */
const stageGlowColors = [
  { r: 59, g: 130, b: 246 },   // awareness — blue
  { r: 168, g: 85, b: 247 },   // consideration — purple
  { r: 245, g: 158, b: 11 },   // decision — amber
  { r: 16, g: 185, b: 129 },   // conversion — green
  { r: 239, g: 68, b: 68 },    // retention — red
]

/* ─── Tilt Card with colored edge glow ─── */
function TiltCard({
  stage,
  index,
  color,
  glow,
  bentoClass,
}: {
  stage: Stage
  index: number
  color: string
  glow: { r: number; g: number; b: number }
  bentoClass?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovering, setHovering] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setTilt({
      rotateX: ((centerY - y) / centerY) * 2.5,
      rotateY: ((x - centerX) / centerX) * 2.5,
    })
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovering(false)
    setTilt({ rotateX: 0, rotateY: 0 })
    setGlowPos({ x: 50, y: 50 })
  }, [])

  const { r, g, b } = glow

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className={`${styles.tiltCardWrapper} ${bentoClass || ''}`}
    >
      <div
        ref={cardRef}
        className={styles.tiltCard}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          borderColor: hovering ? color : undefined,
        }}
      >
        {/* Edge glow — radiates from borders toward cursor, tinted by stage color */}
        <div
          className={styles.tiltEdgeGlow}
          style={{
            opacity: hovering ? 1 : 0,
            boxShadow: `inset 0 0 30px 8px rgba(${r},${g},${b},0.08)`,
            mask: `radial-gradient(ellipse at ${glowPos.x}% ${glowPos.y}%, transparent 20%, black 70%)`,
            WebkitMask: `radial-gradient(ellipse at ${glowPos.x}% ${glowPos.y}%, transparent 20%, black 70%)`,
          }}
        />

        {/* Soft inner highlight near cursor */}
        <div
          className={styles.tiltInnerGlow}
          style={{
            opacity: hovering ? 1 : 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(${r},${g},${b},0.06) 0%, transparent 50%)`,
          }}
        />

        {/* Border pulse */}
        <div
          className={`${styles.tiltBorderPulse} ${hovering ? styles.tiltBorderPulseActive : ''}`}
          style={{ '--stage-color': color } as React.CSSProperties}
        />

        <div className={styles.stageContent}>
          {stage.subtitle && (
            <span className={styles.stageSubtitle} style={{ color }}>{stage.subtitle}</span>
          )}
          <h3 className={styles.stageTitle}>{stage.title}</h3>
          <p className={styles.stageDescription}>{stage.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Section ─── */
export default function IdeologySection({ data }: IdeologyProps) {
  return (
    <section className={styles.ideologySection} id="ideology">
      <div className={common.sectionContainer}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={common.sectionTitle}>{data.title}</h2>
          <div className={common.titleDecoration} />
          {data.subtitle && (
            <p className={common.sectionDescription}>{data.subtitle}</p>
          )}
        </motion.div>

        <div className={styles.timelineGrid}>
          {data.stages.map((stage, i) => {
            const bentoMap = [
              styles.bentoWide,   // Awareness — spans 2 cols
              styles.bentoTall,   // Consideration — spans 2 rows
              '',                  // Decision — normal
              '',                  // Conversion — normal
              styles.bentoWideTablet1,   // Retention — spans 2 cols (desktop) but 1 on tablet
            ]
            return (
              <TiltCard
                key={i}
                stage={stage}
                index={i}
                color={stageColors[i % stageColors.length]}
                glow={stageGlowColors[i % stageGlowColors.length]}
                bentoClass={bentoMap[i] || ''}
              />
            )
          })}

          {/* CTA card to balance the bento grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`${styles.tiltCardWrapper} ${styles.ctaTabletWide}`}
          >
            <a href="/calculator" className={styles.bentoCta}>
              <span className={styles.bentoCtaLabel}>Ready?</span>
              <span className={styles.bentoCtaHeadline}>Run Your Commercial EKG</span>
              <span className={styles.bentoCtaArrow}>→</span>
            </a>
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
