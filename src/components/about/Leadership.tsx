import Image from "next/image";
import { ArrowRight, Quote, UserRound } from "lucide-react";
import type { Dictionary } from "@/content";
import { leadership } from "@/content/site";
import { SectionIntro } from "../ui";
import { stagger } from "../motion/Lines";

/**
 * Olive editorial band with two cream profile cards. Profiles render official
 * data from content/site.ts; until it is supplied, each field shows a clearly
 * marked placeholder.
 */
export function Leadership({ dict }: { dict: Dictionary }) {
  const t = dict.about.leadership;
  return (
    <section id="leadership" aria-labelledby="leadership-title" className="relative isolate overflow-hidden bg-[#18344a] text-white">
      <div className="container-x grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-28">
        <div className="lg:col-span-4">
          <SectionIntro id="leadership-title" tone="light" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} />
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-8">
          {leadership.map((person, i) => {
            const role = t.roles[person.role];
            return (
              <li key={person.role} data-reveal="card" style={stagger(2 + i * 2)}>
                <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-white/15 bg-white text-[#15191d] sm:flex-row shadow-md">
                  {/* Portrait */}
                  <div className="relative aspect-[4/3] shrink-0 overflow-hidden sm:aspect-auto sm:min-h-72 sm:w-[46%]">
                    <div data-reveal="wipe" style={stagger(2 + i * 2)} className="absolute inset-0">
                      {person.portrait ? (
                        <Image
                          src={person.portrait}
                          alt={`${person.name}, ${role}`}
                          fill
                          sizes="(min-width:768px) 20vw, 90vw"
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#2a4e6e] to-[#18344a] text-white/70">
                          <UserRound aria-hidden strokeWidth={0.8} className="size-20 text-[#8bbde6]" />
                          <span className="max-w-[10rem] text-center text-[10px] font-semibold tracking-wider uppercase rtl:text-xs rtl:tracking-normal">
                            {t.portraitPending}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-1 flex-col p-6">
                    <Quote aria-hidden strokeWidth={1.2} className="size-5 fill-ink/80 text-ink/80" />
                    <p data-reveal="up" style={stagger(3 + i * 2)} className="mt-3 text-[13px] leading-relaxed text-muted">
                      {t.quotePending}
                    </p>
                    <div data-reveal="up" style={stagger(4 + i * 2)} className="mt-auto flex items-end justify-between gap-3 pt-6">
                      <div>
                        <h3 className={`text-[14px] font-semibold ${person.name ? "text-ink" : "text-ink/45"}`}>
                          {person.name || t.namePending}
                        </h3>
                        <p className="mt-0.5 text-[11.5px] text-muted">{role}</p>
                      </div>
                      {person.linkedin && (
                        <a
                          href={person.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${t.linkedin}: ${person.name}`}
                          className="group inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/30 transition-colors duration-200 hover:bg-ink hover:text-white"
                        >
                          <ArrowRight aria-hidden className="flip-rtl size-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
