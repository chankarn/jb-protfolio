# Hero Section Redesign — Accent Blob + Photo

**Source:** conversational brainstorming (2026-07-04), reference mockup `public/Gemini_Generated_Image_sxf1m4sxf1m4sxf1.png` was supplied as the owner's real cutout photo (not the design reference — the design reference was a separate attached image of a "Susana / UI & UX Designer" template).

## 1. Problem / Motivation

The current Hero (`src/components/sections/hero.tsx`) is plain centered text with no imagery — the owner felt it "isn't interesting" and asked to adapt the layout/shape idea from a reference portfolio template (dark bg, curvy accent-colored blob shape behind a portrait photo) using our own color tokens and the owner's own photo.

## 2. Scope

Touches only:
- `src/components/sections/hero.tsx` (layout restructure)
- One new blob-shape component (SVG), e.g. `src/components/ui/hero-blob.tsx`
- Uses the existing photo already placed at `public/Gemini_Generated_Image_sxf1m4sxf1m4sxf1.png` (a transparent PNG cutout)

No other section, the navbar, or button styling (already redone in prior work) changes.

## 3. Design Decisions (locked from brainstorming)

| Decision | Answer |
|---|---|
| Photo | Use the real cutout photo already in `public/`, not a placeholder |
| Theme behavior | Hero background/text follow the existing `bg-background`/`text-foreground` tokens and flip with the light/dark toggle, same as every other section — NOT fixed-dark like the reference |
| Blob color | Always the accent token (`var(--primary)`), in both light and dark mode |
| Blob shape | A single custom SVG organic blob path (closest visual match to the reference), not a CSS border-radius approximation |
| Mobile/narrow viewports | Stack: text block first (full width, centered, current treatment), blob+photo below at a smaller scale |

## 4. Layout

**Desktop (`md:` and up):** two-column split within the Hero section:
- **Left column** (~55% width): existing text stack — `HELLO, I'M` greeting, name + role heading, pitch paragraph, `View Work` (solid) + `Contact` (outline) buttons. Vertically centered. Keeps the existing `i18n` keys (`hero.greeting`, `hero.role`, `hero.pitch`, `hero.viewWork`, `hero.contact`) — no copy changes.
- **Right column**: full-bleed area (breaks out of the page's `max-w-6xl mx-auto` container just for this decorative graphic, so the blob can touch the right edge of the viewport). Contains:
  - The SVG blob, absolutely positioned, filled `var(--primary)`, sized to fill the section's height and bleed past the right edge.
  - The photo (`next/image`, `priority` since it's above the fold), layered on top of the blob, bottom-anchored, slightly larger than the blob so it visually "sits in front of" the shape like the reference.

**Mobile (below `md:`):** single column —
1. Text block, full width, same centered/left-aligned treatment as today.
2. Blob + photo below, at a reduced scale, centered, shorter height than the desktop version (avoid the blob dominating the viewport on narrow screens).

## 5. Technical Notes

- Blob SVG: a single `<path>` with a hand-picked organic curve (visually similar to the reference's wave-like shape), `fill="var(--primary)"`, no stroke. Rendered via a small dedicated component (`HeroBlob`) so the path data doesn't clutter `hero.tsx`.
- Photo: `next/image` with `fill` or explicit `width`/`height` matching the source PNG's aspect ratio (1684×2528), `priority` (it's part of the first paint), no lazy loading (contradicts nothing in PRD §6 since it's the Hero itself, which is explicitly exempted from the lazy-load rule — only *below-the-fold* images must lazy-load).
- No motion/animation on the blob or photo — it's a static decorative shape, not a scroll-linked effect, so `prefers-reduced-motion` doesn't apply here (nothing animates).
- `overflow-x-hidden` needed on the Hero section (or a wrapping element) since the blob intentionally bleeds past the right edge — must not introduce a horizontal scrollbar on the page.
- Existing button styling (solid `View Work`, outline `Contact`) carries over unchanged.

## 6. Out of Scope

- Any other section's layout or imagery.
- Changing the photo asset itself (cropping/color grading) — used as supplied.
- Adding motion/parallax to the blob (reference doesn't have it either).
