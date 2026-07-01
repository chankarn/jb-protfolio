// Shape per docs/SA_BLUEPRINT.md §2. Content is filled in during /dev.
export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  startDate: string; // "YYYY-MM"
  endDate: string | "present"; // "YYYY-MM" | "present"
  description_en: string;
  description_th: string;
}

export const experience: ExperienceEntry[] = [];
