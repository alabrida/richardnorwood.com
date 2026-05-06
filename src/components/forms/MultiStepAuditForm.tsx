'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useForm } from '@tanstack/react-form'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import {
  auditSteps as steps,
  getFirstIncompleteAuditStepIndex,
  isAuditAnswered,
  normalizeAuditResponses,
  splitQuestionLabel,
  type AuditResponses,
} from '@/lib/audit'

interface ClientProfile {
  id: string
  slug: string
  company_name: string
  brand_colors?: {
    primary: string
  }
}

export default function MultiStepAuditForm({ profile }: { profile: ClientProfile }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false)
  const [isEditingSubmitted, setIsEditingSubmitted] = useState(false)
  const [showFloatingNav, setShowFloatingNav] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const brand = profile.brand_colors || { primary: '#2BB6F6' }
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY
      const windowHeight = window.innerHeight
      const bodyHeight = document.body.offsetHeight
      const footerElement = document.querySelector('footer')
      const footerHeight = footerElement?.clientHeight || 0
      const footerTop = bodyHeight - footerHeight

      setShowScrollTop(scrollPos > 300)
      setShowFloatingNav(scrollPos < footerTop - windowHeight - 20)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const saveToDatabase = useCallback(async (values: AuditResponses, isFinal = false) => {
    setIsSaving(true)
    const { error } = await supabase
      .from('audit_responses')
      .upsert({
        client_id: profile.id,
        responses: values,
        is_submitted: isFinal,
        updated_at: new Date().toISOString()
      }, { onConflict: 'client_id' })

    if (error) {
      console.error('Save error:', error)
      toast.error('Error auto-saving progress')
    }

    setIsSaving(false)
    return !error
  }, [profile.id, supabase])

  const form = useForm({
    defaultValues: {} as AuditResponses,
    onSubmit: async ({ value }) => {
      if (!isSubmitting) return

      const notificationResponse = await fetch('/api/audit/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: profile.id, responses: value })
      })

      if (!notificationResponse.ok) {
        toast.error('Audit submission failed. Please save your progress and contact support.')
        return
      }

      setIsAlreadySubmitted(true)
      setIsEditingSubmitted(false)
      toast.success('Audit submitted successfully!')
      router.push(`/portal/${profile.slug}/dashboard`)
    }
  })

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase
        .from('audit_responses')
        .select('responses, is_submitted')
        .eq('client_id', profile.id)
        .maybeSingle()

      const savedResponses = normalizeAuditResponses(data?.responses)
      setIsAlreadySubmitted(Boolean(data?.is_submitted))
      setIsEditingSubmitted(false)

      if (Object.keys(savedResponses).length > 0) {
        form.reset(savedResponses)
        setCurrentStep(getFirstIncompleteAuditStepIndex(savedResponses))
      }
    }

    loadData()
  }, [profile.id, supabase, form])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isSubmitting && (!isAlreadySubmitted || isEditingSubmitted) && Object.keys(form.state.values).length > 0) {
        saveToDatabase(form.state.values)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [form.state.values, isAlreadySubmitted, isEditingSubmitted, isSubmitting, saveToDatabase])

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  const isCurrentStepValid = useMemo(() => {
    return currentStepData.questions.every((question) => isAuditAnswered(form.state.values[question.id]))
  }, [currentStepData, form.state.values])
  const isReadOnly = isAlreadySubmitted && !isEditingSubmitted

  const handleNext = () => {
    if (!isCurrentStepValid) {
      toast.error('Please answer all questions on this page to proceed.')
      return
    }

    setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSaveAndExit = async () => {
    await saveToDatabase(form.state.values, isAlreadySubmitted)
    toast.success('Progress saved. Returning to dashboard...')
    router.push(`/portal/${profile.slug}/dashboard`)
  }

  const handleCompleteClick = () => {
    if (!isCurrentStepValid) {
      toast.error('Please answer all questions before submitting.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      form.handleSubmit()
    }, 10)
  }

  return (
    <div ref={containerRef} style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 'var(--space-20)', position: 'relative' }}>
      <AnimatePresence>
        {showFloatingNav && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            style={{ position: 'fixed', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', width: '160px', zIndex: 100 }}
            className="hidden-mobile"
          >
            <div style={{ background: 'var(--glass-bg-heavy)', backdropFilter: 'blur(var(--glass-blur))', border: '1px solid var(--color-secondary-light)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', boxShadow: '0 10px 40px rgba(0,0,0,0.6)' }}>
              <p style={{ color: 'var(--color-secondary)', fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 'var(--space-3)', letterSpacing: '0.1em' }}>Navigation</p>
              <Link
                href={`/portal/${profile.slug}/dashboard`}
                style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: 'var(--text-xs)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
              >
                &larr; Portal Home
              </Link>
              <div style={{ marginTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 9, fontWeight: 'bold' }}>Progress Saved</p>
                <div style={{ width: '100%', height: 2, background: 'var(--color-border)', marginTop: 4, borderRadius: 1 }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: brand.primary, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && showFloatingNav && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed',
              right: '1.5rem',
              bottom: '2rem',
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dark))',
              border: 'none',
              color: 'var(--color-text-inverse)',
              cursor: 'pointer',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(240, 180, 41, 0.3)',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}
            aria-label="Back to top"
          >
            &uarr;
          </motion.button>
        )}
      </AnimatePresence>

      <div style={{ width: '100%', height: 4, background: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-8)', overflow: 'hidden' }}>
        <motion.div
          className="audit-progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          style={{ height: '100%', background: brand.primary }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-6)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', minWidth: 0 }}>
          <div style={{ position: 'relative', width: 104, height: 58, flexShrink: 0, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.03)', overflow: 'hidden' }}>
            <Image
              src="/images/riw-logo.png"
              alt={`${profile.company_name} logo`}
              fill
              sizes="104px"
              style={{ objectFit: 'contain', padding: 6 }}
              priority={false}
            />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-2xl)',
            background: 'linear-gradient(180deg, var(--color-text) 0%, var(--color-text-muted) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            {currentStepData.title}
          </h1>
        </div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontWeight: 'bold' }}>
          Step {currentStep + 1} of {steps.length} {isSaving && ' (Saving...)'}
        </div>
      </div>

      {isReadOnly && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', background: 'rgba(32, 201, 151, 0.08)', border: '1px solid rgba(32, 201, 151, 0.28)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)' }}>
            Submitted audit responses are locked for review. Use edit mode only if a correction is needed.
          </p>
          <button
            type="button"
            onClick={() => setIsEditingSubmitted(true)}
            style={{ background: brand.primary, color: '#000', border: 'none', borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-6)', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-heading)' }}
          >
            Edit responses
          </button>
        </div>
      )}

      <div style={{ background: 'var(--glass-bg-heavy)', backdropFilter: 'blur(var(--glass-blur))', WebkitBackdropFilter: 'blur(var(--glass-blur))', border: `1px solid ${brand.primary}33`, borderRadius: 'var(--radius-xl)', padding: 'var(--space-10)' }}>
        <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {currentStepData.questions.map((question) => (
              <form.Field key={question.id} name={question.id}>
                {(field) => {
                  const hasValue = isAuditAnswered(field.state.value)
                  const controlClass = `audit-control ${hasValue ? 'audit-control-complete' : ''}`
                  const { lead, prompt } = splitQuestionLabel(question.label)

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
                    >
                      <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                        {lead && (
                          <span style={{ color: brand.primary, fontWeight: 800, fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            {lead}
                          </span>
                        )}
                        <span style={{ color: 'white', fontWeight: 500, fontSize: 'var(--text-base)', lineHeight: 'var(--leading-snug)' }}>
                          {prompt}
                        </span>
                      </label>

                      {question.type === 'textarea' ? (
                        <textarea
                          value={(field.state.value as string) || ''}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder={question.placeholder}
                          className={controlClass}
                          disabled={isReadOnly}
                          style={{ minHeight: 120, resize: 'vertical' }}
                        />
                      ) : question.type === 'scale' ? (
                        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <motion.button
                              key={num}
                              type="button"
                              onClick={() => field.handleChange(num)}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.96 }}
                              className="audit-choice-button"
                              disabled={isReadOnly}
                              style={{
                                flex: '1 1 44px',
                                padding: 'var(--space-3)',
                                background: field.state.value === num ? brand.primary : '#000',
                                border: `1px solid ${field.state.value === num ? brand.primary : 'var(--color-border)'}`,
                                borderRadius: 'var(--radius-md)',
                                color: field.state.value === num ? 'black' : 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                              }}
                            >
                              {num}
                            </motion.button>
                          ))}
                        </div>
                      ) : question.type === 'yesno' ? (
                        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                          {['Yes', 'No'].map((option) => (
                            <motion.button
                              key={option}
                              type="button"
                              onClick={() => field.handleChange(option)}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              className="audit-choice-button"
                              disabled={isReadOnly}
                              style={{
                                flex: 1,
                                padding: 'var(--space-3)',
                                background: field.state.value === option ? brand.primary : '#000',
                                border: `1px solid ${field.state.value === option ? brand.primary : 'var(--color-border)'}`,
                                borderRadius: 'var(--radius-md)',
                                color: field.state.value === option ? 'black' : 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                              }}
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={(field.state.value as string) || ''}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder={question.placeholder || (question.type === 'percentage' ? 'Example: 25%' : question.type === 'hours' ? 'Example: 4 hours/week' : '')}
                          className={controlClass}
                          disabled={isReadOnly}
                        />
                      )}

                      {question.helperText && (
                        <motion.p
                          initial={{ opacity: 0.72 }}
                          animate={{ opacity: hasValue ? 0.62 : 0.92 }}
                          style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', lineHeight: '1.5', margin: 0 }}
                        >
                          <span style={{ color: brand.primary, fontWeight: 'bold' }}>Guidance:</span> {question.helperText}
                        </motion.p>
                      )}
                    </motion.div>
                  )
                }}
              </form.Field>
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-12)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={() => { setCurrentStep((prev) => Math.max(0, prev - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                disabled={currentStep === 0}
                style={{ opacity: currentStep === 0 ? 0 : 1, background: 'transparent', border: '1px solid var(--color-border)', color: 'white', padding: 'var(--space-3) var(--space-8)', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}
              >
                Back
              </button>

              {isReadOnly ? (
                <Link
                  href={`/portal/${profile.slug}/dashboard`}
                  style={{
                    background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dark))',
                    color: 'var(--color-text-inverse)',
                    border: 'none',
                    padding: 'var(--space-3) var(--space-12)',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-heading)',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(240, 180, 41, 0.3)'
                  }}
                >
                  Return to Dashboard
                </Link>
              ) : currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  style={{
                    background: isCurrentStepValid ? 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dark))' : 'var(--color-border)',
                    color: isCurrentStepValid ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                    border: 'none',
                    padding: 'var(--space-3) var(--space-12)',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 'bold',
                    cursor: isCurrentStepValid ? 'pointer' : 'not-allowed',
                    fontFamily: 'var(--font-heading)',
                    boxShadow: isCurrentStepValid ? '0 4px 14px rgba(240, 180, 41, 0.3)' : 'none'
                  }}
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCompleteClick}
                  disabled={isSubmitting || !isCurrentStepValid}
                  style={{
                    background: isCurrentStepValid ? 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dark))' : 'var(--color-border)',
                    color: isCurrentStepValid ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                    border: 'none',
                    padding: 'var(--space-3) var(--space-12)',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 'bold',
                    cursor: isCurrentStepValid ? 'pointer' : 'not-allowed',
                    fontFamily: 'var(--font-heading)',
                    boxShadow: isCurrentStepValid ? '0 4px 14px rgba(240, 180, 41, 0.3)' : 'none'
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Audit'}
                </button>
              )}
            </div>

            {!isReadOnly && (
              <button
                type="button"
                onClick={handleSaveAndExit}
                style={{ alignSelf: 'center', background: 'transparent', border: 'none', color: 'var(--color-secondary)', fontSize: 'var(--text-sm)', cursor: 'pointer', textDecoration: 'none', fontWeight: 'bold' }}
                onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                Save and finish later
              </button>
            )}
          </div>
        </form>
      </div>

      <style jsx>{`
        .audit-progress-fill {
          position: relative;
          overflow: hidden;
        }

        .audit-progress-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
          transform: translateX(-100%);
          animation: auditProgressSheen 2.6s ease-in-out infinite;
        }

        @keyframes auditProgressSheen {
          0%, 45% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .audit-control {
          width: 100%;
          background: #000;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: var(--space-4);
          color: white;
          font-family: inherit;
          outline: none;
          transition:
            border-color var(--duration-fast) var(--ease-out),
            box-shadow var(--duration-fast) var(--ease-out),
            background var(--duration-fast) var(--ease-out),
            transform var(--duration-fast) var(--ease-out);
        }

        .audit-control::placeholder {
          color: var(--color-text-subtle);
          opacity: 0.82;
        }

        .audit-control:hover {
          border-color: rgba(32, 201, 151, 0.35);
        }

        .audit-control:focus {
          background: rgba(0, 0, 0, 0.86);
          border-color: var(--color-accent);
          box-shadow: 0 0 0 1px rgba(32, 201, 151, 0.18), 0 0 22px rgba(32, 201, 151, 0.1);
          transform: translateY(-1px);
        }

        .audit-control-complete {
          border-color: rgba(32, 201, 151, 0.45);
          box-shadow: inset 3px 0 0 rgba(32, 201, 151, 0.55);
        }

        .audit-choice-button {
          transition:
            border-color var(--duration-fast) var(--ease-out),
            box-shadow var(--duration-fast) var(--ease-out),
            background var(--duration-fast) var(--ease-out);
        }

        .audit-choice-button:hover,
        .audit-choice-button:focus-visible {
          border-color: var(--color-accent) !important;
          box-shadow: 0 0 0 1px rgba(32, 201, 151, 0.12), 0 10px 24px rgba(0, 0, 0, 0.28);
        }

        .audit-control:disabled,
        .audit-choice-button:disabled {
          cursor: default;
          opacity: 0.78;
        }

        .audit-choice-button:disabled:hover {
          box-shadow: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .audit-progress-fill::after {
            animation: none;
          }
        }

        @media (max-width: 1240px) {
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
