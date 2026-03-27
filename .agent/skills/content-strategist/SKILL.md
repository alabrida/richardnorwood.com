---
name: Content Strategist
description: Expert in conversion-focused copywriting and SEO-optimized content architecture.
---

# Content Strategist Skill

## Purpose
To write the words that sell—the headlines, subheads, CTAs, and body copy that guide users through the Revenue Journey and convert them into leads or customers.

## Core Library Toolkit

| Category | Library/Tool | Notes |
|---|---|---|
| **Structured Content** | JSON files (`content/*.json`) | For component-driven copy. |
| **SEO** | `next-seo`, JSON-LD | Structured data for search. |
| **MDX** | `@next/mdx` | For blog/case studies. |

## API Access

| API | Env Variable | Use Case |
|---|---|---|
| **WordPress API** | `WP_API_KEY`, `WP_API_URL` | Fetch blog content from Headless WordPress CMS. |
| **Google Keyword Planner** | `GOOGLE_SERVICE_ACCOUNT_KEY_FILE` | Keyword research, search volume, competition data for SEO content. |

## Browser & Visual Tools

| Tool | Use Case |
|---|---|
| **Browser Subagent** | Preview content in context on `localhost:3000`. |
| **Screenshots** | Capture copy placement and hierarchy. |

## Foundational Context (MUST READ)
All copy must align with the "Unified Commercial Engine" philosophy.
1.  **[The Revenue Architecture Manifesto](file:///d:/richardnorwood.com/docs/The Revenue Architecture Manifesto_ A Unified Commercial Doctrine.md)** - For tone and strategic intent.
2.  **[The Five-Stage Revenue Journey Doctrine](file:///d:/richardnorwood.com/docs/The Five-Stage Revenue Journey Doctrine.md)** - Understanding the 5 Stages (Awareness, Consideration, Decision, Conversion, Retention) to write contextually relevant copy.
3.  **[Revenue-Journey-Rubric-Master.md](file:///d:/richardnorwood.com/docs/Revenue-Journey-Rubric-Master.md)** - For scoring tiers and terminology.

## Rules of Engagement
1.  **One Message per Section:** Do not confuse the user. Each section has one goal.
2.  **Hierarchy:** Headline (The Promise) -> Subhead (The Proof) -> Body (The Detail) -> CTA (The Action).
3.  **Benefits over Features:** "Save 10 hours/week" > "Automated Reporting."
4.  **Explicit CTAs:** "Start My Free Audit" > "Get Started."
5.  **Voice:** Authoritative but approachable. "The Architect who explains, not the salesman who pitches."
6.  **Keyword Research:** Use Google Keyword Planner to identify high-value keywords for SEO content.

## Outputs
*   `content/homepage.json` (Structured copy for sections)
*   `content/services.json`
*   `app/blog/[slug]/page.tsx` (For MDX blog/case studies)
*   Schema Markup (JSON-LD for LocalBusiness, FAQPage, Service)

## 2026 Content Trends
1. **Scrollytelling:** Copy must work in tandem with scroll-triggered animations. Break long paragraphs into punchy, "bite-sized" reveals that sync with visual elements.
2. **AI Personalization:** Plan for dynamic content blocks (e.g., "For SaaS Founders" vs "For Agency Owners") that can be swapped based on user intent.
3. **Authenticity:** Move away from generic corporate speak. Use "human" language, first-person narrative, and unfiltered "behind the scenes" tone to build trust (Anti-AI aesthetic).

## XP Project Additions

### XP-Native Copy Rules
- **Language**: All content must feel like it belongs in Windows XP. Error messages use XP language ("This program has performed an illegal operation"). CTAs map to XP actions ("Install", "Run", "Open", "Activate").
- **Content-to-App Mapping**: Map every content piece to an "application" in the XP metaphor:
  - Blog posts → IE bookmarks / web pages
  - Services → Installed programs in Start Menu
  - About → `readme.txt` in Notepad
  - FAQ → Help and Support Center topics
  - Case studies → Media Player playlist items
  - Contact → Outlook Express compose window
- **"You've Got Mail!" copy**: Write notification text for the AOL-style balloon tips (e.g., "New assessment results are in!", "Your message was sent successfully!").
