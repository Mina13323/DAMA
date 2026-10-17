import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { Lines, stagger } from "./motion/Lines";

type Variant = "red" | "dark" | "light" | "outline" | "sky";

const variants: Record<Variant, string> = {
  red: "bg-[#C51E28] text-white hover:bg-[#9F121A] shadow-sm hover:shadow-md transition-all duration-200",
  dark: "bg-[#111417] text-white hover:bg-[#262B30] shadow-sm hover:shadow-md transition-all duration-200",
  light: "bg-white text-[#14171A] hover:bg-[#FDF2F2] border border-[#ECEAE5] shadow-xs transition-all duration-200",
  outline: "border border-[#ECEAE5] text-[#14171A] hover:border-[#C51E28] hover:text-[#C51E28] transition-all duration-200",
  sky: "bg-[#C51E28] text-white hover:bg-[#9F121A] shadow-sm transition-all duration-200",
};

export function ButtonLink({
  href,
  children,
  variant = "red",
  className = "",
  ...rest
}: { href: string; children: ReactNode; variant?: Variant; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className"
>) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-3 rounded-full px-6 py-3 text-[13px] font-semibold tracking-wide transition-colors duration-200 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="flip-rtl size-4 transition-transform duration-200 ease-soft group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
      />
    </Link>
  );
}

export function Button({
  children,
  variant = "red",
  className = "",
  type = "button",
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`group inline-flex min-h-11 items-center justify-center gap-3 rounded-full px-6 py-3 text-[13px] font-semibold tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "sky" | "olive" | "white" | "red";
  className?: string;
}) {
  const tones = {
    neutral: "bg-white text-[#14171A] border border-[#ECEAE5]",
    sky: "bg-[#FDF2F2] text-[#C51E28] border border-[#FCA5A5]",
    olive: "bg-[#111417] text-white border border-[#111417]",
    white: "bg-white/95 text-[#14171A] shadow-sm backdrop-blur",
    red: "bg-[#C51E28] text-white border border-[#C51E28]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider uppercase backdrop-blur rtl:tracking-normal ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Breadcrumbs({
  items,
  className = "",
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={`text-[12.5px] text-muted ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5 sm:gap-2">
              {i > 0 && <ChevronRight aria-hidden className="flip-rtl size-3.5 text-muted/60" />}
              {isLast || !item.href ? (
                <span aria-current={isLast ? "page" : undefined} className="font-medium text-ink">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const isDark = tone === "dark";
  const textColor = isDark ? "text-[#14171A]" : "text-white";
  return (
    <div className={`flex items-center gap-2.5 ${textColor}`} dir="ltr">
      {/* Geometric architectural logo mark */}
      <svg viewBox="0 0 32 32" fill="none" className="size-7 shrink-0" aria-hidden>
        <path d="M4 26L16 6L28 26H4Z" fill="currentColor" opacity="0.9" />
        <path d="M16 6L4 26H16V6Z" fill="currentColor" />
        <path d="M16 14L22 26H16V14Z" fill={isDark ? "#C51E28" : "#FF6B6B"} />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-sans text-[20px] font-black tracking-[0.06em]">DAMA</span>
        <span className="mt-0.5 font-sans text-[7.5px] font-bold tracking-[0.38em] opacity-80">DEVELOPMENTS</span>
      </div>
    </div>
  );
}

/**
 * Section heading block with the standard reveal sequence:
 * eyebrow → headline lines → supporting copy → action (children).
 */
export function SectionIntro({
  eyebrow,
  lines,
  body,
  id,
  tone = "dark",
  size = "lg",
  delay = 0,
  children,
}: {
  eyebrow: string;
  lines: readonly string[];
  body?: string;
  id?: string;
  tone?: "dark" | "light";
  size?: "lg" | "xl";
  delay?: number;
  children?: ReactNode;
}) {
  const light = tone === "light";
  const lineCount = lines.length;
  return (
    <div>
      <p data-reveal="fade" style={stagger(delay)} className={`eyebrow ${light ? "!text-white/80" : ""}`}>
        {eyebrow}
      </p>
      <Lines
        id={id}
        lines={lines}
        delay={delay + 1}
        className={`${size === "xl" ? "heading-xl" : "heading-lg"} mt-4 ${light ? "text-white [&_.text-deep]:text-sky" : "text-ink"}`}
      />
      {body && (
        <p
          data-reveal="up"
          style={stagger(delay + lineCount + 1)}
          className={`mt-5 max-w-md text-[15px] leading-relaxed ${light ? "text-white/85" : "text-muted"}`}
        >
          {body}
        </p>
      )}
      {children && (
        <div data-reveal="up" style={stagger(delay + lineCount + 2)} className="mt-8">
          {children}
        </div>
      )}
    </div>
  );
}
