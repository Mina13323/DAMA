import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content";
import { Lines } from "../motion/Lines";

export function AboutHero({ dict }: { dict: Dictionary }) {
  const t = dict.about.hero;
  return (
    <section aria-labelledby="about-hero-title" className="relative isolate overflow-hidden bg-[#FBFBFA] pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44">
      {/* Decorative ambient atmospheric warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 start-1/2 -z-20 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#FDF2F2]/80 via-white/50 to-transparent blur-3xl rtl:translate-x-1/2"
      />

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Copy Column */}
          <div className="lg:col-span-5">
            {/* Red Eyebrow with leading and trailing dashes */}
            <div className="enter-fade flex items-center gap-2 text-[#C51E28]" style={{ animationDelay: "100ms" }}>
              <span className="h-px w-5 bg-[#C51E28]" aria-hidden />
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase rtl:tracking-normal">
                {t.eyebrow}
              </p>
              <span className="h-px w-5 bg-[#C51E28]" aria-hidden />
            </div>

            <Lines as="h1" id="about-hero-title" mode="enter" lines={t.titleLines} className="mt-6 font-display text-[clamp(2.5rem,4.5vw,4.25rem)] font-normal leading-[1.08] tracking-tight text-[#14171A]" />

            <p className="enter-up mt-6 max-w-lg text-[15px] font-normal leading-relaxed text-[#687076] sm:text-[16.5px]" style={{ animationDelay: "450ms" }}>
              {t.body}
            </p>

            <div className="enter-up mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "600ms" }}>
              <Link
                href="#who-we-are"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#C51E28] px-7 py-3.5 text-[13px] font-semibold tracking-wide text-white shadow-md transition-all duration-200 hover:bg-[#9F121A] hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>{t.cta}</span>
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                  <ArrowRight aria-hidden className="flip-rtl size-3.5" />
                </span>
              </Link>
            </div>
          </div>

          {/* Photograph Column with Signature Red Organic Shapes */}
          <div className="enter-mask relative lg:col-span-7" style={{ animationDelay: "500ms" }}>
            {/* Organic Soft-Stone Backdrop */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 sm:-inset-6 -z-20 rounded-[44px] bg-[#EDEBE5]/70 backdrop-blur-xs"
            />

            {/* Red Accent 1: Flowing Organic Curved Red Arch behind Top-Left Corner */}
            <div
              aria-hidden
              className="pointer-events-none absolute -start-8 -top-8 -z-10 h-72 w-56 sm:h-96 sm:w-68 rounded-t-full rounded-bl-[140px] bg-[#C51E28] shadow-lg transition-transform duration-700 ease-soft"
            />

            {/* Red Accent 2: Semicircle / Vertical Pill peeking from Right Edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute -end-5 top-1/4 -z-10 h-36 w-9 rounded-full bg-[#C51E28] shadow-md"
            />

            {/* Main Architectural Image Card */}
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[32px] sm:rounded-[40px] border border-[#ECEAE5] bg-white shadow-[0_25px_60px_-15px_rgba(20,23,26,0.12)]">
              <Image
                src="/images/dama-twin-residences.png"
                alt={t.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>

        {/* Cohesive Section Navigation Pills */}
        <div className="mt-12 rounded-full border border-[#ECEAE5] bg-white/90 p-2 shadow-xs backdrop-blur-md sm:mt-16 sm:p-2.5">
          <SectionNav dict={dict} />
        </div>
      </div>
    </section>
  );
}

function SectionNav({ dict }: { dict: Dictionary }) {
  return (
    <nav aria-label={dict.about.sectionNav} className="w-full">
      <ol className="no-scrollbar flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {dict.about.hero.nav.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-flex min-h-10 items-center rounded-full border border-transparent bg-[#FBFBFA] px-5 py-2 text-[12px] font-semibold tracking-wider text-[#14171A] uppercase transition-all duration-200 hover:border-[#C51E28] hover:bg-[#FDF2F2] hover:text-[#C51E28] hover:shadow-xs rtl:tracking-normal"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
