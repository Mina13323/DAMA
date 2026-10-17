import Image from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { Counter } from "../motion/Counter";
import { stagger } from "../motion/Lines";
import { statsGrid, statsRow } from "./layout";

export function Stats({ dict, band = false }: { dict: Dictionary; band?: boolean }) {
  const isNumeric = (v: string) => /\d/.test(v);

  return (
    <section
      aria-label="Key Performance Indicators"
      className={`relative isolate overflow-hidden bg-[#F3F2EF] ${band ? "py-12" : "pb-4 pt-4 lg:pb-5"}`}
    >
      <div className={band ? "container-x" : statsRow}>
        <div className={`grid gap-4 ${band ? "" : `lg:items-stretch ${statsGrid}`}`}>
          {/* Metrics pill */}
          <div
            data-reveal="card"
            className="rounded-[36px] border border-white/80 bg-[#FAF9F7] px-6 py-8 shadow-[0_24px_50px_-30px_rgba(20,23,26,0.22)] sm:px-10 lg:rounded-[72px] lg:py-[calc(var(--u)*3.6)] lg:ps-[calc(var(--u)*5.4)] lg:pe-[calc(var(--u)*3)]"
          >
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-0">
              {dict.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  data-reveal="up"
                  style={stagger(i)}
                  className="flex flex-col lg:border-s lg:border-[#14171A]/10 lg:ps-[calc(var(--u)*3.9)] lg:first:border-s-0 lg:first:ps-0"
                >
                  <dt className="order-2 mt-[1.1em] whitespace-pre-line text-[11.5px] font-bold leading-[1.45] tracking-[0.1em] text-[#14171A] uppercase rtl:tracking-normal">
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-sans text-[clamp(2.6rem,calc(var(--u)*4.4),4.25rem)] font-medium leading-[0.9] tracking-[-0.03em] text-[#C51E28]">
                    {isNumeric(stat.value) ? <Counter value={stat.value} /> : stat.value}
                  </dd>
                  <dd className="order-3 mt-3 whitespace-pre-line text-[13px] leading-[1.55] text-[#687076]">{stat.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Red-tinted leaf: tree against the lattice facade */}
          {!band && (
            <div data-reveal="fade" style={stagger(4)} className="relative hidden lg:my-[calc(var(--u)*0.8)] lg:block">
              <div className="absolute inset-0 overflow-hidden rounded-[18px] rounded-ss-[calc(var(--u)*5.2)] rounded-ee-[calc(var(--u)*5.2)] bg-[#C51E28]">
                <Image
                  src={images.courtyardTree}
                  alt=""
                  fill
                  sizes="calc(var(--u)*17)"
                  className="object-cover grayscale contrast-[1.35] mix-blend-multiply"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#E0303C]/25 via-transparent to-[#7E0B12]/35" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
