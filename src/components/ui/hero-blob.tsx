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
        d="M0 340C240 290 480 390 720 350C960 310 1200 380 1440 330V500H0V340Z"
        fill="var(--secondary-accent)"
        opacity="0.55"
      />
      <path
        d="M0 300C220 250 460 330 720 300C980 270 1220 330 1440 290V500H0V300Z"
        fill="color-mix(in oklch, var(--primary) 55%, white)"
      />
      <path
        d="M0 260C260 220 480 280 720 260C960 240 1200 290 1440 250V500H0V260Z"
        fill="var(--primary)"
      />
    </svg>
  );
}
