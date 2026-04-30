# PILLARS.md: richardnorwood.com (Brand & Positioning)

## 1. Project Mission & Objectives
- **Mission**: Personal website (DBA Richard Norwood, PMP) and consulting acquisition funnel for Revenue Architecture.
- **Revenue Journey Alignment**: Awareness, Consideration, Decision, Conversion, Retention.

## 2. Core Pillars (Revenue Architecture Manifesto)

### Trust
- [x] Source all content from `content/*.json` files. Never hardcode text.
- [x] Use Supabase SSR clients (`@supabase/ssr`). No client-side secrets.
- [x] Database queries must use Row Level Security (RLS).
- [x] All data must be real from Supabase. No hardcoded mock data in production.

### Transparency
- [x] Align all features to the 5-Stage Revenue Journey (Awareness → Retention).
- [x] Use Revenue Journey Stage Colors from `globals.css` for visualizations.
- [x] Error messages must be meaningful, not generic "failed" text.
- [x] Pricing engagements are discussed in discovery — no hidden fees.
- [x] Content freshness: ≤30 days = Fresh, 31-90 days = Current, >90 days = Aging.

### Results
- [x] Run `npm run lint` before marking any workflow complete.
- [x] Run `npm run build` before deployment.
- [x] Capture screenshots (desktop + mobile) for visual verification.
- [x] Speed to Lead: minimize friction in forms, enable instant booking with Calendly.
- [x] All outputs must be measurable and actionable.
