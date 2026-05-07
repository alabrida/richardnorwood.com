'use client'

import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import styles from './PortalDashboard.module.css'

interface FrameworkAlterationsCardProps {
  clientId: string
  companyName: string
  brandPrimary: string
}

export default function FrameworkAlterationsCard({
  clientId,
  companyName,
  brandPrimary,
}: FrameworkAlterationsCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedMessage = message.trim()
    if (!trimmedMessage) {
      toast.error('Add the requested alterations before submitting.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/framework-alterations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId,
          message: trimmedMessage,
        }),
      })

      if (!response.ok) {
        toast.error('The alterations could not be submitted. Please try again.')
        return
      }

      setIsSubmitted(true)
      setMessage('')
      toast.success('Alterations submitted.')
    } catch {
      toast.error('The alterations could not be submitted. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className={`${styles.card} ${styles.activeCard}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div>
        <div className={styles.cardHeaderRow}>
          <h3 className={styles.cardTitle}>Immediate Next Step</h3>
          <span className="pulse-green-glow" style={{ width: 8, height: 8, borderRadius: '50%', background: brandPrimary, boxShadow: `0 0 10px ${brandPrimary}` }} />
        </div>
        <h4 className={styles.cardSubTitle}>First Contractor Framework Draft</h4>
        <p className={styles.cardText}>
          Review the first contractor framework draft and submit any requested alterations so we can lock the week-one working version.
        </p>

        {isSubmitted && (
          <div className={styles.alterationStatus}>
            Alterations received for {companyName}.
          </div>
        )}

        {isOpen && !isSubmitted && (
          <form className={styles.alterationForm} onSubmit={handleSubmit}>
            <label className={styles.alterationLabel} htmlFor="framework-alterations">
              Requested alterations
            </label>
            <textarea
              id="framework-alterations"
              className={styles.alterationTextarea}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="List any requested edits, concerns, or approval notes for the contractor framework draft."
              rows={5}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={isSubmitting}
            >
              <span className={styles.primaryBtnText}>{isSubmitting ? 'Submitting...' : 'Submit alterations'}</span>
            </button>
          </form>
        )}
      </div>

      {!isOpen && !isSubmitted && (
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => setIsOpen(true)}
        >
          <span className={styles.primaryBtnText}>Submit framework alterations</span>
        </button>
      )}
    </motion.div>
  )
}
