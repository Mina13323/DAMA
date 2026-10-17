import Image from "next/image";
import type { ReactNode } from "react";
import { Eye, MountainSnow } from "lucide-react";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { Lines, stagger } from "../motion/Lines";

type Panel = Dictionary["about"]["vision"]["vision"];

/**
 * Two equal statements under one sky. Each photograph bleeds from its outer
 * edge with an organic curve; the two compositions mirror each other.
 */
export function VisionMission({ dict }: { dict: Dictionary }) {
  const t = dict.about.vision;
  return (
    <section
      id="vision-mission"
      aria-labelledby="vision-mission-title"
      className="relative bg-[#FBFBFA] py-16 sm:py-24"
    >
      <div className="container-x">
        {/* Soft Stone Organic Container */}
        <div className="rounded-[36px] sm:rounded-[44px] bg-[#EDEBE5]/70 p-6 sm:p-10 lg:p-12 border border-[#ECEAE5]">
          <div className="flex items-center gap-2 text-[#C51E28]">
            <span className="h-px w-4 bg-[#C51E28]" aria-hidden />
            <h2 id="vision-mission-title" className="text-[11px] font-bold tracking-[0.24em] uppercase rtl:tracking-normal">
              {t.eyebrow}
            </h2>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <Statement
              panel={t.vision}
              icon={<Eye aria-hidden strokeWidth={1.5} className="size-6" />}
              image={images.about.vision}
              base={1}
            />
            <Statement
              panel={t.mission}
              icon={<MountainSnow aria-hidden strokeWidth={1.5} className="size-6" />}
              image={images.about.mission}
              base={4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Statement({
  panel,
  icon,
  image,
  base,
}: {
  panel: Panel;
  icon: ReactNode;
  image: string;
  base: number;
}) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-[#ECEAE5] bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 hover:shadow-lg">
      <div>
        <div className="flex items-center justify-between">
          <span className="flex size-11 items-center justify-center rounded-full border border-[#C51E28]/40 bg-[#FDF2F2] text-[#C51E28]">
            {icon}
          </span>
          <span className="text-[10.5px] font-bold tracking-[0.22em] text-[#C51E28] uppercase">
            {panel.label}
          </span>
        </div>

        <Lines as="h3" lines={panel.titleLines} delay={base + 1} className="mt-6 font-display text-[26px] sm:text-[30px] font-normal leading-tight text-[#14171A]" />

        <p data-reveal="up" style={stagger(base + 3)} className="mt-4 text-[14.5px] font-normal leading-relaxed text-[#687076]">
          {panel.body}
        </p>
      </div>

      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-[24px] border border-[#ECEAE5]">
        <Image
          src={image}
          alt={panel.imageAlt}
          fill
          sizes="(min-width:1024px) 35vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-soft group-hover:scale-105"
        />
      </div>
    </article>
  );
}
