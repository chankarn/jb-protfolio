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
// rounds through the midpoints between vertices for a lopsided, bumpy
// outline. 8 vertices (not 6) with gentler radius swings — 6 points with
// big alternating radii read as a rounded triangle/hexagon rather than an
// organic blob.
const SHAPES = [
  "M71.9 51.9Q82 42 72.6 31.4Q63.2 20.8 52.6 13.4Q42 6 32.8 14.8Q23.6 23.6 11.8 32.8Q0 42 9.7 53.3Q19.4 64.6 30.7 72.3Q42 80 51.9 70.9Q61.8 61.8 71.9 51.9Z",
  "M70.75 54.75Q74 42 72.85 27.15Q71.7 12.3 56.85 13.15Q42 14 28.55 14.55Q15.1 15.1 16.55 28.55Q18 42 15.85 56.15Q13.7 70.3 27.85 71.15Q42 72 54.75 69.75Q67.5 67.5 70.75 54.75Z",
  "M71.3 53.3Q78 42 69.2 32.8Q60.4 23.6 51.2 11.8Q42 0 31.4 10.4Q20.8 20.8 14.4 31.4Q8 42 16.5 50.5Q25 59 33.5 70.5Q42 82 53.3 73.3Q64.6 64.6 71.3 53.3Z",
] as const;

interface Doodle {
  top: string;
  left: string;
  size: number;
  rotate: number;
  shape: 0 | 1 | 2;
  variant: "outline" | "fill";
  tone: "primary" | "secondary-accent";
  /** Duplicates the shape offset behind itself, like a sticker drop-shadow. */
  shadow?: boolean;
}

// Positions deliberately avoid the text block's bounding area (roughly
// x:6-45%, y:20-78%) — a doodle behind the heading/paragraph peeks through
// the gaps between letters and reads as visual noise, not decoration.
// Positions over the photo/wave are fine since those are opaque and simply
// cover the doodle (z-0, painted first).
const DOODLES: Doodle[] = [
  { top: "8%", left: "6%", size: 56, rotate: -12, shape: 0, variant: "outline", tone: "primary", shadow: true },
  { top: "12%", left: "90%", size: 60, rotate: 18, shape: 1, variant: "fill", tone: "secondary-accent" },
  { top: "5%", left: "42%", size: 34, rotate: 10, shape: 2, variant: "outline", tone: "primary" },
  { top: "85%", left: "12%", size: 46, rotate: -20, shape: 1, variant: "fill", tone: "primary", shadow: true },
  { top: "60%", left: "52%", size: 42, rotate: -8, shape: 0, variant: "outline", tone: "secondary-accent" },
  { top: "18%", left: "66%", size: 30, rotate: 25, shape: 2, variant: "fill", tone: "secondary-accent" },
  { top: "15%", left: "24%", size: 26, rotate: 30, shape: 1, variant: "outline", tone: "secondary-accent" },
  { top: "32%", left: "78%", size: 36, rotate: -15, shape: 0, variant: "fill", tone: "primary", shadow: true },
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
          viewBox="-10 -10 104 104"
          width={d.size}
          height={d.size}
          style={{
            position: "absolute",
            top: d.top,
            left: d.left,
            transform: `rotate(${d.rotate}deg)`,
          }}
        >
          {/* Shadow copy: same shape, offset behind, filled a darker tint of
              its own tone (not flat black/gray) so it reads as a deeper
              shade of the same color rather than a muddy neutral smudge. */}
          {d.shadow && (
            <path
              d={SHAPES[d.shape]}
              transform="translate(7 7)"
              fill={`color-mix(in oklch, var(--${d.tone}) 55%, black)`}
              fillOpacity={0.4}
            />
          )}
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
