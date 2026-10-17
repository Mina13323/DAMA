import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { projects } from "@/content/site";
import { ButtonLink, SectionIntro } from "../ui";
import { Carousel } from "../Carousel";
import { plain, stagger } from "../motion/Lines";

export function Projects({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.projects;
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative z-10 bg-white py-20 sm:py-28"
    >
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-4">
          <SectionIntro id="projects-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body}>
            <ButtonLink href={`/${locale}/projects`} variant="dark">
              {t.cta}
            </ButtonLink>
          </SectionIntro>
        </div>

        <div className="lg:col-span-8">
          <Carousel
            label={plain(t.titleLines)}
            prevLabel={dict.a11y.prev}
            nextLabel={dict.a11y.next}
            trackClassName="-mx-4 scroll-px-4 sm:scroll-px-8 lg:scroll-px-0 gap-5 px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 lg:overflow-visible"
            controlsClassName="mt-6 lg:hidden"
          >
            {projects.map((p, i) => (
              <div
                key={p.slug}
                data-reveal="card"
                style={stagger(2 + i)}
                className="w-[85%] shrink-0 snap-start sm:w-[50%] lg:w-[48%]"
              >
                <Link
                  href={`/${locale}/projects/${p.slug}`}
                  className="group relative block h-[380px] overflow-hidden rounded-[28px] border border-[#e5e9ed] bg-[#15191d] shadow-[0_15px_35px_-10px_rgba(24,52,74,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_-12px_rgba(24,52,74,0.22)] sm:h-[420px] lg:h-[460px]"
                >
                  <div data-reveal="zoom" style={stagger(2 + i)} className="absolute inset-0">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width:1024px) 30vw, 84vw"
                      className="object-cover transition-transform duration-[1.1s] ease-soft group-hover:scale-[1.06]"
                    />
                  </div>
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#15191d]/85 via-[#15191d]/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 sm:p-8">
                    <div className="transition-transform duration-300 ease-soft group-hover:-translate-y-1">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#18344a] shadow-xs backdrop-blur">
                        {p.categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(" • ")}
                      </span>
                      <h3 className="heading-md mt-3 text-2xl text-white lg:text-[28px]" dir="ltr">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-[11px] font-medium tracking-[0.2em] text-white/80 uppercase transition-colors duration-300 group-hover:text-[#8bbde6] rtl:text-xs rtl:tracking-normal">
                        {p.copy[locale].location}
                      </p>
                    </div>
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/10 text-white backdrop-blur transition-all duration-200 group-hover:border-white group-hover:bg-white group-hover:text-[#18344a]">
                      <ArrowRight
                        aria-hidden
                        className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                      />
                      <span className="sr-only">
                        {t.explore}: {p.name}
                      </span>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
