"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { getDictionary, isLocale } from "@/content";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const segment = pathname?.split("/")[1] ?? "en";
  const locale = isLocale(segment) ? segment : "en";
  const dict = getDictionary(locale);
  const t = dict.errors.serverError;

  useEffect(() => {
    console.error("[APPLICATION_ERROR]", error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-[#FBFBFA] px-4 py-32">
      <div className="container-x max-w-lg text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-[#FDF2F2] border border-[#FCA5A5]/60 text-[#C51E28]">
          <AlertTriangle aria-hidden className="size-6" />
        </span>

        <p className="mt-6 text-[11px] font-semibold tracking-wider text-[#C51E28] uppercase">{t.eyebrow}</p>

        <h1 className="mt-3 font-serif text-[clamp(2rem,3.5vw,2.75rem)] font-normal text-[#14171A]">
          {t.titleLines.join(" ").replace(/\*/g, "")}
        </h1>

        <p className="mt-4 text-[15px] font-normal leading-relaxed text-[#555E68]">
          {t.body}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#C51E28] px-7 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#9F121A]"
          >
            <RotateCcw aria-hidden className="size-4" />
            <span>{t.retry}</span>
          </button>

          <Link
            href={`/${locale}`}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-[#ECEAE5] bg-white px-7 text-[13px] font-semibold text-[#14171A] shadow-xs transition-colors hover:border-[#C51E28] hover:text-[#C51E28]"
          >
            <Home aria-hidden className="size-4" />
            <span>{t.backHome}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
