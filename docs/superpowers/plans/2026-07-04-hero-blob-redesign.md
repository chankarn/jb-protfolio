# Hero Blob + Photo Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the plain centered-text Hero with a two-column layout: text on the left, an accent-colored SVG blob + the owner's real cutout photo bleeding off the right edge, following the design in `docs/superpowers/specs/2026-07-04-hero-blob-redesign-design.md`.

**Architecture:** One new presentational component (`HeroBlob`, a static SVG) plus a restructure of `src/components/sections/hero.tsx` into a responsive two-column grid. No new state, no new dependencies, no API/data changes — this is purely layout + one new image asset that already exists in `public/`.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS v4, `next/image`. No test runner exists in this repo (confirmed: no test files, no test script in `package.json`) — verification for this purely-visual change is `tsc --noEmit`, `eslint`, and a manual check in the running dev server (light mode, dark mode, mobile width), matching how prior UI changes in this project have been verified.

## Global Constraints

- Blob fill color must be `var(--primary)` (the accent token) — never a hardcoded hex — so it automatically flips between light (`#D97757`) and dark (`#E08661`) accent values.
- Hero's own background/text must keep using `bg-background`/`text-foreground` tokens (not fixed-dark) — it must still flip with the existing light/dark toggle.
- No copy changes: reuse existing i18n keys `hero.greeting`, `hero.role`, `hero.pitch`, `hero.viewWork`, `hero.contact` from `src/i18n/en.json` / `src/i18n/th.json` verbatim.
- The blob is decorative and static — no animation, no `useReducedMotion()` needed (nothing moves).
- The section must not introduce a horizontal scrollbar despite the blob bleeding past the right edge (needs `overflow-x-hidden` scoping).
- Existing button styling (`View Work` solid-fill, `Contact` outline) carries over unchanged — do not re-introduce `ShinyButton` here.
- Photo asset: `public/Gemini_Generated_Image_sxf1m4sxf1m4sxf1.png` (1684×2528 px, transparent PNG cutout) — used as-is, no re-cropping.

---

### Task 1: `HeroBlob` SVG component

**Files:**
- Create: `src/components/ui/hero-blob.tsx`

**Interfaces:**
- Produces: `HeroBlob({ className }: { className?: string }): JSX.Element` — a standalone `<svg>` component. `className` is passed through to the root `<svg>` element so the consumer (Task 2) controls sizing/positioning via Tailwind classes.

- [ ] **Step 1: Create the component file**

```tsx
// src/components/ui/hero-blob.tsx
// Decorative organic blob shape behind the Hero photo. Static (no animation);
// fill is the accent token so it flips between light/dark automatically —
// never hardcode the hex here. See docs/superpowers/specs/2026-07-04-hero-blob-redesign-design.md.
export function HeroBlob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M600 0H180C120 120 260 180 300 260C340 340 180 400 220 500C260 600 460 560 520 660C560 728 600 760 600 800V0Z"
        fill="var(--primary)"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/hero-blob.tsx
git commit -m "feat: add HeroBlob decorative SVG shape"
```

---

### Task 2: Restructure Hero into two-column blob+photo layout

**Files:**
- Modify: `src/components/sections/hero.tsx` (full rewrite of the JSX body; imports/i18n keys stay the same as documented in Global Constraints)

**Interfaces:**
- Consumes: `HeroBlob` from `src/components/ui/hero-blob.tsx` (Task 1); `Button` from `src/components/ui/button.tsx` (already used); `useLanguage()` from `src/components/providers/language-provider.tsx` (already used); `next/image`.

- [ ] **Step 1: Rewrite `hero.tsx`**

```tsx
"use client";

// Hero: greeting, name + role, one-line pitch, primary + secondary CTA, plus
// an accent-colored blob + the owner's photo bleeding off the right edge on
// desktop. Stacks to text-then-photo on narrow viewports. Photo/blob follow
// docs/superpowers/specs/2026-07-04-hero-blob-redesign-design.md.
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { HeroBlob } from "@/components/ui/hero-blob";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center overflow-x-hidden"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-muted-foreground">
            {t("hero.greeting")}
          </p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-6xl">
            Chanakarn Susinraworn —{" "}
            <span className="text-primary">{t("hero.role")}</span>
          </h1>
          <p className="mb-8 max-w-xl text-base text-muted-foreground md:text-lg">
            {t("hero.pitch")}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              className="h-11 rounded-lg px-6 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <a href="#projects">{t("hero.viewWork")}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-lg px-6 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary active:translate-y-0"
            >
              <a href="#contact">{t("hero.contact")}</a>
            </Button>
          </div>
        </div>

        <div className="relative h-[280px] md:h-[520px] md:justify-self-end">
          <HeroBlob className="absolute inset-0 h-full w-full md:w-[140%] md:translate-x-[15%]" />
          <Image
            src="/Gemini_Generated_Image_sxf1m4sxf1m4sxf1.png"
            alt="Chanakarn Susinraworn"
            width={1684}
            height={2528}
            priority
            className="absolute inset-x-0 bottom-0 mx-auto h-full w-auto object-contain object-bottom md:mx-0 md:right-0 md:left-auto"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual visual verification in the running dev server**

The dev server should already be running on port 3005 (`npm run dev -- -p 3005`); if not, start it.

Check, in a browser at `http://localhost:3005`:
1. Light mode: blob renders in the light accent orange (`#D97757`), photo overlaps it, no horizontal scrollbar appears (check by trying to scroll right / inspecting `document.documentElement.scrollWidth` vs `window.innerWidth` in devtools).
2. Toggle to dark mode: blob switches to the dark accent orange (`#E08661`) automatically (no code branch needed — confirms `var(--primary)` is doing the flip).
3. Resize to a mobile width (~375px): layout stacks — text block on top, blob+photo below at reduced height, still no horizontal scrollbar.
4. Toggle language (EN/TH): text swaps as before; layout doesn't break.

Expected: all four checks pass visually.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/hero.tsx
git commit -m "feat: redesign Hero with accent blob + photo layout"
```
