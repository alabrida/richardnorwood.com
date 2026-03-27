---
description: Build all retro applications (IE6, Outlook Express, AIM, Calculator, Notepad, etc.) that run inside the XP Window Manager
---

# Build XP Apps Workflow

> **Stage 2 of 3** — This stage builds the application UIs as self-contained components. All backends are **stubbed/mocked** — real API wiring happens in Stage 3 (`/build-xp-integration`).

## Prerequisites

- `/build-xp-shell` completed and passing validation
- Dev server running on `localhost:3000`

## Pre-Flight Checks

Verify these Stage 1 outputs exist before starting:

- [ ] `src/lib/wms/types.ts` — exports `AppConfig`, `AppProps` interfaces
- [ ] `src/lib/wms/WindowManager.ts` — exports `useWMSStore` hook
- [ ] `src/lib/apps/registry.ts` — exports `registerApp()`, `getApp()`
- [ ] `src/components/xp/Window.tsx` — renders any `AppConfig.component`
- [ ] `src/styles/xp-theme.css` — Luna CSS custom properties loaded
- [ ] `content/*.json` — about, emails, faq, homepage, services, pricing
- [ ] `public/icons/` — all app icons present
- [ ] `public/sounds/` — sound files present (but not wired yet)
- [ ] Retro App Builder skill reviewed (`.agent/skills/retro-app-builder/SKILL.md`)
- [ ] `@tanstack/react-form`, `@tanstack/react-table`, `ai`, `sonner` installed (from Step 0b)

## Agent Assignment

- **Retro App Builder**: All application components

## Data Strategy: Stubs & Mocks

> **CRITICAL RULE**: In this stage, NO app may call a real external API (Supabase, WordPress, n8n, Stripe). Every data source must be stubbed.

| App | Data Source in Stage 2 | Replaced in Stage 3 With |
|---|---|---|
| IE6 Blog | `content/blog-stub.json` (3 sample posts) | WordPress REST API (`WP_API_URL`) |
| Outlook Express | `content/emails.json` (pre-seeded) | n8n webhook / Airtable |
| AIM Chat | Console log "message sent" | Vercel AI SDK + Calendly embed |
| Calculator | Local scoring logic (no API) | Routing results open other apps |
| My Computer Dashboard | `content/dashboard-stub.json` | RJAT Supabase project |
| Help Center FAQ | `content/faq.json` | WordPress REST API or JSON |
| Minesweeper Scores | `localStorage` | Supabase high scores |
| Product Activation | Console log "payment stub" | Stripe Checkout |
| Control Panel | `localStorage` for prefs | Supabase user profile |
| Sounds | `console.log('🔊 sound: ...')` | SoundManager (`lib/sounds/`) |

## Steps

### 1. Read the Retro App Builder Skill
// turbo
View `.agent/skills/retro-app-builder/SKILL.md` for app architecture patterns and UI specs.

### 2. Create Stub Data Files

Create these files that apps will import until Stage 3 replaces them:

- `content/blog-stub.json` — 3 sample blog posts with title, date, excerpt, body HTML
- `content/dashboard-stub.json` — Mock assessment data (5-stage scores, leak list)

> These supplement the `content/*.json` files from Stage 1.

### 3. Create App Architecture Helpers

Create `src/lib/apps/helpers.ts`:
- `playSound(soundId: string)` — **stub**: logs `console.log('🔊 sound:', soundId)`. Stage 3 replaces with SoundManager.
- `showBalloonTip(title: string, body: string)` — **stub**: logs to console. Stage 3 renders XP balloon in System Tray.
- `submitForm(endpoint: string, data: object)` — **stub**: logs to console + returns mock success. Stage 3 calls real endpoints.

This abstraction layer means app code **never changes** between Stage 2 and Stage 3 — only the helper implementations change.

### 4. Build Notepad (Simplest App — Pattern Establisher)

Create `src/components/apps/Notepad/Notepad.tsx` + `Notepad.module.css`:
- Menu bar (File, Edit, Format, View, Help) — use a shared `<MenuBar>` component
- Monospaced text area (Lucida Console 10pt)
- Pre-loaded content from `content/about.json`
- Word Wrap toggle in Format menu

**Register**: Call `registerApp(notepadConfig)` in `registry.ts`

> **Pattern**: Every app hereafter follows this pattern: build component → create CSS Module → export AppConfig → register in registry.

### 5. Create Shared MenuBar Component

Create `src/components/apps/shared/MenuBar.tsx` + `MenuBar.module.css`:
- Reusable menu bar with items, separators, disabled states
- Underlined access keys (File, Edit, etc.)
- Used by: Notepad, IE, Outlook Express, Calculator, Media Player, Help Center, Minesweeper

