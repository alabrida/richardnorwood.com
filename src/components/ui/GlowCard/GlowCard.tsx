'use client'

import React, { useRef, useCallback, useState } from 'react'
import styles from './GlowCard.module.css'

/* ── Default gold glow (site accent) ── */
const DEFAULT_GLOW = { r: 240, g: 180, b: 41 }

interface GlowCardProps {
  children: React.ReactNode
  /** CSS class applied to the inner card div (add your own padding, bg, border-radius, etc.) */
  className?: string
  /** CSS class applied to the outer wrapper div */
  wrapperClassName?: string
  /** RGB glow color — defaults to gold (secondary brand color) */
  glow?: { r: number; g: number; b: number }
  /** CSS variable color for border pulse (e.g., 'var(--stage-awareness)') */
  glowColor?: string
  /** Max tilt degrees — defaults to 2.5 */
  tiltDeg?: number
  /** Pass-through style */
  style?: React.CSSProperties
}

export default function GlowCard({
  children,
  className = '',
  wrapperClassName = '',
  glow = DEFAULT_GLOW,
  glowColor,
  tiltDeg = 2.5,
  style,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovering, setHovering] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      setTilt({
        rotateX: ((centerY - y) / centerY) * tiltDeg,
        rotateY: ((x - centerX) / centerX) * tiltDeg,
      })
      setGlowPos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      })
    },
    [tiltDeg],
  )

  const handleMouseLeave = useCallback(() => {
    setHovering(false)
    setTilt({ rotateX: 0, rotateY: 0 })
    setGlowPos({ x: 50, y: 50 })
  }, [])

  const { r, g, b } = glow

  return (
    <div className={`${styles.glowCardWrapper} ${wrapperClassName}`}>
      <div
        ref={cardRef}
        className={`${styles.glowCard} ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          borderColor: hovering && glowColor ? glowColor : undefined,
          ...style,
        }}
      >
        {/* Edge glow — radiates from borders toward cursor */}
        <div
          className={styles.edgeGlow}
          style={{
            opacity: hovering ? 1 : 0,
            boxShadow: `inset 0 0 30px 8px rgba(${r},${g},${b},0.08)`,
            mask: `radial-gradient(ellipse at ${glowPos.x}% ${glowPos.y}%, transparent 20%, black 70%)`,
            WebkitMask: `radial-gradient(ellipse at ${glowPos.x}% ${glowPos.y}%, transparent 20%, black 70%)`,
          }}
        />

        {/* Soft inner highlight near cursor */}
        <div
          className={styles.innerGlow}
          style={{
            opacity: hovering ? 1 : 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(${r},${g},${b},0.06) 0%, transparent 50%)`,
          }}
        />

        {/* Border pulse */}
        <div
          className={`${styles.borderPulse} ${hovering ? styles.borderPulseActive : ''}`}
          style={{ '--glow-color': glowColor || `rgb(${r},${g},${b})` } as React.CSSProperties}
        />

        {children}
      </div>
    </div>
  )
}
