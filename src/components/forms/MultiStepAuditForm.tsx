'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useForm } from '@tanstack/react-form'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface Question {
  id: string
  label: string
  type: 'scale' | 'text' | 'percentage' | 'hours' | 'yesno' | 'textarea'
}

interface AuditStep {
  title: string
  questions: Question[]
}

const steps: AuditStep[] = [
  {
    title: 'Part 1: Revenue & Financial Mechanics',
    questions: [
      { id: 'payout_complexity', label: 'Payout Complexity: On a scale of 1-10, how much manual effort is required to calculate and disperse current semi-monthly contractor payments?', type: 'scale' },
      { id: 'credentialing_split', label: 'The Credentialing Split: What percentage of your current contractors are independently credentialed on their own panels?', type: 'percentage' },
      { id: 'lead_attribution', label: 'Lead Attribution: Over the last 90 days, how many new clients were sourced directly by the Practice versus contractors?', type: 'textarea' },
      { id: 'billing_load', label: 'Administrative Billing Load: How many hours per week do you spend chasing insurance rejections or correcting errors?', type: 'hours' },
      { id: 'marketing_overhead', label: 'Marketing Overhead: Estimated monthly "Cost per Provider" for Psychology Today and other platforms?', type: 'text' },
      { id: 'collection_lag', label: 'Collection Lag: Average duration from "Date of Service" to "Funds Deposited"?', type: 'text' },
      { id: 'incentive_gap', label: 'The Incentive Gap: Do you have a mechanism to reward contractors who source their own private-pay clients?', type: 'yesno' }
    ]
  },
  {
    title: 'Part 2: Physical Footprint & Facility Governance',
    questions: [
      { id: 'peak_capacity', label: 'Peak Capacity Friction: Specific days/hours where the physical suite is at 100% occupancy?', type: 'textarea' },
      { id: 'shadow_hours', label: 'The "Shadow" Hours: How many referral inquiries go unfilled for 7-9 AM or 7-9 PM slots?', type: 'text' },
      { id: 'reset_effort', label: 'The Reset Effort: How much time is spent daily resetting physical rooms?', type: 'hours' },
      { id: 'customization_audit', label: 'Customization Audit: Any items in suites that cannot be removed/packed within 2 hours?', type: 'yesno' },
      { id: 'access_control', label: 'Access Control: Who holds keys/codes and what is the protocol for off-hours entry?', type: 'textarea' },
      { id: 'turnkey_status', label: 'Suite "Ready-to-Wear" Status: Are offices fully functional "Turn-Key" or are you paying for unused furniture?', type: 'textarea' }
    ]
  },
  {
    title: 'Part 3: Digital Engine & Remote Logic',
    questions: [
      { id: 'lead_accountability', label: 'Lead Accountability: Method for verifying initial HIPAA-compliant contact by contractors?', type: 'textarea' },
      { id: 'conversion_visibility', label: 'Conversion Visibility: How do you track "Speed-to-Lead" (inquiry to intake)?', type: 'textarea' },
      { id: 'software_fragmentation', label: 'Software Fragmentation: List digital tools used by contractors that the Practice lacks admin access to.', type: 'textarea' },
      { id: 'data_sovereignty', label: 'Data Sovereignty: What is the "Digital Offboarding" process for clinical records?', type: 'textarea' },
      { id: 'managed_workspace', label: 'Managed Workspace: Are contractors using personal cell numbers or practice-managed VoIP?', type: 'textarea' }
    ]
  },
  {
    title: 'Part 4: Clinical Standards & Quality Control',
    questions: [
      { id: 'documentation_debt', label: 'Documentation Debt: How many session notes are currently overdue (beyond 48 hours)?', type: 'text' },
      { id: 'clinical_intervention', label: 'Clinical Intervention: How many interruptions in the last 30 days for contractor client crises?', type: 'text' },
      { id: 'golden_thread', label: 'The "Golden Thread" Audit: Are treatment plans consistently updated every 90 days across all charts?', type: 'yesno' },
      { id: 'churn_logic', label: 'Discharge/Churn Logic: Current "Drop-off" rate (1-3 sessions) for Practice-referred leads?', type: 'percentage' },
      { id: 'skill_mapping', label: 'Skill-to-Patient Mapping: Top 3 clinical specialties requested by new inquiries?', type: 'text' },
      { id: 'brand_consistency', label: 'Brand Consistency: Do contractors use RIW branded templates for homework?', type: 'yesno' },
      { id: 'expansion_readiness', label: 'The "Expansion" Readiness: If you added 2 providers tomorrow, what admin bottleneck breaks first?', type: 'textarea' }
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
  const [showScrollTop, setShowScrollTop] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const brand = profile.brand_colors || { primary: '#2BB6F6' }

  // Monitor scroll for "Back to Top"
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300)
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
    <div style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 'var(--space-20)', position: 'relative' }}>
      
      {/* FLOATING LEFT: DASHBOARD NAV */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ position: 'fixed', left: '2rem', top: '150px', width: '200px', zIndex: 100 }}
        className="hidden-mobile"
      >
        <div style={{ background: 'var(--glass-bg-heavy)', backdropFilter: 'blur(var(--glass-blur))', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <p style={{ color: 'var(--color-text-subtle)', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 'var(--space-4)', letterSpacing: '0.1em' }}>Navigation</p>
          <Link 
            href={`/portal/${profile.slug}/dashboard`}
            style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
          >
            ← Portal Home
          </Link>
          <div style={{ marginTop: 'var(--space-8)' }}>
             <p style={{ color: brand.primary, fontSize: 10, fontWeight: 'bold' }}>Progress Saved</p>
             <div style={{ width: '100%', height: 2, background: 'var(--color-border)', marginTop: 4 }}>
                <div style={{ width: `${progress}%`, height: '100%', background: brand.primary }} />
             </div>
          </div>
        </div>
      </motion.div>

      {/* FLOATING RIGHT: BACK TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ 
              position: 'fixed', 
              right: '2rem', 
              bottom: '2rem', 
              width: 50, height: 50, 
              borderRadius: '50%', 
              background: 'var(--color-surface-elevated)', 
              border: `1px solid ${brand.primary}44`,
              color: brand.primary,
              cursor: 'pointer',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
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
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>
          Step {currentStep + 1} of {steps.length} {isSaving && ' (Saving...)'}
        </div>
      </div>

      <div style={{ background: 'var(--glass-bg-heavy)', backdropFilter: 'blur(var(--glass-blur))', WebkitBackdropFilter: 'blur(var(--glass-blur))', border: `1px solid ${brand.primary}33`, borderRadius: 'var(--radius-xl)', padding: 'var(--space-10)' }}>
        <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {currentStepData.questions.map((q) => (
              <form.Field key={q.id} name={q.id}>
                {(field) => (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <label style={{ color: 'white', fontWeight: 'bold', fontSize: 'var(--text-sm)' }}>
                      {q.label}
                    </label>
                    
                    {q.type === 'textarea' ? (
                      <textarea
                        value={(field.state.value as string) || ''}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        style={{ background: '#000', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', color: 'white', minHeight: 120, fontFamily: 'inherit', outline: 'none' }}
                      />
                    ) : q.type === 'scale' ? (
                      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => field.handleChange(num)}
                            style={{ 
                              flex: 1, 
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
                          </button>
                        ))}
                      </div>
                    ) : q.type === 'yesno' ? (
                      <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                        {['Yes', 'No'].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => field.handleChange(opt)}
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
                          </button>
                        ))}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={(field.state.value as string) || ''}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder={q.type === 'percentage' ? '%' : q.type === 'hours' ? 'hours/week' : ''}
                        style={{ background: '#000', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', color: 'white', outline: 'none' }}
                      />
                    )}
                  </div>
                )}
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

            {/* SAVE AND FINISH LATER */}
            <button
              type="button"
              onClick={handleSaveAndExit}
              style={{ alignSelf: 'center', background: 'transparent', border: 'none', color: 'var(--color-text-subtle)', fontSize: 'var(--text-sm)', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Save and finish later
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .hidden-mobile {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
