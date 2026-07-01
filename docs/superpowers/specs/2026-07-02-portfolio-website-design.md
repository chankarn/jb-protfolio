# Portfolio Website — Design

## Purpose

A personal portfolio website whose primary goal is job hunting: showing recruiters and hiring managers who the owner (a Software Engineer) is, what they've built, and how to contact them.

## Audience & Language

Both Thai and international companies are in scope. The site supports two languages (Thai/English) with a toggle switch — no separate content strategy per audience beyond translation.

## Content Sections

In order, top to bottom:

1. **Hero** — short intro (name, role, one-line pitch) with a primary CTA (e.g., "View Work").
2. **About** — personal story/background. Uses a **Zoom Parallax** scroll effect (images scale up as the user scrolls through this section). Images TBD — likely a mix of personal/work photos; placeholders until real images are chosen.
3. **Projects** — 2–4 real projects with live demo/repo links. May include a project built at the owner's current company, published and public-facing; before publishing that entry, confirm it doesn't expose confidential source, internal architecture, client data, or undisclosed metrics, and that it doesn't conflict with the employment contract/NDA.
4. **Skills / Tech Stack**
5. **Work Experience Timeline**
6. **Contact** — contact form or direct channels (email, LinkedIn, GitHub, etc.)
7. **Resume/CV** — downloadable file

No blog/articles section.

## Visual Design System

- **Palette** — inspired by Claude's brand colors:
  - Light mode: background `#F9F8F4` (off-white), text `#30302E` (ink)
  - Dark mode: background `#262624` (charcoal), text near-white
  - Accent (both modes): `#D97757` (Claude orange)
- **Mode toggle** — user-switchable light/dark mode.
- **Overall feel** — a lively, playful landing page, not a static resume page. Motion and micro-interactions are a deliberate part of the identity, not decoration bolted on afterward.
- **Reference vibe** — component style similar to 21st.dev's catalog (shiny/gradient-border buttons, spotlight cards, bento grid layouts, marquee strips, blur-text reveals, animated grid/beam backgrounds). None of these are locked yet — see Open Items.

## Interactive / Motion

- **Confirmed:** Zoom Parallax effect in the About section (scroll-linked image scaling, modeled after a Framer Motion `useScroll`/`useTransform` component the user referenced from 21st.dev).
- **Deferred to `/dev`:** which additional micro-interactions to add (candidates already scoped during brainstorming: tilt cards, shiny/gradient border buttons, marquee tech-stack strip, bento grid for projects, blur text reveal, animated grid/beam background, cursor spotlight, magnetic buttons). The user wants to try/adjust these hands-on during implementation rather than lock them now.

## Tech Stack Signal (not locked)

While pasting a reference component, the user surfaced a concrete stack preference: **Next.js + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion**. This is a strong signal but not a final decision — `/sa` (technical blueprint stage) should confirm it against the PRD before it's locked into `SA_BLUEPRINT.md`.

## Open Items (deliberately deferred)

- Real images for the About/Zoom Parallax section (placeholders until then).
- Final list of micro-interactions beyond Zoom Parallax (decide during `/dev`).
- Confidentiality check on the current-employer project before it's published.
- Deployment target/domain (not discussed — out of scope for this design pass; belongs to `/devops`).

## Next Steps

Hand off to `/kickoff`'s pipeline:
1. `/ba` — turn this design into a formal PRD (`docs/PRD.md`).
2. `/sa` — technical blueprint (`docs/SA_BLUEPRINT.md`), confirming or revising the tech stack signal above.
3. Design direction stage — since the palette, vibe, and even specific components (21st.dev-style) are already decided here, `/uxui` should treat this document as the locked direction and focus on documenting it into `docs/UXUI_DESIGN.md`, not re-picking colors/style.
4. `/proto` — clickable prototype.
