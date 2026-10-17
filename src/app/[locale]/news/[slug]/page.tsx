import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Quote } from "lucide-react";
import { Breadcrumbs } from "@/components/ui";
import { stagger } from "@/components/motion/Lines";
import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { getNewsArticle, getNewsArticles } from "@/content/news";

export function generateStaticParams() {
  const articles = getNewsArticles();
  return locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getNewsArticle(slug);
  if (!article || !isLocale(locale)) return {};
  const copy = article.copy[locale];
  return {
    title: copy.title,
    description: copy.summary,
    alternates: {
      canonical: `/${locale}/news/${slug}`,
      languages: { en: `/en/news/${slug}`, ar: `/ar/news/${slug}` },
    },
    openGraph: {
      title: copy.title,
      description: copy.summary,
      images: [{ url: article.image }],
      type: "article",
    },
  };
}

export default async function NewsArticlePage({ params }: { params: Params }) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  const dict = getDictionary(locale);
  const copy = article.copy[locale];
  const t = dict.newsPage;
  const allArticles = getNewsArticles();
  const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.news, href: `/${locale}/news` },
    { label: copy.title },
  ];

  return (
    <article className="min-h-screen bg-[#FBFBFA]">
      {/* Top Header & Breadcrumbs */}
      <header className="container-x pt-32 sm:pt-40 pb-8 sm:pb-12">
        <Breadcrumbs items={breadcrumbs} className="enter-fade" />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#FDF2F2] border border-[#FCA5A5]/60 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-[#C51E28] uppercase shadow-2xs">
            {copy.categoryLabel}
          </span>
          <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#8C939B] uppercase">
            <span>{copy.date}</span>
            <span aria-hidden>·</span>
            <Clock aria-hidden className="size-3.5" />
            <span>{copy.readTime}</span>
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.4rem,4.5vw,3.75rem)] font-normal leading-[1.12] text-[#14171A]">
          <span className="enter-line block">{copy.title}</span>
        </h1>

        <p className="enter-up mt-6 max-w-3xl text-[17px] font-normal leading-relaxed text-[#555E68] sm:text-[19px]">
          {copy.leadParagraph}
        </p>
      </header>

      {/* Featured Lead Image */}
      <div className="container-x pb-12 sm:pb-16">
        <div className="clip-slant relative aspect-[16/9] w-full overflow-hidden rounded-[32px] border border-[#ECEAE5] bg-slate-100 shadow-lg sm:aspect-[21/9]">
          <div data-reveal="zoom" className="absolute inset-0">
            <Image
              src={article.image}
              alt={copy.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Body Content */}
      <div className="container-x pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-12">
            {copy.sections.map((section, idx) => (
              <section key={idx} data-reveal="up" style={stagger(idx)} className="space-y-6">
                {section.heading && (
                  <h2 className="font-serif text-[clamp(1.75rem,2.8vw,2.25rem)] font-normal text-[#14171A]">{section.heading}</h2>
                )}

                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-[16px] leading-[1.8] text-[#555E68] sm:text-[17px]">
                    {para}
                  </p>
                ))}

                {section.quote && (
                  <blockquote className="my-8 rounded-[24px] border-s-4 border-[#C51E28] bg-white p-7 sm:p-9 shadow-sm border border-[#ECEAE5]">
                    <Quote aria-hidden className="size-8 text-[#C51E28]" />
                    <p className="mt-3 font-serif text-[20px] leading-snug italic text-[#14171A] sm:text-[23px]">
                      &ldquo;{section.quote}&rdquo;
                    </p>
                  </blockquote>
                )}
              </section>
            ))}

            {/* Key Takeaways Box */}
            {copy.keyTakeaways && copy.keyTakeaways.length > 0 && (
              <div data-reveal="card" className="rounded-[28px] border border-[#ECEAE5] bg-white p-8 sm:p-10 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="h-[2px] w-4 rounded-full bg-[#C51E28]" aria-hidden />
                  <h3 className="text-[12px] font-semibold tracking-wider text-[#C51E28] uppercase">
                    {t.keyTakeaways}
                  </h3>
                </div>
                <ul className="mt-6 space-y-3.5">
                  {copy.keyTakeaways.map((item, kIdx) => (
                    <li key={kIdx} className="flex items-start gap-3.5 text-[14.5px] leading-relaxed text-[#14171A]">
                      <CheckCircle2 aria-hidden className="size-5 shrink-0 text-[#C51E28] mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Back button */}
          <div className="mt-16 border-t border-[#ECEAE5] pt-8">
            <Link
              href={`/${locale}/news`}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-[#ECEAE5] bg-white px-7 text-[13px] font-semibold text-[#14171A] shadow-xs transition-colors hover:border-[#C51E28] hover:text-[#C51E28]"
            >
              <ArrowLeft aria-hidden className="flip-rtl size-4" />
              <span>{t.backToNews}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Stories */}
      {relatedArticles.length > 0 && (
        <section aria-labelledby="related-stories-title" className="border-t border-[#ECEAE5] bg-[#FBFBFA] py-20 sm:py-24">
          <div className="container-x">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-4 rounded-full bg-[#C51E28]" aria-hidden />
              <p className="text-[10.5px] font-medium tracking-[0.28em] text-[#687076] uppercase rtl:tracking-normal">
                {t.hero.eyebrow}
              </p>
            </div>
            <h2 id="related-stories-title" className="mt-3 font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-normal text-[#14171A]">
              {t.relatedTitle}
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((rel, i) => {
                const rCopy = rel.copy[locale];
                return (
                  <article
                    key={rel.slug}
                    data-reveal="card"
                    style={stagger(i)}
                    className="group relative flex flex-col overflow-hidden rounded-[28px] border border-[#ECEAE5] bg-white shadow-xs transition-[box-shadow,translate,border-color] duration-500 ease-soft hover:-translate-y-1 hover:border-[#C51E28]/40 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={rel.image}
                        alt=""
                        fill
                        sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-[1.1s] ease-soft group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <p className="text-[11px] font-medium text-[#8C939B] uppercase">
                        <span className="text-[#C51E28] font-semibold">{rCopy.categoryLabel}</span>
                        <span aria-hidden className="mx-1.5">·</span>
                        <span>{rCopy.date}</span>
                      </p>
                      <h3 className="mt-2 font-serif text-[18px] font-normal leading-snug text-[#14171A] transition-colors group-hover:text-[#C51E28]">
                        <Link href={`/${locale}/news/${rel.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                          {rCopy.title}
                        </Link>
                      </h3>
                      <div className="mt-auto pt-6 flex items-center justify-between text-[12.5px] font-semibold text-[#14171A]">
                        <span className="group-hover:text-[#C51E28] transition-colors">{t.readArticle}</span>
                        <span
                          aria-hidden
                          className="inline-flex size-9 items-center justify-center rounded-full bg-[#C51E28] text-white shadow-xs transition-colors group-hover:bg-[#9F121A]"
                        >
                          <ArrowRight className="flip-rtl size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
