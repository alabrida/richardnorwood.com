# Workspace Rules: richardnorwood.com

## Core Pillars (Revenue Architecture Manifesto)

### Trust
- Source all content from `content/*.json` files. Never hardcode text.
- Use Supabase SSR clients (`@supabase/ssr`). No client-side secrets.
- Database queries must use Row Level Security (RLS).
- All data must be real from Supabase. No hardcoded mock data in production.

### Transparency
- Align all features to the 5-Stage Revenue Journey (Awareness → Retention).
- Use Revenue Journey Stage Colors from `globals.css` for visualizations.
- Error messages must be meaningful, not generic "failed" text.
- Pricing must be transparent — no hidden fees.
- Content freshness: ≤30 days = Fresh, 31-90 days = Current, >90 days = Aging.

### Results
- Run `npm run lint` before marking any workflow complete.
- Run `npm run build` before deployment.
- Capture screenshots (desktop + mobile) for visual verification.
- Speed to Lead: minimize friction in forms, enable instant booking with Calendly.
- All outputs must be measurable and actionable.

## Role Rules

### Frontend Builder
- Every section must have at least one Framer Motion animation ("Wow Factor").
- Respect `prefers-reduced-motion` for accessibility.
- Single primary CTA per fold. High contrast. Action-oriented text.
- Never use pre-styled component libraries (shadcn, DaisyUI). Custom only.
- Mobile-first CSS using `min-width` breakpoints.

### FullStack Developer
- Use Next.js Server Components for data fetching.
- Show skeleton loaders during data fetch, never blank states.
- BlurGate logic must match tier definitions:
  - Free: Blur all except Top 5 leaks
  - Standard: Unblur dashboard + history
  - Pro: Unblur all + Chat + Generator
  - Battleship: Credit-based unlock
- Real-time updates via Supabase subscriptions where applicable.

### Logic Engineer
- All TypeScript. Generate types from Supabase schema.
- Scoring must follow Revenue Journey Rubric Master exactly.
- Use `@tanstack/react-form` for form state management.
- API integrations: Supabase, Stripe, n8n webhooks, Apify, SERP API.
- Secure API routes with authentication middleware.

## Common Validation Checklist
- [ ] No console errors in browser.
- [ ] No TypeScript warnings or errors.
- [ ] Passes `npm run lint`.
- [ ] Passes `npm run build`.
- [ ] Screenshots captured (desktop + mobile).
- [ ] Content matches source JSON files.
- [ ] Accessibility checked (keyboard nav, contrast, reduced motion).
- [ ] Core Web Vitals acceptable (LCP < 2.5s, CLS < 0.1).

## Workflows

### Build Site Workflow (Master Orchestrator)

#### Complete Workflow Inventory

| Workflow | Agent(s) | Purpose |
|---| `/build-layout` | Layout Architect | Design tokens, Header, Footer |
| `/build-auth` | Logic Engineer | Login, Signup, Password Reset |
| `/build-homepage` | Frontend Builder, Content Strategist | Hero, Ideology, Social Proof, About |
| `/build-services` | Content Strategist, Frontend Builder | 90-Day Partnership page |
| `/build-pricing` | Frontend Builder, Content Strategist | SaaS tiers, comparison |
| `/build-contact` | Frontend Builder, Logic Engineer | Contact form, Calendly |
| `/build-blog` | Content Strategist, Logic Engineer | WordPress/MDX blog |
| `/build-calculator` | Logic Engineer | 5-question prequalifier |
| `/build-rjat` | Logic Engineer, Frontend Builder | Assessment tool engine |
| `/build-dashboard` | FullStack Dev | Scorecard, Leak List, BlurGate |
| `/build-pro-tools` | FullStack Dev, Logic Engineer | Chat, Generator |
| `/build-hero` | Frontend Builder | Hero section only |

---

#### Execution Model (Dependency Graph)

```
PHASE 1: FOUNDATION (Sequential)
┌─────────────────┐     ┌─────────────────┐
│  /build-layout  │ ──▶ │   /build-auth   │
└─────────────────┘     └─────────────────┘

PHASE 2: PUBLIC PAGES (Parallel)
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ /build-homepage │  │ /build-services │  │ /build-pricing  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
         │                   │                    │
         └───────────────────┼────────────────────┘
                             │
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ /build-contact  │  │   /build-blog   │  │/build-calculator│
└─────────────────┘  └─────────────────┘  └─────────────────┘

PHASE 3: APP LAYER (Sequential after Auth)
┌─────────────────┐
│   /build-rjat   │  (Payment Gate)
└────────┬────────┘
         │
┌────────▼────────┐
│ /build-dashboard│
└────────┬────────┘
         │
┌────────▼────────┐
│/build-pro-tools │
└─────────────────┘
```

