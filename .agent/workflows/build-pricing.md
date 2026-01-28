---
description: Build the Pricing page (SaaS tiers and feature breakdown)
---

# Build Pricing Workflow

## Prerequisites
- Layout components exist
- Dev server running on `localhost:3000`

## Agent Assignments
- **Frontend Builder**: Pricing grid, feature comparison
- **Content Strategist**: Pricing copy, feature descriptions

## Steps

### 1. Read Required Skills
// turbo
View `.agent/skills/frontend-builder/SKILL.md`.

### 2. Create/Verify Content
Ensure `content/pricing.json` exists with:
- Tier definitions (Snapshots, Memberships, Agency, Battleship)
- Prices per tier
- Features per tier (checkmarks)
- CTA text per tier

### 3. Build Pricing Hero
Create `components/sections/PricingHero.tsx`:
- Page title ("Simple, Transparent Pricing")
- Toggle: Monthly / Annual (if applicable)
- Subhead

### 4. Build Features Breakdown
Create `components/sections/FeaturesBreakdown.tsx`:
- Dashboard features
- History access
- Pro Tools (Chat, Generator)
- Credit system explanation

### 5. Build Pricing Grid
Create `components/sections/PricingGrid.tsx`:
- Card per tier
- Price display (monthly/annual toggle)
- Feature checklist
- CTA button ("Get Started" / "Contact Sales")
- Highlight "Most Popular" tier

### 6. Build Comparison Table
Create `components/sections/ComparisonTable.tsx`:
- All tiers as columns
- All features as rows
- Check/X marks for inclusion
- Sticky header on scroll

### 7. Build FAQ Section
Create `components/sections/PricingFAQ.tsx`:
- Common pricing questions
- Accordion format
- Schema markup (FAQPage JSON-LD)

### 8. Assemble Pricing Page
Create `app/pricing/page.tsx`:
```tsx
<PricingHero />
<FeaturesBreakdown />
<PricingGrid />
<ComparisonTable />
<PricingFAQ />
```

### 9. Verify in Browser
Navigate to `localhost:3000/pricing` and:
- Test tier toggle (if applicable)
- Check comparison table scroll
- Take screenshots

### 10. Report Completion
Notify user with screenshots.
