import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Breadcrumbs } from "@/components/ui";
import { stagger } from "@/components/motion/Lines";
import { getDictionary, locales, type Locale } from "@/content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.termsPage.meta.title,
    description: dict.termsPage.meta.description,
    alternates: {
      canonical: `/${locale}/terms-of-use`,
      languages: { en: "/en/terms-of-use", ar: "/ar/terms-of-use" },
    },
  };
}

export default async function TermsOfUsePage({ params }: { params: Params }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const t = dict.termsPage;

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: t.hero.title },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA]">
      <header className="container-x pt-32 sm:pt-40 pb-12">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-8 flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full border border-[#C51E28]/35 bg-[#FDF2F2] text-[#C51E28]">
            <FileText aria-hidden className="size-4" />
          </span>
          <span className="text-[11px] font-semibold tracking-[0.24em] text-[#C51E28] uppercase rtl:tracking-normal">
            {t.hero.eyebrow}
          </span>
        </div>

        <h1 className="mt-4 font-serif text-[clamp(2.5rem,4.5vw,3.75rem)] font-normal text-[#14171A]">
          <span className="enter-line block">{t.hero.title}</span>
        </h1>

        <p className="mt-3 text-[13px] text-[#8C939B]">{t.hero.lastUpdated}</p>
      </header>

      <main className="container-x pb-24 sm:pb-32">
        <div className="max-w-3xl rounded-[32px] bg-white p-8 sm:p-14 shadow-sm border border-[#ECEAE5]">
          <div className="space-y-10">
            {t.sections.map((section, idx) => (
              <section key={idx} data-reveal="up" style={stagger(idx)}>
                <h2 className="font-serif text-[clamp(1.4rem,2.2vw,1.8rem)] font-normal text-[#14171A]">{section.heading}</h2>
                <div className="mt-4 space-y-3">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-[15.5px] leading-relaxed text-[#555E68]">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 border-t border-[#ECEAE5] pt-8">
            <Link
              href={`/${locale}`}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-[#ECEAE5] bg-white px-7 text-[13px] font-semibold text-[#14171A] shadow-xs transition-colors hover:border-[#C51E28] hover:text-[#C51E28]"
            >
              <ArrowLeft aria-hidden className="flip-rtl size-4" />
              <span>{dict.pages.backHome}</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