> **This prevents duplicate code across 7+ apps.**

### 6. Build Calculator

Create `src/components/apps/XPCalculator/XPCalculator.tsx` + CSS Module:
- XP Calculator visual clone (Standard view)
- Normal calculator mode works with real math
- First "=" press → transitions to prequalifier mode
- 5 questions displayed one at a time in the display
- Number buttons 1-5 for scoring
- Final "=" → shows result screen with tier recommendation
- **Stub**: Result just displays recommendation text. Stage 3 wires routing to other apps.

**Register**: `registerApp(calculatorConfig)`

### 7. Build Internet Explorer 6

Create `src/components/apps/InternetExplorer/` directory:
- `InternetExplorer.tsx` — main component
- `AddressBar.tsx`, `Toolbar.tsx`, `StatusBar.tsx` — sub-components
- Menu bar (File, Edit, View, Favorites, Tools, Help)
- Back/Forward/Stop/Refresh/Home toolbar buttons
- Address bar with "Go" button
- Content area renders blog posts from **`content/blog-stub.json`** (not WordPress yet)
- Status bar: "Done" / "Loading..." states
- IE6 throbber (Windows flag) animation during loading
- RJAT bookmark in Favorites (navigates to URL input form — **stub**)

**Register**: `registerApp(ieConfig)`

### 8. Build Outlook Express

Create `src/components/apps/OutlookExpress/` directory:
- `OutlookExpress.tsx` — 3-pane layout (folders, message list, preview)
- Pre-seeded inbox from `content/emails.json`
- "New Mail" button → opens compose child window via WMS (`wmsStore.openWindow(composeConfig)`)
- `ComposeWindow.tsx` — To, CC, Subject, body; uses `@tanstack/react-form`
- Send button → calls `helpers.submitForm()` (stub) + `helpers.playSound('youvegotmail')` (stub) + `helpers.showBalloonTip()` (stub)
- Sent Items folder updates locally

**Register**: `registerApp(outlookConfig)`

### 9. Build AIM Buddy List

Create `src/components/apps/AIMBuddyList/` directory:
- `AIMBuddyList.tsx` — header, buddy groups, status icons
- Collapsible groups: "Revenue Team" (Richard Norwood, Strategy Bot), "Resources" (Blog, FAQ, Services)
- Double-click buddy → opens IM window via WMS
- `AIMChatWindow.tsx` — chat message layout, input bar
- "Richard Norwood" chat → **stub**: shows "Calendly booking coming in Stage 3" placeholder
- "Strategy Bot" chat → **stub**: echoes message back with "AI chat coming in Stage 3" prefix
- `helpers.playSound('aim-door-open')` on window open (stub)

**Register**: `registerApp(aimConfig)`

### 10. Build My Computer

Create `src/components/apps/MyComputer/MyComputer.tsx`:
- File explorer layout (folder tree left, icon grid right)
- Drives: C: (Revenue Dashboard), D: (Assessment History), My Documents
- **Stub**: Clicking drives shows placeholder panels from `content/dashboard-stub.json`
- Address bar with breadcrumb path
- Status bar: "X objects" count

**Register**: `registerApp(myComputerConfig)`

### 11. Build Windows Media Player

Create `src/components/apps/MediaPlayer/MediaPlayer.tsx`:
- Dark gradient player skin
- Video viewport (embedded iframe or HTML5 video)
- Transport controls: Play/Pause, Stop, Prev, Next, Volume
- Playlist panel (right side) — **stub**: 3 placeholder items
- Visualization area for audio-only (animated bars)

**Register**: `registerApp(mediaPlayerConfig)`

### 12. Build Control Panel

Create `src/components/apps/ControlPanel/ControlPanel.tsx`:
- Category icon grid layout
- "User Accounts" → **stub**: shows "Connect Supabase profile in Stage 3"
- "Display" → Theme selector (Blue/Silver/Olive) — stores in **`localStorage`**, applies CSS class to `<html>`
- "Sounds and Audio" → Sound on/off toggle — stores in `localStorage`
- "Internet Options" → Privacy preferences stub

**Register**: `registerApp(controlPanelConfig)`

### 13. Build Help and Support Center

Create `src/components/apps/HelpCenter/HelpCenter.tsx`:
- Search bar + topic categories
- FAQ content from `content/faq.json`
- Blue header with XP Help Center branding
- "Did this help?" Yes/No buttons (stub)

**Register**: `registerApp(helpCenterConfig)`

### 14. Build Minesweeper

