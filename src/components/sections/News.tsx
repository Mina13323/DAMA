import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { getNewsArticles } from "@/content/news";
import { ButtonLink, SectionIntro } from "../ui";
import { Carousel } from "../Carousel";
import { plain, stagger } from "../motion/Lines";

/** Split editorial header over an asymmetric row: one lead story, two secondary. */
export function News({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.news;
  const articles = getNewsArticles();

  return (
    <section id="news" aria-labelledby="news-title" className="bg-white">
      <div className="container-x py-20 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-6">
            <SectionIntro id="news-title" eyebrow={t.eyebrow} lines={t.titleLines} />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p data-reveal="up" style={stagger(4)} className="max-w-md text-[15px] leading-relaxed text-muted">
              {t.body}
            </p>
            <div data-reveal="up" style={stagger(5)} className="mt-6">
              <ButtonLink href={`/${locale}/news`} variant="outline">
                {t.cta}
              </ButtonLink>
            </div>
          </div>
        </div>

        <Carousel
          label={plain(t.titleLines)}
          prevLabel={dict.a11y.prev}
          nextLabel={dict.a11y.next}
          className="mt-12 lg:mt-16"
          trackClassName="-mx-4 scroll-px-4 sm:scroll-px-8 lg:scroll-px-0 gap-4 px-4 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:gap-5 lg:px-0"
          controlsClassName="mt-6"
        >
          {articles.map((article, i) => {
            const lead = i === 0;
            const copy = article.copy[locale];
            const href = `/${locale}/news/${article.slug}`;

            return (
              <div
                key={article.slug}
                data-reveal="card"
                style={stagger(3 + i)}
                className={`flex w-[80%] shrink-0 snap-start sm:w-[46%] ${
                  lead ? "lg:w-[calc(50%-20px)]" : "lg:w-[calc(25%-10px)]"
                }`}
              >
                <article className="group relative flex w-full flex-col">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-[20px] lg:aspect-auto lg:h-64">
                    <div data-reveal="wipe" style={stagger(3 + i)} className="absolute inset-0">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        sizes={lead ? "(min-width:1024px) 600px, 80vw" : "(min-width:1024px) 300px, 80vw"}
                        className="object-cover transition-transform duration-[1.1s] ease-soft group-hover:scale-[1.04]"
                      />
                    </div>
                    <span className="absolute start-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wider text-ink backdrop-blur">
                      {copy.categoryLabel}
                    </span>
                  </div>
                  <div className="flex flex-1 items-start justify-between gap-4 border-b border-line pb-5 pt-5">
                    <div>
                      <p className="flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-muted uppercase rtl:tracking-normal">
                        <span>{copy.date}</span>
                        <span aria-hidden className="mx-1">·</span>
                        <Clock aria-hidden className="size-3" />
                        <span>{copy.readTime}</span>
                      </p>
                      <h3
                        className={`mt-2 font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-deep-ink ${
                          lead ? "text-[17px] lg:text-xl" : "text-[15px]"
                        }`}
                      >
                        <Link href={href} className="after:absolute after:inset-0 after:rounded-[20px]">
                          {copy.title}
                        </Link>
                      </h3>
                      {lead && (
                        <p className="mt-2.5 line-clamp-2 text-[13.5px] leading-relaxed text-muted">
                          {copy.summary}
                        </p>
                      )}
                    </div>
                    <span
                      aria-hidden
                      className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-white"
                    >
                      <ArrowRight className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </span>
                  </div>
                </article>
              </div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}
