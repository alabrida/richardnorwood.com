---
description: Build the Authentication system (Client Login, Password Reset)
---

# Build Auth Workflow

## Prerequisites
- Layout components exist
- Supabase PMP project configured
- Dev server running on `localhost:3000`

## Agent Assignments
- **Logic Engineer**: Auth logic, Supabase integration
- **Frontend Builder**: Auth UI components

## Pre-Flight Checks
- [ ] `npm run dev` is running at `localhost:3000`.
- [ ] `SUPABASE_AUTH_URL` and `SUPABASE_AUTH_ANON_KEY` set in `.env.local`.
- [ ] Supabase project has Auth enabled with email/password.

## Rules of Engagement
> All rules from workspace `GEMINI.md` apply.
> No public signup. Client accounts are admin-created during onboarding.

## Validation
> See common validation for full checklist.

- [ ] Login sets session cookie correctly.
- [ ] Protected routes (`/portal`) redirect unauthenticated users.
- [ ] Password reset email sends successfully.
- [ ] Passes common validation (lint, build, screenshots).

## Steps

### 1. Read Required Skills
// turbo
View `.agent/skills/logic-engineer/SKILL.md`.

### 2. Configure Supabase Auth
Verify Supabase Auth settings:
- Email/Password enabled
- Email templates configured
- No public signup (admin-created accounts only)

### 3. Create Auth Utilities
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

### 4. Build Login Page
Create `app/(auth)/login/page.tsx`:
- Email input
- Password input
- "Remember me" checkbox
- Login button
- "Forgot password" link
- NOTE: No public signup. Client accounts are admin-created.

### 5. Build Forgot Password Page
Create `app/(auth)/forgot-password/page.tsx`:
- Email input
- Submit button
- Success message

### 6. Build Reset Password Page
Create `app/(auth)/reset-password/page.tsx`:
- New password input
- Confirm password
- Submit button

### 7. Create Auth Middleware
Create `middleware.ts`:
- Check for session
- Redirect unauthenticated users from /portal
- Redirect authenticated users from /login

### 8. Build Auth Form Component
Create `components/forms/AuthForm.tsx`:
- Reusable form for login
- Use `@tanstack/react-form`
- Error handling
- Loading states

### 9. Test Auth Flow
Navigate to `localhost:3000/login` and:
- Test login flow
- Test password reset
- Verify protected route redirect (/portal)
- Take screenshots

### 10. Report Completion
Notify user with screenshots.
