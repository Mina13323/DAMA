import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { ButtonLink, SectionIntro } from "../ui";
import { stagger } from "../motion/Lines";

export function WhoWeAre({ dict }: { dict: Dictionary }) {
  const t = dict.about.who;
  return (
    <section id="who-we-are" aria-labelledby="who-title" className="relative bg-white py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Copy */}
        <div className="lg:col-span-5">
          <SectionIntro id="who-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body}>
            <ButtonLink href="#story" variant="dark">{t.cta}</ButtonLink>
          </SectionIntro>

          {/* Pillars List */}
          <div className="mt-10 rounded-2xl border border-[#e5e9ed] bg-[#f4f8fb] p-6 shadow-2xs">
            <h4 className="text-[12px] font-semibold tracking-wider text-[#18344a] uppercase">
              {t.pillarsLabel}
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {t.pillars.map((item, i) => (
                <li
                  key={item}
                  data-reveal="fade"
                  style={stagger(i)}
                  className="rounded-xl border border-[#e5e9ed] bg-white px-3.5 py-2 text-center text-[12px] font-medium text-[#15191d] shadow-2xs transition-colors hover:border-[#8bbde6]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Photograph */}
        <div data-reveal="card" className="relative overflow-hidden rounded-[28px] border border-[#e5e9ed] bg-[#f4f8fb] shadow-md lg:col-span-7">
          <div className="relative aspect-[16/11] w-full">
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
