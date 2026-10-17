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
    <section className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-sky-soft/40 to-white px-4 py-32">
      <div className="container-x max-w-lg text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-red-100 text-red-700">
          <AlertTriangle aria-hidden className="size-7" />
        </span>

        <p className="eyebrow mt-6 text-red-700">{t.eyebrow}</p>

        <h1 className="heading-lg mt-3 text-ink">
          {t.titleLines.join(" ").replace(/\*/g, "")}
        </h1>

        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          {t.body}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ink px-7 text-[13px] font-semibold text-white transition-colors hover:bg-deep-ink"
          >
            <RotateCcw aria-hidden className="size-4" />
            <span>{t.retry}</span>
          </button>

          <Link
            href={`/${locale}`}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line bg-white px-7 text-[13px] font-semibold text-ink shadow-sm transition-colors hover:bg-paper"
          >
            <Home aria-hidden className="size-4" />
            <span>{t.backHome}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
