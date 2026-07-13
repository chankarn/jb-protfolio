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
//
// First-load entrance: text, wave, then photo fade/slide in one after another
// (same fade+slide-up treatment as the Skills bento cards) instead of
// everything appearing at once. Runs once on mount, not on scroll-into-view,
// since the hero is already on screen at first paint.
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { HeroBlob } from "@/components/ui/hero-blob";
// HeroDoodles temporarily disabled (not deleted) — see src/components/ui/hero-doodles.tsx
// import { HeroDoodles } from "@/components/ui/hero-doodles";

export function Hero() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative overflow-hidden">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[160px] md:h-[260px]"
      >
        <HeroBlob className="h-full w-full" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[90vh] w-full max-w-6xl flex-col justify-center px-6 py-16 md:py-0">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-xl"
        >
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
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
          className="relative z-10 mt-10 h-[240px] w-auto self-center md:absolute md:inset-y-auto md:right-10 md:bottom-0 md:mt-0 md:h-[85%] md:self-auto"
        >
          <Image
            src="/aboutME/DSC05559_diecut.png"
            alt="Chanakarn Susinraworn"
            // Intrinsic size kept at the OLD photo's aspect ratio (not this
            // file's real 1501x1948), so the rendered box's size/position
            // (height-constrained, width auto via aspect-ratio) stays
            // identical to before the swap — object-contain then fits this
            // image inside that same box without distorting it.
            width={1684}
            height={2528}
            priority
            className="h-full w-auto object-contain [transform:scaleX(-1)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
