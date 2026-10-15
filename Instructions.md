# Capstone Client Finder — High-Fidelity Wireframe: Build Instructions for OpenCode

Stack: **React + Vite + Tailwind CSS + TypeScript (TSX)**
Editor: **VS Code + OpenCode** (already installed)
Design source: the mid-fidelity wireframe (4-screen student flow, phone-frame look).

## Scope: this is a high-fidelity wireframe only

This is a clickable, polished prototype, **not a working system**. Visual quality, realistic content, and a smooth flow between screens matter. Real logic does not.

| In scope | Out of scope |
|---|---|
| Polished screens that match the design tokens | Real login or authentication |
| Realistic mock content (companies, projects, chats) | Backend, database, API calls |
| Clickable navigation across all screens | Saving data between page refreshes |
| Visible UI states: error, loading, disabled, success toast | Real validation rules, emails, notifications |
| Accessibility and consistency | Client-side (posting projects) screens |

If OpenCode starts adding real logic, say: *"This is a high-fidelity wireframe. Keep it a visual prototype with mock data only."*

---

## How to use this file

1. Do **Part A** yourself in the terminal.
2. Do **Part B** once (`/init`, then paste the Project Brief into `AGENTS.md`).
3. Go through **Steps 1 to 9 in order**. For each step:
   - Press **Tab** in OpenCode to switch to **Plan** mode. Paste the prompt and read the plan.
   - If it looks right, press **Tab** again to switch to **Build** mode and say: `Looks good, build it.`
   - Run the **Done when** checklist in the browser.
   - Commit: `git add -A && git commit -m "step N: <name>"`
4. Don't paste two steps at once.

> If OpenCode drifts from the design, say: *"Re-read AGENTS.md and follow the Design Tokens and HCI Rules exactly."*

---

## Part A — Setup (you run these in the terminal)

**A1. Requirements:** Node.js 20 or newer, Git, VS Code. (OpenCode is already installed.)

**A2. Create the Vite project:**

```bash
npm create vite@latest capstone-client-finder -- --template react-ts
cd capstone-client-finder
npm install
```

**A3. Install Tailwind CSS (v4, Vite plugin):**

```bash
npm install tailwindcss @tailwindcss/vite
```

Edit `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Replace everything in `src/index.css` with:

```css
@import "tailwindcss";
```

Do **not** create `tailwind.config.js` or `postcss.config.js` (Tailwind v4 doesn't need them).

**A4. Install the other libraries:**

```bash
npm install react-router-dom lucide-react
```

**A5. Check it runs, then start Git:**

```bash
npm run dev
git init && git add -A && git commit -m "scaffold"
```

**A6. Start OpenCode** in the project folder:

```bash
opencode
```

---

## Part B — Give OpenCode the project context (once)

**B1.** In OpenCode, run `/init`. It creates `AGENTS.md` at the project root.

**B2.** Open `AGENTS.md` and **append** the whole block below. OpenCode reads this file every session, so later prompts can stay short.

```markdown
## Project Brief
Capstone Client Finder is a mobile-first web app concept that connects capstone/thesis
students with real businesses and organizations that need a system built. Students browse
client project postings, apply, and message the client.

THIS IS A HIGH-FIDELITY WIREFRAME ONLY: a polished, clickable prototype. Use hardcoded
mock data and simple React state. No backend, no real auth, no persistence, no timers
that simulate servers. Interactions are simulated just enough to show UI states.

Stack: React + Vite + TypeScript (TSX) + Tailwind CSS v4 + react-router-dom + lucide-react.

## Student Flow (the 4 screens)
1. /login          Login / Role Select
2. /browse         Browse Projects
3. /project/:id    Project Detail
4. /messages       Messages (list) and /messages/:id (thread)
Extra tabs so nav is never a dead end: /applications and /profile (simple screens).

## Layout
- Mobile-first. On screens >= 768px, show the app centered inside a phone frame
  (about 390x800, dark bezel, rounded corners, status bar with "9:41" and
  signal/battery icons). On real phones, no frame, full screen.
- Every screen has: status bar (frame only) -> blue AppBar -> scrollable content
  -> BottomNav (except /login and /project/:id, which has a sticky action bar).

