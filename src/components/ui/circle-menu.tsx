"use client";

// CircleMenu: a trigger button that fans its items out along a circular arc
// on a spring, adapted from a 21st.dev-style "circle-menu" reference. Changes
// from the original demo:
// - Items call `onClick` (internal state, e.g. cross-section navigation)
//   instead of always being `<a href>` nav links — our uses don't navigate.
// - `radius`/`arc`/`startAngle` are configurable and decoupled from the
//   wrapper's own footprint (the wrapper is sized to just the trigger, not a
//   full containerSize x containerSize box) — items reach past the wrapper
//   via transform, which isn't clipped, so embedding this inline (a card
//   corner, a list row) doesn't reserve a large empty box in the layout the
//   way the original's fixed-size widget did.
// - Colors use our card/primary tokens instead of the reference's raw
//   foreground/muted. Respects prefers-reduced-motion by skipping the spring
//   stagger and the closing "shake" flourish, and closes on outside
//   click/Escape (the reference only closed via re-clicking the trigger).
// - Each item shows its label in a tooltip that appears to that item's own
//   right (not below it) on hover — since items fan out along the arc at
//   different heights, a tooltip anchored below an item can drift under a
//   neighboring item; anchoring to the item's own side avoids that.
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGGER = { open: 0.03, close: 0.05 };

function pointOnArc(
  i: number,
  n: number,
  r: number,
  arcDegrees: number,
  startAngleDegrees: number
) {
  const arc = (arcDegrees * Math.PI) / 180;
  const start = (startAngleDegrees * Math.PI) / 180;
  const isFullCircle = arcDegrees >= 360;
  const theta =
    n <= 1
      ? start + (isFullCircle ? 0 : arc / 2)
      : start + (arc / (isFullCircle ? n : n - 1)) * i;
  return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
}

export interface CircleMenuItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function CircleMenuItemButton({
  item,
  index,
  totalItems,
  isOpen,
  radius,
  itemSize,
  arc,
  startAngle,
  reduceMotion,
  onSelect,
}: {
  item: CircleMenuItem;
  index: number;
  totalItems: number;
  isOpen: boolean;
  radius: number;
  itemSize: number;
  arc: number;
  startAngle: number;
  reduceMotion: boolean;
  onSelect: () => void;
}) {
  const { x, y } = pointOnArc(index, totalItems, radius, arc, startAngle);
  const [hovering, setHovering] = useState(false);

  return (
    <motion.button
      type="button"
      animate={{ x: isOpen ? x : 0, y: isOpen ? y : 0 }}
      whileHover={reduceMotion ? undefined : { scale: 1.1 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              delay: isOpen ? index * STAGGER.open : index * STAGGER.close,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }
      }
      style={{
        height: itemSize,
        width: itemSize,
        marginTop: -itemSize / 2,
        marginLeft: -itemSize / 2,
      }}
      className="absolute top-1/2 left-1/2 flex cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-primary/50"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      onClick={() => {
        item.onClick();
        onSelect();
      }}
      aria-label={item.label}
    >
      {item.icon}
      {hovering && isOpen && (
        <span className="pointer-events-none absolute top-1/2 left-full z-20 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-sm">
          {item.label}
        </span>
      )}
    </motion.button>
  );
}

export function CircleMenu({
  items,
  triggerLabel,
  openIcon,
  closeIcon,
  itemSize = 32,
  radius = 64,
  arc = 360,
  startAngle = -90,
  className,
}: {
  items: CircleMenuItem[];
  triggerLabel: string;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  itemSize?: number;
  radius?: number;
  arc?: number;
  startAngle?: number;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const shake = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handlePointerDown(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  async function close() {
    setIsOpen(false);
    if (reduceMotion) return;
    shake.start({
      x: [0, 2, -2, 0],
      transition: { duration: 0.2, ease: "linear" },
    });
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-flex", className)}
      style={{ height: itemSize, width: itemSize }}
    >
      <motion.button
        type="button"
        animate={shake}
        style={{ height: itemSize, width: itemSize }}
        className={cn(
          "relative z-10 flex cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:brightness-110",
          isOpen && "ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
        )}
        aria-label={triggerLabel}
        aria-expanded={isOpen}
        onClick={() => (isOpen ? close() : setIsOpen(true))}
      >
        <AnimatePresence mode="popLayout">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            >
              {closeIcon ?? <X size={14} />}
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            >
              {openIcon ?? <Menu size={14} />}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {items.map((item, index) => (
        <CircleMenuItemButton
          key={item.label}
          item={item}
          index={index}
          totalItems={items.length}
          isOpen={isOpen}
          radius={radius}
          itemSize={itemSize}
          arc={arc}
          startAngle={startAngle}
          reduceMotion={reduceMotion}
          onSelect={() => setIsOpen(false)}
        />
      ))}
    </div>
  );
}
