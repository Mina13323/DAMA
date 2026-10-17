import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { projects } from "@/content/projects";
import { images } from "@/content/site";
import { stagger } from "../motion/Lines";

/**
 * Featured project. On lg+ every piece is placed in frame units (--u, see
 * globals.css) measured from the reference mockup (section = 44u tall):
 *   text 6.5u · aerial 33 → 96.3u × 4.4 → 41.5u · red card 6.5 → 36.4u × 25.4 → 42u
 *   red tint over the aerial's top-right corner · red shape under its bottom-right corner
 */
export function Projects({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.projects;
  const rawasin = projects.find((p) => p.slug === "rwasin") || projects[0];
  const href = `/${locale}/projects/${rawasin.slug}`;

  return (
    <section
      id="projects"
      aria-labelledby="featured-project-title"
      className="relative isolate overflow-hidden bg-[#F3F2EF] px-4 py-12 sm:px-8 lg:h-[calc(var(--u)*44)] lg:p-0"
    >
      {/* Soft panel behind the copy, and stone arches */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 start-0 end-[calc(var(--u)*10)] -z-10 hidden rounded-ss-[calc(var(--u)*6)] rounded-se-[calc(var(--u)*6)] bg-[#F8F7F5] lg:block" />
      <div aria-hidden className="pointer-events-none absolute -start-[calc(var(--u)*1)] top-[calc(var(--u)*30)] -z-10 hidden h-[calc(var(--u)*14)] w-[calc(var(--u)*4)] rounded-e-full bg-[#E9E7E2] lg:block" />
      <div aria-hidden className="pointer-events-none absolute start-[calc(var(--u)*26)] top-[calc(var(--u)*23)] -z-10 hidden h-[calc(var(--u)*8)] w-[calc(var(--u)*7.8)] rounded-t-full bg-[#DEDCD6] lg:block" />

      {/* Red shape tucked under the aerial's bottom-right corner, bleeding off the edge */}
      <div aria-hidden className="pointer-events-none absolute end-0 top-[calc(var(--u)*29.8)] -z-10 hidden h-[calc(var(--u)*14.2)] w-[calc(var(--u)*10)] rounded-ss-[calc(var(--u)*5)] bg-gradient-to-b from-[#D42430] to-[#B5141E] lg:block" />

      {/* Copy */}
      <div data-reveal="fade" className="relative lg:absolute lg:start-[calc(var(--u)*6.5)] lg:top-[calc(var(--u)*4.6)] lg:w-[calc(var(--u)*24)]">
        <div className="flex items-center gap-4">
          <span className="h-[3px] w-4 rounded-full bg-[#C51E28]" aria-hidden />
          <p className="text-[10.5px] font-normal tracking-[0.34em] text-[#687076] uppercase rtl:tracking-normal">{t.eyebrow}</p>
        </div>

        <h2
          id="featured-project-title"
          className="mt-4 font-display text-[clamp(3rem,calc(var(--u)*5.6),5.75rem)] font-normal leading-none tracking-[-0.015em] text-[#14171A] lg:mt-[calc(var(--u)*1.4)]"
        >
          {t.titleLines[0]}
        </h2>

        <p className="mt-5 max-w-[17rem] text-[13.5px] leading-[1.75] text-[#687076] lg:mt-[calc(var(--u)*1.8)]">{t.body}</p>

        <Link href={href} className="group mt-6 inline-flex items-end gap-6 text-[12px] font-semibold text-[#14171A] lg:mt-[calc(var(--u)*2.2)]">
          <span className="border-b border-[#C51E28]/70 pb-2 transition-colors group-hover:text-[#C51E28]">{t.cta}</span>
          <span className="border-b border-[#C51E28]/40 pb-1.5 text-[#C51E28]">
            <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </span>
        </Link>
      </div>

      {/* Aerial photograph */}
      <div
        data-reveal="card"
        style={stagger(1)}
        className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[28px] rounded-es-[56px] shadow-[0_30px_60px_-30px_rgba(20,23,26,0.4)] lg:absolute lg:start-[calc(var(--u)*33)] lg:top-[calc(var(--u)*4.4)] lg:mt-0 lg:aspect-auto lg:h-[calc(var(--u)*37.1)] lg:w-[calc(var(--u)*63.3)] lg:rounded-[calc(var(--u)*3)] lg:rounded-es-[calc(var(--u)*5)]"
      >
        <Image
          src={images.rawasinAerial}
          alt={rawasin.name}
          fill
          sizes="(min-width: 1024px) calc(var(--u)*64), calc(var(--u)*100)"
          className="object-cover object-center"
        />
      </div>

      {/* Red block tinting the aerial's top-right corner (multiply keeps the photo's detail) */}
      <div aria-hidden className="pointer-events-none absolute end-0 top-0 hidden h-[calc(var(--u)*16.1)] w-[calc(var(--u)*13.5)] rounded-es-[calc(var(--u)*5)] bg-[#C51E28] mix-blend-multiply lg:block" />

      {/* Red metric card: translucent, overlapping the aerial's lower-left corner */}
      <Link
        href={href}
        data-reveal="up"
        style={stagger(2)}
        className="group relative mt-6 flex min-h-[200px] flex-col justify-center overflow-hidden rounded-[28px] p-7 text-white sm:max-w-md lg:absolute lg:start-[calc(var(--u)*6.5)] lg:top-[calc(var(--u)*25.4)] lg:mt-0 lg:h-[calc(var(--u)*16.6)] lg:min-h-0 lg:w-[calc(var(--u)*29.9)] lg:max-w-none lg:rounded-[calc(var(--u)*2.6)] lg:px-[calc(var(--u)*2.6)] lg:py-[calc(var(--u)*2.4)]"
      >
        <span aria-hidden className="absolute inset-0 bg-[#C51E28]/93 transition-colors duration-300 group-hover:bg-[#A8141D]/95" />
        <span className="relative text-[10px] font-medium tracking-[0.3em] text-white/80 uppercase rtl:tracking-normal">
          {t.communityLabel || "A COMMUNITY OF"}
        </span>
        <span className="relative mt-4 flex items-end justify-between gap-6 lg:mt-[calc(var(--u)*1.3)]">
          <span className="max-w-[11em] text-[clamp(1.25rem,calc(var(--u)*1.8),1.75rem)] font-medium uppercase leading-[1.25] tracking-[0.01em]">
            {t.communityUnits || "177 RESIDENTIAL UNITS"}
          </span>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white/85 transition-transform duration-200 group-hover:scale-105 lg:size-[max(44px,calc(var(--u)*4.2))]">
            <ArrowRight aria-hidden className="flip-rtl size-5 lg:size-[max(18px,calc(var(--u)*1.6))]" />
          </span>
        </span>
      </Link>
    </section>
  );
}
