'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import styles from './AuthForm.module.css' // Reusing established glass styles

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      inquiryType: 'General',
      message: '',
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(value),
        })

        if (!res.ok) throw new Error('Submission failed')

        toast.success("Signal captured. The orchestrator will reach out shortly.")
        form.reset()
      } catch {
        toast.error("Signal lost. Please try submitting your inquiry again.")
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  // Set values from EKG if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('source') === 'ekg') {
        form.setFieldValue('message', params.get('payload') || '')
        form.setFieldValue('inquiryType', 'Partnership')
      }
    }
  }, [form])

  return (
    <div style={{ width: '100%' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className={styles.authForm}
      >
        {/* Name Field */}
        <form.Field
          name="name"
          validators={{ onChange: ({ value }) => !value ? 'Name is required' : undefined }}
        >
          {(field) => (
            <div className={styles.formGroup}>
              <label htmlFor={field.name}>Full Name</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={styles.inputField}
                placeholder="Richard Norwood"
                disabled={isSubmitting}
              />
              {field.state.meta.errors ? (
                <span className={styles.fieldError}>{field.state.meta.errors.join(', ')}</span>
              ) : null}
            </div>
          )}
        </form.Field>

        {/* Email Field */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => !value ? 'Email is required' : (
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : undefined
            )
          }}
        >
          {(field) => (
            <div className={styles.formGroup}>
              <label htmlFor={field.name}>Email Address</label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={styles.inputField}
                placeholder="mail@alabrida.org"
                disabled={isSubmitting}
              />
              {field.state.meta.errors ? (
                <span className={styles.fieldError}>{field.state.meta.errors.join(', ')}</span>
              ) : null}
            </div>
          )}
        </form.Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          {/* Company Field */}
          <form.Field
            name="company"
          >
            {(field) => (
              <div className={styles.formGroup}>
                <label htmlFor={field.name}>Company (Optional)</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={styles.inputField}
                  placeholder="Alabrida Revenue"
                  disabled={isSubmitting}
                />
              </div>
            )}
          </form.Field>

          {/* Inquiry Type */}
          <form.Field
            name="inquiryType"
          >
            {(field) => (
              <div className={styles.formGroup}>
                <label htmlFor={field.name}>Inquiry Type</label>
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={styles.inputField}
                  style={{ height: '42px', appearance: 'none' }}
                  disabled={isSubmitting}
                >
                  <option value="General">General Inquiry</option>
                  <option value="Partnership">90-Day Partnership</option>
                  <option value="Support">Support</option>
                </select>
              </div>
            )}
          </form.Field>
        </div>

        {/* Message Field */}
        <form.Field
          name="message"
          validators={{ onChange: ({ value }) => !value ? 'Message is required' : undefined }}
        >
          {(field) => (
            <div className={styles.formGroup}>
              <label htmlFor={field.name}>Message</label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={styles.inputField}
                style={{ height: '120px', padding: 'var(--space-3)', resize: 'vertical' }}
                placeholder="How can we orchestrate your engine?"
                disabled={isSubmitting}
              />
              {field.state.meta.errors ? (
                <span className={styles.fieldError}>{field.state.meta.errors.join(', ')}</span>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit]) => (
            <button 
              type="submit" 
              disabled={!canSubmit || isSubmitting} 
              className={styles.submitBtn}
            >
              {isSubmitting ? 'Transmitting...' : 'Dispatch Signal'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}
