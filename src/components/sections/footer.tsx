"use client";

// Footer: copyright + icon-only channel links, repeated for reachability.
import { useLanguage } from "@/components/providers/language-provider";
import { ChannelLinks } from "@/components/channel-links";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <p className="font-mono">
          © {year} James B. · {t("footer.rights")}
        </p>
        <ChannelLinks withLabels={false} />
      </div>
    </footer>
  );
}
