import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import type { Project } from "@/content/projects";
import { SectionIntro } from "../../ui";
import { stagger } from "../../motion/Lines";
import { InquiryForm } from "./InquiryForm";

export function ProjectInquiry({ project, dict, locale }: { project: Project; dict: Dictionary; locale: Locale }) {
  const t = dict.projectDetail.inquiry;
  return (
    <section id="enquire" aria-labelledby="enquire-title" className="scroll-mt-36 bg-paper">
      <div className="container-x grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-4">
          <SectionIntro id="enquire-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} />
          <p data-reveal="fade" style={stagger(5)} className="mt-6 font-display text-xl text-deep" dir="ltr">
            {project.name}
          </p>
        </div>
        <div data-reveal="up" style={stagger(2)} className="rounded-[28px] bg-white p-6 shadow-[0_24px_64px_-48px_rgba(21,25,29,0.35)] sm:p-10 lg:col-span-7 lg:col-start-6">
          <InquiryForm project={project.slug} locale={locale} labels={t} />
        </div>
      </div>
    </section>
  );
}

/** Other projects, styled after the listing rows but compact. */
export function RelatedProjects({ projects, dict, locale }: { projects: Project[]; dict: Dictionary; locale: Locale }) {
  if (projects.length === 0) return null;
  const t = dict.projectDetail.related;
  return (
    <section aria-labelledby="related-title" className="bg-white border-t border-[#e5e9ed]">
      <div className="container-x py-20 sm:py-24">
        <SectionIntro id="related-title" eyebrow={t.eyebrow} lines={t.titleLines} />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <li key={p.slug} data-reveal="card" style={stagger(2 + i)}>
              <Link href={`/${locale}/projects/${p.slug}`} className="group flex flex-col gap-5 rounded-[28px] border border-[#e5e9ed] bg-[#f4f8fb] p-5 shadow-xs transition-all hover:shadow-md sm:flex-row sm:items-center">
                <span className="relative block aspect-[16/10] shrink-0 overflow-hidden rounded-[20px] sm:w-[50%]">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width:768px) 28vw, 100vw"
                    className="object-cover transition-transform duration-[1.1s] ease-soft group-hover:scale-[1.05]"
                  />
                </span>
                <span className="flex flex-1 items-end justify-between gap-4">
                  <span>
                    <span className="block font-display text-2xl text-ink" dir="ltr">
                      {p.name}
                    </span>
                    <span className="mt-2 flex items-center gap-2 text-[13px] text-muted">
                      <MapPin aria-hidden strokeWidth={1.5} className="size-4 text-ink" />
                      {p.copy[locale].location}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors duration-200 group-hover:bg-ink group-hover:text-white"
                  >
                    <ArrowRight className="flip-rtl size-4" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
