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
        d="M600 0H210C300 60 300 180 260 280C220 380 160 380 200 480C240 580 320 560 300 660C280 740 420 760 600 800V0Z"
        fill="var(--primary)"
      />
    </svg>
  );
}
