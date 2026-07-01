# Portfolio Website

Software Engineer portfolio — Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion. See [docs/PRD.md](docs/PRD.md), [docs/SA_BLUEPRINT.md](docs/SA_BLUEPRINT.md), and [docs/UXUI_DESIGN.md](docs/UXUI_DESIGN.md) for the full spec.

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # start dev server
npm run lint     # eslint
npm run build    # production build
npm run start    # run production build
```

## Project Structure

- `src/app/` — routes (App Router)
- `src/components/ui/` — shadcn/ui primitives
- `src/content/` — typed content data (projects, experience, skills, about images) — empty until `/dev` fills them in
- `src/i18n/` — `en.json` / `th.json` UI copy dictionaries — empty until `/dev` fills them in
- `src/lib/` — shared utilities

## Design System

Colors, typography, and component conventions are locked in [docs/UXUI_DESIGN.md](docs/UXUI_DESIGN.md) and wired into `src/app/globals.css` (CSS custom properties) — do not re-pick palette/fonts, extend what's there.

## Status

Repo skeleton only — no feature code yet. Next step: implement sections per `docs/PRD.md` §3 and the clickable reference at `docs/mockups/portfolio-prototype.html`.
