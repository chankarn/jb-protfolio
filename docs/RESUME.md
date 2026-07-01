# RESUME.md — Session Resume Briefing

Project: **jb-protfolio** — bilingual (TH/EN) Software Engineer portfolio site for Chanakarn Susinraworn, built for job hunting.
Repo: `C:\Users\jamesbond\Documents\GitHub\jb-protfolio` — branch `main`, working tree clean, in sync with `origin/main` as of 2026-07-02.

## 1. Pipeline position

| Stage | Status | Evidence |
|---|---|---|
| PRD | ✅ | `docs/PRD.md` |
| SA Blueprint | ✅ | `docs/SA_BLUEPRINT.md` |
| UX/UI Design | ✅ | `docs/UXUI_DESIGN.md` |
| Clickable prototype | ✅ | `docs/mockups/portfolio-prototype.html` |
| Scaffold | ✅ | commit `1d0dfde` |
| Dev (feature build) | ✅ mostly — one item genuinely unimplemented, see §2 | commits `31e2ef9` → `d75a2a7` |
| QA | ⬜ not started | no test files anywhere in the repo (`find . -iname "*.test.*" -o -iname "*.spec.*"` → empty), no test runner in `package.json` |
| Devops/deploy | ⬜ not started | no `vercel.json`, no evidence of a live URL; `.github/workflows/ci.yml` exists (install → lint → typecheck → build) but nothing deploys |

**Doc hygiene note:** root `README.md`'s own "Status" section still says *"Repo skeleton only — no feature code yet."* That line is stale — everything below in this briefing shows otherwise. Cheap to fix (one paragraph) but hasn't been touched since scaffold. Don't trust that one section; the rest of the README (setup commands, project structure) is accurate.

## 2. Done / in-progress / not-started

**Done** (verified this session: `npm run lint`, `npx tsc --noEmit`, `npm run build` all pass clean):
- All sections wired into `src/app/page.tsx`: Navbar, Hero, About (Zoom Parallax), Projects, Skills, Experience, Contact, Footer.
- i18n: TH/EN toggle via `src/components/providers/language-provider.tsx` + `src/i18n/{en,th}.json`, persisted to `localStorage`, browser-locale default.
- Theme: light/dark via `next-themes`, toggle in `src/components/theme-toggle.tsx`.
- Contact form + `POST /api/contact` (`src/app/api/contact/route.ts`): zod validation (`src/lib/contact-schema.ts`), honeypot, in-memory IP rate limit (`src/lib/rate-limit.ts`), Resend send, HTML-escaped body.
- Project details modal (`src/components/project-modal.tsx`): Radix/shadcn Dialog, spotlight cursor-tracking hover on the image, bilingual copy, conditional live/repo links.
- **Resume/CV download IS wired** (verified project-wide with `grep -rn "resume.pdf\|RESUME_URL" src/ public/` this session, not just a spot-check): `src/content/contact.ts` exports `RESUME_URL = "/resume.pdf"`, consumed in `src/components/sections/contact.tsx:29-37`; `public/resume.pdf` is a real 376KB file. **This was previously misreported as missing in an earlier test run of the `handoff` skill — that was wrong. Trust this grep-verified line instead.**
- Real content in place (commit `4b6b0eb`): `src/content/{experience,skills,projects,contact}.ts` sourced from the owner's actual resume, not mock data.
- Zoom Parallax mobile fix (`7d6d4a4`): falls back to the same static-grid treatment used for `prefers-reduced-motion` on viewports ≤767px, via `src/hooks/use-media-query.ts`. Desktop scroll-jacking (2400px track at 800px viewport height) unchanged.
- ThemeToggle hydration fix (`804e21a`) — see §4, this one's important not to undo.

**In progress / partially done:**
- **Contact form email delivery is not functional end-to-end.** Code path is complete and correct, but no `.env.local` exists in the repo (only `.env.example`, all three values blank). Without `RESEND_API_KEY`, the route returns `502 { ok:false, error:"delivery_failed" }` — a deliberate, handled failure, not a crash, but real email currently cannot send.
- **Project screenshots and About-section photos are still placeholders.** `imageSrc: ""` on both entries in `src/content/projects.ts`; `src: ""` on all 5 entries in `src/content/about-images.ts`. The placeholder-box UI (`src/components/ui/placeholder-image.tsx`) renders correctly in the meantime — this isn't broken, just unfinished content.
- **`liveUrl`/`repoUrl` are unset on both published projects** (Car Rental Dashboard, POS System) — the type supports them (`src/content/projects.ts`), the UI conditionally renders the links when present, they're just empty right now.

