import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";

export function FinalCta({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.cta;

  return (
    <section aria-labelledby="cta-title" className="relative bg-[#FBFBFA] py-14 sm:py-20 border-t border-[#ECEAE5]">
      <div className="container-x">
        <div
          data-reveal="card"
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[#ECEAE5] bg-white p-6 sm:p-10 lg:p-12 shadow-xs"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            {/* Left Column: Heading and Subtitle */}
            <div className="max-w-xl">
              <h2
                id="cta-title"
                className="font-display text-[clamp(2rem,3.2vw,3rem)] font-normal tracking-tight text-[#14171A] leading-tight"
              >
                <span>{t.titleLines[0]} </span>
                <span className="italic text-[#C51E28]">{t.titleLines[1]?.replace(/\*/g, "")}</span>
              </h2>
              <p className="mt-3 text-[14px] font-normal text-[#687076] sm:text-[15.5px]">
                {t.body}
              </p>
            </div>

            {/* Right: Red CTA Button + Architectural Image Slice */}
            <div className="flex items-center gap-6 sm:gap-8">
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#C51E28] px-8 py-3.5 text-[13px] font-semibold tracking-wide text-white shadow-md transition-all duration-200 hover:bg-[#9F121A] hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>{t.cta}</span>
                <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>

              {/* Architectural image slice */}
              <div className="relative hidden h-28 w-28 overflow-hidden rounded-2xl border border-[#ECEAE5] sm:block lg:h-32 lg:w-32">
                <Image
                  src={images.cta}
                  alt={t.imageAlt}
                  fill
                  sizes="128px"
                  className="object-cover object-center grayscale transition-transform duration-700 ease-soft hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
