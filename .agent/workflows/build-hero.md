---
description: Build the Hero Section with animations and kinetic typography
---

# Build Hero Workflow

## Prerequisites
- Layout components exist (run `/build-layout` first)
- Dev server running on `localhost:3000`

## Steps

### 1. Read the Frontend Builder Skill
// turbo
View the skill instructions at `.agent/skills/frontend-builder/SKILL.md`.

### 2. Read Content for Hero
// turbo
View `content/homepage.json` for headline, subhead, and CTA copy.
If missing, ask Content Strategist to create it first.

### 3. Create Kinetic Headline Component
Create `components/ui/KineticHeadline.tsx`:
- Use Framer Motion for staggered letter/word animation
- Respect `prefers-reduced-motion`
- Export reusable component

### 4. Create Animated Button Component
Create `components/ui/AnimatedButton.tsx`:
- Hover scale effect
- Press feedback
- Gradient or glow effect
- High contrast colors

### 5. Create Hero Section
Create `components/sections/HeroSection.tsx`:
- Full viewport height (or near)
- Background: gradient, image, or Aceternity UI effect
- KineticHeadline for main headline
- Subhead text
- Primary CTA (AnimatedButton)
- Optional secondary CTA

### 6. Add Hero to Homepage
Update `app/page.tsx` to include HeroSection.

### 7. Verify in Browser
Navigate to `localhost:3000` and:
- Watch the headline animation
- Test CTA hover/click states
- Take screenshots (desktop + mobile)
- Record a video of the animation if needed

### 8. Report Completion
Notify user with screenshots/video and component list.
