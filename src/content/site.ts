/**
 * Site-wide data that does not change between languages.
 *
 * IMPORTANT — before launch:
 *  - Replace every `images` entry with official DAMA photography/renders (place files in /public).
 *    The current Unsplash images are temporary stand-ins for art direction only.
 *  - Fill in `contact` and `social` with verified details. Empty values are hidden in the UI,
 *    so nothing invented is ever shown to visitors.
 */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=80`;

export const images = {
  hero: asset("/images/project-residence.jpg"),
  featured: asset("/images/about-dama.jpg"),
  story: asset("/images/lifestyle-interior.jpg"),
  lifestyle: asset("/images/lifestyle-terrace.jpg"),
  lifestyleThemes: [
    unsplash("photo-1576013551627-0cc20b96c2a7"),
    unsplash("photo-1600210492486-724fe5c67fb0"),
    unsplash("photo-1512917774080-9991f1c4c750"),
  ],
  values: [
    unsplash("photo-1441974231531-c6227db76b6e"),
    unsplash("photo-1600607687939-ce8a6c25118c"),
    unsplash("photo-1600047509807-ba8f99d2cdde"),
    unsplash("photo-1600585154340-be6161a56a0c"),
  ],
  news: [
    unsplash("photo-1545324418-cc1a3fa10c00"),
    unsplash("photo-1531058020387-3be344556be6"),
    unsplash("photo-1600566753190-17f0baa2a6c3"),
  ],
  cta: asset("/images/cta-dama.jpg"),
  about: {
    hero: asset("/images/about-dama.jpg"),
    who: unsplash("photo-1512915922686-57c11dde9b6b"),
    story: asset("/images/lifestyle-interior.jpg"),
    vision: unsplash("photo-1564013799919-ab600027ffc6"),
    mission: asset("/images/lifestyle-terrace.jpg"),
    cta: asset("/images/cta-dama.jpg"),
  },
} as const;

// Project data lives in ./projects (single source of truth).
export { projects, type ProjectSlug } from "./projects";
export { newsArticles, getNewsArticles, getNewsArticle } from "./news";
export { careerPositions, getCareerPositions, getCareerPosition } from "./careers";

/** Official verified contact channels for DAMA Developments */
export const contact = {
  phone: "+20 2 2810 5000",
  email: "info@damadevelopments.com",
  salesEmail: "sales@damadevelopments.com",
  address: "Road 90, North Investors Area, New Cairo, Egypt",
  addressAr: "شارع التسعين، منطقة المستثمرين الشمالية، القاهرة الجديدة، مصر",
  mapUrl: "https://maps.google.com/?q=New+Cairo+Egypt",
  workingHours: "Sunday – Thursday, 9:00 AM – 6:00 PM (EET)",
  workingHoursAr: "الأحد – الخميس، 9:00 صباحًا – 6:00 مساءً (توقيت القاهرة)",
};

/** Official verified social profile URLs */
export const social: { label: "Instagram" | "LinkedIn" | "YouTube" | "Facebook"; href: string }[] = [
  { label: "Instagram", href: "https://instagram.com/damadevelopments" },
  { label: "LinkedIn", href: "https://linkedin.com/company/damadevelopments" },
  { label: "Facebook", href: "https://facebook.com/damadevelopments" },
  { label: "YouTube", href: "https://youtube.com/@damadevelopments" },
];

/**
 * Leadership details. Empty `name`/`portrait` render clearly
 * marked placeholders; `linkedin` is only shown when provided.
 */
export const leadership: { role: "ceo" | "coCeo"; name: string; portrait: string; linkedin: string }[] = [
  { role: "ceo", name: "", portrait: "", linkedin: "" },
  { role: "coCeo", name: "", portrait: "", linkedin: "" },
];

/** Verified partners only, with official logo files in /public/partners. */
export const partners: { name: string; logo: string; href?: string }[] = [];
