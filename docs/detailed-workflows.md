# Detailed Workflows

## Layout Workflow
### Prerequisites
- Next.js project initialized
- Dev server running on `localhost:3000`
### Steps
1. Create Design Tokens in `app/globals.css`.
2. Create `components/layout/Header.tsx`.
3. Create `components/layout/Footer.tsx`.
4. Create `components/layout/Container.tsx`.
5. Create `components/layout/BentoGrid.tsx`.

## Auth Workflow
### Prerequisites
- Layout components exist
- Supabase project configured
### Steps
1. Configure Supabase Auth.
2. Create `lib/supabase/client.ts` and `server.ts`.
3. Build Login, Forgot Password, and Reset Password pages.
4. Create `middleware.ts` for route protection.

## Homepage Workflow
### Steps
1. Create/Verify content in `content/homepage.json`.
2. Build Hero, Ideology, Social Proof, and About sections.
3. Assemble in `app/page.tsx`.

## Services Workflow
### Steps
1. Create/Verify content in `content/services.json`.
2. Build Services Hero, Tiers, Timeline, and Curriculum sections.
3. Assemble in `app/services/page.tsx`.

## Pricing Workflow
### Steps
1. Create/Verify content in `content/pricing.json`.
2. Build Pricing Hero, Features Breakdown, Grid, Comparison Table, and FAQ.
3. Assemble in `app/pricing/page.tsx`.

## Contact Workflow
### Steps
1. Build Contact Hero, Form, and Calendly Embed.
2. Create `/api/contact` route.
3. Assemble in `app/contact/page.tsx`.

## Blog Workflow
### Steps
1. Create WordPress Client in `lib/wp.ts`.
2. Build Blog Hero, Card, Index Page, and Single Post Page.

## Calculator Workflow
### Steps
1. Define Questions (Awareness to Retention).
2. Build `CalculatorForm.tsx` and logic in `/api/calculate`.
3. Build Results display.

## XP Case Study Workflows
### Shell
- Build Desktop, Taskbar, Start Menu, and Window Manager.
### Apps
- Build IE6, Outlook Express, AIM, etc.
### Integration
- Connect Supabase, add sounds, and polish UI.
