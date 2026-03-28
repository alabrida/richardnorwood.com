'use client'

import React, { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './AuthForm.module.css'

interface AuthFormProps {
  type: 'login' | 'signup' | 'forgot-password' | 'reset-password'
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [serverError, setServerError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      setServerError(null)
      setSuccessMsg(null)

      try {
        if (type === 'signup') {
          if (value.password !== value.confirmPassword) {
            setServerError("Passwords do not match.")
            return
          }
          const { error } = await supabase.auth.signUp({
            email: value.email,
            password: value.password,
            options: {
              data: { full_name: value.fullName }
            }
          })
          if (error) throw error
          setSuccessMsg('Account created successfully. You can now login.')
          // Auto route to dashboard if email verification is off, otherwise prompt to check email
          router.push('/dashboard')
        } 
        else if (type === 'login') {
          const { error } = await supabase.auth.signInWithPassword({
            email: value.email,
            password: value.password,
          })
          if (error) throw error
          router.push('/dashboard')
          router.refresh()
        }
        else if (type === 'forgot-password') {
          const { error } = await supabase.auth.resetPasswordForEmail(value.email, {
            redirectTo: `${window.location.origin}/reset-password`,
          })
          if (error) throw error
          setSuccessMsg('Password reset instructions sent to your email.')
        }
        else if (type === 'reset-password') {
          if (value.password !== value.confirmPassword) {
            setServerError("Passwords do not match.")
            return
          }
          const { error } = await supabase.auth.updateUser({
            password: value.password
          })
          if (error) throw error
          setSuccessMsg('Password successfully updated.')
          router.push('/login')
        }
      } catch (err: any) {
        setServerError(err.message || 'An unexpected error occurred.')
      }
    },
  })

  return (
    <div className={styles.authCard}>
      <div className={styles.authHeader}>
        <h1 className={styles.authTitle}>
          {type === 'login' && 'Sign In'}
          {type === 'signup' && 'Create Account'}
          {type === 'forgot-password' && 'Reset Password'}
          {type === 'reset-password' && 'Set New Password'}
        </h1>
        <p className={styles.authSubhead}>
          {type === 'login' && 'Access the Revenue Architecture platform.'}
          {type === 'signup' && 'Join the definitive commercial engine.'}
        </p>
      </div>

      {serverError && <div className={styles.errorMessage}>{serverError}</div>}
      {successMsg && <div className={styles.successMessage}>{successMsg}</div>}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className={styles.authForm}
      >
        {type === 'signup' && (
          <form.Field
            name="fullName"
            validators={{
              onChange: ({ value }) => !value ? 'Name is required' : undefined
            }}
            children={(field) => (
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
                />
                {field.state.meta.errors ? (
                  <span className={styles.fieldError}>{field.state.meta.errors.join(', ')}</span>
                ) : null}
              </div>
            )}
          />
        )}

        {(type === 'login' || type === 'signup' || type === 'forgot-password') && (
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => !value ? 'Email is required' : undefined
            }}
            children={(field) => (
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
                />
                {field.state.meta.errors ? (
                  <span className={styles.fieldError}>{field.state.meta.errors.join(', ')}</span>
                ) : null}
              </div>
            )}
          />
        )}

        {(type === 'login' || type === 'signup' || type === 'reset-password') && (
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => !value ? 'Password is required' : undefined
            }}
            children={(field) => (
              <div className={styles.formGroup}>
                <label htmlFor={field.name}>Password</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={styles.inputField}
                  placeholder="••••••••"
                />
                {field.state.meta.errors ? (
                  <span className={styles.fieldError}>{field.state.meta.errors.join(', ')}</span>
                ) : null}
              </div>
            )}
          />
        )}

        {(type === 'signup' || type === 'reset-password') && (
          <form.Field
            name="confirmPassword"
            validators={{
              onChange: ({ value }) => !value ? 'Please confirm your password' : undefined
            }}
            children={(field) => (
              <div className={styles.formGroup}>
                <label htmlFor={field.name}>Confirm Password</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={styles.inputField}
                  placeholder="••••••••"
                />
                {field.state.meta.errors ? (
                  <span className={styles.fieldError}>{field.state.meta.errors.join(', ')}</span>
                ) : null}
              </div>
            )}
          />
        )}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button 
              type="submit" 
              disabled={!canSubmit || isSubmitting}
              className={styles.submitBtn}
            >
              {isSubmitting ? 'Processing...' : (
                type === 'login' ? 'Sign In' :
                type === 'signup' ? 'Create Account' :
                type === 'forgot-password' ? 'Send Instructions' :
                'Update Password'
              )}
            </button>
          )}
        />
      </form>

      <div className={styles.authLinks}>
        {type === 'login' && (
          <>
            <Link href="/forgot-password" className={styles.linkClass}>Forgot your password?</Link>
            <span className={styles.divider}>|</span>
            <Link href="/signup" className={styles.linkClass}>Need an account?</Link>
          </>
        )}
        {type === 'signup' && (
          <Link href="/login" className={styles.linkClass}>Already have an account? Sign In</Link>
        )}
        {(type === 'forgot-password' || type === 'reset-password') && (
          <Link href="/login" className={styles.linkClass}>Return to Sign In</Link>
        )}
      </div>
    </div>
  )
}
