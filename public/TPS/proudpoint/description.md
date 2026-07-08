# SiPH Proud Point — Hospital Loyalty & Rewards Platform

**Type:** Client / company project (agency work for SiPH hospital)
**Stack:** Next.js · NestJS · Prisma · PostgreSQL · LINE LIFF · Docker Compose
**Architecture:** 3 services (backend / CRM / LINE LIFF) across dev / staging / production

> Note: description below covers the full system. Trim the bullets to match your
> actual scope on the project (e.g. if you only worked on the LIFF side, drop the
> CRM/backend bullets, or vice-versa) before pasting into your resume.

---

## English (resume version)

**SiPH Proud Point — Hospital Loyalty & Rewards Platform (LINE LIFF + Admin CRM)**

A patient-loyalty platform for a hospital, delivered as a LINE LIFF web app with a
companion admin CRM. Members register through LINE (linked to their hospital HN),
earn points from campaigns, health surveys, daily check-ins, and articles, and
redeem them for rewards or lucky-draw spins — with gamification (collectible
badges and a medal leaderboard) to drive engagement.

- Developed the member-facing LINE LIFF app: LINE login + hospital-HN
  registration, campaign participation (articles, quizzes, daily check-in
  calendar, offline QR booths), badge collection, medal leaderboard, and reward
  redemption (shipping / on-site pickup / code).
- Built the admin CRM for the hospital marketing team to manage campaigns and
  sub-events, multi-section branching surveys, rewards and stock, lucky-draw
  (per-item stock and win-rate), member segmentation and tiers, role-based
  access control, and reporting with Excel export.
- Implemented gamification and a point ledger: auto-awarded badges across 4
  categories (online / event / blood-donation / green), a medal-based
  leaderboard, and per-transaction point history with optional expiry.
- Enforced business rules on the server: a 30-minute activity cooldown to
  prevent point farming, sub-event prerequisites (task-order gating), per-user
  reward and lucky-draw limits, and full audit logging of admin actions.
- Handled sensitive patient data (HN, national ID, contact info) with PDPA
  consent, and ran the system across separate dev / staging / production LINE
  Official Accounts.

**Tech:** Next.js, NestJS, Prisma, PostgreSQL, LINE LIFF, Docker Compose.

---

## ภาษาไทย (สำหรับ resume)

**SiPH Proud Point — ระบบสมาชิกสะสมแต้ม & ของรางวัลสำหรับโรงพยาบาล (LINE LIFF + Admin CRM)**

แพลตฟอร์มสะสมแต้มสำหรับผู้ป่วย/สมาชิกของโรงพยาบาล พัฒนาเป็นเว็บแอปบน LINE (LIFF)
คู่กับระบบ CRM หลังบ้าน สมาชิกสมัครผ่าน LINE (ผูกเลข HN ของโรงพยาบาล) สะสมแต้มจาก
การเข้าร่วมแคมเปญ ทำแบบสำรวจสุขภาพ เช็คอินรายวัน และอ่านบทความ แล้วนำไปแลกของรางวัล
หรือลุ้นวงล้อ พร้อมระบบเกมมิฟิเคชัน (เหรียญตราสะสม และลีดเดอร์บอร์ดจัดอันดับด้วยจำนวนเหรียญ)
เพื่อกระตุ้นการมีส่วนร่วม

- พัฒนาแอปฝั่งสมาชิกบน LINE LIFF: ล็อกอิน LINE + สมัครสมาชิกผูกเลข HN, เข้าร่วมกิจกรรม
  (บทความ แบบทดสอบ ปฏิทินเช็คอินรายวัน บูธสแกน QR หน้างาน), เก็บเหรียญตรา, ลีดเดอร์บอร์ด
  และแลกของรางวัล (จัดส่ง / รับหน้างาน / รับเป็นโค้ด)
- สร้างระบบ CRM ให้ทีมการตลาดของโรงพยาบาลจัดการแคมเปญและกิจกรรมย่อย, แบบสำรวจแบบหลาย
  หมวดที่แยกเส้นทางตามคำตอบได้, ของรางวัลและสต๊อก, วงล้อลุ้นรางวัล (ตั้งสต๊อกและ % โอกาสถูก
  ต่อรางวัล), การแบ่งกลุ่ม/ระดับสมาชิก, สิทธิ์การใช้งานตามบทบาท และรายงานพร้อมส่งออก Excel
- ทำระบบเกมมิฟิเคชันและบัญชีแต้ม: มอบเหรียญอัตโนมัติ 4 หมวด (ออนไลน์ / อีเวนต์ / บริจาคเลือด /
  แคมเปญสีเขียว), ลีดเดอร์บอร์ดจัดอันดับด้วยจำนวนเหรียญ และประวัติแต้มรายรายการที่ตั้งวันหมดอายุได้
- บังคับกติกาฝั่งเซิร์ฟเวอร์: คูลดาวน์ 30 นาทีกันการยิงแต้มซ้ำ, เงื่อนไขลำดับก่อน-หลังของกิจกรรม,
  ลิมิตการแลกของ/หมุนวงล้อต่อคน และบันทึกประวัติการแก้ไขของแอดมินทุกครั้ง (audit log)
- จัดการข้อมูลผู้ป่วยที่ละเอียดอ่อน (HN, เลขบัตรประชาชน, ข้อมูลติดต่อ) พร้อมการยินยอมตาม PDPA
  และแยกสภาพแวดล้อม dev / staging / production ด้วยบัญชี LINE OA คนละชุด

**เทคโนโลยี:** Next.js, NestJS, Prisma, PostgreSQL, LINE LIFF, Docker Compose
