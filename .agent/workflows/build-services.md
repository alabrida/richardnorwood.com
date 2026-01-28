---
description: Build the Services page (90-Day Partnership offering)
---

# Build Services Workflow

## Prerequisites
- Layout components exist
- Dev server running on `localhost:3000`

## Agent Assignments
- **Content Strategist**: Service descriptions, pricing copy
- **Frontend Builder**: Visual components

## Steps

### 1. Read Required Skills
// turbo
View `.agent/skills/content-strategist/SKILL.md` and `.agent/skills/frontend-builder/SKILL.md`.

### 2. Create/Verify Content
Ensure `content/services.json` exists with:
- Service tiers (DFY, DWY, DIY or I, II, III)
- Timeline phases (Ramp, Sprint)
- Weekly class curriculum
- Pricing (if shown here vs pricing page)

### 3. Build Services Hero
Create `components/sections/ServicesHero.tsx`:
- Page title ("The 90-Day Partnership")
- Value prop subhead
- Anchor link to tiers

### 4. Build Service Tiers Section
Create `components/sections/ServiceTiers.tsx`:
- 3-tier card layout (or accordion)
- Tier name, description, includes
- CTA per tier ("Apply" / "Learn More")
- Highlight recommended tier

### 5. Build Timeline Section
Create `components/sections/TimelineSection.tsx`:
- 90-Day visual roadmap
- Ramp Phase (Days 1-30)
- Sprint Phase (Days 31-90)
- Milestone markers

### 6. Build Curriculum Section
Create `components/sections/CurriculumSection.tsx`:
- Weekly class syllabus
- Topic + description per week
- Expandable/accordion format

### 7. Build Services CTA
Create `components/sections/ServicesCTA.tsx`:
- "Apply for Partnership" button
- Links to Calculator for qualification

### 8. Assemble Services Page
Create `app/services/page.tsx`:
```tsx
<ServicesHero />
<ServiceTiers />
<TimelineSection />
<CurriculumSection />
<ServicesCTA />
```

### 9. Verify in Browser
Navigate to `localhost:3000/services` and:
- Check tier card layouts
- Test accordion/expand behavior
- Take screenshots

### 10. Report Completion
Notify user with screenshots.
