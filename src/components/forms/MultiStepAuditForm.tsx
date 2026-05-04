'use client'

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useForm } from '@tanstack/react-form'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface Question {
  id: string
  label: string
  type: 'scale' | 'text' | 'percentage' | 'hours' | 'yesno' | 'textarea'
  placeholder?: string
  helperText?: string
}

interface AuditStep {
  title: string
  questions: Question[]
}

function splitQuestionLabel(label: string) {
  const separatorIndex = label.indexOf(':')
  if (separatorIndex === -1) {
    return { lead: '', prompt: label }
  }

  return {
    lead: label.slice(0, separatorIndex),
    prompt: label.slice(separatorIndex + 1).trim()
  }
}

const steps: AuditStep[] = [
  {
    title: 'Part 1: Revenue & Financial Mechanics',
    questions: [
      {
        id: 'payout_complexity',
        label: 'Payout Complexity: On a scale of 1-10, how much manual effort is required to calculate and disperse current semi-monthly contractor payments?',
        type: 'scale',
        helperText: 'A rough score is fine. Think about how much spreadsheet work, manual review, and follow-up is needed before payments feel ready.'
      },
      {
        id: 'credentialing_split',
        label: 'The Credentialing Split: What percentage of your current contractors are independently credentialed on their own panels?',
        type: 'percentage',
        placeholder: 'Example: 60%',
        helperText: 'Estimate if needed: independently credentialed contractors divided by total contractors.'
      },
      {
        id: 'lead_attribution',
        label: 'Lead Attribution: Over the last 90 days, how many new clients were sourced directly by the Practice versus contractors?',
        type: 'textarea',
        placeholder: 'Example: Practice: 12, Contractors: 5, Unsure: 3',
        helperText: 'Best estimate is enough. Use ranges if exact attribution is not available.'
      },
      {
        id: 'billing_load',
        label: 'Administrative Billing Load: How many hours per week do you spend chasing insurance rejections or correcting errors?',
        type: 'hours',
        placeholder: 'Example: 4 hours/week',
        helperText: 'Include claim follow-up, rejected claims, corrections, payer calls, and any rework after submission.'
      },
      {
        id: 'marketing_overhead',
        label: 'Marketing Overhead: Estimated monthly "Cost per Provider" for Psychology Today and other platforms?',
        type: 'text',
        placeholder: 'Example: $900/month across 6 providers, or about $150/provider',
        helperText: 'If exact cost per provider is unclear, total monthly platform spend is acceptable.'
      },
      {
        id: 'collection_lag',
        label: 'Collection Lag: Average duration from "Date of Service" to "Funds Deposited"?',
        type: 'text',
        placeholder: 'Example: 21 days',
        helperText: 'Estimate the average time from completed session to money landing in the account.'
      },
      {
        id: 'incentive_gap',
        label: 'The Incentive Gap: Do you have a mechanism to reward contractors who source their own private-pay clients?',
        type: 'yesno',
        helperText: 'Answer based on the current operating reality. We can refine the details later.'
      }
    ]
  },
  {
    title: 'Part 2: Physical Footprint & Facility Governance',
    questions: [
      {
        id: 'peak_capacity',
        label: 'Peak Capacity Friction: Specific days/hours where the physical suite is at 100% occupancy?',
        type: 'textarea',
        placeholder: 'Example: Tuesdays 4-7 PM and Saturdays 9-12 are consistently full.',
        helperText: 'A pattern is more useful than perfection here. List the times that feel hardest to schedule.'
      },
      {
        id: 'shadow_hours',
        label: 'The "Shadow" Hours: How many referral inquiries go unfilled for 7-9 AM or 7-9 PM slots?',
        type: 'text',
        placeholder: 'Example: 3-5 inquiries/month, or not currently tracked',
        helperText: 'If this is not tracked, a practical estimate or "not currently tracked" is acceptable.'
      },
      {
        id: 'reset_effort',
        label: 'The Reset Effort: How much time is spent daily resetting physical rooms?',
        type: 'hours',
        placeholder: 'Example: 30 minutes/day',
        helperText: 'Include room reset, supplies, cleaning touchpoints, and setup work.'
      },
      {
        id: 'customization_audit',
        label: 'Customization Audit: Any items in suites that cannot be removed/packed within 2 hours?',
        type: 'yesno',
        helperText: 'A simple yes/no is enough. If yes, we will identify the specific friction later.'
      },
      {
        id: 'access_control',
        label: 'Access Control: Who holds keys/codes and what is the protocol for off-hours entry?',
        type: 'textarea',
        placeholder: 'Example: Owner, office manager, and 4 contractors have codes; after-hours access is by approval.',
        helperText: 'List the practical protocol, even if it is informal today.'
      },
      {
        id: 'turnkey_status',
        label: 'Suite "Ready-to-Wear" Status: Are offices fully functional "Turn-Key" or are you paying for unused furniture?',
        type: 'textarea',
        placeholder: 'Example: Two suites are turnkey; one has unused furniture/storage friction.',
        helperText: 'A short room-by-room note is enough if the full inventory is not immediately available.'
      }
    ]
  },
  {
    title: 'Part 3: Digital Engine & Remote Logic',
    questions: [
      {
        id: 'lead_accountability',
        label: 'Lead Accountability: Method for verifying initial HIPAA-compliant contact by contractors?',
        type: 'textarea',
        placeholder: 'Example: Intake coordinator assigns leads; contractor confirms first contact in SimplePractice.',
        helperText: 'If there is no formal verification step, write what usually happens today.'
      },
      {
        id: 'conversion_visibility',
        label: 'Conversion Visibility: How do you track "Speed-to-Lead" (inquiry to intake)?',
        type: 'textarea',
        placeholder: 'Example: We track inquiry date and intake date manually; response time is not currently reported.',
        helperText: 'It is okay to say this is not currently tracked. That is useful signal.'
      },
      {
        id: 'software_fragmentation',
        label: 'Software Fragmentation: List digital tools used by contractors that the Practice lacks admin access to.',
        type: 'textarea',
        placeholder: 'Example: personal Calendly, Gmail, Google Voice, private notes, contractor-owned EHR access.',
        helperText: 'Name the tools you know. Unknowns can be marked as "unsure."'
      },
      {
        id: 'data_sovereignty',
        label: 'Data Sovereignty: What is the "Digital Offboarding" process for clinical records?',
        type: 'textarea',
        placeholder: 'Example: Records remain in SimplePractice; contractor access is removed after final review.',
        helperText: 'Describe the current process, even if it is informal or handled case by case.'
      },
      {
        id: 'managed_workspace',
        label: 'Managed Workspace: Are contractors using personal cell numbers or practice-managed VoIP?',
        type: 'textarea',
        placeholder: 'Example: Most use practice VoIP; two still use personal numbers for established clients.',
        helperText: 'A mixed answer is fine. The goal is to see where communication ownership lives.'
      }
    ]
  },
  {
    title: 'Part 4: Clinical Standards & Quality Control',
    questions: [
      {
        id: 'documentation_debt',
        label: 'Documentation Debt: How many session notes are currently overdue (beyond 48 hours)?',
        type: 'text',
        placeholder: 'Example: 8 notes overdue',
        helperText: 'A current snapshot is enough. If the number moves daily, use today or your best recent estimate.'
      },
      {
        id: 'clinical_intervention',
        label: 'Clinical Intervention: How many interruptions in the last 30 days for contractor client crises?',
        type: 'text',
        placeholder: 'Example: 2 interruptions in the last 30 days',
        helperText: 'Include escalations, urgent consultations, or leadership interruptions tied to client risk.'
      },
      {
        id: 'golden_thread',
        label: 'The "Golden Thread" Audit: Are treatment plans consistently updated every 90 days across all charts?',
        type: 'yesno',
        helperText: 'Answer based on what you trust operationally today, not what the policy says should happen.'
      },
      {
        id: 'churn_logic',
        label: 'Discharge/Churn Logic: Current "Drop-off" rate (1-3 sessions) for Practice-referred leads?',
        type: 'percentage',
        placeholder: 'Example: 18%',
        helperText: 'Estimate: clients who leave after 1-3 sessions divided by new starts.'
      },
      {
        id: 'skill_mapping',
        label: 'Skill-to-Patient Mapping: Top 3 clinical specialties requested by new inquiries?',
        type: 'text',
        placeholder: 'Example: trauma, couples therapy, adolescent anxiety',
        helperText: 'Use the top requests you hear most often. Exact counts are not required.'
      },
      {
        id: 'brand_consistency',
        label: 'Brand Consistency: Do contractors use RIW branded templates for homework?',
        type: 'yesno',
        helperText: 'A simple yes/no is enough. If usage varies, choose the answer that reflects the majority.'
      },
      {
        id: 'expansion_readiness',
        label: 'The "Expansion" Readiness: If you added 2 providers tomorrow, what admin bottleneck breaks first?',
        type: 'textarea',
        placeholder: 'Example: Intake routing, room availability, billing review, or onboarding capacity.',
        helperText: 'Write the first bottleneck that comes to mind. This is meant to surface pressure, not test you.'
      }
    ]
  }
]

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
  const [showFloatingNav, setShowFloatingNav] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const brand = profile.brand_colors || { primary: '#2BB6F6' }
  const containerRef = useRef<HTMLDivElement>(null)

  // Monitor scroll for "Back to Top" and "Footer Collision"
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY
      const windowHeight = window.innerHeight
      const bodyHeight = document.body.offsetHeight
      const footerElement = document.querySelector('footer')
      const footerHeight = footerElement?.offsetHeight || 0
      const footerTop = bodyHeight - footerHeight

      // Show back to top if scrolled enough
      setShowScrollTop(scrollPos > 300)

      // Hide floating elements exactly 20 pixels before reaching the footer
      // Threshold: ScrollPos where (Viewport Bottom + 20) hits Footer Top
      const threshold = footerTop - windowHeight - 20
      setShowFloatingNav(scrollPos < threshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const saveToDatabase = useCallback(async (values: Record<string, string | number>, isFinal = false) => {
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
  }, [profile.id, supabase])

  const form = useForm({
    defaultValues: {} as Record<string, string | number>,
    onSubmit: async ({ value }) => {
      if (!isSubmitting) return;
      await saveToDatabase(value, true)
      await fetch('/api/audit/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, responses: value })
      })
      toast.success('Audit submitted successfully!')
      router.push(`/portal/${profile.slug}/dashboard`)
    }
  })

  // Load existing data
  useEffect(() => {
    async function loadData() {
      const { data } = await supabase
        .from('audit_responses')
        .select('responses')
        .eq('client_id', profile.id)
        .maybeSingle()

      if (data?.responses) {
        form.reset(data.responses as Record<string, string | number>)
      }
    }
    loadData()
  }, [profile.id, supabase, form])

  // Auto-save logic (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isSubmitting && Object.keys(form.state.values).length > 0) {
        saveToDatabase(form.state.values)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [form.state.values, profile.id, isSubmitting, saveToDatabase])

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  // VALIDATION: Check if current step is fully answered
  const isCurrentStepValid = useMemo(() => {
    return currentStepData.questions.every(q => {
      const val = form.state.values[q.id]
      if (val === undefined || val === null) return false
      if (typeof val === 'string' && val.trim() === '') return false
      return true
    })
  }, [currentStepData, form.state.values])

  const handleNext = () => {
    if (!isCurrentStepValid) {
      toast.error('Please answer all questions on this page to proceed.')
      return
    }
    setCurrentStep(prev => prev + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSaveAndExit = async () => {
    await saveToDatabase(form.state.values, false)
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

      {/* FLOATING LEFT: DASHBOARD NAV - THEMED REFINEMENT */}
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
                ← Portal Home
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

      {/* FLOATING RIGHT: BACK TO TOP - THEMED REFINEMENT */}
      <AnimatePresence>
        {(showScrollTop && showFloatingNav) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed',
              right: '1.5rem',
              bottom: '2rem',
              width: 44, height: 44,
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
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: 4, background: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-8)', overflow: 'hidden' }}>
        <motion.div
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

      <div style={{ background: 'var(--glass-bg-heavy)', backdropFilter: 'blur(var(--glass-blur))', WebkitBackdropFilter: 'blur(var(--glass-blur))', border: `1px solid ${brand.primary}33`, borderRadius: 'var(--radius-xl)', padding: 'var(--space-10)' }}>
        <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {currentStepData.questions.map((q) => (
              <form.Field key={q.id} name={q.id}>
                {(field) => {
                  const hasValue =
                    field.state.value !== undefined &&
                    field.state.value !== null &&
                    String(field.state.value).trim() !== ''
                  const controlClass = `audit-control ${hasValue ? 'audit-control-complete' : ''}`
                  const { lead, prompt } = splitQuestionLabel(q.label)

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

                      {q.type === 'textarea' ? (
                        <textarea
                          value={(field.state.value as string) || ''}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder={q.placeholder}
                          className={controlClass}
                          style={{ minHeight: 120, resize: 'vertical' }}
                        />
                      ) : q.type === 'scale' ? (
                        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <motion.button
                              key={num}
                              type="button"
                              onClick={() => field.handleChange(num)}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.96 }}
                              className="audit-choice-button"
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
                      ) : q.type === 'yesno' ? (
                        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                          {['Yes', 'No'].map(opt => (
                            <motion.button
                              key={opt}
                              type="button"
                              onClick={() => field.handleChange(opt)}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              className="audit-choice-button"
                              style={{
                                flex: 1,
                                padding: 'var(--space-3)',
                                background: field.state.value === opt ? brand.primary : '#000',
                                border: `1px solid ${field.state.value === opt ? brand.primary : 'var(--color-border)'}`,
                                borderRadius: 'var(--radius-md)',
                                color: field.state.value === opt ? 'black' : 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                              }}
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={(field.state.value as string) || ''}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder={q.placeholder || (q.type === 'percentage' ? 'Example: 25%' : q.type === 'hours' ? 'Example: 4 hours/week' : '')}
                          className={controlClass}
                        />
                      )}

                      {q.helperText && (
                        <motion.p
                          initial={{ opacity: 0.72 }}
                          animate={{ opacity: hasValue ? 0.62 : 0.92 }}
                          style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', lineHeight: '1.5', margin: 0 }}
                        >
                          <span style={{ color: brand.primary, fontWeight: 'bold' }}>Guidance:</span> {q.helperText}
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
                onClick={() => { setCurrentStep(prev => Math.max(0, prev - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                disabled={currentStep === 0}
                style={{ opacity: currentStep === 0 ? 0 : 1, background: 'transparent', border: '1px solid var(--color-border)', color: 'white', padding: 'var(--space-3) var(--space-8)', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}
              >
                Back
              </button>

              {currentStep < steps.length - 1 ? (
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

            <button
              type="button"
              onClick={handleSaveAndExit}
              style={{ alignSelf: 'center', background: 'transparent', border: 'none', color: 'var(--color-secondary)', fontSize: 'var(--text-sm)', cursor: 'pointer', textDecoration: 'none', fontWeight: 'bold' }}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              Save and finish later
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
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

        @media (max-width: 1240px) {
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
