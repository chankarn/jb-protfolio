"use client";

// Skills grouped by category (bilingual labels via i18n keys).
import { useLanguage } from "@/components/providers/language-provider";
import { skills, SKILL_CATEGORY_ORDER } from "@/content/skills";

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
                      className="rounded-full border border-border px-3 py-1.5 text-sm"
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
