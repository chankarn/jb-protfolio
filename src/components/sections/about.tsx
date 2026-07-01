"use client";

// About + Zoom Parallax. Images scale up with scroll progress (framer-motion
// useScroll/useTransform), modeled on the 21st.dev component the user referenced.
// Respects prefers-reduced-motion: falls back to a static grid, no scroll-jacking.
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { aboutImages, type AboutImage } from "@/content/about-images";

function AboutCopy() {
  const { t } = useLanguage();
  return (
    <div className="pointer-events-none mx-auto max-w-lg rounded-2xl bg-background/90 px-8 py-6 text-center backdrop-blur">
      <h2 className="mb-3 text-2xl font-bold">{t("about.heading")}</h2>
      <p className="text-sm text-muted-foreground md:text-base">
        {t("about.body")}
      </p>
      <p className="mt-4 font-mono text-xs text-muted-foreground">
        [ {t("about.placeholderNote")} ]
      </p>
    </div>
  );
}

function ZoomImage({
  image,
  progress,
}: {
  image: AboutImage;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(progress, [0, 1], [1, image.scaleTarget]);
  return (
    <motion.div style={{ scale }} className="absolute inset-0">
      <div
        className="absolute overflow-hidden rounded-xl shadow-2xl"
        style={{
          top: image.position.top,
          left: image.position.left,
          width: image.position.width,
          height: image.position.height,
          transform: "translate(-50%, -50%)",
        }}
      >
        <PlaceholderImage src={image.src} alt={image.alt} className="h-full w-full" />
      </div>
    </motion.div>
  );
}

export function About() {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Reduced-motion fallback: a static section, no scroll track, no scaling.
  if (reduceMotion) {
    return (
      <section id="about" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <AboutCopy />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {aboutImages.map((image, i) => (
              <PlaceholderImage
                key={i}
                src={image.src}
                alt={image.alt}
                className="aspect-[4/3] rounded-xl"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about">
      <div ref={container} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="relative mx-auto h-full w-full max-w-6xl">
            {aboutImages.map((image, i) => (
              <ZoomImage key={i} image={image} progress={scrollYProgress} />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <AboutCopy />
          </div>
        </div>
      </div>
    </section>
  );
}
