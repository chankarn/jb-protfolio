"use client";

// Hero: greeting, name + role, one-line pitch, primary + secondary CTA, plus
// an accent-colored blob + the owner's photo bleeding off the right edge on
// desktop. Stacks to text-then-photo on narrow viewports. Photo/blob follow
// docs/superpowers/specs/2026-07-04-hero-blob-redesign-design.md.
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { HeroBlob } from "@/components/ui/hero-blob";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center overflow-x-hidden"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-muted-foreground">
            {t("hero.greeting")}
          </p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-6xl">
            Chanakarn Susinraworn —{" "}
            <span className="text-primary">{t("hero.role")}</span>
          </h1>
          <p className="mb-8 max-w-xl text-base text-muted-foreground md:text-lg">
            {t("hero.pitch")}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              className="h-11 rounded-lg px-6 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <a href="#projects">{t("hero.viewWork")}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-lg px-6 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary active:translate-y-0"
            >
              <a href="#contact">{t("hero.contact")}</a>
            </Button>
          </div>
        </div>

        <div className="relative h-[280px] w-full md:h-[520px]">
          <HeroBlob className="absolute inset-0 h-full w-full md:w-[140%] md:translate-x-[15%]" />
          <Image
            src="/Gemini_Generated_Image_sxf1m4sxf1m4sxf1.png"
            alt="Chanakarn Susinraworn"
            width={1684}
            height={2528}
            priority
            className="absolute inset-x-0 bottom-0 mx-auto h-full w-auto object-contain object-bottom md:mx-0 md:right-0 md:left-auto"
          />
        </div>
      </div>
    </section>
  );
}
