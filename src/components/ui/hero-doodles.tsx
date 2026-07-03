// Scattered decorative doodle blobs across the Hero section — small, irregular
// "wobbly" shapes for visual texture, sparse so they read as accents rather
// than clutter. Mix of outline-only (stroke, doodle-sketch feel) and softly
// filled (low-opacity accent tint) variants, per user request. Purely
// decorative/static: sits at z-0 behind the text/photo/wave so it never
// competes with readability. Colors are design tokens so they flip with
// light/dark automatically.
// Hand-picked uneven radii around a rough circle (not evenly rounded) so
// these read as lumpy, hand-drawn "doodle" blobs rather than plain circles —
// each vertex sits at a very different distance from center, then the path
// rounds through the midpoints between vertices for a lopsided, bumpy outline.
const SHAPES = [
  "M68.5 53.5Q82 42 68 31.5Q54 21 38.5 15Q23 9 22.5 25.5Q22 42 21.5 60Q21 78 38 71.5Q55 65 68.5 53.5Z",
  "M65.5 56.7Q72 42 67.5 23.8Q63 5.6 47 14.25Q31 22.9 18.5 32.45Q6 42 19.5 49.8Q33 57.6 46 64.5Q59 71.4 65.5 56.7Z",
  "M69.5 58.45Q78 42 65 33.35Q52 24.7 37 16.05Q22 7.4 18 24.7Q14 42 22.5 51.55Q31 61.1 46 68Q61 74.9 69.5 58.45Z",
] as const;

interface Doodle {
  top: string;
  left: string;
  size: number;
  rotate: number;
  shape: 0 | 1 | 2;
  variant: "outline" | "fill";
  tone: "primary" | "secondary-accent";
}

// Positions deliberately avoid the text block's bounding area (roughly
// x:6-45%, y:20-78%) — a doodle behind the heading/paragraph peeks through
// the gaps between letters and reads as visual noise, not decoration.
// Positions over the photo/wave are fine since those are opaque and simply
// cover the doodle (z-0, painted first).
const DOODLES: Doodle[] = [
  { top: "8%", left: "6%", size: 56, rotate: -12, shape: 0, variant: "outline", tone: "primary" },
  { top: "12%", left: "90%", size: 60, rotate: 18, shape: 1, variant: "fill", tone: "secondary-accent" },
  { top: "5%", left: "42%", size: 34, rotate: 10, shape: 2, variant: "outline", tone: "primary" },
  { top: "85%", left: "12%", size: 46, rotate: -20, shape: 1, variant: "fill", tone: "primary" },
  { top: "60%", left: "52%", size: 42, rotate: -8, shape: 0, variant: "outline", tone: "secondary-accent" },
  { top: "18%", left: "66%", size: 30, rotate: 25, shape: 2, variant: "fill", tone: "secondary-accent" },
  { top: "15%", left: "24%", size: 26, rotate: 30, shape: 1, variant: "outline", tone: "secondary-accent" },
  { top: "32%", left: "78%", size: 36, rotate: -15, shape: 0, variant: "fill", tone: "primary" },
  { top: "70%", left: "50%", size: 24, rotate: 12, shape: 2, variant: "outline", tone: "primary" },
];

export function HeroDoodles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 hidden md:block"
      aria-hidden="true"
    >
      {DOODLES.map((d, i) => (
        <svg
          key={i}
          viewBox="0 0 84 84"
          width={d.size}
          height={d.size}
          style={{
            position: "absolute",
            top: d.top,
            left: d.left,
            transform: `rotate(${d.rotate}deg)`,
          }}
        >
          <path
            d={SHAPES[d.shape]}
            fill={d.variant === "fill" ? `var(--${d.tone})` : "none"}
            fillOpacity={d.variant === "fill" ? 0.18 : undefined}
            stroke={d.variant === "outline" ? `var(--${d.tone})` : "none"}
            strokeOpacity={d.variant === "outline" ? 0.35 : undefined}
            strokeWidth={d.variant === "outline" ? 2 : undefined}
          />
        </svg>
      ))}
    </div>
  );
}
