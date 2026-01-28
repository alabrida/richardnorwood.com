---
description: Build the Authentication system (Login, Signup, Password Reset)
---

# Build Auth Workflow

## Prerequisites
- Layout components exist
- Supabase project configured
- Dev server running on `localhost:3000`

## Agent Assignments
- **Logic Engineer**: Auth logic, Supabase integration
- **Frontend Builder**: Auth UI components

## Steps

### 1. Read Required Skills
// turbo
View `.agent/skills/logic-engineer/SKILL.md`.

### 2. Configure Supabase Auth
Verify Supabase Auth settings:
- Email/Password enabled
- OAuth providers (Google, etc.) if needed
- Email templates configured

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
- OAuth buttons (if enabled)
- "Don't have an account? Sign up" link

### 5. Build Signup Page
Create `app/(auth)/signup/page.tsx`:
- Name input
- Email input
- Password input
- Confirm password
- Terms checkbox
- Signup button
- "Already have an account? Login" link

### 6. Build Forgot Password Page
Create `app/(auth)/forgot-password/page.tsx`:
- Email input
- Submit button
- Success message

### 7. Build Reset Password Page
Create `app/(auth)/reset-password/page.tsx`:
- New password input
- Confirm password
- Submit button

### 8. Create Auth Middleware
Create `middleware.ts`:
- Check for session
- Redirect unauthenticated users from /dashboard
- Redirect authenticated users from /login

### 9. Build Auth Form Component
Create `components/forms/AuthForm.tsx`:
- Reusable form for login/signup
- Use `@tanstack/react-form`
- Error handling
- Loading states

### 10. Test Auth Flow
Navigate to `localhost:3000/login` and:
- Test signup flow
- Test login flow
- Test password reset
- Verify protected route redirect
- Take screenshots

### 11. Report Completion
Notify user with screenshots.
