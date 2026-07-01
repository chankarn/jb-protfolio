// Shape per docs/SA_BLUEPRINT.md §2, extended to bilingual role_en/role_th so the
// job title translates with the rest of the site (PRD requires bilingual content).
export interface ExperienceEntry {
  id: string;
  company: string;
  role_en: string;
  role_th: string;
  startDate: string; // "YYYY-MM"
  endDate: string | "present"; // "YYYY-MM" | "present"
  description_en: string;
  description_th: string;
}

export const experience: ExperienceEntry[] = [
  {
    id: "acme",
    company: "Acme Software Co.",
    role_en: "Software Engineer",
    role_th: "ซอฟต์แวร์ เอ็นจิเนียร์",
    startDate: "2023-06",
    endDate: "present",
    description_en:
      "Building and maintaining client-facing web products across the stack.",
    description_th:
      "พัฒนาและดูแลผลิตภัณฑ์เว็บสำหรับลูกค้าทั้งฝั่ง frontend และ backend",
  },
  {
    id: "startupxyz",
    company: "StartupXYZ",
    role_en: "Junior Developer",
    role_th: "จูเนียร์ ดีเวลลอปเปอร์",
    startDate: "2021-01",
    endDate: "2023-05",
    description_en:
      "Started my career shipping features for an early-stage product team.",
    description_th:
      "เริ่มต้นสายอาชีพด้วยการพัฒนาฟีเจอร์ให้ทีมโปรดักต์ในช่วงเริ่มต้นบริษัท",
  },
];
