import type { Metadata } from "next";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Lines, stagger } from "@/components/motion/Lines";
import { SectionIntro } from "@/components/ui";
import { getDictionary, locales, type Locale } from "@/content";
import { contact } from "@/content/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.contactPage.meta.title,
    description: dict.contactPage.meta.description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: "/en/contact", ar: "/ar/contact" },
    },
    openGraph: {
      title: dict.contactPage.meta.title,
      description: dict.contactPage.meta.description,
      type: "website",
    },
  };
}

export default async function ContactPage({ params }: { params: Params }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const t = dict.contactPage;
  const c = t.cards;

  return (
    <div className="min-h-screen bg-[#FBFBFA]">
      {/* Hero */}
      <section aria-labelledby="contact-hero-title" className="relative isolate overflow-hidden bg-[#FBFBFA] pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44">
        {/* Soft atmospheric glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#F2ECE4]/70 via-[#FBFBFA]/60 to-transparent blur-3xl rtl:translate-x-1/2"
        />

        {/* Decorative red organic arch drop */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 end-10 -z-10 h-72 w-52 rounded-t-full rounded-bl-[140px] bg-gradient-to-b from-[#C51E28] to-[#9F121A] opacity-90 hidden lg:block shadow-lg"
        />
        {/* Soft stone arch accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 start-8 -z-10 h-40 w-24 rounded-full bg-[#EDEBE5]/80"
        />

        <div className="container-x">
          <div className="max-w-2xl">
            <div className="enter-up flex items-center gap-3">
              <span className="h-[2px] w-5 rounded-full bg-[#C51E28]" aria-hidden />
              <p className="text-[10.5px] font-medium tracking-[0.28em] text-[#687076] uppercase rtl:tracking-normal">
                {t.hero.eyebrow}
              </p>
            </div>
            <Lines
              as="h1"
              id="contact-hero-title"
              mode="enter"
              lines={t.hero.titleLines}
              className="mt-6 font-serif text-[clamp(2.75rem,5.5vw,4.5rem)] font-normal leading-[1.08] tracking-tight text-[#14171A]"
            />
            <p className="enter-up mt-6 max-w-xl text-[16px] font-normal leading-relaxed text-[#555E68] sm:text-lg" style={{ animationDelay: "500ms" }}>
              {t.hero.body}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Info Cards (Left) + Direct Form (Right) */}
      <section className="container-x pb-24 sm:pb-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Contact Details & Cards */}
          <div className="space-y-6 lg:col-span-5">
            {/* Sales Lounge */}
            <div data-reveal="card" style={stagger(1)} className="group rounded-[28px] border border-[#ECEAE5] bg-white p-7 shadow-xs transition-all hover:border-[#C51E28]/40 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#C51E28]/35 bg-[#FDF2F2] text-[#C51E28] transition-transform group-hover:scale-105">
                  <MapPin aria-hidden strokeWidth={1.8} className="size-5" />
                </span>
                <div>
                  <h2 className="font-serif text-[17px] font-normal text-[#14171A]">{c.salesLounge.title}</h2>
                  <p className="mt-1.5 text-[13.5px] font-normal leading-relaxed text-[#555E68]">{c.salesLounge.address}</p>
                  <p className="mt-2 text-[12px] font-semibold text-[#C51E28]">{c.salesLounge.note}</p>
                </div>
              </div>
            </div>

            {/* Phone & Hotline */}
            <div data-reveal="card" style={stagger(2)} className="group rounded-[28px] border border-[#ECEAE5] bg-white p-7 shadow-xs transition-all hover:border-[#C51E28]/40 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#C51E28]/35 bg-[#FDF2F2] text-[#C51E28] transition-transform group-hover:scale-105">
                  <Phone aria-hidden strokeWidth={1.8} className="size-5" />
                </span>
                <div>
                  <h2 className="font-serif text-[17px] font-normal text-[#14171A]">{c.phone.title}</h2>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="mt-1.5 inline-block text-[15px] font-medium text-[#14171A] transition-colors hover:text-[#C51E28]"
                    dir="ltr"
                  >
                    {c.phone.number}
                  </a>
                  <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[#687076]">
                    <Clock aria-hidden className="size-3.5 text-[#C51E28]" />
                    <span>{c.phone.hours}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Emails */}
            <div data-reveal="card" style={stagger(3)} className="group rounded-[28px] border border-[#ECEAE5] bg-white p-7 shadow-xs transition-all hover:border-[#C51E28]/40 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#C51E28]/35 bg-[#FDF2F2] text-[#C51E28] transition-transform group-hover:scale-105">
                  <Mail aria-hidden strokeWidth={1.8} className="size-5" />
                </span>
                <div>
                  <h2 className="font-serif text-[17px] font-normal text-[#14171A]">{c.email.title}</h2>
                  <ul className="mt-2 space-y-1.5 text-[13.5px]">
                    <li>
                      <span className="text-[#687076]">General: </span>
                      <a href={`mailto:${c.email.general}`} className="text-[#14171A] hover:text-[#C51E28] transition-colors font-medium">
                        {c.email.general}
                      </a>
                    </li>
                    <li>
                      <span className="text-[#687076]">Sales & Inquiries: </span>
                      <a href={`mailto:${c.email.sales}`} className="text-[#14171A] hover:text-[#C51E28] transition-colors font-medium">
                        {c.email.sales}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Map & Travel Landmarks */}
            <div data-reveal="card" style={stagger(4)} className="group rounded-[28px] border border-[#ECEAE5] bg-white p-7 shadow-xs transition-all hover:border-[#C51E28]/40 hover:shadow-lg">
              <h2 className="font-serif text-[17px] font-normal text-[#14171A]">{c.map.title}</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#555E68]">{c.map.landmarks}</p>
              {contact.mapUrl && (
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#C51E28] px-6 py-2.5 text-[12.5px] font-semibold text-white shadow-xs transition-all hover:bg-[#9F121A]"
                >
                  {c.map.viewMap}
                  <ArrowRight aria-hidden className="flip-rtl size-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div data-reveal="up" style={stagger(2)} className="rounded-[32px] border border-[#ECEAE5] bg-white p-7 shadow-xl sm:p-10 lg:col-span-7">
            <SectionIntro
              eyebrow={t.form.eyebrow}
              lines={t.form.titleLines}
              body={t.form.body}
            />
            <div className="mt-8">
              <ContactForm locale={locale} labels={t.form} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
