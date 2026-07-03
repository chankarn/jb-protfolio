"use client";

// TH/EN language toggle — sliding pill switch, same track/thumb treatment as
// ThemeToggle (see theme-toggle.tsx) so the two toggles read as one system:
// ghost labels sit in the track behind the thumb, the thumb slides between
// the two sides and carries the active language's label. Fixed white/black
// overlay tones (not bg-muted/bg-background tokens) since it sits on the
// navbar's solid accent bar, not the page background — see theme-toggle.tsx.
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  const isTh = lang === "th";

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={isTh ? "Switch to English" : "Switch to Thai"}
      className="relative flex h-8 w-16 shrink-0 items-center rounded-full border border-white/30 bg-black/15 p-1 font-mono text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
    >
      {/* Ghost labels: whichever language ISN'T active, faded, behind the thumb. */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
        <span
          className={cn(
            "text-white/70 transition-opacity",
            isTh ? "opacity-100" : "opacity-0"
          )}
        >
          EN
        </span>
        <span
          className={cn(
            "text-white/70 transition-opacity",
            isTh ? "opacity-0" : "opacity-100"
          )}
        >
          TH
        </span>
      </span>

      {/* Thumb: slides between the left and right side, carries the active label. */}
      <span
        className={cn(
          "relative flex size-6 items-center justify-center rounded-full bg-white text-zinc-800 shadow-sm transition-transform duration-300",
          isTh ? "translate-x-8" : "translate-x-0"
        )}
      >
        {isTh ? "TH" : "EN"}
      </span>
    </button>
  );
}
