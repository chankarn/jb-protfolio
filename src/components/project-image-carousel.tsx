"use client";

// 3D layered image carousel for the project modal — adapted from a reference
// "circular testimonials" component the user liked (3 visible slides: left/
// center/right with perspective + rotateY, arrow navigation, keyboard support).
// Rebuilt with our design tokens instead of hardcoded hex colors, lucide-react
// icons instead of react-icons (already the icon set used everywhere else in
// this app), and Tailwind classes instead of styled-jsx (not used elsewhere in
// this codebase). No autoplay — unlike a testimonial strip, someone opening a
// project modal wants to browse screenshots at their own pace, not watch them
// auto-rotate while reading.
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
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

  function slideStyle(index: number): React.CSSProperties {
    const offset = (index - activeIndex + count) % count;
    const isActive = offset === 0;
    const isPrev = offset === count - 1;
    const isNext = offset === 1;
    const transition = reduceMotion ? "none" : "all 0.5s cubic-bezier(.4,2,.3,1)";

    if (isActive) {
      return { zIndex: 3, opacity: 1, transform: "translateX(0) scale(1) rotateY(0deg)", transition };
    }
    if (isPrev && count > 1) {
      return { zIndex: 2, opacity: count > 2 ? 1 : 0, pointerEvents: "none", transform: "translateX(-55%) scale(0.85) rotateY(20deg)", transition };
    }
    if (isNext && count > 1) {
      return { zIndex: 2, opacity: count > 2 ? 1 : 0, pointerEvents: "none", transform: "translateX(55%) scale(0.85) rotateY(-20deg)", transition };
    }
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition };
  }

  return (
    <div className="space-y-3">
      <div
        className="relative h-56 sm:h-72"
        style={{ perspective: count > 1 ? "1000px" : undefined }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="absolute inset-x-[8%] inset-y-0 overflow-hidden rounded-xl shadow-lg"
            style={slideStyle(index)}
          >
            <PlaceholderImage
              src={src}
              alt={`${alt} — screenshot ${index + 1} of ${count}`}
              className="h-full w-full"
              iconClassName="size-10"
            />
          </div>
        ))}
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
