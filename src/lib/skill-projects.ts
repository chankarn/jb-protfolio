import { projects, type Project } from "@/content/projects";

// Normalize a tech name for matching a Skill against a Project's free-form
// tags — strips a trailing ".js" (so "React.js" == "React") then all
// remaining non-alphanumerics, so "Material UI" == "Material UI" and
// "LINE LIFF" == "LINE LIFF" regardless of spacing/casing differences.
function normalizeTechName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\.js$/, "")
    .replace(/[^a-z0-9]/g, "");
}

export function getProjectsForSkill(skillName: string): Project[] {
  const target = normalizeTechName(skillName);
  return projects.filter((project) =>
    project.tags.some((tag) => normalizeTechName(tag) === target)
  );
}
