// Shape per docs/SA_BLUEPRINT.md §2 (extended: `images` replaces the single
// `imageSrc` so the project modal can show a 2-4 screenshot carousel). Sourced
// from the owner's resume (2026-07-02): these two predate the current Easset
// role and aren't tied to a client NDA, so they're safe to publish as-is;
// live/repo URLs are unknown for now and can be added once available.
//
// Car Rental Dashboard and POS System: the old codebases are no longer
// accessible (confirmed 2026-07-05), so real screenshots can't be captured.
// Generic Unsplash stock photos were tried as a mock but deliberately reverted
// to empty (placeholder box) — a stock photo of an unrelated dashboard is
// misleading portfolio content, worse than an honest "no image yet" box.
export interface Project {
  id: string;
  title: string;
  description_en: string;
  description_th: string;
  tags: string[];
  images: string[];
  liveUrl?: string;
  repoUrl?: string;
  confidentialityChecked: boolean;
}

export const projects: Project[] = [
  {
    id: "car-rental-dashboard",
    title: "Car Rental Case Management Dashboard",
    description_en:
      "A dashboard for car rental operations: customer bookings, driver assignments, case tracking, and revenue/performance reports by day, month, and overall trend.",
    description_th:
      "แดชบอร์ดสำหรับจัดการงานเช่ารถ ครอบคลุมการจองของลูกค้า มอบหมายคนขับ ติดตามเคส และรายงานรายได้/ผลงานรายวัน รายเดือน และภาพรวม",
    tags: ["Next.js", "TypeScript", "Material UI", "Express.js"],
    images: ["", "", ""],
    confidentialityChecked: true,
  },
  {
    id: "pub-pos-system",
    title: "POS Web Application for Pub Management",
    description_en:
      "A point-of-sale system for pubs covering admin, kitchen, and cashier roles — room booking, product sales, in-room ordering, and sales/inventory reporting from a centralized dashboard.",
    description_th:
      "ระบบ POS สำหรับร้านผับ ครอบคลุมบทบาท admin ครัว และแคชเชียร์ มีระบบจองห้อง ขายสินค้า สั่งอาหารในห้อง และรายงานยอดขาย/สต๊อกจากแดชบอร์ดกลาง",
    tags: ["React.js", "Node.js", "MySQL"],
    images: ["", "", ""],
    confidentialityChecked: true,
  },
  {
    id: "maoleaw",
    title: "MaoLeaw — Event & Bill Splitter",
    description_en:
      "A LINE-based event & fair-bill-splitting app for friend groups: track who's coming, split drink costs so non-drinkers don't subsidize alcohol, and track who's paid. LIFF web for members, a separate admin dashboard for organizers, backed by a NestJS API and PostgreSQL.",
    description_th:
      "แอปจัดงานเลี้ยงและหารบิลแบบแฟร์ผ่าน LINE สำหรับกลุ่มเพื่อน — เก็บข้อมูลใครจะมา หารค่าเหล้า/เบียร์เฉพาะคนที่กิน (คนไม่กินแอลไม่ต้องช่วยจ่าย) และติดตามว่าใครจ่ายแล้ว มีทั้งฝั่ง LIFF สำหรับสมาชิกและ Admin dashboard แยกสำหรับผู้จัดงาน หนุนหลังด้วย NestJS API และ PostgreSQL",
    tags: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "LINE LIFF", "Turborepo"],
    images: [
      "/Maoleaw/Screenshot%202569-07-04%20at%2017.25.36.png",
      "/Maoleaw/Screenshot%202569-07-04%20at%2017.26.18.png",
      "/Maoleaw/Screenshot%202569-07-04%20at%2017.30.09.png",
      "/Maoleaw/Screenshot%202569-07-04%20at%2017.30.51.png",
    ],
    confidentialityChecked: true,
  },
];
