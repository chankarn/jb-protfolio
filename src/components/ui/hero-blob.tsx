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
        d="M0 340C120 340 120 380 240 380C360 380 360 360 480 360C600 360 600 240 720 240C840 240 840 340 960 340C1080 340 1080 280 1200 280C1320 280 1320 170 1440 170V500H0V340Z"
        fill="color-mix(in oklch, var(--secondary-accent) 45%, white)"
      />
      <path
        d="M0 300C120 300 120 360 240 360C360 360 360 260 480 260C600 260 600 340 720 340C840 340 840 300 960 300C1080 300 1080 220 1200 220C1320 220 1320 220 1440 220V500H0V300Z"
        fill="color-mix(in oklch, var(--primary) 55%, white)"
      />
      <path
        d="M0 320C120 320 120 420 240 420C360 420 360 280 480 280C600 280 600 380 720 380C840 380 840 220 960 220C1080 220 1080 300 1200 300C1320 300 1320 160 1440 160V500H0V320Z"
        fill="var(--primary)"
      />
    </svg>
  );
}
