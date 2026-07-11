# RESUME.md — Session Resume Briefing

Project: **jb-protfolio** — bilingual (TH/EN) Software Engineer portfolio site for Chanakarn Susinraworn, built for job hunting.
Repo: `C:\Users\jamesbond\Documents\GitHub\jb-protfolio` — branch `main`, **up to date with `origin/main`** (the previous 5 commits, through `a34f4c9`, have been pushed). **One file currently uncommitted: `src/content/projects.ts`** (added `liveUrl` to MaoLeaw + SiPH Proud Point, reordered the array so Car Rental/POS — the two placeholder-image entries — sort last, changed SiPH's first carousel image to the Home-screen shot). This briefing supersedes the 2026-07-02 version in full — most of what follows postdates it.

## 1. Pipeline position

| Stage | Status | Evidence |
|---|---|---|
| PRD | ✅ | `docs/PRD.md` |
| SA Blueprint | ✅ | `docs/SA_BLUEPRINT.md` |
| UX/UI Design | ✅ | `docs/UXUI_DESIGN.md` |
| Clickable prototype | ✅ | `docs/mockups/portfolio-prototype.html` |
| Scaffold | ✅ | early commit history |
| Dev (feature build) | 🚧 ongoing — actively being iterated on, not "done" in a final sense | commits through `a34f4c9` + 1 uncommitted file |
| QA | 🚧 started (2026-07-09) | `e2e/contact-form.spec.ts` (Playwright, 5 tests, all passing) + `playwright.config.ts` — covers `POST /api/contact`'s validation/honeypot/rate-limit/Resend-failure branches per `docs/SA_BLUEPRINT.md` §5. Run via `npm run test:e2e`. Nothing else on the site has test coverage yet (everything else is static rendering, deliberately out of scope per §5). |
| Devops/deploy | ⬜ not started | no `vercel.json`, no live URL for this site itself; `.github/workflows/ci.yml` exists (`npm ci` → lint → typecheck → build) but nothing deploys |

**Doc hygiene note:** root `README.md`'s "Status" section still says *"Repo skeleton only — no feature code yet."* Still stale (was already flagged stale on 2026-07-02; nobody's fixed it since). Don't trust that one section; the rest of the README is fine.

## 2. Done / in-progress / not-started

**Done** (verified this session: `npm run lint`, `npx tsc --noEmit`, `npm run build` all pass clean — see §6):

