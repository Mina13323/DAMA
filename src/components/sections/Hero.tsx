"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";
import { splitInTwo } from "@/lib/text";

/**
 * Hero. On lg+ every shape is placed in frame units (--u, see globals.css)
 * measured from the reference mockup; the frame spans the full screen width; the section is 69.5u tall, so it always fits the screen height:
 *   red dome   32 → 57.4u × 7.7 → 39u     (behind panel and image)
 *   panel      4.4 → 39u  × 13.5 → 68u    (rounded top-right corner cuts the dome)
 *   image      41.5 → 98.9u × 11.4 → 68u  (sweeping 20.6u top-left corner)
 *   red pill   93.4 → 98.9u × 29.4 → 50.4u (over the image's right edge)
 */
export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.hero;
  const slides = images.heroSlides;
  const [active, setActive] = useState(0);
  const [eyebrowA, eyebrowB] = splitInTwo(t.eyebrow);

  const go = (step: number) => setActive((i) => (i + step + slides.length) % slides.length);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[#F3F2EF] px-4 pb-10 pt-24 sm:px-8 lg:h-[calc(var(--hu)*69.5)] lg:p-0"
    >
      {/* Stone shapes (lg) */}
      <div aria-hidden className="pointer-events-none absolute start-[calc(var(--u)*25)] -top-[calc(var(--hu)*2)] -z-10 hidden h-[calc(var(--hu)*36)] w-[calc(var(--u)*47)] rounded-[calc(var(--hu)*5)] bg-[#ECEAE6] lg:block" />
      <div aria-hidden className="pointer-events-none absolute start-[calc(var(--u)*44)] top-[calc(var(--hu)*5.5)] -z-10 hidden h-[calc(var(--hu)*22)] w-[calc(var(--u)*26.6)] rounded-t-[calc(var(--hu)*13)] bg-[#E3E1DC] lg:block" />
      <div aria-hidden className="pointer-events-none absolute end-0 top-[calc(var(--hu)*10.5)] -z-10 hidden h-[calc(var(--hu)*18)] w-[calc(var(--u)*15.5)] rounded-ss-[calc(var(--hu)*5)] bg-[#E9E7E3] lg:block" />
      <div aria-hidden className="pointer-events-none absolute start-0 top-[calc(var(--hu)*43.5)] -z-10 hidden h-[calc(var(--hu)*25)] w-[calc(var(--u)*4)] rounded-se-[calc(var(--hu)*4)] border-y border-e border-[#E1DFDA] bg-[#EFEDE9] lg:block" />

      {/* Red dome, partly hidden by the panel and the image */}
      <div
        aria-hidden
        className="pointer-events-none absolute start-[calc(var(--u)*32)] top-[calc(var(--hu)*7.7)] hidden h-[calc(var(--hu)*31.3)] w-[calc(var(--u)*25.4)] rounded-b-[calc(var(--hu)*3)] rounded-t-full bg-gradient-to-br from-[#D7232F] via-[#C51E28] to-[#A3121B] lg:block"
      />

      {/* Panel step: below the dome the panel widens to run under the image's curved edge */}
      <div aria-hidden className="pointer-events-none absolute start-[calc(var(--u)*30)] top-[calc(var(--hu)*37)] z-10 hidden h-[calc(var(--hu)*31)] w-[calc(var(--u)*14)] rounded-[calc(var(--hu)*3)] bg-[#FBFBFA] lg:block" />

      {/* Text panel */}
      <div className="relative z-10 rounded-[32px] bg-[#FBFBFA] px-6 py-10 shadow-[0_30px_60px_-34px_rgba(20,23,26,0.18)] sm:px-10 lg:absolute lg:start-[calc(var(--u)*4.4)] lg:top-[calc(var(--hu)*13.5)] lg:flex lg:h-[calc(var(--hu)*54.5)] lg:w-[calc(var(--u)*34.6)] lg:flex-col lg:rounded-[calc(var(--hu)*3)] lg:rounded-se-[calc(var(--hu)*7.4)] lg:px-[calc(var(--u)*2.7)] lg:pb-[calc(var(--hu)*4)] lg:pt-[calc(var(--hu)*3.2)]">
        <div className="enter-fade text-[11px] font-medium tracking-[0.26em] text-[#14171A]/75 uppercase rtl:tracking-normal" style={{ animationDelay: "100ms" }}>
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
          className="enter-line mt-6 font-display text-[clamp(3rem,calc(var(--hu)*6.5),6.25rem)] font-normal leading-[1.02] tracking-[-0.01em] text-[#14171A] lg:mt-[calc(var(--hu)*2.4)]"
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

        <p className="enter-up mt-6 max-w-[23rem] text-[15px] leading-[1.75] text-[#687076] lg:mt-[calc(var(--hu)*2.4)]" style={{ animationDelay: "380ms" }}>
          {t.body}
        </p>

        <div className="enter-up mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-auto lg:flex-nowrap lg:gap-x-[calc(var(--u)*2.4)]" style={{ animationDelay: "500ms" }}>
          <Link
            href={`/${locale}/projects`}
            className="group inline-flex min-h-13 shrink-0 items-center gap-5 whitespace-nowrap rounded-full bg-[#C51E28] px-8 py-4 text-[13px] font-medium text-white shadow-[0_14px_28px_-12px_rgba(197,30,40,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9F121A] lg:min-h-[max(52px,calc(var(--hu)*4.6))] lg:px-[calc(var(--u)*2.5)]"
          >
            <span>{t.cta}</span>
            <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>

          <Link href={`/${locale}/about`} className="group inline-flex shrink-0 items-center gap-4 whitespace-nowrap text-[12.5px] font-semibold text-[#14171A]">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-[#14171A]/80 transition-colors group-hover:border-[#C51E28] group-hover:text-[#C51E28]">
              <Play aria-hidden className="size-4 translate-x-px fill-current" />
            </span>
            <span className="border-b border-[#C51E28]/60 pb-1 transition-colors group-hover:text-[#C51E28]">{t.secondary}</span>
          </Link>
        </div>
      </div>

      {/* Image (wrapper only positions the small-screen dome; static on lg) */}
      <div className="relative mt-14 lg:static lg:mt-0">
        <div aria-hidden className="pointer-events-none absolute -top-8 start-[12%] h-56 w-[62%] rounded-t-full bg-[#C51E28] lg:hidden" />

        <div className="enter-mask relative z-20 h-[440px] overflow-hidden rounded-[28px] rounded-ss-[140px] bg-[#E6E4DF] shadow-[0_30px_60px_-30px_rgba(20,23,26,0.35)] sm:h-[540px] lg:absolute lg:start-[calc(var(--u)*41.5)] lg:top-[calc(var(--hu)*11.4)] lg:h-[calc(var(--hu)*56.6)] lg:w-[calc(var(--u)*57.4)] lg:rounded-[calc(var(--hu)*1.5)] lg:rounded-es-[calc(var(--hu)*9.9)] lg:rounded-se-[calc(var(--hu)*7)] lg:rounded-ss-[calc(var(--hu)*20.6)]">
          {slides.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={i === 0 ? t.imageAlt : ""}
              aria-hidden={i !== active}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) calc(var(--u)*58), calc(var(--u)*100)"
              className={`object-cover object-[45%_center] transition-opacity duration-700 ease-soft ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}

          {/* Slide controls */}
          <div className="absolute bottom-4 end-4 z-10 flex items-center justify-between gap-4 rounded-[30px] bg-white/95 p-2 shadow-[0_12px_30px_-10px_rgba(20,23,26,0.35)] backdrop-blur sm:gap-6 lg:bottom-[calc(var(--hu)*0.6)] lg:end-[calc(var(--u)*3.7)] lg:w-[calc(var(--u)*18.4)] lg:rounded-[calc(var(--hu)*2.4)] lg:p-[calc(var(--u)*0.8)]">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="flex size-10 items-center justify-center rounded-full border border-[#14171A]/15 text-[#14171A] transition-colors hover:border-[#C51E28] hover:text-[#C51E28] lg:size-[max(40px,calc(var(--hu)*3.6))]"
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
              className="flex size-10 items-center justify-center rounded-full border border-[#14171A]/15 text-[#14171A] transition-colors hover:border-[#C51E28] hover:text-[#C51E28] lg:size-[max(40px,calc(var(--hu)*3.6))]"
            >
              <ArrowRight aria-hidden className="flip-rtl size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Red pill over the image's right edge */}
      <div aria-hidden className="pointer-events-none absolute start-[calc(var(--u)*93.4)] top-[calc(var(--hu)*29.4)] z-30 hidden h-[calc(var(--hu)*21)] w-[calc(var(--u)*5.5)] rounded-e-[calc(var(--hu)*1)] rounded-s-[calc(var(--hu)*3.4)] bg-gradient-to-b from-[#D42430] to-[#B0141E] lg:block" />

      {/* Vertical badge */}
      <div className="absolute start-[calc(var(--u)*86)] top-[calc(var(--hu)*13.2)] z-30 hidden items-start gap-[calc(var(--u)*1.6)] lg:flex">
        <span className="h-[calc(var(--hu)*5)] w-[2px] bg-[#C51E28]" aria-hidden />
        <ul className="text-[9.5px] font-medium leading-[1.75] tracking-[0.22em] text-[#14171A]/70 uppercase rtl:tracking-normal">
          {t.badgeLines?.map((line) => <li key={line}>{line}</li>)}
        </ul>
      </div>
    </section>
  );
}
