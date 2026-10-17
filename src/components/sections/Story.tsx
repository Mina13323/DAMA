import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem, Leaf, Users } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";
import { stagger } from "../motion/Lines";
import { storyGrid, storyRow } from "./layout";

export function Story({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.story;
  const icons = [Leaf, Users, Gem];
  const [tagA, tagB] = (t.tag || "OUR STORY").split(" ");

  return (
    <section id="about" aria-labelledby="story-title" className="relative isolate overflow-hidden bg-[#F3F2EF] pb-10 pt-4 sm:pb-14 lg:pb-16 lg:pt-5">
      <div className={storyRow}>
        <div className={`grid gap-4 lg:min-h-[calc(var(--u)*40)] lg:items-stretch ${storyGrid}`}>
          {/* Left: monochrome courtyard with a translucent red block over its edge */}
          <div data-reveal="card" className="relative min-h-[440px]">
            <div className="absolute inset-y-0 end-0 start-10 overflow-hidden rounded-[14px] rounded-ss-[calc(var(--u)*6.8)] rounded-se-[calc(var(--u)*6)] rounded-es-[calc(var(--u)*9)] bg-[#DCDAD5] lg:start-[calc(var(--u)*2.4)]">
              <Image
                src={images.courtyard}
                alt={t.imageAlt}
                fill
                sizes="(min-width: 1024px) calc(var(--u)*33), calc(var(--u)*100)"
                className="object-cover object-[38%_center] grayscale contrast-[1.15]"
              />
            </div>

            <div aria-hidden className="absolute start-0 top-[22%] h-[43%] w-[39%] rounded-[16px] rounded-se-[calc(var(--u)*5.5)] rounded-es-[calc(var(--u)*3)] bg-[#C51E28]/85 mix-blend-multiply" />
            <div aria-hidden className="absolute start-0 top-[22%] h-[43%] w-[39%] rounded-[16px] rounded-se-[calc(var(--u)*5.5)] rounded-es-[calc(var(--u)*3)] border border-white/55" />

            <div className="absolute bottom-[6%] start-0 text-[9.5px] font-medium leading-[2] tracking-[0.32em] text-[#687076] uppercase rtl:tracking-normal">
              <p>{tagA}</p>
              {tagB && <p>{tagB}</p>}
              <span aria-hidden className="mt-3 block h-[2px] w-6 bg-[#C51E28]" />
            </div>
          </div>

          {/* Center: editorial card */}
          <div
            data-reveal="up"
            style={stagger(1)}
            className="flex flex-col rounded-[32px] rounded-ss-[80px] border border-white/80 bg-[#FAF9F7] px-7 py-10 shadow-[0_24px_50px_-30px_rgba(20,23,26,0.22)] sm:px-12 lg:rounded-[calc(var(--u)*2.6)] lg:rounded-ss-[calc(var(--u)*5.5)] lg:py-[calc(var(--u)*2.8)] lg:ps-[calc(var(--u)*5.2)] lg:pe-[calc(var(--u)*3)]"
          >
            <div className="flex items-center gap-4">
              <span className="h-[3px] w-5 rounded-full bg-[#C51E28]" aria-hidden />
              <p className="text-[10.5px] font-normal tracking-[0.34em] text-[#687076] uppercase rtl:tracking-normal">{t.eyebrow}</p>
            </div>

            <h2
              id="story-title"
              className="mt-[calc(var(--u)*1.6)] font-display text-[clamp(2.5rem,calc(var(--u)*4.7),4.5rem)] font-normal leading-[1.08] tracking-[-0.01em] text-[#14171A]"
            >
              <span className="block">{t.titleLines[0]}</span>
              {t.titleLines[1]?.split(/(\*[^*]+\*)/).map((part, i) =>
                part.startsWith("*") ? (
                  <span key={i} className="block italic text-[#C51E28]">
                    {part.replace(/\*/g, "")}
                  </span>
                ) : (
                  part && <span key={i} className="block">{part.trim()}</span>
                ),
              )}
            </h2>

            <p className="mt-[calc(var(--u)*1.6)] max-w-[27rem] text-[13.5px] leading-[1.95] text-[#687076]">{t.body}</p>

            <Link
              href={`/${locale}/about`}
              className="group mt-auto inline-flex items-end gap-6 self-start pt-8 text-[12px] font-semibold text-[#14171A]"
            >
              <span className="border-b-2 border-[#C51E28] pb-2 transition-colors group-hover:text-[#C51E28]">{t.cta}</span>
              <span className="border-b border-[#C51E28]/40 pb-1.5 text-[#C51E28]">
                <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </span>
            </Link>
          </div>

          {/* Right: card running off the edge — palm detail + value pillars */}
          <div
            data-reveal="fade"
            style={stagger(2)}
            className="flex flex-col overflow-hidden rounded-[32px] border border-white/80 bg-[#FAF9F7] pb-6 shadow-[0_24px_50px_-30px_rgba(20,23,26,0.22)] lg:rounded-e-none lg:rounded-s-[calc(var(--u)*3.6)] lg:border-e-0 lg:pb-[calc(var(--u)*2.4)]"
          >
            <div className="relative ms-10 h-44 shrink-0 overflow-hidden rounded-es-[40px] rounded-ss-[40px] lg:ms-[calc(var(--u)*3)] lg:h-[32%] lg:rounded-es-[calc(var(--u)*3)] lg:rounded-ss-[calc(var(--u)*3)]">
              <Image
                src={images.courtyardPalms}
                alt=""
                fill
                sizes="(min-width: 1024px) calc(var(--u)*20), calc(var(--u)*100)"
                className="object-cover object-center grayscale contrast-[1.1]"
              />
            </div>

            <ul className="mt-auto flex flex-col gap-[calc(var(--u)*1.6)] px-6 pt-10 sm:px-8 lg:ps-[calc(var(--u)*1.8)] lg:pe-4">
              {t.valueCards?.map((card, i) => {
                const Icon = icons[i] || Leaf;
                return (
                  <li key={card.title} className="flex items-center gap-[calc(var(--u)*1.5)] max-lg:gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white text-[#C51E28] shadow-[0_10px_24px_-12px_rgba(20,23,26,0.28)] lg:size-[max(52px,calc(var(--u)*4.6))]">
                      <Icon className="size-5 lg:size-[max(20px,calc(var(--u)*1.7))]" strokeWidth={1.4} />
                    </span>
                    <span className="whitespace-pre-line text-[10.5px] font-bold leading-[1.6] tracking-[0.06em] text-[#14171A] uppercase rtl:tracking-normal">
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
