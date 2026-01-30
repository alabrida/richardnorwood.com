---
description: Build the 5-Question Calculator Prequalifier Form
---

# Build Calculator Workflow

## Prerequisites
- Layout components exist
- Dev server running on `localhost:3000`

## Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] Rubric Master document reviewed for scoring logic.
- [ ] 5-Stage definitions understood (Awareness→Retention).

## Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


## Validation
> See common validation for full checklist.

- [ ] All 5 questions render correctly.
- [ ] Scoring matches Rubric tiers (5-8→Services, 9-11→RJAT, 12-15→Calendly).
- [ ] Each routing path triggers correctly.
- [ ] Progress indicator updates per step.
- [ ] Passes common validation (lint, build, screenshots).

## Steps

### 1. Read the Logic Engineer Skill
// turbo
View the skill instructions at `.agent/skills/logic-engineer/SKILL.md`.

### 2. Define Calculator Questions
The 5-Question Prequalifier should assess the user's revenue engine maturity.
Questions map to the 5 Stages:
1. Awareness (Lead Generation)
2. Consideration (Lead Nurturing)
3. Decision (Sales Process)
4. Conversion (Payment/Onboarding)
5. Retention (Customer Success)

Each question has 3 answer options scoring 1-3.

### 3. Create Calculator Form Component
Create `components/forms/CalculatorForm.tsx`:
- Use `@tanstack/react-form` for state management
- Progress indicator (step X of 5)
- Radio button groups for each question
- Next/Back navigation
- Animated transitions between questions (Framer Motion)

### 4. Create Calculator Logic
Create `app/api/calculate/route.ts`:
- Accept form submission
- Calculate total score (5-15 range)
- Determine routing:
  - **5-8 (Bottom Third):** Fractured -> Push to Services
  - **9-11 (Middle Third):** Fragmented -> Push to RJAT
  - **12-15 (Top Third):** Unified -> Push to Strategy Call
- Return result + redirect URL

### 5. Create Results Component
Create `components/forms/CalculatorResult.tsx`:
- Display score visualization
- Show personalized recommendation
- CTA to next step (Services, RJAT, or Calendly)

### 6. Create Calculator Page
Create `app/calculator/page.tsx`:
- SEO content block ("Why you need a Revenue Audit")
- CalculatorForm component
- Results display

### 7. Verify in Browser
Navigate to `localhost:3000/calculator` and:
- Complete the form with different answer combinations
- Verify correct routing logic
- Test form validation
- Take screenshots of each step

### 8. Report Completion
Notify user with screenshots and routing logic verification.


