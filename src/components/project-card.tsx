"use client";

// ProjectCard: hover-lift card with a gradient-overlaid image and a CTA button
// that slides up from the bottom on hover, adapted from a reference "menu card"
// component the user liked (bottom slide-up Add button, image gradient, spring
// entrance) — same interaction pattern, portfolio content. Respects
// prefers-reduced-motion by dropping the hover-lift/entrance motion (this is a
// discrete hover/view transition, not a looping or scroll-jacking effect, so it
// doesn't need the same mobile fallback treatment as Zoom Parallax).
import { motion, useReducedMotion } from "framer-motion";
import { Eye, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { useLanguage } from "@/components/providers/language-provider";
import { getProjectTagClassName } from "@/lib/tag-style";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";

export function ProjectCard({
  project,
  onOpenDetails,
}: {
  project: Project;
  onOpenDetails: () => void;
}) {
  const { t, lang } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.35 }}
      className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/50"
    >
      <div className="relative h-56 overflow-hidden">
        <PlaceholderImage
          src={project.images[0]}
          alt={`${project.title} preview`}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          iconClassName="size-10"
        />
        <div className="absolute inset-x-0 bottom-3 flex justify-center">
          <motion.button
            type="button"
            onClick={onOpenDetails}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            aria-label={`${t("projects.viewDetails")}: ${project.title}`}
            className="inline-flex translate-y-3 cursor-pointer items-center gap-2 rounded-lg border border-border/60 bg-background/80 px-5 py-2 text-sm font-semibold opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:opacity-100 focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Eye className="size-4" />
            {t("projects.viewDetails")}
          </motion.button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-1 text-lg font-bold">
          <button
            type="button"
            onClick={onOpenDetails}
            className="cursor-pointer text-left hover:text-primary"
          >
            {project.title}
          </button>
        </h3>
        <p className="mb-3 truncate text-sm text-muted-foreground">
          {lang === "th" ? project.description_th : project.description_en}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
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
        <div className="flex gap-4 text-sm font-medium">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <ExternalLink className="size-4" />
              {t("projects.live")}
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:underline"
            >
              <GithubIcon className="size-4" />
              {t("projects.code")}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
