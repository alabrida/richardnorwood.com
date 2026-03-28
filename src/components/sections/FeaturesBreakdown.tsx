'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function FeaturesBreakdown() {
  const breakdown = [
    { title: "The Dashboard", text: "Free tier users can see the aggregate score. Paid tiers unlock full diagnostic visibility." },
    { title: "Scorecard History", text: "Premium capability to view historical snapshots of your revenue trajectory over time." },
    { title: "Pro Tools (Chat & Gen)", text: "Phase III partners get exclusive access to the AI Chat and the Landing Page Generator engines." },
  ]

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto var(--space-16)', padding: '0 var(--space-4)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        {breakdown.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-surface-elevated)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)' }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>{item.title}</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
