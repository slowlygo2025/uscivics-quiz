"use client";

import { useId, useState } from "react";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";
import { CONTACT_EMAIL_EXPORT } from "@/lib/site-pages";

export default function ContactForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const formId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [mailtoFallback, setMailtoFallback] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMailtoFallback(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          locale,
          website: honey,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        mailto?: string;
      };
      if (res.ok && data.ok) {
        setStatus("ok");
        setName("");
        setEmail("");
        setMessage("");
        return;
      }
      if (data.mailto) {
        setMailtoFallback(data.mailto);
      }
      setStatus("err");
    } catch {
      setStatus("err");
      setMailtoFallback(
        `mailto:${CONTACT_EMAIL_EXPORT}?subject=${encodeURIComponent("USCivics Quiz contact")}&body=${encodeURIComponent(message)}`
      );
    }
  }

  if (status === "ok") {
    return (
      <p className="mt-6 rounded-[var(--radius)] border border-pass bg-pass-soft px-4 py-3 text-sm font-semibold text-ink">
        {dict.contactFormSuccess}
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 space-y-4 rounded-[var(--radius)] border border-line bg-surface p-4 sm:p-5"
      noValidate
    >
      <p className="text-sm text-muted">{dict.contactFormLead}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-ink">
          {dict.contactFormName}
          <input
            id={`${formId}-name`}
            name="name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-[var(--radius)] border border-line bg-paper px-3 py-2.5 text-base font-normal text-ink outline-none focus:border-signal"
          />
        </label>
        <label className="block text-sm font-semibold text-ink">
          {dict.contactFormEmail}
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-[var(--radius)] border border-line bg-paper px-3 py-2.5 text-base font-normal text-ink outline-none focus:border-signal"
          />
        </label>
      </div>
      <label className="block text-sm font-semibold text-ink">
        {dict.contactFormMessage}
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full resize-y rounded-[var(--radius)] border border-line bg-paper px-3 py-2.5 text-base font-normal text-ink outline-none focus:border-signal"
        />
      </label>
      {/* Honeypot */}
      <label className="sr-only" aria-hidden>
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
        />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="gw-btn gw-btn-primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? dict.contactFormSending : dict.contactFormSubmit}
        </button>
        <a
          href={`mailto:${CONTACT_EMAIL_EXPORT}`}
          className="text-sm font-semibold text-signal underline-offset-2 hover:underline"
        >
          {CONTACT_EMAIL_EXPORT}
        </a>
      </div>
      {status === "err" ? (
        <p className="text-sm text-miss" role="alert">
          {dict.contactFormError}{" "}
          {mailtoFallback ? (
            <a
              href={mailtoFallback}
              className="font-semibold underline underline-offset-2"
            >
              {dict.contactFormFallback}
            </a>
          ) : null}
        </p>
      ) : null}
    </form>
  );
}
