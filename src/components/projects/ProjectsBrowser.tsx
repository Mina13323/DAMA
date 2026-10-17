"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ArrowRight, MapPin, Search } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import type { ProjectCategory } from "@/content/projects";
import { stagger } from "../motion/Lines";
import { fill } from "./format";

export type ProjectListItem = {
  slug: string;
  name: string;
  image: string;
  location: string;
  summary: string;
  categories: ProjectCategory[];
};

type Filter = "all" | ProjectCategory;

export function ProjectsBrowser({
  items,
  categories,
  locale,
  labels,
}: {
  items: ProjectListItem[];
  categories: ProjectCategory[];
  locale: Locale;
  labels: Dictionary["projectsPage"];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const statusId = useId();
  const searchId = useId();

  const visible = useMemo(() => {
    return items.filter((p) => {
      const matchCategory = filter === "all" || p.categories.includes(filter);
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [filter, query, items]);

  const options: Filter[] = ["all", ...categories];
  const label = (f: Filter) => (f === "all" ? labels.filters.all : labels.filters.categories[f]);

  return (
    <section aria-labelledby="projects-list-title" className="relative bg-white pb-24 lg:pb-32">
      <h2 id="projects-list-title" className="sr-only">
        {labels.hero.eyebrow}
      </h2>

      <div className="container-x border-y border-[#e5e9ed] py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Category Filter Pills */}
          <div
            role="group"
            aria-label={labels.filters.label}
            aria-describedby={statusId}
            className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {options.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={`min-h-11 shrink-0 rounded-full border px-5 text-[12.5px] font-semibold transition-all duration-200 ${
                    active
                      ? "border-[#18344a] bg-[#18344a] text-white shadow-sm"
                      : "border-[#e5e9ed] bg-[#f4f8fb] text-[#15191d] hover:border-[#8bbde6] hover:bg-white"
                  }`}
                >
                  {label(f)}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <label htmlFor={searchId} className="sr-only">
              {labels.filters.searchPlaceholder}
            </label>
            <Search aria-hidden className="absolute start-4 top-1/2 size-4 -translate-y-1/2 text-[#626b73]" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.filters.searchPlaceholder}
              className="min-h-11 w-full rounded-full border border-[#e5e9ed] bg-[#f4f8fb] ps-10 pe-4 text-[13px] text-[#15191d] outline-none transition-all placeholder:text-[#626b73]/70 focus:border-[#477da9] focus:bg-white focus:ring-2 focus:ring-[#477da9]/20"
            />
          </div>
        </div>

        <p id={statusId} aria-live="polite" className="mt-3 text-[12px] text-[#626b73]">
          {fill(labels.filters.showing, { count: visible.length, total: items.length })}
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="container-x py-24 text-center">
          <p className="font-display text-2xl text-[#15191d]">{labels.filters.empty}</p>
          <button
            type="button"
            onClick={() => {
              setFilter("all");
              setQuery("");
            }}
            className="mt-6 inline-flex min-h-11 items-center rounded-full border border-[#e5e9ed] bg-[#18344a] px-6 text-[13px] font-semibold text-white shadow-sm hover:bg-[#15191d]"
          >
            {labels.filters.reset}
          </button>
        </div>
      ) : (
        <ol className="mt-12 space-y-12 lg:mt-16 lg:space-y-16">
          {visible.map((p, i) => (
            <ProjectRow
              key={p.slug}
              project={p}
              index={items.indexOf(p)}
              flip={i % 2 === 1}
              locale={locale}
              explore={labels.explore}
            />
          ))}
        </ol>
      )}

      <p className="container-x mt-12 text-[11.5px] text-[#626b73]">{labels.illustrative}</p>
    </section>
  );
}

function ProjectRow({
  project: p,
  index,
  flip,
  locale,
  explore,
}: {
  project: ProjectListItem;
  index: number;
  flip: boolean;
  locale: Locale;
  explore: string;
}) {
  const href = `/${locale}/projects/${p.slug}`;
  return (
    <li className="group relative">
      <div className="container-x grid items-center gap-8 md:grid-cols-12 md:gap-12">
        {/* Image */}
        <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] border border-[#e5e9ed] bg-white shadow-[0_15px_40px_-10px_rgba(24,52,74,0.12)] transition-all duration-300 hover:shadow-[0_20px_50px_-10px_rgba(24,52,74,0.18)] md:aspect-[16/9]">
            <div data-reveal="wipe" className="absolute inset-0">
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className={`relative md:col-span-5 ${flip ? "md:order-1" : ""}`}>
          <span className="rounded-full bg-[#f4f8fb] px-3.5 py-1 text-[11px] font-semibold tracking-wider text-[#477da9] border border-[#e5e9ed]" dir="ltr">
            0{index + 1} • {p.categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(" / ")}
          </span>

          <h3 data-reveal="up" style={stagger(1)} className="heading-md mt-4 text-2xl font-light text-[#15191d] sm:text-3xl lg:text-4xl">
            <Link
              href={href}
              aria-label={`${explore}: ${p.name}`}
              className="after:absolute after:inset-0 focus-visible:outline-none hover:text-[#477da9] transition-colors"
              dir="ltr"
            >
              {p.name}
            </Link>
          </h3>

          <p data-reveal="up" style={stagger(2)} className="mt-3 flex items-center gap-2 text-[13.5px] text-[#626b73]">
            <MapPin aria-hidden strokeWidth={1.5} className="size-4 text-[#477da9]" />
            {p.location}
          </p>

          <p data-reveal="up" style={stagger(3)} className="mt-4 max-w-md text-[14.5px] leading-relaxed text-[#626b73]">
            {p.summary}
          </p>

          <div data-reveal="up" style={stagger(4)} className="mt-6 flex items-center gap-3">
            <span className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-[#18344a] px-6 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 group-hover:bg-[#15191d] group-hover:shadow-md">
              <span>{explore}</span>
              <ArrowRight className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
