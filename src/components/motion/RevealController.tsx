"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Masked image frames start fully clipped, which IntersectionObserver reports as invisible. */
const maskedTypes = new Set(["wipe", "diag", "organic"]);
const SELECTOR = "[data-reveal]:not(.is-in)";

/** React tags each DOM node it has hydrated with an internal `__reactFiber$…` key. */
const isHydrated = (el: Element) => Object.keys(el).some((k) => k.startsWith("__reactFiber$"));
const pending = new WeakSet<Element>();

/**
 * Adds `.is-in`, but only once React has hydrated the element: the page segment
 * can hydrate after this controller's effect runs (it sits behind loading.tsx's
 * Suspense boundary), and a class added before then is a hydration mismatch.
 * Falls back to revealing anyway after ~2s so content can never stay hidden.
 */
function reveal(el: HTMLElement, tries = 0) {
  if (isHydrated(el) || tries >= 40) {
    pending.delete(el);
    el.classList.add("is-in");
    return;
  }
  if (tries === 0 && pending.has(el)) return;
  pending.add(el);
  setTimeout(() => reveal(el, tries + 1), 50);
}

/**
 * Boots the CSS reveal system: observes every [data-reveal] element and adds
 * `.is-in` once it enters the viewport (one-shot, no re-renders). Elements
 * added later (e.g. after filtering a list) are picked up automatically.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    if (!root.classList.contains("reveal-on") || !("IntersectionObserver" in window)) {
      const revealAll = () => document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => reveal(el));
      revealAll();
      const mo = new MutationObserver(revealAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const watched = new Map<Element, HTMLElement[]>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          watched.get(entry.target)?.forEach((el) => reveal(el));
          watched.delete(entry.target);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );

    const track = (scope: ParentNode) => {
      const found = Array.from(scope.querySelectorAll<HTMLElement>(SELECTOR));
      if (scope instanceof HTMLElement && scope.matches(SELECTOR)) found.unshift(scope);
      for (const el of found) {
        // Watch the unclipped parent of masked frames instead of the frame itself.
        const key = maskedTypes.has(el.dataset.reveal ?? "") && el.parentElement ? el.parentElement : el;
        const list = watched.get(key);
        if (list) {
          if (!list.includes(el)) list.push(el);
        } else {
          watched.set(key, [el]);
          io.observe(key);
        }
      }
    };

    track(document);
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof HTMLElement && track(n));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
