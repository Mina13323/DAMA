import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";

export function FinalCta({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.cta;
  const title = t.titleLines.join(" ").replace(/\*/g, "");

  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden border-y border-[#ECEAE5] bg-white">
      {/* Architectural image slice pinned to the far edge */}
      <div className="absolute inset-y-0 end-0 hidden w-[16%] overflow-hidden rounded-ss-[64px] md:block">
        <Image
          src={images.cta}
          alt={t.imageAlt}
          fill
          sizes="16vw"
          className="object-cover object-center grayscale"
        />
      </div>

      <div className="container-x">
        <div
          data-reveal="fade"
          className="flex flex-col gap-6 py-10 sm:py-12 md:flex-row md:items-center md:justify-between md:pe-[14%] lg:py-14"
        >
          <div>
            <h2
              id="cta-title"
              className="font-display text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-tight tracking-tight text-[#14171A]"
            >
              {title}
            </h2>
            <p className="mt-2 text-[14px] font-normal text-[#687076] sm:text-[15px]">{t.body}</p>
          </div>

          <Link
            href={`/${locale}/contact`}
            className="group inline-flex min-h-12 shrink-0 items-center gap-3 self-start rounded-full bg-[#C51E28] px-7 py-3.5 text-[13px] font-semibold tracking-wide text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9F121A] hover:shadow-lg md:self-auto"
          >
            <span>{t.cta}</span>
            <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
