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
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#FBFBFA] px-4 py-32 sm:py-40">
      {/* Decorative red organic arch drop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 end-10 -z-10 h-72 w-52 rounded-t-full rounded-bl-[140px] bg-gradient-to-b from-[#C51E28] to-[#9F121A] opacity-90 hidden sm:block shadow-lg"
      />

      <div className="container-x max-w-xl text-center">
        <p className="inline-block rounded-full border border-[#FCA5A5]/60 bg-[#FDF2F2] px-4 py-1.5 text-[11px] font-semibold tracking-wider text-[#C51E28] uppercase shadow-2xs">
          {t.eyebrow}
        </p>

        <h1 className="mt-6 font-serif text-[clamp(2.5rem,5vw,3.75rem)] font-normal leading-tight text-[#14171A]">
          {t.titleLines.join(" ").replace(/\*/g, "")}
        </h1>

        <p className="mt-5 text-[15.5px] font-normal leading-relaxed text-[#555E68] sm:text-base">
          {t.body}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${locale}`}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#C51E28] px-7 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#9F121A]"
          >
            <Home aria-hidden className="size-4" />
            <span>{t.backHome}</span>
          </Link>

          <Link
            href={`/${locale}/projects`}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-[#ECEAE5] bg-white px-7 text-[13px] font-semibold text-[#14171A] shadow-xs transition-colors hover:border-[#C51E28] hover:text-[#C51E28]"
          >
            <Building2 aria-hidden className="size-4" />
            <span>{t.viewProjects}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
