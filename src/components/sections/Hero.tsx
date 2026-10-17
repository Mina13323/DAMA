"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.hero;
  const [activeSlide, setActiveSlide] = useState(1);
  const totalSlides = 3;

  const nextSlide = () => setActiveSlide((prev) => (prev % totalSlides) + 1);
  const prevSlide = () => setActiveSlide((prev) => (prev === 1 ? totalSlides : prev - 1));

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-[#FBFBFA] pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-16 lg:pt-36">
      {/* Soft stone arch panels behind the headline */}
      <div aria-hidden className="pointer-events-none absolute inset-y-24 -start-24 -z-20 hidden w-[46%] rounded-e-[160px] bg-[#F1EFEA] lg:block" />
      <div aria-hidden className="pointer-events-none absolute -start-10 bottom-10 -z-20 hidden h-64 w-40 rounded-t-full border border-[#E6E3DC] lg:block" />

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 xl:col-span-6">
            {/* Red Eyebrow with leading and trailing dashes */}
            <div className="enter-fade flex items-center gap-2 text-[#C51E28]" style={{ animationDelay: "100ms" }}>
              <span className="h-px w-5 bg-[#C51E28]" aria-hidden />
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase rtl:tracking-normal">
                {t.eyebrow}
              </p>
              <span className="h-px w-5 bg-[#C51E28]" aria-hidden />
            </div>

            {/* Display Headline: 4 editorial lines matching mockup */}
            <h1
              id="hero-title"
              className="enter-line mt-6 font-display text-[clamp(2.75rem,5.2vw,4.75rem)] font-normal leading-[1.05] tracking-tight text-[#14171A]"
              style={{ animationDelay: "200ms" }}
            >
              {locale === "ar" ? (
                <>
                  <span className="block text-[#14171A]">حياة راقية.</span>
                  <span className="mt-1 block italic text-[#C51E28]">صُممت لتنتمي.</span>
                </>
              ) : (
                <>
                  <span className="block text-[#14171A]">Elevated</span>
                  <span className="block text-[#14171A]">living.</span>
                  <span className="block italic text-[#C51E28]">Designed</span>
                  <span className="block italic text-[#C51E28]">to belong.</span>
                </>
              )}
            </h1>

            {/* Supporting Paragraph */}
            <p
              className="enter-up mt-6 max-w-lg text-[15px] font-normal leading-relaxed text-[#687076] sm:text-[16.5px]"
              style={{ animationDelay: "380ms" }}
            >
              {t.body}
            </p>

            {/* Call to Action Buttons */}
            <div
              className="enter-up mt-8 flex flex-wrap items-center gap-4 sm:gap-5"
              style={{ animationDelay: "500ms" }}
            >
              {/* Primary Red Pill Button with Arrow */}
              <Link
                href={`/${locale}/projects`}
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#C51E28] px-7 py-3.5 text-[13px] font-semibold tracking-wide text-white shadow-md transition-all duration-200 hover:bg-[#9F121A] hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>{t.cta}</span>
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                  <ArrowRight aria-hidden className="flip-rtl size-3.5" />
                </span>
              </Link>

              {/* Secondary Play Button: The DAMA Story */}
              <Link
                href={`/${locale}/about`}
                className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-[#ECEAE5] bg-white px-5 py-3 text-[13px] font-semibold text-[#14171A] shadow-xs transition-all duration-200 hover:border-[#C51E28] hover:bg-[#FDF2F2]"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#C51E28] text-[#C51E28] transition-transform duration-200 group-hover:scale-110">
                  <Play aria-hidden className="size-2.5 fill-[#C51E28] translate-x-0.5" />
                </span>
                <span>{t.secondary}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Hero Showcase with Iconic Red Organic Shapes */}
          <div className="relative lg:col-span-6 xl:col-span-6">
            {/* Top Right Stacked Vertical Badge with Red Bar */}
            <div className="absolute -top-10 end-2 z-20 hidden items-center gap-2.5 sm:flex">
              <span className="h-10 w-0.5 bg-[#C51E28]" aria-hidden />
              <div className="text-[9.5px] font-bold tracking-[0.24em] text-[#C51E28] uppercase opacity-90 leading-tight">
                {t.badgeLines?.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>

            {/* Red Accent 1: large rounded block rising behind the top of the image */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-8 start-[18%] -z-10 h-64 w-[62%] rounded-t-full bg-[#C51E28]"
            />

            {/* Red Accent 2: organic leaf bleeding off the right edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute -end-8 top-[22%] -z-10 h-56 w-24 rounded-s-full rounded-tr-[48px] bg-[#C51E28] sm:-end-12 sm:w-28"
            />

            {/* Red Accent 3: quarter-round tucked under the lower-left corner */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -start-6 -z-10 size-32 rounded-es-[100px] rounded-ss-[24px] rounded-ee-[24px] bg-[#C51E28] sm:size-40"
            />

            {/* Main Architectural Image Card (arched top like the mockup) */}
            <div className="enter-mask relative overflow-hidden rounded-[32px] rounded-ss-[110px] sm:rounded-[40px] sm:rounded-ss-[160px] bg-white shadow-[0_25px_60px_-15px_rgba(20,23,26,0.18)]">
              <div className="relative aspect-[4/5] sm:aspect-[4/4.4] w-full">
                <Image
                  src={images.hero}
                  alt={t.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-[1.2s] ease-soft hover:scale-[1.02]"
                />
              </div>

              {/* Bottom Carousel Controls Bar: < 01 / 03 > */}
              <div className="absolute bottom-4 end-4 z-20 flex items-center gap-3 rounded-full border border-white/70 bg-white/95 px-4 py-1.5 shadow-md backdrop-blur-md">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="flex size-7 items-center justify-center rounded-full text-[#14171A] transition-colors hover:bg-black/5"
                >
                  <ArrowLeft className="flip-rtl size-3.5" />
                </button>
                <span className="font-mono text-[11px] font-semibold text-[#14171A] tracking-wider">
                  0{activeSlide} / 0{totalSlides}
                </span>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="flex size-7 items-center justify-center rounded-full text-[#14171A] transition-colors hover:bg-black/5"
                >
                  <ArrowRight className="flip-rtl size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
