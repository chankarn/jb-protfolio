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
  {
    // Client work for SiPH hospital. The owner confirmed (2026-07-08) this is
    // safe to publish: the app is already live on the client's public LINE OA,
    // so the client isn't secret, and every screenshot below is dev/test data
    // (profile "ddd ssss", leaderboard "ผู้ใช้ทดสอบ", "สมชาย ใจดี") — no real
    // patient PII (HN / ID card / phone / email / DOB). LIFF (member) screens
    // only; the admin CRM side is deliberately excluded. Hosting/infra details
    // deliberately omitted from tags.
    id: "siph-proud-point",
    title: "SiPH Proud Point — Hospital Loyalty & Rewards",
    description_en:
      "A hospital loyalty & rewards platform delivered as a LINE Mini App: patients register through LINE (linked to their hospital HN) and earn points from campaigns, health surveys, daily check-ins, and articles — redeemable for rewards or lucky-draw spins. Gamified with collectible badges and leaderboards, backed by an admin CRM for campaign and reward management.",
    description_th:
      "แพลตฟอร์มสะสมแต้ม/ของรางวัลสำหรับโรงพยาบาลในรูปแบบ LINE Mini App ผู้ป่วยสมัครสมาชิกผ่าน LINE (ผูกเลข HN) สะสมแต้มจากกิจกรรม แบบสำรวจสุขภาพ เช็คอินรายวัน และบทความ แล้วนำไปแลกของรางวัลหรือลุ้นวงล้อ มีระบบเหรียญตราและลีดเดอร์บอร์ดให้สนุกแบบเกม พร้อม CRM หลังบ้านให้แอดมินจัดการแคมเปญและของรางวัล",
    tags: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "LINE LIFF", "Docker"],
    images: [
      "/TPS/proudpoint/Screenshot%202569-07-08%20at%2000.03.23.png",
      "/TPS/proudpoint/Screenshot%202569-07-08%20at%2000.02.55.png",
      "/TPS/proudpoint/Screenshot%202569-07-07%20at%2023.57.00.png",
      "/TPS/proudpoint/Screenshot%202569-07-07%20at%2023.54.09.png",
      "/TPS/proudpoint/Screenshot%202569-07-07%20at%2023.55.46.png",
      "/TPS/proudpoint/Screenshot%202569-07-07%20at%2023.55.04.png",
    ],
    confidentialityChecked: true,
  },
  {
    // Company product (Astralix Codeplay, code-play.net — the owner's own
    // agency). No client NDA; the live site is public and every screenshot uses
    // self-entered test data ("test company", jb/cs, 0987654321). The owner
    // confirmed (2026-07-08) it's fine to publish as-is, including the
    // jbcs@gmail.com test address visible in the review/email shots.
    id: "astralix",
    title: "Astralix — Client Intake & Requirement Scoping Form",
    description_en:
      "A multi-step (8-stage) client intake form for dashboard-to-CMS projects that dynamically branches its questions across 6 client scenarios (data-only, existing dashboard, greenfield, etc.), with draft auto-save, file uploads, and email notifications — built to cut down the back-and-forth between the sales/BA team and prospective clients during project scoping.",
    description_th:
      "ฟอร์มรับ requirement จากลูกค้าแบบ multi-step (8 ขั้นตอน) สำหรับงาน Dashboard-to-CMS โดยระบบจะแยกคำถามอัตโนมัติตาม 6 สถานการณ์ของลูกค้า (มีข้อมูลอย่างเดียว / มี dashboard เดิม / เริ่มจากศูนย์ ฯลฯ) พร้อม auto-save draft, อัปโหลดไฟล์ และแจ้งเตือนทางอีเมลหลัง submit — ช่วยลดรอบการคุยงานระหว่างทีม Sales/BA กับลูกค้าใหม่",
    tags: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Zustand", "Docker"],
    images: [
      "/TPS/astralix/Screenshot%202569-07-08%20at%2000.46.53.png",
      "/TPS/astralix/Screenshot%202569-07-08%20at%2000.47.55.png",
      "/TPS/astralix/Screenshot%202569-07-08%20at%2000.51.41.png",
      "/TPS/astralix/Screenshot%202569-07-08%20at%2000.52.06.png",
      "/TPS/astralix/Screenshot%202569-07-08%20at%2000.52.46.png",
    ],
    liveUrl: "https://astralix.code-play.net",
    confidentialityChecked: true,
  },
  {
    // Client campaign work (Taokaenoi x Thailand HR Tech 2026 booth, via the
    // owner's agency). Owner confirmed (2026-07-09) it's fine to publish:
    // no secrets/API keys in source (all via untracked .env), and every
    // screenshot uses self-entered test data ("jb cs", 0987654321, age 25).
    // Client brand (Taokaenoi) and campaign assets appear directly in the UI —
    // owner has cleared using this as a portfolio piece. Live URL is for a
    // 2026-06-16/17 event; confirmed still reachable as of 2026-07-09.
    id: "work-joy-station",
    title: "Work Joy Station — Event Registration & AI Survey",
    description_en:
      "A mobile-first event-registration web app built for Taokaenoi's booth at Thailand HR Tech 2026, letting attendees register and complete a short AI-usage survey to become eligible for on-site rewards — with duplicate-phone-number prevention and validation on both the client and server.",
    description_th:
      "เว็บแอปลงทะเบียนหน้างานอีเวนต์แบบ mobile-first สำหรับบูธเถ้าแก่น้อยในงาน Thailand HR Tech 2026 ให้ผู้เข้าร่วมงานกรอกข้อมูลลงทะเบียนและตอบแบบสำรวจสั้นๆ เรื่องพฤติกรรมการใช้ AI เพื่อรับสิทธิพิเศษ/ของรางวัลที่บูธ — ระบบกันการลงทะเบียนซ้ำด้วยเบอร์โทรศัพท์ พร้อม validation ทั้งฝั่ง client และ server",
    tags: ["Next.js", "NestJS", "Prisma", "PostgreSQL"],
    images: [
      "/TPS/tkn-wjs/Screenshot%202569-07-08%20at%2001.01.32.png",
      "/TPS/tkn-wjs/Screenshot%202569-07-08%20at%2001.02.13.png",
      "/TPS/tkn-wjs/Screenshot%202569-07-08%20at%2001.02.26.png",
    ],
    liveUrl: "https://wjs.code-play.net",
    confidentialityChecked: true,
  },
  {
    // Client work (TPS — a real client of the owner's agency; started as a
    // refactor of an ~8,000-line legacy HTML codebase). Repo is private on the
    // company's GitLab (code-play-developer/TPS), not a public link. No real
    // screenshots included: this is the client's internal HR/finance/sales
    // system with genuinely sensitive data (salaries, GP margins, real client
    // names, quotation/invoice amounts, named audit logs) and there's no
    // written NDA the owner could point to clearing publication — so, unlike
    // the other entries here, this one hasn't been screenshot-cleared by the
    // client yet. Ships as an honest placeholder-box entry (per the Car
    // Rental/POS precedent above) until real seed/mock-data screenshots are
    // captured and the client/agency signs off.
    id: "trident-ims",
    title: "Trident IMS — Internal Management System for Sales, Project & HR Operations",
    description_en:
      "A full-stack internal operations platform that unifies the sales pipeline (Lead → Quotation → Project conversion) with project management, finance, and HR workflows — featuring multi-tier approval flows and role-based access control for sales, production, and accounting teams.",
    description_th:
      "ระบบจัดการภายในองค์กรแบบ full-stack ที่รวม pipeline การขาย (Lead → Quotation → Project) เข้ากับการบริหารโปรเจกต์ การเงิน และ HR ไว้ในที่เดียว พร้อมระบบอนุมัติหลายชั้นและ role-based access control สำหรับพนักงานบริษัทที่ทำงานด้าน sales, production, และ accounting",
    tags: ["Next.js", "NestJS", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
    images: ["", "", ""],
    confidentialityChecked: true,
  },
];
