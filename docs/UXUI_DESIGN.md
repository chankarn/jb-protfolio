# Portfolio Website — UX/UI Design System

**Source:** [docs/PRD.md](PRD.md), [docs/SA_BLUEPRINT.md](SA_BLUEPRINT.md), [docs/superpowers/specs/2026-07-02-portfolio-website-design.md](superpowers/specs/2026-07-02-portfolio-website-design.md)

## 1. Design System Summary

### Typography

| Role | Font | Notes |
|---|---|---|
| English UI + body | **Geist Sans** | via `next/font/google` or `geist` package — first-class Next.js support |
| English mono accent | **Geist Mono** | tags, badges, nav mark, code-ish labels — leans into the developer identity |
| Thai UI + body | **IBM Plex Sans Thai** | loaded alongside Geist Sans; same weight steps (400/500/600/700) so TH/EN feel like one system, not a bolted-on translation |

Font stack (Tailwind `fontFamily` tokens):
```js
fontFamily: {
  sans: ['var(--font-geist-sans)', 'var(--font-ibm-plex-thai)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-geist-mono)', 'monospace'],
}
```
The Thai font loads only its weights actually used (400/500/600/700) to keep payload down — no need for the full IBM Plex Thai family.

### Color Tokens

| Token | Light mode | Dark mode | Usage |
|---|---|---|---|
| `background` | `#F9F8F4` | `#262624` | page background |
| `foreground` | `#30302E` | `#F2F0EB` | primary text |
| `muted-foreground` | `#6B6A66` | `#A8A6A0` | secondary text (subtitles, captions) |
| `border` | `#E5E2D9` | `#3A3937` | card/section borders, dividers |
| `accent` | `#D97757` | `#E08661` | CTAs, links, active states, focus rings — slightly brighter in dark mode to hold contrast against the darker background |
| `accent-foreground` | `#FFFFFF` | `#1A1918` | text/icons placed *on* an accent-colored surface (e.g. filled button label) |

Semantic states reuse the accent + neutral system rather than introducing new brand colors, since a portfolio doesn't need a full product-style semantic palette:

| Semantic | Color | Usage |
|---|---|---|
| `success` | `#4C9A6A` (both modes) | contact form success confirmation |
| `error` | `#D95757` (both modes) | contact form validation/delivery errors |

**Contrast note for `/qa`:** `accent` (`#D97757` / `#E08661`) is used for text/icons in some contexts (links, active nav state), not just decorative fills — verify WCAG AA (4.5:1 for body text, 3:1 for large text/icons) against both `background` values before shipping. If a check fails, the fix is a slightly darkened/brightened accent variant for text-on-background use only (fills can stay as-is since large filled buttons only need 3:1).

### Spacing & Layout

Tailwind's default 4px base scale is used as-is (`1` = 4px … `96` = 384px) — no custom scale needed. Section-level rhythm:

| Token | Value | Usage |
|---|---|---|
| `section-y` | `py-24` (mobile: `py-16`) | vertical padding between major sections (Hero, About, Projects, …) |
| `container` | `max-w-6xl mx-auto px-6` | consistent content width/gutter across all sections |
| `card-radius` | `rounded-2xl` | Projects cards, Skill tags, form inputs |
| `card-gap` | `gap-6` | grid gaps (Projects grid, Bento grid if used) |

### Iconography

**lucide-react** — already a natural pairing with shadcn/ui, tree-shakeable, covers everything needed (nav, social links, form icons, arrow/CTA icons). No separate icon set required.

### Imagery Placeholder Treatment

Real photos (About/Zoom Parallax, Project screenshots) aren't ready yet (per PRD §5 and §4). Until they are:
- Use a flat `muted`/`border`-colored rounded rectangle at the image's exact final aspect ratio, with a centered `lucide-react` `ImageIcon` at low opacity — visually obvious as "not final" so nobody mistakes it for finished content, and it holds the correct layout dimensions so swapping in real images later doesn't reflow anything.
- Do **not** use realistic stock photography as placeholders in the actual build (fine for the earlier brainstorming demos, wrong for the real site) — it risks looking "finished" and shipping by accident.

## 2. Component Notes (shadcn/ui base + custom variants)

All components build on shadcn/ui primitives (`Button`, `Card`, `Input`, `Textarea`, `Badge`, `Switch`) styled with the tokens above. Two custom pieces beyond stock shadcn:

### `ThemeToggle` (light/dark)
Wraps `next-themes`' `useTheme()`; renders a `lucide-react` `Sun`/`Moon` icon button that swaps on click. No custom visual system beyond token colors above.

### `LanguageToggle` (TH/EN)
Two-letter text toggle (`TH` / `EN`) styled as a shadcn `Button` `variant="ghost"` pair or a segmented control — reads/writes the `LanguageProvider` context described in `SA_BLUEPRINT.md` §0.

