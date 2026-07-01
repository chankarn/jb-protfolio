// Shape per docs/SA_BLUEPRINT.md §2, extended to bilingual role_en/role_th so the
// job title translates with the rest of the site (PRD requires bilingual content).
// Sourced from the owner's resume (2026-07-02). Client/product specifics for the
// Easset role are described at a level a public resume normally uses — no
// screenshots/demo links are shown for that work (see Projects for the confidentiality note).
export interface ExperienceEntry {
  id: string;
  company: string;
  role_en: string;
  role_th: string;
  startDate: string; // "YYYY-MM" or "YYYY"
  endDate: string | "present"; // "YYYY-MM" | "YYYY" | "present"
  description_en: string;
  description_th: string;
}

export const experience: ExperienceEntry[] = [
  {
    id: "easset",
    company: "Easset Company Limited",
    role_en: "Full-Stack Developer",
    role_th: "ฟูลสแตก ดีเวลลอปเปอร์",
    startDate: "2024",
    endDate: "present",
    description_en:
      "Building mobile and web products end-to-end — a React Native/TypeScript mobile app for credit card applications with ID/QR scanning and facial verification, and an internal workflow management system (React, TypeScript, Fluent UI, Java Spring Boot) with task tracking, reporting, and admin tooling.",
    description_th:
      "พัฒนาโปรดักต์ทั้งฝั่งมือถือและเว็บแบบครบวงจร — แอปมือถือสำหรับสมัครบัตรเครดิตด้วย React Native/TypeScript พร้อมสแกนบัตร/QR และยืนยันตัวตนด้วยใบหน้า รวมถึงระบบจัดการ workflow ภายในองค์กร (React, TypeScript, Fluent UI, Java Spring Boot) ที่มีการติดตามงาน รายงาน และเครื่องมือสำหรับผู้ดูแลระบบ",
  },
];
