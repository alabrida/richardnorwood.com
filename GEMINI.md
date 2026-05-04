# Gemini.md: richardnorwood.com

> **Strategic Governance**: This project is governed by the core pillars in **`PILLARS.md`** and must pass the validation gates in **`WORKBOOK.md`**.

## 1. Role Rules
### Frontend Builder
- Every section must have at least one Framer Motion animation ("Wow Factor").
- Respect `prefers-reduced-motion` for accessibility.
- Single primary CTA per fold. High contrast. Action-oriented text.
- Never use pre-styled component libraries (shadcn, DaisyUI). Custom only.
- Mobile-first CSS using `min-width` breakpoints.

### Logic Engineer
- All TypeScript. Generate types from Supabase schema.
- Use `@tanstack/react-form` for form state management.
- API integrations: Supabase (auth + leads), n8n webhooks, WordPress (blog).
- Secure API routes with authentication middleware.

### Microservice Architecture
- Use Next.js Server Components for data fetching.
- Show skeleton loaders during data fetch, never blank states.
- This website is a standalone microservice within the larger platform.
- Auth is for onboarded partnership clients only (admin-created accounts).
- Client portal links to externally-provisioned dashboards (Terraform).
- SaaS product access and gating logic live outside this repo; this site is the consulting funnel and portfolio surface.

## 2. Execution Model (Dependency Graph)
```
PHASE 1: FOUNDATION (Sequential)
┌─────────────────┐     ┌─────────────────┐
│  /build-layout  │ ──▶ │   /build-auth   │ (client-only)
└─────────────────┘     └─────────────────┘

PHASE 2: PUBLIC PAGES (Parallel)
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ /build-homepage │  │ /build-services │  │ /build-pricing  │
└─────────────────┘  └─────────────────┘  └─────────────────┘

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ /build-contact  │  │   /build-blog   │  │/build-calculator│
└─────────────────┘  └─────────────────┘  └─────────────────┘

PHASE 3: CASE STUDY (Sequential — after Layout)
┌─────────────────┐     ┌─────────────────┐     ┌───────────────────────┐
│ /build-xp-shell │ ──▶ │ /build-xp-apps  │ ──▶ │ /build-xp-integration │
└─────────────────┘     └─────────────────┘     └───────────────────────┘
```

## 3. Workflow Inventory (Master Orchestrator)

| Workflow | Agent(s) | Purpose |
|---|---|---|
| `/build-layout` | Layout Architect | Design tokens, Header, Footer |
| `/build-auth` | Logic Engineer | Client login, password reset (onboarded clients only) |
| `/build-homepage` | Frontend Builder, Content Strategist | Hero, Ideology, Social Proof, About |
| `/build-services` | Content Strategist, Frontend Builder | Strategic Partnership page |
| `/build-pricing` | Frontend Builder, Content Strategist | Partnership tiers (no prices) |
| `/build-contact` | Frontend Builder, Logic Engineer | Contact form, Calendly |
| `/build-blog` | Content Strategist, Logic Engineer | WordPress headless blog |
| `/build-calculator` | Logic Engineer, Content Strategist | 5-question prequalifier |
| `/build-hero` | Frontend Builder | Hero section only |
| `/build-xp-shell` | XP Shell Architect | Desktop, Taskbar, Start Menu |
| `/build-xp-apps` | Retro App Builder | IE6, Outlook, AIM, etc. |
| `/build-xp-integration` | Logic Engineer | Supabase, sounds, polish |

## 4. Detailed Workflow Steps

### Layout Workflow
1. Create Design Tokens in `app/globals.css`.
2. Create `Header.tsx`, `Footer.tsx`, `Container.tsx`, `BentoGrid.tsx`.

### Auth Workflow
1. Configure Supabase Auth.
2. Create `lib/supabase/client.ts` and `server.ts`.
3. Build Login, Forgot Password, and Reset Password pages.
4. Create `middleware.ts` for route protection.

### Homepage Workflow
1. Create/Verify content in `content/homepage.json`.
2. Build Hero, Ideology, Social Proof, and About sections.
3. Assemble in `app/page.tsx`.

### Services Workflow
1. Create/Verify content in `content/services.json`.
2. Build Services Hero, Tiers, Timeline, and Curriculum sections.
3. Assemble in `app/services/page.tsx`.

### Pricing Workflow
1. Create/Verify content in `content/pricing.json`.
2. Build Pricing Hero, Features Breakdown, Grid, Comparison Table, and FAQ.
3. Assemble in `app/pricing/page.tsx`.

### Contact Workflow
1. Build Contact Hero, Form, and Calendly Embed.
2. Create `/api/contact` route.
3. Assemble in `app/contact/page.tsx`.

### Blog Workflow
1. Create WordPress Client in `lib/wp.ts`.
2. Build Blog Hero, Card, Index Page, and Single Post Page.

### Calculator Workflow
1. Define Questions (Awareness to Retention).
2. Build `CalculatorForm.tsx` and logic in `/api/calculate`.
3. Build Results display.

## 5. VDO Hygiene & Validation
- [x] **250-Line Mandate**: 100% compliance achieved on 2026-04-09.
- [x] **Structure**: `agents/`, `skills/`, `workflows/` directories present.
- [x] **Screenshots**: Captured for visual verification.

---

## VDO Audit Entry Log
*   **2026-04-09**: **VDO AUDIT FAIL (Hygiene)**. 40 violations detected. [See full report](D:/audits/richardnorwood.com-audit.md)
*   **2026-04-09**: **VDO AUDIT PASS (Documentation)**. `GEMINI.md` modularized.
*   **2026-04-10**: **VDO AUDIT PASS (Complete)**. 100% hygiene compliance achieved. Consulting funnel implemented.
*   **2026-04-10**: **Production Readiness Audit**: Integrated Google Application Workbook standards with VDO core pillars.
