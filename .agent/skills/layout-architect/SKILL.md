---
name: Layout Architect
description: Expert in foundational site structure, design systems, and CSS architecture.
---

# Layout Architect Skill

## Purpose
To establish the foundational "bones" of the website—the global elements, design tokens, and responsive grid system that all other components inherit from.

## Foundational Context (MUST READ)
The output of this skill must align with the Revenue Architecture Doctrine. Before designing or building components, verify alignment with:
1.  **[The Five-Stage Revenue Journey Doctrine](file:///d:/richardnorwood.com/docs/The Five-Stage Revenue Journey Doctrine.md)** - For understanding the user journey stage (Awareness, Consideration, etc.).
2.  **[The Revenue Architecture Manifesto](file:///d:/richardnorwood.com/docs/The Revenue Architecture Manifesto_ A Unified Commercial Doctrine.md)** - For tone and strategic intent.

## Core Library Toolkit

| Category | Library | Version |
|---|---|---|
| **Primitives** | `@base-ui-components/react` OR `react-aria-components` | Latest |
| **Styling** | `tailwindcss` | v4+ |
| **Fonts** | `next/font` (Google Fonts: Inter, Outfit) | - |

## Browser & Visual Tools

| Tool | Use Case |
|---|---|
| **Browser Subagent** | Navigate to `localhost:3000` to verify layouts. |
| **Screenshots** | Capture and review rendered components. |
| **DOM Inspection** | Validate HTML structure and CSS application. |

## Rules of Engagement
1.  **Mobile-First:** All CSS must be written mobile-first (`min-width` breakpoints).
2.  **CSS Variables:** Define all colors, spacing, and fonts as CSS custom properties in `globals.css` for easy theming.
3.  **Accessibility:** All layouts must pass WCAG 2.1 AA contrast ratios.
4.  **Performance:** No layout shift (CLS). Use `font-display: swap`.
5.  **NO DEFAULTS:** Never use shadcn, DaisyUI, or pre-styled component libraries.
6.  **Visual Verification:** Always verify components in browser before completion.

## Outputs
*   `app/globals.css` (Design Tokens)
*   `components/layout/Header.tsx`
*   `components/layout/Footer.tsx`
*   `components/layout/Container.tsx`
*   `components/layout/BentoGrid.tsx`

## 2026 Layout Trends
1. **Experimental Navigation**: Move beyond the standard top-bar. Consider radial menus, side-drawers, or "island" style floating nav bars (like macOS dock).
2. **Bento Grids**: Everything should fit into a modular, responsive grid. "Everything is a box."
3. **Organic Shapes vs. Grid**: While the *structure* is grid-based, break the monotony with organic shaped images or flowing dividers (waves, curves) to soften the "tech" feel.
4. **Asymmetry**: Use offset columns (e.g., 40/60 splits) rather than perfect 50/50 symmetry to create visual tension and interest.
