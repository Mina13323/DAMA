import Image from "next/image";
import type { Dictionary, Locale } from "@/content";
import type { Project } from "@/content/projects";
import { SectionIntro } from "../../ui";
import { stagger } from "../../motion/Lines";

/** Copy at the start, a slanted three-image collage at the end. Rendered only when lifestyle copy exists. */
export function ProjectLifestyle({ project, dict, locale }: { project: Project; dict: Dictionary; locale: Locale }) {
  const lifestyle = project.copy[locale].lifestyle;
  if (!lifestyle) return null;
  const [large, ...small] = project.images.lifestyle;

  return (
    <section id="lifestyle" aria-labelledby="lifestyle-title" className="scroll-mt-36 overflow-hidden bg-white">
      <div className="container-x grid grid-cols-1 gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-28">
        <div className="lg:col-span-4">
          <SectionIntro id="lifestyle-title" eyebrow={dict.projectDetail.lifestyleEyebrow} lines={lifestyle.titleLines} body={lifestyle.body} />
          <p className="mt-6 text-[11.5px] text-muted">{dict.projectsPage.illustrative}</p>
        </div>

        <div className="grid grid-cols-5 gap-3 lg:col-span-8 lg:-me-[max(48px,calc((100vw-1240px)/2+48px))]">
          <div className="clip-slant relative col-span-5 aspect-[16/10] overflow-hidden sm:col-span-3 sm:aspect-auto sm:min-h-[380px]">
            <div data-reveal="wipe" style={stagger(1)} className="absolute inset-0">
              <Image src={large} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="col-span-5 grid grid-cols-2 gap-3 sm:col-span-2 sm:-ms-[12%] sm:grid-cols-1">
            {small.map((src, i) => (
              <div key={src} className="clip-slant relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[184px]">
                <div data-reveal="wipe" style={stagger(2 + i)} className="absolute inset-0">
                  <Image src={src} alt="" fill sizes="(min-width:1024px) 24vw, 50vw" className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
