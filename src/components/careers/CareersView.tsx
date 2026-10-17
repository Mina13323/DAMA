"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  CircleAlert,
  CircleCheck,
  Compass,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { careerPillars, careerPositions, type CareerPosition } from "@/content/careers";
import { stagger } from "../motion/Lines";
import { validateLead, type LeadErrors, type LeadInput } from "@/lib/leads";

const pillarIcons = [Compass, Sparkles, HeartHandshake, GraduationCap];

export function CareersView({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Dictionary["careersPage"];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState<LeadInput>({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    message: "",
    consent: false,
    project: "careers",
    position: "",
    locale,
  });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formId = useId();

  const openApply = (role?: CareerPosition) => {
    setValues((v) => ({
      ...v,
      position: role ? role.copy[locale].title : labels.applyModal.generalRole,
    }));
    setModalOpen(true);
  };

  const closeApply = () => {
    setModalOpen(false);
    setStatus("idle");
    setErrors({});
  };

  const set = <K extends keyof LeadInput>(key: K, value: LeadInput[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as keyof LeadErrors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateLead(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`${formId}-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const form = new FormData(e.currentTarget);
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          project: "careers",
          subject: values.position || "General Career Application",
          website: form.get("website"),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setValues((v) => ({
          ...v,
          name: "",
          email: "",
          phone: "",
          portfolio: "",
          message: "",
          consent: false,
        }));
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "mt-2 block w-full rounded-2xl border border-[#ECEAE5] bg-[#FBFBFA] px-4 py-3 text-[14.5px] text-[#14171A] outline-none transition-all duration-200 placeholder:text-[#8C939B]/70 focus:border-[#C51E28] focus:bg-white focus:ring-1 focus:ring-[#C51E28] aria-[invalid=true]:border-[#C51E28]";
  const errorCls = (key: keyof LeadErrors) =>
    errors[key] && (
      <p id={`${formId}-${key}-error`} className="mt-1.5 text-[12.5px] text-[#C51E28]">
        Please fill out this field correctly.
      </p>
    );

  const pillars = careerPillars[locale];

  return (
    <div className="pb-24 sm:pb-32">
      {/* Culture & Pillars Section */}
      <section aria-labelledby="careers-culture-title" className="container-x pb-20 sm:pb-28">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-4 rounded-full bg-[#C51E28]" aria-hidden />
            <p className="text-[10.5px] font-medium tracking-[0.28em] text-[#687076] uppercase rtl:tracking-normal">
              {labels.culture.eyebrow}
            </p>
          </div>
          <h2 id="careers-culture-title" className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.25rem)] font-normal leading-tight text-[#14171A]">
            {labels.culture.titleLines.join(" ")}
          </h2>
          <p className="mt-4 text-[15.5px] font-normal leading-relaxed text-[#555E68]">
            {labels.culture.body}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => {
            const Icon = pillarIcons[i % pillarIcons.length];
            return (
              <div
                key={pillar.title}
                data-reveal="card"
                style={stagger(i)}
                className="group rounded-[28px] border border-[#ECEAE5] bg-white p-7 shadow-xs transition-all hover:border-[#C51E28]/40 hover:shadow-lg"
              >
                <span className="flex size-12 items-center justify-center rounded-full border border-[#C51E28]/35 bg-[#FDF2F2] text-[#C51E28] transition-transform group-hover:scale-105">
                  <Icon aria-hidden strokeWidth={1.8} className="size-5" />
                </span>
                <h3 className="mt-5 font-serif text-[19px] font-normal leading-tight text-[#14171A]">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] font-normal leading-relaxed text-[#555E68]">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" aria-labelledby="careers-positions-title" className="border-t border-[#ECEAE5] bg-[#FBFBFA] py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-4 rounded-full bg-[#C51E28]" aria-hidden />
                <p className="text-[10.5px] font-medium tracking-[0.28em] text-[#687076] uppercase rtl:tracking-normal">
                  {labels.positions.eyebrow}
                </p>
              </div>
              <h2 id="careers-positions-title" className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.25rem)] font-normal leading-tight text-[#14171A]">
                {labels.positions.titleLines.join(" ")}
              </h2>
              <p className="mt-4 text-[15.5px] font-normal leading-relaxed text-[#555E68]">
                {labels.positions.body}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openApply()}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#ECEAE5] bg-white px-7 text-[13px] font-semibold text-[#14171A] shadow-xs transition-colors hover:border-[#C51E28] hover:text-[#C51E28]"
            >
              <span>{labels.applyModal.generalRole}</span>
              <ArrowRight aria-hidden className="flip-rtl size-4" />
            </button>
          </div>

          <div className="mt-12 space-y-6">
            {careerPositions.map((pos, idx) => {
              const copy = pos.copy[locale];
              return (
                <div
                  key={pos.slug}
                  data-reveal="card"
                  style={stagger(idx)}
                  className="rounded-[28px] border border-[#ECEAE5] bg-white p-7 sm:p-10 shadow-xs transition-all hover:border-[#C51E28]/40 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-full bg-[#FDF2F2] border border-[#FCA5A5]/60 px-3.5 py-1 text-[11px] font-semibold text-[#C51E28]">
                          {copy.department}
                        </span>
                        <span className="flex items-center gap-1 text-[12px] text-[#687076]">
                          <MapPin aria-hidden className="size-3.5 text-[#C51E28]" />
                          <span>{copy.location}</span>
                        </span>
                        <span className="flex items-center gap-1 text-[12px] text-[#687076]">
                          <Briefcase aria-hidden className="size-3.5 text-[#C51E28]" />
                          <span>{copy.type}</span>
                        </span>
                      </div>

                      <h3 className="mt-4 font-serif text-2xl font-normal text-[#14171A]">
                        {copy.title}
                      </h3>

                      <p className="mt-3 max-w-2xl text-[14.5px] font-normal leading-relaxed text-[#555E68]">
                        {copy.summary}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <button
                        type="button"
                        onClick={() => openApply(pos)}
                        className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#C51E28] px-7 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#9F121A] hover:shadow-md"
                      >
                        <span>{labels.positions.applyForRole}</span>
                        <ArrowRight aria-hidden className="flip-rtl size-4" />
                      </button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="mt-8 grid gap-8 border-t border-[#ECEAE5] pt-8 md:grid-cols-2">
                    <div>
                      <h4 className="text-[12px] font-semibold tracking-wider text-[#14171A] uppercase">
                        {labels.positions.responsibilities}
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {copy.responsibilities.map((item, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2.5 text-[13.5px] text-[#555E68] leading-relaxed">
                            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[#C51E28]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[12px] font-semibold tracking-wider text-[#14171A] uppercase">
                        {labels.positions.qualifications}
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {copy.qualifications.map((item, qIdx) => (
                          <li key={qIdx} className="flex items-start gap-2.5 text-[13.5px] text-[#555E68] leading-relaxed">
                            <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-[#C51E28]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${formId}-modal-title`}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/75 backdrop-blur-sm"
            onClick={closeApply}
          />

          {/* Modal Card */}
          <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[32px] bg-white p-7 sm:p-10 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-[2px] w-4 rounded-full bg-[#C51E28]" aria-hidden />
                  <p className="text-[10.5px] font-medium tracking-[0.24em] text-[#C51E28] uppercase rtl:tracking-normal">
                    {labels.applyModal.eyebrow}
                  </p>
                </div>
                <h3 id={`${formId}-modal-title`} className="mt-2 font-serif text-2xl font-normal text-[#14171A]">
                  {values.position || labels.applyModal.titleLines.join(" ")}
                </h3>
                <p className="mt-2 text-[14px] text-[#555E68]">
                  {labels.applyModal.body}
                </p>
              </div>
              <button
                type="button"
                onClick={closeApply}
                aria-label="Close modal"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-[#ECEAE5] text-[#14171A] transition-colors hover:border-[#C51E28] hover:text-[#C51E28]"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>

            <form noValidate onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor={`${formId}-position`} className="text-[13px] font-semibold text-[#14171A]">
                  {labels.applyModal.roleLabel}
                </label>
                <input
                  id={`${formId}-position`}
                  name="position"
                  type="text"
                  value={values.position}
                  onChange={(e) => set("position", e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor={`${formId}-name`} className="text-[13px] font-semibold text-[#14171A]">
                  {labels.applyModal.name}
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={inputCls}
                />
                {errorCls("name")}
              </div>

              <div>
                <label htmlFor={`${formId}-email`} className="text-[13px] font-semibold text-[#14171A]">
                  {labels.applyModal.email}
                </label>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  dir="ltr"
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputCls}
                />
                {errorCls("email")}
              </div>

              <div>
                <label htmlFor={`${formId}-phone`} className="text-[13px] font-semibold text-[#14171A]">
                  {labels.applyModal.phone}
                </label>
                <input
                  id={`${formId}-phone`}
                  name="phone"
                  type="tel"
                  dir="ltr"
                  value={values.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={inputCls}
                />
                {errorCls("phone")}
              </div>

              <div>
                <label htmlFor={`${formId}-portfolio`} className="text-[13px] font-semibold text-[#14171A]">
                  {labels.applyModal.portfolio}
                </label>
                <input
                  id={`${formId}-portfolio`}
                  name="portfolio"
                  type="url"
                  dir="ltr"
                  placeholder="https://..."
                  value={values.portfolio}
                  onChange={(e) => set("portfolio", e.target.value)}
                  className={inputCls}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${formId}-message`} className="text-[13px] font-semibold text-[#14171A]">
                  {labels.applyModal.message}
                </label>
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                  className={`${inputCls} resize-y`}
                />
                {errorCls("message")}
              </div>

              {/* Honeypot */}
              <div aria-hidden className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Website
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-[13px] leading-relaxed text-[#687076]">
                  <input
                    type="checkbox"
                    checked={values.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-0.5 size-5 shrink-0 accent-[#C51E28]"
                  />
                  <span>
                    {labels.applyModal.consent}{" "}
                    <Link href={`/${locale}/privacy-policy`} className="text-[#C51E28] underline underline-offset-4 font-medium">
                      {labels.applyModal.privacy}
                    </Link>
                    .
                  </span>
                </label>
                {errorCls("consent")}
              </div>

              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#C51E28] px-8 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#9F121A] disabled:opacity-60"
                >
                  {status === "sending" ? labels.applyModal.sending : labels.applyModal.submit}
                  <ArrowRight aria-hidden className="flip-rtl size-4" />
                </button>

                <div aria-live="polite" role="status" className="text-[13px]">
                  {status === "success" && (
                    <p className="flex items-center gap-2 text-emerald-700">
                      <CircleCheck aria-hidden className="size-4 shrink-0" />
                      {labels.applyModal.success}
                    </p>
                  )}
                  {status === "error" && (
                    <p className="flex items-center gap-2 text-red-700">
                      <CircleAlert aria-hidden className="size-4 shrink-0" />
                      {labels.applyModal.failed}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
