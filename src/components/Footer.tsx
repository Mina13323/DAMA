import Link from "next/link";
import type { Dictionary, Locale } from "@/content";
import { social } from "@/content/site";
import { Logo } from "./ui";
import { stagger } from "./motion/Lines";

const socialIcons: Record<string, string> = {
  Instagram:
    "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 3c-2.4 0-2.7 0-3.7.1-3.3.2-5 1.9-5.2 5.2C3 9.3 3 9.6 3 12s0 2.7.1 3.7c.2 3.3 1.9 5 5.2 5.2 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c3.3-.2 5-1.9 5.2-5.2.1-1 .1-1.3.1-3.7s0-2.7-.1-3.7c-.2-3.3-1.9-5-5.2-5.2C14.7 3 14.4 3 12 3Z",
  LinkedIn:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2.06 3.8-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4V9.5Z",
  YouTube:
    "M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z",
  Facebook:
    "M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.86.24-1.45 1.48-1.45H16.5V4.47A20 20 0 0 0 14.2 4.4c-2.28 0-3.84 1.39-3.84 3.95v2.15H7.8v3h2.56V21h3.14Z",
};

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.footer;
  const base = `/${locale}`;
  const year = new Date().getFullYear();
  const socials = social.filter((s) => s.href);

  const quickLinks = [
    { href: `${base}/about`, label: locale === "ar" ? "من نحن" : "About" },
    { href: `${base}/projects`, label: locale === "ar" ? "مشروعاتنا" : "Our Projects" },
    { href: `${base}#lifestyle`, label: locale === "ar" ? "تجربة العيش" : "Living Experience" },
    { href: `${base}#sustainability`, label: locale === "ar" ? "الاستدامة" : "Sustainability" },
  ];

  const projectLinks = [
    { href: `${base}/projects/rwasin`, label: locale === "ar" ? "رواسين" : "Rawasin" },
    { href: `${base}/projects`, label: locale === "ar" ? "مجتمعاتنا" : "Communities" },
    { href: `${base}/projects`, label: locale === "ar" ? "مشروعات مستقبلية" : "Future Developments" },
  ];

  const contactLinks = [
    { href: `${base}/contact`, label: locale === "ar" ? "تواصل معنا" : "Get in Touch" },
    { href: `${base}/careers`, label: locale === "ar" ? "الوظائف" : "Careers" },
    { href: `${base}/news`, label: locale === "ar" ? "المركز الإعلامي" : "Media Kit" },
  ];

  const linkCls = "inline-flex min-h-8 items-center text-[13px] text-white/70 transition-colors hover:text-[#C51E28]";

  return (
    <footer className="relative bg-[#111417] text-white">
      {/* Architectural Curved Shoulder Transition from Canvas to Dark Footer */}
      <div className="relative h-10 sm:h-14 w-full overflow-hidden bg-[#FBFBFA]">
        <div className="absolute inset-0 bg-[#111417] rounded-tl-[48px] sm:rounded-tl-[72px] rtl:rounded-tl-none rtl:rounded-tr-[48px] rtl:sm:rounded-tr-[72px]" />
      </div>

      <div className="container-x pb-10 pt-4 lg:pb-12 lg:pt-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Logo, Description, and Socials */}
          <div data-reveal="up" style={stagger(0)} className="sm:col-span-2 lg:col-span-5">
            <Link href={base} aria-label={dict.a11y.home} className="inline-block">
              <Logo tone="light" />
            </Link>
            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-white/70">
              {locale === "ar"
                ? "نبتكر مجتمعات نابضة بالحياة من خلال التصميم المدروس والجودة الدائمة ومستقبل أكثر استدامة."
                : "Creating vibrant communities through thoughtful design, lasting quality, and a more sustainable future."}
            </p>

            {/* Social Icons */}
            {socials.length > 0 && (
              <ul className="mt-8 flex gap-3" aria-label={t.follow}>
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-200 hover:border-[#C51E28] hover:bg-[#C51E28]"
                    >
                      <svg aria-hidden viewBox="0 0 24 24" className="size-4 fill-current">
                        <path d={socialIcons[s.label] || ""} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick Links Column */}
          <nav data-reveal="up" style={stagger(1)} aria-label="Quick Links" className="lg:col-span-2 lg:col-start-7">
            <h3 className="text-[11.5px] font-bold tracking-wider text-white uppercase">
              {locale === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="mt-5 space-y-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Our Projects Column */}
          <nav data-reveal="up" style={stagger(2)} aria-label="Our Projects" className="lg:col-span-2">
            <h3 className="text-[11.5px] font-bold tracking-wider text-white uppercase">
              {locale === "ar" ? "مشروعاتنا" : "Our Projects"}
            </h3>
            <ul className="mt-5 space-y-2">
              {projectLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Column */}
          <nav data-reveal="up" style={stagger(3)} aria-label="Contact" className="lg:col-span-2">
            <h3 className="text-[11.5px] font-bold tracking-wider text-white uppercase">
              {locale === "ar" ? "تواصل معنا" : "Contact"}
            </h3>
            <ul className="mt-5 space-y-2">
              {contactLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar with Red Dash Accent */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-[12px] text-white/50 sm:flex-row">
          <p>© {year} DAMA Developments. {locale === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] text-white/80 uppercase">
            <span className="h-0.5 w-4 bg-[#C51E28]" aria-hidden />
            <span>FOR A BRIGHTER TOMORROW</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
