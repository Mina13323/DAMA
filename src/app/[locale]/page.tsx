import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { News } from "@/components/sections/News";
import { Projects } from "@/components/sections/Projects";
import { Stats } from "@/components/sections/Stats";
import { Story } from "@/components/sections/Story";
import { Values } from "@/components/sections/Values";
import { getDictionary, type Locale } from "@/content";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  const props = { dict, locale };

  return (
    <>
      <Hero {...props} />
      <Stats dict={dict} />
      <Story {...props} />
      <Projects {...props} />
      <Lifestyle {...props} />
      <Values {...props} />
      <News {...props} />
      <FinalCta {...props} />
    </>
  );
}
