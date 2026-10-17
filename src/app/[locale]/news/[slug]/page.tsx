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
    <article className="min-h-screen bg-white">
      {/* Top Header & Breadcrumbs */}
      <header className="container-x pt-32 sm:pt-40 pb-8 sm:pb-12">
        <Breadcrumbs items={breadcrumbs} className="enter-fade" />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-white/90 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-ink uppercase shadow-sm">
            {copy.categoryLabel}
          </span>
          <span className="flex items-center gap-1.5 text-[12px] font-medium text-muted uppercase">
            <span>{copy.date}</span>
            <span aria-hidden>·</span>
            <Clock aria-hidden className="size-3.5" />
            <span>{copy.readTime}</span>
          </span>
        </div>

        <h1 className="heading-xl mt-6 max-w-4xl text-ink">
          <span className="enter-line block">{copy.title}</span>
        </h1>

        <p className="enter-up mt-6 max-w-3xl text-[17px] leading-relaxed text-muted sm:text-[19px]">
          {copy.leadParagraph}
        </p>
      </header>

      {/* Featured Lead Image */}
      <div className="container-x pb-12 sm:pb-16">
        <div className="clip-slant relative aspect-[16/9] w-full overflow-hidden rounded-[32px] bg-ink sm:aspect-[21/9]">
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
                  <h2 className="heading-md text-ink">{section.heading}</h2>
                )}

                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-[16px] leading-[1.8] text-ink/80 sm:text-[17px]">
                    {para}
                  </p>
                ))}

                {section.quote && (
                  <blockquote className="my-8 rounded-[24px] border-s-4 border-deep bg-white p-7 sm:p-9 shadow-sm">
                    <Quote aria-hidden className="size-8 text-sky" />
                    <p className="mt-3 font-display text-[19px] leading-snug italic text-ink sm:text-[22px]">
                      &ldquo;{section.quote}&rdquo;
                    </p>
                  </blockquote>
                )}
              </section>
            ))}

            {/* Key Takeaways Box */}
            {copy.keyTakeaways && copy.keyTakeaways.length > 0 && (
              <div data-reveal="card" className="rounded-[28px] border border-line bg-paper p-8 sm:p-10">
                <h3 className="text-[13px] font-semibold tracking-wider text-ink uppercase">
                  {t.keyTakeaways}
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {copy.keyTakeaways.map((item, kIdx) => (
                    <li key={kIdx} className="flex items-start gap-3.5 text-[14.5px] leading-relaxed text-ink/85">
                      <CheckCircle2 aria-hidden className="size-5 shrink-0 text-deep mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Back button */}
          <div className="mt-16 border-t border-line pt-8">
            <Link
              href={`/${locale}/news`}
              className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line bg-white px-6 text-[13px] font-semibold text-ink shadow-sm transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              <ArrowLeft aria-hidden className="flip-rtl size-4" />
              <span>{t.backToNews}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Stories */}
      {relatedArticles.length > 0 && (
        <section aria-labelledby="related-stories-title" className="border-t border-line bg-white py-20 sm:py-24">
          <div className="container-x">
            <h2 id="related-stories-title" className="heading-lg text-ink">
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
                    className="group relative flex flex-col overflow-hidden rounded-[24px] bg-paper shadow-sm transition-[box-shadow,translate] duration-500 ease-soft hover:-translate-y-1 hover:shadow-md"
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
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[11px] font-medium text-muted uppercase">
                        <span className="text-deep font-semibold">{rCopy.categoryLabel}</span>
                        <span aria-hidden className="mx-1.5">·</span>
                        <span>{rCopy.date}</span>
                      </p>
                      <h3 className="mt-2 font-display text-[18px] leading-snug text-ink transition-colors group-hover:text-deep">
                        <Link href={`/${locale}/news/${rel.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                          {rCopy.title}
                        </Link>
                      </h3>
                      <div className="mt-auto pt-4 flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
                        <span>{t.readArticle}</span>
                        <ArrowRight aria-hidden className="flip-rtl size-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
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