## Design Tokens (define in src/index.css with @theme, use as Tailwind classes)
primary #2F6FED | primary-soft #EAF1FF | ink #2A2A2A | muted #666666
line #C9CDD3 | page #EEF0F3 | frame #1A1A1A
success #2E7D32 / success-soft #E8F5E9 | warning #B26A00 / warning-soft #FFF8E1
error #D32F2F / error-soft #FFF3F3
Font: system sans-serif (Arial/Helvetica fallback). No external fonts.
Radius: buttons 8px, cards 12px, chips and pills fully rounded.
Icons: lucide-react only. No emoji in the UI.
Polish: soft shadows on cards, consistent 4/8px spacing scale, clear type hierarchy
(title 18px bold, body 14px, caption 12px).

## HCI / UX Rules (must hold on every screen)
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

## Code Rules
- TypeScript strict. No `any`. Typed props for every component.
- Function components and hooks only. One component per file in src/components.
- Tailwind classes only (no CSS files except src/index.css). No inline style objects.
- Mock data lives in src/data. Shared types in src/types.ts.
- After every change run `npm run build` and fix all type errors before saying "done".
```

---

## Step 1 — Folder structure, routing, phone-frame shell

```text
Plan this step first, then wait for my approval.

Set up the app skeleton following AGENTS.md:
1. Create folders: src/components, src/screens, src/data, src/context.
2. Create src/types.ts (empty for now, with a comment).
3. Create a PhoneFrame component: on >=768px it centers the app in a phone frame
   (dark bezel, rounded corners, status bar with 9:41 and signal/battery lucide icons);
   below 768px it renders children full screen with no frame. Page background uses the "page" token.
4. Create an AppLayout component that wraps routed screens inside PhoneFrame.
5. Set up react-router-dom with placeholder screens for /login, /browse, /project/:id,
   /messages, /messages/:id, /applications, /profile. Redirect "/" to "/login".
   Each placeholder just shows its screen name.
6. Remove the default Vite demo content and App.css.
```

**Done when:**
- [ ] A centered phone frame with a "9:41" status bar shows on desktop.
- [ ] Every route shows its placeholder name.
- [ ] `npm run build` passes.

---

## Step 2 — Design tokens and shared UI components

```text
Plan this step first, then wait for my approval.

