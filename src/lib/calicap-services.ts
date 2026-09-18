import {
  Cpu,
  LayoutTemplate,
  Megaphone,
  Monitor,
  RefreshCw,
  Search,
  Smartphone,
  Store,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { siteImages } from "@/lib/site-images";

export const calicapServicesOverview = {
  eyebrow: "Services",
  title: "Technology built around what needs to happen next.",
  body:
    "Whether the requirement is clear, an idea needs shaping, or a problem needs solving — define the right approach and turn it into something real.",
  primaryCta: "Start a project",
  secondaryCta: "Talk to us",
  heroImage: siteImages.cloudNetwork,
  metaTitle: "Services",
  metaDescription:
    "Build, transform, automate, and evolve — digital products, custom software, business systems, practical AI, and ongoing technology support.",
} as const;

export type CalicapStrategicPillar = {
  id: string;
  label: string;
  tagline: string;
  body: string;
  bullets: readonly string[];
  cta: string;
  href: string;
  icon: LucideIcon;
};

/** Level-1 service spine — used on /services and nav */
export const calicapStrategicPillars: CalicapStrategicPillar[] = [
  {
    id: "build",
    label: "Build",
    tagline: "Create what's needed.",
    body: "Applications, software, digital products, and integrations shaped around how work actually happens.",
    bullets: [
      "Web & mobile applications",
      "Custom software",
      "Digital products & platforms",
      "APIs & integrations",
    ],
    cta: "Explore Build",
    href: "/build",
    icon: LayoutTemplate,
  },
  {
    id: "transform",
    label: "Transform",
    tagline: "Modernize what already exists.",
    body: "Improve digital experiences, bring core processes into better systems, and clarify what to change.",
    bullets: [
      "Web & e-commerce",
      "Business management systems",
      "Digital transformation",
      "Technology consulting",
    ],
    cta: "Explore Transform",
    href: "/transform",
    icon: Workflow,
  },
  {
    id: "automate",
    label: "Automate",
    tagline: "Remove unnecessary manual work.",
    body: "Workflows and practical AI where they create value — not as the identity of the company.",
    bullets: [
      "AI applications",
      "AI chatbots & assistants",
      "Workflow automation",
      "AI integrations",
    ],
    cta: "Explore Automate",
    href: "/automate",
    icon: Cpu,
  },
  {
    id: "evolve",
    label: "Evolve",
    tagline: "Keep technology moving.",
    body: "Maintenance, support, and continuous development after launch — so systems stay useful.",
    bullets: [
      "Application maintenance",
      "Website maintenance",
      "AMC & support",
      "Continuous development",
    ],
    cta: "Explore Evolve",
    href: "/evolve",
    icon: RefreshCw,
  },
];

/** @deprecated alias — header/footer still map service links from pillars */
export const calicapServicePillars = calicapStrategicPillars.map((p) => ({
  href: p.href,
  title: p.label,
  description: p.body,
  icon: p.icon,
  image: siteImages.cloudNetwork,
}));

export type CalicapServiceGroup = {
  title: string;
  body: string;
};

export type CalicapServiceSection = {
  id: string;
  label: string;
  title: string;
  intro: string;
  groups: readonly CalicapServiceGroup[];
  cta: string;
};

export const calicapServiceSections: CalicapServiceSection[] = [
  {
    id: "build",
    label: "Build",
    title: "Create what's needed.",
    intro:
      "From a new digital product to software designed around real workflows — turn ideas and requirements into working technology.",
    groups: [
      {
        title: "Web & mobile applications",
        body: "Digital experiences built around customers and day-to-day workflows.",
      },
      {
        title: "Custom software",
        body: "Software designed around the way operations actually run.",
      },
      {
        title: "Digital products",
        body: "Turn an idea into a product people can use.",
      },
      {
        title: "APIs & integrations",
        body: "Connect systems, move data, and reduce disconnected workflows.",
      },
    ],
    cta: "Tell us what you want to build",
  },
  {
    id: "transform",
    label: "Transform",
    title: "Modernize what already exists.",
    intro:
      "Improve digital experiences, bring core processes into systems that fit, and get clarity on what to build, change, or connect.",
    groups: [
      {
        title: "Web & e-commerce",
        body: "Better digital experiences and stronger online operations.",
      },
      {
        title: "Business management systems",
        body: "ERP, CRM, HRMS, and automation systems built around how the organization works.",
      },
      {
        title: "Digital transformation",
        body: "Improve the way work gets done through better technology.",
      },
      {
        title: "Technology consulting",
        body: "Think with us. Build with us. Clarity on what to build, change, connect, or improve.",
      },
    ],
    cta: "Talk about a transformation",
  },
  {
    id: "automate",
    label: "Automate",
    title: "Remove unnecessary manual work.",
    intro:
      "Connect systems, automate repetitive work, and apply AI where it creates practical value.",
    groups: [
      {
        title: "AI applications",
        body: "Practical AI applications and intelligent functionality inside useful products and processes.",
      },
      {
        title: "AI chatbots & assistants",
        body: "Customer interactions, internal assistance, knowledge access, and workflow-connected conversations.",
      },
      {
        title: "Workflow automation",
        body: "Repetitive processes, approvals, notifications, data movement, and routine operations.",
      },
      {
        title: "AI integrations",
        body: "Connect AI capabilities to existing systems and AI-enabled workflows.",
      },
    ],
    cta: "Automate a process",
  },
  {
    id: "evolve",
    label: "Evolve",
    title: "Keep technology moving.",
    intro:
      "Launch is not the end. Keep critical systems reliable, useful, and aligned as priorities change.",
    groups: [
      {
        title: "Application maintenance",
        body: "Fixes, reliability, improvements, updates, and ongoing development.",
      },
      {
        title: "Website maintenance",
        body: "Updates, fixes, improvements, content and functional changes, ongoing development.",
      },
      {
        title: "AMC & support",
        body: "An ongoing technology relationship — maintenance, issue resolution, improvements, and continued development.",
      },
      {
        title: "Continuous development",
        body: "New features, improvements, product evolution, and long-term development as requirements change.",
      },
    ],
    cta: "Talk about ongoing support",
  },
];

export const calicapServicesUnsure = {
  title: "Not sure what you need? That's okay.",
  body:
    "You don't need to know exactly what technology you need. You just need to know what you want to achieve. Tell us what's happening — we'll help define the right approach.",
  cta: "Tell us your problem",
  href: "/contact?mode=unsure",
} as const;

export const calicapServicesApproach = {
  title: "Use what's right. Build what's necessary.",
  body:
    "Not every problem needs custom software. Where an existing platform can do the job well, use it. Where something more specific is required, build and customize the right solution.",
} as const;

export type CalicapPillarPage = {
  id: string;
  path: string;
  eyebrow: string;
  title: string;
  body: string;
  challengesTitle: string;
  challenges: readonly string[];
  examplesTitle: string;
  examples: readonly string[];
  flexibleTitle: string;
  flexibleBody: string;
  contactHref: string;
  contactCta: string;
  problemCta?: string;
  metaTitle: string;
  metaDescription: string;
};

export const calicapPillarPages: Record<string, CalicapPillarPage> = {
  build: {
    id: "build",
    path: "/build",
    eyebrow: "Build",
    title: "Whether there is a clear specification or just an idea, we can help build it.",
    body: "Applications, software, digital products, and integrations shaped around customers and how work actually happens.",
    challengesTitle: "What we can build",
    challenges: [
      "Web & mobile applications",
      "Custom software",
      "Digital products",
      "APIs & integrations",
    ],
    examplesTitle: "What can be built with us",
    examples: [
      "Business applications and customer-facing applications",
      "Mobile apps, portals, and digital platforms",
      "E-commerce experiences and internal software",
      "Custom workflows and integrated systems",
    ],
    flexibleTitle: "How a project can begin",
    flexibleBody:
      "A clear specification, a rough idea, or a real problem. You don't need to know exactly what technology you need — only what you want to achieve.",
    contactHref: "/contact?mode=know",
    contactCta: "Tell us what you want to build",
    problemCta: "Tell us your problem",
    metaTitle: "Build",
    metaDescription:
      "Create what's needed — web and mobile applications, custom software, digital products, and integrations.",
  },
  transform: {
    id: "transform",
    path: "/transform",
    eyebrow: "Transform",
    title: "Improve how things operate through technology.",
    body: "Technology should evolve as operations evolve — websites, systems, workflows, and digital experiences.",
    challengesTitle: "Problems worth fixing",
    challenges: [
      "Outdated software",
      "Disconnected systems",
      "Inefficient workflows and manual processes",
      "Websites that no longer meet current needs",
      "Multiple tools doing overlapping jobs",
    ],
    examplesTitle: "What can be transformed",
    examples: [
      "Web & e-commerce",
      "Business management systems — ERP, CRM, HRMS, and automation systems",
      "Digital transformation",
      "Technology consulting",
    ],
    flexibleTitle: "How we approach it",
    flexibleBody:
      "Modernize what already exists. Improve operations through better technology — without forcing a one-size package.",
    contactHref: "/contact?mode=know",
    contactCta: "Modernize your technology",
    problemCta: "Tell us your problem",
    metaTitle: "Transform",
    metaDescription:
      "Modernize what already exists — web and e-commerce, business management systems, digital transformation, and technology consulting.",
  },
  automate: {
    id: "automate",
    path: "/automate",
    eyebrow: "Automate",
    title: "Eliminate repetitive manual work.",
    body: "Save time, reduce avoidable errors, improve consistency, and free people for higher-value work. AI is one set of capabilities within a broader automation offering.",
    challengesTitle: "What can be automated?",
    challenges: [
      "Repetitive workflows",
      "Data movement",
      "Internal processes and routine administration",
      "Customer interactions, notifications, and approvals",
    ],
    examplesTitle: "Automation capabilities",
    examples: [
      "AI applications",
      "AI chatbots",
      "Workflow automation",
      "AI integrations",
    ],
    flexibleTitle: "The business impact",
    flexibleBody:
      "Time saved. Better consistency. Fewer manual steps. Better use of people's time. More efficient operations.",
    contactHref: "/contact?mode=unsure",
    contactCta: "Tell us what's taking too much time",
    problemCta: "Tell us your problem",
    metaTitle: "Automate",
    metaDescription:
      "Remove repetitive work — workflow automation, AI applications, chatbots, and integrations where they create practical value.",
  },
  evolve: {
    id: "evolve",
    path: "/evolve",
    eyebrow: "Evolve",
    title: "Have a technology partner for the long term.",
    body: "Technology does not stop needing attention after launch. Keep it reliable, relevant, and improving.",
    challengesTitle: "Why technology needs to evolve",
    challenges: [
      "Requirements change",
      "Customers and processes change",
      "New functionality becomes necessary",
      "Existing systems need maintenance and improvement",
    ],
    examplesTitle: "What we maintain & improve",
    examples: [
      "Application maintenance",
      "Website maintenance",
      "AMC",
      "Continuous development",
    ],
    flexibleTitle: "The ongoing cycle",
    flexibleBody:
      "Fix → Maintain → Improve → Extend → Evolve. Continuous improvement and a long-term technology relationship — not a commodity ticket queue.",
    contactHref: "/contact?mode=know",
    contactCta: "Keep your technology moving",
    problemCta: "Tell us your problem",
    metaTitle: "Evolve",
    metaDescription:
      "Keep technology moving — application and website maintenance, AMC, and continuous development.",
  },
};

export function getPillarSection(id: string) {
  return calicapServiceSections.find((s) => s.id === id);
}

export function getPillarPage(id: string) {
  return calicapPillarPages[id];
}

export type CalicapServiceOffering = {
  title: string;
  icon: LucideIcon;
  points: string[];
};

export const calicapWebAppService = {
  path: "/services/web-app-development",
  pillar: "Build",
  eyebrow: "Web & digital products",
  title: "Web applications and digital experiences that fit how work actually happens.",
  body:
    "Marketing sites, portals, and web applications — designed to convert, easy to run, and ready to evolve. Part of how we Build what's next.",
  cta: "Start an application project",
  siblingHref: "/services/mobile-app-development",
  siblingLabel: "Mobile app development",
  footerPrompt: "Need web and mobile together?",
  footerCta: "Tell us about the full roadmap",
  image: siteImages.heroWorkspace,
  metaTitle: "Web app development",
  metaDescription:
    "Websites, portals, and web applications — built around customers, workflows, and growth goals.",
  useCases: [
    "A marketing site that needs to convert, not just look finished",
    "A customer or partner portal that replaces spreadsheets and email chains",
    "A web product that has to grow after launch",
  ],
  offerings: [
    {
      title: "Website design & build",
      icon: LayoutTemplate,
      points: [
        "Positioning, information architecture, and UX grounded in conversion",
        "Modern web delivery with APIs and integrations where the product needs them",
        "Analytics and technical SEO from day one",
      ],
    },
    {
      title: "Organic growth",
      icon: Search,
      points: [
        "Search strategy tied to real stages of demand — not vanity volume",
        "Content systems editors can run without a black box",
        "Performance and index hygiene as ongoing practice",
      ],
    },
    {
      title: "Performance marketing",
      icon: Megaphone,
      points: [
        "Paid search and social when creative and landing pages are ready",
        "Attribution that respects privacy constraints",
        "Testing cadence with clear guardrails on cost and payback",
      ],
    },
  ] satisfies CalicapServiceOffering[],
} as const;

export const calicapMobileAppService = {
  path: "/services/mobile-app-development",
  pillar: "Build",
  eyebrow: "Mobile applications",
  title: "Mobile products built around how customers and teams work.",
  body:
    "Native or cross-platform when the trade-off is right — clear offer, disciplined build, and a path that holds up after launch.",
  cta: "Start an application project",
  siblingHref: "/services/web-app-development",
  siblingLabel: "Web app development",
  footerPrompt: "Shipping web and mobile together?",
  footerCta: "Outline your constraints",
  image: siteImages.mobileHands,
  metaTitle: "Mobile app development",
  metaDescription:
    "Native iOS, Android, and React Native products — designed around customers, workflows, and growth goals.",
  useCases: [
    "A customer-facing app that has to match the quality of the website",
    "An internal tool that replaces chat threads, sheets, and tribal knowledge",
    "A product that needs store presence and a backend that can grow",
  ],
  offerings: [
    {
      title: "Mobile product design & build",
      icon: Smartphone,
      points: [
        "Product definition and UX tuned for iOS and Android",
        "Native or React Native when the delivery trade-off is clear",
        "Backend contracts, release pipelines, and instrumentation from day one",
      ],
    },
    {
      title: "Organic discovery",
      icon: Store,
      points: [
        "Store positioning tied to category reality",
        "Creative and editorial rhythm for ratings and lifecycle engagement",
        "Deep links and share surfaces as part of growth hygiene",
      ],
    },
    {
      title: "Performance marketing",
      icon: Megaphone,
      points: [
        "Paid acquisition when product–market signals are ready",
        "Attribution with privacy constraints",
        "Creative and cohort testing with clear cost guardrails",
      ],
    },
  ] satisfies CalicapServiceOffering[],
} as const;

/** Detail pages still linked from Build section */
export const calicapBuildDetailLinks = [
  {
    href: "/services/web-app-development",
    label: "Web app development",
    icon: Monitor,
  },
  {
    href: "/services/mobile-app-development",
    label: "Mobile app development",
    icon: Smartphone,
  },
] as const;
