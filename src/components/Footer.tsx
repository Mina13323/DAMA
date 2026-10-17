import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { contact, projects, social } from "@/content/site";
import { Logo } from "./ui";
import { stagger } from "./motion/Lines";

const socialIcons: Record<(typeof social)[number]["label"], string> = {
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

  const quick = [
    { href: base, label: dict.nav.home },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/projects`, label: dict.nav.projects },
    { href: `${base}/news`, label: dict.nav.news },
    { href: `${base}/careers`, label: dict.nav.careers },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  const linkCls = "inline-flex min-h-8 items-center text-[13.5px] text-muted transition-colors hover:text-ink";

  return (
    <footer className="bg-white">
      <div className="container-x grid gap-12 pb-10 pt-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:pt-20">
        <div data-reveal="up" style={stagger(0)} className="sm:col-span-2 lg:col-span-4">
          <Link href={base} aria-label={dict.a11y.home} className="inline-block">
            <Logo />
          </Link>
          <p lang="ar" dir="rtl" className="mt-5 w-fit font-arabic text-xl font-medium text-ink">
            نبني الأرض، نحترم الحياة
          </p>
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-muted">{t.description}</p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-2" aria-label={t.follow}>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                  >
                    <svg aria-hidden viewBox="0 0 24 24" className="size-4 fill-current">
                      <path d={socialIcons[s.label]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav data-reveal="up" style={stagger(1)} aria-label={t.quickLinks} className="lg:col-span-2">
          <h2 className="text-[13px] font-semibold text-ink">{t.quickLinks}</h2>
          <ul className="mt-4 space-y-1">
            {quick.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav data-reveal="up" style={stagger(2)} aria-label={t.ourProjects} className="lg:col-span-2">
          <h2 className="text-[13px] font-semibold text-ink">{t.ourProjects}</h2>
          <ul className="mt-4 space-y-1">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`${base}/projects/${p.slug}`} className={linkCls} dir="ltr">
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`${base}/projects`} className={linkCls}>
                {t.allProjects}
              </Link>
            </li>
          </ul>
        </nav>

        <div id="contact" data-reveal="up" style={stagger(3)} className="sm:col-span-2 lg:col-span-4">
          <h2 className="text-[13px] font-semibold text-ink">{t.getInTouch}</h2>
          <ul className="mt-4 space-y-3 text-[13.5px] text-muted">
            <li className="flex items-center gap-3">
              <MapPin aria-hidden strokeWidth={1.5} className="size-4 shrink-0 text-ink" />
              {t.location}
            </li>
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-ink" dir="ltr">
                  <Phone aria-hidden strokeWidth={1.5} className="size-4 shrink-0 text-ink" />
                  {contact.phone}
                </a>
              </li>
            )}
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-ink">
                  <Mail aria-hidden strokeWidth={1.5} className="size-4 shrink-0 text-ink" />
                  {contact.email}
                </a>
              </li>
            )}
            {!contact.phone && !contact.email && (
              <li className="max-w-xs rounded-2xl bg-paper px-4 py-3 text-[12.5px] leading-relaxed">{t.contactPending}</li>
            )}
          </ul>
          {contact.mapUrl && (
            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-ink hover:text-deep"
            >
              {t.viewMap}
              <ArrowRight aria-hidden className="flip-rtl size-4" />
            </a>
          )}
        </div>
      </div>

      <div className="container-x flex flex-col gap-4 border-t border-line py-6 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {t.rights}
        </p>
        <ul className="flex gap-6">
          <li>
            <Link href={`${base}/privacy-policy`} className="hover:text-ink">
              {t.privacy}
            </Link>
          </li>
          <li>
            <Link href={`${base}/terms-of-use`} className="hover:text-ink">
              {t.terms}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
