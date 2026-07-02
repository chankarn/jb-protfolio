"use client";

// Light/dark toggle — a sliding pill switch adapted from a reference 21st.dev
// component (track + thumb with sun/moon icons, thumb slides between sides).
// Wired to next-themes (the reference left this as a commented-out note) and
// built on top of the same mounted-flag hydration guard as before: resolvedTheme
// resolves on the client's very first render, before hydration completes, so
// both the icon AND the aria-label must stay in a neutral pre-mount state or
// React logs a real hydration mismatch (confirmed by running the dev server).
// Colors use design tokens (bg-muted/bg-background/text-foreground) instead of
// the reference's hardcoded zinc/gray literals, so it adapts through our
// existing light/dark tokens rather than hand-branching classes per mode.
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- documented next-themes workaround, see file header
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        !mounted
          ? "Toggle color mode"
          : isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
      }
      className="relative flex h-8 w-16 shrink-0 items-center rounded-full border border-border bg-muted p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Ghost icons: the icon for whichever mode ISN'T active, faded, sitting
          in the track behind the thumb. */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-1.5">
        <Moon
          className={cn(
            "size-4 text-muted-foreground transition-opacity",
            isDark ? "opacity-0" : "opacity-70"
          )}
          strokeWidth={1.5}
        />
        <Sun
          className={cn(
            "size-4 text-muted-foreground transition-opacity",
            isDark ? "opacity-70" : "opacity-0"
          )}
          strokeWidth={1.5}
        />
      </span>

      {/* Thumb: slides between the left and right side, carries the active icon. */}
      <span
        className={cn(
          "relative flex size-6 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-transform duration-300",
          isDark ? "translate-x-0" : "translate-x-8"
        )}
      >
        {mounted &&
          (isDark ? (
            <Moon className="size-4 text-foreground" strokeWidth={1.5} />
          ) : (
            <Sun className="size-4 text-foreground" strokeWidth={1.5} />
          ))}
      </span>
    </button>
  );
}
