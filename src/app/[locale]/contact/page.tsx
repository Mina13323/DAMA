import type { Metadata } from "next";
import { ArrowRight, Clock, Mail, MapPin, Phone, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section aria-labelledby="contact-hero-title" className="relative isolate overflow-hidden bg-gradient-to-b from-[#8bbde6]/30 via-[#eaf4fb]/50 via-40% to-white pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#8bbde6]/35 via-[#eaf4fb]/45 to-transparent blur-3xl rtl:translate-x-1/2"
        />
        <div className="container-x">
          <div className="max-w-2xl">
            <div className="enter-up inline-flex items-center gap-2 rounded-full border border-[#8bbde6]/50 bg-white/90 px-4 py-1.5 shadow-2xs backdrop-blur-md" style={{ animationDelay: "100ms" }}>
              <Sparkles aria-hidden className="size-3.5 text-[#477da9]" />
              <span className="text-[11px] font-semibold tracking-[0.24em] text-[#18344a] uppercase rtl:tracking-normal">
                {t.hero.eyebrow}
              </span>
            </div>
            <Lines
              as="h1"
              id="contact-hero-title"
              mode="enter"
              lines={t.hero.titleLines}
              className="heading-xl mt-6 text-3xl font-light tracking-tight text-[#15191d] sm:text-5xl lg:text-6xl"
            />
            <p className="enter-up mt-6 max-w-xl text-[15px] font-light leading-relaxed text-[#626b73] sm:text-lg" style={{ animationDelay: "500ms" }}>
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
            <div data-reveal="card" style={stagger(1)} className="rounded-[28px] border border-[#e5e9ed] bg-[#f4f8fb] p-7 shadow-xs transition-all hover:shadow-md">
              <div className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#eaf4fb] text-[#477da9] border border-[#8bbde6]/30">
                  <MapPin aria-hidden strokeWidth={1.5} className="size-5" />
                </span>
                <div>
                  <h2 className="text-[15px] font-semibold text-[#15191d]">{c.salesLounge.title}</h2>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#626b73]">{c.salesLounge.address}</p>
                  <p className="mt-2 text-[12px] font-medium text-[#477da9]">{c.salesLounge.note}</p>
                </div>
              </div>
            </div>

            {/* Phone & Hotline */}
            <div data-reveal="card" style={stagger(2)} className="rounded-[28px] border border-[#e5e9ed] bg-[#f4f8fb] p-7 shadow-xs transition-all hover:shadow-md">
              <div className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#eaf4fb] text-[#477da9] border border-[#8bbde6]/30">
                  <Phone aria-hidden strokeWidth={1.5} className="size-5" />
                </span>
                <div>
                  <h2 className="text-[15px] font-semibold text-[#15191d]">{c.phone.title}</h2>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="mt-1.5 inline-block text-[15px] font-medium text-[#15191d] transition-colors hover:text-[#477da9]"
                    dir="ltr"
                  >
                    {c.phone.number}
                  </a>
                  <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[#626b73]">
                    <Clock aria-hidden className="size-3.5" />
                    <span>{c.phone.hours}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Emails */}
            <div data-reveal="card" style={stagger(3)} className="rounded-[28px] border border-[#e5e9ed] bg-[#f4f8fb] p-7 shadow-xs transition-all hover:shadow-md">
              <div className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#eaf4fb] text-[#477da9] border border-[#8bbde6]/30">
                  <Mail aria-hidden strokeWidth={1.5} className="size-5" />
                </span>
                <div>
                  <h2 className="text-[15px] font-semibold text-[#15191d]">{c.email.title}</h2>
                  <ul className="mt-2 space-y-1.5 text-[13.5px]">
                    <li>
                      <span className="text-[#626b73]">General: </span>
                      <a href={`mailto:${c.email.general}`} className="text-[#15191d] hover:text-[#477da9] transition-colors">
                        {c.email.general}
                      </a>
                    </li>
                    <li>
                      <span className="text-[#626b73]">Sales & Inquiries: </span>
                      <a href={`mailto:${c.email.sales}`} className="text-[#15191d] hover:text-[#477da9] transition-colors">
                        {c.email.sales}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Map & Travel Landmarks */}
            <div data-reveal="card" style={stagger(4)} className="rounded-[28px] border border-[#e5e9ed] bg-[#f4f8fb] p-7 shadow-xs">
              <h2 className="text-[15px] font-semibold text-[#15191d]">{c.map.title}</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#626b73]">{c.map.landmarks}</p>
              {contact.mapUrl && (
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#e5e9ed] bg-white px-5 py-2.5 text-[12.5px] font-semibold text-[#15191d] shadow-2xs transition-all hover:border-[#18344a] hover:bg-[#18344a] hover:text-white"
                >
                  {c.map.viewMap}
                  <ArrowRight aria-hidden className="flip-rtl size-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div data-reveal="up" style={stagger(2)} className="rounded-[32px] border border-[#e5e9ed] bg-white p-7 shadow-[0_20px_50px_-15px_rgba(24,52,74,0.1)] sm:p-10 lg:col-span-7">
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
