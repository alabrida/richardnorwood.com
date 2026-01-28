---
name: Frontend Builder
description: Expert in building high-converting, animated UI components using cutting-edge libraries.
---

# Frontend Builder Skill

## Purpose
To build the visual, interactive components that users see and touch—the Hero, Cards, Pricing Grids, and CTAs that drive conversion.

## Foundational Context (MUST READ)
The output of this skill must align with the Revenue Architecture Doctrine. Before designing or building components, verify alignment with:
1.  **[The Five-Stage Revenue Journey Doctrine](file:///d:/richardnorwood.com/docs/The Five-Stage Revenue Journey Doctrine.md)** - For understanding the user journey stage (Awareness, Consideration, etc.).
2.  **[The Revenue Architecture Manifesto](file:///d:/richardnorwood.com/docs/The Revenue Architecture Manifesto_ A Unified Commercial Doctrine.md)** - For tone and strategic intent.

## Core Library Toolkit

| Category | Library | Notes |
|---|---|---|
| **Animation** | `motion` (formerly `framer-motion`) | **CRITICAL:** Use `major` versions. Leverage "Hybrid Engine" for 120fps. |
| **Animated Components** | `aceternity-ui`, `magic-ui` | Pre-built "Wow Factor" components. |
| **Toast Notifications** | `sonner` | Modern, accessible toasts. |
| **Primitives** | `@base-ui-components/react` | Unstyled dialogs, popovers. |

## Browser & Visual Tools

| Tool | Use Case |
|---|---|
| **Browser Subagent** | Navigate to `localhost:3000` to test animations and interactions. |
| **Screenshots** | Capture hero sections, CTAs, and animated components. |
| **Click/Hover Testing** | Verify micro-interactions and hover states. |
| **Responsive Testing** | Resize browser to test mobile/tablet/desktop views. |

## Design Inspiration Sources (2025 Refresher)
Use these sources to inform "Premium" and "Wow Factor" design decisions:

| Source | Specialty |
|---|---|
| **[Godly](https://godly.website)** | Bold, visually stunning, high-end web designs. |
| **[Bento Grids](https://bentogrids.com)** | Structured, grid-based layouts (Crucial for SaaS Dashboards). |
| **[Saaspo](https://saaspo.com)** | SaaS dashboards and B2B product UI. |
| **[Website Vice](https://websitevice.com)** | Modern AI & SaaS landing pages. |
| **[Lapa Ninja](https://lapa.ninja)** | Conversion-focused landing pages. |
| **[Awwwards](https://awwwards.com)** | Global best-in-class interactive experiences. |
| **[UI Movement](https://uimovement.com)** | Specific reference for animations and interactions. |

## 2026 Design Trends & Directives
Based on industry leaders (Figma, Lovable, Wix), prioritize these aesthetics:

### 1. Kinetic & Expressive Typography
- **Concept**: Text is no longer static. Use variable fonts that change weight/width on scroll or hover.
- **Implementation**: Large, poster-style headers that react to cursor movement. "Scrollytelling" text reveals.

### 2. Neo-Brutalism & Anti-Design
- **Concept**: Raw, unpolished, high-contrast. Rejection of the "corporate Memphis" look.
- **Implementation**: Sharp borders (3px+), monospaced fonts, clashing neon colors, distinct lack of shadows/gradients in specific components.

### 3. Glassmorphism & Neumorphism Settings
- **Glass**: High blur (20px+), low opacity (10-30%), white borders (1px) for card backgrounds.
- **Neumorphism**: Soft, tactile 3D buttons for fintech/dashboard elements. Use sparingly.

### 4. Micro-Interactions
- **Concept**: The interface should "feel" alive.
- **Directives**:
    - **Buttons**: Scale down (0.95) on click, subtle glow on hover.
    - **Lists**: Staggered entrance animations.
    - **Forms**: Input fields that glow/pulse on focus.

### 5. Immersive 3D & Parallax
- **Concept**: Depth without heavy assets.
- **Implementation**: Layered parallax scrolling (background moves slower than foreground). 3D tilt effects on cards (using `LiquidTiltCard`).

### 6. Bento Grid Layouts
- **Concept**: Modular, distinct compartments for content.
- **Implementation**: CSS Grid based layouts where every cell is a self-contained "card" with internal hover states.


### 7. SaaS High-Trust Aesthetic (The "Linear" Look)
- **Concept**: Precision, clarity, and competence. Opposite of Neo-Brutalism.
- **Implementation**:
    - **Fonts**: Inter, Geist, or other variable sans-serifs.
    - **Colors**: Deep dark mode (slate/zinc/neutral-900), subtle linear gradients for borders.
    - **Lighting**: "Top-down" spotlight effects on cards (radial-gradient borders).
    - **Spacing**: Dense but breathable.

### 8. Developer-Centric Minimalism
- **Concept**: "No-marketing" marketing. The product *is* the marketing.
- **Reference**: TinyAuth, Stripe Press, Appwrite.
- **Implementation**:
    - **Copy**: Extremely concise. "Five-minute installation." "No dependencies."
    - **Visuals**: Terminal windows, code snippets as heroes, monospaced typography for non-code elements.
    - **Palette**: High-contrast monochrome (Black/White) with one accent color.



## Rules of Engagement
1.  **"Wow Factor" is Mandatory:** Every major section (Hero, Features, Pricing) must have at least one subtle animation.
2.  **Accessibility:** All animations must respect `prefers-reduced-motion`. Use `useReducedMotion` hook.
3.  **Performance:** Images must be `next/image`. SVGs must be inlined for animation. Lazy-load below-fold content.
4.  **No Generic Defaults:** If a component looks like it came from shadcn/daisy, REJECT IT. Customize the styling.
5.  **Single CTA per fold.** High contrast. Action-oriented text ("Start My Audit," not "Submit").
6.  **Visual Verification:** Always test animations in browser. Take screenshots for review.

## Outputs
*   `components/sections/HeroSection.tsx`
*   `components/sections/FeaturesGrid.tsx`
*   `components/sections/PricingCards.tsx`
*   `components/ui/AnimatedButton.tsx`
*   `components/ui/KineticHeadline.tsx`
*   `components/ui/Toaster.tsx` (Sonner wrapper)
