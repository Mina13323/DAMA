import Image from "next/image";
import { Gem, Leaf, MapPin, UsersRound } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";
import { ButtonLink, SectionIntro } from "../ui";
import { stagger } from "../motion/Lines";

const icons = [Leaf, UsersRound, Gem, MapPin];

/** Composition flips here (values left, text right) to keep the scroll rhythm moving. */
export function Values({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.values;
  return (
    <section id="values" aria-labelledby="values-title" className="bg-paper">
      <div className="container-x grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-32">
        <div className="lg:col-span-4 lg:col-start-9 lg:row-start-1">
          <SectionIntro id="values-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body}>
            <ButtonLink href={`/${locale}/about#story`}>{t.cta}</ButtonLink>
          </SectionIntro>
        </div>

        <ul className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:col-span-8 lg:row-start-1 lg:grid-cols-4 lg:items-start">
          {t.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <li
                key={item.title}
                data-reveal="card"
                style={stagger(1 + i)}
                className={i % 2 === 1 ? "lg:mt-14" : undefined}
              >
                <div className="group flex h-full flex-col rounded-[28px] bg-white p-3 pb-7 shadow-[0_1px_2px_rgba(21,25,29,0.04)] transition-[box-shadow,translate] duration-500 ease-soft hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-32px_rgba(71,125,169,0.45)]">
                <span className="mask-leaf relative block h-32 overflow-hidden sm:h-40">
                  <Image
                    src={images.values[i]}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 200px, 50vw"
                    className="object-cover transition-transform duration-[1.1s] ease-soft group-hover:scale-105"
                  />
                </span>
                <div className="mt-6 px-2">
                  <Icon aria-hidden strokeWidth={1.4} className="size-6 text-deep" />
                  <h3 className="mt-3 font-display text-[19px] leading-tight text-ink">{item.title}</h3>
                  <span aria-hidden className="mt-3 block h-px w-8 bg-sky transition-[width] duration-500 ease-soft group-hover:w-16" />
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">{item.body}</p>
                </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
