import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { projects } from "@/content/projects";
import { images } from "@/content/site";
import { stagger } from "../motion/Lines";

export function Projects({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.projects;
  const rawasin = projects.find((p) => p.slug === "rwasin") || projects[0];

  return (
    <section id="projects" aria-labelledby="featured-project-title" className="relative isolate overflow-hidden bg-[#FBFBFA] py-12 sm:py-16 lg:py-20">
      {/* Soft stone arches behind the copy */}
      <div aria-hidden className="pointer-events-none absolute -start-16 top-10 -z-10 hidden h-[80%] w-72 rounded-t-full bg-[#F1EFEA] lg:block" />
      <div aria-hidden className="pointer-events-none absolute start-[30%] bottom-0 -z-10 hidden h-48 w-32 rounded-t-full border border-[#E6E3DC] lg:block" />

      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Eyebrow, Title, Description */}
          <div data-reveal="fade" className="relative z-10 lg:col-span-4">
            <div className="flex items-center gap-2 text-[#C51E28]">
              <span className="h-px w-4 bg-[#C51E28]" aria-hidden />
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#687076] uppercase rtl:tracking-normal">
                {t.eyebrow}
              </p>
            </div>

            <h2
              id="featured-project-title"
              className="mt-5 font-display text-[clamp(2.75rem,4.8vw,4.5rem)] font-normal leading-none tracking-tight text-[#14171A]"
            >
              {t.titleLines[0]}
            </h2>

            <p className="mt-5 max-w-xs text-[15px] font-normal leading-relaxed text-[#687076]">
              {t.body}
            </p>

            <div className="mt-6">
              <Link
                href={`/${locale}/projects/${rawasin.slug}`}
                className="group inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-wide text-[#14171A] transition-colors hover:text-[#C51E28]"
              >
                <span>{t.cta}</span>
                <ArrowRight aria-hidden className="flip-rtl size-4 text-[#C51E28] transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>

            {/* Red metric card: overlaps the image on large screens */}
            <Link
              href={`/${locale}/projects/${rawasin.slug}`}
              data-reveal="up"
              style={stagger(2)}
              className="group relative mt-10 flex max-w-sm items-end justify-between gap-6 rounded-[28px] rounded-ee-[56px] bg-[#C51E28] p-7 text-white shadow-[0_20px_40px_-12px_rgba(197,30,40,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9F121A] lg:-me-24 lg:max-w-none"
            >
              <div>
                <p className="text-[10px] font-bold tracking-[0.24em] text-white/80 uppercase">
                  {t.communityLabel || "A COMMUNITY OF"}
                </p>
                <p className="mt-2 text-[22px] font-semibold uppercase leading-tight tracking-wide text-white sm:text-[24px]">
                  {t.communityUnits || "177 RESIDENTIAL UNITS"}
                </p>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/70 text-white transition-transform duration-200 group-hover:scale-110">
                <ArrowRight aria-hidden className="flip-rtl size-4.5" />
              </span>
            </Link>
          </div>

          {/* Right Column: wide aerial photograph bleeding to the page edge */}
          <div data-reveal="card" style={stagger(1)} className="relative lg:col-span-8 lg:-me-[max(48px,calc((100vw-1240px)/2+48px))]">
            {/* Red organic corner shapes */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-6 end-0 -z-10 h-48 w-40 rounded-ss-[96px] bg-[#C51E28] sm:w-56"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 end-0 -z-10 h-32 w-24 rounded-es-[64px] bg-[#C51E28] sm:w-32"
            />

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] shadow-[0_20px_50px_-15px_rgba(20,23,26,0.18)] sm:rounded-[36px] lg:w-[calc(100%-2.5rem)] lg:rounded-ss-[120px]">
              <Image
                src={images.featured}
                alt={rawasin.name}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover object-center transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
