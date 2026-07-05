"use client";

// 3D fanned image carousel for the project modal — a port of the 21st.dev
// "circular testimonials" component: the active screenshot sits front-and-
// center, the previous/next peek out from behind it, sticking up and rotated
// in 3D (translateX ± gap, translateY up, scale 0.85, rotateY ±15deg) on a
// springy cubic-bezier(.4,2,.3,1) easing.
//
// The stage (outer box) has a FIXED height. Each image card is sized to its
// OWN aspect ratio and contained within that stage — so a portrait phone
// screenshot renders as a tall, narrow card and a landscape one as a wide,
// short card, and they simply stack/fan over each other (never cropped into a
// shared frame). Because a card's size depends only on its image (not on which
// slide is active), switching slides animates transform/opacity only — no
// layout change, so nothing below the carousel shifts and it stays smooth.
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
  // Measured pixel size of the stage. Height is CSS-fixed (see the h-* classes
  // below) so it only changes on breakpoint/resize, never during navigation.
  const [stage, setStage] = useState({ w: 480, h: 288 });
  // Natural width/height ratio per image, filled in as each one loads, so each
  // card can be sized to match its screenshot's real shape.
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  function handleImageLoad(
    index: number,
    e: React.SyntheticEvent<HTMLImageElement>
  ) {
    const img = e.currentTarget;
    if (img.naturalWidth && img.naturalHeight) {
      setRatios((prev) => ({
        ...prev,
        [index]: img.naturalWidth / img.naturalHeight,
      }));
    }
  }

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      setStage((prev) => (prev.w !== w || prev.h !== h ? { w, h } : prev));
    };
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

  const gap = stage.w * 0.15;
  const stickUp = gap * 0.4;
  const transition = reduceMotion
    ? "none"
    : "transform 0.8s cubic-bezier(.4,2,.3,1), opacity 0.8s cubic-bezier(.4,2,.3,1)";

  // Fit each image to its own aspect ratio, contained within the fixed stage:
  // fill the width, but if that would be taller than the stage (portrait),
  // fall back to filling the height so it stays inside — giving a tall narrow
  // card. Default 16:9 until the image reports its real dimensions.
  function cardSize(index: number) {
    const aspect = ratios[index] ?? 16 / 9;
    let w = stage.w;
    let h = w / aspect;
    if (h > stage.h) {
      h = stage.h;
      w = h * aspect;
    }
    return { width: Math.round(w), height: Math.round(h) };
  }

  // Cards are positioned at the stage center (left/top 50%) and re-centered via
  // translate(-50%,-50%); the fan offsets are appended after that.
  function slideStyle(index: number): React.CSSProperties {
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + count) % count === index;
    const isRight = (activeIndex + 1) % count === index;
    const base = "translate(-50%, -50%)";

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        transform: `${base} scale(1) rotateY(0deg)`,
        transition,
      };
    }
    if (isLeft && count > 1) {
      return {
        zIndex: 2,
        opacity: 1,
        transform: `${base} translateX(-${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(15deg)`,
        transition,
      };
    }
    if (isRight && count > 1) {
      return {
        zIndex: 2,
        opacity: 1,
        transform: `${base} translateX(${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(-15deg)`,
        transition,
      };
    }
    return { zIndex: 1, opacity: 0, transform: base, transition };
  }

  return (
    <div className="space-y-4 pt-6">
      <div
        ref={containerRef}
        className="relative h-72 sm:h-[22rem]"
        style={{ perspective: count > 1 ? "1000px" : undefined }}
      >
        {images.map((src, index) => {
          const { width, height } = cardSize(index);
          return (
            <div
              key={index}
              className="absolute left-1/2 top-1/2 overflow-hidden rounded-2xl shadow-xl [backface-visibility:hidden] [will-change:transform]"
              style={{ width, height, ...slideStyle(index) }}
              aria-hidden={index !== activeIndex}
            >
              <PlaceholderImage
                src={src}
                alt={`${alt} — screenshot ${index + 1} of ${count}`}
                className="h-full w-full"
                iconClassName="size-10"
                onLoad={(e) => handleImageLoad(index, e)}
              />
            </div>
          );
        })}
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
