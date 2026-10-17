"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import "@/app/globals.css";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ROOT_APPLICATION_ERROR]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-paper text-ink antialiased">
        <main className="flex min-h-screen items-center justify-center px-4 py-24 text-center">
          <div className="max-w-md">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-red-100 text-red-700">
              <AlertTriangle aria-hidden className="size-7" />
            </span>
            <p className="eyebrow mt-6 text-red-700">Error 500</p>
            <h1 className="heading-lg mt-3 text-ink">Something went wrong</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              An unexpected error occurred while loading this page.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ink px-7 text-[13px] font-semibold text-white transition-colors hover:bg-deep-ink"
              >
                <RotateCcw aria-hidden className="size-4" />
                <span>Try Again</span>
              </button>
              <Link
                href="/en"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line bg-white px-7 text-[13px] font-semibold text-ink shadow-sm transition-colors hover:bg-paper"
              >
                <Home aria-hidden className="size-4" />
                <span>Home</span>
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
