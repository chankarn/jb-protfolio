"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { SkillsBento } from "@/components/skills-bento";

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-3xl font-bold">{t("skills.heading")}</h2>
        <SkillsBento />
      </div>
    </section>
  );
}
