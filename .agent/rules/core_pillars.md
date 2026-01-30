# Core Pillars (Revenue Architecture Manifesto)

## Trust
- Source all content from `content/*.json` files. Never hardcode text.
- Use Supabase SSR clients (`@supabase/ssr`). No client-side secrets.
- Database queries must use Row Level Security (RLS).
- All data must be real from Supabase. No hardcoded mock data in production.

## Transparency
- Align all features to the 5-Stage Revenue Journey (Awareness → Retention).
- Use Revenue Journey Stage Colors from `globals.css` for visualizations.
- Error messages must be meaningful, not generic "failed" text.
- Pricing must be transparent — no hidden fees.
- Content freshness: ≤30 days = Fresh, 31-90 days = Current, >90 days = Aging.

## Results
- Run `npm run lint` before marking any workflow complete.
- Run `npm run build` before deployment.
- Capture screenshots (desktop + mobile) for visual verification.
- Speed to Lead: minimize friction in forms, enable instant booking with Calendly.
- All outputs must be measurable and actionable.
