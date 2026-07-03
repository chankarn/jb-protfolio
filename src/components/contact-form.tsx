"use client";

// Contact form: client-side validation (required fields + email format), honeypot,
// loading/success/error states. POSTs to /api/contact (docs/SA_BLUEPRINT.md §3).
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const honeypot = String(data.get("honeypot") ?? "");

    const errors: FieldErrors = {};
    if (!name) errors.name = t("contact.errors.nameRequired");
    if (!EMAIL_RE.test(email)) errors.email = t("contact.errors.emailInvalid");
    if (!message) errors.message = t("contact.errors.messageRequired");
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, honeypot }),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      const body = await res.json().catch(() => null);
      if (res.status === 429) {
        setFormError(t("contact.errors.rateLimited"));
      } else if (body?.error === "validation" && body.fields) {
        setFieldErrors(body.fields as FieldErrors);
      } else {
        setFormError(t("contact.errors.formError"));
      }
      setStatus("idle");
    } catch {
      setFormError(t("contact.errors.formError"));
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 text-[var(--success)]">
        <CheckCircle2 className="size-6" />
        <p className="font-medium">{t("contact.success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Field label={t("contact.name")} htmlFor="cf-name" error={fieldErrors.name}>
        <Input id="cf-name" name="name" type="text" aria-invalid={!!fieldErrors.name} />
      </Field>

      <Field label={t("contact.email")} htmlFor="cf-email" error={fieldErrors.email}>
        <Input id="cf-email" name="email" type="email" aria-invalid={!!fieldErrors.email} />
      </Field>

      <Field label={t("contact.message")} htmlFor="cf-message" error={fieldErrors.message}>
        <Textarea id="cf-message" name="message" rows={4} aria-invalid={!!fieldErrors.message} />
      </Field>

      {/* Honeypot: hidden from real users; bots that fill it are dropped server-side. */}
      <input
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {formError && (
        <p role="alert" className="text-sm text-[var(--error)]">
          {formError}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "sending"}
        className="h-11 rounded-lg px-6 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
      >
        {status === "sending" && <Loader2 className="size-4 animate-spin" />}
        {status === "sending" ? t("contact.sending") : t("contact.send")}
      </Button>

      <p className="text-xs text-muted-foreground">{t("contact.privacyNote")}</p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p className={cn("mt-1 text-xs text-[var(--error)]")}>{error}</p>
      )}
    </div>
  );
}
