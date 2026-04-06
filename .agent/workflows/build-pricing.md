---
description: Build the Pricing page (Strategic Partnership tiers)
---

# Build Pricing Workflow

## Prerequisites
- Layout components exist
- Dev server running on `localhost:3000`

## Agent Assignments
- **Frontend Builder**: Pricing grid, partnership visualization
- **Content Strategist**: Partnership copy, tier descriptions

## Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] `content/pricing.json` exists with tier definitions.

## Rules of Engagement
> All rules from workspace `GEMINI.md` apply.
> No public price points. Pricing is discussed during discovery calls.
> No Stripe integration. No payment gates.

## Validation
> See common validation for full checklist.

- [ ] All 3 tiers render from `pricing.json`.
- [ ] Feature checkmarks display correctly.
- [ ] FAQ accordion expands/collapses.
- [ ] JSON-LD FAQPage schema present in page head.
- [ ] No dollar amounts displayed.
- [ ] Passes common validation (lint, build, screenshots).

## Steps

### 1. Read Required Skills
// turbo
View `.agent/skills/frontend-builder/SKILL.md`.

### 2. Create/Verify Content
Ensure `content/pricing.json` exists with:
- 3 Partnership tiers (Phase I, Phase II, Phase III)
- Term durations (90 Days, 6 Months, 12 Months)
- Features per tier (checkmarks)
- CTA text per tier (Schedule Discovery, Apply, Request Review)

### 3. Build Pricing Hero
Create `components/sections/PricingHero.tsx`:
- Page title ("Strategic Partnership")
- Subhead explaining the engagement model

### 4. Build Pricing Grid
Create `components/sections/PricingGrid.tsx`:
- Card per tier
- Term duration display (not prices)
- Feature checklist
- CTA button ("Schedule Discovery" / "Apply for Partnership")
- Highlight "Recommended" tier

### 5. Build FAQ Section
Create `components/sections/PricingFAQ.tsx`:
- Common partnership questions
- Accordion format
- Schema markup (FAQPage JSON-LD)

### 6. Assemble Pricing Page
Create `app/pricing/page.tsx`:
```tsx
<PricingHero />
<PricingGrid />
<PricingFAQ />
```

### 7. Verify in Browser
Navigate to `localhost:3000/pricing` and:
- Verify no prices are displayed
- Check tier card layouts
- Test FAQ accordion
- Take screenshots

### 8. Report Completion
Notify user with screenshots.
