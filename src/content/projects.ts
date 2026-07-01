// Shape per docs/SA_BLUEPRINT.md §2. imageSrc is intentionally empty until real
// screenshots are supplied — the UI renders a placeholder box (docs/UXUI_DESIGN.md §1).
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
    id: "taskflow",
    title: "TaskFlow",
    description_en:
      "A Kanban-style task manager with realtime drag-and-drop boards and team collaboration.",
    description_th:
      "แอปจัดการงานสไตล์ Kanban ลาก-วางบอร์ดแบบเรียลไทม์ พร้อมฟีเจอร์ทำงานร่วมกับทีม",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    imageSrc: "",
    liveUrl: "https://taskflow-demo.example.com",
    repoUrl: "https://github.com/jamesb/taskflow",
    confidentialityChecked: true,
  },
  {
    id: "weatherly",
    title: "Weatherly",
    description_en:
      "A fast, minimal weather forecast app with location search and a 7-day outlook.",
    description_th:
      "แอปพยากรณ์อากาศที่รวดเร็วและเรียบง่าย ค้นหาตำแหน่งได้และดูพยากรณ์ล่วงหน้า 7 วัน",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageSrc: "",
    liveUrl: "https://weatherly-demo.example.com",
    repoUrl: "https://github.com/jamesb/weatherly",
    confidentialityChecked: true,
  },
  {
    id: "devmetrics",
    title: "DevMetrics Dashboard",
    description_en:
      "A client-facing analytics dashboard built at my current role. Public product; no repo link since the source is internal.",
    description_th:
      "แดชบอร์ดวิเคราะห์ข้อมูลสำหรับลูกค้า ที่สร้างในงานปัจจุบัน เป็นโปรดักต์ public แต่ไม่มีลิงก์โค้ดเพราะซอร์สเป็นของบริษัท",
    tags: ["Vue.js", "Node.js", "Docker"],
    imageSrc: "",
    liveUrl: "https://devmetrics-demo.example.com",
    // No repoUrl: current-employer work — only shown once confidentiality is confirmed (PRD §3.5).
    confidentialityChecked: true,
  },
];
