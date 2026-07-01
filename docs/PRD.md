# Portfolio Website — Product Requirements Document

**Source:** [docs/superpowers/specs/2026-07-02-portfolio-website-design.md](superpowers/specs/2026-07-02-portfolio-website-design.md)

## 1. Feature Overview & KPIs

**Problem.** The owner (a Software Engineer, currently employed) needs an online presence that helps them get their next job — somewhere a recruiter or hiring manager can quickly answer "who is this person, what have they built, are they worth a call."

**Value.** A single, shareable link (in a resume, LinkedIn, or email signature) that does the pitching automatically: shows real projects, skills, experience, and a way to make contact — with enough visual polish to itself function as a demonstration of frontend craft.

**Target platform.** Responsive web (desktop, tablet, mobile). No native app.

**Success metrics (KPIs)** — directional, not instrumented in v1 unless analytics is added later:
- Visitor completes a "contact" action (form submit, email click, or resume download) — the site's one meaningful conversion.
- Time-to-first-impression: Hero renders and is interactive (mode toggle, language toggle) within performance budget (see §6).
- No functional/visual regressions across the two languages and two color modes — a recruiter should see a finished product in every combination.

## 2. Target Platforms & User Roles

**Platform:** Responsive web app, single deployable site, no backend authentication.

**User roles (single actor — no auth, no accounts):**

| Role | Can do |
|---|---|
| **Visitor** (recruiter, hiring manager, peer) | Browse all sections, switch language (TH/EN), switch color mode (light/dark), open project links, download resume, submit the contact form |
| **Owner** (site content, via source/CMS-less content files — not a runtime role) | Updates content (projects, experience, skills, resume file, translations) by editing source data, not through an in-app admin panel — no CMS/admin UI is in scope for v1 |

There is no logged-in state, no multi-tenancy, no role-based permissions beyond the above.

## 3. User Stories & Functional Workflows

### 3.1 Landing / Hero
- As a visitor, when I open the site, I see a Hero with the owner's name, role, a one-line pitch, and a primary CTA ("View Work") that scrolls/navigates to Projects.
- The Hero is the first paint — it must not wait on below-the-fold assets (images used later in About/Projects load lazily).

### 3.2 Language toggle (TH/EN)
- A visible toggle (e.g., in the nav) switches all site copy between Thai and English.
- The selection persists across navigation within the same session (e.g., `localStorage`), so scrolling or reloading doesn't silently revert it.
- Default language: browser locale if it matches TH, else English.

### 3.3 Light/Dark mode toggle
- A visible toggle switches the palette:
  - Light: background `#F9F8F4`, text `#30302E`
  - Dark: background `#262624`, text near-white
  - Accent (both modes): `#D97757`
- Default: respect the OS-level `prefers-color-scheme`; user's explicit choice overrides and persists (`localStorage`).

### 3.4 About (Zoom Parallax)
- As a visitor, when I scroll into the About section, a set of images scale up progressively in sync with scroll position (zoom parallax), then settle into the normal document flow as About's text content is reached.
- Content: personal story/background copy (bilingual) + the zoom parallax image set (owner supplies final images later — see §4 placeholders).
- **Motion-sensitivity:** if the visitor's OS has `prefers-reduced-motion` enabled, the zoom parallax must degrade to a static image (or a simple fade), not force the scroll-jacking animation.

### 3.5 Projects
- As a visitor, I see 2–4 real projects, each showing: title, short description, tech tags, screenshot/preview image, and links (live demo and/or repo, whichever exists).
- Clicking a project's live/demo link opens it in a new tab (visitor doesn't lose their place on the portfolio).
- One project may be work built at the owner's current employer. It is only published once the owner has confirmed (a) it's a public-facing, already-launched product, and (b) no confidential architecture, client data, or undisclosed metrics are shown, and (c) it doesn't conflict with their employment contract/NDA. Until that confirmation, this entry stays out of the content set (not shown as "coming soon" — simply absent).
- Specific micro-interactions applied to the Projects grid (e.g., bento layout, tilt-on-hover, spotlight cards) are decided at `/dev` time, not fixed here — see §6 "Deferred UI decisions."

### 3.6 Skills / Tech Stack
- As a visitor, I see a list/grid of the owner's skills and technologies, grouped (e.g., Languages, Frameworks, Tools) or shown as a flat tag set — final grouping is a content/design decision, not a functional one.

### 3.7 Experience Timeline
- As a visitor, I see a chronological list of the owner's work history: company, role/title, start–end dates (or "Present"), and a short description of responsibilities/impact per role.

### 3.8 Contact
- As a visitor, I can reach the owner via:
  - A contact form (name, email, message) that sends the message to the owner (delivery mechanism — e.g., transactional email API vs. form backend service — is a `/sa` decision, not fixed here).
  - Direct channel links (email `mailto:`, LinkedIn, GitHub, etc.).
- On submit: client-side validation runs first (see §5); on success, the visitor sees a confirmation state (inline message, not a separate page) and the form resets; on failure, an inline error explains what to fix or retry.

### 3.9 Resume/CV download
- As a visitor, I can download the owner's resume via a button (opens/downloads a PDF in a new tab or triggers a file download — either is acceptable; `/dev` picks based on UX polish).

## 4. Data Dictionary & UI Elements

