import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { projects } from "@/content/projects";
import { stagger } from "../motion/Lines";

export function Projects({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.projects;
  const rawasin = projects.find((p) => p.slug === "rwasin") || projects[0];

  return (
    <section id="projects" aria-labelledby="featured-project-title" className="relative bg-[#FBFBFA] py-16 sm:py-24 lg:py-32">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: Eyebrow, Title, Description, and Red Floating Stat Card */}
          <div data-reveal="fade" className="lg:col-span-5 xl:col-span-5">
            {/* Eyebrow with Red Dash */}
            <div className="flex items-center gap-2 text-[#C51E28]">
              <span className="h-px w-4 bg-[#C51E28]" aria-hidden />
              <p className="text-[11px] font-bold tracking-[0.24em] uppercase rtl:tracking-normal">
                {t.eyebrow}
              </p>
            </div>

            {/* Display Headline */}
            <h2
              id="featured-project-title"
              className="mt-5 font-display text-[clamp(2.75rem,4.5vw,4.25rem)] font-normal tracking-tight text-[#14171A] leading-tight"
            >
              {t.titleLines[0]}
            </h2>

            {/* Subtitle Description */}
            <p className="mt-5 text-[15px] font-normal leading-relaxed text-[#687076] sm:text-[16px]">
              {t.body}
            </p>

            {/* Explore Project Link */}
            <div className="mt-6">
              <Link
                href={`/${locale}/projects/${rawasin.slug}`}
                className="group inline-flex items-center gap-2.5 text-[13.5px] font-bold tracking-wide text-[#14171A] transition-colors hover:text-[#C51E28]"
              >
                <span>{t.cta}</span>
                <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 text-[#C51E28]" />
              </Link>
            </div>

            {/* Red Floating Metric Card: 177 Residential Units */}
            <Link
              href={`/${locale}/projects/${rawasin.slug}`}
              data-reveal="up"
              style={stagger(2)}
              className="group relative mt-10 block max-w-sm overflow-hidden rounded-[24px] bg-[#C51E28] p-6 text-white shadow-xl transition-all duration-300 hover:bg-[#9F121A] hover:shadow-2xl hover:-translate-y-0.5"
            >
              <p className="text-[10px] font-bold tracking-[0.24em] text-white/80 uppercase">
                {t.communityLabel || "A COMMUNITY OF"}
              </p>
              <p className="mt-2 font-display text-[26px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
                {t.communityUnits || "177 RESIDENTIAL UNITS"}
              </p>

              {/* Bottom Right Circular Arrow */}
              <div className="mt-5 flex justify-end">
                <span className="flex size-10 items-center justify-center rounded-full border border-white/60 text-white transition-transform duration-200 group-hover:scale-110">
                  <ArrowRight aria-hidden className="flip-rtl size-4.5" />
                </span>
              </div>
            </Link>
          </div>

          {/* Right Column: Wide Aerial Community Photograph with Top-Right Red Organic Shape */}
          <div data-reveal="card" style={stagger(1)} className="relative lg:col-span-7 xl:col-span-7">
            {/* The Bold Red Organic Curved Accent Shape on Top-Right */}
            <div
              aria-hidden
              className="pointer-events-none absolute -end-6 -top-8 -z-10 h-72 w-56 sm:h-80 sm:w-72 rounded-t-full rounded-es-[140px] bg-[#C51E28] transition-transform duration-700 ease-soft"
            />

            {/* Main Community Photo Card */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full overflow-hidden rounded-[32px] sm:rounded-[40px] border border-[#ECEAE5] bg-white shadow-[0_20px_50px_-15px_rgba(20,23,26,0.12)]">
              <Image
                src={rawasin.image}
                alt={rawasin.name}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-center transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
