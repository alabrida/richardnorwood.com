---
description: Build the Contact page with form and Calendly integration
---

# Build Contact Workflow

## Prerequisites
- Layout components exist
- Dev server running on `localhost:3000`

## Agent Assignments
- **Frontend Builder**: Contact form, Calendly embed
- **Logic Engineer**: Form submission logic

## Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] n8n webhook URL or Airtable API configured in `.env.local`.
- [ ] Calendly scheduling link available.

## Rules of Engagement
> All rules from workspace `GEMINI.md` apply.


## Validation
> See common validation for full checklist.

- [ ] Form submits successfully and stores data.
- [ ] Success toast appears after submission.
- [ ] Calendly widget loads and is bookable.
- [ ] Form validation prevents empty submissions.
- [ ] Passes common validation (lint, build, screenshots).

## Steps

### 1. Read Required Skills
// turbo
View `.agent/skills/frontend-builder/SKILL.md` and `.agent/skills/logic-engineer/SKILL.md`.

### 2. Build Contact Hero
Create `components/sections/ContactHero.tsx`:
- Page title ("Get In Touch")
- Subhead (reason to contact)
- Contact info (email, phone if applicable)

### 3. Build Contact Form
Create `components/forms/ContactForm.tsx`:
- Use `@tanstack/react-form`
- Fields: Name, Email, Company, Message
- Dropdown: Inquiry type (General, Partnership, Support)
- Submit button with loading state
- Success/Error toast (Sonner)

### 4. Create Form API Route
Create `app/api/contact/route.ts`:
- Validate form data
- Send to n8n webhook OR Airtable
- Return success/error response

### 5. Build Calendly Embed
Create `components/ui/CalendlyEmbed.tsx`:
- Embedded Calendly widget
- For "Strategy Call" bookings
- Responsive iframe or widget

### 6. Build Contact Info Section
Create `components/sections/ContactInfo.tsx`:
- Email link
- Social media links
- Office hours (if applicable)
- Location (if applicable)

### 7. Assemble Contact Page
Create `app/contact/page.tsx`:
```tsx
<ContactHero />
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <ContactForm />
  <CalendlyEmbed />
</div>
<ContactInfo />
```

### 8. Verify in Browser
Navigate to `localhost:3000/contact` and:
- Test form validation
- Test form submission
- Verify Calendly loads
- Take screenshots

### 9. Report Completion
Notify user with screenshots.