1. In src/index.css, after the tailwindcss import, add an @theme block with all the color
   tokens from AGENTS.md (e.g. --color-primary: #2F6FED;) so classes like bg-primary,
   text-muted, border-line, bg-success-soft work. Add a global focus-visible ring in primary.
2. Build these reusable components in src/components, each with typed props:
   - Button: variants primary | secondary; props: loading, disabled, fullWidth, icon.
     Min height 44px. Disabled must look clearly disabled (gray, lower contrast, no hover).
   - FormField: visible <label> above the input, optional leading icon, optional error
     message (red border + error-soft background + AlertTriangle icon + text, linked with
     aria-describedby and aria-invalid).
   - SegmentedControl: two or more options, active one filled primary.
   - Tag: small outlined skill/category tag.
   - StatusPill: variants open | closing | applied | accepted. ALWAYS icon + text + color.
   - Avatar: circle with initials.
   - Toast: floating pill, role="status" aria-live="polite", auto-dismiss after 3 seconds.
   - AppBar: blue bar with optional back button (aria-label="Go back"), title, optional
     right icon button (aria-label required).
   - BottomNav: 4 tabs with icon + text: Browse, Applications, Messages, Profile.
     Active tab blue and bold. Optional unread dot on Messages. Uses <nav>.
3. Create a temporary /components-preview route showing every component in every state so I
   can check them visually. I will delete it later.
```

**Done when:**
- [ ] `/components-preview` shows all components and states (error field, loading button, disabled button, each pill).
- [ ] The Tab key shows a visible focus ring on every button.
- [ ] `npm run build` passes.

---

## Step 3 — Types, mock data, and tiny app state

```text
Plan this step first, then wait for my approval.

1. In src/types.ts define: Project (id, clientName, clientInitials, title, summary,
   description, tags: string[], category, status: 'open' | 'closing', timeline, deadline),
   Message (id, from: 'me' | 'them', text, time),
   Conversation (id, clientName, initials, messages, unread: boolean).
2. In src/data create hardcoded mock data: 6 realistic projects (include "Green Cart Co. -
   Inventory Tracking System" as open and "Bright Futures Org - Volunteer Scheduling App"
   as closing soon; the others across Web App, Mobile App, Non-profit, Retail, Education),
   and 2 conversations (Green Cart Co. with an unread message and a short thread,
   Bright Futures Org with a short thread).
3. Create a small AppContext (src/context) with a typed useApp() hook holding ONLY:
   userName, appliedProjectIds: string[], conversations, toast message. Actions: login(name),
   logout, applyToProject(id), sendMessage(conversationId, text), markConversationRead(id),
   showToast(message), clearToast. No timers, no fake network layers.
4. Wrap the app in the provider. Don't build any screens yet.
```

**Done when:**
- [ ] `npm run build` passes with no type errors.
- [ ] The mock data has 6 projects and 2 conversations.

---

## Step 4 — Screen 1: Login / Role Select

```text
Plan this step first, then wait for my approval.

Build the /login screen exactly like the wireframe, using the shared components:
- AppBar titled "Capstone Client Finder" (no back button, no BottomNav on this screen).
- Tabs "Log In" | "Sign Up" (Log In active; Sign Up only changes the tab style and
  shows a Full Name field above Email).
- SegmentedControl: Student | Client.
- FormField "Email address" (mail icon, placeholder name@school.edu) and
  FormField "Password" (lock icon, type password).
- Simple demo validation only: if a field is empty on submit, show the inline error
  ("Enter your email address." / "Enter your password.") and move focus to the first empty
  field. Errors clear when the user types. Any non-empty values log in.
- Primary "Log In" button with a short loading state (about 600ms), then go to /browse.
- Secondary "Continue as Guest" button that logs in as "Guest" and goes to /browse.
- Add a "Forgot password?" text link (does nothing).
Polish: add the logo block (rounded blue square with a lucide icon) above the tabs.
```

**Done when:**
- [ ] Submitting empty fields shows red inline errors with an icon and text.
- [ ] Any values log in and show a loading button, then go to /browse.
- [ ] Labels are visible above fields and Enter submits.

---

## Step 5 — Screen 2: Browse Projects

```text
Plan this step first, then wait for my approval.

Build the /browse screen like the wireframe:
- AppBar "Browse Projects" with a bell icon button (aria-label="Notifications").
- Search input with a search icon. Typing filters projects by client name, title, or tag.
- Wrapping filter chips: Web App, Mobile App, Non-profit, Retail, Education. Chips toggle
  (aria-pressed); active chip is filled primary. Multiple can be active.
- Project cards: Avatar, client name (bold), project title, StatusPill, up to 2 Tags, and a
  secondary "View Details" button that goes to /project/:id. The whole card is clickable too.
- If a project is in appliedProjectIds, show the "Applied" StatusPill on its card.
- Empty state when nothing matches: icon + "No projects match your search" + "Clear filters" button.
- BottomNav with Browse active. Messages tab shows the unread dot when any conversation is unread.
```

**Done when:**
- [ ] Search and chips filter live, and the empty state appears when nothing matches.
- [ ] Status pills show icon + text + color.
- [ ] Clicking a card or its button opens `/project/:id`.

---

## Step 6 — Screen 3: Project Detail (apply feedback)

```text
Plan this step first, then wait for my approval.

Build /project/:id like the wireframe:
- AppBar "Project Details" with a back button and a more (three dots) icon button
  (aria-label="More options").
- A banner placeholder block with descriptive alt/aria-label text, the project title
  (large and bold), "Posted by <client>", the description, tags, and a timeline/deadline
  row with a calendar icon.
- Sticky bottom action bar with two buttons:
  1. Primary "Apply Now". On click: loading state ("Sending...") for about 800ms, then
     a success toast "Application sent to <client>", and the button becomes a disabled
     "Applied" with a check icon.
  2. Secondary "Message Client". DISABLED (looks disabled, aria-disabled) with the helper
     line "Available after you apply" until the project is applied to. After applying it
     becomes enabled and opens that client's /messages/:id thread (create a conversation
     for that client if none exists).
- If the project id doesn't exist, show a friendly "Project not found" state with a button
  back to /browse.
- No BottomNav on this screen (the action bar takes its place).
```

**Done when:**
- [ ] Apply Now shows a spinner, then a toast, then a disabled "Applied" button.
- [ ] Message Client starts disabled and enables after applying.
- [ ] Going back to Browse shows the "Applied" pill on that card.

---

## Step 7 — Screen 4: Messages (list and thread)

```text
Plan this step first, then wait for my approval.