### Project (repeatable, 2–4 items)
| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | |
| `description` | string (short) | Yes | Bilingual (TH/EN) |
| `tags` | string[] | Yes | Tech stack used |
| `image` | image asset | Yes | Screenshot/preview; placeholder until owner supplies real ones |
| `liveUrl` | URL | No | At least one of `liveUrl`/`repoUrl` should be present |
| `repoUrl` | URL | No | |
| `confidentialityChecked` | boolean (content-authoring flag, not user-facing) | Yes for current-employer project only | Gate before that entry is included in the published content set |

### Experience entry (repeatable)
| Field | Type | Required |
|---|---|---|
| `company` | string | Yes |
| `role` | string | Yes |
| `startDate` / `endDate` | date / "Present" | Yes |
| `description` | string (bilingual) | Yes |

### Skill
| Field | Type | Required |
|---|---|---|
| `name` | string | Yes |
| `category` | string | No (optional grouping) |

### Contact form submission
| Field | Type | Required | Validation |
|---|---|---|---|
| `name` | string | Yes | non-empty |
| `email` | string | Yes | valid email format |
| `message` | string | Yes | non-empty, reasonable max length (e.g., 2000 chars) |

### About / Zoom Parallax images
| Field | Type | Required | Notes |
|---|---|---|---|
| `images[]` | image assets (up to ~7, per the referenced component's design) | Yes (placeholders until finalized) | Exact subjects TBD (owner's photos, work moments, or a mix) — deferred per source design doc |

### Global UI elements
- Nav bar: logo/name, section links, language toggle, light/dark toggle.
- Footer: contact channel links, copyright.

## 5. Edge Cases & Exception Handling

| Scenario | Expected behavior |
|---|---|
| Visitor has JavaScript disabled | Content (text, images, links, resume download) must still be readable/usable; only motion/interactive flourishes may be absent. No hard dependency on JS for core content. |
| Very small viewport (mobile) | All sections reflow responsively; Zoom Parallax simplifies to a lighter/shorter effect or a static fallback if the full scroll-jacking effect is janky on touch devices. |
| `prefers-reduced-motion` enabled | Zoom Parallax and any other scroll-linked/looping animations (marquee, beams, etc.) are disabled or reduced to a simple fade — accessibility takes priority over the visual flourish. |
| Contact form: empty required field | Inline validation error under the specific field; submit button does not send the request. |
| Contact form: invalid email format | Inline validation error; submit blocked. |
| Contact form: network/service failure on submit | Inline error message with a retry option; the visitor's typed content is not lost. |
| Project link is broken/unreachable | Out of the site's control (external link) — no special handling beyond opening in a new tab; content owner is responsible for keeping links current. |
| Resume file missing/fails to load | Download button should not silently no-op — show a visible error state (this is a content/deploy misconfiguration, but the UI should surface it rather than fail silently). |
| Language toggled mid-scroll | Section the visitor is currently viewing stays in view after copy swaps (no jarring scroll-position jump). |
| No projects meet the confidentiality gate yet (edge case: fewer than 2 approved projects) | Out of scope to design a full empty state for this — the PRD assumes 2–4 approved projects exist before launch; if that's not true at launch time, that's a content-readiness blocker, not a UI edge case. |
| Images not yet finalized (About/Zoom Parallax, Project screenshots) | Use clearly-a-placeholder assets during development so nobody mistakes them for final content; swapped before launch. |

## 6. Compliance & Non-Functional Requirements

**Privacy / PDPA-EU-GDPR-adjacent:**
- The contact form collects name, email, and message — personal data. Include a brief, plain-language note near the form (e.g., "Your info is only used to reply to you, never shared") rather than a full legal privacy policy, given the site's small scope and single-purpose data use.
- No third-party trackers/analytics are assumed by default; if analytics is added later, it should be disclosed similarly.

**Accessibility:**
- Both palettes (light and dark) must meet WCAG AA contrast for text against their backgrounds, including the orange accent (`#D97757`) where used for text/icons, not just decoration.
- `prefers-reduced-motion` must be respected everywhere motion is used (see §5).
- Keyboard navigability for the language toggle, mode toggle, project links, and contact form (no mouse-only interactions).

**Performance:**
- Hero must render without waiting on below-the-fold image assets (lazy-load images used later in the page, especially the Zoom Parallax set, which references multiple images per the source design).
- Target a "good" Core Web Vitals / Lighthouse performance score — this is a portfolio for a Software Engineer, so a slow or janky site undermines the pitch itself.

**SEO / shareability:**
- Meta tags (title, description) and Open Graph tags so the link previews well when shared on LinkedIn, Slack, etc. — relevant since the site's main distribution channel is being shared as a link.

**Deferred UI decisions (intentional — not gaps):**
- The exact set of additional micro-interactions beyond the confirmed Zoom Parallax (candidates: tilt cards, shiny/gradient border buttons, marquee tech-stack strip, bento grid for Projects, blur text reveal, animated grid/beam background, cursor spotlight, magnetic buttons) is decided during `/dev`, per the source design doc.
- Contact form's delivery mechanism (e.g., transactional email API vs. hosted form backend) is a `/sa` decision.
- Deployment target/domain is out of scope for this PRD — belongs to `/devops`.

**Tech stack signal (not locked here):** Next.js + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion, surfaced during brainstorming. `/sa` should confirm or revise this against the requirements above before locking it into `SA_BLUEPRINT.md`.
