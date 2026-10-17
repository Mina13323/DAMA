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
    <section id="enquire" aria-labelledby="enquire-title" className="scroll-mt-36 bg-[#FBFBFA] border-t border-[#ECEAE5]">
      <div className="container-x grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-4">
          <SectionIntro id="enquire-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} />
          <p data-reveal="fade" style={stagger(5)} className="mt-6 font-serif text-2xl text-[#C51E28]" dir="ltr">
            {project.name}
          </p>
        </div>
        <div data-reveal="up" style={stagger(2)} className="relative rounded-[32px] border border-[#ECEAE5] bg-white p-6 shadow-xl sm:p-10 lg:col-span-7 lg:col-start-6">
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
    <section aria-labelledby="related-title" className="bg-[#FBFBFA] border-t border-[#ECEAE5]">
      <div className="container-x py-20 sm:py-24">
        <SectionIntro id="related-title" eyebrow={t.eyebrow} lines={t.titleLines} />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <li key={p.slug} data-reveal="card" style={stagger(2 + i)}>
              <Link href={`/${locale}/projects/${p.slug}`} className="group flex flex-col gap-5 rounded-[28px] border border-[#ECEAE5] bg-white p-5 shadow-xs transition-all hover:border-[#C51E28]/40 hover:shadow-lg sm:flex-row sm:items-center">
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
                    <span className="block font-serif text-2xl text-[#14171A] group-hover:text-[#C51E28] transition-colors" dir="ltr">
                      {p.name}
                    </span>
                    <span className="mt-2 flex items-center gap-2 text-[13px] text-[#687076]">
                      <MapPin aria-hidden strokeWidth={1.8} className="size-4 text-[#C51E28]" />
                      {p.copy[locale].location}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#C51E28] text-white shadow-xs transition-transform duration-200 group-hover:scale-105 group-hover:bg-[#9F121A]"
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
