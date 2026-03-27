---
description: Wire XP apps to Supabase, WordPress, Stripe, n8n — plus sounds, BSOD, Windows Phone mobile, and polish
---

# Build XP Integration Workflow

> **Stage 3 of 3** — This stage replaces all stubs from Stage 2 with real backend integrations, and adds polish layers (sounds, BSOD, mobile). After this stage, the site is production-ready.

## Prerequisites

- `/build-xp-shell` completed (Stage 1)
- `/build-xp-apps` completed (Stage 2)
- Dev server running on `localhost:3000`

## Pre-Flight Checks

Verify Stage 2 outputs exist and all stubs are identifiable:

- [ ] `src/lib/apps/helpers.ts` — exports `playSound()`, `showBalloonTip()`, `submitForm()` stubs
- [ ] `src/lib/apps/registry.ts` — all 11 apps registered and launchable
- [ ] `src/components/apps/*/` — all 11 app components render correctly with stub data
- [ ] `content/blog-stub.json`, `content/dashboard-stub.json` — stub data present
- [ ] Both Supabase projects accessible:
  - Auth: `vupbjbrviiilqvgqtqlw` — status ACTIVE_HEALTHY
  - RJAT: `wraqaqyqqeswufbarhcz` — status ACTIVE_HEALTHY (verify restore complete)
- [ ] WordPress API reachable at `WP_API_URL` (test: `curl $WP_API_URL/wp-json/wp/v2/posts`)
- [ ] `.env.local` has all namespaced credentials (`SUPABASE_AUTH_*`, `SUPABASE_RJAT_*`, `WP_API_*`, `STRIPE_*`, `N8N_*`)
- [ ] Google/Apple OAuth configured in Supabase Auth dashboard
- [ ] Stripe test keys configured

## Agent Assignments

- **Logic Engineer**: Auth, API routes, Supabase clients, WordPress client, helpers swap
- **FullStack Developer**: Dashboard, BlurGate, real-time data
- **XP Shell Architect**: Sounds, BSOD, error dialogs, balloon tips
- **Frontend Builder**: Windows Phone mobile Metro experience

## Integration Strategy: Stub → Real Swap

> The core architectural pattern in this stage is replacing stub implementations from Stage 2 without changing app component code. The `helpers.ts` abstraction layer is the primary swap point.

```
Stage 2 (stubs)                    Stage 3 (real)
─────────────────                  ─────────────────
helpers.playSound(id)              → SoundManager.play(id)
  └─ console.log('🔊 sound:')        └─ new Audio('/sounds/...').play()

helpers.showBalloonTip(t, b)       → SystemTray.showBalloon(t, b)
  └─ console.log('💬 balloon:')       └─ renders <BalloonTip> in Taskbar

helpers.submitForm(url, data)      → fetch(url, { method: 'POST', body })
  └─ console.log('📤 form:')          └─ n8n webhook / Airtable / Supabase
```

## Steps

### Phase A: Backend Clients (Foundation for all wiring)

#### 1. Create Dual Supabase Clients

Create `src/lib/supabase/auth-client.ts`:
- Browser client via `createBrowserClient(SUPABASE_AUTH_URL, SUPABASE_AUTH_ANON_KEY)`

Create `src/lib/supabase/auth-server.ts`:
- Server client via `createServerClient()` for Server Components + Route Handlers

Create `src/lib/supabase/rjat-client.ts`:
- Browser client using `SUPABASE_RJAT_URL` + `SUPABASE_RJAT_ANON_KEY`

Create `src/lib/supabase/rjat-server.ts`:
- Server client for assessment data queries

> Both use `@supabase/ssr` for cookie-based session handling.

#### 2. Generate TypeScript Types
// turbo
```bash
npx supabase gen types typescript --project-id vupbjbrviiilqvgqtqlw > src/lib/supabase/auth-types.ts
npx supabase gen types typescript --project-id wraqaqyqqeswufbarhcz > src/lib/supabase/rjat-types.ts
```

#### 3. Create `profiles` Table (Auth Supabase)

Apply migration to create the profiles table:

