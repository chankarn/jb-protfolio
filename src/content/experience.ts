// Shape per docs/SA_BLUEPRINT.md §2, extended to bilingual role_en/role_th so the
// job title translates with the rest of the site (PRD requires bilingual content).
// Sourced from the owner's resume (2026-07-02, dates updated 2026-07-09: left
// Easset 2025-04, joined Codeplay 2025-08 — full-time at Codeplay since;
// added the 2023 Car Rental freelance gig, month unknown so year-only).
// Client/product specifics for the Easset role are described at a level a
// public resume normally uses — no screenshots/demo links are shown for that
// work (see Projects for the confidentiality note). Rendered most-recent-first.
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
    id: "codeplay",
    company: "Codeplay",
    role_en: "Full-Stack Developer",
    role_th: "ฟูลสแตก ดีเวลลอปเปอร์",
    startDate: "2025-08",
    endDate: "present",
    description_en:
      "Building full-stack web products for agency clients — LINE Mini App loyalty/rewards platforms, multi-step client intake tools, event-registration apps, and internal business systems — with Next.js, NestJS, Prisma, and PostgreSQL.",
    description_th:
      "พัฒนาโปรดักต์เว็บแบบ full-stack ให้ลูกค้าฝั่ง agency — แพลตฟอร์มสะสมแต้ม/ของรางวัลผ่าน LINE Mini App, ฟอร์มรับ requirement จากลูกค้าแบบหลายขั้นตอน, เว็บลงทะเบียนหน้างานอีเวนต์ และระบบบริหารจัดการภายในองค์กร ด้วย Next.js, NestJS, Prisma และ PostgreSQL",
  },
  {
    id: "easset",
    company: "Easset Company Limited",
    role_en: "Full-Stack Developer",
    role_th: "ฟูลสแตก ดีเวลลอปเปอร์",
    startDate: "2024",
    endDate: "2025-04",
    description_en:
      "Built mobile and web products end-to-end — a React Native/TypeScript mobile app for credit card applications with ID/QR scanning and facial verification, and an internal workflow management system (React, TypeScript, Fluent UI, Java Spring Boot) with task tracking, reporting, and admin tooling.",
    description_th:
      "พัฒนาโปรดักต์ทั้งฝั่งมือถือและเว็บแบบครบวงจร — แอปมือถือสำหรับสมัครบัตรเครดิตด้วย React Native/TypeScript พร้อมสแกนบัตร/QR และยืนยันตัวตนด้วยใบหน้า รวมถึงระบบจัดการ workflow ภายในองค์กร (React, TypeScript, Fluent UI, Java Spring Boot) ที่มีการติดตามงาน รายงาน และเครื่องมือสำหรับผู้ดูแลระบบ",
  },
  {
    id: "car-rental-freelance",
    company: "Freelance",
    role_en: "Freelance Full-Stack Developer",
    role_th: "ฟรีแลนซ์ ฟูลสแตก ดีเวลลอปเปอร์",
    startDate: "2023",
    endDate: "2023",
    description_en:
      "Built a car rental case management dashboard for a client — customer bookings, driver assignments, case tracking, and revenue/performance reports by day, month, and overall trend.",
    description_th:
      "พัฒนาแดชบอร์ดสำหรับจัดการงานเช่ารถให้ลูกค้า ครอบคลุมการจองของลูกค้า มอบหมายคนขับ ติดตามเคส และรายงานรายได้/ผลงานรายวัน รายเดือน และภาพรวม",
  },
];
