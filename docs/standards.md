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
- Pricing engagements are discussed in discovery — no hidden fees.
- Content freshness: ≤30 days = Fresh, 31-90 days = Current, >90 days = Aging.

## Results
- Run `npm run lint` before marking any workflow complete.
- Run `npm run build` before deployment.
- Capture screenshots (desktop + mobile) for visual verification.
- Speed to Lead: minimize friction in forms, enable instant booking with Calendly.
- All outputs must be measurable and actionable.

# Role Rules

## Frontend Builder
- Every section must have at least one Framer Motion animation ("Wow Factor").
- Respect `prefers-reduced-motion` for accessibility.
- Single primary CTA per fold. High contrast. Action-oriented text.
- Never use pre-styled component libraries (shadcn, DaisyUI). Custom only.
- Mobile-first CSS using `min-width` breakpoints.

## Microservice Architecture
- Use Next.js Server Components for data fetching.
- Show skeleton loaders during data fetch, never blank states.
- This website is a standalone microservice within the larger platform.
- Auth is for onboarded partnership clients only (admin-created accounts).
- Client portal links to externally-provisioned dashboards (Terraform).
- No SaaS subscription logic, BlurGate, or credit-based unlocks on this site.

## Logic Engineer
- All TypeScript. Generate types from Supabase schema.
- Use `@tanstack/react-form` for form state management.
- API integrations: Supabase (auth + leads), n8n webhooks, WordPress (blog).
- Secure API routes with authentication middleware.

# Common Validation Checklist
- [ ] No console errors in browser.
- [ ] No TypeScript warnings or errors.
- [ ] Passes `npm run lint`.
- [ ] Passes `npm run build`.
- [ ] Screenshots captured (desktop + mobile).
- [ ] Content matches source JSON files.
- [ ] Accessibility checked (keyboard nav, contrast, reduced motion).
- [ ] Core Web Vitals acceptable (LCP < 2.5s, CLS < 0.1).
