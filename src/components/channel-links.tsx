"use client";

// Renders the direct contact channels (email, LinkedIn, GitHub). Used with labels
// in the Contact section and as icon-only in the Footer.
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { channels, type ChannelIcon } from "@/content/contact";
import { cn } from "@/lib/utils";

const ICONS: Record<ChannelIcon, React.ComponentType<{ className?: string }>> = {
  mail: Mail,
  linkedin: LinkedinIcon,
  github: GithubIcon,
};

export function ChannelLinks({ withLabels = true }: { withLabels?: boolean }) {
  return (
    <div className={cn(withLabels ? "space-y-3" : "flex gap-4")}>
      {channels.map((channel) => {
        const Icon = ICONS[channel.icon];
        const external = !channel.href.startsWith("mailto:");
        return (
          <a
            key={channel.label}
            href={channel.href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={cn(
              "inline-flex min-h-11 items-center gap-3 rounded-lg transition-colors hover:text-primary",
              withLabels && "px-1"
            )}
            aria-label={channel.label}
          >
            <Icon className="size-5" />
            {withLabels && (
              <span className="text-sm font-medium">{channel.label}</span>
            )}
          </a>
        );
      })}
    </div>
  );
}