Create `src/components/apps/Minesweeper/Minesweeper.tsx`:
- Fully playable game (Beginner 9×9/10 mines, Intermediate, Expert)
- Smiley face button, mine counter (left), timer (right)
- Left-click reveal, right-click flag, chord-click
- Win/lose states
- High scores stored in **`localStorage`** (Stage 3 moves to Supabase)

**Register**: `registerApp(minesweeperConfig)`

### 15. Build Product Activation

Create `src/components/apps/ProductActivation/ProductActivation.tsx`:
- Multi-step wizard dialog (4 steps)
- Step 1: "Let's activate your Revenue Architect license"
- Step 2: Choose tier (Free / Standard / Pro / Battleship) from `content/pricing.json`
- Step 3: **Stub**: "Payment processing coming in Stage 3" + `helpers.submitForm()` call
- Step 4: "Thank you! Product activated." confirmation
- Wizard Back/Next/Cancel buttons + progress indicator

**Register**: `registerApp(productActivationConfig)`

### 16. Wire Desktop Icons

Update `src/lib/apps/registry.ts` → `desktopIcons` array:

```typescript
export const desktopIcons = [
  { appId: 'my-computer',        gridPosition: [0, 0] },
  { appId: 'my-documents',       gridPosition: [0, 1] },  // stub — opens Notepad
  { appId: 'internet-explorer',  gridPosition: [0, 2] },
  { appId: 'outlook-express',    gridPosition: [0, 3] },
  { appId: 'recycle-bin',        gridPosition: [0, 4] },  // stub — empty
];
```

Update `Desktop.tsx` to read `desktopIcons` and render `<DesktopIcon>` for each.

### 17. Wire Start Menu

Update `src/components/xp/StartMenu.tsx`:
- **Pinned Programs** (left column, top): IE, Outlook Express, AIM
- **Frequent Programs** (left column, bottom): Calculator, Notepad, Media Player
- **All Programs ▶**: Lists all registered apps from `appRegistry`
- **Right column**: My Computer, My Documents, Control Panel, Help, Product Activation

### 18. Verify Each App
// turbo
Navigate to `localhost:3000` and test each app:
- Open every app via desktop icon AND Start Menu → All Programs
- Verify each app renders correctly inside a `<Window>` frame
- Test menu bars open/close
- Test forms in Outlook Express compose + Calculator
- Play a full game of Minesweeper
- Confirm stub functions log to console (`🔊 sound:`, `📤 form:`, `💬 balloon:`)
- Take screenshots of each app running in its window

### 19. Run Lint & Build Gates
// turbo

```bash
npm run lint
npm run build
```

Fix any issues before proceeding.

### 20. Report Completion

Notify user with screenshots and app inventory.

---

## Handoff Contract → Stage 3 (`/build-xp-integration`)

Stage 2 **produces** the following that Stage 3 **depends on**:

| File | What It Exports | Stage 3 Replaces... |
|---|---|---|
| `src/lib/apps/helpers.ts` | `playSound()`, `showBalloonTip()`, `submitForm()` stubs | Real implementations (SoundManager, SystemTray balloon, API calls) |
| `src/lib/apps/registry.ts` | All 11 `AppConfig` entries registered | No change — apps stay registered |
| `src/components/apps/*/` | All 11 app components | Internal data fetching (stubs → real APIs) |
| `content/blog-stub.json` | Mock blog posts | WordPress REST API fetch |
| `content/dashboard-stub.json` | Mock assessment data | RJAT Supabase query |
| localStorage prefs | Theme, sound, high scores | Supabase user profile + scores |

**Stage 3 integration pattern**: Replace stub implementations in `helpers.ts` with real ones. App components should NOT need code changes — the abstraction layer handles the swap.

## Validation

- [ ] All 11 apps open, render, and close correctly inside `<Window>` frames
- [ ] Desktop icons launch correct apps via double-click
- [ ] Start Menu entries launch correct apps
- [ ] All Programs submenu lists every registered app
- [ ] Shared `<MenuBar>` works across all apps that use it
- [ ] Notepad displays content from `content/about.json`
- [ ] Calculator prequalifier flow works (5 questions → result)
- [ ] IE displays blog posts from `content/blog-stub.json`
- [ ] Outlook Express sends form via stub (console log)
- [ ] AIM opens chat windows via WMS
- [ ] Minesweeper is fully playable
- [ ] Product Activation wizard navigates all 4 steps
- [ ] Stub functions log correctly to console
- [ ] Passes `npm run lint`
- [ ] Passes `npm run build`
- [ ] Screenshots of each app captured
