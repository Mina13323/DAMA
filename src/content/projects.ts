/**
 * Project data — local, replaceable development source.
 *
 * There is no CMS/API in this repository yet. This module is the single source
 * of truth for project content; swap `getProjects()` / `getProject()` for a
 * CMS or API call later without touching the page templates.
 */
import type { Locale } from "./index";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

export type ProjectSlug = "rwasin" | "dama-residence" | "dama-view";
export type ProjectCategory = "residential" | "villas" | "apartments" | "mixed-use";
export type FactIcon = "type" | "units" | "location" | "status" | "green" | "style";
export type AmenityIcon = "clubhouse" | "pool" | "sports" | "parks" | "paths" | "community";

export type ProjectFact = { icon: FactIcon; label: string; value: string };
export type ProjectAmenity = { icon: AmenityIcon; label: string };

type Localized<T> = Record<Locale, T>;

export interface ProjectCopy {
  location: string;
  /** One-line description for cards and listings. */
  summary: string;
  /** Hero description on the details page. */
  intro: string;
  overview: { titleLines: string[]; paragraphs: string[] };
  lifestyle?: { titleLines: string[]; body: string };
  locationNote?: string;
  facts: { icon: FactIcon; label: string; value: string }[];
  amenities: { icon: AmenityIcon; label: string }[];
}

export interface Project {
  slug: ProjectSlug;
  name: string;
  categories: ProjectCategory[];
  /** Card / hero image (kept as `image` for existing consumers). */
  image: string;
  images: { overview: string; lifestyle: string[]; gallery: string[] };
  masterPlan?: { image: string; pdf?: string };
  mapUrl?: string;
  copy: Localized<ProjectCopy>;
}

