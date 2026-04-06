---
description: Master orchestrator to build the entire site with parallel execution
---

# Build Site Workflow (Master Orchestrator)

## Complete Workflow Inventory

| Workflow | Agent(s) | Purpose |
| --- | --- | --- |
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

---

## Execution Model (Dependency Graph)

```text
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

---

## Pre-Flight Checks
- [ ] Node.js v18+ installed.
- [ ] Git repository initialized.
- [ ] `credentials/.env` exists with all required keys.
- [ ] All agent skills reviewed and understood.

## Rules of Engagement (Master Orchestrator)
> All rules from workspace `GEMINI.md` apply. All rules apply at site level.

**Additional Orchestrator Rules:**
- Phase Dependencies: Foundation → Public Pages → Case Study (strict order).
- Parallel Execution: Phase 2 workflows run in parallel.
- Lint Gate: No workflow marked complete if `npm run lint` fails.
- This website is a microservice — no SaaS logic (RJAT, Dashboard, Pro Tools).

## Validation (Site-Level)
> See common validation for full checklist.

- [ ] All 12 workflows completed with Validation checklists passed (9 website + 3 XP case study).
- [ ] Full navigation test complete (all pages reachable).
- [ ] Screenshot gallery captured (desktop + mobile for every page).
- [ ] `walkthrough.md` generated with page/component inventory.
- [ ] Passes `npm run lint` and `npm run build`.

---

## Prerequisites

### 1. Project Initialization
// turbo
```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 2. Install Dependencies
// turbo
```bash
npm install framer-motion @tanstack/react-form @tanstack/react-table recharts sonner @supabase/supabase-js @supabase/ssr downshift
npm install -D @types/node
```

### 3. Environment Setup
Copy credentials to `.env.local`:
```bash
cp credentials/.env .env.local
```

### 4. Start Dev Server
// turbo
```bash
npm run dev
```

---

## Phase 1: Foundation (Sequential)

### 1.1 Execute /build-layout
Creates: Design tokens, Header, Footer, Container, BentoGrid.
**WAIT FOR COMPLETION**

### 1.2 Execute /build-auth
Creates: Client Login, Password Reset, Portal, Middleware (onboarded clients only — no public signup).
**WAIT FOR COMPLETION**

---

## Phase 2: Public Pages (Parallel)

Execute these workflows **simultaneously**:

| Workflow | Output |
| --- | --- |
| `/build-homepage` | Homepage with all sections |
| `/build-services` | Services page (90-Day) |
| `/build-pricing` | Pricing page with tiers |
| `/build-contact` | Contact form + Calendly |
| `/build-blog` | Blog system |
| `/build-calculator` | Prequalifier form |

**These have NO dependencies on each other.**

---

## Phase 3: Case Study (Sequential)

### 3.1 Execute /build-xp-shell
Creates: Desktop, Taskbar, Start Menu, Window Manager, Luna theme.
**WAIT FOR COMPLETION**

### 3.2 Execute /build-xp-apps
Creates: IE6, Outlook Express, AIM, Calculator, Notepad, etc.
**WAIT FOR COMPLETION**

### 3.3 Execute /build-xp-integration
Creates: Supabase wiring, sounds, BSOD, mobile support, polish.

---

## Phase 4: Verification

### 4.1 Full Site Navigation Test
Navigate through every page:
1. Homepage (all sections)
2. Services (partnership phases)
3. Pricing (partnership tiers — no prices)
4. Contact (form + Calendly)
5. Blog (list + post)
6. Calculator (prequalifier → services or calendly)
7. Desktop (XP case study)
8. Login → Portal (authenticated clients only)

### 4.2 Screenshot Gallery
Capture screenshots of every page:
- Desktop view
- Mobile view

### 4.3 Generate Walkthrough
Create `walkthrough.md` with:
- Page inventory
- Component inventory
- Screenshot gallery
- Known issues

---

## Parallel Execution Command

To run Phase 2 workflows in parallel:

```powershell
# PowerShell - Run in separate terminals or jobs
Start-Job { cd d:\richardnorwood.com; # invoke /build-homepage }
Start-Job { cd d:\richardnorwood.com; # invoke /build-services }
Start-Job { cd d:\richardnorwood.com; # invoke /build-pricing }
Start-Job { cd d:\richardnorwood.com; # invoke /build-contact }
Start-Job { cd d:\richardnorwood.com; # invoke /build-blog }
Start-Job { cd d:\richardnorwood.com; # invoke /build-calculator }
```

Or use `waitForPreviousTools: false` when invoking sub-agents.
