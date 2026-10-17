import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content";
import { partners } from "@/content/site";
import { SectionIntro } from "../ui";
import { stagger } from "../motion/Lines";

const PLACEHOLDER_SLOTS = 6;

/**
 * Open logo grid on cream. Only verified partners from content/site.ts are
 * shown; until then, neutral numbered slots keep the composition intact.
 */
export function Partners({ dict }: { dict: Dictionary }) {
  const t = dict.about.partners;
  const verified = partners.length > 0;
  const cell = "flex h-20 items-center justify-center sm:h-24";

  return (
    <section id="partners" aria-labelledby="partners-title" className="bg-white border-t border-[#e5e9ed]">
      <div className="container-x grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-4">
          <SectionIntro id="partners-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} />
        </div>

        <div className="lg:col-span-5 lg:col-start-6">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {verified
              ? partners.map((p, i) => (
                  <li key={p.name} data-reveal="fade" style={stagger(2 + i)}>
                    {p.href ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${cell} opacity-60 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0`}
                      >
                        <Image src={p.logo} alt={p.name} width={140} height={48} className="h-9 w-auto object-contain" />
                      </a>
                    ) : (
                      <div className={`${cell} opacity-60 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0`}>
                        <Image src={p.logo} alt={p.name} width={140} height={48} className="h-9 w-auto object-contain" />
                      </div>
                    )}
                  </li>
                ))
              : Array.from({ length: PLACEHOLDER_SLOTS }, (_, i) => (
                  <li key={i} data-reveal="fade" style={stagger(2 + i)}>
                    <div className={`${cell} flex-col gap-1.5 text-ink/35`}>
                      <span className="font-display text-xl leading-none">{t.placeholder}</span>
                      <span className="text-[9.5px] font-semibold tracking-[0.24em] uppercase" dir="ltr">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </li>
                ))}
          </ul>
          {!verified && (
            <p data-reveal="fade" style={stagger(8)} className="mt-4 text-center text-[11.5px] text-muted sm:text-start">
              {t.placeholderNote}
            </p>
          )}
        </div>

        <div data-reveal="up" style={stagger(8)} className="lg:col-span-2 lg:col-start-11 lg:justify-self-end">
          <Link href={`/${dict.locale}/contact`} className="group inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-ink">
            {t.cta}
            <ArrowRight
              aria-hidden
              className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
