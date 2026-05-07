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

interface FrameworkGroup {
  label?: string
  items: string[]
}

interface FrameworkSection {
  title: string
  paragraphs?: string[]
  groups: FrameworkGroup[]
}

const rpmTiers = [
  {
    tier: 'Tier 1',
    split: '65 / 35',
    qualification: 'Practice-Sourced Leads / Practice-Credentialed',
  },
  {
    tier: 'Tier 2',
    split: '70 / 30',
    qualification: 'Practice-Sourced Leads / Independently Credentialed',
  },
  {
    tier: 'Tier 3',
    split: '75 / 25',
    qualification: 'Contractor-Sourced Leads / Practice-Credentialed',
  },
  {
    tier: 'Tier 4',
    split: '80 / 20',
    qualification: 'Contractor-Sourced Leads / Independently Credentialed',
  },
]

const frameworkSections: FrameworkSection[] = [
  {
    title: '2. The Monthly Performance Engine (SLA Maintenance)',
    paragraphs: [
      'Bonuses and penalties are determined by the Monthly Average Compliance Rate (MACR). Performance is calculated over the full calendar month and applied to the 15th-of-the-month dispersal for the previous month\'s performance.',
    ],
    groups: [
      {
        label: 'Key Performance Indicators (KPIs)',
        items: [
          'Speed-to-Lead (STL): Average contact time of < 4 business hours for all referred leads.',
          'Note Velocity: 100% of clinical session notes signed and completed within 48 hours of the Date of Service.',
        ],
      },
      {
        label: 'The Multipliers',
        items: [
          'Engine Performance Bonus: If a contractor maintains a 95% or higher MACR on both KPIs for the month, a one-time $250.00 cash bonus is added to their dispersal on the 15th.',
          'Administrative Friction Penalty: If a contractor\'s MACR falls below 80% for either KPI, a 5% Administrative Reduction is applied to the contractor\'s total gross payout for that month to cover manual oversight costs.',
        ],
      },
    ],
  },
  {
    title: '3. Operational Standards & Footprint',
    groups: [
      {
        label: 'Facility Governance (In-Office Vendors)',
        items: [
          'Hours of Operation: Contractors must operate within the established 7:00 AM - 7:00 PM operational window.',
          'The Session Floor: Contractors occupying a dedicated suite must maintain a minimum threshold of [X] weekly completed sessions to justify the physical real estate footprint.',
          'Suite Upkeep: All offices are provided in a "bare minimum functional" state. Contractors are encouraged to customize their suites (removable items only). Suites must be reset daily (trash, furniture, supplies). Failure to maintain the suite results in formal coaching.',
          'Notice to Vacate: A 30-day written notice is required to vacate physical office space, except in cases of ethical violations, which trigger immediate termination and removal.',
        ],
      },
      {
        label: 'Routing Logic (Remote & In-Office)',
        items: [
          'Skill-Based Engine: All leads route to the Practice first. Routing to contractors is determined by Clinical Skill, Niche Alignment, and Availability, not tenure or personal relationship.',
          'Lead Freeze: Failure to meet STL windows results in a temporary "Lead Freeze," where the contractor is bypassed in the routing engine for 7 days.',
        ],
      },
    ],
  },
  {
    title: '4. The "Tail" Strategy & Liability Protection',
    paragraphs: [
      'Because the Practice remains financially liable for insurance clawbacks and audits, the following protections are mandatory:',
    ],
    groups: [
      {
        items: [
          'Contractual Indemnification: The Subcontractor LLC is solely liable for any funds recouped by payers due to documentation errors, fraud, or clinical non-compliance performed by the contractor.',
          'The Recoupment Holdback: Upon termination of any agreement, the Practice will hold the final dispersal of funds for 60 days. This acts as a security buffer against insurance adjustments or immediate audits triggered by the separation.',
          'Proof of Tail Coverage: For contractors operating independently from the physical office, they must provide a Certificate of Insurance (COI) proving state-minimum liability coverage. Upon separation, they must provide proof of "Tail Coverage" (Extended Reporting Period) for work performed at Root Impact Wellness.',
        ],
      },
    ],
  },
  {
    title: '5. Digital Sovereignty & Chart Ownership',
    groups: [
      {
        items: [
          'Records of Truth: All clinical records, intake data, and treatment plans for clients sourced by the Practice are the exclusive intellectual property of Root Impact Wellness LLC.',
          'Platform Compliance: All client communications must occur within the Practice-issued HIPAA-compliant Google Workspace or EHR. Use of personal devices or unmanaged apps for PHI is a material breach of contract.',
          'Post-Separation Access: Access to the Practice Vault and EHR is revoked immediately upon termination.',
        ],
      },
    ],
  },
]

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

        <div className={styles.frameworkDraftPanel}>
          <div className={styles.frameworkDraftHeader}>
            <span className={styles.frameworkDraftKicker}>Draft for Review</span>
            <h5 className={styles.frameworkDraftTitle}>Root Impact Wellness LLC: B2B Subcontractor Operational Framework</h5>
          </div>

          <div className={styles.frameworkDraftBody}>
            <section className={styles.frameworkSection}>
              <h6>1. The Revenue Performance Model (RPM) Tiers</h6>
              <p>
                To incentivize organic growth and reward independent credentialing, the Practice utilizes a four-tiered revenue split based on lead source and credentialing status.
              </p>
              <div className={styles.rpmTierGrid}>
                {rpmTiers.map((tier) => (
                  <div key={tier.tier} className={styles.rpmTierItem}>
                    <span>{tier.tier}</span>
                    <strong>{tier.split}</strong>
                    <small>{tier.qualification}</small>
                  </div>
                ))}
              </div>
              <p>
                Technology & Admin Pass-Through: A flat $50.00 Monthly Technology Fee is deducted from the contractor&apos;s first dispersal of each month. This covers EHR licenses, HIPAA-compliant digital vault storage, and practice directory overhead.
              </p>
            </section>

            {frameworkSections.map((section) => (
              <section key={section.title} className={styles.frameworkSection}>
                <h6>{section.title}</h6>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.groups.map((group) => (
                  <div key={group.label || group.items[0]} className={styles.frameworkGroup}>
                    {group.label && <span>{group.label}</span>}
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>

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