Build /messages and /messages/:id:
- /messages: AppBar "Messages" with a search icon button (aria-label="Search messages").
  Conversation list: Avatar, client name (bold if unread), last message preview, and a blue
  unread dot with a visually hidden "Unread" label. Each row links to /messages/:id.
  BottomNav with Messages active.
- /messages/:id: AppBar with a back button and the client name. Chat bubbles: "them" is
  gray and left-aligned, "me" is primary blue and right-aligned (position AND color differ).
  Time in small muted text under each bubble.
  Input row pinned at the bottom: text input (with an sr-only label) and a Send icon button
  (aria-label="Send message") that is DISABLED while the input is empty. Enter sends.
  Sending adds the bubble and scrolls to the bottom. Opening a thread calls
  markConversationRead. No fake replies.
```

**Done when:**
- [ ] Opening the unread conversation clears its dot and the dot on the Messages tab.
- [ ] Send is disabled when empty. Sent messages appear as blue right-aligned bubbles.

---

## Step 8 — Applications and Profile tabs (no dead ends)

```text
Plan this step first, then wait for my approval.

Build two simple screens so the BottomNav never leads to a placeholder:
- /applications: AppBar "My Applications". List projects in appliedProjectIds with project
  title, client name, and an "Applied" StatusPill. Empty state: icon + "You haven't applied
  to any projects yet" + a "Browse projects" button. BottomNav with Applications active.
- /profile: AppBar "Profile". Avatar, user name, a static mock email, role "Student", a
  short skills Tag list (static mock), and a "Log out" secondary button that clears the
  user and returns to /login with a toast "You have been logged out". BottomNav with
  Profile active.
Also add a NotFound route with a friendly message and a button back to /browse.
```

**Done when:**
- [ ] All 4 tabs lead to real screens with the active tab highlighted.
- [ ] Applying to a project makes it appear in Applications.
- [ ] Log out returns to /login.

---

## Step 9 — Accessibility, consistency, and final checks

```text
Plan this step first, then wait for my approval.

1. Audit the whole app against the HCI / UX Rules in AGENTS.md and fix every violation:
   every input has a visible label, every icon-only button has an aria-label, tab order is
   logical, focus ring shows on all interactive elements, tap targets are at least 44px,
   contrast is at least 4.5:1 (check text-muted, disabled buttons, pills; darken tokens if
   needed), one <main> per screen, sensible heading order.
2. Consistency: replace any one-off styled buttons, tags, or cards with the shared
   components. Spacing, radius, and font sizes must match across screens. Scroll resets to
   top on route change, and the AppBar and BottomNav stay fixed while content scrolls.
3. Only one toast shows at a time.
4. Delete the /components-preview route and file.
5. Run `npm run build` and `npm run lint` and fix every error. Remove unused files, imports,
   and console.log calls.
6. Replace README.md with: what the project is (a high-fidelity wireframe, not a working
   system), how to run it (npm install, npm run dev), the 4-screen flow, and a short table
   mapping each HCI concept (interaction styles, navigation and user flow, feedback,
   sensory channels, accessibility, consistency) to where it appears in the app.
7. Do not add new features. Output a checklist of what you checked and fixed.
```

**Done when:**
- [ ] You can finish the whole flow with the keyboard only: Login → Browse → Detail → Apply → Message Client → Thread.
- [ ] `npm run build` and `npm run lint` are clean.
- [ ] No leftover preview route. Take screenshots of the 4 screens in the phone frame for your submission.
- [ ] `git commit -m "final"` and push to GitHub if you need a repo link.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Tailwind classes do nothing | Check that `src/index.css` has `@import "tailwindcss";` and `vite.config.ts` includes `tailwindcss()`. Restart `npm run dev`. |
| Custom colors like `bg-primary` don't exist | The `@theme` block must be in `src/index.css` and use names like `--color-primary`. |
| OpenCode ignores the design | Tell it: "Re-read AGENTS.md and follow the Design Tokens exactly." |
| OpenCode adds real logic or a backend | Tell it: "This is a high-fidelity wireframe. Mock data only." |
| OpenCode changed too much | `git diff` to review, `git checkout .` to undo, then re-prompt with a narrower request. |
| Type errors after a step | Say: "Run npm run build and fix all type errors without changing behavior." |
| Phone frame shows on a real phone | The frame should only appear at 768px and wider. Ask OpenCode to fix the breakpoint in PhoneFrame. |
