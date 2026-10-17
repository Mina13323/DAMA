"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Touch-friendly scroll-snap track. Arrow controls appear only while the
 * track actually overflows, so they never render as dead buttons.
 */
export function Carousel({
  children,
  label,
  prevLabel,
  nextLabel,
  className = "",
  trackClassName = "",
  controlsClassName = "",
}: {
  children: ReactNode;
  label: string;
  prevLabel: string;
  nextLabel: string;
  className?: string;
  trackClassName?: string;
  controlsClassName?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ overflow: false, atStart: true, atEnd: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft); // RTL reports negative scrollLeft
    setState({ overflow: max > 4, atStart: pos <= 4, atEnd: pos >= max - 4 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (rtl ? -1 : 1) * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  const btn =
    "inline-flex size-11 items-center justify-center rounded-full border border-ink/20 bg-white text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-35";

  return (
    <div className={className}>
      <div
        ref={track}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={state.overflow ? 0 : -1}
        className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain ${trackClassName}`}
      >
        {children}
      </div>
      {state.overflow && (
        <div className={`flex gap-3 ${controlsClassName}`}>
          <button type="button" className={btn} onClick={() => go(-1)} disabled={state.atStart} aria-label={prevLabel}>
            <ArrowLeft aria-hidden className="flip-rtl size-4" />
          </button>
          <button type="button" className={btn} onClick={() => go(1)} disabled={state.atEnd} aria-label={nextLabel}>
            <ArrowRight aria-hidden className="flip-rtl size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
