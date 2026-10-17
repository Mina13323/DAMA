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
    <section aria-labelledby="project-title" className="relative isolate overflow-hidden bg-[#FBFBFA] pb-12 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
      {/* Decorative ambient atmospheric warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#F2ECE4]/70 via-[#FBFBFA]/60 to-transparent blur-3xl rtl:translate-x-1/2"
      />

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Copy Column */}
          <div className="lg:col-span-5">
            <Link
              href={`/${locale}/projects`}
              className="enter-fade group inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-[#C51E28] hover:text-[#9F121A] transition-colors"
            >
              <ArrowLeft aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              <span>{t.back}</span>
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#FDF2F2] px-3.5 py-1 text-[11px] font-semibold tracking-wider text-[#C51E28] border border-[#FCA5A5]/60 shadow-2xs">
                {project.categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(" • ")}
              </span>
            </div>

            <h1 id="project-title" className="mt-4 font-serif text-[clamp(2.6rem,5vw,4.25rem)] font-normal leading-tight text-[#14171A]" dir="ltr">
              <span className="enter-line block" style={{ animationDelay: "200ms" }}>
                {project.name}
              </span>
            </h1>

            <p className="enter-up mt-4 flex items-center gap-2 text-[13.5px] font-medium text-[#687076]" style={{ animationDelay: "380ms" }}>
              <MapPin aria-hidden strokeWidth={1.8} className="size-4 text-[#C51E28]" />
              <span>{copy.location}</span>
            </p>

            <p className="enter-up mt-5 max-w-md text-[15.5px] font-normal leading-relaxed text-[#555E68]" style={{ animationDelay: "480ms" }}>
              {copy.intro}
            </p>

            <div className="enter-up mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "600ms" }}>
              <ButtonLink href="#enquire" variant="red">
                {t.requestInfo}
              </ButtonLink>
              {project.mapUrl && (
                <a
                  href={project.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#ECEAE5] bg-white px-5 text-[12.5px] font-semibold text-[#14171A] shadow-2xs transition-colors hover:border-[#C51E28] hover:text-[#C51E28]"
                >
                  <MapPin aria-hidden className="size-3.5 text-[#C51E28]" />
                  <span>{copy.location}</span>
                </a>
              )}
            </div>
          </div>

          {/* Photograph Column with Signature Red Organic Drop and Luxury Card */}
          <div className="enter-mask relative lg:col-span-7" style={{ animationDelay: "400ms" }}>
            {/* Signature red curved arch shape tucked behind bottom-end corner */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -end-6 -z-10 h-64 w-48 sm:h-80 sm:w-60 rounded-t-full rounded-bl-[120px] bg-gradient-to-b from-[#C51E28] to-[#9F121A] opacity-95 shadow-xl"
            />
            {/* Soft stone arch accent tucked behind start */}
            <div
              aria-hidden
              className="pointer-events-none absolute -start-4 -top-4 -z-10 h-32 w-20 rounded-full bg-[#EDEBE5]/80"
            />

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] border border-[#ECEAE5] bg-white shadow-[0_20px_50px_-15px_rgba(20,23,26,0.15)] sm:rounded-[36px]">
              <Image
                src={project.image}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#14171A]/35 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
