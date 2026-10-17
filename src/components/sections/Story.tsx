import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem, Leaf, Users } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";
import { stagger } from "../motion/Lines";

export function Story({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.story;
  const icons = [Leaf, Users, Gem];

  return (
    <section id="about" aria-labelledby="story-title" className="relative bg-[#FBFBFA] py-16 sm:py-24 lg:py-32">
      <div className="container-x">
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Monochromatic Architectural Photo with Red Semicircle Arch */}
          <div data-reveal="card" className="relative flex flex-col lg:col-span-4">
            {/* The Signature Red Semicircle Arch Badge on the Left */}
            <div
              aria-hidden
              className="pointer-events-none absolute -start-5 top-1/3 z-10 h-28 w-14 rounded-e-full bg-[#C51E28] shadow-md rtl:-scale-x-100"
            />

            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[28px] border border-[#ECEAE5] bg-white shadow-xs">
              <Image
                src={images.about.who}
                alt={t.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover grayscale contrast-125 transition-transform duration-[1.2s] ease-soft hover:scale-[1.02]"
              />
            </div>
            {/* Tag Label */}
            <p className="mt-4 text-[10.5px] font-bold tracking-[0.25em] text-[#687076] uppercase">
              {t.tag || "OUR STORY"}
            </p>
          </div>

          {/* Center Column: "The art of living well, together." Editorial Card */}
          <div
            data-reveal="up"
            style={stagger(1)}
            className="flex flex-col justify-between rounded-[32px] border border-[#ECEAE5] bg-white p-8 sm:p-10 lg:col-span-5 lg:p-12 shadow-xs"
          >
            <div>
              {/* Eyebrow with Red Dash */}
              <div className="flex items-center gap-2 text-[#C51E28]">
                <span className="h-px w-4 bg-[#C51E28]" aria-hidden />
                <p className="text-[11px] font-bold tracking-[0.24em] uppercase rtl:tracking-normal">
                  {t.eyebrow}
                </p>
              </div>

              {/* Editorial Title */}
              <h2
                id="story-title"
                className="mt-6 font-display text-[clamp(2.2rem,3.4vw,3.25rem)] font-normal leading-[1.12] tracking-tight text-[#14171A]"
              >
                <span>{t.titleLines[0]} </span>
                <span className="italic text-[#C51E28]">
                  {t.titleLines[1]?.replace(/\*/g, "")}
                </span>
              </h2>

              {/* Body Copy */}
              <p className="mt-6 text-[15px] font-normal leading-relaxed text-[#687076] sm:text-[15.5px]">
                {t.body}
              </p>
            </div>

            {/* Link: More About DAMA */}
            <div className="mt-8 pt-4 border-t border-[#ECEAE5]/60">
              <Link
                href={`/${locale}/about`}
                className="group inline-flex items-center gap-2 text-[13px] font-bold tracking-wide text-[#14171A] transition-colors hover:text-[#C51E28]"
              >
                <span>{t.cta}</span>
                <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 text-[#C51E28]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Top Cutout Photo + 3 Value Pillars with Red Icon Badges */}
          <div data-reveal="fade" style={stagger(2)} className="flex flex-col justify-between gap-6 lg:col-span-3">
            {/* Top Organic Corner Photo */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[32px] rounded-bl-[32px] rounded-br-[8px] border border-[#ECEAE5] bg-white shadow-xs">
              <Image
                src={images.lifestyle}
                alt="Living details"
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-soft hover:scale-105"
              />
            </div>

            {/* 3 Value Items with Red Circular Badges */}
            <ul className="flex flex-col gap-5 pt-2">
              {t.valueCards?.map((card, i) => {
                const Icon = icons[i] || Leaf;
                return (
                  <li key={card.title} className="flex items-center gap-3.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FDF2F2] border border-[#FCA5A5]/60 text-[#C51E28]">
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                    <span className="text-[11px] font-bold tracking-wider text-[#14171A] uppercase">
                      {card.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
