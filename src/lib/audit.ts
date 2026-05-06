export type AuditQuestionType = 'scale' | 'text' | 'percentage' | 'hours' | 'yesno' | 'textarea'

export interface AuditQuestion {
  id: string
  label: string
  type: AuditQuestionType
  placeholder?: string
  helperText?: string
}

export interface AuditStep {
  title: string
  questions: AuditQuestion[]
}

export type AuditResponses = Record<string, string | number>

export const auditSteps: AuditStep[] = [
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

export function splitQuestionLabel(label: string) {
  const separatorIndex = label.indexOf(':')
  if (separatorIndex === -1) {
    return { lead: '', prompt: label }
  }

  return {
    lead: label.slice(0, separatorIndex),
    prompt: label.slice(separatorIndex + 1).trim()
  }
}

export function isAuditAnswered(value: unknown) {
  if (value === undefined || value === null) return false
  if (typeof value === 'string') return value.trim() !== ''
  return true
}

export function normalizeAuditResponses(value: unknown): AuditResponses {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  return Object.entries(value).reduce<AuditResponses>((responses, [key, entry]) => {
    if (typeof entry === 'string' || typeof entry === 'number') {
      responses[key] = entry
    }
    return responses
  }, {})
}

export function getAuditQuestionCount() {
  return auditSteps.reduce((count, step) => count + step.questions.length, 0)
}

export function getAnsweredAuditQuestionCount(responses: Record<string, unknown>) {
  return auditSteps.reduce((count, step) => {
    return count + step.questions.filter((question) => isAuditAnswered(responses[question.id])).length
  }, 0)
}

export function getFirstIncompleteAuditStepIndex(responses: Record<string, unknown>) {
  const incompleteIndex = auditSteps.findIndex((step) => {
    return step.questions.some((question) => !isAuditAnswered(responses[question.id]))
  })

  return incompleteIndex === -1 ? auditSteps.length - 1 : incompleteIndex
}

export function getAuditResponseGroups(responses: Record<string, unknown>) {
  return auditSteps.map((step) => ({
    title: step.title,
    answers: step.questions
      .filter((question) => isAuditAnswered(responses[question.id]))
      .map((question) => ({
        id: question.id,
        ...splitQuestionLabel(question.label),
        value: String(responses[question.id])
      }))
  }))
}
