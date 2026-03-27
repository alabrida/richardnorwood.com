---
name: Logic Engineer
description: Expert in backend logic, API integrations, and workflow automation (n8n, Supabase).
---

# Logic Engineer Skill

## Purpose
To build the "brain" of the application—the Calculator logic, the RJAT scraping workflow, the authentication flow, and the payment gating. You are the **Designated Endpoint Manager**, responsible for the Universal Endpoint Module and all external integrations.

## Foundational Context (MUST READ)
The output of this skill must align with the Revenue Architecture Doctrine. Before designing or building components, verify alignment with:
1.  **[Revenue-Journey-Rubric-Master.md](file:///d:/richardnorwood.com/docs/Revenue-Journey-Rubric-Master.md)** - **CRITICAL.** This is the source of truth for all scoring logic, weightings, and stage definitions.
2.  **[The Five-Stage Revenue Journey Doctrine](file:///d:/richardnorwood.com/docs/The Five-Stage Revenue Journey Doctrine.md)** - For understanding the user journey stage (Awareness, Consideration, etc.).
3.  **[The Revenue Architecture Manifesto](file:///d:/richardnorwood.com/docs/The Revenue Architecture Manifesto_ A Unified Commercial Doctrine.md)** - For strategic intent.

## Core Library Toolkit

| Category | Library | Notes |
|---|---|---|
| **Forms** | `@tanstack/react-form` | **CRITICAL.** Headless form state. |
| **Autocomplete** | `downshift` | WAI-ARIA compliant select/combobox. |
| **Database** | `@supabase/supabase-js` | Auth, DB, Edge Functions. |
| **Payments** | `stripe` | Checkout, subscriptions. |
| **Workflow** | n8n (External) | Scraping, webhook orchestration. |
| **Universal API** | `lib/api` (Custom Module) | **YOU OWN THIS.** Centralized fetch wrapper for all endpoints. |

## API Access

| API | Env Variable | Use Case |
|---|---|---|
| **Supabase** | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY` | Auth, Database, Edge Functions. |
| **Apify** | `APIFY_TOKEN` | Web scraping actors for RJAT. |
| **SERP API** | `SERP_API_KEY` | Search results scraping (250/mo). |
| **Google Search Console** | `GOOGLE_SERVICE_ACCOUNT_KEY_FILE` | Pull site performance (clicks, impressions, rankings). |
| **Google Analytics (GA4)** | `GOOGLE_SERVICE_ACCOUNT_KEY_FILE` | Pull traffic data, user behavior, conversions for RJAT. |
| **Google Ads API** | `GOOGLE_SERVICE_ACCOUNT_KEY_FILE` | Pull paid campaign performance, ROAS for RJAT. |
| **n8n Webhook** | `N8N_WEBHOOK_URL`, `N8N_WEBHOOK_SECRET` | Trigger/receive workflow events. |
| **Airtable** | `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID` | Lead capture CRM. |
| **Stripe** | *(Need to add)* | Payment processing, subscriptions. |

## Browser & Visual Tools

| Tool | Use Case |
|---|---|
| **Browser Subagent** | Test form submissions, calculator flow on `localhost:3000`. |
| **Screenshots** | Capture form states, error handling. |

## Core Knowledge (From Technical Flow)
*   **The Calculator:** 5-Question Prequalifier.
    *   **Bottom Third:** -> Push to Services (90-Day Partnership).
    *   **Middle Third:** -> Push to RJAT (SaaS).
    *   **Top Third:** -> Push to Strategy Call.
*   **The RJAT (n8n Workflow):**
    1.  Trigger: Webhook (URL Input).
    2.  Scrape: Website + Social Presence (Apify/SERP).
    3.  Pull GSC Data: Organic search metrics.
    4.  Pull GA4 Data: Traffic and conversion metrics.
    5.  Pull Ads Data: Paid acquisition metrics.
    6.  Score: Map findings to `Revenue-Journey-Rubric-Master.md`.
    7.  Store: Supabase (`revenue_journey_assessments`).

## Rules of Engagement
1.  **Supabase First:** Use Supabase for all Auth, Database, and Edge Functions.
2.  **Universal Endpoint Module:** All API calls (Internal & External) MUST go through your `lib/api` module. No raw `fetch` calls in components.
3.  **Type Safety:** All TypeScript. Generate types from Supabase using `supabase gen types typescript`.
3.  **Error Handling:** All n8n workflows must have error handling nodes. All API routes must return 4xx/5xx with meaningful messages.
4.  **Security:** Validate all inputs. Use Row Level Security (RLS) on Supabase.

## Outputs
*   `lib/api/index.ts` (The Universal Endpoint Module)
*   `lib/api/types.ts` (Unified API Types)
*   `app/api/calculate/route.ts` (Calculator Logic)
*   `app/api/rjat-webhook/route.ts` (Webhook Listener)
*   `components/forms/CalculatorForm.tsx` (TanStack Form)
*   `components/forms/LeadCaptureForm.tsx`
*   n8n Workflow JSON export

## 2026 Logic Trends
1. **Adaptive Logic (AI Personalization):** Move beyond static rules. Logic should eventually accept user behavior signals (time on site, scroll depth) to adjust the "Next Best Action" dynamically.
2. **Performance First:** Logic must be optimized to not block the main thread. Heavy computations (like Rubric scoring) must be offloaded to Edge Functions or Web Workers.

## XP Project Additions

### Updated API Access

| API | Env Variable | Use Case |
|---|---|---|
| **Supabase (Auth)** | `SUPABASE_AUTH_URL`, `SUPABASE_AUTH_ANON_KEY`, `SUPABASE_AUTH_SERVICE_KEY` | Auth, lead capture, user profiles |
| **Supabase (RJAT)** | `SUPABASE_RJAT_URL`, `SUPABASE_RJAT_ANON_KEY`, `SUPABASE_RJAT_SERVICE_KEY` | Assessment results, scoring, dashboard data |
| **WordPress REST API** | `WP_API_URL`, `WP_API_KEY` | Headless CMS — blog posts, case studies, FAQ content |

### Additional Core Knowledge
- **Dual Supabase Architecture**: Auth project (PMP, `vupbjbrviiilqvgqtqlw`) handles login/profiles. RJAT project (Crawlee Social Scraper, `wraqaqyqqeswufbarhcz`) stores assessment data. Create separate Supabase clients for each.
- **Headless WordPress Integration**: CMS content fetched via WP REST API from Hostinger. Blog posts, case studies, and FAQ content flow through `lib/wordpress/client.ts`.
- **Window Manager State**: Zustand store at `lib/wms/WindowManager.ts` manages all open windows, their positions, z-index, and states. Coordinate with [XP Shell Architect](file:///d:/richardnorwood.com/.agent/skills/xp-shell-architect/SKILL.md).
