"use client";

// Projects grid. Each card: placeholder image, title, bilingual description,
// tech tags, and live/code links (repoUrl is optional — some cards omit it).
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { useLanguage } from "@/components/providers/language-provider";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { projects } from "@/content/projects";

export function Projects() {
  const { t, lang } = useLanguage();

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-2 text-3xl font-bold">{t("projects.heading")}</h2>
        <p className="mb-10 text-muted-foreground">{t("projects.subtitle")}</p>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-border"
            >
              <div className="relative h-44">
                <PlaceholderImage
                  src={project.imageSrc}
                  alt={`${project.title} preview`}
                  className="h-full w-full"
                  iconClassName="size-10"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-lg font-bold">{project.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {lang === "th"
                    ? project.description_th
                    : project.description_en}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border px-2 py-1 font-mono text-xs"
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
