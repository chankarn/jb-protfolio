"use client";

// Hero: greeting, name + role, one-line pitch, primary + secondary CTA, with
// a full-bleed layered wave (HeroBlob) running across the whole section and
// the owner's photo floating in front of it — not split into text/photo
// columns. Photo stacks below the text on narrow viewports. Follows
// docs/superpowers/specs/2026-07-04-hero-blob-redesign-design.md.
//
// Only the inner text wrapper carries min-h-[90vh] (matching the flex/
// items-center pattern); the outer <section> has no height/padding of its
// own, so it doesn't add on top of that 90vh — the wave and photo, both
// absolutely positioned against the section, resolve against that single
// height instead of two stacked ones.
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { HeroBlob } from "@/components/ui/hero-blob";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[160px] md:h-[260px]">
        <HeroBlob className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[90vh] w-full max-w-6xl flex-col justify-center px-6 py-16 md:py-0">
        <div className="max-w-xl">
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

        <Image
          src="/Gemini_Generated_Image_sxf1m4sxf1m4sxf1.png"
          alt="Chanakarn Susinraworn"
          width={1684}
          height={2528}
          priority
          className="relative z-10 mt-10 h-[240px] w-auto self-center object-contain md:absolute md:inset-y-auto md:right-10 md:bottom-0 md:mt-0 md:h-[85%] md:self-auto"
        />
      </div>
    </section>
  );
}
