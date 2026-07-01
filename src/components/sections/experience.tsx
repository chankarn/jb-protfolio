"use client";

// Experience timeline: vertical line + dot per role, bilingual role/description.
import { useLanguage } from "@/components/providers/language-provider";
import { experience } from "@/content/experience";

export function Experience() {
  const { t, lang } = useLanguage();

  return (
    <section id="experience" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-3xl font-bold">{t("experience.heading")}</h2>

        <div className="max-w-2xl space-y-8">
          {experience.map((entry) => (
            <div
              key={entry.id}
              className="relative border-l-2 border-border pl-6"
            >
              <span className="absolute -left-[7px] top-1 size-3 rounded-full bg-primary" />
              <p className="mb-1 font-mono text-xs text-muted-foreground">
                {entry.startDate} —{" "}
                {entry.endDate === "present"
                  ? t("experience.present")
                  : entry.endDate}
              </p>
              <h3 className="font-bold">
                {entry.company} ·{" "}
                {lang === "th" ? entry.role_th : entry.role_en}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {lang === "th"
                  ? entry.description_th
                  : entry.description_en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
