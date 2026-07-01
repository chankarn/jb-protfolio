// Shape per docs/SA_BLUEPRINT.md §2. `category` is an i18n key resolved against
// skills.categories.* in the dictionaries, so group labels stay bilingual.
export interface Skill {
  name: string;
  category: "languages" | "frameworks" | "tools";
}

export const skills: Skill[] = [
  { name: "TypeScript", category: "languages" },
  { name: "JavaScript", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "React", category: "frameworks" },
  { name: "Next.js", category: "frameworks" },
  { name: "Node.js", category: "frameworks" },
  { name: "PostgreSQL", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Git", category: "tools" },
  { name: "Tailwind CSS", category: "tools" },
];

export const SKILL_CATEGORY_ORDER: Skill["category"][] = [
  "languages",
  "frameworks",
  "tools",
];