**Not started:**
- No `/qa` pass — no tests exist. `docs/SA_BLUEPRINT.md` §5 names `/api/contact`'s validation/honeypot/rate-limit/Resend-failure branches as the one thing worth testing.
- No `/devops` pass — no CI deploy step, no hosting decided in config (docs name Vercel free tier as the target, per user confirmation, but nothing's set up).
- WCAG AA contrast check on the accent color (`#D97757` light / `#E08661` dark) used for text/icons, flagged in `docs/UXUI_DESIGN.md` §5, never run.
- Extra 21st.dev-style micro-interactions beyond what's shipped (ShinyButton, Spotlight Card) — Tilt Cards, Marquee, Bento Grid, Blur Text Reveal, Animated Grid/Beam were all discussed during brainstorming and explicitly left open for `/dev`-time choice; none have been picked up.
- README's stale "Status" section (see §1).
- Only one Experience entry (Easset Company Limited, current role). If earlier jobs exist, they aren't in `src/content/experience.ts` yet.

## 3. Decisions already locked (don't re-litigate)

- **Stack:** Next.js 16.2.9 (App Router, Turbopack), React 19.2.4, TypeScript, Tailwind CSS v4, shadcn/ui (Nova preset — Lucide + Geist, Radix-based), Framer Motion, next-themes, zod, Resend. No database. Full rationale: `docs/SA_BLUEPRINT.md` §0.
- **Fonts:** Geist Sans/Mono (via `next/font/google`) + IBM Plex Sans Thai for Thai glyphs — already wired in `src/app/layout.tsx` and `globals.css`. Don't substitute.
- **Design tokens** (colors/spacing/radius) are locked in `docs/UXUI_DESIGN.md` §1 and live as CSS custom properties in `src/app/globals.css` — extend, don't re-pick.
- **Contact scope:** both a form AND direct channel links are shown (user-confirmed, not either/or) — `docs/UXUI_DESIGN.md` §4.
- **No persistence for contact submissions** — Resend send-only, no DB (`docs/SA_BLUEPRINT.md` §3-4).
- **lucide-react dropped GitHub/LinkedIn brand icons** (trademark reasons) — inline replacements live in `src/components/ui/brand-icons.tsx`; reuse that file, don't pull in a new icon dependency for these two.
- **Deployment target: Vercel free tier**, confirmed by the user — constrains nothing about the code (the API route already runs as a standard serverless function), just means `/devops` shouldn't reconsider hosting.

## 4. Gotchas / lessons learned

- **ThemeToggle hydration mismatch (real, reproduced by running the dev server) — commit `804e21a`.** `next-themes`'s `resolvedTheme` resolves on the client's very first render, before hydration completes, differing from the server-rendered value. Fix is next-themes' own documented workaround: a `mounted` state flag set in `useEffect`, rendering a placeholder until true — **do not simplify this away** for `react-hooks/set-state-in-effect` lint-purity reasons; that exact "fix" was tried first and caused the real bug. The inline eslint-disable comment on that line is intentional.
- **Zoom Parallax breaks on mobile if only `prefers-reduced-motion` is guarded — commit `7d6d4a4`.** Desktop-tuned `vw`/`vh` absolute image positions plus a 300vh scroll-jacking track render as broken/overlapping thin strips below 768px (confirmed visually at 375px). Fix: treat mobile as another trigger for the same static-grid fallback already used for reduced-motion (`useMediaQuery("(max-width: 767px)")`) — don't retune desktop positions for mobile, the static fallback is the intended answer per `docs/PRD.md` §5.
- **A prior test run of this very `handoff` skill hallucinated that the resume download button was unimplemented**, despite claiming to have grepped `src/`. It hadn't actually checked `sections/contact.tsx` thoroughly. This session re-verified with a real project-wide grep and confirmed it's wired (§2). Lesson generalized into the skill itself: absence claims now require exhaustive, named verification, not a confident guess.

## 5. Immediate next step

**Single most obvious next action a fresh session can do without asking the user anything:** none of the code needs a code fix right now — the two most impactful next steps both need the user's input, not more coding:
1. **Get real project screenshots + About-section photos.** Five image slots in `about-images.ts`, two in `projects.ts`, all currently placeholders — this is the single most visible gap when someone actually looks at the site.
2. **Set up Resend** (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` in a new `.env.local`) so the contact form can send real email — code needs zero changes for this, just credentials.

If the user wants a next step that's purely code (no new decisions from them), the best candidate is **starting a `/qa` pass on `POST /api/contact`** — its validation/honeypot/rate-limit/Resend-failure branches are the one part of this codebase that's actually worth unit-testing, per `docs/SA_BLUEPRINT.md` §5, and no tests exist yet.

**Explicitly flagged by the user (2026-07-02) as not to be forgotten:** picking up the deferred interactive micro-interactions is still an open want, not a dropped idea. Two parts to this:
1. **The already-scoped candidates** from the original brainstorm (see §2/§3 above): Tilt Cards, Marquee tech-stack strip, Bento Grid for Projects, Blur Text Reveal, Animated Grid/Beam background. None have been picked up yet — ShinyButton and the Spotlight Card (project modal) are the only two shipped so far.
2. **Go back to 21st.dev for fresh ideas, not just the ones already discussed.** The user asked specifically to look at 21st.dev again for additional interactive components/inspiration beyond what was scoped during the original brainstorming session — treat this as an open-ended re-scan, not a closed list. When picking anything up from there, keep `docs/UXUI_DESIGN.md`'s restraint principle in mind (reserve flourish for the 1-2 primary actions per section, don't make every element shiny) and respect `prefers-reduced-motion` for anything scroll-linked or looping, same as Zoom Parallax.

This is a good candidate for the *next* `/dev` session specifically, since the user cares about it and it's independent of the image/Resend blockers above.

## 6. How to verify state

Run these before trusting anything above still holds — uncommitted local edits made after this briefing was written wouldn't show up here:

```bash
git status                # confirm clean tree / no stray local edits
git log --oneline -20     # cross-check this briefing against actual history
npm install               # dependencies per package.json/package-lock.json
npm run lint               # ESLint — clean as of this session
npx tsc --noEmit           # TypeScript — clean as of this session
npm run build              # next build (Turbopack) — clean as of this session
```

Expected `next build` output (as of this session): 3 routes — `/` (static), `/_not-found` (static), `/api/contact` (dynamic) — no errors, no warnings.

To manually re-check the two things most likely to drift:
- **Resume download:** open the running dev server, scroll to Contact, the "Download Resume (PDF)" link should open `/resume.pdf` in a new tab.
- **Contact form:** submitting it locally without `RESEND_API_KEY` set should return an inline "something went wrong" banner (502 `delivery_failed`) — expected/correct behavior given no key is configured, not a bug to fix in code.
