'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  { q: "What is the difference between Phase II and Phase III?", a: "Phase II is focused on generating intent through landing pages and active marketing. Phase III transfers everything over to your own sovereign AWS/Cloud infrastructure so you own the code explicitly without Alabrida holding it." },
  { q: "Can I cancel at any time?", a: "Yes. Phase engagements are month-to-month after the initial commitment period is met." },
  { q: "Is the Alabrida SaaS included?", a: "Yes, all active engagements come with Battleship-tier access to the Alabrida Dashboard, including historical tracking and the AI Landing Page generator." }
]

export default function PricingFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section style={{ maxWidth: 800, margin: 'var(--space-16) auto', padding: '0 var(--space-4)' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>Frequently Asked Questions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <button 
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              style={{ width: '100%', padding: 'var(--space-4)', background: 'transparent', border: 'none', color: 'var(--color-text)', fontFamily: 'var(--font-heading)', fontWeight: 'bold', fontSize: 'var(--text-lg)', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
            >
              {faq.q}
              <span>{openIdx === i ? '−' : '+'}</span>
            </button>
            <AnimatePresence>
              {openIdx === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <p style={{ padding: '0 var(--space-4) var(--space-4)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-relaxed)' }}>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
