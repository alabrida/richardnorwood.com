---
description: Build the SaaS Dashboard with Scorecard, Leak List, and Blur Gate
---

# Build Dashboard Workflow

## Prerequisites
- Auth system configured (Supabase Auth)
- Database tables exist (`revenue_journey_assessments`)
- Dev server running on `localhost:3000`

## Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] User can log in and session is valid.
- [ ] `revenue_journey_assessments` table has sample data.

## Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


## Validation
> See common validation for full checklist.

- [ ] Radar chart plots all 5 stages correctly.
- [ ] BlurGate shows/hides content based on `subscription_tier`.
- [ ] LeakList displays top 5 gaps from assessment.
- [ ] HistoryTable sorts and paginates correctly.
- [ ] Passes common validation (lint, build, screenshots).

## Steps

### 1. Read the FullStack Developer Skill
// turbo
View the skill instructions at `.agent/skills/fullstack-dev/SKILL.md`.

### 2. Create Dashboard Layout
Create `app/(dashboard)/layout.tsx`:
- Sidebar navigation
- Header with user info + logout
- Protected route (redirect if not authenticated)

### 3. Create Blur Gate Component
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

### 4. Create Score Radar Chart
Create `components/dashboard/ScoreRadarChart.tsx`:
- Use `recharts` RadarChart
- Plot 5 stages (Awareness, Consideration, Decision, Conversion, Retention)
- Color-coded by score (red < 50%, yellow 50-80%, green > 80%)

### 5. Create Leak List Component
Create `components/dashboard/LeakList.tsx`:
- Fetch top 5 gaps from assessment
- Display with priority ranking
- Link to detailed recommendations
- Wrapped in BlurGate for tier access

### 6. Create History Table
Create `components/dashboard/HistoryTable.tsx`:
- Use `@tanstack/react-table`
- Columns: Date, URL, Score, Status
- Sorting and pagination
- Link to view full report

### 7. Create Dashboard Page
Create `app/(dashboard)/page.tsx`:
- ScoreRadarChart (prominent)
- LeakList
- HistoryTable
- Pro Tools section (Chat + Generator) - wrapped in BlurGate

### 8. Verify in Browser
Navigate to `localhost:3000/dashboard` and:
- Test with mock data (different tiers)
- Verify blur gate behavior
- Test chart rendering
- Take screenshots of each tier view

### 9. Report Completion
Notify user with screenshots and tier verification.


