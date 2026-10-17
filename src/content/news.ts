import type { Locale } from "./index";

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=80`;

export type NewsCategory = "project-updates" | "sustainability" | "events" | "architecture";

export interface NewsArticleCopy {
  title: string;
  categoryLabel: string;
  date: string;
  readTime: string;
  summary: string;
  leadParagraph: string;
  sections: {
    heading?: string;
    paragraphs: string[];
    quote?: string;
  }[];
  keyTakeaways?: string[];
}

export interface NewsArticle {
  slug: string;
  category: NewsCategory;
  dateISO: string;
  image: string;
  featured?: boolean;
  copy: Record<Locale, NewsArticleCopy>;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "rwasin-construction-milestones-new-cairo",
    category: "project-updates",
    dateISO: "2026-10-05",
    image: img("photo-1545324418-cc1a3fa10c00"),
    featured: true,
    copy: {
      en: {
        title: "Rwasin Advances Structural Works Ahead of Schedule in New Cairo",
        categoryLabel: "Project Updates",
        date: "October 5, 2026",
        readTime: "4 min read",
        summary: "Concrete casting and foundational infrastructure across primary residential clusters reach major milestones in New Cairo.",
        leadParagraph: "DAMA Developments is pleased to report accelerated progress across Rwasin, our signature residential community in New Cairo. Structural frameworks for the central villa clusters and community spines have surpassed fourth-quarter targets, reflecting our commitment to rigorous delivery standards.",
        sections: [
          {
            heading: "Foundations Rooted in Quality",
            paragraphs: [
              "Over the past three months, engineering teams have completed deep foundations and ground stabilization across Phase 1. The infrastructure incorporates advanced seismic and soil-retention engineering tailored to the natural topography of the site.",
              "With over 65,000 cubic meters of high-durability concrete poured, the team is now progressing into the superstructure phase, beginning the structural elevations for residential villas and terraced homes."
            ],
            quote: "At Rwasin, architecture and landscape are engineered as one continuous system. Watching these structures rise naturally from the terrain validates our architectural philosophy."
          },
          {
            heading: "Integrated Green Corridors & Water Infrastructure",
            paragraphs: [
              "Parallel to vertical construction, civil contractors have initiated sub-surface utilities, including an intelligent greywater recycling network that will irrigate Rwasin's extensive botanical gardens and shaded parkways.",
              "The community's pedestrian-first network of pedestrian walkways and cycling trails has been carved out, ensuring that the natural topography remains central to everyday life."
            ]
          }
        ],
        keyTakeaways: [
          "Superstructure casting commenced for Phase 1 residential clusters",
          "Advanced greywater recycling and subsurface utility network underway",
          "Pedestrian corridors and topography preservation strictly adhered to",
          "On track for scheduled phased handover beginning Q1 2028"
        ]
      },
      ar: {
        title: "رواسين يتقدم في أعمال الهيكل الإنشائي قبل الجدول الزمني في القاهرة الجديدة",
        categoryLabel: "تحديثات المشروعات",
        date: "5 أكتوبر 2026",
        readTime: "قراءة 4 دقائق",
        summary: "إنجاز مراحل رئيسية في صب الخرسانات والبنية التحتية التأسيسية عبر التجمعات السكنية الأولى في القاهرة الجديدة.",
        leadParagraph: "يسر داما للتطوير العقاري الإعلان عن وتيرة متسارعة في أعمال تنفيذ مجتمع رواسين، وجهتنا السكنية المميزة في القاهرة الجديدة. حيث تجاوزت الأعمال الهيكلية لتجمعات الفيلات والمحاور المجتمعية مستهدفات الربع الرابع، تجسيدًا لالتزامنا الصارم بأعلى معايير التنفيذ والجودة.",
        sections: [
          {
            heading: "أساسات راسخة بأعلى معايير الجودة",
            paragraphs: [
              "خلال الأشهر الثلاثة الماضية، أتمت الفرق الهندسية أعمال الأساسات العميقة وتثبيت التربة عبر المرحلة الأولى. وتم تصميم البنية التحتية وفق حلول هندسية متطورة تلائم الطبوغرافيا الطبيعية للأرض.",
              "ومع صب أكثر من 65,000 متر مكعب من الخرسانة المسلحة عالية المتانة، بدأت الفرق الإنشائية في تشييد الهياكل العلوية للفيلات السكنية والوحدات ذات التراسات البانورامية."
            ],
            quote: "في رواسين، صُممت العمارة والطبيعة كمنظومة واحدة متصلة. ورؤية هذه المباني ترتفع بانسجام مع تضاريس الأرض تؤكد صحة فلسفتنا المعمارية."
          },
          {
            heading: "ممرات خضراء متكاملة وشبكة مياه ذكية",
            paragraphs: [
              "بالتوازي مع الإنشاءات الرأسية، بدأت أعمال المرافق التحتية بما في ذلك شبكة متطورة لإعادة تدوير المياه الرمادية المخصصة لري الحدائق النباتية والممرات المظللة في رواسين.",
              "كما تم تحديد مسارات المشاة والدراجات، بما يضمن أن تبقى الطبيعة وعناصرها في قلب التجربة اليومية للسكان."
            ]
          }
        ],
        keyTakeaways: [
          "بدء تشييد الهياكل العلوية للوحدات السكنية في المرحلة الأولى",
          "تنفيذ شبكة ري ذكية ومرافق تحت أرضية مستدامة",
          "الحفاظ الكامل على التضاريس الطبيعية ومسارات المشاة",
          "الالتزام الكامل بالجدول الزمني للتسليم المرحلي بدءًا من الربع الأول 2028"
        ]
      }
    }
  },
  {
    slug: "dama-sustainable-design-community-living",
    category: "sustainability",
    dateISO: "2026-09-18",
    image: img("photo-1600585154340-be6161a56a0c"),
    copy: {
      en: {
        title: "Designing for Life: How DAMA Integrates Nature into Contemporary Architecture",
        categoryLabel: "Sustainability",
        date: "September 18, 2026",
        readTime: "5 min read",
        summary: "A deep dive into our biophilic design philosophy, microclimate passive cooling, and native flora master planning.",
        leadParagraph: "Sustainability in real estate is frequently reduced to technical metrics. At DAMA, we believe true sustainability is human and ecological: it is the seamless relationship between the home, the sunlight, the prevailing breeze, and the natural landscape.",
        sections: [
          {
            heading: "Passive Climate Design & Shading Geometries",
            paragraphs: [
              "Every building envelope in DAMA developments is oriented according to solar angles and local wind patterns. Deep overhangs, recessed glazing, and textured brise-soleil surfaces reduce direct solar heat gain by up to 35%, significantly diminishing energy consumption for indoor climate control.",
              "Courtyards act as thermal chimneys, drawing cool evening air through living spaces while expelling daytime heat without relying entirely on mechanical air conditioning."
            ],
            quote: "When architecture respects the elements, luxury becomes effortless, calm, and inherently sustainable."
          },
          {
            heading: "Native Landscaping & Biodiversity",
            paragraphs: [
              "Our landscape architecture focuses exclusively on native and drought-resilient plant species adapted to the Egyptian desert climate. By avoiding water-intensive turfgrass in favor of shaded olive groves, date palms, and flowering ground covers, we reduce irrigation demand by more than 50% compared to conventional developments."
            ]
          }
        ],
        keyTakeaways: [
          "Solar orientation and recessed glazing minimize solar thermal load by up to 35%",
          "Thermal courtyard ventilation provides passive natural cooling",
          "Indigenous flora selection cuts irrigation consumption by over 50%",
          "Continuous green corridors support local biodiversity and pedestrian comfort"
        ]
      },
      ar: {
        title: "التصميم من أجل الحياة: كيف تدمج داما الطبيعة في العمارة المعاصرة",
        categoryLabel: "الاستدامة",
        date: "18 سبتمبر 2026",
        readTime: "قراءة 5 دقائق",
        summary: "نظرة متعمقة على فلسفة التصميم الحيوي والتهوية الطبيعية والاعتماد على النباتات المحلية في المخطط العام.",
        leadParagraph: "غالبًا ما يتم اختزال الاستدامة في مقاييس تقنية جافة. لكننا في داما نؤمن بأن الاستدامة الحقيقية ذات بعد إنساني وبيئي أصيل: إنها العلاقة التلقائية السلسة بين البيت، وشعاع الشمس، ونسيم الهواء، والطبيعة المحيطة.",
        sections: [
          {
            heading: "التصميم المناخي الذكي وهندسة الظلال",
            paragraphs: [
              "يتم توجيه واجهات المباني في مشروعات داما بعناية فائقة وفق حركة الشمس وحركة الرياح السائدة. وتسهم البروزات المعمارية المدروسة والنوافذ الغائرة وكواسر الشمس في خفض الاكتساب الحراري بنسبة تصل إلى 35%، مما يقلل استهلاك الطاقة للتبريد بشكل كبير.",
              "كما تعمل الأفنية الداخلية كمصاعد حرارية تسحب الهواء الليلي العليل عبر المساحات السكنية وتطرد حرارة النهار دون الاعتماد الكلي على أنظمة التكييف الميكانيكية."
            ],
            quote: "حين تحترم العمارة عناصر الطبيعة، يصبح الرقي هادئًا وطبيعيًا ومستدامًا في جوهره."
          },
          {
            heading: "نباتات محلية وتنوع بيولوجي مستدام",
            paragraphs: [
              "تركز هندسة المناظر الطبيعية لدينا على الأشجار والنباتات المحلية المتأقلمة مع المناخ المصري. ومن خلال تقليل المسطحات العشبية التقليدية المستهلكة للمياه واستبدالها بحدائق الزيتون والنخيل والأغطية النباتية المتكيفة، نخفض استهلاك مياه الري بأكثر من 50% مقارنة بالمشروعات التقليدية."
            ]
          }
        ],
        keyTakeaways: [
          "توجيه المباني المعماري يقلل الحمل الحراري للشمس بنسبة تصل إلى 35%",
          "أفنية داخلية ذكية توفر تدفقًا طبيعيًا للهواء النقي",
          "اختيار نباتات محلية يقلل استهلاك مياه الري بأكثر من 50%",
          "محاور خضراء متصلة تدعم التنوع البيئي وراحة المشاة"
        ]
      }
    }
  },
  {
    slug: "dama-cityscape-regional-expansion",
    category: "events",
    dateISO: "2026-08-22",
    image: img("photo-1531058020387-3be344556be6"),
    copy: {
      en: {
        title: "DAMA Showcases Next-Generation Community Living at Regional Property Summits",
        categoryLabel: "Events",
        date: "August 22, 2026",
        readTime: "3 min read",
        summary: "Engaging regional investors and future homeowners with interactive architectural models and sustainable master plans.",
        leadParagraph: "At this year's premier regional real estate exhibition, DAMA Developments unveiled its forward-looking portfolio to strong acclaim from architects, urban planners, and prospective homeowners. The pavilion highlighted DAMA's core proposition: building communities that balance privacy, community, and ecological sensitivity.",
        sections: [
          {
            heading: "A Dialogue on Human-Scale Urbanism",
            paragraphs: [
              "The DAMA team hosted interactive panel sessions discussing the evolution of New Cairo and satellite urban centers. Central to the discourse was the need for lower-density developments where families can establish long-term roots.",
              "Attendees experienced tactile architectural models of Rwasin and the forthcoming DAMA Residence and DAMA View, engaging directly with our design architects on materials, floor plans, and landscape integration."
            ],
            quote: "Real estate is an enduring commitment to people. The enthusiasm from our visitors confirms that the market is hungry for authentic, thoughtful community living."
          }
        ],
        keyTakeaways: [
          "Over 1,200 prospective homeowners visited the DAMA pavilion",
          "Interactive architectural models revealed for Rwasin and DAMA Residence",
          "Panel discussions focused on human-centric satellite community design",
          "Significant regional investor interest in long-term phased communities"
        ]
      },
      ar: {
        title: "داما تستعرض رؤيتها لمجتمعات المستقبل في كبرى القمم العقارية الإقليمية",
        categoryLabel: "فعاليات",
        date: "22 أغسطس 2026",
        readTime: "قراءة 3 دقائق",
        summary: "تفاعل استثنائي مع المستثمرين والعائلات من خلال نماذج معمارية تفاعلية ومخططات عامة مستدامة.",
        leadParagraph: "خلال مشاركتها في المعرض العقاري الإقليمي الأبرز لهذا العام، كشفت داما للتطوير العقاري عن محفظة مشروعاتها المستقبلية وسط إشادة واسعة من المعماريين والمخططين والعملاء. وسلط جناح داما الضوء على رؤيتها الأساسية: بناء مجتمعات توازن بين الخصوصية، والروابط الإنسانية، وحماية البيئة.",
        sections: [
          {
            heading: "حوار معماري حول التخطيط الإنساني",
            paragraphs: [
              "أدار فريق داما جلسات نقاشية تفاعلية حول تطور القاهرة الجديدة والمدن العمرانية الجديدة. وتمحور الحديث حول الحاجة إلى مجتمعات منخفضة الكثافة تتيح للعائلات الاستقرار والنمو على المدى الطويل.",
              "واطّلع الزوار على مجسمات معمارية دقيقة لمشروع رواسين وكذلك مشروعي داما ريزيدنس وداما فيو، مع مناقشة التفاصيل الهندسية ومواد البناء مباشرة مع المعماريين."
            ],
            quote: "التطوير العقاري هو التزام طويل الأمد تجاه الناس. والإقبال الكبير الذي شهدناه يؤكد أن السوق يتطلع بصدق إلى مجتمعات حقيقية ومدروسة."
          }
        ],
        keyTakeaways: [
          "أكثر من 1,200 زائر ومهتم بجناح داما خلال أيام المعرض",
          "عرض مجسمات تفاعلية حصرية لمشروعي رواسين وداما ريزيدنس",
          "جلسات حوارية ركزت على التخطيط العمراني المتمركز حول الإنسان",
          "اهتمام استثماري واسع بالمجتمعات السكنية المتكاملة طويلة المدى"
        ]
      }
    }
  },
  {
    slug: "dama-residence-architectural-preview",
    category: "architecture",
    dateISO: "2026-07-14",
    image: img("photo-1600566753190-17f0baa2a6c3"),
    copy: {
      en: {
        title: "DAMA Residence: Where Clean Geometries Meet Shaded Courtyards",
        categoryLabel: "Architecture",
        date: "July 14, 2026",
        readTime: "4 min read",
        summary: "An exclusive architectural preview of our upcoming residential enclave, shaped around light, privacy, and expansive living.",
        leadParagraph: "DAMA Residence represents the crystallization of our design philosophy: uncluttered geometry, honest materials, and an intimate dialogue between indoor rooms and outdoor garden rooms.",
        sections: [
          {
            heading: "Indoor-Outdoor Spatial Continuity",
            paragraphs: [
              "Designed by our multidisciplinary architectural studio, each residence at DAMA Residence features oversized floor-to-ceiling sliding glass panels that retract completely into wall pockets, dissolving the boundary between reception salons and private landscaped gardens.",
              "Double-height light wells channel natural illumination into the heart of the home, eliminating dark interior corridors and fostering a tranquil, serene ambience throughout the day."
            ],
            quote: "Luxury is not ornament. True luxury is the calm quality of natural light, the texture of authentic stone, and the proportion of space."
          }
        ],
        keyTakeaways: [
          "Pocket sliding glass panels connect living areas directly to gardens",
          "Double-height light wells provide abundant natural daylight",
          "Warm limestone and timber louvers form the tactile palette",
          "Full floor plan releases and registration of interest opening soon"
        ]
      },
      ar: {
        title: "داما ريزيدنس: حين تلتقي الخطوط الهندسية النقية بالأفنية المظللة",
        categoryLabel: "العمارة",
        date: "14 يوليو 2026",
        readTime: "قراءة 4 دقائق",
        summary: "نظرة معمارية حصرية على مشروعنا السكني المرتقب، المصمم حول الضوء الطبيعي والخصوصية والمساحات الرحبة.",
        leadParagraph: "يمثل داما ريزيدنس تجسيدًا نقيًا لفلسفتنا التصميمية: خطوط هندسية واضحة، ومواد طبيعية صريحة، وحوار متناغم بين الغرف الداخلية والحدائق الخارجية.",
        sections: [
          {
            heading: "اتصال فراغي بين الداخل والخارج",
            paragraphs: [
              "صممت وحدات داما ريزيدنس بألواح زجاجية كاملة الارتفاع تنزلق بالكامل داخل تجاويف الجدران، لتذيب الفواصل التقليدية بين صالونات الاستقبال والحدائق الخاصة المظللة.",
              "وتسحب مناور الضوء مزدوجة الارتفاع أشعة الشمس الطبيعية إلى عمق البيت، مما يلغي الممرات المظلمة ويمنح المكان أجواءً هادئة ومريحة طوال ساعات النهار."
            ],
            quote: "الرقي ليس زخرفة مبالغًا فيها. الرقي الحقيقي هو جودة الضوء الطبيعي، وملمس الحجر الأصيل، وتناسب النسب الفراغية."
          }
        ],
        keyTakeaways: [
          "نوافذ زجاجية غائرة تدمج المساحات الداخلية بالحدائق مباشرة",
          "مناور إضاءة مزدوجة الارتفاع لتعزيز الإضاءة الطبيعية",
          "أحجار جيرية طبيعية وعوارض خشبية تمنح الواجهات دفئًا بصريًا",
          "فتح باب التسجيل المبكر واستعراض المخططات قريبًا"
        ]
      }
    }
  }
];

export const getNewsArticles = (): NewsArticle[] => newsArticles;

export const getNewsArticle = (slug: string): NewsArticle | undefined =>
  newsArticles.find((a) => a.slug === slug);

export const getFeaturedNewsArticle = (): NewsArticle =>
  newsArticles.find((a) => a.featured) ?? newsArticles[0];

export const getNewsCategories = (): NewsCategory[] => [
  "project-updates",
  "sustainability",
  "events",
  "architecture"
];
