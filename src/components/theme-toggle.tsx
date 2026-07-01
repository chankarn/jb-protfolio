"use client";

// Light/dark toggle backed by next-themes. `resolvedTheme` is already resolved
// on the client's very first render (next-themes reads it synchronously before
// React hydrates), which differs from the server's render — hence the `mounted`
// flag: this is next-themes' own documented hydration-mismatch workaround, not
// an arbitrary effect. See https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- documented next-themes workaround, see file header
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="size-11"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {!mounted ? (
        <span className="size-5" />
      ) : isDark ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  );
}
