"use client";

// Contact: form on the left, direct channels + resume download on the right
// (stacks on mobile). Both the form and direct links are shown, per confirmed scope.
import { Download } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { ContactForm } from "@/components/contact-form";
import { ChannelLinks } from "@/components/channel-links";
import { RESUME_URL } from "@/content/contact";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="border-t border-border py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-3xl font-bold">{t("contact.heading")}</h2>
          <p className="mb-6 text-muted-foreground">{t("contact.subtitle")}</p>
          <ContactForm />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">
            {t("contact.directChannels")}
          </h3>
          <ChannelLinks />

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary"
          >
            <Download className="size-4" />
            {t("contact.downloadResume")}
          </a>
        </div>
      </div>
    </section>
  );
}
