// Placeholder image treatment per docs/UXUI_DESIGN.md §1: when a real image `src`
// isn't supplied yet, render a clearly-not-final box (diagonal hatch + low-opacity
// icon) at the correct dimensions so swapping in real images later doesn't reflow.
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  src?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  iconClassName?: string;
}

export function PlaceholderImage({
  src,
  alt,
  className,
  fill = true,
  width,
  height,
  iconClassName,
}: PlaceholderImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "flex items-center justify-center bg-muted",
        "[background-image:repeating-linear-gradient(45deg,color-mix(in_oklch,var(--muted-foreground)_12%,transparent)_0_10px,transparent_10px_20px)]",
        className
      )}
    >
      <ImageIcon
        className={cn("size-8 text-muted-foreground/40", iconClassName)}
        aria-hidden="true"
      />
    </div>
  );
}
