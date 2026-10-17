import Image from "next/image";
import type { ReactNode } from "react";
import type { Dictionary, Locale } from "@/content";
import { ButtonLink } from "./ui";

/** Simple interior page used until the full inner pages are designed. */
export function PageShell({
  dict,
  locale,
  eyebrow,
  title,
  body,
  image,
  children,
}: {
  dict: Dictionary;
  locale: Locale;
  eyebrow: string;
  title: string;
  body: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-gradient-to-b from-sky-soft to-white pb-20 pt-32 sm:pt-40">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="heading-xl mt-4 text-ink">{title}</h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">{body}</p>
          <ButtonLink href={`/${locale}`} variant="outline" className="mt-8">
            {dict.pages.backHome}
          </ButtonLink>
        </div>
        {image && (
          <div className="clip-slant relative aspect-[4/3] overflow-hidden">
            <Image src={image} alt="" fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
      {children && <div className="container-x mt-16">{children}</div>}
    </section>
  );
}
