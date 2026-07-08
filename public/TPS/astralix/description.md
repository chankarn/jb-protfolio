# Astralix — Client Intake & Requirement Scoping Form

**Type:** Company product (Astralix Codeplay — the owner's own agency, code-play.net)
**Stack:** Next.js · NestJS · Prisma · PostgreSQL · Zustand · Docker
**Live:** <https://astralix.code-play.net>

> Note: description below covers the full system. Trim the bullets to match your
> actual scope on the project before pasting into your resume.

---

## English (resume version)

### Astralix — Client Intake & Requirement Scoping Form (Dashboard-to-CMS)

A public-facing, multi-step (8-stage) intake form used by the agency's sales/BA
team to collect project requirements from prospective "Dashboard-to-CMS" clients
before a proposal is drafted — replacing ad-hoc back-and-forth over chat/email
with a single guided flow that produces a structured, reviewable submission.

- Built an 8-step wizard (contact info → project category → existing system
  details → database migration → CMS users & access → additional features →
  technical requirements → review & submit) with a persistent progress sidebar
  and step validation.
- Implemented dynamic question branching across 6 client scenarios (data-only,
  existing dashboard, greenfield build, etc.), so each client only sees the
  fields relevant to their situation instead of one generic form.
- Added draft auto-save (visible "saved N seconds ago" indicator) backed by
  Zustand client state, so clients can leave mid-form and resume without losing
  progress.
- Built file upload handling for supporting documents (data samples, existing
  dashboard exports/screenshots) as part of the intake, plus a final
  review-and-submit step that displays all collected answers grouped by section.
- Wired up backend (NestJS + Prisma/PostgreSQL) to persist submissions and send
  email notifications to the sales/BA team on completion, and containerized the
  service with Docker for deployment.

**Tech:** Next.js, NestJS, Prisma, PostgreSQL, Zustand, Docker.

---

## ภาษาไทย (สำหรับ resume)

### Astralix — ฟอร์มรับ Requirement และ Scoping งานจากลูกค้า (Dashboard-to-CMS)

ฟอร์มรับข้อมูลโปรเจกต์แบบ multi-step (8 ขั้นตอน) ที่เปิดให้ลูกค้ากรอกเองก่อนทีม
Sales/BA ของเอเจนซี่จะออกแบบ solution และทำ proposal ให้ ช่วยแทนที่การไล่คุยงานผ่าน
แชท/อีเมลด้วยฟอร์มเดียวที่ได้ข้อมูลครบ เป็นระเบียบ และตรวจทานได้ง่าย

- สร้างฟอร์มแบบ wizard 8 ขั้นตอน (ข้อมูลผู้ติดต่อ → ประเภทโปรเจกต์ → รายละเอียด
  ระบบเดิม → Database Migration → CMS Users & Access → Features เพิ่มเติม →
  Technical Requirements → ทบทวน & ส่ง) พร้อม sidebar แสดงความคืบหน้าและ
  ตรวจสอบความถูกต้องในแต่ละขั้น
- ทำระบบแยกคำถามอัตโนมัติ (dynamic branching) ตาม 6 สถานการณ์ของลูกค้า (มีข้อมูล
  อย่างเดียว / มี dashboard เดิม / เริ่มจากศูนย์ ฯลฯ) เพื่อให้ลูกค้าเห็นเฉพาะคำถาม
  ที่เกี่ยวกับสถานการณ์ตัวเอง แทนที่จะเป็นฟอร์มเดียวใช้กับทุกกรณี
- ทำระบบ auto-save draft (แสดงสถานะ "บันทึกแล้ว N วินาทีที่แล้ว") โดยใช้ Zustand
  จัดการ state ฝั่ง client ทำให้ลูกค้าออกจากฟอร์มกลางคันแล้วกลับมากรอกต่อได้โดย
  ไม่เสียข้อมูล
- ทำระบบอัปโหลดไฟล์ประกอบ (ตัวอย่างข้อมูล, ภาพหน้าจอ/ไฟล์ export ของ dashboard เดิม)
  และหน้าทบทวนข้อมูลก่อนส่งที่แสดงคำตอบทั้งหมดแยกตามหมวด
- เชื่อมต่อ backend (NestJS + Prisma/PostgreSQL) เพื่อบันทึกข้อมูลที่ส่งเข้ามาและ
  แจ้งเตือนทางอีเมลให้ทีม Sales/BA เมื่อลูกค้าส่งฟอร์มสำเร็จ พร้อม containerize
  ด้วย Docker สำหรับ deploy

**เทคโนโลยี:** Next.js, NestJS, Prisma, PostgreSQL, Zustand, Docker