```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  email TEXT,
  email_consent BOOLEAN DEFAULT TRUE,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'standard', 'pro', 'battleship')),
  theme TEXT DEFAULT 'blue' CHECK (theme IN ('blue', 'silver', 'olive')),
  sound_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

#### 4. Create WordPress Client

Create `src/lib/wordpress/client.ts`:
- `fetchPosts(params?)` — GET `${WP_API_URL}/wp-json/wp/v2/posts`
- `fetchPost(slug: string)` — GET by slug
- `fetchCategories()` — GET categories
- Response caching with `next: { revalidate: 300 }` (5-min ISR)

Create `src/lib/wordpress/types.ts`:
- `WPPost`, `WPCategory`, `WPMedia` interfaces

### Phase B: Auth Wiring

#### 5. Wire Login Screen to Supabase OAuth

Update `src/components/xp/LoginScreen.tsx`:
- **Replace stub**: "Sign In" now calls `supabase.auth.signInWithOAuth({ provider: 'google' })`
- Apple OAuth button: `supabase.auth.signInWithOAuth({ provider: 'apple' })`
- Email consent checkbox state → passed as `data.email_consent` in callback URL params
- On auth callback → update `profiles.email_consent` via Supabase
- Guest flow unchanged (no auth, immediate desktop)

#### 6. Create Auth Middleware

Create `src/middleware.ts`:
- Refresh session on every request
- Protected routes: `/dashboard/*` (redirect to login if unauthenticated)
- Public routes: everything else accessible to guests
- Pass user session to Server Components via cookies

#### 7. Create Auth Callback Route

Create `src/app/auth/callback/route.ts`:
- Exchange OAuth code for session
- Read `email_consent` from URL params → update `profiles` table
- Redirect to desktop (`/`)

### Phase C: Swap Stubs → Real Implementations

#### 8. Build Sound Manager

Create `src/lib/sounds/SoundManager.ts`:
- Singleton class managing `HTMLAudioElement` pool
- `play(soundId: string)` — maps IDs to `/sounds/*.mp3` paths
- `setVolume(level: number)` — 0-1 range
- `setMuted(muted: boolean)` — global mute
- Reads initial mute/volume from `localStorage` (or Supabase profile if logged in)
- Respects `prefers-reduced-motion` (disables non-essential sounds)

**Swap**: Update `src/lib/apps/helpers.ts`:
```typescript
// BEFORE (stub):
export function playSound(id: string) { console.log('🔊 sound:', id); }

// AFTER (real):
import { SoundManager } from '@/lib/sounds/SoundManager';
export function playSound(id: string) { SoundManager.getInstance().play(id); }
```

#### 9. Build Balloon Tip System

Create `src/components/xp/BalloonTip.tsx`:
- XP-style notification balloon anchored to System Tray
- Auto-dismiss after 5 seconds
- Click to dismiss
- Queue multiple tips

Add to `src/components/xp/SystemTray.tsx`:
- Render `<BalloonTip>` stack

**Swap**: Update `helpers.ts`:
```typescript
// BEFORE: console.log('💬 balloon:', title)
// AFTER: balloonTipStore.show({ title, body, icon })
```

#### 10. Wire Form Submissions

**Swap**: Update `helpers.ts`:
```typescript
// BEFORE: console.log('📤 form:', endpoint, data)
// AFTER:
export async function submitForm(endpoint: string, data: object) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Form submission failed: ${res.status}`);
  return res.json();
}
```

#### 11. Wire Internet Explorer to WordPress

Update `src/components/apps/InternetExplorer/InternetExplorer.tsx`:
- **Replace**: `content/blog-stub.json` import → `fetchPosts()` from WordPress client
- Address bar → `fetchPost(slug)` on navigation
- Loading state uses IE throbber animation

#### 12. Wire Outlook Express to n8n

Update compose window's "Send" handler:
- Call `helpers.submitForm(N8N_WEBHOOK_URL, { to, subject, body })`
- On success → `helpers.playSound('youvegotmail')` + `helpers.showBalloonTip('You\'ve Got Mail!', 'Your message was sent successfully!')`

Create `src/app/api/contact/route.ts`:
- Server-side route that proxies to n8n webhook (avoids CORS)
- Validates input, forwards to `N8N_WEBHOOK_URL`

#### 13. Wire Calculator Routing

Update Calculator result screen:
- Bottom third → `wmsStore.openWindow(ieConfig)` with services URL
- Middle third → `wmsStore.openWindow(ieConfig)` with RJAT URL input
- Top third → `wmsStore.openWindow(aimConfig)` with "Richard Norwood" chat

#### 14. Wire AIM to Calendly + AI Chat

Update AIM chat windows:
- "Richard Norwood" → embed Calendly widget inside chat area
- "Strategy Bot" → Vercel AI SDK streaming chat via `src/app/api/chat/route.ts`

Create `src/app/api/chat/route.ts`:
- OpenAI/Anthropic completion endpoint via Vercel AI SDK
- System prompt: Revenue Architect persona

#### 15. Wire Control Panel to Supabase Profile

Update Control Panel:
- **Replace**: `localStorage` prefs → Supabase `profiles` table (for logged-in users, localStorage fallback for guests)
- Theme changes → update `profiles.theme` + apply CSS class
- Sound toggle → update `profiles.sound_enabled` + SoundManager.setMuted()

#### 16. Wire Minesweeper Scores to Supabase

Create `high_scores` table in RJAT Supabase:
- Columns: user_id, difficulty, time, date
- RLS: users can read all, write own

Update Minesweeper → save to Supabase (or localStorage for guests)

### Phase D: Dashboard & Payment

#### 17. Build Revenue Dashboard

Create dashboard components in `src/components/dashboard/`:
- `ScoreRadarChart.tsx` — 5-stage radar chart (recharts)
- `LeakList.tsx` — Top revenue gaps with severity indicators
- `HistoryTable.tsx` — Assessment history (TanStack Table) from RJAT Supabase
- `BlurGate.tsx` — wraps content; shows/hides based on `profiles.tier`

Mount dashboard inside My Computer → C: Drive panel.

#### 18. Wire RJAT Webhook

Create `src/app/api/rjat-webhook/route.ts`:
- Receives assessment results from n8n
- Stores in RJAT Supabase `revenue_journey_assessments` table
- Triggers `helpers.showBalloonTip('Assessment Complete!', 'Your Revenue Journey results are in.')`
- Triggers `helpers.playSound('youvegotmail')`

#### 19. Wire Product Activation to Stripe

Create `src/app/api/checkout/route.ts`:
- Creates Stripe Checkout session for selected tier
- Webhook handler at `src/app/api/stripe-webhook/route.ts`:
  - Updates `profiles.tier` in Auth Supabase on successful payment
  - BlurGate rechecks tier → unlocks content

### Phase E: Polish & Mobile

#### 20. Build BSOD + Error States

Create `src/components/xp/BSOD.tsx`:
- Full-screen blue screen with white monospaced text
- XP-style error codes (branded: "REVENUE_KERNEL_PANIC")
- "Press any key to restart" → redirects to `/`

Create `src/components/xp/ErrorDialog.tsx`:
- XP error dialog (icon, message, OK/Cancel buttons)
- Used by all apps for API/form errors

Wire to Next.js:
- `src/app/not-found.tsx` → `<BSOD />`
- `src/app/error.tsx` → `<ErrorDialog />`

#### 21. Build Windows Phone Mobile Experience

Create `src/components/mobile/`:
- `MetroShell.tsx` — Live Tiles home screen (replaces XP desktop at `< 768px`)
- `MetroTile.tsx` — Variable-size tiles (small/medium/wide) with flip animations
- `MetroAppBar.tsx` — Bottom app bar with circular icons
- `MetroPage.tsx` — Lateral scrolling (Panorama) for multi-section pages
- `MetroHeader.tsx` — Large lowercase title, page-level back button

Tiles map to XP apps:
| Tile | Size | App Launched |
|---|---|---|
| Revenue Dashboard | Wide | My Computer → C: |
| Internet Explorer | Medium | IE with blog |
| Outlook Express | Medium | OE with compose |
| Strategy Call | Medium | AIM → Richard Norwood |
| Calculator | Small | Calculator |
| Minesweeper | Small | Minesweeper |
| Settings | Small | Control Panel |

Style: Segoe UI (or `'Segoe UI', 'Helvetica Neue', sans-serif`), flat design, accent color system.

Responsive detection: `src/hooks/useIsMobile.ts` — `matchMedia('(max-width: 768px)')`.

In `src/app/page.tsx`:
```typescript
const isMobile = useIsMobile();
return isMobile ? <MetroShell /> : <XPDesktop />;
```

#### 22. SEO & Meta

- `src/app/layout.tsx` — base `<title>`, viewport, favicon (XP flag)
- `src/app/metadata.ts` — OpenGraph images (XP-themed)
- JSON-LD schemas: `LocalBusiness`, `FAQPage`, `Service`
- Dynamic `<title>` per app (IE shows "Blog Title - Internet Explorer")
- `src/app/sitemap.ts` — auto-generated sitemap

### Phase F: Final Verification

#### 23. Full Smoke Test
// turbo

Test every integration end-to-end:

| Test | Expected Result |
|---|---|
| Guest → Desktop | Boot → Login → Desktop, no auth |
| Sign In (Google) | OAuth flow → redirect → desktop with user name |
| Sign In (Apple) | OAuth flow → redirect → desktop with user name |
| Email consent unchecked | `profiles.email_consent = false` in Supabase |
| IE → Blog posts | Real WordPress posts load, address bar navigates by slug |
| OE → Send email | n8n webhook receives data, "You've Got Mail!" plays |
| Calculator → Result | Tier routing opens correct app |
| AIM → Calendly | Calendly widget embeds in chat window |
| AIM → Strategy Bot | AI chat streams responses |
| Dashboard → C: Drive | Radar chart, leak list, history table render with data |
| BlurGate (Free tier) | Dashboard content blurred except top 5 leaks |
| Product Activation → Stripe | Checkout session creates, webhook updates tier |
| Minesweeper → High score | Score saved to Supabase |
| Control Panel → Theme | Theme changes persist to Supabase profile |
| Sounds → mute toggle | All sounds stop, setting persists |
| 404 page | BSOD renders |
| Mobile (`< 768px`) | Metro tiles replace XP desktop |
| Metro tile tap → App | App opens in Metro context |

#### 24. Lint & Build Gates
// turbo

```bash
npm run lint
npm run build
```

Zero errors required.

#### 25. Screenshot Gallery
// turbo

Capture via browser subagent:
- Boot screen
- Login screen (with Sign In options)
- Desktop (empty, 3+ windows, Start Menu open)
- Each of the 11 apps running in windows
- BSOD 404
- Mobile Metro tiles
- Mobile Metro app open
- Dashboard with BlurGate active

#### 26. Generate Walkthrough

Create/update `walkthrough.md` with:
- Full page/component inventory
- Screenshot gallery
- Integration status (all ✅ or known issues)
- Performance notes (Core Web Vitals)
- Deployment readiness checklist

#### 27. Report Completion

Notify user with screenshots, walkthrough, and deployment readiness status.

## Validation

- [ ] Auth flow works (Guest + Google + Apple)
- [ ] Email consent flag correctly stored in `profiles`
- [ ] WordPress content loads in IE (real posts, not stubs)
- [ ] Blog stub file no longer used (`content/blog-stub.json` can be deleted)
- [ ] Contact form submits via Outlook Express → n8n receives data
- [ ] "You've Got Mail!" sound + balloon tip on OE send
- [ ] Calculator prequalifier routes to correct apps
- [ ] AIM → Calendly embed works
- [ ] AIM → AI chat streams responses
- [ ] Dashboard displays real data from RJAT Supabase
- [ ] BlurGate respects tier (Free/Standard/Pro/Battleship)
- [ ] Product Activation → Stripe Checkout → tier upgrade works
- [ ] Minesweeper high scores persist to Supabase
- [ ] Control Panel prefs persist to Supabase profile
- [ ] All XP sounds play correctly (with mute toggle)
- [ ] BSOD renders on 404/errors
- [ ] Windows Phone Metro works on mobile (< 768px)
- [ ] SEO: title tags, meta, JSON-LD, sitemap present
- [ ] `npm run lint` — zero errors
- [ ] `npm run build` — zero errors
- [ ] Full screenshot gallery captured (20+ screenshots)
