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
        d="M600 0H180C120 120 260 180 300 260C340 340 180 400 220 500C260 600 460 560 520 660C560 728 600 760 600 800V0Z"
        fill="var(--primary)"
      />
    </svg>
  );
}
