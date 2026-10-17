import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { getDictionary, locales, type Locale } from "@/content";
import { images } from "@/content/site";

const pages = ["careers", "news", "privacy-policy", "terms-of-use"] as const;
type PageKey = (typeof pages)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => pages.map((page) => ({ locale, page })));
}

type Params = Promise<{ locale: string; page: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, page } = await params;
  return { title: getDictionary(locale as Locale).pages[page as PageKey].title };
}

export default async function InfoPage({ params }: { params: Params }) {
  const { locale, page } = await params;
  const dict = getDictionary(locale as Locale);
  const content = dict.pages[page as PageKey];
  const image = page === "news" ? images.news[0] : page === "careers" ? images.story : undefined;

  return (
    <PageShell
      dict={dict}
      locale={locale as Locale}
      eyebrow={dict.pages.comingSoon}
      title={content.title}
      body={content.body}
      image={image}
    />
  );
}
