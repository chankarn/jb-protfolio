"use client";

// SSR-safe media query hook: starts at `false` on both server and client's
// first render (so no hydration mismatch), then syncs to the real value via
// matchMedia post-mount and on subsequent changes.
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from matchMedia, the standard pattern for this hook
    setMatches(mql.matches);

    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
