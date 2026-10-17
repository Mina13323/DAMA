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
            {/* The Signature Red Crescent / Semi-Circle Accent resting atop the arch */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-6 start-1/2 z-10 h-16 sm:h-20 w-32 sm:w-40 -translate-x-1/2 rounded-t-full bg-[#C51E28] shadow-md"
            />

            {/* Arch-shaped container */}
            <div className="relative aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-t-full rounded-b-[28px] border border-[#ECEAE5] bg-white shadow-xs">
              <Image
                src={images.values[0] || images.lifestyle}
                alt="Natural foliage and architecture"
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover grayscale contrast-125 object-center transition-transform duration-[1.2s] ease-soft hover:scale-105"
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
              <span className="block">{t.titleLines[0]}</span>
              <span className="block mt-1 italic text-[#C51E28]">
                {t.titleLines[1]?.replace(/\*/g, "")}
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 text-[15px] font-normal leading-relaxed text-[#687076] sm:text-[16px]">
              {t.body}
            </p>
          </div>

          {/* Right Column: Stacked Pillar Labels in Warm Taupe Capsule with Red Dash */}
          <div data-reveal="fade" style={stagger(2)} className="lg:col-span-3">
            <div className="rounded-[36px] border border-[#ECEAE5] bg-[#EDEBE5]/85 p-8 text-center shadow-xs">
              <ul className="flex flex-col gap-5">
                {stackedItems.map((item) => (
                  <li
                    key={item}
                    className="text-[12px] font-bold tracking-[0.28em] text-[#14171A] uppercase transition-colors hover:text-[#C51E28]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              {/* Bottom Red Dash */}
              <div className="mt-6 flex justify-center">
                <span className="h-0.5 w-7 bg-[#C51E28]" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
