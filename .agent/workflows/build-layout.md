---
description: Build the foundational layout components (Header, Footer, Design Tokens)
---

# Build Layout Workflow

## Prerequisites
- Next.js project initialized
- Dev server running on `localhost:3000`

## Steps

### 1. Read the Layout Architect Skill
// turbo
View the skill instructions at `.agent/skills/layout-architect/SKILL.md`.

### 2. Create Design Tokens
Create `app/globals.css` with:
- CSS custom properties for colors (primary, secondary, accent, background, foreground)
- Typography scale (font sizes, weights, line heights)
- Spacing scale (4px increments)
- Border radius tokens
- Shadow tokens

### 3. Create Header Component
Create `components/layout/Header.tsx`:
- Logo (left)
- Navigation menu (center)
- Login + CTA button (right)
- Mobile hamburger menu
- Use React Aria for accessibility

### 4. Create Footer Component
Create `components/layout/Footer.tsx`:
- Logo + tagline
- Navigation links (columns)
- Social icons
- Legal links (Privacy, Terms)
- Newsletter signup form

### 5. Create Container Component
Create `components/layout/Container.tsx`:
- Max-width constraint
- Responsive padding
- Centered content

### 6. Create Bento Grid Component
Create `components/layout/BentoGrid.tsx`:
- CSS Grid-based layout
- Variable column spans
- Gap tokens from design system

### 7. Verify in Browser
// turbo
Navigate to `localhost:3000` and take screenshots of:
- Header (desktop + mobile)
- Footer
- Grid layout test page

### 8. Report Completion
Notify user with screenshots and component list.
