import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";
import { stagger } from "../motion/Lines";

export function Lifestyle({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.lifestyle;

  const cards = [
    {
      title: t.cards?.[0]?.title || "Built for Better Living",
      image: images.lifestyle,
      alt: "Lush residential courtyard with walkways and trees",
    },
    {
      title: t.cards?.[1]?.title || "Thoughtful Design",
      image: images.story,
      alt: "Minimalist contemporary residential entrance with warm lighting",
    },
  ];

  return (
    <section id="lifestyle" aria-labelledby="lifestyle-title" className="relative isolate overflow-hidden bg-[#FBFBFA] py-16 sm:py-24 lg:py-32">
      {/* Red Accent: Half-circle peeking from the far-right edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute -end-7 top-1/2 -z-10 h-52 w-16 -translate-y-1/2 rounded-s-full bg-[#C51E28] rtl:-scale-x-100"
      />

      <div className="container-x">
        {/* Split Header */}
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Eyebrow and Headline */}
          <div data-reveal="fade" className="lg:col-span-6">
            <div className="flex items-center gap-2 text-[#C51E28]">
              <span className="h-px w-4 bg-[#C51E28]" aria-hidden />
              <p className="text-[11px] font-bold tracking-[0.24em] uppercase rtl:tracking-normal">
                {t.eyebrow}
              </p>
            </div>

            <h2
              id="lifestyle-title"
              className="mt-5 font-display text-[clamp(2.4rem,4vw,3.75rem)] font-normal leading-[1.12] tracking-tight text-[#14171A]"
            >
              <span>{t.titleLines[0]} </span>
              <span className="italic text-[#C51E28]">
                {t.titleLines[1]?.replace(/\*/g, "")}
              </span>
            </h2>
          </div>

          {/* Right Column: Paragraph and Link */}
          <div data-reveal="fade" style={stagger(1)} className="lg:col-span-6 lg:pb-2">
            <p className="max-w-xl text-[15px] font-normal leading-relaxed text-[#687076] sm:text-[16px]">
              {t.body}
            </p>
            <div className="mt-5">
              <Link
                href={`/${locale}/projects`}
                className="group inline-flex items-center gap-2 text-[13px] font-bold tracking-wide text-[#14171A] transition-colors hover:text-[#C51E28]"
              >
                <span>{t.cta}</span>
                <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 text-[#C51E28]" />
              </Link>
            </div>
          </div>
        </div>

        {/* 2 Large Architectural Showcase Cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:gap-8">
          {cards.map((card, i) => (
            <div
              key={card.title}
              data-reveal="card"
              style={stagger(2 + i)}
              className="group relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[#ECEAE5] bg-white shadow-xs transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-[1.2s] ease-soft group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating Dark Pill Action Overlay */}
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-full bg-[#111417]/90 px-6 py-3 text-white backdrop-blur-md shadow-lg transition-transform duration-300 ease-soft group-hover:-translate-y-1">
                <span className="text-[13px] font-semibold tracking-wide">
                  {card.title}
                </span>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-200 group-hover:bg-[#C51E28]">
                  <ArrowRight aria-hidden className="flip-rtl size-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
