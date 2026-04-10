# Consulting "Actor" Workflow

## Overview
The "Actor" Consulting Pipeline is a two-phase funnel driven by a centralized automation layer (Apify + n8n).

## Phase 1: Acquisition & Intake
1. **Service Tiers**: 90 Days, 6 Months, 12 Months.
2. **CTAs**: Tier-specific calls to action.
3. **Landing Pages**: Unique pages at `/services/[tier]`.
4. **Unified Intake**: All landing pages funnel to a single `IntakeForm.tsx`.
5. **Actor Input**: Form submission triggers the Apify "Actor" via webhook.

## Phase 2: Processing & Delivery
1. **Discovery Questions**: Immediately after intake, the user answers tier-specific discovery questions.
2. **Actor Output**: Standard data collection (Apify) runs asynchronously.
3. **Convergence**: n8n orchestrator waits for both Discovery Questions and Apify output.
4. **Dashboard Creation**: Terraform provisions a personalized client dashboard.
5. **Scheduling**: User receives an email to schedule the discovery call via Calendly.

## Data & State
- **Supabase**: Tracks onboarding state (`pending_apify`, `pending_dashboard`, `complete`).
- **Terraform**: Templates the dashboard infrastructure for all users.
- **n8n**: The master glue connecting Apify, Terraform, and Email.
