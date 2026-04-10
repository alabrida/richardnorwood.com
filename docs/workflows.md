# Build Site Workflow (Master Orchestrator)

## Complete Workflow Inventory

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

---

## Execution Model (Dependency Graph)

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
- [ ] All 12 workflows completed with Validation checklists passed.
- [ ] Full navigation test complete (all pages reachable).
- [ ] Screenshot gallery captured (desktop + mobile for every page).
- [ ] `walkthrough.md` generated with page/component inventory.
- [ ] Passes `npm run lint` and `npm run build`.
