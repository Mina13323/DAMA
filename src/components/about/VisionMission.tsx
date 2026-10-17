import Image from "next/image";
import type { ReactNode } from "react";
import { Eye, MountainSnow } from "lucide-react";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { Lines, stagger } from "../motion/Lines";
import { Parallax } from "../motion/Parallax";

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
      className="relative overflow-hidden bg-gradient-to-b from-[#d9e9f6] via-[#eaf3fa] to-white"
    >
      <h2 id="vision-mission-title" data-reveal="fade" className="eyebrow container-x pt-14 lg:absolute lg:inset-x-0 lg:top-0 lg:z-10">
        {t.eyebrow}
      </h2>
      <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-white/70 rtl:lg:divide-x-reverse">
        <Statement panel={t.vision} side="start" icon={<Eye aria-hidden strokeWidth={1.2} className="size-8" />} image={images.about.vision} base={1} />
        <Statement
          panel={t.mission}
          side="end"
          icon={<MountainSnow aria-hidden strokeWidth={1.2} className="size-8" />}
          image={images.about.mission}
          base={4}
        />
      </div>
    </section>
  );
}

function Statement({
  panel,
  side,
  icon,
  image,
  base,
}: {
  panel: Panel;
  side: "start" | "end";
  icon: ReactNode;
  image: string;
  base: number;
}) {
  const start = side === "start";
  return (
    <article className="relative flex flex-col lg:min-h-[480px] lg:flex-row lg:items-center">
      {/* Photograph bleeding from the outer edge */}
      <div
        className={`relative h-64 overflow-hidden sm:h-80 lg:absolute lg:inset-y-0 lg:h-auto lg:w-[42%] ${
          start ? "clip-organic-start rounded-ee-[96px] lg:start-0 lg:rounded-none" : "clip-organic-end rounded-es-[96px] lg:end-0 lg:rounded-none"
        }`}
      >
        <div data-reveal="organic" style={stagger(base)} className="absolute inset-0">
          <Parallax amount={4}>
            <Image src={image} alt={panel.imageAlt} fill sizes="(min-width:1024px) 22vw, 100vw" className="object-cover" />
          </Parallax>
        </div>
      </div>

      {/* Statement */}
      <div className={`px-4 py-12 sm:px-8 sm:py-16 lg:py-24 ${start ? "lg:ms-[46%] lg:pe-12" : "lg:me-[46%] lg:ps-12"}`}>
        <div data-reveal="fade" style={stagger(base)} className="text-ink/80">
          {icon}
        </div>
        <p data-reveal="fade" style={stagger(base + 1)} className="eyebrow mt-6">
          {panel.label}
        </p>
        <Lines as="h3" lines={panel.titleLines} delay={base + 1} className="heading-lg mt-3 text-ink" />
        <p data-reveal="up" style={stagger(base + 3)} className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-muted">
          {panel.body}
        </p>
      </div>
    </article>
  );
}
