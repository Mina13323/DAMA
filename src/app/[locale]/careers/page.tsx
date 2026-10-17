import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { CareersView } from "@/components/careers/CareersView";
import { Lines } from "@/components/motion/Lines";
import { getDictionary, locales, type Locale } from "@/content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.careersPage.meta.title,
    description: dict.careersPage.meta.description,
    alternates: {
      canonical: `/${locale}/careers`,
      languages: { en: "/en/careers", ar: "/ar/careers" },
    },
    openGraph: {
      title: dict.careersPage.meta.title,
      description: dict.careersPage.meta.description,
      type: "website",
    },
  };
}

export default async function CareersPage({ params }: { params: Params }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const t = dict.careersPage;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section aria-labelledby="careers-hero-title" className="relative isolate overflow-hidden bg-gradient-to-b from-[#8bbde6]/30 via-[#eaf4fb]/50 via-40% to-white pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
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
              id="careers-hero-title"
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

      {/* Culture & Open Roles */}
      <div className="bg-white">
        <CareersView locale={locale} labels={t} />
      </div>
    </div>
  );
}
