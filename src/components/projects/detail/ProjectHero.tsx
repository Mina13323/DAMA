import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import type { Project } from "@/content/projects";
import { ButtonLink } from "../../ui";

export function ProjectHero({ project, dict, locale }: { project: Project; dict: Dictionary; locale: Locale }) {
  const copy = project.copy[locale];
  const t = dict.projectDetail;
  return (
    <section aria-labelledby="project-title" className="relative isolate overflow-hidden bg-gradient-to-b from-[#8bbde6]/30 via-[#eaf4fb]/50 via-40% to-white pb-12 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
      {/* Decorative ambient atmospheric glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#8bbde6]/35 via-[#eaf4fb]/45 to-transparent blur-3xl rtl:translate-x-1/2"
      />

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Copy Column */}
          <div className="lg:col-span-5">
            <Link
              href={`/${locale}/projects`}
              className="enter-fade group inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-[#477da9] hover:text-[#18344a]"
            >
              <ArrowLeft aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              <span>{t.back}</span>
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-[#18344a] border border-[#e5e9ed] shadow-2xs">
                {project.categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(" • ")}
              </span>
            </div>

            <h1 id="project-title" className="mt-4 font-display text-[clamp(2.6rem,5vw,4.25rem)] font-light leading-none text-[#15191d]" dir="ltr">
              <span className="enter-line block" style={{ animationDelay: "200ms" }}>
                {project.name}
              </span>
            </h1>

            <p className="enter-up mt-4 flex items-center gap-2 text-[13.5px] text-[#626b73]" style={{ animationDelay: "380ms" }}>
              <MapPin aria-hidden strokeWidth={1.5} className="size-4 text-[#477da9]" />
              <span>{copy.location}</span>
            </p>

            <p className="enter-up mt-5 max-w-md text-[15.5px] font-light leading-relaxed text-[#626b73]" style={{ animationDelay: "480ms" }}>
              {copy.intro}
            </p>

            <div className="enter-up mt-8 flex items-center gap-4" style={{ animationDelay: "600ms" }}>
              <ButtonLink href="#inquire" variant="dark">
                {t.requestInfo}
              </ButtonLink>
              {project.mapUrl && (
                <a
                  href={project.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#e5e9ed] bg-white px-5 text-[12.5px] font-semibold text-[#15191d] shadow-2xs transition-colors hover:border-[#18344a] hover:bg-[#18344a] hover:text-white"
                >
                  <MapPin aria-hidden className="size-3.5 text-[#477da9]" />
                  <span>{copy.location}</span>
                </a>
              )}
            </div>
          </div>

          {/* Photograph Column with Clean Luxury Card */}
          <div className="enter-mask relative lg:col-span-7" style={{ animationDelay: "400ms" }}>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] border border-[#e5e9ed] bg-white shadow-[0_20px_50px_-15px_rgba(24,52,74,0.15)] sm:rounded-[36px]">
              <Image
                src={project.image}
                alt=""
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