---

#### Pre-Flight Checks
- [ ] Node.js v18+ installed.
- [ ] Git repository initialized.
- [ ] `credentials/.env` exists with all required keys.
- [ ] All agent skills reviewed and understood.

#### Rules of Engagement (Master Orchestrator)
> All rules from workspace `GEMINI.md` apply. All rules apply at site level.


**Additional Orchestrator Rules:**
- Phase Dependencies: Foundation → Public Pages → App Layer (strict order).
- Parallel Execution: Phase 2 workflows run in parallel.
- Lint Gate: No workflow marked complete if `npm run lint` fails.

#### Validation (Site-Level)
> See common validation for full checklist.

- [ ] All 12 workflows completed with Validation checklists passed.
- [ ] Full navigation test complete (all pages reachable).
- [ ] Screenshot gallery captured (desktop + mobile for every page).
- [ ] `walkthrough.md` generated with page/component inventory.
- [ ] Passes `npm run lint` and `npm run build`.

---

#### Prerequisites

##### 1. Project Initialization
// turbo
```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

##### 2. Install Dependencies
// turbo
```bash
npm install framer-motion @tanstack/react-form @tanstack/react-table recharts sonner @supabase/supabase-js downshift ai
npm install -D @types/node
```

##### 3. Environment Setup
Copy credentials to `.env.local`:
```bash
cp credentials/.env .env.local
```

##### 4. Start Dev Server
// turbo
```bash
npm run dev
```

---

#### Phase 1: Foundation (Sequential)

##### 1.1 Execute /build-layout
Creates: Design tokens, Header, Footer, Container, BentoGrid.
**WAIT FOR COMPLETION**

##### 1.2 Execute /build-auth
Creates: Login, Signup, Password Reset, Middleware.
**WAIT FOR COMPLETION**

---

#### Phase 2: Public Pages (Parallel)

Execute these workflows **simultaneously**:

| Workflow | Output |
| `/build-homepage` | Homepage with all sections |
| `/build-services` | Services page (90-Day) |
| `/build-pricing` | Pricing page with tiers |
| `/build-contact` | Contact form + Calendly |
| `/build-blog` | Blog system |
| `/build-calculator` | Prequalifier form |

**These have NO dependencies on each other.**

---

#### Phase 3: App Layer (Sequential)

##### 3.1 Execute /build-rjat
Creates: URL input, processing state, payment gate.
**WAIT FOR COMPLETION**

##### 3.2 Execute /build-dashboard
Creates: Scorecard, Leak List, History, BlurGate.
**WAIT FOR COMPLETION**

##### 3.3 Execute /build-pro-tools
Creates: Chat Interface, Landing Page Generator.

---

#### Phase 4: Verification

##### 4.1 Full Site Navigation Test
Navigate through every page:
1. Homepage (all sections)
2. Services
3. Pricing (tier toggle)
4. Contact (form + Calendly)
5. Blog (list + post)
6. Calculator (all paths)
7. RJAT (processing + gate)
8. Dashboard (all tier views)

##### 4.2 Screenshot Gallery
Capture screenshots of every page:
- Desktop view
- Mobile view

##### 4.3 Generate Walkthrough
Create `walkthrough.md` with:
- Page inventory
- Component inventory
- Screenshot gallery
- Known issues

---

#### Parallel Execution Command

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


### Build Layout Workflow

#### Prerequisites
- Next.js project initialized
- Dev server running on `localhost:3000`

#### Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] Tailwind CSS is configured.
- [ ] Google Fonts (Inter, Outfit) are available.

#### Rules of Engagement
> All rules from workspace `GEMINI.md` apply.

 CSS vars in `:root`, no inline colors |

#### Validation
> See common validation for full checklist.

- [ ] CSS variables defined in `globals.css` for all colors, spacing, typography.
- [ ] Header renders correctly (logo, nav, CTA).
- [ ] Footer renders correctly (links, social, legal).
- [ ] Mobile hamburger menu functional.
- [ ] Passes common validation (lint, build, screenshots).

#### Steps

##### 1. Read the Layout Architect Skill
// turbo
View the skill instructions at `.agent/skills/layout-architect/SKILL.md`.

##### 2. Create Design Tokens
Create `app/globals.css` with:
- CSS custom properties for colors (primary, secondary, accent, background, foreground)
- Typography scale (font sizes, weights, line heights)
- Spacing scale (4px increments)
- Border radius tokens
- Shadow tokens

##### 3. Create Header Component
Create `components/layout/Header.tsx`:
- Logo (left)
- Navigation menu (center)
- Login + CTA button (right)
- Mobile hamburger menu
- Use React Aria for accessibility

##### 4. Create Footer Component
Create `components/layout/Footer.tsx`:
- Logo + tagline
- Navigation links (columns)
- Social icons
- Legal links (Privacy, Terms)
- Newsletter signup form

##### 5. Create Container Component
Create `components/layout/Container.tsx`:
- Max-width constraint
- Responsive padding
- Centered content

##### 6. Create Bento Grid Component
Create `components/layout/BentoGrid.tsx`:
- CSS Grid-based layout
- Variable column spans
- Gap tokens from design system

##### 7. Verify in Browser
// turbo
Navigate to `localhost:3000` and take screenshots of:
- Header (desktop + mobile)
- Footer
- Grid layout test page

##### 8. Report Completion
Notify user with screenshots and component list.


### Build Auth Workflow

#### Prerequisites
- Layout components exist
- Supabase project configured
- Dev server running on `localhost:3000`

#### Agent Assignments
- **Logic Engineer**: Auth logic, Supabase integration
- **Frontend Builder**: Auth UI components

#### Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] `SUPABASE_URL` and `SUPABASE_ANON_KEY` set in `.env.local`.
- [ ] Supabase project has Auth enabled with email/password.

#### Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


#### Validation
> See common validation for full checklist.

- [ ] Signup creates user in Supabase.
- [ ] Login sets session cookie correctly.
- [ ] Protected routes redirect unauthenticated users.
- [ ] Password reset email sends successfully.
- [ ] Passes common validation (lint, build, screenshots).

#### Steps

##### 1. Read Required Skills
// turbo
View `.agent/skills/logic-engineer/SKILL.md`.

##### 2. Configure Supabase Auth
Verify Supabase Auth settings:
- Email/Password enabled
- OAuth providers (Google, etc.) if needed
- Email templates configured

##### 3. Create Auth Utilities
Create `lib/supabase/client.ts`:
```ts
import { createBrowserClient } from '@supabase/ssr'
export function createClient() { ... }
```

Create `lib/supabase/server.ts`:
```ts
import { createServerClient } from '@supabase/ssr'
export function createClient() { ... }
```

##### 4. Build Login Page
Create `app/(auth)/login/page.tsx`:
- Email input
- Password input
- "Remember me" checkbox
- Login button
- "Forgot password" link
- OAuth buttons (if enabled)
- "Don't have an account? Sign up" link

##### 5. Build Signup Page
Create `app/(auth)/signup/page.tsx`:
- Name input
- Email input
- Password input
- Confirm password
- Terms checkbox
- Signup button
- "Already have an account? Login" link

##### 6. Build Forgot Password Page
Create `app/(auth)/forgot-password/page.tsx`:
- Email input
- Submit button
- Success message

##### 7. Build Reset Password Page
Create `app/(auth)/reset-password/page.tsx`:
- New password input
- Confirm password
- Submit button

##### 8. Create Auth Middleware
Create `middleware.ts`:
- Check for session
- Redirect unauthenticated users from /dashboard
- Redirect authenticated users from /login

##### 9. Build Auth Form Component
Create `components/forms/AuthForm.tsx`:
- Reusable form for login/signup
- Use `@tanstack/react-form`
- Error handling
- Loading states

##### 10. Test Auth Flow
Navigate to `localhost:3000/login` and:
- Test signup flow
- Test login flow
- Test password reset
- Verify protected route redirect
- Take screenshots

##### 11. Report Completion
Notify user with screenshots.


### Build Homepage Workflow

#### Prerequisites
- Layout components exist (run `/build-layout` first)
- Dev server running on `localhost:3000`

#### Agent Assignments
- **Frontend Builder**: Hero, Ideology, Social Proof, About sections
- **Content Strategist**: Copy for all sections

#### Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] `content/homepage.json` exists with all sections (hero, ideology, social_proof, about).
- [ ] Layout components render correctly.

#### Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


#### Validation
> See common validation for full checklist.

- [ ] All 5 stages render with correct colors and descriptions.
- [ ] Hero, Ideology, Social Proof, About sections all visible.
- [ ] Passes common validation (lint, build, screenshots).

#### Steps

##### 1. Read Required Skills
// turbo
View `.agent/skills/frontend-builder/SKILL.md` and `.agent/skills/content-strategist/SKILL.md`.

##### 2. Create/Verify Content
Ensure `content/homepage.json` exists with:
- Hero: headline, subhead, cta_text, cta_url
- Ideology: 5 stages with titles, descriptions, icons
- Social Proof: case studies, testimonials
- About: bio, credentials, image_url

##### 3. Build Hero Section
Run `/build-hero` workflow or create `components/sections/HeroSection.tsx`:
- Kinetic typography headline
- Value prop subhead
- Primary CTA ("Start Journey")
- Background animation (Aceternity UI)

##### 4. Build Ideology Section
Create `components/sections/IdeologySection.tsx`:
- 5-Stage Revenue Journey visualization
- Scrollytelling or animated timeline
- "Information Fusion" explainer
- Icons/illustrations per stage

##### 5. Build Social Proof Section
Create `components/sections/SocialProofSection.tsx`:
- Case study cards (data-driven metrics)
- Testimonial carousel or grid
- Client logos (if available)

##### 6. Build About Section
Create `components/sections/AboutSection.tsx`:
- "The Architect" persona
- Bio and credentials
- Profile image
- Personal CTA

##### 7. Assemble Homepage
Update `app/page.tsx`:
```tsx
<HeroSection />
<IdeologySection />
<SocialProofSection />
<AboutSection />
```

##### 8. Verify in Browser
Navigate to `localhost:3000` and:
- Test all animations
- Check responsive behavior
- Take screenshots (desktop + mobile)

##### 9. Report Completion
Notify user with screenshots and section inventory.


### Build Services Workflow

#### Prerequisites
- Layout components exist
- Dev server running on `localhost:3000`

#### Agent Assignments
- **Content Strategist**: Service descriptions, pricing copy
- **Frontend Builder**: Visual components

#### Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] `content/services.json` exists with tier and timeline data.
- [ ] Calculator workflow exists for qualification routing.

#### Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


#### Validation
> See common validation for full checklist.

- [ ] All 3 tiers render from `services.json`.
- [ ] Timeline shows 90-day roadmap with milestones.
- [ ] Curriculum accordion expands/collapses correctly.
- [ ] CTA links to `/calculator`.
- [ ] Passes common validation (lint, build, screenshots).

#### Steps

##### 1. Read Required Skills
// turbo
View `.agent/skills/content-strategist/SKILL.md` and `.agent/skills/frontend-builder/SKILL.md`.

##### 2. Create/Verify Content
Ensure `content/services.json` exists with:
- Service tiers (DFY, DWY, DIY or I, II, III)
- Timeline phases (Ramp, Sprint)
- Weekly class curriculum
- Pricing (if shown here vs pricing page)

##### 3. Build Services Hero
Create `components/sections/ServicesHero.tsx`:
- Page title ("The 90-Day Partnership")
- Value prop subhead
- Anchor link to tiers

##### 4. Build Service Tiers Section
Create `components/sections/ServiceTiers.tsx`:
- 3-tier card layout (or accordion)
- Tier name, description, includes
- CTA per tier ("Apply" / "Learn More")
- Highlight recommended tier

##### 5. Build Timeline Section
Create `components/sections/TimelineSection.tsx`:
- 90-Day visual roadmap
- Ramp Phase (Days 1-30)
- Sprint Phase (Days 31-90)
- Milestone markers

##### 6. Build Curriculum Section
Create `components/sections/CurriculumSection.tsx`:
- Weekly class syllabus
- Topic + description per week
- Expandable/accordion format

##### 7. Build Services CTA
Create `components/sections/ServicesCTA.tsx`:
- "Apply for Partnership" button
- Links to Calculator for qualification

##### 8. Assemble Services Page
Create `app/services/page.tsx`:
```tsx
<ServicesHero />
<ServiceTiers />
<TimelineSection />
<CurriculumSection />
<ServicesCTA />
```

##### 9. Verify in Browser
Navigate to `localhost:3000/services` and:
- Check tier card layouts
- Test accordion/expand behavior
- Take screenshots

##### 10. Report Completion
Notify user with screenshots.


### Build Pricing Workflow

#### Prerequisites
- Layout components exist
- Dev server running on `localhost:3000`

#### Agent Assignments
- **Frontend Builder**: Pricing grid, feature comparison
- **Content Strategist**: Pricing copy, feature descriptions

#### Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] `content/pricing.json` exists with tier definitions.
- [ ] Stripe keys configured (if payment integration needed).

#### Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


#### Validation
> See common validation for full checklist.

- [ ] All tiers render from `pricing.json`.
- [ ] Feature checkmarks display correctly.
- [ ] Tier toggle (monthly/annual) works if applicable.
- [ ] FAQ accordion expands/collapses.
- [ ] JSON-LD FAQPage schema present in page head.
- [ ] Passes common validation (lint, build, screenshots).

#### Steps

##### 1. Read Required Skills
// turbo
View `.agent/skills/frontend-builder/SKILL.md`.

##### 2. Create/Verify Content
Ensure `content/pricing.json` exists with:
- Tier definitions (Snapshots, Memberships, Agency, Battleship)
- Prices per tier
- Features per tier (checkmarks)
- CTA text per tier

##### 3. Build Pricing Hero
Create `components/sections/PricingHero.tsx`:
- Page title ("Simple,- Toggle: Monthly / Annual (if applicable)
- Subhead

##### 4. Build Features Breakdown
Create `components/sections/FeaturesBreakdown.tsx`:
- Dashboard features
- History access
- Pro Tools (Chat, Generator)
- Credit system explanation

##### 5. Build Pricing Grid
Create `components/sections/PricingGrid.tsx`:
- Card per tier
- Price display (monthly/annual toggle)
- Feature checklist
- CTA button ("Get Started" / "Contact Sales")
- Highlight "Most Popular" tier

##### 6. Build Comparison Table
Create `components/sections/ComparisonTable.tsx`:
- All tiers as columns
- All features as rows
- Check/X marks for inclusion
- Sticky header on scroll

##### 7. Build FAQ Section
Create `components/sections/PricingFAQ.tsx`:
- Common pricing questions
- Accordion format
- Schema markup (FAQPage JSON-LD)

##### 8. Assemble Pricing Page
Create `app/pricing/page.tsx`:
```tsx
<PricingHero />
<FeaturesBreakdown />
<PricingGrid />
<ComparisonTable />
<PricingFAQ />
```

##### 9. Verify in Browser
Navigate to `localhost:3000/pricing` and:
- Test tier toggle (if applicable)
- Check comparison table scroll
- Take screenshots

##### 10. Report Completion
Notify user with screenshots.


### Build Contact Workflow

#### Prerequisites
- Layout components exist
- Dev server running on `localhost:3000`

#### Agent Assignments
- **Frontend Builder**: Contact form, Calendly embed
- **Logic Engineer**: Form submission logic

#### Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] n8n webhook URL or Airtable API configured in `.env.local`.
- [ ] Calendly scheduling link available.

#### Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


#### Validation
> See common validation for full checklist.

- [ ] Form submits successfully and stores data.
- [ ] Success toast appears after submission.
- [ ] Calendly widget loads and is bookable.
- [ ] Form validation prevents empty submissions.
- [ ] Passes common validation (lint, build, screenshots).

#### Steps

##### 1. Read Required Skills
// turbo
View `.agent/skills/frontend-builder/SKILL.md` and `.agent/skills/logic-engineer/SKILL.md`.

##### 2. Build Contact Hero
Create `components/sections/ContactHero.tsx`:
- Page title ("Get In Touch")
- Subhead (reason to contact)
- Contact info (email, phone if applicable)

##### 3. Build Contact Form
Create `components/forms/ContactForm.tsx`:
- Use `@tanstack/react-form`
- Fields: Name, Email, Company, Message
- Dropdown: Inquiry type (General, Partnership, Support)
- Submit button with loading state
- Success/Error toast (Sonner)

##### 4. Create Form API Route
Create `app/api/contact/route.ts`:
- Validate form data
- Send to n8n webhook OR Airtable
- Return success/error response

##### 5. Build Calendly Embed
Create `components/ui/CalendlyEmbed.tsx`:
- Embedded Calendly widget
- For "Strategy Call" bookings
- Responsive iframe or widget

##### 6. Build Contact Info Section
Create `components/sections/ContactInfo.tsx`:
- Email link
- Social media links
- Office hours (if applicable)
- Location (if applicable)

##### 7. Assemble Contact Page
Create `app/contact/page.tsx`:
```tsx
<ContactHero />
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <ContactForm />
  <CalendlyEmbed />
