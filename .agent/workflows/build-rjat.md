---
description: Build the RJAT (Revenue Journey Assessment Tool) engine page
---

# Build RJAT Workflow

## Prerequisites
- Layout components exist
- Auth system configured
- n8n workflow ready
- Dev server running on `localhost:3000`

## Agent Assignments
- **Logic Engineer**: Scraper interface, n8n integration
- **Frontend Builder**: Processing UI, animations
- **FullStack Dev**: Payment gate integration

## Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] n8n workflow deployed and webhook accessible.
- [ ] Supabase `revenue_journey_assessments` table created.
- [ ] Stripe keys configured for payment gate.

## Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


## Validation
> See common validation for full checklist.

- [ ] Form submission triggers n8n webhook.
- [ ] Processing animation shows stage progress.
- [ ] Payment gate displays blurred results.
- [ ] Stripe checkout redirects correctly.
- [ ] Post-payment redirect to Dashboard.
- [ ] Passes common validation (lint, build, screenshots).

## Steps

### 1. Read Required Skills
// turbo
View `.agent/skills/logic-engineer/SKILL.md`.

### 2. Build RJAT Hero
Create `components/sections/RJATHero.tsx`:
- Page title ("Analyze Your Revenue Engine")
- Value prop
- Trust indicators (security badges)

### 3. Build URL Input Form
Create `components/forms/RJATForm.tsx`:
- URL input field with validation
- Company name input
- Email input (for results delivery)
- Submit button

### 4. Build Processing State
Create `components/rjat/ProcessingState.tsx`:
- "Scanning..." animation
- Progress indicators
- Stages: Website, Social, Analytics
- Estimated time remaining

### 5. Build Payment Gate
Create `components/rjat/PaymentGate.tsx`:
- "Your report is ready" message
- Blurred preview of results
- Pricing options (Snapshot vs Membership)
- Stripe checkout integration

### 6. Create RJAT API Route
Create `app/api/rjat/route.ts`:
- Accept URL submission
- Validate input
- Trigger n8n webhook
- Return job ID

### 7. Create Status Polling
Create `app/api/rjat/[jobId]/status/route.ts`:
- Check job status in Supabase
- Return progress percentage
- Return results when complete

### 8. Build Results Preview
Create `components/rjat/ResultsPreview.tsx`:
- Blurred scorecard
- Clear "Top 5 Leaks" teaser
- CTA to unlock full report

### 9. Assemble RJAT Page
Create `app/rjat/page.tsx`:
- Conditional rendering based on state:
  - Form (initial)
  - Processing (after submit)
  - Payment Gate (processing complete)
  - Redirect to Dashboard (after payment)

### 10. Verify in Browser
Navigate to `localhost:3000/rjat` and:
- Test form submission
- Test processing animation
- Test payment gate display
- Take screenshots of each state

### 11. Report Completion
Notify user with screenshots.


