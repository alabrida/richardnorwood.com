---
description: Build the XP desktop shell — Desktop, Taskbar, Start Menu, Window Manager, Luna theme, Boot/Login screens
---

# Build XP Shell Workflow

> **Stage 1 of 3** — This stage produces the "operating system" layer. Stage 2 (`/build-xp-apps`) adds the applications. Stage 3 (`/build-xp-integration`) wires everything to real backends.

## Prerequisites

- Node.js v18+ installed
- Git repository initialized

## Step 0: Project Bootstrap

// turbo-all

> This step must be completed **once** before any other workflow runs.

### 0a. Initialize Next.js

```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 0b. Install All Dependencies (Stages 1-3)

```bash
npm install zustand motion @supabase/supabase-js @supabase/ssr @tanstack/react-form @tanstack/react-table recharts sonner ai stripe downshift
npm install -D @types/node
```

### 0c. Copy Environment Variables

```bash
copy credentials\.env .env.local
```

### 0d. Create Directory Scaffold

```bash
mkdir src\styles
mkdir src\lib\wms
mkdir src\lib\apps
mkdir src\lib\supabase
mkdir src\lib\wordpress
mkdir src\lib\sounds
mkdir src\components\xp
mkdir src\components\apps
mkdir src\components\mobile
mkdir src\components\dashboard
mkdir src\components\forms
mkdir public\icons
mkdir public\sounds
mkdir public\cursors
mkdir content
```

### 0e. Source XP Assets

> **CRITICAL**: The visual fidelity depends on authentic XP assets. Address these before coding.

Create or source the following assets:

**Icons** (`public/icons/` — 32x32 PNG with transparency):
- `my-computer.png`, `my-documents.png`, `recycle-bin.png`, `ie6.png`
- `outlook-express.png`, `aim.png`, `notepad.png`, `calculator.png`
- `media-player.png`, `minesweeper.png`, `control-panel.png`
- `help-center.png`, `product-activation.png`
- `start-flag.png` (Windows logo for Start button)
- `quick-ie.png`, `quick-oe.png`, `quick-desktop.png` (16x16 Quick Launch)

**Sounds** (`public/sounds/` — MP3, <100KB each):
- `startup.mp3` (XP startup chime)
- `click.mp3`, `error.mp3`, `notify.mp3`
- `minimize.mp3`, `maximize.mp3`, `close.mp3`
- `youvegotmail.mp3` (AOL classic)
- `aim-door-open.mp3`, `aim-door-close.mp3`
- `aim-receive.mp3`

**Wallpaper** (`public/wallpaper/`):
- `bliss.jpg` (branded Revenue Architect version, 1920x1200)

**Cursors** (`public/cursors/` — optional, CSS `cursor` property):
- `default.cur`, `wait.ani`, `pointer.cur`

> **TIP**: Use the `generate_image` tool for the branded wallpaper. For icons and sounds, search for open-source XP resources or create minimal SVG equivalents.

### 0f. Start Dev Server

```bash
npm run dev
```

## Pre-Flight Checks

- [ ] `npm run dev` running at `localhost:3000`
- [ ] All packages installed (verify `node_modules/zustand`, `node_modules/motion`)
- [ ] `.env.local` exists with namespaced Supabase credentials
- [ ] `public/icons/`, `public/sounds/`, `public/wallpaper/` populated
- [ ] XP Shell Architect skill reviewed (`.agent/skills/xp-shell-architect/SKILL.md`)

## Agent Assignment

- **XP Shell Architect**: All components

## Steps

### 1. Read the XP Shell Architect Skill
// turbo
View `.agent/skills/xp-shell-architect/SKILL.md` for Luna theme spec, WMS store shape, and drag/resize patterns.

### 2. Create Luna Theme CSS

Create `src/styles/xp-theme.css` with all CSS custom properties from the Luna specification:

- Title bar gradients (active/inactive)
- Taskbar gradient
- Start Menu colors
- Window body, buttons, scrollbars
- System font stack (Tahoma 11px)
- 3D button effects (highlight/shadow borders)
- XP cursor definitions (`cursor: url('/cursors/...')`)

### 3. Create Window Management System

Create `src/lib/wms/WindowManager.ts`:

- Zustand store matching the `WMSStore` interface from the skill
- Z-index management (windows start at 100, taskbar at 9999)
- Window operations: open, close, minimize, maximize, restore, focus, updatePosition, updateSize

Create `src/lib/wms/types.ts`:

- `WindowState` interface
- `AppConfig` interface — **this is the contract that Stage 2 apps must implement**:

```typescript
export interface AppConfig {
  id: string;
  title: string;
  icon: string;            // path to icon in public/icons/
  defaultSize: { width: number; height: number };
  minSize: { width: number; height: number };
  component: React.ComponentType<AppProps>;
}

