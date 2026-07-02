"use client";

// Skills grouped by category (bilingual labels via i18n keys). Each category
// gets a distinct accent so the section isn't a wall of identical gray pills —
// Languages stays neutral, Frameworks uses the primary accent, Tools uses the
// secondary accent (deep indigo, docs/UXUI_DESIGN.md §1). Tinted background +
// border, not just a thin border, so low-population categories (Tools is one
// tag) still read clearly as colored next to the more saturated orange tags.
import { useLanguage } from "@/components/providers/language-provider";
import { skills, SKILL_CATEGORY_ORDER, type Skill } from "@/content/skills";
import {
  NEUTRAL_TAG_CLASS,
  PRIMARY_TAG_CLASS,
  SECONDARY_TAG_CLASS,
} from "@/lib/tag-style";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<Skill["category"], string> = {
  languages: NEUTRAL_TAG_CLASS,
  frameworks: PRIMARY_TAG_CLASS,
  tools: SECONDARY_TAG_CLASS,
};

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-3xl font-bold">{t("skills.heading")}</h2>

        <div className="space-y-6">
          {SKILL_CATEGORY_ORDER.map((category) => {
            const items = skills.filter((s) => s.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <p className="mb-2 font-mono text-sm uppercase tracking-wide text-muted-foreground">
                  {t(`skills.categories.${category}`)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill.name}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm",
                        CATEGORY_STYLES[category]
                      )}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
