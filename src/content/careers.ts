import type { Locale } from "./index";

export type CareerDepartment = "Architecture & Design" | "Engineering & Delivery" | "Sales & Client Advisory" | "Sustainability & Urbanism";

export interface CareerPositionCopy {
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
}

export interface CareerPosition {
  slug: string;
  departmentId: "design" | "engineering" | "sales" | "sustainability";
  copy: Record<Locale, CareerPositionCopy>;
}

export const careerPillars: Record<
  Locale,
  {
    title: string;
    description: string;
  }[]
> = {
  en: [
    {
      title: "Design with Integrity",
      description: "We refuse generic templates. Every plan, elevation, and courtyard is crafted with architectural respect for the terrain and human life."
    },
    {
      title: "Empowered Autonomy",
      description: "We trust our people. Engineers, architects, and advisors lead with initiative, backed by supportive leadership and open communication."
    },
    {
      title: "Long-Term Value",
      description: "We build for generations, not quarterly shortcuts. Our work leaves a positive, tangible mark on the Egyptian urban landscape."
    },
    {
      title: "Continuous Mastery",
      description: "Ongoing professional development, architectural study tours, and direct collaboration with world-class consultants."
    }
  ],
  ar: [
    {
      title: "تصميم يتسم بالنزاهة والريادة",
      description: "نرفض القوالب الجاهزة. كل مخطط وواجهة وفناء يُصمم باحترام معماري عميق لطبيعة الأرض وحياة الناس."
    },
    {
      title: "تمكين المبادرة والمسؤولية",
      description: "نثق في كفاءاتنا. يقود مهندسونا ومصممونا ومستشارونا مشاريعهم باستقلالية تدعمها قيادة منفتحة وداعمة."
    },
    {
      title: "قيمة ممتدة للأجيال",
      description: "نبني للمستقبل لا للحلول السريعة المؤقتة. عملنا يترك أثرًا عمرانيًا ملموسًا ومستدامًا في النسيج المصري."
    },
    {
      title: "تطوير مهني مستمر",
      description: "برامج تدريبية متقدمة وفرص نمو مستمر وتعاون مباشر مع نخبة من كبار الخبراء والاستشاريين."
    }
  ]
};

