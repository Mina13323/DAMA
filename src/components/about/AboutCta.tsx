import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { ButtonLink, SectionIntro } from "../ui";
import { Parallax } from "../motion/Parallax";

/**
 * Closing moment: wide dusk photograph (wipe reveal + slow parallax) under a
 * deep-blue veil that fades out toward the trailing side, with a cream sweep
 * along the top edge continuing from the partners section.
 */
export function AboutCta({ dict }: { dict: Dictionary }) {
  const t = dict.about.cta;
  return (
    <section aria-labelledby="about-cta-title" className="relative isolate overflow-hidden bg-[#18344a]">
      <div data-reveal="wipe" className="absolute inset-0 -z-20">
        <div className="absolute inset-0 rtl:-scale-x-100">
          <Parallax amount={8}>
            <Image src={images.about.cta} alt={t.imageAlt} fill sizes="100vw" className="object-cover object-[center_65%]" />
          </Parallax>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#18344a]/95 via-[#18344a]/70 to-[#18344a]/35 lg:bg-gradient-to-r lg:from-[#18344a]/92 lg:via-[#18344a]/60 lg:via-45% lg:to-transparent lg:to-75% rtl:lg:bg-gradient-to-l"
      />

      {/* White sweep on the top edge */}
      <svg
        aria-hidden
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -top-px h-10 w-full text-white sm:h-16 rtl:-scale-x-100"
      >
        <path fill="currentColor" d="M0 0 H1440 V0 C 1180 0, 980 10, 860 90 C 820 30, 600 0, 0 0 Z" />
      </svg>

      <div className="container-x flex min-h-[460px] items-end pb-16 pt-28 lg:min-h-[480px] lg:items-center lg:pb-20">
        <div className="max-w-xl">
          <SectionIntro id="about-cta-title" tone="light" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} delay={2}>
            <ButtonLink href={`/${dict.locale}/contact`} variant="light">
              {t.cta}
            </ButtonLink>
          </SectionIntro>
        </div>
      </div>
    </section>
  );
}
