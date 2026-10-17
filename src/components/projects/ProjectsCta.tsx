import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { ButtonLink, SectionIntro } from "../ui";
import { Parallax } from "../motion/Parallax";

/** Olive copy field meeting a dusk photograph on a diagonal. */
export function ProjectsCta({ dict }: { dict: Dictionary }) {
  const t = dict.projectsPage.cta;
  return (
    <section aria-labelledby="projects-cta-title" className="relative isolate overflow-hidden bg-[#111417] text-white">
      <div className="relative h-64 overflow-hidden rounded-[28px] lg:rounded-none sm:h-80 lg:absolute lg:inset-y-0 lg:end-0 lg:h-auto lg:w-[60%]">
        <div data-reveal="wipe" className="absolute inset-0 rtl:-scale-x-100">
          <Parallax amount={6}>
            <Image src={images.cta} alt={t.imageAlt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
          </Parallax>
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#111417]/80 via-[#111417]/40 to-transparent rtl:bg-gradient-to-l" />
      </div>

      <div className="container-x relative py-16 lg:flex lg:min-h-[420px] lg:items-center lg:py-20">
        <div className="max-w-md lg:max-w-[min(440px,36vw)]">
          <SectionIntro id="projects-cta-title" tone="light" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} delay={1}>
            <ButtonLink href={`/${dict.locale}/contact`} variant="red">
              {t.cta}
            </ButtonLink>
          </SectionIntro>
        </div>
      </div>
    </section>
  );
}
