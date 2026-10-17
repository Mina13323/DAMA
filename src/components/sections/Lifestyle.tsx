import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";
import { splitInTwo } from "@/lib/text";
import { stagger } from "../motion/Lines";

/**
 * Living experience. lg+ geometry is in frame units (--u, see globals.css)
 * measured from the reference mockup: copy starts 6.9u, divider at 47.9u,
 * cards 6.8 → 48.9u and 50.3 → 93u, red dome from 92.4u, faded tree top-right.
 */
export function Lifestyle({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.lifestyle;

  const cards = [
    {
      title: t.cards?.[0]?.title || "Built for Better Living",
      image: images.courtyard,
      alt: "Tree-lined courtyard paths between sand-stone residences",
      position: "object-[50%_55%]",
    },
    {
      title: t.cards?.[1]?.title || "Thoughtful Design",
      image: images.lifestyleEntrance,
      alt: "Stone entrance of building C1 framed by clipped hedges",
      position: "object-center",
    },
  ];

  return (
    <section id="lifestyle" aria-labelledby="lifestyle-title" className="relative isolate overflow-hidden bg-[#F3F2EF] px-4 py-12 sm:px-8 lg:pb-[calc(var(--u)*3.4)] lg:pe-[calc(var(--u)*7)] lg:ps-[calc(var(--u)*6.9)] lg:pt-[calc(var(--u)*4.6)]">
      {/* Background: soft panel, stone arches, faded tree, red dome */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 start-0 end-[calc(var(--u)*22)] -z-10 hidden rounded-ss-[calc(var(--u)*4)] bg-[#F8F7F5] lg:block" />
      <div aria-hidden className="pointer-events-none absolute start-0 top-[calc(var(--u)*18.5)] -z-10 hidden h-[calc(var(--u)*30)] w-[calc(var(--u)*3.6)] rounded-e-full bg-[#E9E7E2] lg:block" />
      <div aria-hidden className="pointer-events-none absolute end-[calc(var(--u)*7)] top-[calc(var(--u)*10.7)] -z-10 hidden h-[calc(var(--u)*16)] w-[calc(var(--u)*16)] rounded-t-full bg-[#E6E4DF] lg:block" />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-[calc(var(--u)*1)] top-0 -z-10 hidden h-[calc(var(--u)*24)] w-[calc(var(--u)*22)] opacity-[0.17] blur-[0.4px] [mask-image:linear-gradient(to_bottom,black_55%,transparent),linear-gradient(to_left,black_60%,transparent)] [mask-composite:intersect] lg:block"
      >
        <Image src={images.lifestyleTree} alt="" fill sizes="calc(var(--u)*22)" className="object-contain object-right-top" />
      </div>
      <div aria-hidden className="pointer-events-none absolute bottom-0 end-0 hidden h-[calc(var(--u)*26)] w-[calc(var(--u)*7.6)] rounded-ss-[calc(var(--u)*6)] bg-gradient-to-b from-[#D42430] to-[#B0141E] lg:block" />

      {/* Header: heading | divider | copy */}
      <div className="grid gap-6 lg:grid-cols-[calc(var(--u)*41)_1px_minmax(0,calc(var(--u)*25))] lg:gap-x-[calc(var(--u)*2.1)]">
        <div data-reveal="fade">
          <div className="flex items-center gap-4">
            <span className="h-[3px] w-4 rounded-full bg-[#C51E28]" aria-hidden />
            <p className="text-[10.5px] font-normal tracking-[0.34em] text-[#687076] uppercase rtl:tracking-normal">{t.eyebrow}</p>
          </div>

          <h2
            id="lifestyle-title"
            className="mt-4 font-display text-[clamp(2.75rem,calc(var(--u)*5.3),5.5rem)] font-normal leading-[1.08] tracking-[-0.015em] text-[#14171A] lg:mt-[calc(var(--u)*2)]"
          >
            <span className="block">{t.titleLines[0]}</span>
            <span className="block">
              {t.titleLines[1]?.split(/(\*[^*]+\*)/).map((part, i) =>
                part.startsWith("*") ? (
                  <span key={i} className="italic text-[#C51E28]">{part.replace(/\*/g, "")}</span>
                ) : (
                  part
                ),
              )}
            </span>
          </h2>
        </div>

        <span aria-hidden className="hidden bg-[#14171A]/12 lg:mt-[calc(var(--u)*1.6)] lg:block" />

        <div data-reveal="fade" style={stagger(1)} className="lg:pt-[calc(var(--u)*1.6)]">
          <p className="max-w-[22rem] text-[13.5px] leading-[1.95] text-[#687076]">{t.body}</p>
          <Link
            href={`/${locale}/projects`}
            className="group mt-5 inline-flex items-end gap-6 text-[12px] font-semibold text-[#14171A] lg:mt-[calc(var(--u)*1.8)]"
          >
            <span className="border-b border-[#C51E28]/70 pb-2 transition-colors group-hover:text-[#C51E28]">{t.cta}</span>
            <span className="border-b border-[#C51E28]/40 pb-1.5 text-[#C51E28]">
              <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </span>
          </Link>
        </div>
      </div>

      {/* Two image cards */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-[calc(var(--u)*3.4)] lg:gap-[calc(var(--u)*1.4)]">
        {cards.map((card, i) => (
          <Link
            key={card.title}
            href={`/${locale}/projects`}
            data-reveal="card"
            style={stagger(2 + i)}
            className="group relative block aspect-[4/3] overflow-hidden rounded-[28px] bg-[#1d1f22] shadow-[0_30px_60px_-30px_rgba(20,23,26,0.45)] lg:aspect-auto lg:h-[calc(var(--u)*29.8)] lg:rounded-[calc(var(--u)*2.6)]"
          >
            <Image
              src={card.image}
              alt={card.alt}
              fill
              sizes="(min-width: 640px) calc(var(--u)*45), calc(var(--u)*100)"
              className={`object-cover ${card.position} transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.04]`}
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 via-45% to-transparent" />

            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 lg:inset-x-[calc(var(--u)*2.6)] lg:bottom-[calc(var(--u)*2.6)]">
              <h3 className="font-display text-[clamp(1.6rem,calc(var(--u)*2.45),2.5rem)] font-normal leading-[1.12] text-white">
                {splitInTwo(card.title).map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </h3>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white/85 text-white transition-colors duration-200 group-hover:border-[#C51E28] group-hover:bg-[#C51E28] lg:size-[max(44px,calc(var(--u)*4.1))]">
                <ArrowRight aria-hidden className="flip-rtl size-5 lg:size-[max(18px,calc(var(--u)*1.5))]" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
