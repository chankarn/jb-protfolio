// Decorative organic blob shape behind the Hero photo. Static (no animation);
// fill is the accent token so it flips between light/dark automatically —
// never hardcode the hex here. Wave undulates left-to-right (landscape
// viewBox, wider than tall) per user request, rather than the original
// top-to-bottom wave. See docs/superpowers/specs/2026-07-04-hero-blob-redesign-design.md.
export function HeroBlob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 500V220C150 140 300 260 500 200C700 140 850 260 1000 180V500Z"
        fill="var(--primary)"
      />
    </svg>
  );
}
