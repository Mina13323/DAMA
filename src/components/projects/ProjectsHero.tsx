import Image from "next/image";
import type { Dictionary } from "@/content";
import { Lines } from "../motion/Lines";

export function ProjectsHero({ dict, image }: { dict: Dictionary; image: string }) {
  const t = dict.projectsPage.hero;
  return (
    <section aria-labelledby="projects-hero-title" className="relative isolate overflow-hidden bg-[#FBFBFA] pb-12 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
      {/* Decorative ambient atmospheric warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 start-1/2 -z-20 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#FDF2F2]/80 via-white/50 to-transparent blur-3xl rtl:translate-x-1/2"
      />

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            {/* Red Eyebrow with dashes */}
            <div className="enter-fade flex items-center gap-2 text-[#C51E28]" style={{ animationDelay: "100ms" }}>
              <span className="h-px w-5 bg-[#C51E28]" aria-hidden />
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase rtl:tracking-normal">
                {t.eyebrow}
              </p>
              <span className="h-px w-5 bg-[#C51E28]" aria-hidden />
            </div>

            <Lines as="h1" id="projects-hero-title" mode="enter" lines={t.titleLines} className="mt-6 font-display text-[clamp(2.5rem,4.5vw,4.25rem)] font-normal leading-[1.08] tracking-tight text-[#14171A]" />

            <p className="enter-up mt-6 max-w-md text-[15px] font-normal leading-relaxed text-[#687076] sm:text-[16.5px]" style={{ animationDelay: "450ms" }}>
              {t.body}
            </p>
          </div>

          <div className="enter-mask relative lg:col-span-7" style={{ animationDelay: "500ms" }}>
            {/* Soft Organic Backdrop */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 sm:-inset-6 -z-20 rounded-[44px] bg-[#EDEBE5]/70 backdrop-blur-xs"
            />

            {/* Top-Right Red Organic Curved Shape */}
            <div
              aria-hidden
              className="pointer-events-none absolute -end-5 -top-6 -z-10 h-72 w-56 sm:h-80 sm:w-72 rounded-t-full rounded-es-[140px] bg-[#C51E28] shadow-lg transition-transform duration-700 ease-soft"
            />

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[#ECEAE5] bg-white shadow-[0_20px_50px_-15px_rgba(20,23,26,0.12)]">
              <Image
                src={image || "/images/rawasin-aerial-masterplan.jpg"}
                alt={t.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
