"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";

/** Splits a phrase into two lines of roughly equal length. */
function splitInTwo(text: string): [string, string] {
  const words = text.split(" ");
  let best = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    // Never leave a short word ("a", "of") dangling at the end of the first line.
    if (words[i - 1].length <= 2) continue;
    const diff = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (diff < bestDiff) [best, bestDiff] = [i, diff];
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.hero;
  const slides = images.heroSlides;
  const [active, setActive] = useState(0);
  const [eyebrowA, eyebrowB] = splitInTwo(t.eyebrow);

  const go = (step: number) => setActive((i) => (i + step + slides.length) % slides.length);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-[#F3F2EF] pb-10 pt-24 lg:pb-14 lg:pt-28">
      {/* Background: soft stone arches */}
      <div aria-hidden className="pointer-events-none absolute -start-16 top-[52%] -z-10 hidden h-[420px] w-40 rounded-e-[80px] bg-[#ECEAE6] lg:block" />
      <div aria-hidden className="pointer-events-none absolute end-0 top-[38%] -z-10 hidden h-[340px] w-[150px] rounded-s-[90px] bg-[#E8E6E1] lg:block" />

      {/* Red leaf bleeding off the right edge */}
      <div aria-hidden className="pointer-events-none absolute end-0 top-[44%] z-0 hidden h-[300px] w-[72px] rounded-ss-[64px] rounded-es-[28px] bg-gradient-to-b from-[#D42430] to-[#B0141E] lg:block xl:w-[84px]" />

      <div className="container-x">
        <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-0">
          {/* Left: white text panel */}
          <div className="relative z-0 lg:col-span-5 lg:mt-24 lg:-me-24 xl:-me-28">
            <div className="enter-up rounded-[36px] bg-[#FBFBFA] px-6 py-10 shadow-[0_30px_60px_-30px_rgba(20,23,26,0.12)] sm:px-10 lg:-ms-10 lg:h-full lg:rounded-[48px] lg:pe-36 lg:ps-10 lg:py-11 xl:pe-40">
              {/* Two-line eyebrow with red dashes */}
              <div className="text-[11px] font-semibold tracking-[0.24em] text-[#14171A]/75 uppercase rtl:tracking-normal" style={{ animationDelay: "100ms" }}>
                <p className="flex items-center gap-3">
                  <span className="h-[3px] w-5 rounded-full bg-[#C51E28]" aria-hidden />
                  {eyebrowA}
                </p>
                <p className="mt-2 flex items-center gap-3">
                  {eyebrowB}
                  <span className="h-px w-5 bg-[#C51E28]" aria-hidden />
                </p>
              </div>

              <h1
                id="hero-title"
                className="enter-line mt-6 font-display text-[clamp(3rem,5.6vw,5.4rem)] font-normal leading-[0.98] tracking-tight text-[#14171A]"
                style={{ animationDelay: "200ms" }}
              >
                {locale === "ar" ? (
                  <>
                    <span className="block">{t.titleLines[0]}</span>
                    <span className="mt-2 block italic text-[#C51E28]">{t.titleLines[1].replace(/\*/g, "")}</span>
                  </>
                ) : (
                  <>
                    <span className="block">Elevated</span>
                    <span className="block">living.</span>
                    <span className="block italic text-[#C51E28]">Designed</span>
                    <span className="block italic text-[#C51E28]">to belong.</span>
                  </>
                )}
              </h1>

              <p className="enter-up mt-6 max-w-[22rem] text-[15px] leading-relaxed text-[#687076]" style={{ animationDelay: "380ms" }}>
                {t.body}
              </p>

              <div className="enter-up mt-8 flex flex-wrap items-center gap-x-7 gap-y-4" style={{ animationDelay: "500ms" }}>
                <Link
                  href={`/${locale}/projects`}
                  className="group inline-flex min-h-13 items-center gap-4 rounded-full bg-[#C51E28] px-8 py-4 text-[13px] font-medium text-white shadow-[0_14px_28px_-12px_rgba(197,30,40,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9F121A]"
                >
                  <span>{t.cta}</span>
                  <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>

                <Link href={`/${locale}/about`} className="group inline-flex items-center gap-4 text-[13px] font-semibold text-[#14171A]">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-[#14171A]/80 transition-colors group-hover:border-[#C51E28] group-hover:text-[#C51E28]">
                    <Play aria-hidden className="size-4 translate-x-px fill-current" />
                  </span>
                  <span className="border-b border-[#C51E28]/60 pb-1 transition-colors group-hover:text-[#C51E28]">{t.secondary}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: building image framed by red and stone shapes */}
          <div className="relative z-10 lg:col-span-7 lg:me-[calc(96px-max(48px,(100vw-1240px)/2+48px))]">
            {/* Vertical badge */}
            <div className="absolute end-0 top-6 z-20 hidden items-start gap-4 lg:flex">
              <span className="h-16 w-[2px] bg-[#C51E28]" aria-hidden />
              <ul className="text-[9.5px] font-semibold leading-[1.7] tracking-[0.22em] text-[#14171A]/70 uppercase rtl:tracking-normal">
                {t.badgeLines?.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </div>

            {/* Stone arch rising behind the image */}
            <div aria-hidden className="pointer-events-none absolute start-[22%] end-[14%] top-0 h-[46%] rounded-t-[220px] bg-[#E6E4DF]" />

            {/* Big red arch behind the top-left of the image */}
            <div
              aria-hidden
              className="pointer-events-none absolute start-[2%] top-0 hidden h-[64%] w-[44%] rounded-t-full rounded-es-[90px] bg-gradient-to-br from-[#D7232F] via-[#C51E28] to-[#A3121B] lg:block"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-4 start-[10%] h-48 w-[60%] rounded-t-full bg-[#C51E28] lg:hidden"
            />

            {/* Image frame */}
            <div className="enter-mask relative mt-8 h-[440px] overflow-hidden rounded-[32px] rounded-ss-[140px] bg-[#E6E4DF] shadow-[0_30px_60px_-25px_rgba(20,23,26,0.35)] sm:h-[520px] lg:ms-[12%] lg:mt-14 lg:h-[700px] lg:rounded-[44px] lg:rounded-ss-[260px] lg:rounded-se-[120px]">
              {slides.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={i === 0 ? t.imageAlt : ""}
                  aria-hidden={i !== active}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className={`object-cover object-center transition-opacity duration-700 ease-soft ${i === active ? "opacity-100" : "opacity-0"}`}
                />
              ))}

              {/* Slide controls */}
              <div className="absolute bottom-5 end-5 z-10 flex items-center gap-4 rounded-[28px] bg-white/95 p-2 shadow-[0_12px_30px_-10px_rgba(20,23,26,0.35)] backdrop-blur sm:bottom-6 sm:end-6 sm:gap-6 sm:p-2.5">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous slide"
                  className="flex size-10 items-center justify-center rounded-full border border-[#14171A]/15 text-[#14171A] transition-colors hover:border-[#C51E28] hover:text-[#C51E28] sm:size-11"
                >
                  <ArrowLeft aria-hidden className="flip-rtl size-4" />
                </button>
                <span className="text-[12px] font-semibold tracking-wider text-[#14171A]" aria-live="polite">
                  {pad(active + 1)} <span className="text-[#14171A]/35">/ {pad(slides.length)}</span>
                </span>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next slide"
                  className="flex size-10 items-center justify-center rounded-full border border-[#14171A]/15 text-[#14171A] transition-colors hover:border-[#C51E28] hover:text-[#C51E28] sm:size-11"
                >
                  <ArrowRight aria-hidden className="flip-rtl size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
