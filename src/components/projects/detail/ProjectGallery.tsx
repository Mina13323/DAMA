"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { Dictionary } from "@/content";
import { Lines, stagger } from "../../motion/Lines";
import { fill } from "../format";

/* Asymmetric layout: a tall lead image, then a rhythm of wide and square tiles. */
const tile = ["sm:col-span-2 sm:row-span-2", "sm:col-span-2", "", "", "sm:col-span-4"];

export function ProjectGallery({ images, name, labels }: { images: string[]; name: string; labels: Dictionary["projectDetail"]["gallery"] }) {
  const [open, setOpen] = useState<number | null>(null);
  const total = images.length;
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + total) % total)), [total]);

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const rtl = document.documentElement.dir === "rtl";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    const trigger = triggerRef.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
    // Re-run only when opening/closing, not on every slide change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open === null, go]);

  const alt = (i: number) => fill(labels.alt, { name, n: i + 1 });
  const ctrl =
    "inline-flex size-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-200 hover:bg-white hover:text-ink";

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-36 bg-[#FBFBFA] border-t border-[#ECEAE5]">
      <div className="container-x py-20 sm:py-24 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div data-reveal="fade" className="flex items-center gap-3">
              <span className="h-[2px] w-4 rounded-full bg-[#C51E28]" aria-hidden />
              <p className="text-[10.5px] font-medium tracking-[0.28em] text-[#687076] uppercase rtl:tracking-normal">
                {labels.eyebrow}
              </p>
            </div>
            <Lines id="gallery-title" lines={labels.titleLines} delay={1} className="font-serif text-[clamp(2.2rem,4vw,3.25rem)] font-normal leading-tight text-[#14171A] mt-4" />
          </div>
        </div>

        <ul className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-4 lg:auto-rows-[260px]">
          {images.map((src, i) => (
            <li key={src} className={`${i === 0 ? "col-span-2" : ""} ${tile[i % tile.length]} relative`}>
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setOpen(i);
                }}
                aria-label={fill(labels.open, { n: i + 1, total })}
                className="group relative block size-full overflow-hidden rounded-[24px] border border-[#ECEAE5] shadow-xs"
              >
                <div data-reveal="zoom" style={stagger(i)} className="absolute inset-0">
                  <Image
                    src={src}
                    alt={alt(i)}
                    fill
                    sizes={i === 0 ? "(min-width:640px) 50vw, 100vw" : "(min-width:640px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-[1.1s] ease-soft group-hover:scale-[1.05]"
                  />
                </div>
                <span
                  aria-hidden
                  className="absolute bottom-3 end-3 inline-flex size-9 items-center justify-center rounded-full bg-[#C51E28] text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Expand className="size-4" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt(open)}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/95 text-white"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            const rtl = document.documentElement.dir === "rtl";
            if (Math.abs(dx) > 50) go((dx < 0) !== rtl ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-8">
            <p className="text-[13px] text-white/70" aria-live="polite" dir="ltr">
              {fill(labels.counter, { n: open + 1, total })}
            </p>
            <button ref={closeRef} type="button" onClick={() => setOpen(null)} aria-label={labels.close} className={ctrl}>
              <X aria-hidden className="size-5" />
            </button>
          </div>
          <div className="relative flex-1">
            <Image key={images[open]} src={images[open]} alt={alt(open)} fill sizes="100vw" className="enter-fade object-contain" />
          </div>
          <div className="flex items-center justify-center gap-4 py-5">
            <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className={ctrl}>
              <ArrowLeft aria-hidden className="flip-rtl size-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={labels.next} className={ctrl}>
              <ArrowRight aria-hidden className="flip-rtl size-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
