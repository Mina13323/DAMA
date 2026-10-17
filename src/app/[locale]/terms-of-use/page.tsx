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
    <div className="min-h-screen bg-white">
      <header className="container-x pt-32 sm:pt-40 pb-12">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-8 flex items-center gap-2.5 text-deep">
          <FileText aria-hidden className="size-5" />
          <span className="eyebrow">{t.hero.eyebrow}</span>
        </div>

        <h1 className="heading-xl mt-4 text-ink">
          <span className="enter-line block">{t.hero.title}</span>
        </h1>

        <p className="mt-3 text-[13px] text-muted">{t.hero.lastUpdated}</p>
      </header>

      <main className="container-x pb-24 sm:pb-32">
        <div className="max-w-3xl rounded-[32px] bg-white p-8 sm:p-14 shadow-sm border border-line">
          <div className="space-y-10">
            {t.sections.map((section, idx) => (
              <section key={idx} data-reveal="up" style={stagger(idx)}>
                <h2 className="heading-md text-ink">{section.heading}</h2>
                <div className="mt-4 space-y-3">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-[15px] leading-relaxed text-ink/80">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 border-t border-line pt-8">
            <Link
              href={`/${locale}`}
              className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line bg-white px-6 text-[13px] font-semibold text-ink shadow-sm transition-colors hover:border-ink hover:bg-ink hover:text-white"
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