### `ShinyButton` (CTA — the one confirmed extra flourish beyond Zoom Parallax worth speccing now, since it's the primary conversion action)
A `Button` wrapped in a `1px` conic-gradient border (`accent` → light accent tint → `accent`) that animates `rotate` continuously — same visual as demoed during brainstorming. Used for the Hero's primary CTA and the Contact form's submit button; **not** used for every button on the page (reserve it for the 1-2 primary actions per section, per Fitts's/Miller's-law-driven restraint — if every button shines, none of them do).

```tsx
// components/ui/shiny-button.tsx
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ShinyButton({ className, children, ...props }: ButtonProps) {
  return (
    <div className="relative inline-block rounded-lg p-[1.5px] overflow-hidden">
      <span
        className="absolute inset-[-1000%] animate-[spin_2.5s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 90deg, var(--accent), color-mix(in srgb, var(--accent) 40%, white), var(--accent))",
        }}
        aria-hidden="true"
      />
      <Button
        className={cn(
          "relative bg-background text-foreground hover:bg-background/90",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
}
```

### Everything else (Tilt Cards, Spotlight Card, Marquee, Bento Grid, Blur Text Reveal, Animated Grid/Beam Background)
Intentionally **not** speced with production code here — per the PRD/Blueprint, final selection among these happens at `/dev` time. Documenting all of them now would lock decisions the user explicitly wants to make hands-on during implementation. `/dev` should treat the brainstorming demos (already committed under `.superpowers/brainstorm/…`, informal but preserved) as the visual reference if/when it picks any of them up.

## 3. System States

| State | Where | Treatment |
|---|---|---|
| **Loading (image)** | Project screenshots, About images | Use `next/image` `placeholder="blur"` with a low-res blur-up, or the flat placeholder box (§1) pre-launch |
| **Loading (contact form submit)** | Contact form | Submit button shows a `lucide-react` `Loader2` spin icon + disables itself; no full-page loading state needed since this is a single small async action |
| **Empty (fewer than 2 approved projects)** | Projects section | Out of scope per PRD §5 — the design assumes 2–4 approved projects exist by launch; no empty-state UI is designed for this |
| **Error (contact form validation)** | Contact form, per field | Inline red (`error` token) text under the offending field + red border ring on the input, matching the API's `fields` error map from `SA_BLUEPRINT.md` §3 |
| **Error (contact form delivery failure)** | Contact form, form-level | Inline banner above the submit button ("Something went wrong — try again"), form values preserved, retry re-enables the button |
| **Success (contact form)** | Contact form | Form content swaps to a confirmation message (checkmark icon + "Thanks, I'll get back to you") — inline, not a route change, per PRD §3.8 |
| **Reduced motion** | Zoom Parallax + any `/dev`-added motion | All of the above still render normally; only the *motion* is swapped for a simple fade or static state, per PRD §5/§6 — this is a global concern (`useReducedMotion()`), not per-component design |

## 4. Section-by-Section Layout Notes

| Section | Layout | Responsive notes |
|---|---|---|
| **Hero** | Full-viewport-height, centered content, name + role + one-line pitch + `ShinyButton` CTA | Stack remains centered at all breakpoints; font scales down via Tailwind's `text-4xl md:text-6xl` pattern |
| **About** | Zoom Parallax image set (per `SA_BLUEPRINT.md` §2 `AboutImage[]`) + accompanying bilingual copy | On mobile, the scroll-jacking zoom effect should shorten/simplify (per PRD §5) rather than run the full desktop-length scroll track |
| **Projects** | Grid (2 columns desktop, 1 column mobile) of Project cards — exact grid vs. bento treatment decided at `/dev` | Each card: image, title, tags (`Badge`), links (`liveUrl`/`repoUrl` as icon links) |
| **Skills** | Wrapped tag/badge grid, optionally grouped by `category` | Wraps naturally at all widths — no special mobile handling needed |
| **Experience** | Vertical timeline (left-aligned line + dot per entry on desktop, simplified stacked cards on mobile) | Mobile: drop the connecting line if it adds visual noise at narrow widths |
| **Contact** | Two-column desktop (form left, direct channel links right), stacked on mobile (form first, then channel links) | Per the user's confirmed scope: both the form *and* direct channel links appear, not one or the other |
| **Footer** | Direct channel links (repeated from Contact for reachability from anywhere) + copyright | Single row desktop, stacked mobile |

## 5. Open Items Carried Forward

- Final selection of extra micro-interactions (Tilt Cards / Spotlight Card / Marquee / Bento Grid / Blur Text Reveal / Animated Grid Beam) — decide at `/dev`.
- Real imagery for About/Zoom Parallax and Project screenshots — placeholders (§1) until supplied.
- WCAG AA contrast verification on the accent color in text/icon contexts — flagged for `/qa`.
