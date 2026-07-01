"use client";

// TH/EN language toggle. Segmented control reading/writing the LanguageProvider.
import { useLanguage } from "@/components/providers/language-provider";
import { LANGUAGES, type Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex h-11 items-center rounded-lg border border-border p-0.5 font-mono text-sm"
    >
      {LANGUAGES.map((option: Language) => {
        const active = lang === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => setLang(option)}
            className={cn(
              "min-w-9 rounded-md px-2 py-1.5 uppercase transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
