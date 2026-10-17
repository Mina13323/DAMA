import { ar } from "./ar";
import { en, type Dictionary } from "./en";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale): Dictionary => (locale === "ar" ? ar : en);

export type { Dictionary };
export * from "./site";
