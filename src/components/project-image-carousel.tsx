"use client";

// 3D fanned image carousel for the project modal — a faithful port of the
// 21st.dev "circular testimonials" component the user referenced: the active
// screenshot sits front-and-center at full size, while the previous/next
// screenshots peek out from BEHIND it, sticking up and rotated in 3D
// (translateX ± gap, translateY up, scale 0.85, rotateY ±15deg), all on a
// springy cubic-bezier(.4,2,.3,1) easing. Adapted to our stack: lucide-react
// icons instead of react-icons, our tokens/next-image via PlaceholderImage,
// Tailwind + inline styles instead of styled-jsx. No autoplay — browsing
// project screenshots is a deliberate action, not an ambient rotation.
import { useEffect, useRef, useState } from "react";
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
  const [containerWidth, setContainerWidth] = useState(480);
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.offsetWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  const gap = containerWidth * 0.15;
  const stickUp = gap * 0.4;
  const transition = reduceMotion
    ? "none"
    : "transform 0.8s cubic-bezier(.4,2,.3,1), opacity 0.8s cubic-bezier(.4,2,.3,1)";

  function slideStyle(index: number): React.CSSProperties {
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + count) % count === index;
    const isRight = (activeIndex + 1) % count === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)",
        transition,
      };
    }
    if (isLeft && count > 1) {
      return {
        zIndex: 2,
        opacity: 1,
        transform: `translateX(-${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(15deg)`,
        transition,
      };
    }
    if (isRight && count > 1) {
      return {
        zIndex: 2,
        opacity: 1,
        transform: `translateX(${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(-15deg)`,
        transition,
      };
    }
    return { zIndex: 1, opacity: 0, transition };
  }

  return (
    <div className="space-y-4 pt-6">
      <div
        ref={containerRef}
        className="relative h-52 sm:h-60"
        style={{ perspective: count > 1 ? "1000px" : undefined }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="absolute inset-0 overflow-hidden rounded-2xl shadow-xl"
            style={slideStyle(index)}
            aria-hidden={index !== activeIndex}
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
            className="flex size-10 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="size-5" />
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
            className="flex size-10 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
