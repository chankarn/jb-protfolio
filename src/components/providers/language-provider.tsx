"use client";

// LanguageProvider: holds current TH/EN language in React context, persists to
// localStorage, and exposes a t() helper. Per docs/SA_BLUEPRINT.md §0.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  LANGUAGES,
  translate,
  type Language,
} from "@/lib/i18n";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value !== null && (LANGUAGES as readonly string[]).includes(value);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE);

  // Read persisted choice on mount; fall back to browser locale, else default.
  // Server renders the default language, so this client-only sync must run
  // post-mount — the canonical SSR-safe hydration pattern the lint rule flags.
  useEffect(() => {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const resolved: Language | null = isLanguage(stored)
      ? stored
      : navigator.language?.toLowerCase().startsWith("th")
        ? "th"
        : null;
    if (resolved && resolved !== DEFAULT_LANGUAGE) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(resolved);
    }
  }, []);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "th" : "en");
  }, [lang, setLang]);

  const t = useCallback((key: string) => translate(lang, key), [lang]);

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t }),
    [lang, setLang, toggleLang, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
