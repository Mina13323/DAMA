import Image from "next/image";
import { Award, Building2, Gem, Layers, MapPin, Trees, type LucideIcon } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import type { Project, ProjectFact } from "@/content/projects";
import { Lines, stagger } from "../../motion/Lines";
import { fill } from "../format";

const factIcons: Record<ProjectFact["icon"], LucideIcon> = {
  type: Building2,
  units: Layers,
  location: MapPin,
  status: Award,
  green: Trees,
  style: Gem,
};

export function ProjectOverview({ project, dict, locale }: { project: Project; dict: Dictionary; locale: Locale }) {
  const copy = project.copy[locale];
  return (
    <section id="overview" aria-labelledby="overview-title" className="relative scroll-mt-36 bg-white py-20 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left: Project Image */}
        <div data-reveal="card" className="relative overflow-hidden rounded-[28px] border border-[#e5e9ed] bg-[#f4f8fb] shadow-md lg:col-span-6">
          <div className="relative aspect-[16/11] w-full">
            <Image
              src={project.images.overview}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Right: Overview Text & Facts */}
        <div className="lg:col-span-6">
          <p data-reveal="fade" style={stagger(1)} className="eyebrow text-[#477da9]">
            {fill(dict.projectDetail.aboutEyebrow, { name: project.name })}
          </p>
          <Lines id="overview-title" lines={copy.overview.titleLines} delay={2} className="heading-lg mt-4 text-[#15191d]" />
          {copy.overview.paragraphs.map((para, i) => (
            <p key={i} data-reveal="up" style={stagger(4 + i)} className="mt-5 text-[15.5px] font-light leading-relaxed text-[#626b73]">
              {para}
            </p>
          ))}

          {copy.facts.length > 0 && (
            <div className="mt-10 rounded-2xl border border-[#e5e9ed] bg-[#f4f8fb] p-6 shadow-2xs">
              <ul
                aria-label={dict.projectDetail.factsLabel}
                className="grid grid-cols-2 gap-5 sm:grid-cols-3"
              >
                {copy.facts.map((fact, i) => {
                  const Icon = factIcons[fact.icon];
                  return (
                    <li key={fact.label} data-reveal="up" style={stagger(6 + i)} className="flex items-start gap-3">
                      <Icon aria-hidden strokeWidth={1.4} className="mt-0.5 size-5 shrink-0 text-[#477da9]" />
                      <div>
                        <p className="text-[11px] font-semibold tracking-wider text-[#626b73] uppercase">{fact.label}</p>
                        <p className="mt-1 text-[13.5px] font-semibold text-[#15191d]">{fact.value}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
