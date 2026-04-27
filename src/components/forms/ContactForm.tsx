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
                placeholder="name@company.com"
                disabled={isSubmitting}
              />
              {field.state.meta.errors ? (
                <span className={styles.fieldError}>{field.state.meta.errors.join(', ')}</span>
              ) : null}
            </div>
          )}
        </form.Field>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
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
                  placeholder="Acme Corp"
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
                  style={{ 
                    appearance: 'none', 
                    colorScheme: 'dark', 
                    textOverflow: 'ellipsis', 
                    paddingRight: '2rem',
                    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '0.65rem auto'
                  }}
                  disabled={isSubmitting}
                >
                  <option value="General" style={{ background: '#0a0a0a', color: '#fff' }}>General Inquiry</option>
                  <option value="Partnership" style={{ background: '#0a0a0a', color: '#fff' }}>90-Day Partnership</option>
                  <option value="Support" style={{ background: '#0a0a0a', color: '#fff' }}>Support</option>
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
                placeholder="Tell us about your business and what you're working on."
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
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}
