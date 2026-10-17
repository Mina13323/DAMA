"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { ArrowRight, CircleAlert, CircleCheck } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { validateLead, type LeadErrors, type LeadInput } from "@/lib/leads";

type Status = "idle" | "sending" | "success" | "not-configured" | "error";

/**
 * Project inquiry form. Posts to /api/leads, which forwards to the configured
 * CRM/webhook. Success is only shown when the server confirms delivery.
 */
export function InquiryForm({ project, locale, labels }: { project: string; locale: Locale; labels: Dictionary["projectDetail"]["inquiry"] }) {
  const [values, setValues] = useState<LeadInput>({ name: "", email: "", phone: "", message: "", consent: false, project, locale });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const id = useId();

  const set = <K extends keyof LeadInput>(key: K, value: LeadInput[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as keyof LeadErrors]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateLead(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`${id}-${firstInvalid}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const form = new FormData(e.currentTarget);
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: form.get("website") }),
      });
      if (res.ok) {
        setStatus("success");
        setValues((v) => ({ ...v, name: "", email: "", phone: "", message: "", consent: false }));
      } else {
        setStatus(res.status === 503 ? "not-configured" : "error");
      }
    } catch {
      setStatus("error");
    }
  };

  const field = (key: keyof LeadErrors) => ({
    id: `${id}-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${id}-${key}-error` : undefined,
  });
  const input =
    "mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-deep aria-[invalid=true]:border-red-600";
  const error = (key: keyof LeadErrors) =>
    errors[key] && (
      <p id={`${id}-${key}-error`} className="mt-1.5 text-[12.5px] text-red-700">
        {labels.errors[key]}
      </p>
    );
  const labelCls = "text-[13px] font-medium text-ink";

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-name`} className={labelCls}>
          {labels.name}
        </label>
        <input {...field("name")} name="name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} className={input} />
        {error("name")}
      </div>
      <div>
        <label htmlFor={`${id}-email`} className={labelCls}>
          {labels.email}
        </label>
        <input
          {...field("email")}
          type="email"
          name="email"
          autoComplete="email"
          dir="ltr"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          className={input}
        />
        {error("email")}
      </div>
      <div>
        <label htmlFor={`${id}-phone`} className={labelCls}>
          {labels.phone}
        </label>
        <input
          {...field("phone")}
          type="tel"
          name="phone"
          autoComplete="tel"
          dir="ltr"
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
          className={input}
        />
        {error("phone")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className={labelCls}>
          {labels.message} <span className="font-normal text-muted">({labels.optional})</span>
        </label>
        <textarea
          {...field("message")}
          name="message"
          rows={4}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          className={`${input} resize-y`}
        />
        {error("message")}
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-[13px] leading-relaxed text-muted">
          <input
            {...field("consent")}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-ink"
          />
          <span>
            {labels.consent}{" "}
            <Link href={`/${locale}/privacy-policy`} className="text-ink underline underline-offset-4">
              {labels.privacy}
            </Link>
            .
          </span>
        </label>
        {error("consent")}
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-ink px-7 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-deep-ink disabled:opacity-60"
        >
          {status === "sending" ? labels.sending : labels.submit}
          <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </button>
        <div aria-live="polite" role="status" className="text-[13px]">
          {status === "success" && (
            <p className="flex items-center gap-2 text-emerald-700">
              <CircleCheck aria-hidden className="size-4 shrink-0" />
              {labels.success}
            </p>
          )}
          {(status === "error" || status === "not-configured") && (
            <p className="flex items-center gap-2 text-red-700">
              <CircleAlert aria-hidden className="size-4 shrink-0" />
              {status === "not-configured" ? labels.notConfigured : labels.failed}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
