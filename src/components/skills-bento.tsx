"use client";

// Skills bento grid — a card per skill with its brand logo (Simple Icons CDN),
// name, and category, adapted from a reference "MY TOOLKIT" bento layout the
// user liked. Colors use our card/border tokens instead of the reference's
// pure-black cards, so it fits the rest of the site instead of looking like a
// pasted-in foreign palette. Icons load from cdn.simpleicons.org (verified
// each slug resolves before wiring them in) rather than bundling an icon
// package, per the user's "grab them from the internet" ask.
// Filtered by an AnimatedTabs bar (all/languages/frameworks/tools) so a
// 19-skill grid doesn't have to default to a "wall of cards" — "All" is the
// default view but per-category tabs stay one click away.
// Card hover (lift + border highlight + icon scale) mirrors ProjectCard's
// treatment (src/components/project-card.tsx) so both grids feel consistent.
// Clicking a card opens a popover listing which showcased projects use that
// skill; clicking a project there asks ProjectSpotlightProvider to scroll to
// Projects and open that project's modal.
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { useProjectSpotlight } from "@/components/providers/project-spotlight-provider";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { skills, SKILL_CATEGORY_ORDER, type Skill } from "@/content/skills";
import { SKILL_ICON_SLUGS } from "@/lib/skill-icons";
import { getProjectsForSkill } from "@/lib/skill-projects";

type CategoryFilter = "all" | Skill["category"];

export function SkillsBento() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const { requestProject } = useProjectSpotlight();
  const [category, setCategory] = useState<CategoryFilter>("all");

  const tabs = [
    { label: t("skills.all"), value: "all" },
    ...SKILL_CATEGORY_ORDER.map((c) => ({
      label: t(`skills.categories.${c}`),
      value: c,
    })),
  ];

  const items =
    category === "all"
      ? skills
      : skills.filter((s) => s.category === category);

  return (
    <div className="space-y-6">
      <AnimatedTabs
        tabs={tabs}
        value={category}
        onValueChange={(v) => setCategory(v as CategoryFilter)}
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((skill, i) => {
          const slug = SKILL_ICON_SLUGS[skill.name];
          const relatedProjects = getProjectsForSkill(skill.name);

          return (
            <Popover key={skill.name}>
              <PopoverTrigger asChild>
                <motion.button
                  type="button"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.3,
                    delay: reduceMotion ? 0 : i * 0.03,
                  }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-4 py-6 text-center transition-colors hover:border-primary/50"
                >
                  {slug && (
                    // eslint-disable-next-line @next/next/no-img-element -- tiny external SVG icon, not a page asset worth next/image's pipeline
                    <img
                      src={`https://cdn.simpleicons.org/${slug}`}
                      alt=""
                      aria-hidden="true"
                      className="size-8 transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                  <div>
                    <p className="text-sm font-bold tracking-wide uppercase">
                      {skill.name}
                    </p>
                    <p className="mt-0.5 text-xs uppercase tracking-wide text-muted-foreground">
                      {t(`skills.categories.${skill.category}`)}
                    </p>
                  </div>
                </motion.button>
              </PopoverTrigger>
              <PopoverContent>
                <p className="mb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {t("skills.usedIn")}
                </p>
                {relatedProjects.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {relatedProjects.map((project) => (
                      <PopoverClose key={project.id} asChild>
                        <button
                          type="button"
                          onClick={() => requestProject(project.id)}
                          className="rounded-lg px-2 py-1.5 text-left text-sm font-medium transition-colors hover:bg-accent hover:text-primary"
                        >
                          {project.title}
                        </button>
                      </PopoverClose>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {t("skills.notUsedYet")}
                  </p>
                )}
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
    </div>
  );
}
