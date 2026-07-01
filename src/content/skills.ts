// Shape per docs/SA_BLUEPRINT.md §2. `category` is an i18n key resolved against
// skills.categories.* in the dictionaries, so group labels stay bilingual.
// Sourced from the owner's resume (2026-07-02), hard skills only — soft skills
// (Leadership, Patience, etc.) aren't part of this data model; PRD didn't ask for them.
export interface Skill {
  name: string;
  category: "languages" | "frameworks" | "tools";
}

export const skills: Skill[] = [
  { name: "TypeScript", category: "languages" },
  { name: "JavaScript", category: "languages" },
  { name: "Java", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "C/C++", category: "languages" },
  { name: "HTML", category: "languages" },
  { name: "CSS", category: "languages" },
  { name: "React", category: "frameworks" },
  { name: "React Native", category: "frameworks" },
  { name: "Next.js", category: "frameworks" },
  { name: "Node.js", category: "frameworks" },
  { name: "MySQL", category: "tools" },
];

export const SKILL_CATEGORY_ORDER: Skill["category"][] = [
  "languages",
  "frameworks",
  "tools",
];