</div>
<ContactInfo />
```

##### 8. Verify in Browser
Navigate to `localhost:3000/contact` and:
- Test form validation
- Test form submission
- Verify Calendly loads
- Take screenshots

##### 9. Report Completion
Notify user with screenshots.


### Build Blog Workflow (Headless WordPress)

#### Prerequisites
- WordPress installation accessible via API
- `WP_API_URL` stored in `.env.local`

#### Agent Assignments
- **Logic Engineer**: WordPress API client (`lib/wp.ts`)
- **Frontend Builder**: Blog Index and Single Post templates

#### Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] `WP_API_URL` set in `.env.local` and accessible.
- [ ] WordPress has at least one published post.

#### Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


#### Validation
> See common validation for full checklist.

- [ ] Blog index loads posts from WordPress.
- [ ] Single post renders title, date, content correctly.
- [ ] Content styled with `prose` class.
- [ ] SEO meta tags present in page head.
- [ ] Passes common validation (lint, build, screenshots).

#### Steps

##### 1. Read Required Skills
// turbo
View `.agent/skills/logic-engineer/SKILL.md` and `.agent/skills/frontend-builder/SKILL.md`.

##### 2. Create WordPress Client
Create `lib/wp.ts`:
- Functions: `getAllPosts`, `getPostBySlug`
- Fetch from `process.env.WP_API_URL`
- Type definitions for WP Post object
- Error handling

##### 3. Build Blog Hero
Create `components/sections/BlogHero.tsx`:
- Title: "Insights & Engineering"
- Subtitle: "Thoughts on revenue architecture."

##### 4. Build Blog Card Component
Create `components/ui/BlogCard.tsx`:
- Props: title, excerpt, date, slug, featuredImage
- Hover effects
- Link to `/blog/[slug]`

##### 5. Build Blog Index Page
Create `app/blog/page.tsx`:
- Server Component
- Fetch posts using `getAllPosts`
- Render `BlogHero`
- Render grid of `BlogCard`s

##### 6. Build Single Post Page
Create `app/blog/[slug]/page.tsx`:
- Server Component
- Fetch post using `getPostBySlug`
- Render Title, Date, Content
- Style content using `@tailwindcss/typography` (`prose` class)
- Parse HTML content safely

##### 7. Verify in Browser
Navigate to `localhost:3000/blog` and:
- Verify list loads
- Click a post
- Verify single post renders content correctly

##### 8. Report Completion
Notify user with findings.


### Build Calculator Workflow

#### Prerequisites
- Layout components exist
- Dev server running on `localhost:3000`

#### Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] Rubric Master document reviewed for scoring logic.
- [ ] 5-Stage definitions understood (Awareness→Retention).

#### Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


#### Validation
> See common validation for full checklist.

- [ ] All 5 questions render correctly.
- [ ] Scoring matches Rubric tiers (5-8→Services, 9-11→RJAT, 12-15→Calendly).
- [ ] Each routing path triggers correctly.
- [ ] Progress indicator updates per step.
- [ ] Passes common validation (lint, build, screenshots).

#### Steps

##### 1. Read the Logic Engineer Skill
// turbo
View the skill instructions at `.agent/skills/logic-engineer/SKILL.md`.

##### 2. Define Calculator Questions
The 5-Question Prequalifier should assess the user's revenue engine maturity.
Questions map to the 5 Stages:
1. Awareness (Lead Generation)
2. Consideration (Lead Nurturing)
3. Decision (Sales Process)
4. Conversion (Payment/Onboarding)
5. Retention (Customer Success)

Each question has 3 answer options scoring 1-3.

##### 3. Create Calculator Form Component
Create `components/forms/CalculatorForm.tsx`:
- Use `@tanstack/react-form` for state management
- Progress indicator (step X of 5)
- Radio button groups for each question
- Next/Back navigation
- Animated transitions between questions (Framer Motion)

##### 4. Create Calculator Logic
Create `app/api/calculate/route.ts`:
- Accept form submission
- Calculate total score (5-15 range)
- Determine routing:
  - **5-8 (Bottom Third):** Fractured -> Push to Services
  - **9-11 (Middle Third):** Fragmented -> Push to RJAT
  - **12-15 (Top Third):** Unified -> Push to Strategy Call
- Return result + redirect URL

##### 5. Create Results Component
Create `components/forms/CalculatorResult.tsx`:
- Display score visualization
- Show personalized recommendation
- CTA to next step (Services, RJAT, or Calendly)

##### 6. Create Calculator Page
Create `app/calculator/page.tsx`:
- SEO content block ("Why you need a Revenue Audit")
- CalculatorForm component
- Results display

##### 7. Verify in Browser
Navigate to `localhost:3000/calculator` and:
- Complete the form with different answer combinations
- Verify correct routing logic
- Test form validation
- Take screenshots of each step

##### 8. Report Completion
Notify user with screenshots and routing logic verification.


### Build RJAT Workflow

#### Prerequisites
- Layout components exist
- Auth system configured
- n8n workflow ready
- Dev server running on `localhost:3000`

#### Agent Assignments
- **Logic Engineer**: Scraper interface, n8n integration
- **Frontend Builder**: Processing UI, animations
- **FullStack Dev**: Payment gate integration

#### Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] n8n workflow deployed and webhook accessible.
- [ ] Supabase `revenue_journey_assessments` table created.
- [ ] Stripe keys configured for payment gate.

#### Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


#### Validation
> See common validation for full checklist.

- [ ] Form submission triggers n8n webhook.
- [ ] Processing animation shows stage progress.
- [ ] Payment gate displays blurred results.
- [ ] Stripe checkout redirects correctly.
- [ ] Post-payment redirect to Dashboard.
- [ ] Passes common validation (lint, build, screenshots).

#### Steps

##### 1. Read Required Skills
// turbo
View `.agent/skills/logic-engineer/SKILL.md`.

##### 2. Build RJAT Hero
Create `components/sections/RJATHero.tsx`:
- Page title ("Analyze Your Revenue Engine")
- Value prop
- Trust indicators (security badges)

##### 3. Build URL Input Form
Create `components/forms/RJATForm.tsx`:
- URL input field with validation
- Company name input
- Email input (for results delivery)
- Submit button

##### 4. Build Processing State
Create `components/rjat/ProcessingState.tsx`:
- "Scanning..." animation
- Progress indicators
- Stages: Website, Social, Analytics
- Estimated time remaining

##### 5. Build Payment Gate
Create `components/rjat/PaymentGate.tsx`:
- "Your report is ready" message
- Blurred preview of results
- Pricing options (Snapshot vs Membership)
- Stripe checkout integration

##### 6. Create RJAT API Route
Create `app/api/rjat/route.ts`:
- Accept URL submission
- Validate input
- Trigger n8n webhook
- Return job ID

##### 7. Create Status Polling
Create `app/api/rjat/[jobId]/status/route.ts`:
- Check job status in Supabase
- Return progress percentage
- Return results when complete

##### 8. Build Results Preview
Create `components/rjat/ResultsPreview.tsx`:
- Blurred scorecard
- Clear "Top 5 Leaks" teaser
- CTA to unlock full report

##### 9. Assemble RJAT Page
Create `app/rjat/page.tsx`:
- Conditional rendering based on state:
  - Form (initial)
  - Processing (after submit)
  - Payment Gate (processing complete)
  - Redirect to Dashboard (after payment)

##### 10. Verify in Browser
Navigate to `localhost:3000/rjat` and:
- Test form submission
- Test processing animation
- Test payment gate display
- Take screenshots of each state

##### 11. Report Completion
Notify user with screenshots.


### Build Dashboard Workflow

#### Prerequisites
- Auth system configured (Supabase Auth)
- Database tables exist (`revenue_journey_assessments`)
- Dev server running on `localhost:3000`

#### Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] User can log in and session is valid.
- [ ] `revenue_journey_assessments` table has sample data.

#### Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


#### Validation
> See common validation for full checklist.

- [ ] Radar chart plots all 5 stages correctly.
- [ ] BlurGate shows/hides content based on `subscription_tier`.
- [ ] LeakList displays top 5 gaps from assessment.
- [ ] HistoryTable sorts and paginates correctly.
- [ ] Passes common validation (lint, build, screenshots).

#### Steps

##### 1. Read the FullStack Developer Skill
// turbo
View the skill instructions at `.agent/skills/fullstack-dev/SKILL.md`.

##### 2. Create Dashboard Layout
Create `app/(dashboard)/layout.tsx`:
- Sidebar navigation
- Header with user info + logout
- Protected route (redirect if not authenticated)

##### 3. Create Blur Gate Component
Create `components/dashboard/BlurGate.tsx`:
- Higher-Order Component (HOC)
- Check `subscription_tier` from user session
- Render blur overlay for restricted content
- Show upgrade CTA on blurred sections
- Tier logic:
  - `Free`: Blur all except Top 5 leaks
  - `Standard`: Unblur dashboard + history
  - `Pro`: Unblur all + Chat + Generator
  - `Battleship`: Credit-based unlock

##### 4. Create Score Radar Chart
Create `components/dashboard/ScoreRadarChart.tsx`:
- Use `recharts` RadarChart
- Plot 5 stages (Awareness, Consideration, Decision, Conversion, Retention)
- Color-coded by score (red < 50%, yellow 50-80%, green > 80%)

##### 5. Create Leak List Component
Create `components/dashboard/LeakList.tsx`:
- Fetch top 5 gaps from assessment
- Display with priority ranking
- Link to detailed recommendations
- Wrapped in BlurGate for tier access

##### 6. Create History Table
Create `components/dashboard/HistoryTable.tsx`:
- Use `@tanstack/react-table`
- Columns: Date, URL, Score, Status
- Sorting and pagination
- Link to view full report

##### 7. Create Dashboard Page
Create `app/(dashboard)/page.tsx`:
- ScoreRadarChart (prominent)
- LeakList
- HistoryTable
- Pro Tools section (Chat + Generator) - wrapped in BlurGate

##### 8. Verify in Browser
Navigate to `localhost:3000/dashboard` and:
- Test with mock data (different tiers)
- Verify blur gate behavior
- Test chart rendering
- Take screenshots of each tier view

##### 9. Report Completion
Notify user with screenshots and tier verification.


### Build Pro Tools Workflow

#### Prerequisites
- Dashboard exists (run `/build-dashboard` first)
- Auth system configured
- Pinecone index ready
- Gemini API configured
- Dev server running on `localhost:3000`

#### Agent Assignments
- **FullStack Dev**: Chat interface, Generator
- **Logic Engineer**: AI integration, GitHub deployment

#### Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] User logged in with valid session.
- [ ] Pinecone index populated with Rubric context.
- [ ] Gemini API key configured in `.env.local`.
- [ ] GitHub token configured for deployment.

#### Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


#### Validation
> See common validation for full checklist.

- [ ] Chat sends message and receives streamed response.
- [ ] Chat response cites Rubric context.
- [ ] Generator produces valid HTML preview.
- [ ] "Deploy to GitHub Pages" creates/updates repo and returns URL.
- [ ] BlurGate hides Pro Tools for Free/Standard users.
- [ ] Passes common validation (lint, build, screenshots).

#### Steps

##### 1. Read Required Skills
// turbo
View `.agent/skills/fullstack-dev/SKILL.md`.

##### 2. Build Chat Interface
Create `components/pro-tools/ChatInterface.tsx`:
- Message history display
- User input field
- Send button
- Streaming response display
- Context: User's assessment data

##### 3. Create Chat API Route
Create `app/api/chat/route.ts`:
- Accept user message
- Query Pinecone for relevant rubric context
- Query Supabase for user's assessment
- Send to Gemini with context
- Stream response back

##### 4. Build Chat Message Component
Create `components/pro-tools/ChatMessage.tsx`:
- User message styling
- AI message styling
- Markdown rendering
- Code block highlighting

##### 5. Build Landing Page Generator
Create `components/pro-tools/LandingPageGenerator.tsx`:
- "Generate" button
- Template selection (optional)
- Preview pane
- "Deploy to GitHub Pages" button

##### 6. Create Generator API Route
Create `app/api/generate-landing/route.ts`:
- Fetch user's assessment gaps
- Generate HTML based on gaps
- Return preview HTML

##### 7. Create GitHub Deploy Route
Create `app/api/deploy-landing/route.ts`:
- Accept generated HTML
- Create/update GitHub repo
- Configure GitHub Pages
- Return deployed URL

##### 8. Build Preview Component
Create `components/pro-tools/LandingPreview.tsx`:
- Iframe for preview
- Responsive toggle (desktop/mobile)
- Edit button (optional)

##### 9. Wrap in BlurGate
Ensure Pro Tools are wrapped in BlurGate:
- Only visible for Pro and Battleship tiers
- Show upgrade CTA for lower tiers

##### 10. Verify in Browser
Navigate to `localhost:3000/dashboard` and:
- Test Chat (send message, receive response)
- Test Generator (generate, preview, deploy)
- Verify tier restrictions
- Take screenshots

##### 11. Report Completion
Notify user with screenshots.


### Build Hero Workflow

#### Prerequisites
- Layout components exist (run `/build-layout` first)
- Dev server running on `localhost:3000`

#### Pre-Flight Checks
- [ ] `npm run dev` is running and accessible at `localhost:3000`.
- [ ] `content/homepage.json` exists with `hero` section defined.
- [ ] User has confirmed target headline and CTA copy.

#### Rules of Engagement
> All rules from workspace `GEMINI.md` apply. Key requirements:
> - **Trust:** Content from `homepage.json`, no hardcoding
> - **Frontend:** Framer Motion animation required, `prefers-reduced-motion` respected
> - **Single CTA:** One primary CTA per fold

#### Validation
- [ ] Headline and CTA text match `content/homepage.json`.
- [ ] At least one animation visible on load.
- [ ] Animation respects `prefers-reduced-motion`.
- [ ] Passes common validation (lint, build, screenshots).

#### Steps

##### 1. Read the Frontend Builder Skill
// turbo
View the skill instructions at `.agent/skills/frontend-builder/SKILL.md`.

##### 2. Read Content for Hero
// turbo
View `content/homepage.json` for headline, subhead, and CTA copy.
If missing, ask Content Strategist to create it first.

##### 3. Create Kinetic Headline Component
Create `components/ui/KineticHeadline.tsx`:
- Use Framer Motion for staggered letter/word animation
- Respect `prefers-reduced-motion`
- Export reusable component

##### 4. Create Animated Button Component
Create `components/ui/AnimatedButton.tsx`:
- Hover scale effect
- Press feedback
- Gradient or glow effect
- High contrast colors

##### 5. Create Hero Section
Create `components/sections/HeroSection.tsx`:
- Full viewport height (or near)
- Background: gradient, image, or Aceternity UI effect
- KineticHeadline for main headline
- Subhead text
- Primary CTA (AnimatedButton)
- Optional secondary CTA

##### 6. Add Hero to Homepage
Update `app/page.tsx` to include HeroSection.

##### 7. Verify in Browser
Navigate to `localhost:3000` and:
- Watch the headline animation
- Test CTA hover/click states
- Take screenshots (desktop + mobile)
- Record a video of the animation if needed

##### 8. Report Completion
Notify user with screenshots/video and component list.
