import Image from "next/image";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";
import { stagger } from "../motion/Lines";

export function Values({ dict }: { dict: Dictionary; locale?: Locale }) {
  const t = dict.values;
  const stackedItems = t.stackedItems || ["PEOPLE", "PLACES", "COMMUNITIES", "OPPORTUNITY"];

  return (
    <section id="sustainability" aria-labelledby="commitment-title" className="relative isolate overflow-hidden bg-[#FBFBFA] py-12 sm:py-16 lg:py-20">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: monochrome tree bleeding off the page edge, red sun behind */}
          <div data-reveal="card" className="relative isolate h-72 sm:h-80 lg:col-span-4 lg:-ms-[max(48px,calc((100vw-1240px)/2+48px))] lg:h-[380px]">
            <div
              aria-hidden
              className="absolute end-[8%] top-[6%] -z-10 aspect-square w-[58%] max-w-[260px] rounded-full bg-[#C51E28]"
            />
            <div className="relative h-full w-[88%] overflow-hidden rounded-ee-[140px] [mask-image:linear-gradient(to_left,transparent,black_35%)] rtl:[mask-image:linear-gradient(to_right,transparent,black_35%)]">
              <Image
                src={images.values[0] || images.lifestyle}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center mix-blend-multiply grayscale contrast-125"
              />
            </div>
          </div>

          {/* Center Column: Eyebrow, Headline, Description */}
          <div data-reveal="fade" style={stagger(1)} className="text-center lg:col-span-5">
            <div className="flex items-center justify-center gap-2">
              <span className="h-px w-4 bg-[#C51E28]" aria-hidden />
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#687076] uppercase rtl:tracking-normal">
                {t.eyebrow}
              </p>
            </div>

            <h2
              id="commitment-title"
              className="mt-5 font-display text-[clamp(2rem,3.2vw,3rem)] font-normal leading-[1.12] tracking-tight text-[#14171A]"
            >
              <span className="block">{t.titleLines[0]}</span>
              <span className="mt-1 block italic text-[#C51E28]">
                {t.titleLines[1]?.replace(/\*/g, "")}
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-md text-[14.5px] font-normal leading-relaxed text-[#687076]">
              {t.body}
            </p>
          </div>

          {/* Right Column: stacked pillars in a stone capsule */}
          <div data-reveal="fade" style={stagger(2)} className="lg:col-span-3">
            <div className="mx-auto max-w-[260px] rounded-[40px] bg-[#EDEBE5] px-10 py-12 shadow-xs lg:ms-auto lg:me-0">
              <ul className="flex flex-col gap-5">
                {stackedItems.map((item) => (
                  <li
                    key={item}
                    className="text-[12px] font-semibold tracking-[0.28em] text-[#14171A] uppercase transition-colors hover:text-[#C51E28] rtl:tracking-normal"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <span className="mt-7 block h-0.5 w-7 bg-[#C51E28]" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
