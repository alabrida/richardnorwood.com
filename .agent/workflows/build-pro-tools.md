---
description: Build the Pro Tools (Chat Interface and Landing Page Generator)
---

# Build Pro Tools Workflow

## Prerequisites
- Dashboard exists (run `/build-dashboard` first)
- Auth system configured
- Pinecone index ready
- Gemini API configured
- Dev server running on `localhost:3000`

## Agent Assignments
- **FullStack Dev**: Chat interface, Generator
- **Logic Engineer**: AI integration, GitHub deployment

## Steps

### 1. Read Required Skills
// turbo
View `.agent/skills/fullstack-dev/SKILL.md`.

### 2. Build Chat Interface
Create `components/pro-tools/ChatInterface.tsx`:
- Message history display
- User input field
- Send button
- Streaming response display
- Context: User's assessment data

### 3. Create Chat API Route
Create `app/api/chat/route.ts`:
- Accept user message
- Query Pinecone for relevant rubric context
- Query Supabase for user's assessment
- Send to Gemini with context
- Stream response back

### 4. Build Chat Message Component
Create `components/pro-tools/ChatMessage.tsx`:
- User message styling
- AI message styling
- Markdown rendering
- Code block highlighting

### 5. Build Landing Page Generator
Create `components/pro-tools/LandingPageGenerator.tsx`:
- "Generate" button
- Template selection (optional)
- Preview pane
- "Deploy to GitHub Pages" button

### 6. Create Generator API Route
Create `app/api/generate-landing/route.ts`:
- Fetch user's assessment gaps
- Generate HTML based on gaps
- Return preview HTML

### 7. Create GitHub Deploy Route
Create `app/api/deploy-landing/route.ts`:
- Accept generated HTML
- Create/update GitHub repo
- Configure GitHub Pages
- Return deployed URL

### 8. Build Preview Component
Create `components/pro-tools/LandingPreview.tsx`:
- Iframe for preview
- Responsive toggle (desktop/mobile)
- Edit button (optional)

### 9. Wrap in BlurGate
Ensure Pro Tools are wrapped in BlurGate:
- Only visible for Pro and Battleship tiers
- Show upgrade CTA for lower tiers

### 10. Verify in Browser
Navigate to `localhost:3000/dashboard` and:
- Test Chat (send message, receive response)
- Test Generator (generate, preview, deploy)
- Verify tier restrictions
- Take screenshots

### 11. Report Completion
Notify user with screenshots.
