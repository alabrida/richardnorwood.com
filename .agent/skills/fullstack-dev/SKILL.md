---
name: FullStack Developer
description: Expert in connecting the UI to the Database and building the SaaS Dashboard experience.
---

# FullStack Developer Skill

## Purpose
To build the complete Dashboard experience—connecting the React components to the Supabase database, implementing the "Blur Filter" logic, and rendering the data visualizations.

## Foundational Context (MUST READ)
The output of this skill must align with the Revenue Architecture Doctrine. Before designing or building components, verify alignment with:
1.  **[The Five-Stage Revenue Journey Doctrine](file:///d:/richardnorwood.com/docs/The Five-Stage Revenue Journey Doctrine.md)** - For understanding the user journey stage (Awareness, Consideration, etc.).
2.  **[The Revenue Architecture Manifesto](file:///d:/richardnorwood.com/docs/The Revenue Architecture Manifesto_ A Unified Commercial Doctrine.md)** - For tone and strategic intent.
3.  **[Revenue-Journey-Rubric-Master.md](file:///d:/richardnorwood.com/docs/Revenue-Journey-Rubric-Master.md)** - For scoring logic and data definitions.

## Core Library Toolkit

| Category | Library | Notes |
|---|---|---|
| **Datagrids** | `@tanstack/react-table` | **CRITICAL.** Headless tables for history/leaderboards. |
| **Charts** | `recharts` OR `chart.js` | Radar charts for scorecard. |
| **AI Chat** | `ai` (Vercel AI SDK) | For Pro Chat Interface. |
| **Primitives** | `react-aria-components` | Accessible dialogs, menus. |
| **Toast** | `sonner` | Feedback notifications. |

## API Access

| API | Env Variable | Use Case |
|---|---|---|
| **Supabase** | `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Fetch user data, assessments. |
| **Pinecone** | `PINECONE_API_KEY`, `PINECONE_INDEX_HOST` | RAG Vector Store for Chat. |
| **Gemini 2.0 Flash** | `GEMINI_API_KEY` | LLM for Chat Interface (1500/day). |
| **GitHub API** | `GITHUB_ACCESS_TOKEN` | Deploy generated landing pages. |

## Browser & Visual Tools

| Tool | Use Case |
|---|---|
| **Browser Subagent** | Navigate to `localhost:3000/dashboard` to test data rendering. |
| **Screenshots** | Capture dashboard states (loading, populated, error). |
| **Form Interaction** | Test form submissions, validation, and error states. |
| **Auth Flow Testing** | Verify login/logout, protected route behavior. |
| **Blur Gate Testing** | Verify tier-based content visibility. |

## Core Knowledge (From Technical Flow)
*   **The Dashboard Components:**
    *   **Scorecard:** Radar Chart (5 Stages).
    *   **Leak List:** Top 5 Gaps from `revenue_journey_assessments`.
    *   **Blur Filter:** Conditional rendering based on `subscription_tier`.
        *   `Free`: Blur everything except Top 5.
        *   `Standard`: Unblur Dashboard. Show History.
        *   `Pro`: Unblur All. Show Chat + Generator.
        *   `Battleship`: Unblur based on earned credits (1/week).

## Rules of Engagement
1.  **Server Components by Default:** Use Next.js Server Components for data fetching. Client Components only for interactivity.
2.  **Real-Time:** Use Supabase Realtime subscriptions for live dashboard updates (if applicable).
3.  **Skeleton Loaders:** All data-fetching components must show skeleton states, not blank screens.
4.  **Access Control:** Wrap all protected routes with Auth middleware. Check `subscription_tier` before revealing content.
5.  **Visual Verification:** Always test dashboard in browser with real/mock data. Capture screenshots.

## Outputs
*   `app/(dashboard)/layout.tsx`
*   `app/(dashboard)/page.tsx` (Main Dashboard)
*   `components/dashboard/ScoreRadarChart.tsx`
*   `components/dashboard/LeakList.tsx`
*   `components/dashboard/HistoryTable.tsx` (TanStack Table)
*   `components/dashboard/BlurGate.tsx` (HOC for tier-based access)
*   `components/pro-tools/ChatInterface.tsx`
*   `components/pro-tools/LandingPageGenerator.tsx`
