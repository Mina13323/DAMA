"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";
import { ButtonLink } from "../ui";
import { Lines } from "../motion/Lines";

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.hero;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/projects?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/${locale}/projects`);
    }
  };

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-gradient-to-b from-[#8bbde6]/30 via-[#eaf4fb]/60 via-40% to-white pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pb-36 lg:pt-44">
      {/* Decorative ambient atmospheric glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#8bbde6]/40 via-[#eaf4fb]/50 to-transparent blur-3xl rtl:translate-x-1/2"
      />

      <div className="container-x flex flex-col items-center text-center">
        {/* Eyebrow Pill Badge */}
        <div className="enter-up inline-flex items-center gap-2 rounded-full border border-[#8bbde6]/50 bg-white/90 px-4 py-1.5 shadow-2xs backdrop-blur-md" style={{ animationDelay: "100ms" }}>
          <Sparkles aria-hidden className="size-3.5 text-[#477da9]" />
          <span className="text-[11px] font-semibold tracking-[0.24em] text-[#18344a] uppercase rtl:tracking-normal">
            {t.eyebrow}
          </span>
        </div>

        {/* Centered Editorial Display Heading */}
        <div className="mt-6 max-w-4xl">
          <Lines
            as="h1"
            id="hero-title"
            mode="enter"
            lines={t.titleLines}
            className="heading-xl text-3xl font-light tracking-tight text-[#15191d] sm:text-5xl md:text-6xl lg:text-7xl"
          />
        </div>

        {/* Supporting Editorial Body */}
        <p
          className="enter-up mt-6 max-w-xl text-[15px] font-light leading-relaxed text-[#626b73] sm:text-lg"
          style={{ animationDelay: "450ms" }}
        >
          {t.body}
        </p>

        {/* Centered Pill Action Buttons */}
        <div className="enter-up mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-5" style={{ animationDelay: "600ms" }}>
          <ButtonLink href={`/${locale}/projects`} variant="dark" className="!px-8 !py-3.5 !text-[13.5px] shadow-md hover:shadow-lg">
            {t.cta}
          </ButtonLink>
          <Link
            href={`/${locale}/about`}
            className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-[#e5e9ed] bg-white px-7 text-[13px] font-semibold text-[#15191d] shadow-sm transition-all duration-200 hover:border-[#477da9] hover:bg-[#f4f8fb]"
          >
            <span>{t.secondary}</span>
            <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </div>

        {/* Centered Cantilevered Architectural Villa (Pinterest Reference Showcase) */}
        <div className="enter-mask relative mt-12 w-full max-w-6xl overflow-hidden rounded-[28px] border border-[#e5e9ed]/90 bg-white shadow-[0_30px_70px_-20px_rgba(24,52,74,0.15)] sm:mt-16 sm:rounded-[44px]" style={{ animationDelay: "750ms" }}>
          <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
            <Image
              src={images.hero}
              alt={t.imageAlt}
              fill
              priority
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="object-cover object-center transition-transform duration-[1.2s] ease-soft hover:scale-[1.02]"
            />
            {/* Subtle soft gradient bottom edge transition */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/90 via-white/30 to-transparent sm:h-36"
            />
          </div>
        </div>

        {/* Reference-Inspired Discovery Search Bar */}
        <div className="enter-up relative z-10 -mt-8 w-full max-w-2xl px-4 sm:-mt-10" style={{ animationDelay: "950ms" }}>
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 rounded-full border border-[#e5e9ed] bg-white/95 p-2 shadow-[0_20px_50px_-10px_rgba(24,52,74,0.12)] backdrop-blur-md transition-all duration-200 focus-within:border-[#477da9] focus-within:ring-2 focus-within:ring-[#477da9]/20"
          >
            <div className="flex flex-1 items-center gap-3 ps-4">
              <Search aria-hidden className="size-4 shrink-0 text-[#626b73]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === "ar" ? "ابحث عن المشاريع، الفيلات، الشقق..." : "Search developments, villas, residences..."}
                className="w-full bg-transparent text-[13.5px] text-[#15191d] outline-none placeholder:text-[#626b73]/70"
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-[#18344a] px-6 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#15191d] hover:shadow-md"
            >
              <span>{locale === "ar" ? "استكشف الآن" : "Explore"}</span>
              <ArrowRight aria-hidden className="flip-rtl size-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
