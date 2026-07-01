// Shape per docs/SA_BLUEPRINT.md §2. imageSrc is intentionally empty until real
// screenshots are supplied — the UI renders a placeholder box (docs/UXUI_DESIGN.md §1).
// Sourced from the owner's resume (2026-07-02): these two predate the current
// Easset role and aren't tied to a client NDA, so they're safe to publish as-is;
// live/repo URLs are unknown for now and can be added once available.
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

export const projects: Project[] = [
  {
    id: "car-rental-dashboard",
    title: "Car Rental Case Management Dashboard",
    description_en:
      "A dashboard for car rental operations: customer bookings, driver assignments, case tracking, and revenue/performance reports by day, month, and overall trend.",
    description_th:
      "แดชบอร์ดสำหรับจัดการงานเช่ารถ ครอบคลุมการจองของลูกค้า มอบหมายคนขับ ติดตามเคส และรายงานรายได้/ผลงานรายวัน รายเดือน และภาพรวม",
    tags: ["Next.js", "TypeScript", "Material UI", "Express.js"],
    imageSrc: "",
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
    imageSrc: "",
    confidentialityChecked: true,
  },
];