- Core sections wired in `src/app/page.tsx`: Navbar, Hero, About (Zoom Parallax), Projects, Skills, Experience, Contact, Footer.
- i18n (TH/EN), theme (light/dark), contact form + `POST /api/contact` (Resend, zod, honeypot, rate-limit) — all unchanged from before, still working.
- Resume/CV download still wired (`RESUME_URL = "/resume.pdf"` in `src/content/contact.ts`, real file at `public/resume.pdf`).
- **Projects content is now real and much larger** — 7 entries in `src/content/projects.ts`, ordered (real-screenshot projects first, placeholders last): `maoleaw`, `siph-proud-point`, `astralix`, `work-joy-station`, `trident-ims` (placeholder — client hasn't signed off on screenshots yet, see in-file comment), `car-rental-dashboard`, `pub-pos-system` (both placeholder-box images, no real screenshots — old codebases inaccessible). `liveUrl` now set on 4 of 7: MaoLeaw (`mao-leaw-liff.vercel.app`), SiPH Proud Point (`line.siph.code-play.net`), Astralix (`astralix.code-play.net`), Work Joy Station (`wjs.code-play.net`). SiPH's first carousel image is deliberately the Home-screen shot (picked by visually reviewing all 6 screenshots — bottom nav shows "Home" active), not upload order.
- **Skills section fully rebuilt this session**: the old plain tag-list + an experimental marquee were both removed. Now: `SkillsBento` (`src/components/skills-bento.tsx`) — a tabbed (`AnimatedTabs`, All/Languages/Frameworks/Tools) bento grid of skill cards with live brand logos (Simple Icons CDN, verified per-slug before wiring). Cards with a matching project are a `Popover` (Radix) trigger listing linked project(s); picking one calls `ProjectSpotlightProvider.requestProject(id)`. 21 skills now (added Express.js, NestJS, Material UI, PostgreSQL, Prisma, Turborepo, LINE LIFF, Docker, Zustand — Zustand has no Simple Icons logo, confirmed via live 404 check, renders name-only).
- **Cross-section "spotlight" navigation** (`src/components/providers/project-spotlight-provider.tsx`): a skill or an Experience entry can ask the Projects section to scroll into view and open a specific project's modal, without lifting Projects' own `selected` state up. Wired into `src/app/layout.tsx`.
- **`CircleMenu` component built and adapted** (`src/components/ui/circle-menu.tsx`) from a 21st.dev-style reference — a trigger that fans items out along a configurable arc on a spring. Tried in Skills first (didn't work — got clipped by neighboring grid cards in the dense bento layout, reverted to Popover there). **Currently used only in Experience** — see below.
- **Experience section overhauled**:
  - Timeline line was rendering as broken per-entry segments (each entry had its own `border-l-2`, gaps at every `space-y-8` seam) — now a single continuous absolutely-positioned line spanning the whole list.
  - Entries fade/slide in on scroll, staggered by index (same treatment as Skills bento cards).
  - Added a real "Car Rental" freelance job (2023, before Easset) per user's actual work history.
  - **Job history corrected**: user left Easset 2025-04, joined **Codeplay** (own agency, `code-play.net`) 2025-08, full-time since. `experience.ts` now has 3 entries (Codeplay present, Easset 2024–2025-04, Freelance 2023), rendered most-recent-first. About-section copy (`about.body` in both `en.json`/`th.json`) updated from "at Easset Company Limited" to "at Codeplay".
  - Where an entry produced a project (`Project.experienceId` matches an `ExperienceEntry.id` — set on 5 of the 7 projects), a `CircleMenu` trigger sits at the entry's **middle-right edge** (not inline below the text; text gets a `pr-14` gutter reserved so it never collides with the trigger). Fans in a right-opening semicircle (`arc=180, startAngle=-90, radius=56, itemSize=28`) — icon-only circles; hovering one shows its project title in a tooltip anchored to **that item's own right side** (not below it, and not a single shared tooltip) — this went through two wrong iterations before landing here, see §4.
- Cursor fix: plain `<button>` elements site-wide had no `cursor-pointer` (browser default for `<button>` is an arrow, not a hand — a real, easy-to-miss gap). Added to: Skills bento cards, ProjectCard's title/View-Details buttons, Skills popover project links, Experience's CircleMenu trigger/items.
- ProjectCard: description truncated to one line (`truncate`), image area grown 176px→224px — more visual-first, per user request.
- Hero: staggered entrance animation on first load (text → wave → photo, ~0.2s apart), same fade+slide-up idiom as the bento cards. Runs once on mount (not scroll-triggered, since Hero is already on screen at first paint).

**In progress / partially done:**
- **Contact form email delivery still not functional end-to-end** — no `.env.local` exists (only `.env.example`, all three values blank: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). Route returns a handled `502 delivery_failed`, not a crash.
- The Skills/Experience/CircleMenu/job-history work (5 commits: `5b1977b`…`a34f4c9`) is committed **and pushed**. The projects.ts reorder/liveUrl/image-order change (see repo-state line above) is **uncommitted** — confirm with the user before committing/pushing.
- Car Rental Dashboard / POS System / Trident IMS still ship as honest placeholder boxes (no real screenshots) — this is a deliberate, previously-confirmed choice (old codebases inaccessible; Trident IMS awaiting client sign-off), not an oversight.

**Not started:**
- No `/devops` pass — no CI deploy step, no hosting set up (Vercel free tier is the named target, per earlier user confirmation, nothing configured yet). The CI workflow (`.github/workflows/ci.yml`) does NOT yet run the new E2E suite — only lint/typecheck/build. Wiring `npm run test:e2e` into CI is a `/devops`-stage task, not done as part of this QA pass.
- WCAG AA contrast check on the accent color, flagged in `docs/UXUI_DESIGN.md` §5, never run.
- README's stale "Status" section (see §1) — still not fixed.

## 3. Decisions already locked (don't re-litigate)

- **Stack:** Next.js 16.2.9 (App Router, Turbopack), React 19.2.4, TypeScript, Tailwind CSS v4, shadcn/ui (Nova preset), Framer Motion 12, next-themes, zod, Resend, `radix-ui` (single unified package, not per-component `@radix-ui/react-*`). No database. Full rationale: `docs/SA_BLUEPRINT.md` §0.
- **Design tokens** live as CSS custom properties in `src/app/globals.css` (`--primary` orange, `--secondary-accent` deep indigo added mid-project) — extend, don't re-pick. Full spec: `docs/UXUI_DESIGN.md` §1.
- **Job history is user-confirmed, not inferred:** Codeplay (own agency) is the *current* job (2025-08–present), not a rebrand of Easset. Easset ended 2025-04. There's a real ~4-month gap (2025-04 to 2025-08) between them — don't "fix" or fill that gap, it's accurate as given.
- **`experienceId` on `Project` (new this session)** links a project to the job that produced it — only set where unambiguous (5 of 7 projects have it). Don't backfill it onto Car Rental/POS/MaoLeaw/Trident IMS just to be complete; MaoLeaw genuinely isn't tied to any job entry (personal project), and the placeholder-image projects that DO have an owner (Car Rental → Freelance, Trident IMS → Codeplay) already have it set correctly.
- **CircleMenu is Experience-only, not a general replacement for Popover.** It was explicitly tried in Skills and explicitly reverted for being unworkable in a dense grid (see §4). Don't reintroduce it there without a real design change to justify it.
- **Skills card empty state:** a skill with zero linked projects renders as a plain non-interactive `<div>`, not a button/trigger of any kind. This was a deliberate simplification (previously showed a Popover with a "not used yet" message) — don't re-add the empty-state message unless asked.
- **`popover.tsx`** (`src/components/ui/popover.tsx`) was deleted then recreated identically mid-session when Skills reverted from CircleMenu back to Popover — if you're diffing history and see a delete+recreate, that's why; the file is currently in active use (Skills), not dead code.
- **`shiny-button.tsx`** (`src/components/ui/shiny-button.tsx`) is dead code as of the merge in `10dad56` (Live button restyled to match the plain Code button) — confirmed via project-wide grep, zero remaining imports. Not deleted yet; safe to delete if you're doing cleanup, but nobody's asked for that specifically.

## 4. Gotchas / lessons learned

- **Preview-tool rAF/visibility throttling makes JS-driven animations appear frozen — not a real bug, confirmed twice this session.** When the preview browser tab is unfocused/hidden (`document.hasFocus()===false` and/or `document.visibilityState==="hidden"`, common in this automated environment), Framer Motion's `animate`/spring transitions can sit at their initial state for several seconds before catching up, because `requestAnimationFrame` gets heavily throttled. Confirmed on: the Hero entrance animation (stuck at `opacity:0` until the tab was clicked into focus, then completed correctly) and the Experience CircleMenu fan-out (items sat at `transform: none` for 1-2s, then animated correctly once given ~6s of real wait). **When verifying animations in this tool, wait several real seconds (not just the animation's own duration) before concluding something is broken**, and cross-check `document.hasFocus()`/`visibilityState` before filing it as a bug.
- **`preview_click` (the tool's synthetic click) can misbehave on toggle/open-close components** — confirmed this session on `CircleMenu`'s trigger (a single `preview_click` sometimes left it in the *closed* state immediately, as if two click events fired). A plain `element.click()` via `preview_eval` is more reliable for toggle buttons in this tool. Same category of artifact as an earlier-documented case (`preview_click` closing an open Radix Dialog).
- **`preview_screenshot` intermittently returns a blank/frozen or oddly-cropped image** in this session (recurring artifact, not new) — when it happens, don't trust it as evidence of a real rendering bug; cross-verify via `getBoundingClientRect()`/`getComputedStyle()` in `preview_eval` instead, which was reliable throughout.
- **CircleMenu tooltip placement took two wrong iterations before the right one:**
  1. First attempt: icon-only circles, tooltip appeared *below* each item (`top-full`) — items at different heights in the arc meant one item's tooltip visually overlapped a neighboring item's icon. Wrong.
  2. Second attempt (overcorrection): switched to always-visible icon+label "pills" instead of hover tooltips, to sidestep the collision entirely. User's actual ask was narrower than this — they wanted hover tooltips, just positioned correctly.
  3. **Landed on:** icon-only circles again, but the tooltip is anchored to *that item's own right side* (`left-full ml-2`, vertically centered on that specific item), not below it and not a single shared tooltip element. Since items are already at different heights along the arc, anchoring each tooltip to its own item makes the tooltips naturally stagger without ever needing to reason about neighbor collision explicitly.
  - Lesson: when a fan-out/radial menu's hover labels collide, check whether the label's anchor *axis* is the problem (perpendicular to the fan direction is often safer than parallel) before reaching for a bigger structural change like always-visible labels.
- **Native `<button>` elements do not get `cursor: pointer` by default** in this project's Tailwind v4 setup (no Preflight rule sets it, unlike some older Tailwind defaults) — this was a real, site-wide, easy-to-miss gap covering ThemeToggle, LanguageToggle, and every raw `<button>` in Skills/Projects/Experience. Only fixed where explicitly asked (Skills + Projects) this session — **ThemeToggle/LanguageToggle and other raw buttons elsewhere in the site likely still lack it**; a project-wide `cursor-pointer` sweep on interactive elements would be a reasonable low-risk follow-up if asked.
- **Playwright's `.fill(value, {force: true})` is unreliable on a `display:none` element** — confirmed while writing the honeypot E2E test (`e2e/contact-form.spec.ts`): force-filling the hidden `input[name="honeypot"]` didn't set its value at all; instead the typed text got appended onto the *previously-focused* field (the message textarea), corrupting that field's value (confirmed via the test's own accessibility-tree failure dump, which showed `spam messagei-am-a-bot` inside the Message textbox). Root cause: force skips actionability checks including the focus step, and a display:none element can't actually receive focus, so fill's internal clear+type ends up acting on whatever was focused before. Fix: set the value directly via `locator.evaluate((el, value) => { el.value = value; el.dispatchEvent(new Event("input", {bubbles: true})); }, value)` instead — bypasses focus entirely, which also better simulates how a real bot script would set a hidden field anyway.
- **The rate limiter (`src/lib/rate-limit.ts`) is in-memory and shared across the whole dev-server process** — an E2E test that exercises it for real (not mocked) must set a unique `x-forwarded-for` header per test run (`context.setExtraHTTPHeaders`), or repeat runs against the same still-running dev server will collide with leftover state from the previous run. Verified this session by running the suite twice back-to-back with no server restart — passed both times only because of the per-run random test IP.
- **Case-sensitivity between this Windows dev machine and a Linux prod host is a recurring real risk** (caught once already this session's predecessor: `/aboutMe/` vs actual `public/aboutME/`). When new image paths are added (as happened again this session with `public/TPS/...` screenshots), verify the referenced path casing matches the actual folder/file casing on disk exactly — Windows won't catch a mismatch locally; Vercel's Linux filesystem will 404.

## 5. Immediate next step

**Single most obvious next action:** ask the user whether to **commit the currently-uncommitted work** — `src/content/projects.ts` (liveUrl additions, project reorder, SiPH image reorder) plus the new QA artifacts (`playwright.config.ts`, `e2e/contact-form.spec.ts`, `.gitignore`/`package.json` updates for `test:e2e`). Nothing in the working tree is broken or half-finished — lint/typecheck/build are all clean, the E2E suite is 5/5 passing and verified deterministic across repeat runs (see §6) — but don't commit without asking first, same as every other batch this session.

If the user wants a next step that's pure code with no new decisions needed from them: **`/devops`** is the next unstarted pipeline stage — wiring `npm run test:e2e` (with `npx playwright install --with-deps chromium`) into `.github/workflows/ci.yml`, and picking/setting up the Vercel deploy.

Still open from before, not dropped: **Resend setup** (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` in a new `.env.local`) so the contact form can send real email — needs the user's credentials, not code changes.

## 6. How to verify state

```bash
git status                # confirm what's actually uncommitted right now
git log --oneline -25     # cross-check this briefing against actual history
npm install               # dependencies per package.json/package-lock.json
npm run lint               # ESLint — clean as of this session
npx tsc --noEmit           # TypeScript — clean as of this session
npm run build               # next build (Turbopack) — clean as of this session
npx playwright install chromium  # one-time, if browsers aren't already cached
npm run test:e2e            # Playwright E2E — 5/5 passing as of this session
```

Expected `next build` output (as of this session): 3 routes — `/` (static), `/_not-found` (static), `/api/contact` (dynamic) — no errors, no warnings.

To manually re-check the things most likely to drift:
- **Experience → Projects links:** scroll to Experience, hover/click the small circular trigger on the Codeplay or Freelance entry — it should fan out project shortcuts to the right; clicking one should scroll to Projects and open that project's modal.
- **Skills → Projects links:** scroll to Skills, click a card that has a colored logo and Simple Icons brand icon (most of them) — a Popover should list the project(s) it's used in (or the card simply won't be clickable if none — e.g. React Native, C/C++).
- **Cursor:** hovering any Skills card, Project card title/View-Details button, or Experience's fan trigger/items should show a hand cursor, not an arrow.
- **Contact form:** submitting locally without `RESEND_API_KEY` set should return an inline "something went wrong" banner (502 `delivery_failed`) — expected/correct, not a bug.
