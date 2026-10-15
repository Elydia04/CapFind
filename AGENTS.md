# AGENTS.md

Guidance for OpenCode (and other agents) working in this repository.

Repository: **capstone-client-finder**

## Project Brief

Capstone Client Finder is a mobile-first web app concept that connects capstone/thesis
students with real businesses and organizations that need a system built. Students browse
client project postings, apply, and message the client.

THIS IS A HIGH-FIDELITY WIREFRAME ONLY: a polished, clickable prototype. Use hardcoded
mock data and simple React state. No backend, no real auth, no persistence, no timers
that simulate servers. Interactions are simulated just enough to show UI states.

Stack: React + Vite + TypeScript (TSX) + Tailwind CSS v4 + react-router-dom + lucide-react.

### Student Flow (the 4 screens)
1. /login          Login / Role Select
2. /browse         Browse Projects
3. /project/:id    Project Detail
4. /messages       Messages (list) and /messages/:id (thread)
Extra tabs so nav is never a dead end: /applications and /profile (simple screens).

### Layout
- Responsive web app. No phone frame and no status bar. The app fills the viewport;
  content adapts to phone, tablet, and desktop.
- Navigation: phones (<768px) use the bottom tab bar (`BottomNav`, `md:hidden`);
  tablet/desktop (>=768px) use a top nav bar (`DesktopNav`, `hidden md:flex`) with the
  same 4 tabs. Only one nav is visible at a time. `AppLayout` shows `DesktopNav` on
  every screen except `/login` and `/project/:id`.
- Every screen has: blue AppBar -> scrollable content -> `BottomNav` on phones
  (except /login and /project/:id, which has a sticky action bar and no tab bar).
- Content responsiveness: Browse uses a responsive grid (1 / 2 / 3 columns); form and
  detail screens use a centered readable column (e.g. `max-w-md` for forms,
  `max-w-2xl` for content). This intentionally deviates from the original phone-frame
  wireframe at the user's request.

### Design Tokens (define in src/index.css with @theme, use as Tailwind classes)
primary #2F6FED | primary-soft #EAF1FF | ink #2A2A2A | muted #666666
line #C9CDD3 | page #EEF0F3 | frame #1A1A1A
success #2E7D32 / success-soft #E8F5E9 | warning #B26A00 / warning-soft #FFF8E1
error #D32F2F / error-soft #FFF3F3
Font: system sans-serif (Arial/Helvetica fallback). No external fonts.
Radius: buttons 8px, cards 12px, chips and pills fully rounded.
Icons: lucide-react only. No emoji in the UI.
Polish: soft shadows on cards, consistent 4/8px spacing scale, clear type hierarchy
(title 18px bold, body 14px, caption 12px).

### HCI / UX Rules (must hold on every screen)
- Interaction: buttons, tappable cards, chips, segmented toggle, form inputs.
- Navigation: persistent BottomNav with icon + text label; back arrow on inner screens;
  active tab is blue and bold.
- Feedback: inline field errors, loading state on the Apply button, toast after actions,
  disabled state that looks disabled, unread dot on messages.
- Sensory channels: never use color alone. Status = icon + color + text.
  Chat sender = bubble position + color.
- Accessibility: visible <label> above every input, aria-labels on icon-only buttons,
  toast uses role="status" aria-live="polite", visible focus ring (focus-visible),
  tap targets at least 44px tall, text contrast at least 4.5:1, semantic elements
  (button, nav, main, header).
- Consistency: reuse the shared components. Never restyle a button, tag, or card inline.

### Code Rules
- TypeScript strict. No `any`. Typed props for every component.
- Function components and hooks only. One component per file in src/components.
- Tailwind classes only (no CSS files except src/index.css). No inline style objects.
- Mock data lives in src/data. Shared types in src/types.ts.
- After every change run `npm run build` and fix all type errors before saying "done".

## Commands
- `npm run dev` — start the Vite dev server (default http://localhost:5173)
- `npm run build` — type-check (`tsc -b`) and production build
- `npm run lint` — oxlint
- `npm run preview` — preview the production build

## Notes for agents
- Tailwind CSS v4 via `@tailwindcss/vite`. There is intentionally **no**
  `tailwind.config.js` or `postcss.config.js`. Theme tokens belong in an `@theme` block
  in `src/index.css`.
- Linting uses **oxlint** (not ESLint).
- Keep it a wireframe: mock data only, no real logic.
