# Trident IMS — Internal Management System for Sales, Project & HR Operations

**Type:** Client project (agency work for TPS — a real company)
**Stack:** Next.js · NestJS · TypeScript · Prisma · PostgreSQL · Docker
**Repo:** Private (GitLab, `code-play-developer/TPS`) — not publicly linkable
**Live URL:** None public (client-internal deployment, no public access)

> Note: description below covers the full system. Trim the bullets to match your
> actual scope on the project before pasting into your resume.

## Screenshot status — no real images yet

Unlike the other project entries, this one ships with **placeholder boxes only**
(`images: ["", "", ""]` in `content/projects.ts`) — there are no client
screenshots in the portfolio yet. Reasons:

- This is TPS's real internal system, actively used for HR, finance, and sales
  operations — not a personal or public-facing product.
- Real data on screen includes salaries (Employee/Salary Change), GP margins,
  real client names, real quotation/invoice amounts, and audit logs with real
  employee names — all sensitive, none of it safe to publish as-is.
- There's no written NDA to point to that clears publication, so — unlike the
  Taokaenoi/Astralix/Proud Point entries — this one hasn't been cleared by the
  client/agency yet.

**Before adding real screenshots:**
1. Get explicit sign-off from the client/agency owner to use this as a
   portfolio piece.
2. Re-seed the environment with mock data (fake employees, fake company names,
   fake financial figures) and capture screenshots from that, not from
   production/UAT.
3. Scrub any remaining identifiers — the "TPS" name/branding on the login
   screen, the `ims-uat.tps.co.th` domain, any dollar/baht figures.

Suggested shots once cleared (all desktop, landscape — this is a desktop-first
internal tool, not designed for mobile use):
1. **Dashboard** (work/money/people overview) — best single shot for "what does
   this system do," shows the recharts/kanban overview.
2. **Sales Pipeline / Lead board** (`/leads`) — shows the stage-flow (kanban)
   logic.
3. **Quotation approval flow** (`/quotations`) — shows status badges
   (Draft/Pending/Approved/Sent), the multi-tier approval flow that's the
   main technical selling point.
4. **Project detail with Health Score** (`/projects`) — shows the automated
   Green/Yellow/Red business-logic scoring.

---

## English (resume version)

### Trident IMS — Internal Management System for Sales, Project & HR Operations

A full-stack internal operations platform for a client company, unifying the
sales pipeline (Lead → Quotation → Project conversion) with project
management, finance, and HR workflows in one system. Originally started as a
refactor of a legacy ~8,000-line single-file HTML codebase into a proper
full-stack application.

- Rebuilt the client's legacy ~8,000-line HTML app into a Next.js/NestJS
  full-stack system with a proper data model (Prisma/PostgreSQL) and typed
  API boundary.
- Built the sales pipeline: Lead intake → Quotation drafting/approval →
  conversion into an active Project, keeping sales, production, and
  accounting on one system instead of spreadsheets/disconnected tools.
- Implemented multi-tier quotation approval flows (Draft → Pending → Approved
  → Sent) with role-based access control so sales, production, and accounting
  each see and act on only what's relevant to their role.
- Added automated project health scoring (e.g., Green/Yellow/Red) derived
  from underlying project data, surfaced on project detail views for quick
  status triage.
- Covered HR and finance workflows (employee records, salary changes, GP
  margin tracking) alongside the sales/project side, with audit logging on
  sensitive changes.
- Containerized the stack with Docker for deployment to the client's
  environment.

**Tech:** Next.js, NestJS, TypeScript, Prisma, PostgreSQL, Docker.

---

## ภาษาไทย (สำหรับ resume)

### Trident IMS — ระบบจัดการภายในองค์กรด้าน Sales, Project และ HR

ระบบจัดการภายในองค์กรแบบ full-stack สำหรับลูกค้าบริษัทหนึ่ง รวม pipeline การขาย
(Lead → Quotation → แปลงเป็น Project) เข้ากับการบริหารโปรเจกต์ การเงิน และ HR
ไว้ในระบบเดียว เริ่มต้นจากการ refactor โค้ด HTML ไฟล์เดียวขนาด ~8,000 บรรทัดของ
ลูกค้าให้กลายเป็น full-stack application ที่ถูกต้องตามหลักวิศวกรรม

- Refactor แอป HTML เดิมของลูกค้า (~8,000 บรรทัด) ให้เป็นระบบ Next.js/NestJS
  แบบ full-stack พร้อม data model ที่ถูกต้อง (Prisma/PostgreSQL) และ API
  ที่มี type ชัดเจน
- สร้าง sales pipeline: รับ Lead → ร่าง/อนุมัติ Quotation → แปลงเป็น Project
  ที่ใช้งานจริง รวมทีม sales, production และ accounting ไว้ในระบบเดียวแทน
  สเปรดชีต/เครื่องมือแยกกัน
- ทำระบบอนุมัติ Quotation หลายชั้น (Draft → Pending → Approved → Sent) พร้อม
  role-based access control ให้แต่ละทีม (sales/production/accounting) เห็นและ
  ทำงานเฉพาะส่วนที่เกี่ยวกับบทบาทตัวเอง
- เพิ่มระบบให้คะแนนสุขภาพโปรเจกต์อัตโนมัติ (เช่น Green/Yellow/Red) คำนวณจาก
  ข้อมูลโปรเจกต์จริง แสดงในหน้ารายละเอียดโปรเจกต์เพื่อดูสถานะได้เร็ว
- ครอบคลุม workflow ฝั่ง HR และการเงิน (ข้อมูลพนักงาน, การเปลี่ยนแปลงเงินเดือน,
  การติดตาม GP margin) ควบคู่กับฝั่ง sales/project พร้อม audit log สำหรับ
  การเปลี่ยนแปลงข้อมูลที่สำคัญ
- Containerize ระบบด้วย Docker สำหรับ deploy ขึ้น environment ของลูกค้า

**เทคโนโลยี:** Next.js, NestJS, TypeScript, Prisma, PostgreSQL, Docker
