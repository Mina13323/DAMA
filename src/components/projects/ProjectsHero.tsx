import Image from "next/image";
import type { Dictionary } from "@/content";
import { Lines } from "../motion/Lines";
import { Sparkles } from "lucide-react";

export function ProjectsHero({ dict, image }: { dict: Dictionary; image: string }) {
  const t = dict.projectsPage.hero;
  return (
    <section aria-labelledby="projects-hero-title" className="relative isolate overflow-hidden bg-gradient-to-b from-[#8bbde6]/30 via-[#eaf4fb]/50 via-40% to-white pb-12 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
      {/* Decorative ambient atmospheric glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#8bbde6]/35 via-[#eaf4fb]/45 to-transparent blur-3xl rtl:translate-x-1/2"
      />

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="enter-up inline-flex items-center gap-2 rounded-full border border-[#8bbde6]/50 bg-white/90 px-4 py-1.5 shadow-2xs backdrop-blur-md" style={{ animationDelay: "100ms" }}>
              <Sparkles aria-hidden className="size-3.5 text-[#477da9]" />
              <span className="text-[11px] font-semibold tracking-[0.24em] text-[#18344a] uppercase rtl:tracking-normal">
                {t.eyebrow}
              </span>
            </div>

            <Lines as="h1" id="projects-hero-title" mode="enter" lines={t.titleLines} className="heading-xl mt-6 text-3xl font-light tracking-tight text-[#15191d] sm:text-5xl lg:text-6xl" />

            <p className="enter-up mt-6 max-w-md text-[15px] font-light leading-relaxed text-[#626b73] sm:text-lg" style={{ animationDelay: "450ms" }}>
              {t.body}
            </p>
          </div>

          <div className="enter-mask relative lg:col-span-7" style={{ animationDelay: "500ms" }}>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] border border-[#e5e9ed] bg-white shadow-[0_20px_50px_-15px_rgba(24,52,74,0.15)] sm:rounded-[36px]">
              <Image
                src={image}
                alt={t.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#15191d]/35 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
