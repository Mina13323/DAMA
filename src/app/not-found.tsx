import Link from "next/link";
import { Home } from "lucide-react";
import "@/app/globals.css";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-sky-soft via-paper to-white text-ink antialiased">
        <main className="flex min-h-screen items-center justify-center px-4 py-24 text-center">
          <div className="max-w-md">
            <span className="eyebrow inline-block rounded-full bg-white/80 px-4 py-1.5 shadow-sm text-deep">
              Error 404
            </span>
            <h1 className="heading-lg mt-6 text-ink">Page Not Found</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              The page you are looking for does not exist or has been relocated.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/en"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ink px-7 text-[13px] font-semibold text-white transition-colors hover:bg-deep-ink"
              >
                <Home aria-hidden className="size-4" />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
