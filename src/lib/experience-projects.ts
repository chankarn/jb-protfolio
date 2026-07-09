import { projects, type Project } from "@/content/projects";

export function getProjectsForExperience(experienceId: string): Project[] {
  return projects.filter((project) => project.experienceId === experienceId);
}
