"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Globe, Menu, X } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { Logo } from "./ui";

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const base = `/${locale}`;
  const isHome = pathname === base;
  // Pages with a full-bleed hero start with a transparent header.
  const overHero = isHome || pathname === `${base}/about` || pathname.startsWith(`${base}/projects`);
  const solid = scrolled || !overHero;

  const links = [
    { href: base, label: dict.nav.home, active: isHome },
    { href: `${base}/about`, label: dict.nav.about, active: pathname === `${base}/about` },
    { href: `${base}/projects`, label: dict.nav.projects, active: pathname.startsWith(`${base}/projects`) },
    { href: `${base}#lifestyle`, label: dict.nav.lifestyle, active: false },
    { href: `${base}#sustainability`, label: dict.nav.sustainability, active: false },
    { href: `${base}/contact`, label: dict.nav.contact, active: pathname === `${base}/contact` },
  ];

  const otherLocale = locale === "en" ? "ar" : "en";
  const switchHref = pathname.replace(/^\/(en|ar)/, `/${otherLocale}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {dict.a11y.skip}
      </a>
      <header
        className={`enter-fade fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ease-soft ${
          solid ? "bg-white/90 py-3 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "py-5 lg:py-6"
        }`}
      >
        <div className="flex items-center justify-between gap-6 px-4 sm:px-8 lg:pe-[calc(var(--u)*5.1)] lg:ps-[calc(var(--u)*6.8)]">
          <Link href={base} aria-label={dict.a11y.home} className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label={dict.a11y.primaryNav} className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-10">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    aria-current={l.active ? "page" : undefined}
                    className="group relative block py-2 text-[12px] font-medium whitespace-nowrap text-[#14171A]/70 xl:text-[12.5px] transition-colors hover:text-[#C51E28] aria-[current=page]:font-semibold aria-[current=page]:text-[#14171A]"
                  >
                    {l.active && (
                      <span
                        aria-hidden
                        className="absolute -bottom-1.5 left-1/2 h-[3px] w-[110%] -translate-x-1/2 rounded-full bg-[#C51E28]"
                      />
                    )}
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={`${base}/projects`}
              aria-label="Search"
              className="flex size-9 items-center justify-center rounded-full text-[#14171A]/70 transition-colors hover:bg-black/5 hover:text-[#14171A]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5" aria-hidden>
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </Link>

            <Link
              href={switchHref}
              hrefLang={otherLocale}
              lang={otherLocale}
              aria-label={dict.a11y.switchLang}
              className="flex size-9 items-center justify-center rounded-full text-[#14171A]/70 transition-colors hover:bg-black/5 hover:text-[#14171A]"
            >
              <Globe aria-hidden className="size-4" />
            </Link>

            <Link
              href={`${base}/contact`}
              className="group ms-1 hidden min-h-12 items-center gap-3 whitespace-nowrap rounded-full xl:ms-2 xl:gap-5 bg-[#16191C] py-1.5 ps-6 pe-1.5 text-[12.5px] font-medium text-white shadow-[0_8px_20px_-8px_rgba(20,23,26,0.45)] transition-all duration-200 hover:bg-[#23292F] sm:inline-flex"
            >
              <span>{dict.getInTouch}</span>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#C51E28] text-white transition-transform duration-200 group-hover:scale-105">
                <ArrowRight aria-hidden className="flip-rtl size-4" />
              </span>
            </Link>

            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[#14171A] backdrop-blur lg:hidden"
              aria-label={dict.a11y.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={dict.a11y.primaryNav}
        hidden={!open}
        className="fixed inset-0 z-[70] flex flex-col bg-[#FBFBFA] lg:hidden"
      >
        <div className="container-x flex items-center justify-between py-5 border-b border-[#ECEAE5]">
          <Logo />
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label={dict.a11y.closeMenu}
            className="inline-flex size-11 items-center justify-center rounded-full border border-[#ECEAE5] bg-white text-[#14171A] hover:border-[#C51E28] hover:text-[#C51E28]"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <nav aria-label={dict.a11y.primaryNav} className="container-x mt-6 flex-1 overflow-y-auto">
          <ul className="divide-y divide-[#ECEAE5] border-y border-[#ECEAE5]">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={l.active ? "page" : undefined}
                  className="flex min-h-14 items-center justify-between py-3 font-serif text-2xl text-[#14171A] aria-[current=page]:text-[#C51E28] aria-[current=page]:font-medium"
                >
                  {l.label}
                  <ArrowRight aria-hidden className="flip-rtl size-5 text-[#8C939B]" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-x pb-8 pt-6">
          <Link
            href={`${base}/contact`}
            onClick={() => setOpen(false)}
            className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#C51E28] text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#9F121A]"
          >
            {dict.getInTouch}
            <ArrowRight aria-hidden className="flip-rtl size-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
