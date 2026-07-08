# Work Joy Station — Event Registration & AI Survey

**Type:** Client campaign project (Taokaenoi × Thailand HR Tech 2026 booth, agency work)
**Stack:** Next.js · NestJS · Prisma · PostgreSQL
**Live:** <https://wjs.code-play.net> (event-scoped deployment, 2026-06-16/17)

> Note: description below covers the full system. Trim the bullets to match your
> actual scope on the project before pasting into your resume.

---

## English (resume version)

### Work Joy Station — Event Registration & AI Survey (Taokaenoi × Thailand HR Tech 2026)

A mobile-first, on-site event-registration web app built for Taokaenoi's booth
at Thailand HR Tech 2026. Attendees register with their name and phone number,
complete a short AI-usage survey, and unlock eligibility for on-site rewards —
replacing a paper sign-up sheet with a fast, validated digital flow.

- Built a 3-screen mobile funnel (landing → registration/survey form →
  success) optimized for a booth environment: single-hand use, large tap
  targets, and a completion flow under a few minutes.
- Implemented a registration + short survey form (name, phone, age, AI tool
  preference, usage frequency via single-select chips, open-ended questions)
  with client-side validation and a consent checkbox.
- Enforced duplicate-registration prevention by phone number, validated on
  both the client and server so a single attendee can't claim rewards twice.
- Built the backend (NestJS + Prisma/PostgreSQL) to persist registrations and
  survey responses, and deployed the stack to a self-hosted server via Docker
  behind a Cloudflare Tunnel for the event window.

**Tech:** Next.js, NestJS, Prisma, PostgreSQL, Docker.

---

## ภาษาไทย (สำหรับ resume)

### Work Joy Station — ระบบลงทะเบียนหน้างานอีเวนต์ & แบบสำรวจ AI (เถ้าแก่น้อย × Thailand HR Tech 2026)

เว็บแอปลงทะเบียนหน้างานอีเวนต์แบบ mobile-first สำหรับบูธเถ้าแก่น้อยในงาน
Thailand HR Tech 2026 ผู้เข้าร่วมงานกรอกชื่อ-เบอร์โทรเพื่อลงทะเบียน ตอบแบบสำรวจ
สั้นๆ เรื่องพฤติกรรมการใช้ AI แล้วรับสิทธิ์รับของรางวัลที่บูธ — แทนที่ใบลงทะเบียน
กระดาษด้วยระบบดิจิทัลที่เร็วและตรวจสอบข้อมูลได้

- สร้าง funnel 3 หน้าจอสำหรับมือถือ (หน้า landing → ฟอร์มลงทะเบียน/แบบสำรวจ →
  หน้า success) ออกแบบให้ใช้งานหน้างานได้สะดวก ใช้มือเดียวได้ ปุ่มกดขนาดใหญ่
  และกรอกจบได้ในไม่กี่นาที
- ทำฟอร์มลงทะเบียนพร้อมแบบสำรวจสั้น (ชื่อ-นามสกุล, เบอร์โทร, อายุ, AI ที่ใช้บ่อย,
  ความถี่การใช้งานแบบ chip single-select, คำถามปลายเปิด) พร้อม validation ฝั่ง
  client และ checkbox ยินยอมให้เก็บข้อมูล
- ป้องกันการลงทะเบียนซ้ำด้วยเบอร์โทรศัพท์ ตรวจสอบทั้งฝั่ง client และ server
  เพื่อไม่ให้ผู้เข้าร่วมคนเดียวรับของรางวัลซ้ำ
- สร้าง backend (NestJS + Prisma/PostgreSQL) เพื่อบันทึกข้อมูลลงทะเบียนและคำตอบ
  แบบสำรวจ พร้อม deploy ขึ้น self-hosted server ด้วย Docker ผ่าน Cloudflare Tunnel
  สำหรับช่วงเวลาจัดงาน

**เทคโนโลยี:** Next.js, NestJS, Prisma, PostgreSQL, Docker
