"use client";

// Projects grid — see ProjectCard for the card itself (hover-lift, gradient
// overlay, slide-up "View Details" CTA). Clicking a card opens ProjectModal.
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { useProjectSpotlight } from "@/components/providers/project-spotlight-provider";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { projects, type Project } from "@/content/projects";

export function Projects() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { pendingProjectId, clearPendingProject } = useProjectSpotlight();

  // A Skills card asked to spotlight a project: scroll it into view and open
  // its modal, then clear the request so it doesn't re-fire on re-render.
  useEffect(() => {
    if (!pendingProjectId) return;
    const project = projects.find((p) => p.id === pendingProjectId);
    if (project) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing local selection from an external spotlight request, not derived render state
      setSelected(project);
    }
    clearPendingProject();
  }, [pendingProjectId, clearPendingProject]);

  return (
    <section id="projects" ref={sectionRef} className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-2 text-3xl font-bold">{t("projects.heading")}</h2>
        <p className="mb-10 text-muted-foreground">{t("projects.subtitle")}</p>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </section>
  );
}
