"use client";

// Sticky top nav: brand mark, section anchors (desktop), language + theme
// toggles. Below md, the section links were `hidden` with no replacement —
// a real mobile navigation gap (confirmed via computed style: display:none,
// no hamburger) — so a mobile menu toggle now shows the same links in a
// dropdown panel, closing on link tap or outside click.
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";

const SECTIONS = ["about", "projects", "skills", "experience", "contact"] as const;

export function Navbar() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 bg-primary shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#hero" className="font-mono text-lg font-bold text-white">
          CS<span className="text-white/70">.</span>
        </a>

        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {SECTIONS.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="text-white/80 transition-colors hover:text-white"
            >
              {t(`nav.${section}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="ml-1 flex size-9 cursor-pointer items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-6 py-3 text-sm font-medium md:hidden">
          {SECTIONS.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-2 py-2.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {t(`nav.${section}`)}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
