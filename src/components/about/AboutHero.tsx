import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { ButtonLink } from "../ui";
import { Lines } from "../motion/Lines";
import { Sparkles } from "lucide-react";

export function AboutHero({ dict }: { dict: Dictionary }) {
  const t = dict.about.hero;
  return (
    <section aria-labelledby="about-hero-title" className="relative isolate overflow-hidden bg-gradient-to-b from-[#8bbde6]/30 via-[#eaf4fb]/50 via-40% to-white pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44">
      {/* Decorative ambient atmospheric glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#8bbde6]/35 via-[#eaf4fb]/45 to-transparent blur-3xl rtl:translate-x-1/2"
      />

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Copy Column */}
          <div className="lg:col-span-5">
            <div className="enter-up inline-flex items-center gap-2 rounded-full border border-[#8bbde6]/50 bg-white/90 px-4 py-1.5 shadow-2xs backdrop-blur-md" style={{ animationDelay: "100ms" }}>
              <Sparkles aria-hidden className="size-3.5 text-[#477da9]" />
              <span className="text-[11px] font-semibold tracking-[0.24em] text-[#18344a] uppercase rtl:tracking-normal">
                {t.eyebrow}
              </span>
            </div>

            <Lines as="h1" id="about-hero-title" mode="enter" lines={t.titleLines} className="heading-xl mt-6 text-3xl font-light tracking-tight text-[#15191d] sm:text-5xl lg:text-6xl" />

            <p className="enter-up mt-6 max-w-lg text-[15px] font-light leading-relaxed text-[#626b73] sm:text-lg" style={{ animationDelay: "450ms" }}>
              {t.body}
            </p>

            <div className="enter-up mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "600ms" }}>
              <ButtonLink href="#who-we-are" variant="dark">
                {t.cta}
              </ButtonLink>
            </div>
          </div>

          {/* Photograph Column with Clean Rounded Card */}
          <div className="enter-mask relative lg:col-span-7" style={{ animationDelay: "500ms" }}>
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[28px] border border-[#e5e9ed] bg-white shadow-[0_25px_60px_-15px_rgba(24,52,74,0.15)] sm:rounded-[36px]">
              <Image
                src={images.about.hero}
                alt={t.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#15191d]/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Cohesive Section Navigation Pills */}
        <div className="mt-12 rounded-2xl border border-[#e5e9ed] bg-white/90 p-3 shadow-xs backdrop-blur-md sm:mt-16 sm:p-4">
          <SectionNav dict={dict} />
        </div>
      </div>
    </section>
  );
}

function SectionNav({ dict }: { dict: Dictionary }) {
  return (
    <nav aria-label={dict.about.sectionNav} className="w-full">
      <ol className="no-scrollbar flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {dict.about.hero.nav.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-flex min-h-10 items-center rounded-full border border-transparent bg-[#f4f8fb] px-4 py-2 text-[12px] font-semibold tracking-wider text-[#18344a] uppercase transition-all duration-200 hover:border-[#8bbde6] hover:bg-white hover:shadow-xs rtl:tracking-normal"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
