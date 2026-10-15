# Capstone Client Finder

A **high-fidelity wireframe** — a polished, clickable prototype that connects capstone /
thesis students with real businesses and organisations that need a system built. Students
browse client project postings, apply, and message the client.

> **This is not a working system.** There is no backend, no authentication, no database and
> no persistence. Everything is hardcoded mock data plus in-memory React state, so the app
> resets on reload. It exists to demonstrate layout, navigation, and interaction states.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) and production build |
| `npm run lint` | Lint with oxlint |
| `npm run preview` | Preview the production build |

## Stack

React 19 + Vite + TypeScript (strict) + Tailwind CSS v4 + `react-router-dom` + `lucide-react`.
There is intentionally **no** `tailwind.config.js` / `postcss.config.js`; the design tokens
live in an `@theme` block in `src/index.css`, and no other CSS file exists. Mock data lives in
`src/data`; shared types in `src/types.ts`.

## The 4-screen student flow

| Screen | Route | What it demonstrates |
| --- | --- | --- |
| 1. Login / Role Select | `/login` | Log In vs Sign Up tabs, Student/Client role toggle, inline field validation, loading state, "Continue as Guest" |
| 2. Browse Projects | `/browse` | Search box, category filter chips, responsive 1/2/3-column card grid, "Applied" pill |
| 3. Project Detail | `/project/:id` | Apply Now (spinner → toast → disabled "Applied" with check), "Message Client" unlocks after applying, "Project not found" state |
| 4. Messages | `/messages`, `/messages/:id` | Conversation list with unread dots; chat thread with left/right bubbles and a pinned send row |

Extra tabs so navigation is never a dead end: `/applications` (your applied projects),
`/profile` (avatar, name, role, skills, Log out), plus a friendly `*` Not Found route.

Layout is responsive: phones (`<768px`) use a bottom tab bar; tablet/desktop (`≥768px`) move
the same four tabs into a top nav bar. Content adapts too — a responsive grid for Browse and a
centered readable column for form/detail screens.

## HCI concepts → where they appear

| HCI concept | Where to look |
| --- | --- |
| **Interaction styles** | Buttons (`Button`), tappable cards (Browse / Applications rows as stretched links), chips (`FilterChip` category filters), segmented toggle (`SegmentedControl` role picker on `/login`), form fields (`FormField`) |
| **Navigation and user flow** | Persistent `BottomNav` (phones) / `DesktopNav` (`≥768px`) with icon + text label; back arrow on inner screens (`AppBar`); active tab blue and bold; flow Login → Browse → Detail → Messages |
| **Feedback** | Inline field errors (`FormField` sets `aria-invalid` + `aria-describedby`); loading state on Apply / Log In (`loading` + `aria-busy`); toast after actions (`Toast`, global — only one at a time); disabled buttons; unread dot on the Messages row and nav tab |
| **Sensory channels** | Never colour alone — status pills are icon + colour + text (`StatusPill`: Open / Closing soon / Applied / Accepted); chat sender differs by bubble **position and** colour (`MessageBubble`); unread = bold name + dot + visually-hidden "Unread" |
| **Accessibility** | Visible `<label>` above every input (`FormField`); `sr-only` label for the chat input; `aria-label` on every icon-only button; visible focus ring via global `:focus-visible`; tap targets `≥44px` (`min-h-11`); text contrast `≥4.5:1` (tokens darkened in Step 9); semantic `header` / `nav` / `main` / `button`; one `<main>` per screen; toast uses `role="status"` + `aria-live="polite"` |
| **Consistency** | One shared component per element — `Button`, `Tag`, `StatusPill`, `Avatar`, `FormField`, `FilterChip`, `SegmentedControl`, `AppBar`, `BottomNav`, `DesktopNav`, `Toast`, `MessageBubble` — so nothing is restyled inline; consistent 4/8px spacing scale and radius (8px buttons, 12px cards, fully-rounded chips/pills) |

## Project structure

```
src/
  components/   shared UI (one component per file) + AppLayout
  context/      AppContext + AppProvider (mock app state)
  data/         mock projects and conversations
  screens/      one file per route
  index.css     @theme design tokens
  types.ts      shared types
```
