'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

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

export default function MultiStepAuditForm({ profile }: { profile: any }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const brand = profile.brand_colors || { primary: '#2BB6F6' }

  const form = useForm({
    defaultValues: {} as Record<string, any>,
    onSubmit: async ({ value }) => {
      await saveToDatabase(value, true)
      // Trigger notification
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
        form.reset(data.responses)
      }
    }
    loadData()
  }, [profile.id])

  async function saveToDatabase(values: any, isFinal = false) {
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
    } else if (!isFinal) {
      // toast.success('Progress saved')
    }
    setIsSaving(false)
  }

  // Auto-save logic (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(form.state.values).length > 0) {
        saveToDatabase(form.state.values)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [form.state.values])

  const currentStepData = steps[currentStep]

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 'var(--space-20)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', color: brand.primary }}>
          {currentStepData.title}
        </h1>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>
          Step {currentStep + 1} of {steps.length} {isSaving && ' (Saving...)'}
        </div>
      </div>

      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-10)' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {currentStepData.questions.map((q) => (
              <form.Field
                key={q.id}
                name={q.id}
                children={(field) => (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <label style={{ color: 'var(--color-text)', fontWeight: 'bold', fontSize: 'var(--text-sm)' }}>
                      {q.label}
                    </label>
                    
                    {q.type === 'textarea' ? (
                      <textarea
                        value={field.state.value || ''}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        style={{ background: 'black', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', color: 'white', minHeight: 120, fontFamily: 'inherit' }}
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
                              background: field.state.value === num ? brand.primary : 'black', 
                              border: '1px solid var(--color-border)',
                              borderRadius: 'var(--radius-md)',
                              color: field.state.value === num ? 'black' : 'white',
                              fontWeight: 'bold'
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
                              background: field.state.value === opt ? brand.primary : 'black', 
                              border: '1px solid var(--color-border)',
                              borderRadius: 'var(--radius-md)',
                              color: field.state.value === opt ? 'black' : 'white',
                              fontWeight: 'bold'
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={field.state.value || ''}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder={q.type === 'percentage' ? '%' : q.type === 'hours' ? 'hours/week' : ''}
                        style={{ background: 'black', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', color: 'white' }}
                      />
                    )}
                  </div>
                )}
              />
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-12)', display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              style={{ opacity: currentStep === 0 ? 0 : 1, background: 'transparent', border: '1px solid var(--color-border)', color: 'white', padding: 'var(--space-3) var(--space-8)', borderRadius: 'var(--radius-full)', cursor: 'pointer' }}
            >
              Back
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                style={{ background: brand.primary, color: 'black', border: 'none', padding: 'var(--space-3) var(--space-12)', borderRadius: 'var(--radius-full)', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                style={{ background: brand.primary, color: 'black', border: 'none', padding: 'var(--space-3) var(--space-12)', borderRadius: 'var(--radius-full)', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Complete Audit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
