---
description: Build the Blog system with MDX support and WordPress API integration
---

# Build Blog Workflow (Headless WordPress)

## Prerequisites
- WordPress installation accessible via API
- `WP_API_URL` stored in `.env.local`

## Agent Assignments
- **Logic Engineer**: WordPress API client (`lib/wp.ts`)
- **Frontend Builder**: Blog Index and Single Post templates

## Steps

### 1. Read Required Skills
// turbo
View `.agent/skills/logic-engineer/SKILL.md` and `.agent/skills/frontend-builder/SKILL.md`.

### 2. Create WordPress Client
Create `lib/wp.ts`:
- Functions: `getAllPosts`, `getPostBySlug`
- Fetch from `process.env.WP_API_URL`
- Type definitions for WP Post object
- Error handling

### 3. Build Blog Hero
Create `components/sections/BlogHero.tsx`:
- Title: "Insights & Engineering"
- Subtitle: "Thoughts on revenue architecture."

### 4. Build Blog Card Component
Create `components/ui/BlogCard.tsx`:
- Props: title, excerpt, date, slug, featuredImage
- Hover effects
- Link to `/blog/[slug]`

### 5. Build Blog Index Page
Create `app/blog/page.tsx`:
- Server Component
- Fetch posts using `getAllPosts`
- Render `BlogHero`
- Render grid of `BlogCard`s

### 6. Build Single Post Page
Create `app/blog/[slug]/page.tsx`:
- Server Component
- Fetch post using `getPostBySlug`
- Render Title, Date, Content
- Style content using `@tailwindcss/typography` (`prose` class)
- Parse HTML content safely

### 7. Verify in Browser
Navigate to `localhost:3000/blog` and:
- Verify list loads
- Click a post
- Verify single post renders content correctly

### 8. Report Completion
Notify user with findings.
