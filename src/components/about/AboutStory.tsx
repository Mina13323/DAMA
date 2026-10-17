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
    <section id="story" aria-labelledby="about-story-title" className="relative isolate bg-[#FBFBFA] py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left: Photograph with Signature Red Semicircle Tab */}
        <div data-reveal="card" className="relative lg:col-span-5">
          {/* Semicircle Tab */}
          <div
            aria-hidden
            className="pointer-events-none absolute -start-5 top-1/4 z-10 h-28 w-14 rounded-r-full bg-[#C51E28] shadow-md rtl:-scale-x-100"
          />

          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-t-[3.25rem] rounded-bl-[3.25rem] rounded-br-2xl border border-[#ECEAE5] bg-white shadow-xs">
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
            <ButtonLink href="#vision-mission" variant="red">{t.cta}</ButtonLink>
          </SectionIntro>
        </div>

        {/* Principles */}
        <div className="rounded-[32px] border border-[#ECEAE5] bg-white p-6 shadow-xs lg:col-span-3">
          <div className="flex items-center gap-2 text-[#C51E28]">
            <span className="h-px w-3 bg-[#C51E28]" aria-hidden />
            <h4 className="text-[11px] font-bold tracking-wider text-[#C51E28] uppercase">
              {t.principlesLabel}
            </h4>
          </div>
          <ul
            aria-label={t.principlesLabel}
            className="mt-6 flex flex-col gap-4"
          >
            {t.principles.map((label, i) => {
              const Icon = principleIcons[i];
              return (
                <li key={label} data-reveal="up" style={stagger(4 + i)} className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#C51E28]/40 bg-[#FDF2F2] text-[#C51E28]">
                    <Icon aria-hidden strokeWidth={1.6} className="size-4" />
                  </span>
                  <span className="text-[12px] font-bold tracking-wider text-[#14171A] uppercase">{label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
