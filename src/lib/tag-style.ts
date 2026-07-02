// Shared tag/pill color-coding so the same "tool-ish" tech (databases, infra)
// reads consistently across Skills and Projects, instead of being a single
// easy-to-miss badge in one place. Tinted background + border (not just a
// thin border) so the secondary accent has enough visual weight next to the
// more saturated primary orange — see docs/UXUI_DESIGN.md §1.
export const NEUTRAL_TAG_CLASS = "bg-muted border-border text-foreground";
export const PRIMARY_TAG_CLASS =
  "bg-primary/10 border-primary/30 text-primary";
export const SECONDARY_TAG_CLASS =
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
