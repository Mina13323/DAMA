"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ArrowRight, Clock, Search } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import type { NewsArticle, NewsCategory } from "@/content/news";
import { stagger } from "../motion/Lines";

export function NewsBrowser({
  articles,
  locale,
  labels,
}: {
  articles: NewsArticle[];
  locale: Locale;
  labels: Dictionary["newsPage"];
}) {
  const [filter, setFilter] = useState<"all" | NewsCategory>("all");
  const [query, setQuery] = useState("");
  const searchId = useId();

  const categories: ("all" | NewsCategory)[] = [
    "all",
    "project-updates",
    "sustainability",
    "events",
    "architecture",
  ];

  const visible = useMemo(() => {
    return articles.filter((article) => {
      const copy = article.copy[locale];
      const matchesCategory = filter === "all" || article.category === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        copy.title.toLowerCase().includes(q) ||
        copy.summary.toLowerCase().includes(q) ||
        copy.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [articles, filter, query, locale]);

  const featured = useMemo(() => {
    if (filter !== "all" || query.trim()) return undefined;
    return articles.find((a) => a.featured) ?? articles[0];
  }, [articles, filter, query]);

  const gridArticles = useMemo(() => {
    if (!featured) return visible;
    return visible.filter((a) => a.slug !== featured.slug);
  }, [visible, featured]);

  return (
    <div className="pb-24 sm:pb-32">
      {/* Filter and Search Bar */}
      <div className="container-x border-y border-line/80 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Categories */}
          <div
            role="group"
            aria-label="Filter stories by category"
            className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {categories.map((c) => {
              const active = filter === c;
              const label = c === "all" ? labels.filterAll : labels.filters[c];
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(c)}
                  className={`min-h-11 shrink-0 rounded-full border px-5 text-[12.5px] font-medium transition-all duration-200 ${
                    active
                      ? "border-olive bg-olive text-white shadow-sm"
                      : "border-line bg-white/90 text-ink hover:border-deep/40 hover:bg-white shadow-2xs"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <label htmlFor={searchId} className="sr-only">
              {labels.searchPlaceholder}
            </label>
            <Search aria-hidden className="absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="min-h-11 w-full rounded-full border border-ink/15 bg-white/90 ps-10 pe-4 text-[13px] text-ink outline-none transition-colors focus:border-deep"
            />
          </div>
        </div>
      </div>

      <div className="container-x mt-10 sm:mt-14">
        {/* Featured Story Banner (when not searching/filtering) */}
        {featured && (
          <article
            data-reveal="card"
            className="group relative mb-14 overflow-hidden rounded-[32px] bg-white shadow-[0_1px_3px_rgba(21,25,29,0.04)] lg:grid lg:grid-cols-12 lg:items-center"
          >
            <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9] lg:col-span-7 lg:h-full lg:min-h-[440px]">
              <div data-reveal="wipe" className="absolute inset-0">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width:1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-soft group-hover:scale-105"
                />
              </div>
              <span className="absolute start-5 top-5 rounded-full bg-white/95 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-ink uppercase shadow-sm backdrop-blur">
                {labels.featuredBadge}
              </span>
            </div>

            <div className="p-8 sm:p-10 lg:col-span-5 lg:p-12">
              <div className="flex items-center gap-2 text-[11.5px] font-medium text-muted uppercase">
                <span className="text-deep font-semibold">{featured.copy[locale].categoryLabel}</span>
                <span aria-hidden>·</span>
                <span>{featured.copy[locale].date}</span>
                <span aria-hidden>·</span>
                <span className="flex items-center gap-1">
                  <Clock aria-hidden className="size-3" />
                  {featured.copy[locale].readTime}
                </span>
              </div>

              <h2 className="heading-md mt-4 text-ink transition-colors group-hover:text-deep-ink">
                <Link
                  href={`/${locale}/news/${featured.slug}`}
                  className="after:absolute after:inset-0 focus-visible:outline-none"
                >
                  {featured.copy[locale].title}
                </Link>
              </h2>

              <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
                {featured.copy[locale].summary}
              </p>

              <div className="mt-8 flex items-center gap-2 text-[13px] font-semibold text-ink group-hover:text-deep">
                <span>{labels.readArticle}</span>
                <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </div>
            </div>
          </article>
        )}

        {/* Stories Grid */}
        {visible.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-2xl text-ink">{labels.empty}</p>
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
              className="mt-6 inline-flex min-h-11 items-center rounded-full border border-ink/20 px-6 text-[13px] font-semibold text-ink hover:bg-ink hover:text-white"
            >
              {labels.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gridArticles.map((article, i) => {
              const copy = article.copy[locale];
              const href = `/${locale}/news/${article.slug}`;

              return (
                <article
                  key={article.slug}
                  data-reveal="card"
                  style={stagger(i)}
                  className="group relative flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_1px_3px_rgba(21,25,29,0.04)] transition-[box-shadow,translate] duration-500 ease-soft hover:-translate-y-1 hover:shadow-[0_20px_48px_-24px_rgba(21,25,29,0.15)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    <div data-reveal="wipe" style={stagger(i)} className="absolute inset-0">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-[1.1s] ease-soft group-hover:scale-105"
                      />
                    </div>
                    <span className="absolute start-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10.5px] font-semibold tracking-wider text-ink uppercase backdrop-blur">
                      {copy.categoryLabel}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted uppercase">
                      <span>{copy.date}</span>
                      <span aria-hidden>·</span>
                      <span className="flex items-center gap-1">
                        <Clock aria-hidden className="size-3" />
                        {copy.readTime}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-[19px] leading-snug text-ink transition-colors group-hover:text-deep-ink">
                      <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
                        {copy.title}
                      </Link>
                    </h3>

                    <p className="mt-3 line-clamp-2 text-[13.5px] leading-relaxed text-muted">
                      {copy.summary}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-6 text-[12.5px] font-semibold text-ink">
                      <span>{labels.readArticle}</span>
                      <span
                        aria-hidden
                        className="inline-flex size-9 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white"
                      >
                        <ArrowRight className="flip-rtl size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Press Office Box */}
        <div data-reveal="up" className="mt-16 sm:mt-24 rounded-[28px] border border-line bg-paper p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-xl">
            <p className="eyebrow">{labels.pressBox.eyebrow}</p>
            <h2 className="heading-md mt-2 text-ink">{labels.pressBox.title}</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">{labels.pressBox.body}</p>
          </div>
          <div className="mt-6 lg:mt-0 shrink-0">
            <a
              href="mailto:press@damadevelopments.com"
              className="inline-flex min-h-11 items-center gap-3 rounded-full bg-ink px-6 text-[13px] font-semibold text-white transition-colors hover:bg-deep-ink"
            >
              {labels.pressBox.cta}
              <ArrowRight aria-hidden className="flip-rtl size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
