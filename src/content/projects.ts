// Shape per docs/SA_BLUEPRINT.md §2. Content is filled in during /dev.
export interface Project {
  id: string;
  title: string;
  description_en: string;
  description_th: string;
  tags: string[];
  imageSrc: string;
  liveUrl?: string;
  repoUrl?: string;
  confidentialityChecked: boolean;
}

export const projects: Project[] = [];
