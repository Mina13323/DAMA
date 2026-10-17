import type { Metadata, Viewport } from "next";
import { Gilda_Display, IBM_Plex_Sans_Arabic, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { revealBootScript } from "@/components/motion/boot";
import { RevealController } from "@/components/motion/RevealController";
import { getDictionary, isLocale, locales } from "@/content";
import "../globals.css";

const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const heading = Gilda_Display({ subsets: ["latin"], weight: "400", variable: "--font-heading", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#ffffff" };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL("https://damadevelopments.com"),
    title: { default: dict.meta.title, template: `%s — DAMA Developments` },
    description: dict.meta.description,
    alternates: { languages: { en: "/en", ar: "/ar" } },
    openGraph: { title: dict.meta.title, description: dict.meta.description, type: "website" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    // The boot script toggles reveal classes on <html> before hydration.
    <html
      lang={locale}
      dir={dict.dir}
      className={`${body.variable} ${heading.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body>
        <Header dict={dict} locale={locale} />
        <main id="main">{children}</main>
        <Footer dict={dict} locale={locale} />
        <RevealController />
      </body>
    </html>
  );
}
