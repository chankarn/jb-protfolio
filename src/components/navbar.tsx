"use client";

// Sticky top nav: brand mark, section anchors (desktop), language + theme toggles.
import { useLanguage } from "@/components/providers/language-provider";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";

const SECTIONS = ["about", "projects", "skills", "experience", "contact"] as const;

export function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#hero" className="font-mono text-lg font-bold">
          CS<span className="text-primary">.</span>
        </a>

        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {SECTIONS.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {t(`nav.${section}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
