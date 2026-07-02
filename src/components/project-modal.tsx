"use client";

// Project detail modal. Built on shadcn/Radix Dialog (accessible for free:
// focus trap, Escape, click-outside, aria roles) with fade/zoom entrance from
// tw-animate-css. The image area is a 3D layered screenshot carousel
// (see ProjectImageCarousel) — replaces the old single-image spotlight now
// that each project has 2-4 screenshots to browse.
import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GithubIcon } from "@/components/ui/brand-icons";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ProjectImageCarousel } from "@/components/project-image-carousel";
import { useLanguage } from "@/components/providers/language-provider";
import type { Project } from "@/content/projects";
import { getProjectTagClassName } from "@/lib/tag-style";
import { cn } from "@/lib/utils";

export function ProjectModal({
  project,
  onOpenChange,
}: {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { t, lang } = useLanguage();

  return (
    <Dialog open={!!project} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg sm:max-w-xl">
        {project && (
          <>
            <ProjectImageCarousel images={project.images} alt={project.title} />
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {project.title}
              </DialogTitle>
            </DialogHeader>

            <p className="text-sm text-muted-foreground">
              {lang === "th" ? project.description_th : project.description_en}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "rounded-md border px-2 py-1 font-mono text-xs",
                    getProjectTagClassName(tag)
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>

            {(project.liveUrl || project.repoUrl) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {project.liveUrl && (
                  <ShinyButton asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <ExternalLink className="size-4" />
                      {t("projects.live")}
                    </a>
                  </ShinyButton>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-5 text-sm font-semibold transition-colors hover:border-primary"
                  >
                    <GithubIcon className="size-4" />
                    {t("projects.code")}
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
