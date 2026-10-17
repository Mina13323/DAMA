import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { ButtonLink, SectionIntro } from "../ui";
import { stagger } from "../motion/Lines";

export function WhoWeAre({ dict }: { dict: Dictionary }) {
  const t = dict.about.who;
  return (
    <section id="who-we-are" aria-labelledby="who-title" className="relative bg-[#FBFBFA] py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Copy */}
        <div className="lg:col-span-5">
          <SectionIntro id="who-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body}>
            <ButtonLink href="#story" variant="red">{t.cta}</ButtonLink>
          </SectionIntro>

          {/* Pillars List in White Card with Red Details */}
          <div className="mt-10 rounded-[28px] border border-[#ECEAE5] bg-white p-6 shadow-xs">
            <div className="flex items-center gap-2 text-[#C51E28]">
              <span className="h-px w-3 bg-[#C51E28]" aria-hidden />
              <h4 className="text-[11px] font-bold tracking-wider text-[#C51E28] uppercase">
                {t.pillarsLabel}
              </h4>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {t.pillars.map((item, i) => (
                <li
                  key={item}
                  data-reveal="fade"
                  style={stagger(i)}
                  className="rounded-xl border border-[#ECEAE5] bg-[#FBFBFA] px-3.5 py-2 text-center text-[12px] font-semibold text-[#14171A] shadow-2xs transition-all hover:border-[#C51E28] hover:bg-[#FDF2F2] hover:text-[#C51E28]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Photograph with Top-Right Red Accent */}
        <div data-reveal="card" className="relative lg:col-span-7">
          {/* Top-Right Red Organic Shape */}
          <div
            aria-hidden
            className="pointer-events-none absolute -end-5 -top-6 -z-10 h-64 w-52 rounded-t-full rounded-es-[120px] bg-[#C51E28] shadow-md"
          />

          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[32px] sm:rounded-[40px] border border-[#ECEAE5] bg-white shadow-md">
            <Image
              src={images.about.who}
              alt={t.imageAlt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
