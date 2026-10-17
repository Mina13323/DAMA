import Image from "next/image";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";
import { stagger } from "../motion/Lines";

export function Values({ dict }: { dict: Dictionary; locale?: Locale }) {
  const t = dict.values;
  const stackedItems = t.stackedItems || ["PEOPLE", "PLACES", "COMMUNITIES", "OPPORTUNITY"];

  return (
    <section id="sustainability" aria-labelledby="commitment-title" className="relative bg-[#FBFBFA] py-16 sm:py-24 lg:py-32">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Left Column: Nature Arch Photo with Red Quarter-Circle Crescent Accent */}
          <div data-reveal="card" className="relative flex justify-center lg:col-span-4">
            {/* The Signature Red Crescent / Semi-Circle Accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-5 end-6 sm:end-12 z-10 size-24 sm:size-28 rounded-tr-full rounded-tl-full bg-[#C51E28] shadow-md rtl:-scale-x-100"
            />

            {/* Arch-shaped container */}
            <div className="relative aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-t-full rounded-b-[24px] border border-[#ECEAE5] bg-white shadow-xs">
              <Image
                src={images.values[0] || images.lifestyle}
                alt="Natural foliage and architecture"
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover object-center transition-transform duration-[1.2s] ease-soft hover:scale-105"
              />
            </div>
          </div>

          {/* Center Column: Eyebrow, Headline, Description */}
          <div data-reveal="fade" style={stagger(1)} className="lg:col-span-5">
            {/* Red Eyebrow with Dash */}
            <div className="flex items-center gap-2 text-[#C51E28]">
              <span className="h-px w-4 bg-[#C51E28]" aria-hidden />
              <p className="text-[11px] font-bold tracking-[0.24em] uppercase rtl:tracking-normal">
                {t.eyebrow}
              </p>
            </div>

            {/* Headline with Red Italic Accent */}
            <h2
              id="commitment-title"
              className="mt-5 font-display text-[clamp(2.2rem,3.5vw,3.25rem)] font-normal leading-[1.14] tracking-tight text-[#14171A]"
            >
              <span>{t.titleLines[0]} </span>
              <span className="block mt-1 italic text-[#C51E28]">
                {t.titleLines[1]?.replace(/\*/g, "")}
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 text-[15px] font-normal leading-relaxed text-[#687076] sm:text-[16px]">
              {t.body}
            </p>
          </div>

          {/* Right Column: Stacked Pillar Labels with Clean Dividing Rules */}
          <div data-reveal="fade" style={stagger(2)} className="lg:col-span-3">
            <div className="rounded-[24px] border border-[#ECEAE5] bg-white p-6 sm:p-8 shadow-2xs">
              <ul className="flex flex-col divide-y divide-[#ECEAE5]">
                {stackedItems.map((item, idx) => (
                  <li
                    key={item}
                    className={`py-4 text-[11.5px] font-bold tracking-[0.26em] text-[#14171A] uppercase transition-colors hover:text-[#C51E28] ${
                      idx === 0 ? "pt-0" : ""
                    } ${idx === stackedItems.length - 1 ? "pb-0" : ""}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
