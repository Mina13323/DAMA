import Image from "next/image";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";
import { ButtonLink } from "../ui";
import { stagger } from "../motion/Lines";

export function Story({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.story;
  return (
    <section id="about" aria-labelledby="story-title" className="relative bg-white py-20 sm:py-28 lg:py-32">
      {/* Signature Pinterest-inspired Brand Statement */}
      <div className="container-x text-center">
        <div data-reveal="fade" className="mx-auto max-w-4xl">
          <p className="eyebrow text-[#477da9]">{t.eyebrow}</p>
          <h2
            id="story-title"
            className="heading-display mt-5 text-3xl font-light tracking-tight text-[#15191d] sm:text-5xl lg:text-6xl"
          >
            {locale === "ar" ? (
              <>
                حيث تلتقي رؤيتكم المعمارية{" "}
                <span className="inline-flex align-middle mx-2 h-9 w-20 sm:h-12 sm:w-28 overflow-hidden rounded-full border border-[#8bbde6]/60 shadow-sm relative">
                  <Image
                    src={images.story}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover object-center"
                  />
                </span>{" "}
                ببيئتكم الحقيقية.
              </>
            ) : (
              <>
                Where your vision finds its{" "}
                <span className="inline-flex align-middle mx-2 h-9 w-20 sm:h-12 sm:w-28 overflow-hidden rounded-full border border-[#8bbde6]/60 shadow-sm relative">
                  <Image
                    src={images.story}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover object-center"
                  />
                </span>{" "}
                home.
              </>
            )}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[16px] font-light leading-relaxed text-[#626b73] sm:text-lg">
            {t.body}
          </p>
        </div>
      </div>

      {/* Grid: Architectural Interior Showcase + Values & Story Pillars */}
      <div className="container-x mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:items-center">
        {/* Left: High-end photograph */}
        <div data-reveal="card" className="relative overflow-hidden rounded-[28px] border border-[#e5e9ed] bg-[#f4f8fb] shadow-lg lg:col-span-7">
          <div className="relative aspect-[16/11] w-full">
            <Image
              src={images.story}
              alt={t.imageAlt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#15191d]/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 start-6 rounded-full border border-white/40 bg-white/90 px-4 py-2 text-[12px] font-medium text-[#15191d] shadow-sm backdrop-blur">
              {locale === "ar" ? "تصاميم تعكس توازن الحياة" : "Spaces Crafted for Balanced Living"}
            </div>
          </div>
        </div>

        {/* Right: Pillars & Navigation */}
        <div data-reveal="up" className="lg:col-span-5 lg:ps-8">
          <h3 className="text-xl font-normal text-[#15191d] sm:text-2xl">
            {locale === "ar" ? "ركائزنا المعمارية" : "Our Architectural Pillars"}
          </h3>
          <p className="mt-3 text-[14.5px] font-light leading-relaxed text-[#626b73]">
            {locale === "ar"
              ? "نعتمد في كل مجتمع على مبادئ معمارية خالدة، تضع الإنسان في صميم التصميم والطبيعة في صميم الحياة اليومية."
              : "Every community is rooted in timeless architectural principles, placing human comfort at the center of form and nature at the heart of daily life."}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {t.pillars.map((pillar, i) => (
              <div
                key={pillar}
                style={stagger(i)}
                className="flex items-center gap-3.5 rounded-2xl border border-[#e5e9ed] bg-[#f4f8fb] p-3.5 transition-colors hover:border-[#8bbde6] hover:bg-white"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#8bbde6]/30 text-[11px] font-bold text-[#18344a]">
                  0{i + 1}
                </span>
                <span className="text-[13.5px] font-medium text-[#15191d]">{pillar}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <ButtonLink href={`/${locale}/about`} variant="dark">
              {t.cta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
