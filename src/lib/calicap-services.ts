import {
  LayoutTemplate,
  Megaphone,
  Monitor,
  Search,
  Smartphone,
  Store,
  type LucideIcon,
} from "lucide-react";
import { siteImages } from "@/lib/site-images";

export const calicapServicesOverview = {
  eyebrow: "Services",
  title: "From first impression to repeatable demand.",
  introLead:
    "Engagements are scoped as projects with optional retained growth. Every line item maps to a milestone you can inspect—not a black box retainer. Under the hood we standardise on",
  introStacks: {
    web: "React, Node.js, Spring, and pragmatic AI integrations",
    mobile: "native iOS and Android or React Native",
    cloud: "AWS or Azure",
  },
  introTail: "for cloud—so handovers stay honest.",
  ctaLabel: "Discuss scope",
  hybridPrompt: "Looking for something hybrid?",
  hybridCta: "Outline your constraints",
  hybridTail: "and we will propose a phased plan.",
  heroImage: siteImages.cloudNetwork,
  metaTitle: "Services",
  metaDescription:
    "Web and mobile services: React, Node.js, Spring, AI, native iOS and Android, React Native, AWS and Azure.",
} as const;

export type CalicapServicePillar = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: (typeof siteImages)[keyof typeof siteImages];
};

export const calicapServicePillars: CalicapServicePillar[] = [
  {
    href: "/services/web-app-development",
    title: "Web app development",
    description:
      "React-first front ends, Node.js and Spring backends, AI-enabled features, and delivery on AWS or Azure—plus SEO and performance marketing in the same engagement.",
    icon: Monitor,
    image: siteImages.heroWorkspace,
  },
  {
    href: "/services/mobile-app-development",
    title: "Mobile app development",
    description:
      "Native iOS and Android or React Native when it is the right trade-off—store presence, growth, and backends that plug into AWS or Azure like your web estate.",
    icon: Smartphone,
    image: siteImages.mobileHands,
  },
];

export type CalicapServiceOffering = {
  title: string;
  icon: LucideIcon;
  points: string[];
};

export const calicapWebAppService = {
  path: "/services/web-app-development",
  eyebrow: "Web app development",
  title: "Web experiences built to sell and scale.",
  introLead:
    "From marketing sites to app-like web products—strategy, implementation, and distribution aligned so design never fights demand gen. We build with",
  introStacks: {
    core: "React, Node.js, and Spring",
    ai: "AI integrations (LLMs, retrieval, workflow automation)",
  },
  introMid: "where they improve outcomes—not slide decks—and host on",
  introCloud: ["AWS", "Azure"] as const,
  introTail: "to match your enterprise requirements.",
  siblingHref: "/services/mobile-app-development",
  siblingLabel: "Mobile app development",
  footerPrompt: "Need both web and mobile?",
  footerCta: "Tell us about the full roadmap",
  image: siteImages.heroWorkspace,
  metaTitle: "Web app development",
  metaDescription:
    "Web experiences with React, Node.js, Spring, AI integrations, and AWS or Azure—plus SEO, content, and performance marketing.",
  offerings: [
    {
      title: "Website design & build",
      icon: LayoutTemplate,
      points: [
        "Positioning, IA, and UX flows grounded in conversion",
        "React ecosystems for the UI (including Next.js where it fits), with Node.js or Spring for APIs, jobs, and integrations—plus AI features when the product case is clear",
        "Analytics, consent-aware tagging, technical SEO, and observability from day one",
      ],
    },
    {
      title: "Organic growth",
      icon: Search,
      points: [
        "Keyword strategy tied to revenue stages—not vanity volume",
        "Content systems: briefs, templates, and internal linking architecture—with AI assist for research and drafts where editors stay accountable",
        "Core Web Vitals, schema, and index hygiene as ongoing hygiene",
      ],
    },
    {
      title: "Performance marketing",
      icon: Megaphone,
      points: [
        "Paid search and paid social when creative and landing pages are ready",
        "Attribution that respects privacy changes—offline imports where needed",
        "Creative testing cadence with guardrails on CAC and payback, with infrastructure on AWS or Azure sized to traffic reality",
      ],
    },
  ] satisfies CalicapServiceOffering[],
} as const;

export const calicapMobileAppService = {
  path: "/services/mobile-app-development",
  eyebrow: "Mobile app development",
  title: "Mobile products with the same commercial rigour as web.",
  introLead:
    "We mirror the web playbook—clarity of offer, disciplined build, and distribution that rolls up to numbers you can defend. Delivery spans",
  introStacks: {
    native: "native iOS and Android",
    rn: "React Native",
    backend: "Node.js / Spring",
    cloud: "AWS / Azure",
  },
  siblingHref: "/services/web-app-development",
  siblingLabel: "Web app development",
  footerPrompt: "Shipping web and mobile together?",
  footerCta: "Outline your constraints",
  image: siteImages.mobileHands,
  metaTitle: "Mobile app development",
  metaDescription:
    "Native iOS, Android, and React Native—with APIs on Node.js or Spring and cloud on AWS or Azure.",
  offerings: [
    {
      title: "Mobile product design & build",
      icon: Smartphone,
      points: [
        "Product definition, IA, and UX patterns tuned for iOS and Android—native Swift and Kotlin where performance and platform APIs matter, or React Native when delivery speed and shared logic win",
        "Backend contracts that align with your web estate: Node.js or Spring services, versioning, and CI so app releases are boring on purpose",
        "Instrumentation, consent-aware analytics, and release pipelines from day one—artifacts deployed through AWS or Azure alongside your existing cloud footprint",
      ],
    },
    {
      title: "Organic discovery",
      icon: Store,
      points: [
        "App store positioning and keyword strategy tied to category reality—not generic ASO lists",
        "Creative and editorial rhythm for ratings, featuring, and lifecycle engagement",
        "Technical health of listings, deep links, and share surfaces as part of growth hygiene",
      ],
    },
    {
      title: "Performance marketing",
      icon: Megaphone,
      points: [
        "Paid acquisition when product–market signals are ready: meta search, UAC, and partner networks",
        "Attribution and incrementality with privacy constraints—offline and SKAN where relevant",
        "Creative and cohort testing with guardrails on CAC, payback, and retention",
      ],
    },
  ] satisfies CalicapServiceOffering[],
} as const;
