import Image from "next/image";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";
import { ButtonLink, SectionIntro } from "../ui";
import { stagger } from "../motion/Lines";
import { Parallax } from "../motion/Parallax";

/* Each moment gets its own organic mask so the three read as editorial beats, not identical cards. */
const masks = [
  "rounded-[24px_96px_24px_24px] rtl:rounded-[96px_24px_24px_24px]",
  "rounded-t-[999px] rounded-b-[24px]",
  "rounded-[96px_24px_96px_24px] rtl:rounded-[24px_96px_24px_96px]",
];

export function Lifestyle({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.lifestyle;
  return (
    <section aria-labelledby="lifestyle-title" className="relative bg-paper">
      {/* Image-led band */}
      <div className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0 -z-20">
          <Parallax amount={7}>
            <Image src={images.lifestyle} alt={t.imageAlt} fill sizes="100vw" className="object-cover object-[60%_center]" />
          </Parallax>
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/50 to-ink/25 lg:bg-gradient-to-r lg:from-ink/75 lg:via-ink/35 lg:to-transparent rtl:lg:bg-gradient-to-l"
        />

        {/* Organic top edge flowing out of the projects section */}
        <svg
          aria-hidden
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="absolute inset-x-0 -top-px h-12 w-full text-white sm:h-20 rtl:-scale-x-100"
        >
          <path fill="currentColor" d="M0 0 H1440 V18 C 1120 96, 820 30, 560 58 S 140 100, 0 40 Z" />
        </svg>

        <div className="container-x flex min-h-[600px] items-end pb-36 pt-32 sm:pb-40 lg:min-h-[720px] lg:items-center lg:pb-44 lg:pt-36">
          <div className="max-w-md">
            <SectionIntro id="lifestyle-title" tone="light" size="xl" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body}>
              <ButtonLink href={`/${locale}#values`} variant="light">
                {t.cta}
              </ButtonLink>
            </SectionIntro>
          </div>
        </div>
      </div>

      {/* Three editorial moments, overlapping the band */}
      <div className="container-x relative z-10 -mt-24 sm:-mt-28">
        <ol className="grid gap-px overflow-hidden rounded-[32px] bg-line shadow-[0_40px_80px_-48px_rgba(21,25,29,0.45)] md:grid-cols-3 lg:rounded-ss-[120px]">
          {t.themes.map((theme, i) => (
            <li key={theme.title} className="flex flex-col bg-white p-6 sm:p-8 lg:p-10">
              <div data-reveal="fade" style={stagger(i * 2)} className="flex items-baseline justify-between">
                <span className="font-display text-sm text-deep" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="h-px w-12 bg-sky" />
              </div>
              <div className={`relative mt-6 h-44 overflow-hidden sm:h-52 ${masks[i]}`}>
                <div data-reveal="organic" style={stagger(i * 2)} className="absolute inset-0">
                  <Image src={images.lifestyleThemes[i]} alt="" fill sizes="(min-width:768px) 30vw, 90vw" className="object-cover" />
                </div>
              </div>
              <h3 data-reveal="up" style={stagger(i * 2 + 1)} className="mt-7 font-display text-2xl leading-tight text-ink">
                {theme.title}
              </h3>
              <p data-reveal="up" style={stagger(i * 2 + 2)} className="mt-2 text-[14px] leading-relaxed text-muted">
                {theme.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
