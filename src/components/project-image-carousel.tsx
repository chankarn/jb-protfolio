"use client";

// 3D layered image carousel for the project modal — adapted from a reference
// "circular testimonials" component the user liked (3 visible slides: left/
// center/right with perspective + rotateY, arrow navigation, keyboard support).
// Rebuilt with our design tokens instead of hardcoded hex colors, lucide-react
// icons instead of react-icons, and Tailwind instead of styled-jsx. No autoplay
// — someone opening a project modal wants to browse screenshots at their own
// pace, not watch them auto-rotate while reading.
//
// Layout note: the left/center/right positions are FIXED containers; only the
// *content* inside each crossfades when activeIndex changes. An earlier version
// gave each image its own travelling position (recompute translateX per index),
// which looks fine for 4+ images but forces one slide to visually sweep all the
// way from the far left to the far right (or vice versa) whenever there are
// exactly 3 images, since every position is always occupied — confirmed janky
// in-browser. Fixed slots + content crossfade avoids that entirely, regardless
// of image count.
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { cn } from "@/lib/utils";

interface ProjectImageCarouselProps {
  images: string[];
  alt: string;
}

export function ProjectImageCarousel({
  images,
  alt,
}: ProjectImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = images.length;

  useEffect(() => {
    if (count <= 1) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + count) % count);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % count);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [count]);

  if (count === 0) return null;

  const prevIndex = (activeIndex - 1 + count) % count;
  const nextIndex = (activeIndex + 1) % count;
  const showSides = count > 1;

  return (
    <div className="space-y-3">
      <div
        className="relative h-56 sm:h-72"
        style={{ perspective: showSides ? "1000px" : undefined }}
      >
        {showSides && (
          <Slot
            slotKey={`prev-${prevIndex}`}
            src={images[prevIndex]}
            alt={`${alt} — screenshot ${prevIndex + 1} of ${count}`}
            className="absolute inset-y-0 left-0 w-[46%]"
            style={{ transform: "translateX(4%) scale(0.85) rotateY(20deg)" }}
            reduceMotion={reduceMotion}
          />
        )}

        <Slot
          slotKey={`active-${activeIndex}`}
          src={images[activeIndex]}
          alt={`${alt} — screenshot ${activeIndex + 1} of ${count}`}
          className={cn(
            "absolute inset-y-0 z-10",
            showSides ? "inset-x-[21%]" : "inset-x-[8%]"
          )}
          reduceMotion={reduceMotion}
        />

        {showSides && (
          <Slot
            slotKey={`next-${nextIndex}`}
            src={images[nextIndex]}
            alt={`${alt} — screenshot ${nextIndex + 1} of ${count}`}
            className="absolute inset-y-0 right-0 w-[46%]"
            style={{ transform: "translateX(-4%) scale(0.85) rotateY(-20deg)" }}
            reduceMotion={reduceMotion}
          />
        )}
      </div>

      {count > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setActiveIndex((i) => (i - 1 + count) % count)}
            aria-label="Previous screenshot"
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to screenshot ${index + 1}`}
                className={cn(
                  "size-1.5 rounded-full transition-colors",
                  index === activeIndex ? "bg-primary" : "bg-border"
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setActiveIndex((i) => (i + 1) % count)}
            aria-label="Next screenshot"
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// A fixed-position slot whose CONTENT crossfades via AnimatePresence when
// `slotKey` changes — the slot itself never moves, so nothing sweeps.
function Slot({
  slotKey,
  src,
  alt,
  className,
  style,
  reduceMotion,
}: {
  slotKey: string;
  src: string;
  alt: string;
  className: string;
  style?: React.CSSProperties;
  reduceMotion: boolean | null;
}) {
  return (
    <div
      className={cn("overflow-hidden rounded-xl shadow-lg", className)}
      style={style}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slotKey}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <PlaceholderImage
            src={src}
            alt={alt}
            className="h-full w-full"
            iconClassName="size-10"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
