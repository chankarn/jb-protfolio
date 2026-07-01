"use client";

// Hero: greeting, name + role, one-line pitch, primary (ShinyButton) + secondary CTA.
import { useLanguage } from "@/components/providers/language-provider";
import { ShinyButton } from "@/components/ui/shiny-button";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="flex min-h-[90vh] items-center">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <p className="mb-4 font-mono text-sm uppercase tracking-widest text-muted-foreground">
          {t("hero.greeting")}
        </p>
        <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-6xl">
          James B. —{" "}
          <span className="text-primary">{t("hero.role")}</span>
        </h1>
        <p className="mb-8 max-w-xl text-base text-muted-foreground md:text-lg">
          {t("hero.pitch")}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <ShinyButton asChild>
            <a href="#projects">{t("hero.viewWork")}</a>
          </ShinyButton>
          <a
            href="#contact"
            className="inline-flex h-11 items-center rounded-lg border border-border px-6 text-sm font-semibold transition-colors hover:border-primary"
          >
            {t("hero.contact")}
          </a>
        </div>
      </div>
    </section>
  );
}
