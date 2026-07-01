// i18n core: language type, dictionaries, and a dot-path translation helper.
// Lightweight custom setup per docs/SA_BLUEPRINT.md §0 (no next-intl).
import en from "@/i18n/en.json";
import th from "@/i18n/th.json";

export const LANGUAGES = ["en", "th"] as const;
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "en";
export const LANGUAGE_STORAGE_KEY = "portfolio-lang";

type Dictionary = typeof en;

const dictionaries: Record<Language, Dictionary> = { en, th };

/**
 * Resolve a nested dictionary key by dot path, e.g. t("contact.errors.emailInvalid").
 * Falls back to the key itself if a path segment is missing, so a typo is visible
 * rather than crashing the render.
 */
export function translate(lang: Language, key: string): string {
  const segments = key.split(".");
  let node: unknown = dictionaries[lang];
  for (const segment of segments) {
    if (node && typeof node === "object" && segment in node) {
      node = (node as Record<string, unknown>)[segment];
    } else {
      return key;
    }
  }
  return typeof node === "string" ? node : key;
}
