"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const pattern = /^(\D*)([\d,]+)(\D*)$/;

/**
 * Counts a numeric stat up once when it enters the viewport, keeping any
 * prefix/suffix ("15+", "+5,000"). Server HTML holds the final value, so the
 * figure is correct without JS and for reduced-motion users.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const armed = useRef(false);

  // Before the stat is seen, park it at zero (it is off-screen, so no flash).
  useEffect(() => {
    const el = ref.current;
    const match = value.match(pattern);
    if (!el || !match || reduce || armed.current) return;
    el.textContent = `${match[1]}0${match[3]}`;
    armed.current = true;
  }, [value, reduce]);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(pattern);
    if (!el || !match || !inView || !armed.current) return;
    const target = Number(match[2].replace(/,/g, ""));
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${match[1]}${Math.round(v).toLocaleString("en-US")}${match[3]}`;
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <>
      <span ref={ref} aria-hidden className={className}>
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
