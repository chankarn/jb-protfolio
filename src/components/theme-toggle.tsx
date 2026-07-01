"use client";

// Light/dark toggle backed by next-themes. `resolvedTheme` is undefined until
// mounted, which we use to render a stable placeholder and avoid a hydration
// mismatch on the icon — no extra mount state needed.
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="size-11"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {resolvedTheme === undefined ? (
        <span className="size-5" />
      ) : isDark ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  );
}
