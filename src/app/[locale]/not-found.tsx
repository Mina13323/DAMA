"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Home } from "lucide-react";
import { getDictionary, isLocale } from "@/content";

export default function LocalizedNotFound() {
  const pathname = usePathname();
  const segment = pathname?.split("/")[1] ?? "en";
  const locale = isLocale(segment) ? segment : "en";
  const dict = getDictionary(locale);
  const t = dict.errors.notFound;

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center bg-gradient-to-b from-sky-soft via-paper to-white px-4 py-32 sm:py-40">
      <div className="container-x max-w-xl text-center">
        <p className="eyebrow inline-block rounded-full bg-white/80 px-4 py-1.5 shadow-sm text-deep">
          {t.eyebrow}
        </p>

        <h1 className="heading-xl mt-6 text-ink">
          {t.titleLines.join(" ").replace(/\*/g, "")}
        </h1>

        <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
          {t.body}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${locale}`}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ink px-7 text-[13px] font-semibold text-white transition-colors hover:bg-deep-ink"
          >
            <Home aria-hidden className="size-4" />
            <span>{t.backHome}</span>
          </Link>

          <Link
            href={`/${locale}/projects`}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-ink/20 bg-white px-7 text-[13px] font-semibold text-ink shadow-sm transition-colors hover:bg-ink hover:text-white"
          >
            <Building2 aria-hidden className="size-4" />
            <span>{t.viewProjects}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