export const projects: Project[] = [
  {
    slug: "rwasin",
    name: "Rwasin",
    categories: ["residential", "villas", "apartments"],
    image: asset("/images/rawasin-aerial-masterplan.jpg"),
    images: {
      overview: asset("/images/rawasin-aerial-masterplan.jpg"),
      lifestyle: [
        asset("/images/dama-courtyard-living.jpg"),
        asset("/images/dama-jacaranda-hero.jpg"),
        asset("/images/dama-lobby-entrance-c1.png"),
      ],
      gallery: [
        asset("/images/rawasin-aerial-masterplan.jpg"),
        asset("/images/dama-jacaranda-hero.jpg"),
        asset("/images/dama-courtyard-living.jpg"),
        asset("/images/dama-twin-residences.png"),
        asset("/images/dama-lobby-entrance-c1.png"),
      ],
    },
    masterPlan: {
      image: asset("/images/rawasin-aerial-masterplan.jpg"),
    },
    mapUrl: "https://maps.google.com/?q=New+Cairo+Egypt",
    copy: {
      en: {
        location: "Golden Square, New Cairo",
        summary: "A distinctive community where nature and architecture come together in harmony.",
        intro: "A community designed for a more balanced way of living, where nature, architecture, and people come together.",
        overview: {
          titleLines: ["A New Perspective", "on *Modern Living*"],
          paragraphs: [
            "Rwasin is a thoughtfully planned community in New Cairo, designed to offer a balance between contemporary architecture and natural surroundings.",
            "With open spaces, landscaped areas, and a focus on everyday comfort, Rwasin brings together the elements that matter most — people, nature, and a better quality of life.",
          ],
        },
        lifestyle: {
          titleLines: ["More Than", "a Home"],
          body: "From peaceful mornings in green surroundings to shared community moments, Rwasin is created to support a balanced lifestyle for individuals and families.",
        },
        locationNote: "Strategically located in the Golden Square of New Cairo, minutes away from the American University in Cairo and premier retail destinations.",
        facts: [
          { icon: "type", label: "Property Type", value: "Villas & Luxury Apartments" },
          { icon: "location", label: "Location", value: "Golden Square, New Cairo" },
          { icon: "units", label: "Scale", value: "480 Thoughtful Residences" },
          { icon: "green", label: "Open Space", value: "72% Landscaping & Water" },
          { icon: "status", label: "Development Status", value: "Under Construction" },
          { icon: "style", label: "Design Direction", value: "Biophilic Modernism" },
        ],
        amenities: [
          { icon: "clubhouse", label: "Private Clubhouse" },
          { icon: "pool", label: "Resort-Style Pools" },
          { icon: "sports", label: "Tennis & Paddle Courts" },
          { icon: "parks", label: "Botanical Gardens" },
          { icon: "paths", label: "Jogging & Cycling Trails" },
          { icon: "community", label: "Children's Adventure Play" },
        ],
      },
      ar: {
        location: "المربع الذهبي، القاهرة الجديدة",
        summary: "مجتمع مميز تلتقي فيه الطبيعة والعمارة في انسجام.",
        intro: "مجتمع مصمم لأسلوب حياة أكثر توازنًا، تلتقي فيه الطبيعة والعمارة والناس.",
        overview: {
          titleLines: ["منظور جديد", "*للحياة العصرية*"],
          paragraphs: [
            "رواسين مجتمع مخطط بعناية في القاهرة الجديدة، صُمم ليوازن بين العمارة المعاصرة والطبيعة المحيطة.",
            "بمساحات مفتوحة ومناطق خضراء واهتمام بالراحة اليومية، يجمع رواسين ما يهم حقًا — الناس والطبيعة وجودة حياة أفضل.",
          ],
        },
        lifestyle: {
          titleLines: ["أكثر من", "مجرد بيت"],
          body: "من صباحات هادئة وسط الخضرة إلى لحظات مجتمعية مشتركة، صُمم رواسين ليدعم حياة متوازنة للأفراد والعائلات.",
        },
        locationNote: "موقع استراتيجي في قلب المربع الذهبي بالقاهرة الجديدة، على بعد دقائق من الجامعة الأمريكية والمراكز الحيوية.",
        facts: [
          { icon: "type", label: "نوع الوحدات", value: "فيلات وشقق سكنية فاخرة" },
          { icon: "location", label: "الموقع", value: "المربع الذهبي، القاهرة الجديدة" },
          { icon: "units", label: "المقياس", value: "480 وحدة سكنية مدروسة" },
          { icon: "green", label: "المساحات الخضراء", value: "72% لاندسكيب ومسطحات مائية" },
          { icon: "status", label: "حالة التنفيذ", value: "تحت الإنشاء بمعدلات متقدمة" },
          { icon: "style", label: "الأسلوب المعماري", value: "عمارة بيئية حيوية" },
        ],
        amenities: [
          { icon: "clubhouse", label: "كلوب هاوس خاص" },
          { icon: "pool", label: "حمامات سباحة بنظام المنتجعات" },
          { icon: "sports", label: "ملاعب تنس وبادل" },
          { icon: "parks", label: "حدائق نباتية ومتنزهات" },
          { icon: "paths", label: "مسارات للمشي وركوب الدراجات" },
          { icon: "community", label: "مناطق لعب عائلية للأطفال" },
        ],
      },
    },
  },
  {
    slug: "dama-residence",
    name: "DAMA Residence",
    categories: ["residential", "apartments"],
    image: asset("/images/dama-twin-residences.png"),
    images: {
      overview: asset("/images/dama-twin-residences.png"),
      lifestyle: [
        asset("/images/dama-courtyard-living.jpg"),
        asset("/images/dama-lobby-entrance-c1.png"),
        asset("/images/dama-jacaranda-hero.jpg"),
      ],
      gallery: [
        asset("/images/dama-twin-residences.png"),
        asset("/images/dama-lobby-entrance-c1.png"),
        asset("/images/dama-courtyard-living.jpg"),
        asset("/images/rawasin-aerial-masterplan.jpg"),
        asset("/images/dama-jacaranda-hero.jpg"),
      ],
    },
    mapUrl: "https://maps.google.com/?q=New+Cairo+Egypt",
    copy: {
      en: {
        location: "New Cairo",
        summary: "Contemporary living spaces designed for comfort, community, and long-term value.",
        intro: "Contemporary living spaces designed for comfort, community, and long-term value.",
        overview: {
          titleLines: ["Designed Around", "*Everyday Comfort*"],
          paragraphs: [
            "DAMA Residence brings DAMA's approach to contemporary living to New Cairo — considered architecture, calm surroundings and spaces shaped around daily life.",
            "Each home features expansive windows that invite soft natural light throughout the day, while private garden verandas seamlessly extend living areas into the open air.",
          ],
        },
        lifestyle: {
          titleLines: ["A Sanctuary in", "the City"],
          body: "Thoughtfully configured to foster genuine neighborhood intimacy while maintaining complete family privacy and peaceful seclusion.",
        },
        locationNote: "Situated in an exclusive enclave in New Cairo, balancing quick city arterial connections with serene residential calm.",
        facts: [
          { icon: "type", label: "Property Type", value: "Townhouses & Penthouses" },
          { icon: "location", label: "Location", value: "New Cairo" },
          { icon: "units", label: "Community", value: "260 Boutique Residences" },
          { icon: "style", label: "Architecture", value: "Contemporary Minimalist" },
          { icon: "green", label: "Surroundings", value: "Private Shaded Courtyards" },
        ],
        amenities: [
          { icon: "clubhouse", label: "Residents' Lounge" },
          { icon: "pool", label: "Heated Wellness Pool" },
          { icon: "sports", label: "Fitness & Yoga Studio" },
          { icon: "parks", label: "Private Garden Patios" },
          { icon: "community", label: "24/7 Concierge Services" },
        ],
      },
      ar: {
        location: "القاهرة الجديدة",
        summary: "مساحات معيشة معاصرة مصممة للراحة والمجتمع والقيمة طويلة المدى.",
        intro: "مساحات معيشة معاصرة مصممة للراحة والمجتمع والقيمة طويلة المدى.",
        overview: {
          titleLines: ["مصمم حول", "*راحتك اليومية*"],
          paragraphs: [
            "يقدّم داما ريزيدنس نهج داما للحياة المعاصرة في القاهرة الجديدة — عمارة مدروسة ومحيط هادئ ومساحات تتشكل حول الحياة اليومية.",
            "تتميز كل وحدة بنوافذ واسعة ترحب بالضوء الطبيعي الهادئ طوال اليوم، مع شرفات وحدائق خاصة تمد مساحات المعيشة إلى الهواء الطلق بسلاسة.",
          ],
        },
        lifestyle: {
          titleLines: ["واحة هادئة", "في قلب المدينة"],
          body: "صُمم المجتمع بعناية لتعزيز الترابط الإنساني بين الجيران مع الحفاظ الكامل على الخصوصية والسكينة الأسرية.",
        },
        locationNote: "يقع في موقع مميز بالقاهرة الجديدة، يجمع بين سهولة الوصول للمحاور الرئيسية والهدوء السكني التام.",
        facts: [
          { icon: "type", label: "نوع الوحدات", value: "تاون هاوس وبنتهاوس عصري" },
          { icon: "location", label: "الموقع", value: "القاهرة الجديدة" },
          { icon: "units", label: "المجتمع", value: "260 وحدة سكنية مميزة" },
          { icon: "style", label: "الأسلوب المعماري", value: "عمارة معاصرة بخطوط نقية" },
          { icon: "green", label: "المحيط", value: "أفنية مظللة وحدائق خاصة" },
        ],
        amenities: [
          { icon: "clubhouse", label: "صالة استقبال للمقيمين" },
          { icon: "pool", label: "حمام سباحة صحي مدفأ" },
          { icon: "sports", label: "استوديو لياقة ويوغا" },
          { icon: "parks", label: "باحات حدائق خاصة" },
          { icon: "community", label: "خدمات أمن واستقبال على مدار الساعة" },
        ],
      },
    },
  },
  {
    slug: "dama-view",
    name: "DAMA View",
    categories: ["residential", "villas"],
    image: asset("/images/dama-jacaranda-hero.jpg"),
    images: {
      overview: asset("/images/dama-jacaranda-hero.jpg"),
      lifestyle: [
        asset("/images/dama-courtyard-living.jpg"),
        asset("/images/dama-twin-residences.png"),
        asset("/images/dama-lobby-entrance-c1.png"),
      ],
      gallery: [
        asset("/images/dama-jacaranda-hero.jpg"),
        asset("/images/rawasin-aerial-masterplan.jpg"),
        asset("/images/dama-courtyard-living.jpg"),
        asset("/images/dama-twin-residences.png"),
        asset("/images/dama-lobby-entrance-c1.png"),
      ],
    },
    mapUrl: "https://maps.google.com/?q=New+Cairo+Egypt",
    copy: {
      en: {
        location: "New Cairo Plateau",
        summary: "Elevated living with open views, thoughtful design, and a strong connection to nature.",
        intro: "Elevated living with open views, thoughtful design, and a strong connection to nature.",
        overview: {
          titleLines: ["Living with", "*a View*"],
          paragraphs: [
            "DAMA View is shaped around light, openness and a close relationship with its natural setting — a calm, considered place to come home to.",
            "Perched atop a natural elevation in New Cairo, residences enjoy panoramic vistas that stretch to the horizon, unobstructed by high-density construction.",
          ],
        },
        lifestyle: {
          titleLines: ["Open Horizons,", "Quiet Luxury"],
          body: "Terraced landscapes step down toward central reflecting lagoons, offering daily sunset views from expansive outdoor living decks.",
        },
        locationNote: "Elevated location overlooking the lush green corridors of eastern New Cairo with rapid access to the Ring Road.",
        facts: [
          { icon: "type", label: "Property Type", value: "Panoramic Standalone Villas" },
          { icon: "location", label: "Location", value: "New Cairo Plateau" },
          { icon: "units", label: "Collection", value: "140 Signature Horizon Homes" },
          { icon: "style", label: "Architecture", value: "Terraced Horizon Design" },
          { icon: "green", label: "Vistas", value: "Unobstructed Valley Views" },
        ],
        amenities: [
          { icon: "pool", label: "Horizon Infinity Pool" },
          { icon: "clubhouse", label: "Sunset Viewing Pavilion" },
          { icon: "sports", label: "Outdoor Sports Circuit" },
          { icon: "parks", label: "Terraced Hillside Trails" },
          { icon: "community", label: "Private Family Social Spaces" },
        ],
      },
      ar: {
        location: "هضبة القاهرة الجديدة",
        summary: "حياة راقية بإطلالات مفتوحة وتصميم مدروس وارتباط وثيق بالطبيعة.",
        intro: "حياة راقية بإطلالات مفتوحة وتصميم مدروس وارتباط وثيق بالطبيعة.",
        overview: {
          titleLines: ["حياة", "*بإطلالة*"],
          paragraphs: [
            "صُمم داما فيو حول الضوء والانفتاح والعلاقة القريبة مع محيطه الطبيعي — مكان هادئ ومدروس تعود إليه.",
            "يتربع المشروع على تلة طبيعية مرتفعة بالقاهرة الجديدة، مما يمنح الوحدات إطلالات بانورامية مفتوحة تمتد حتى الأفق دون أي حواجز بصرية.",
          ],
        },
        lifestyle: {
          titleLines: ["آفاق مفتوحة،", "ورقي هادئ"],
          body: "تتدرج الحدائق نحو بحيرات مائية هادئة، لتستمتع بمشاهد الغروب الساحرة يوميًا من تراساتك المفتوحة الرحبة.",
        },
        locationNote: "موقع مرتفع متميز يطل على الممرات الخضراء في شرق القاهرة الجديدة، مع سهولة تامة للوصول إلى الطريق الدائري.",
        facts: [
          { icon: "type", label: "نوع الوحدات", value: "فيلات مستقلة بإطلالات بانورامية" },
          { icon: "location", label: "الموقع", value: "هضبة القاهرة الجديدة" },
          { icon: "units", label: "المجموعة", value: "140 فيلا سكنية حصرية" },
          { icon: "style", label: "الأسلوب المعماري", value: "عمارة التراسات الأفقية" },
          { icon: "green", label: "الإطلالة", value: "إطلالات مفتوحة على الوادي" },
        ],
        amenities: [
          { icon: "pool", label: "حمام سباحة إنفينيتي أفقي" },
          { icon: "clubhouse", label: "جناح الاسترخاء وقت الغروب" },
          { icon: "sports", label: "مضمار رياضي مفتوح" },
          { icon: "parks", label: "ممرات الوادي المتدرجة" },
          { icon: "community", label: "مساحات للمناسبات العائلية" },
        ],
      },
    },
  },
];

export const getProjects = () => projects;
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectCopy = (project: Project, locale: Locale) => project.copy[locale];

/** Categories that actually have at least one project, in display order. */
export const availableCategories = (): ProjectCategory[] => {
  const order: ProjectCategory[] = ["residential", "villas", "apartments", "mixed-use"];
  return order.filter((c) => projects.some((p) => p.categories.includes(c)));
};
