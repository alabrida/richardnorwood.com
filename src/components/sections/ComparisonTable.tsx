'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function ComparisonTable() {
  const features = [
    { name: "Digital Perimeter", p1: true, p2: true, p3: true },
    { name: "Branded Microsite", p1: true, p2: true, p3: true },
    { name: "Siloed Landing Pages", p1: false, p2: true, p3: true },
    { name: "Reputation Automation", p1: false, p2: true, p3: true },
    { name: "Custom Billing Architecture", p1: false, p2: false, p3: true },
    { name: "Sovereign Cloud Transfer", p1: false, p2: false, p3: true },
  ]

  return (
    <section style={{ maxWidth: 1000, margin: 'var(--space-16) auto', padding: '0 var(--space-4)' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>Detailed Feature Matrix</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--color-text)' }}>
          <thead>
            <tr style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: 'var(--space-4)', textAlign: 'left', minWidth: 200 }}>Feature</th>
              <th style={{ padding: 'var(--space-4)', textAlign: 'center' }}>Phase I</th>
              <th style={{ padding: 'var(--space-4)', textAlign: 'center', color: 'var(--color-secondary)' }}>Phase II</th>
              <th style={{ padding: 'var(--space-4)', textAlign: 'center' }}>Phase III</th>
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <motion.tr 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ borderBottom: '1px solid var(--color-surface-elevated)' }}
              >
                <td style={{ padding: 'var(--space-4)' }}>{f.name}</td>
                <td style={{ padding: 'var(--space-4)', textAlign: 'center', color: f.p1 ? 'var(--color-accent)' : 'var(--color-text-subtle)' }}>{f.p1 ? '✓' : '−'}</td>
                <td style={{ padding: 'var(--space-4)', textAlign: 'center', color: f.p2 ? 'var(--color-accent)' : 'var(--color-text-subtle)' }}>{f.p2 ? '✓' : '−'}</td>
                <td style={{ padding: 'var(--space-4)', textAlign: 'center', color: f.p3 ? 'var(--color-accent)' : 'var(--color-text-subtle)' }}>{f.p3 ? '✓' : '−'}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
