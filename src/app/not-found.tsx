import Link from "next/link";
import { Home } from "lucide-react";
import "@/app/globals.css";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="bg-[#FBFBFA] text-[#14171A] antialiased">
        <main className="flex min-h-screen items-center justify-center px-4 py-24 text-center">
          <div className="max-w-md">
            <span className="eyebrow inline-block rounded-full bg-[#FDF2F2] px-4 py-1.5 shadow-xs text-[#C51E28] border border-[#FCA5A5]/60">
              Error 404
            </span>
            <h1 className="heading-lg mt-6 text-[#14171A]">Page Not Found</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-[#687076]">
              The page you are looking for does not exist or has been relocated.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/en/"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#C51E28] px-7 text-[13px] font-semibold text-white transition-colors hover:bg-[#9F121A]"
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
