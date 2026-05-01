'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import styles from './AuthForm.module.css'
import GlowCard from '@/components/ui/GlowCard'

const questions = [
  { id: 'q1', text: 'How much time per week does your team spend manually migrating data between tools?', options: ['0-5 Hours', '5-15 Hours', '15+ Hours (Critical Leak)'] },
  { id: 'q2', text: 'Do you have a managed central repository containing all customer metrics?', options: ['Yes', 'Partially, but fragmented', 'No, strictly isolated tools'] },
  { id: 'q3', text: 'How do you measure marketing attribution today?', options: ['First/Last touch deterministic accuracy', 'Rough heuristics and guesswork', 'No systematic attribution'] },
  { id: 'q4', text: 'How secure is your infrastructure sovereignty? If a vendor doubled rates tomorrow, could you easily port away?', options: ['Fully sovereign (Own DB/Cloud)', 'Slightly entangled', 'Totally locked into third-party vendors'] },
  { id: 'q5', text: 'Identify your estimated Annual Revenue (AARR)', options: ['$0 - $1MM (Emerging)', '$1MM - $5MM (Orchestrating)', '$5MM+ (Scale)'] },
]

export default function CalculatorForm() {
  const [step, setStep] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)
  
  const form = useForm({
    defaultValues: { email: '', q1: '', q2: '', q3: '', q4: '', q5: '' },
    onSubmit: async ({ value }) => {
      setAnalyzing(true)
      
      try {
        const response = await fetch('/api/health-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: value.email, responses: value }),
        });

        if (!response.ok) throw new Error('Failed to send report');

        setAnalyzing(false)
        toast.message('Health Check Complete', {
          description: 'Your report is being generated. Check your email shortly.'
        })
        
        // Push user to contact to book with payload
        setTimeout(() => {
          const formattedPayload = `[ REVENUE HEALTH CHECK RESULTS ]
Email: ${value.email}
Data Migration: ${value.q1}
Central Repository: ${value.q2}
Attribution: ${value.q3}
Infrastructure: ${value.q4}
Estimated AARR: ${value.q5}

I'd like to review my maturity category together.`

          const params = new URLSearchParams()
          params.set('source', 'health-check')
          params.set('payload', formattedPayload)
          window.location.href = `/contact?${params.toString()}`
        }, 3000)
      } catch (error) {
        setAnalyzing(false)
        toast.error('Submission Failed', {
          description: 'Please try again or contact me directly.'
        })
      }
    }
  })

  return (
    <GlowCard className={styles.authCard} wrapperClassName={styles.formContainer} glowColor="var(--color-secondary)">
      <div className={styles.authContent} style={{ minHeight: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {analyzing ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.inputGroup} style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--color-secondary)', fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>⟳</div>
            <h2 style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>Running Health Check...</h2>
            <p style={{ color: 'var(--color-text-subtle)', marginTop: 'var(--space-2)' }}>Analyzing your system signals to determine your Revenue Maturity Category.</p>
          </motion.div>
        ) : (
          <form 
            onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit() }}
            className={styles.formElement} style={{ minHeight: 300 }}
          >
            {step < questions.length ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={{ color: 'var(--color-secondary)', fontSize: 'var(--text-sm)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
                    Question {step + 1} of {questions.length}
                  </div>
                  
                  <h3 style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-8)' }}>
                    {questions[step].text}
                  </h3>
    
                  <form.Field
                    name={questions[step].id as "q1"|"q2"|"q3"|"q4"|"q5"}
                  >
                    {(field) => (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        {questions[step].options.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              field.handleChange(opt as any)
                              setTimeout(() => setStep(step + 1), 300)
                            }}
                            style={{
                              background: field.state.value === opt ? 'rgba(240, 180, 41, 0.2)' : 'var(--color-bg-alt)',
                              border: `1px solid ${field.state.value === opt ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                              color: 'var(--color-text)',
                              padding: 'var(--space-4)',
                              borderRadius: 'var(--radius-md)',
                              textAlign: 'left',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </form.Field>
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
                <h2 style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)' }}>Health Check Complete.</h2>
                <p style={{ color: 'var(--color-text-subtle)', margin: 'var(--space-4) 0 var(--space-8)' }}>Enter your professional email to receive your Maturity Category report and see if you qualify for the full 22-point diagnostic.</p>
                
                <form.Field name="email">
                  {(field) => (
                    <div style={{ marginBottom: 'var(--space-8)' }}>
                      <input
                        type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your professional email"
                        required
                        style={{
                          width: '100%',
                          background: 'var(--color-bg-alt)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text)',
                          padding: 'var(--space-4)',
                          borderRadius: 'var(--radius-md)',
                          fontSize: 'var(--text-base)',
                          marginBottom: 'var(--space-2)'
                        }}
                      />
                    </div>
                  )}
                </form.Field>

                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <button type="submit" disabled={!canSubmit || isSubmitting} className={styles.submitBtn} style={{ width: '100%', maxWidth: 300, margin: '0 auto' }}>
                      {isSubmitting ? 'Sending...' : 'Get My Results'}
                    </button>
                  )}
                </form.Subscribe>
              </motion.div>
            )}
          </form>
        )}
      </div>
    </GlowCard>
  )
}
