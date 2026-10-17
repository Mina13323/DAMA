import Link from "next/link";
import { Home } from "lucide-react";
import "@/app/globals.css";

export default function RootNotFound() {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.location.pathname.endsWith('/') && window.location.pathname.length > 1) {
                var clean = window.location.pathname.replace(/\\/+$/, '');
                window.location.replace(clean + window.location.search + window.location.hash);
              }
            `,
          }}
        />
      </head>
      <body className="bg-[#FBFBFA] text-[#14171A] antialiased">
        <main className="flex min-h-screen items-center justify-center px-4 py-24 text-center">
          <div className="max-w-md">
            <span className="eyebrow inline-block rounded-full bg-[#FDF2F2] px-4 py-1.5 shadow-xs text-[#C51E28] border border-[#FCA5A5]/60">
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
