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
    <section aria-labelledby="about-cta-title" className="relative isolate overflow-hidden bg-[#111417]">
      <div data-reveal="wipe" className="absolute inset-0 -z-20">
        <div className="absolute inset-0 rtl:-scale-x-100">
          <Parallax amount={8}>
            <Image src={images.about.cta} alt={t.imageAlt} fill sizes="100vw" className="object-cover object-[center_65%]" />
          </Parallax>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#111417]/95 via-[#111417]/70 to-[#111417]/35 lg:bg-gradient-to-r lg:from-[#111417]/95 lg:via-[#111417]/75 lg:via-45% lg:to-transparent lg:to-80% rtl:lg:bg-gradient-to-l"
      />

      <div className="container-x flex min-h-[460px] items-end pb-16 pt-28 lg:min-h-[480px] lg:items-center lg:pb-20">
        <div className="max-w-xl">
          <SectionIntro id="about-cta-title" tone="light" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} delay={2}>
            <ButtonLink href={`/${dict.locale}/contact`} variant="red">
              {t.cta}
            </ButtonLink>
          </SectionIntro>
        </div>
      </div>
    </section>
  );
}