export const careerPositions: CareerPosition[] = [
  {
    slug: "senior-architectural-designer",
    departmentId: "design",
    copy: {
      en: {
        title: "Senior Architectural Designer",
        department: "Architecture & Design",
        location: "New Cairo HQ",
        type: "Full-Time",
        summary: "Lead conceptual master plans, façade languages, and residential unit typologies for upcoming mixed-density communities in East Cairo.",
        responsibilities: [
          "Translate DAMA brand aesthetic into innovative, feasible architectural concepts",
          "Coordinate detailed design across structural, MEP, and landscape disciplines",
          "Supervise 3D visualizers and drafting teams from schematic phase to permit submissions",
          "Conduct site visits during construction to ensure fidelity to approved design details"
        ],
        qualifications: [
          "Bachelor's or Master's degree in Architecture",
          "7+ years of proven experience in high-end residential and community developments",
          "Proficiency in BIM/Revit, Rhino, AutoCAD, and architectural visualization software",
          "Strong portfolio exhibiting refined spatial planning and material sensibility"
        ]
      },
      ar: {
        title: "مصمم معماري أول",
        department: "العمارة والتصميم",
        location: "المقر الرئيسي — القاهرة الجديدة",
        type: "دوام كامل",
        summary: "قيادة المخططات المعمارية المفاهيمية وواجهات المباني وتصميم الوحدات السكنية لمجتمعاتنا الجديدة في شرق القاهرة.",
        responsibilities: [
          "ترجمة الهوية المعمارية لداما إلى تصاميم معمارية مبتكرة وقابلة للتنفيذ",
          "التنسيق التصميمي الكامل مع التخصصات الإنشائية والكهروميكانيكية وتنسيق الموقع",
          "الإشراف على فرق النمذجة والرسم الهندسي من المراحل الأولية وحتى التراخيص",
          "إجراء زيارات ميدانية للموقع لمتابعة دقة تنفيذ التفاصيل المعمارية المعتمدة"
        ],
        qualifications: [
          "بكالوريوس أو ماجستير في الهندسة المعمارية",
          "خبرة 7 سنوات أو أكثر في مشروعات التطوير السكني والمجتمعي الراقي",
          "إتقان كامل لبرامج BIM/Revit وRhino وAutoCAD وأدوات الإظهار المعماري",
          "ملف أعمال يعكس حساسية عالية للتوزيع الفراغي واختيار المواد الطبيعية"
        ]
      }
    }
  },
  {
    slug: "senior-project-construction-manager",
    departmentId: "engineering",
    copy: {
      en: {
        title: "Senior Project Construction Manager",
        department: "Engineering & Delivery",
        location: "On-Site (New Cairo)",
        type: "Full-Time",
        summary: "Oversee site execution, contractor timelines, quality audits, and safety compliance across Rwasin's flagship residential clusters.",
        responsibilities: [
          "Manage general contractors and specialized trade subcontractors on-site",
          "Enforce quality control protocols and rigorous material approval procedures",
          "Maintain critical path milestones, budget allocations, and health & safety standards",
          "Prepare weekly progress reports and coordinate with client inspection authorities"
        ],
        qualifications: [
          "B.Sc. in Civil or Construction Engineering (PMP certification advantageous)",
          "10+ years managing major multi-cluster residential community execution",
          "Proven record of on-time, within-budget milestone completions in Egypt",
          "Decisive problem solver with exceptional contractor negotiation capabilities"
        ]
      },
      ar: {
        title: "مدير مشروعات إنشائية أول",
        department: "الهندسة والتنفيذ",
        location: "الموقع الميداني (القاهرة الجديدة)",
        type: "دوام كامل",
        summary: "الإشراف على الأعمال الميدانية وجداول المقاولين وضمان الجودة واشتراطات السلامة عبر مراحل مشروع رواسين.",
        responsibilities: [
          "إدارة المقاولين الرئيسيين ومقاولي الباطن المتخصصين في الموقع",
          "تطبيق بروتوكولات صارمة لضبط الجودة واعتماد المواد ومطابقة المواصفات",
          "الالتزام بالمسار الحرج للمشروع والميزانيات المعتمدة ومعايير السلامة المهنية",
          "إعداد تقارير الإنجاز الدورية والتنسيق الفعال مع لجان الاستلام الهندسي"
        ],
        qualifications: [
          "بكالوريوس هندسة مدنية أو تشييد (يُفضل الحصول على شهادة PMP)",
          "خبرة لا تقل عن 10 سنوات في إدارة تنفيذ مشروعات المجتمعات السكنية الكبرى",
          "سجل حافل بتسليم المشروعات وفق المواعيد والميزانيات المحددة في مصر",
          "مهارات قيادية وقدرة عالية على التفاوض وإدارة فرق العمل بالموقع"
        ]
      }
    }
  },
  {
    slug: "senior-client-advisor",
    departmentId: "sales",
    copy: {
      en: {
        title: "Senior Client Relations Advisor",
        department: "Sales & Client Advisory",
        location: "New Cairo Sales Lounge",
        type: "Full-Time",
        summary: "Provide consultative, relationship-driven guidance to high-net-worth individuals and families investing in DAMA communities.",
        responsibilities: [
          "Deliver tailored property presentations and master plan walk-throughs in the sales lounge",
          "Guide prospective homeowners through unit selections, payment schedules, and contracts",
          "Nurture enduring relationships with clients from first inquiry through post-handover",
          "Represent DAMA Developments with professionalism at private buyer events and exhibitions"
        ],
        qualifications: [
          "Bachelor's degree in Business, Marketing, Architecture, or related fields",
          "5+ years in luxury real estate advisory with demonstrable track record",
          "Bilingual fluency in Arabic and English with articulate presentation abilities",
          "High emotional intelligence, consultative approach, and deep market knowledge"
        ]
      },
      ar: {
        title: "مستشار أول لعلاقات العملاء",
        department: "المبيعات واستشارات العملاء",
        location: "صالة مبيعات القاهرة الجديدة",
        type: "دوام كامل",
        summary: "تقديم استشارات عقارية مبنية على الثقة وبناء علاقات طويلة الأمد مع المستثمرين والعائلات الراغبة في التملك بمشروعات داما.",
        responsibilities: [
          "تقديم عروض عقارية مخصصة وشرح المخططات العامة داخل صالة المبيعات",
          "إرشاد العملاء خلال اختيار الوحدات المناسبة وخطط السداد والإجراءات التعاقدية",
          "بناء وتنمية علاقات مستدامة مع العملاء بدءًا من الاستفسار الأول وحتى ما بعد التسليم",
          "تمثيل داما باحترافية وأناقة في الفعاليات واللقاءات الخاصة والمعارض العقارية"
        ],
        qualifications: [
          "درجة البكالوريوس في إدارة الأعمال أو التسويق أو العمارة أو مجال ذي صلة",
          "خبرة 5 سنوات أو أكثر في الاستشارات العقارية الراقية وسجل مبيعات متميز",
          "إتقان تام للغتين العربية والإنجليزية ومهارات تواصل وعرض استثنائية",
          "نهج استشاري يضع احتياجات العميل أولاً ومعرفة عميقة بالسوق العقاري"
        ]
      }
    }
  },
  {
    slug: "landscape-sustainability-specialist",
    departmentId: "sustainability",
    copy: {
      en: {
        title: "Landscape Architecture & Sustainability Specialist",
        department: "Sustainability & Urbanism",
        location: "New Cairo HQ",
        type: "Full-Time",
        summary: "Drive biophilic landscape architecture, water-conservation strategies, and ecological corridors across all master plans.",
        responsibilities: [
          "Design botanical palettes prioritizing native and drought-tolerant plant species",
          "Integrate smart greywater systems, soil sensors, and micro-irrigation networks",
          "Collaborate with urban planners to develop shaded pedestrian corridors and bio-swales",
          "Measure and audit environmental performance metrics across development lifecycles"
        ],
        qualifications: [
          "Degree in Landscape Architecture, Environmental Engineering, or Urban Ecology",
          "4+ years experience focusing on arid or Mediterranean sustainable landscaping",
          "Expertise in sustainable irrigation systems and xeriscaping principles",
          "Passion for creating regenerative, biodiversity-rich communal spaces"
        ]
      },
      ar: {
        title: "أخصائي عمارة البيئة والاستدامة",
        department: "الاستدامة والتخطيط البيئي",
        location: "المقر الرئيسي — القاهرة الجديدة",
        type: "دوام كامل",
        summary: "تطوير منظومة اللاندسكيب الحيوي واستراتيجيات ترشيد المياه والممرات البيئية الخضراء في جميع مشروعات داما.",
        responsibilities: [
          "اختيار المنظومات النباتية المحلية المتوافقة مع المناخ والمقاومة للجفاف",
          "دمج شبكات الري الذكية وأنظمة إعادة تدوير المياه والمستشعرات الميدانية",
          "التعاون مع المخططين لتطوير مسارات مشاة مظللة طبيعيًا ومصارف مياه حيوية",
          "قياس ومتابعة مؤشرات الأداء البيئي خلال مراحل التصميم والتشغيل"
        ],
        qualifications: [
          "مؤهل في عمارة البيئة أو الهندسة البيئية أو التخطيط العمراني المستدام",
          "خبرة 4 سنوات أو أكثر في مشاريع اللاندسكيب المستدام في البيئات الجافة",
          "معرفة تقنية بأنظمة الري المتطورة ومبادئ الزراعة وترشيد المياه (Xeriscaping)",
          "شغف حقيقي بابتكار مساحات خضراء متجددة تثري التنوع الحيوي المجتمعي"
        ]
      }
    }
  }
];

export const getCareerPositions = (): CareerPosition[] => careerPositions;
export const getCareerPosition = (slug: string): CareerPosition | undefined =>
  careerPositions.find((p) => p.slug === slug);