export interface AppProps {
  windowId: string;
  isActive: boolean;
  onTitleChange?: (title: string) => void;
}
```

### 4. Create App Registry (Stub)

Create `src/lib/apps/registry.ts`:

- Import/export `AppConfig` and `AppProps` types from `wms/types.ts`
- Empty `appRegistry: Map<string, AppConfig>` — Stage 2 populates this
- `registerApp(config: AppConfig)` function
- `getApp(id: string)` function
- Desktop icon layout config (`desktopIcons: Array<{ appId: string; gridPosition: [col, row] }>`)

> This stub allows the Shell to reference the registry without depending on any apps being built yet. Stage 2 will call `registerApp()` for each app.

### 5. Create Base Window Component

Create `src/components/xp/Window.tsx` + `WindowTitleBar.tsx` + `WindowButton.tsx` + CSS Modules:

- Title bar with Luna gradient, icon, title, min/max/close buttons
- Drag via PointerEvent API (DOM-direct during drag, sync to Zustand on release)
- 8-point resize handles
- Active/Inactive visual states
- Framer Motion enter/exit animations
- **Renders any app component via `AppConfig.component` + `AppProps`**

### 6. Create Desktop Component

Create `src/components/xp/Desktop.tsx` + `DesktopIcon.tsx` + `DesktopWallpaper.tsx` + `RightClickMenu.tsx`:

- Bliss wallpaper background (branded, from `public/wallpaper/bliss.jpg`)
- Icon grid with grid-snap layout — reads from `desktopIcons` in registry
- Double-click icon → `wmsStore.openWindow(appConfig)` via WMS
- Right-click context menu (Refresh, Properties, etc.)

### 7. Create Taskbar

Create `src/components/xp/Taskbar.tsx` + `StartButton.tsx` + `TaskbarItem.tsx` + `SystemTray.tsx` + `QuickLaunch.tsx`:

- Fixed bottom, 30px height, blue gradient
- Start button (green gradient, XP flag icon, "Start" text)
- Running window buttons — reads `windows[]` from WMS store
- System tray with clock (HH:MM AM/PM, updates every minute)
- Quick Launch bar (Show Desktop, IE, OE icons)
- Notification area for balloon tips (used by Stage 3 sounds)

### 8. Create Start Menu

Create `src/components/xp/StartMenu.tsx` + `StartMenuProgram.tsx` + `AllPrograms.tsx`:

- Two-column layout (programs left, system right)
- User avatar header with blue gradient + "Guest" / user name
- Pinned programs (reads from `appRegistry`)
- "All Programs ▶" cascading submenu (reads from `appRegistry`)
- Right column: My Computer, My Documents, Control Panel, Help, etc. → open corresponding apps
- Log Off + Shut Down buttons at bottom
- Close on click-outside, Escape, or Start button re-click

### 9. Create Boot Sequence

Create `src/components/xp/BootScreen.tsx` + `ShutdownScreen.tsx`:

- Boot: Black → Revenue Architect logo → blue progress bar dots → 3s → fade to Login
- Shutdown: "Windows is shutting down" animation → black screen
- Startup sound plays on boot complete (requires user gesture — first click/tap unlocks audio context)

### 10. Create Login Screen

Create `src/components/xp/LoginScreen.tsx`:

- XP Welcome screen (blue gradient backdrop)
- Guest icon (default, highlighted) → calls `onLogin('guest')` → immediate desktop
- Sign In icon → **stub that logs console message "OAuth not yet wired"** (Stage 3 wires Supabase)
- Pre-checked email consent checkbox (UI only in this stage)
- "To begin, click your user name" text at bottom

> **Auth is UI-only in Stage 1.** The actual Supabase OAuth flow is wired in Stage 3 (`/build-xp-integration`, Step 2).

### 11. Create Content Stubs

Create minimal content JSON files for Stage 2 apps to reference:

- `content/about.json` — Richard Norwood bio, credentials, PMP, contact info
- `content/homepage.json` — Hero, ideology, social proof, about sections
- `content/services.json` — Service tiers, timeline, curriculum
- `content/pricing.json` — SaaS tier definitions
- `content/emails.json` — Pre-seeded Outlook Express welcome emails (3 messages)
- `content/faq.json` — Help Center FAQ topics

> **Source all text from `docs/*.md` files** per the Content Strategist skill. Never hardcode prose.

### 12. Assemble Page Structure

Update `src/app/layout.tsx` and `src/app/page.tsx`:

- App state machine: `boot` → `login` → `desktop`
- Layout imports `xp-theme.css`
- Desktop renders: `<DesktopWallpaper />` + `<Desktop />` + open `<Window />`s from WMS + `<Taskbar />`
- `<StartMenu />` conditionally rendered above Taskbar

### 13. Verify in Browser
// turbo
Navigate to `localhost:3000` and test:

- Boot animation plays → login screen appears
- Click Guest → desktop loads with wallpaper
- Desktop shows placeholder icons (some may show "app not found" if no apps registered — expected)
- Click Start → Start Menu opens with empty program list (expected — Stage 2 fills it)
- Open 3+ windows (if any test apps exist) → z-index and taskbar work correctly
- Take screenshots (boot, login, desktop, start menu)

### 14. Run Lint & Build Gates
// turbo

```bash
npm run lint
npm run build
```

Fix any issues before proceeding.

### 15. Report Completion

Notify user with screenshots and component inventory.

---

## Handoff Contract → Stage 2 (`/build-xp-apps`)

Stage 1 **produces** the following files that Stage 2 **depends on**:

| File | What It Exports | Stage 2 Uses It To... |
|---|---|---|
| `src/lib/wms/types.ts` | `AppConfig`, `AppProps` interfaces | Define each app's config and component props |
| `src/lib/wms/WindowManager.ts` | `useWMSStore` hook | Open windows, update titles, manage focus |
| `src/lib/apps/registry.ts` | `registerApp()`, `getApp()`, `desktopIcons` | Register each app so Desktop/StartMenu can find them |
| `src/components/xp/Window.tsx` | `<Window>` component | Wrap every app in a draggable, resizable window frame |
| `src/styles/xp-theme.css` | Luna CSS custom properties | Style app chrome (menus, toolbars, buttons) |
| `content/*.json` | Structured content | Populate app content (Notepad about text, OE emails, FAQ) |
| `public/icons/*.png` | Icon assets | Desktop icons, Start Menu icons, title bar icons |
| `public/sounds/*.mp3` | Sound assets | App interactions (Stage 3 wires the sound manager) |

**Stage 2 apps must NOT:**
- Import or depend on Supabase clients (wired in Stage 3)
- Make real API calls to WordPress, n8n, or Stripe (stubbed/mocked in Stage 2)
- Import the sound manager (built in Stage 3)

## Validation

- [ ] Boot → Login → Desktop flow works end-to-end
- [ ] Windows can be opened, dragged, resized, minimized, maximized, closed
- [ ] Taskbar shows running windows correctly
- [ ] Start Menu opens/closes with all sections
- [ ] Z-index management works with 3+ windows
- [ ] Luna theme colors match XP specification
- [ ] `content/*.json` files exist with real content
- [ ] `public/icons/` has all required icon PNGs
- [ ] `public/sounds/` has all required sound MP3s
- [ ] Passes `npm run lint`
- [ ] Passes `npm run build`
- [ ] Screenshots captured (boot, login, desktop, start menu)
