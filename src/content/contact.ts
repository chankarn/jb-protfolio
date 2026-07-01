// Direct contact channels (shared by the Contact section and the Footer) and the
// resume file path. Update these with real values before launch.
export type ChannelIcon = "mail" | "linkedin" | "github";

export interface Channel {
  label: string;
  href: string;
  icon: ChannelIcon;
}

export const channels: Channel[] = [
  { label: "Email", href: "mailto:james.b@example.com", icon: "mail" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jamesb", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/jamesb", icon: "github" },
];

// Place the real file at public/resume.pdf before launch.
export const RESUME_URL = "/resume.pdf";
