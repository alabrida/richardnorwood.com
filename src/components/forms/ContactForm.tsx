'use client'

import React, { useState } from 'react'
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
      } catch (err) {
        toast.error("Signal lost. Please try submitting your inquiry again.")
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <div className={styles.formContainer} style={{ width: '100%' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className={styles.formElement}
      >
        {/* Name Field */}
        <form.Field
          name="name"
          validators={{ onChange: ({ value }) => !value ? 'Name is required' : undefined }}
          children={(field) => (
            <div className={styles.inputGroup}>
              <label htmlFor={field.name} className={styles.labelClass}>Full Name</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={styles.inputClass}
                placeholder="Richard Norwood"
                disabled={isSubmitting}
              />
              {field.state.meta.errors ? (
                <span className={styles.errorClass}>{field.state.meta.errors.join(', ')}</span>
              ) : null}
            </div>
          )}
        />

        {/* Email Field */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => !value ? 'Email is required' : (
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : undefined
            )
          }}
          children={(field) => (
            <div className={styles.inputGroup}>
              <label htmlFor={field.name} className={styles.labelClass}>Email Address</label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={styles.inputClass}
                placeholder="mail@alabrida.org"
                disabled={isSubmitting}
              />
              {field.state.meta.errors ? (
                <span className={styles.errorClass}>{field.state.meta.errors.join(', ')}</span>
              ) : null}
            </div>
          )}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          {/* Company Field */}
          <form.Field
            name="company"
            children={(field) => (
              <div className={styles.inputGroup}>
                <label htmlFor={field.name} className={styles.labelClass}>Company (Optional)</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={styles.inputClass}
                  placeholder="Alabrida Revenue"
                  disabled={isSubmitting}
                />
              </div>
            )}
          />

          {/* Inquiry Type */}
          <form.Field
            name="inquiryType"
            children={(field) => (
              <div className={styles.inputGroup}>
                <label htmlFor={field.name} className={styles.labelClass}>Inquiry Type</label>
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={styles.inputClass}
                  style={{ height: '42px', appearance: 'none' }}
                  disabled={isSubmitting}
                >
                  <option value="General">General Inquiry</option>
                  <option value="Partnership">90-Day Partnership</option>
                  <option value="Support">Support</option>
                </select>
              </div>
            )}
          />
        </div>

        {/* Message Field */}
        <form.Field
          name="message"
          validators={{ onChange: ({ value }) => !value ? 'Message is required' : undefined }}
          children={(field) => (
            <div className={styles.inputGroup}>
              <label htmlFor={field.name} className={styles.labelClass}>Message</label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={styles.inputClass}
                style={{ height: '120px', padding: 'var(--space-3)', resize: 'vertical' }}
                placeholder="How can we orchestrate your engine?"
                disabled={isSubmitting}
              />
              {field.state.meta.errors ? (
                <span className={styles.errorClass}>{field.state.meta.errors.join(', ')}</span>
              ) : null}
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isFormSubmitting]) => (
            <button 
              type="submit" 
              disabled={!canSubmit || isSubmitting} 
              className={styles.submitBtn}
            >
              {isSubmitting ? 'Transmitting...' : 'Dispatch Signal'}
            </button>
          )}
        />
      </form>
    </div>
  )
}
