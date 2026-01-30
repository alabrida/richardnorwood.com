---
description: Build the complete Homepage with Hero, Ideology, Social Proof, and About sections
---

# Build Homepage Workflow

## Prerequisites
- Layout components exist (run `/build-layout` first)
- Dev server running on `localhost:3000`

## Agent Assignments
- **Frontend Builder**: Hero, Ideology, Social Proof sections
- **Content Strategist**: Copy for all sections

## Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] `content/homepage.json` exists with all sections (hero, ideology, social_proof, about).
- [ ] Layout components render correctly.

## Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


## Validation
> See common validation for full checklist.

- [ ] All 5 stages render with correct colors and descriptions.
- [ ] Hero, Ideology, Social Proof, About sections all visible.
- [ ] Passes common validation (lint, build, screenshots).

## Steps

### 1. Read Required Skills
// turbo
View `.agent/skills/frontend-builder/SKILL.md` and `.agent/skills/content-strategist/SKILL.md`.

### 2. Create/Verify Content
Ensure `content/homepage.json` exists with:
- Hero: headline, subhead, cta_text, cta_url
- Ideology: 5 stages with titles, descriptions, icons
- Social Proof: case studies, testimonials
- About: bio, credentials, image_url

### 3. Build Hero Section
Run `/build-hero` workflow or create `components/sections/HeroSection.tsx`:
- Kinetic typography headline
- Value prop subhead
- Primary CTA ("Start Journey")
- Background animation (Aceternity UI)

### 4. Build Ideology Section
Create `components/sections/IdeologySection.tsx`:
- 5-Stage Revenue Journey visualization
- Scrollytelling or animated timeline
- "Information Fusion" explainer
- Icons/illustrations per stage

### 5. Build Social Proof Section
Create `components/sections/SocialProofSection.tsx`:
- Case study cards (data-driven metrics)
- Testimonial carousel or grid
- Client logos (if available)

### 6. Build About Section
Create `components/sections/AboutSection.tsx`:
- "The Architect" persona
- Bio and credentials
- Profile image
- Personal CTA

### 7. Assemble Homepage
Update `app/page.tsx`:
```tsx
<HeroSection />
<IdeologySection />
<SocialProofSection />
<AboutSection />
```

### 8. Verify in Browser
Navigate to `localhost:3000` and:
- Test all animations
- Check responsive behavior
- Take screenshots (desktop + mobile)

### 9. Report Completion
Notify user with screenshots and section inventory.


