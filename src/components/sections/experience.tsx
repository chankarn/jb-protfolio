"use client";

// Experience timeline: vertical line + dot per role, bilingual role/description.
// The line is ONE continuous element spanning the whole list (not one per
// entry) — per-entry borders left visible gaps at each space-y-8 seam.
// Entries fade/slide in on scroll, staggered by index (same treatment as the
// Skills bento cards). Where an entry produced a project shown in Projects
// (Project.experienceId), a CircleMenu trigger fans the linked project(s) out
// — picking one asks ProjectSpotlightProvider to scroll to Projects and open
// its modal. The trigger sits at the entry's middle-right edge (not inline
// below the text) so the fan opens into the open space to the right instead
// of over the entry's own description — text gets a right-side gutter (pr-14)
// reserved so it never collides with the trigger itself. Each fanned item is
// an icon-only circle; hovering shows its title in a tooltip anchored to
// that item's own right side.
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { useProjectSpotlight } from "@/components/providers/project-spotlight-provider";
import { CircleMenu } from "@/components/ui/circle-menu";
import { experience } from "@/content/experience";
import { getProjectsForExperience } from "@/lib/experience-projects";

export function Experience() {
  const { t, lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const { requestProject } = useProjectSpotlight();

  return (
    <section id="experience" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-3xl font-bold">{t("experience.heading")}</h2>

        <div className="relative max-w-2xl space-y-8">
          <div className="absolute inset-y-1 left-0 w-0.5 bg-border" />
          {experience.map((entry, i) => {
            const linkedProjects = getProjectsForExperience(entry.id);
            return (
              <motion.div
                key={entry.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.1 }}
                className={`relative pl-6 ${linkedProjects.length > 0 ? "pr-14" : ""}`}
              >
                <span className="absolute -left-[7px] top-1 size-3 rounded-full bg-primary" />
                <p className="mb-1 font-mono text-xs text-muted-foreground">
                  {entry.endDate === entry.startDate
                    ? entry.startDate
                    : `${entry.startDate} — ${
                        entry.endDate === "present"
                          ? t("experience.present")
                          : entry.endDate
                      }`}
                </p>
                <h3 className="font-bold">
                  {entry.company} ·{" "}
                  {lang === "th" ? entry.role_th : entry.role_en}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {lang === "th" ? entry.description_th : entry.description_en}
                </p>
                {linkedProjects.length > 0 && (
                  <CircleMenu
                    className="absolute top-1/2 right-0 -translate-y-1/2"
                    triggerLabel={t("experience.viewProjects")}
                    arc={180}
                    startAngle={-90}
                    radius={56}
                    itemSize={28}
                    items={linkedProjects.map((project) => ({
                      label: project.title,
                      icon: <ArrowUpRight size={14} />,
                      onClick: () => requestProject(project.id),
                    }))}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
