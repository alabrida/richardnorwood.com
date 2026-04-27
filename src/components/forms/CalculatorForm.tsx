'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import styles from './AuthForm.module.css'

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
    defaultValues: { q1: '', q2: '', q3: '', q4: '', q5: '' },
    onSubmit: async ({ value }) => {
      setAnalyzing(true)
      
      // Calculate qualification score and route to appropriate next step
      setTimeout(() => {
        setAnalyzing(false)
        toast.message('Analysis Complete', {
          description: 'Your results are ready. Redirecting you to book a review...'
        })
        
        // Push user to contact to book with payload
        setTimeout(() => {
          const formattedPayload = `[ REVENUE HEALTH CHECK RESULTS ]
Data Migration: ${value.q1}
Central Repository: ${value.q2}
Attribution: ${value.q3}
Infrastructure: ${value.q4}
Estimated AARR: ${value.q5}

I'd like to review my results together.`

          const params = new URLSearchParams()
          params.set('source', 'ekg')
          params.set('payload', formattedPayload)
          window.location.href = `/contact?${params.toString()}`
        }, 3000)
      }, 5000)
    }
  })

  return (
    <div className={styles.formContainer} style={{ width: '100%', maxWidth: 700, minHeight: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      {analyzing ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.inputGroup} style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--color-secondary)', fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>⟳</div>
          <h2 style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>Analyzing Your Responses...</h2>
          <p style={{ color: 'var(--color-text-subtle)', marginTop: 'var(--space-2)' }}>Building your personalized assessment based on your answers.</p>
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
              <h2 style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)' }}>All Set.</h2>
              <p style={{ color: 'var(--color-text-subtle)', margin: 'var(--space-4) 0 var(--space-8)' }}>Submit your answers to see where your commercial system is strongest — and where to focus next.</p>
              
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <button type="submit" disabled={!canSubmit || isSubmitting} className={styles.submitBtn} style={{ width: '100%', maxWidth: 300, margin: '0 auto' }}>
                    See My Results
                  </button>
                )}
              </form.Subscribe>
            </motion.div>
          )}
        </form>
      )}
    </div>
  )
}
