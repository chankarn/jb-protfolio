// Simple Icons CDN slugs (https://cdn.simpleicons.org/<slug>) per skill name —
// verified live (image load check) before wiring in; "css3" 404s, "css" works.
export const SKILL_ICON_SLUGS: Record<string, string> = {
  TypeScript: "typescript",
  JavaScript: "javascript",
  Java: "openjdk",
  Python: "python",
  "C/C++": "cplusplus",
  HTML: "html5",
  CSS: "css",
  React: "react",
  "React Native": "react",
  "Next.js": "nextdotjs",
  "Node.js": "nodedotjs",
  "Express.js": "express",
  NestJS: "nestjs",
  "Material UI": "mui",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  Prisma: "prisma",
  Turborepo: "turborepo",
  "LINE LIFF": "line",
  Docker: "docker",
  // Zustand has no icon in Simple Icons (verified 404) — card renders name-only.
};
