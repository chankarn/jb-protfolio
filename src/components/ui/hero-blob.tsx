// Decorative full-bleed layered wave background for the Hero section. Static
// (no animation). Three stacked wave layers at different phases/heights, back
// to front: secondary-accent (deep indigo) -> lighter accent tint -> full
// accent, giving the gradient/layered look from the reference (an Astralix
// project banner). Colors are design tokens so they flip with light/dark
// automatically — never hardcode hexes here. See
// docs/superpowers/specs/2026-07-04-hero-blob-redesign-design.md.
export function HeroBlob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 300C180 300 180 260 360 260C540 260 540 380 720 380C900 380 900 200 1080 200C1260 200 1260 140 1440 140V500H0V300Z"
        fill="var(--secondary-accent)"
        opacity="0.75"
      />
      <path
        d="M0 370C180 370 180 330 360 330C540 330 540 450 720 450C900 450 900 270 1080 270C1260 270 1260 210 1440 210V500H0V370Z"
        fill="color-mix(in oklch, var(--primary) 55%, white)"
      />
      <path
        d="M0 440C180 440 180 400 360 400C540 400 540 500 720 500C900 500 900 340 1080 340C1260 340 1260 280 1440 280V500H0V440Z"
        fill="var(--primary)"
      />
    </svg>
  );
}
