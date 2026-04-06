// Types for richardnorwood.com website microservice
// Generated from Supabase PMP project (vupbjbrviiilqvgqtqlw)
// Only includes tables used by the website

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface WebsiteLead {
  id: string
  name: string
  email: string
  company: string | null
  message: string | null
  inquiry_type: string | null
  source: string | null
  calculator_score: number | null
  calculator_tier: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  created_at: string | null
}

export interface WebsiteLeadInsert {
  id?: string
  name: string
  email: string
  company?: string | null
  message?: string | null
  inquiry_type?: string | null
  source?: string | null
  calculator_score?: number | null
  calculator_tier?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  created_at?: string | null
}

export interface ClientProfile {
  id: string
  user_id: string | null
  contact_name: string
  company_name: string
  partnership_tier: string
  partnership_start: string | null
  partnership_end: string | null
  status: string | null
  dashboard_url: string | null
  business_url: string | null
  notes: string | null
  created_at: string | null
  updated_at: string | null
}

export interface ClientProfileInsert {
  id?: string
  user_id?: string | null
  contact_name: string
  company_name: string
  partnership_tier: string
  partnership_start?: string | null
  partnership_end?: string | null
  status?: string | null
  dashboard_url?: string | null
  business_url?: string | null
  notes?: string | null
  created_at?: string | null
  updated_at?: string | null
}

// Partnership tiers matching pricing.json
export type PartnershipTier = 'phase-1' | 'phase-2' | 'phase-3'

// Lead source types
export type LeadSource = 'contact_form' | 'calculator' | 'calendly' | 'referral'

// Client status
export type ClientStatus = 'active' | 'onboarding' | 'completed' | 'paused'
