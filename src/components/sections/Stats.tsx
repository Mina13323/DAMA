import { Building2, MapPin, Map as Plan, UsersRound } from "lucide-react";
import type { Dictionary } from "@/content";
import { Counter } from "../motion/Counter";
import { stagger } from "../motion/Lines";

const icons = [Building2, Plan, UsersRound, MapPin];
const isNumeric = (v: string) => /\d/.test(v);

/** `band` renders the strip as a standalone bordered band (About page) instead of following the hero curve. */
export function Stats({ dict, band = false }: { dict: Dictionary; band?: boolean }) {
  return (
    <section aria-label={dict.stats.map((s) => s.label).join(", ")} className={band ? "relative border-b border-line bg-white" : "relative bg-white"}>
      <div className={band ? "container-x py-10 lg:py-12" : "container-x pb-14 pt-4 lg:pb-20 lg:pt-2"}>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-8 lg:grid-cols-4">
          {dict.stats.map((stat, i) => {
            const Icon = icons[i];
            const numeric = isNumeric(stat.value);
            return (
              <li
                key={stat.label}
                data-reveal="up"
                style={stagger(i)}
                className="flex items-start gap-3 sm:gap-4 lg:border-s lg:border-line lg:ps-8 lg:first:border-s-0 lg:first:ps-0"
              >
                <Icon aria-hidden strokeWidth={1.25} className="mt-1 size-8 shrink-0 text-deep sm:size-10" />
                <div>
                  <p
                    className={
                      numeric
                        ? "font-sans text-[30px] font-semibold leading-none tracking-tight tabular-nums text-ink sm:text-[40px]"
                        : "pt-0.5 text-[15px] font-semibold leading-tight text-ink sm:text-lg"
                    }
                  >
                    {numeric ? <Counter value={stat.value} /> : stat.value}
                  </p>
                  <p className="mt-2 text-[12px] leading-snug text-muted sm:text-[13px]">{stat.label}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
