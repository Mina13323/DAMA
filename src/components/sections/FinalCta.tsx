import Image from "next/image";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";
import { ButtonLink, SectionIntro } from "../ui";
import { Parallax } from "../motion/Parallax";

/**
 * Closing moment: horizontal image wipe on entry, slow parallax while it
 * scrolls away, and a soft curve that hands off to the footer.
 */
export function FinalCta({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.cta;
  return (
    <section aria-labelledby="cta-title" className="relative bg-white">
      <div className="clip-step relative isolate overflow-hidden bg-deep-ink">
        <div data-reveal="wipe" className="absolute inset-0 -z-20">
          <div className="absolute inset-0 rtl:-scale-x-100">
            <Parallax amount={8}>
              <Image src={images.cta} alt={t.imageAlt} fill sizes="100vw" className="object-cover object-[center_60%]" />
            </Parallax>
          </div>
        </div>
        {/* Blue-toned veil for contrast */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1d3a55]/90 via-[#284d70]/65 to-[#477da9]/30 lg:bg-gradient-to-r lg:from-[#1d3a55]/85 lg:via-[#2f5f86]/45 lg:to-transparent rtl:lg:bg-gradient-to-l"
        />
        <div className="container-x flex min-h-[560px] items-end pb-28 pt-32 lg:min-h-[660px] lg:items-center lg:pb-32 lg:pt-36">
          <div className="max-w-lg">
            <SectionIntro id="cta-title" tone="light" size="xl" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} delay={2}>
              <ButtonLink href={`/${locale}/contact`} variant="light">
                {t.cta}
              </ButtonLink>
            </SectionIntro>
          </div>
        </div>

        {/* Soft hand-off into the footer */}
        <svg
          aria-hidden
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute inset-x-0 -bottom-px h-10 w-full text-white sm:h-16 rtl:-scale-x-100"
        >
          <path fill="currentColor" d="M0 80 L0 50 C 360 0, 760 70, 1080 34 S 1360 10, 1440 30 L1440 80 Z" />
        </svg>
      </div>
    </section>
  );
}
