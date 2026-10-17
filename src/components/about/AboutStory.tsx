import Image from "next/image";
import { Gem, Leaf, PlusCircle, UsersRound } from "lucide-react";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { ButtonLink, SectionIntro } from "../ui";
import { stagger } from "../motion/Lines";

const principleIcons = [UsersRound, Leaf, Gem, PlusCircle];

export function AboutStory({ dict }: { dict: Dictionary }) {
  const t = dict.about.story;
  return (
    <section id="story" aria-labelledby="about-story-title" className="relative isolate bg-[#f4f8fb] py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Photograph */}
        <div data-reveal="card" className="relative overflow-hidden rounded-[28px] border border-[#e5e9ed] bg-white shadow-md lg:col-span-5">
          <div className="relative aspect-[16/11] w-full">
            <Image
              src={images.about.story}
              alt={t.imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-4 lg:ps-4">
          <SectionIntro id="about-story-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} delay={1}>
            <ButtonLink href="#vision-mission" variant="dark">{t.cta}</ButtonLink>
          </SectionIntro>
        </div>

        {/* Principles */}
        <div className="lg:col-span-3 lg:border-s lg:border-[#e5e9ed] lg:ps-8">
          <h4 className="text-[12px] font-semibold tracking-wider text-[#18344a] uppercase">
            {t.principlesLabel}
          </h4>
          <ul
            aria-label={t.principlesLabel}
            className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-1 lg:gap-5"
          >
            {t.principles.map((label, i) => {
              const Icon = principleIcons[i];
              return (
                <li key={label} data-reveal="up" style={stagger(4 + i)} className="flex items-center gap-3 rounded-xl border border-[#e5e9ed] bg-white p-3 shadow-2xs">
                  <Icon aria-hidden strokeWidth={1.4} className="size-5 shrink-0 text-[#477da9]" />
                  <span className="text-[13px] font-medium text-[#15191d]">{label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
