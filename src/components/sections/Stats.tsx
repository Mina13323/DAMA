import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { Counter } from "../motion/Counter";
import { stagger } from "../motion/Lines";

export function Stats({ dict, band = false }: { dict: Dictionary; band?: boolean }) {
  const isNumeric = (v: string) => /\d/.test(v);

  return (
    <section aria-label="Key Performance Indicators" className={`relative bg-[#FBFBFA] ${band ? "py-12 border-b border-[#ECEAE5]" : "pb-16 lg:pb-24"}`}>
      <div className="container-x">
        {/* Floating Rounded Metrics Card */}
        <div
          data-reveal="card"
          className="rounded-[28px] border border-[#ECEAE5] bg-white p-6 sm:p-8 lg:p-10 shadow-xs"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:items-center lg:gap-6">
            {/* 4 Metrics Columns */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-10 lg:grid-cols-4 lg:gap-6">
              {dict.stats.map((stat, i) => {
                const numeric = isNumeric(stat.value);
                return (
                  <div
                    key={stat.label}
                    data-reveal="up"
                    style={stagger(i)}
                    className="flex flex-col lg:border-e lg:border-[#ECEAE5] lg:pe-6 rtl:lg:border-s rtl:lg:border-e-0 rtl:lg:ps-6 last:border-e-0"
                  >
                    {/* Red Display Metric Number */}
                    <p className="font-display text-[clamp(2.4rem,3.2vw,3.5rem)] font-normal leading-none text-[#C51E28]">
                      {numeric ? <Counter value={stat.value} /> : stat.value}
                    </p>
                    {/* Small Caps Title */}
                    <h3 className="mt-3 text-[11px] font-bold tracking-wider text-[#14171A] uppercase">
                      {stat.label}
                    </h3>
                    {/* Muted Subtitle */}
                    <p className="mt-1 text-[12px] font-normal leading-relaxed text-[#687076]">
                      {stat.body}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* 5th Column: Red Architectural Showcase Card */}
            <div
              data-reveal="fade"
              style={stagger(4)}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#C51E28] sm:aspect-auto sm:h-28 lg:col-span-2 lg:h-32 shadow-xs group"
            >
              <Image
                src={images.about.who}
                alt="Architectural structure"
                fill
                sizes="(min-width: 1024px) 200px, 100vw"
                className="object-cover opacity-35 mix-blend-multiply transition-transform duration-700 ease-soft group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#9F121A]/80 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center p-3 text-center">
                <span className="font-display text-sm font-semibold italic text-white tracking-wide">
                  DAMA Living
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
