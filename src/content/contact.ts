// Direct contact channels (shared by the Contact section and the Footer) and the
// resume file path. Sourced from the owner's resume (2026-07-02) — LinkedIn/GitHub
// weren't listed there, so only the channels we have real values for are shown.
export type ChannelIcon = "mail" | "phone" | "linkedin" | "github";

export interface Channel {
  label: string;
  href: string;
  icon: ChannelIcon;
}

export const channels: Channel[] = [
  { label: "Email", href: "mailto:jameschanakarn@gmail.com", icon: "mail" },
  { label: "Phone", href: "tel:+66942510074", icon: "phone" },
];

// Place the real file at public/resume.pdf before launch.
export const RESUME_URL = "/resume.pdf";
