import type { Metadata } from "next";
import { AboutCta } from "@/components/about/AboutCta";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { Leadership } from "@/components/about/Leadership";
import { Partners } from "@/components/about/Partners";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { Stats } from "@/components/sections/Stats";
import { VisionMission } from "@/components/about/VisionMission";
import { getDictionary, locales, type Locale } from "@/content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const { about } = getDictionary(locale as Locale);
  return {
    title: about.meta.title,
    description: about.meta.description,
    alternates: { languages: { en: "/en/about", ar: "/ar/about" } },
  };
}

export default async function AboutPage({ params }: { params: Params }) {
  const dict = getDictionary((await params).locale as Locale);
  return (
    <>
      <AboutHero dict={dict} />
      <Stats dict={dict} band />
      <WhoWeAre dict={dict} />
      <AboutStory dict={dict} />
      <VisionMission dict={dict} />
      <Leadership dict={dict} />
      <Partners dict={dict} />
      <AboutCta dict={dict} />
    </>
  );
}
