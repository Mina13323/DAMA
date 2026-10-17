"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getDictionary, isLocale } from "@/content";

/** Styled 404 for unknown project slugs, inside the localized layout. */
export default function ProjectNotFound() {
  const segment = usePathname()?.split("/")[1] ?? "en";
  const locale = isLocale(segment) ? segment : "en";
  const t = getDictionary(locale).projectDetail.notFound;

  return (
    <section className="bg-gradient-to-b from-sky-soft to-white pb-28 pt-40">
      <div className="container-x max-w-xl">
        <p className="eyebrow">404</p>
        <h1 className="heading-lg mt-4 text-ink">{t.title}</h1>
        <p className="mt-5 text-[15px] leading-relaxed text-muted">{t.body}</p>
        <Link
          href={`/${locale}/projects`}
          className="mt-8 inline-flex min-h-11 items-center gap-3 rounded-full bg-ink px-6 text-[13px] font-semibold text-white"
        >
          <ArrowLeft aria-hidden className="flip-rtl size-4" />
          {t.cta}
        </Link>
      </div>
    </section>
  );
}
