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
        d="M0 260C180 260 180 420 360 420C540 420 540 460 720 460C900 460 900 420 1080 420C1260 420 1260 300 1440 300V500H0V260Z"
        fill="var(--secondary-accent)"
        opacity="0.7"
      />
      <path
        d="M0 320C180 320 180 400 360 400C540 400 540 240 720 240C900 240 900 400 1080 400C1260 400 1260 260 1440 260V500H0V320Z"
        fill="color-mix(in oklch, var(--primary) 55%, white)"
      />
      <path
        d="M0 320C180 320 180 260 360 260C540 260 540 360 720 360C900 360 900 180 1080 180C1260 180 1260 140 1440 140V500H0V320Z"
        fill="var(--primary)"
      />
    </svg>
  );
}
