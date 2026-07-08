// Shared tag/pill color-coding so "tool-ish" tech (databases, infra) reads
// consistently across Projects, instead of being a single easy-to-miss badge.
// Tinted background + border (not just a thin border) so the secondary
// accent has enough visual weight next to the page's other accents — see
// docs/UXUI_DESIGN.md §1.
const NEUTRAL_TAG_CLASS = "bg-muted border-border text-foreground";
const SECONDARY_TAG_CLASS =
  "bg-secondary-accent/10 border-secondary-accent/30 text-secondary-accent";

// Tag names treated as "tools" (databases, infra, build tools) wherever they
// appear as a free-form project tag — keep in sync with Skill's "tools" category.
const TOOL_TAG_NAMES = new Set(
  ["mysql", "postgresql", "postgres", "mongodb", "docker", "redis", "git"].map(
    (name) => name.toLowerCase()
  )
);

export function getProjectTagClassName(tag: string): string {
  return TOOL_TAG_NAMES.has(tag.toLowerCase())
    ? SECONDARY_TAG_CLASS
    : NEUTRAL_TAG_CLASS;
}
