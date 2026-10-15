import {
  Building2,
  DraftingCompass,
  Flower2,
  HeartPulse,
  MonitorSmartphone,
  type LucideIcon,
} from "lucide-react";
import {
  getService,
  type EngagementModel,
  type PillarId,
} from "@/lib/brand-architecture";
import { siteImages, type SiteImageKey } from "@/lib/site-images";

export const calicapWorkIndex = {
  title: "What we've built.",
  intro:
    "Evidence of capability — real products, systems, and digital experiences. Challenge, solution, and outcome.",
  ctaLabel: "Tell us your problem",
  ctaHref: "/contact",
  heroImage: siteImages.strategySession,
  metaTitle: "Work",
  metaDescription:
    "Selected Calicon case studies: custom software and digital products with real constraints and outcomes.",
} as const;

export type CalicapWorkPillar = PillarId;

export type CalicapWorkStudy = {
  slug: string;
  label: string;
  title: string;
  /** Short business context for cards */
  context: string;
  /** What was built */
  built: string;
  excerpt: string;
  /** Short result line used on cards */
  result: string;
  beforeAfter?: string;
  /** Primary pillar for display; projects may span several */
  pillar: PillarId;
  pillars: readonly PillarId[];
  serviceIds: readonly string[];
  outcomeIds?: readonly string[];
  industryIds?: readonly string[];
  engagement?: EngagementModel;
  icon: LucideIcon;
  imageKey: SiteImageKey;
  metaTitle: string;
  metaDescription: string;
  ctaLabel: string;
  ctaHref: string;
  /** Documented delivery facts only — never invented architecture or QA */
  deliveryNotes?: readonly string[];
};

export const calicapWorkStudies: CalicapWorkStudy[] = [
  {
    slug: "calicap-india",
    label: "Build · Custom software",
    title: "Calicap India Pvt. Ltd.",
    context: "Loan operations running across spreadsheets, chat, and fragmented tools.",
    built: "Custom CRM around their loan workflow — pipeline, follow-ups, and one customer record.",
    excerpt:
      "Custom CRM around their loan workflow—shipped in 60 days. 23% lower ops cost, 37% higher average sales.",
    result: "23% lower ops cost · 37% higher average sales",
    beforeAfter: "Disconnected tools → One workflow",
    pillar: "build",
    pillars: ["build", "transform", "automate"],
    serviceIds: [
      "custom-software",
      "business-management-systems",
      "workflow-automation",
    ],
    outcomeIds: ["modernize", "automate", "create"],
    industryIds: ["financial-services"],
    engagement: "project",
    icon: Building2,
    imageKey: "calicapIndiaCrmLogin",
    metaTitle: "Calicap India · custom CRM",
    metaDescription:
      "Case study: Calicap India Pvt. Ltd.—a custom CRM built around their process in 60 days, cutting operational cost 23% and lifting average sales 37%.",
    ctaLabel: "Have a similar challenge? Tell us your problem",
    ctaHref: "/contact?mode=unsure",
    deliveryNotes: [
      "Started from the live loan workflow, not a generic CRM template.",
      "Stages, owners, and handoffs became the product model.",
      "Shipped as one platform from first contact through settlement in 60 days.",
    ],
  },
  {
    slug: "yog-mantram",
    label: "Transform · Web",
    title: "Yog Mantram",
    context: "A yoga studio that needed a conversion-ready digital front door in Bareilly.",
    built: "Cinematic mobile-first site — 25+ programs, WhatsApp enquire, local search pages.",
    excerpt:
      "A cinematic, mobile-first studio site—25+ programs, WhatsApp enquire, and Bareilly pages built to turn seekers into students.",
    result: "25+ program pages · local search · enquire on every class",
    beforeAfter: "Word of mouth → Search-ready front desk",
    pillar: "transform",
    pillars: ["transform", "build"],
    serviceIds: ["web-ecommerce", "web-mobile-apps"],
    outcomeIds: ["modernize", "create"],
    industryIds: ["fitness-wellness"],
    engagement: "project",
    icon: Flower2,
    imageKey: "yogMantramHero",
    metaTitle: "Yog Mantram — studio website & local SEO",
    metaDescription:
      "Case study: Yog Mantram in Bareilly—a conversion-first website with 25+ programs, WhatsApp enquire, and local search pages that turn seekers into students.",
    ctaLabel: "Looking to build something similar? Tell us your problem",
    ctaHref: "/contact",
    deliveryNotes: [
      "Designed as a digital front desk: programs, enquire paths, and local search.",
      "Built as a Next.js marketing site with schema, sitemap, and Open Graph.",
      "Educational pages support search without turning the studio into a blog.",
    ],
  },
  {
    slug: "amazing-art-architects",
    label: "Transform · Web",
    title: "Amazing Art Architects",
    context:
      "An architecture practice that needed a digital presence matching the quality of its built work.",
    built:
      "Premium portfolio website — UI/UX, visual direction, and responsive React build end-to-end.",
    excerpt:
      "A refined digital presence for an architecture studio—portfolio-first, enquiry-ready, and shipped in four weeks.",
    result: "Premium brand presence · portfolio-led UX · client enquiries",
    beforeAfter: "No cohesive digital presence → Portfolio-first brand site",
    pillar: "transform",
    pillars: ["transform", "build"],
    serviceIds: ["web-ecommerce", "web-mobile-apps"],
    outcomeIds: ["modernize", "create"],
    industryIds: ["architecture-design"],
    engagement: "project",
    icon: DraftingCompass,
    imageKey: "amazingArtHero",
    metaTitle: "Amazing Art Architects — architecture website",
    metaDescription:
      "Case study: Amazing Art Architects—a premium portfolio website designed and built by Calicon in four weeks to showcase projects and generate client enquiries.",
    ctaLabel: "Want a site like this? Tell us your problem",
    ctaHref: "/contact",
    deliveryNotes: [
      "Treated the site as an extension of the firm’s design philosophy — clean, considered, intentional.",
      "Prioritised visual hierarchy and spacing so a large project library never feels crowded.",
      "Shipped UI/UX, visual direction, and responsive React development end-to-end in four weeks.",
    ],
  },
  {
    slug: "chaitanya-computers",
    label: "Transform · Web + ops",
    title: "Chaitanya Computers",
    context:
      "A computer retail business that needed a credible digital front door and a tighter grip on inventory and sales.",
    built:
      "Public website with an on-site chatbot, plus a customized inventory and sales management solution — presence and operations in one engagement.",
    excerpt:
      "Digital presence and operations in three weeks—chaitanyacomputers.com with a chatbot, plus a custom inventory and sales system shaped to how the shop actually runs.",
    result: "Live website · chatbot · inventory & sales ops · 3 weeks",
    beforeAfter: "Offline retail loop → Digital presence + managed operations",
    pillar: "transform",
    pillars: ["transform", "build", "automate"],
    serviceIds: [
      "web-ecommerce",
      "web-mobile-apps",
      "custom-software",
      "business-management-systems",
    ],
    outcomeIds: ["modernize", "create", "automate"],
    industryIds: ["retail-ecommerce"],
    engagement: "project",
    icon: MonitorSmartphone,
    imageKey: "chaitanyaComputersHero",
    metaTitle: "Chaitanya Computers — website, chatbot & inventory ops",
    metaDescription:
      "Case study: Chaitanya Computers—a digital presence at chaitanyacomputers.com with an on-site chatbot, plus a customized inventory and sales management solution, delivered in three weeks.",
    ctaLabel: "Need presence and ops in one build? Tell us your problem",
    ctaHref: "/contact",
    deliveryNotes: [
      "Treated the website as the public face — including a chatbot for visitor questions — and the inventory/sales system as the operating floor.",
      "Stock, sales, and day-to-day retail workflow shaped the product model instead of a generic shop template.",
      "Shipped the live site, chatbot, and customized management solution together in three weeks.",
    ],
  },
  {
    slug: "lungconnect-india",
    label: "Build · Custom MIS",
    title: "LungConnect India Foundation",
    context:
      "A cancer-care foundation that needed one place for enrollment, follow-ups, patient profiles, and guidance history.",
    built:
      "MIS software for patient enrollment, follow-ups, data maintenance, profiles, and guidance history management.",
    excerpt:
      "Custom MIS for cancer patient enrollment, follow-ups, profiles, and guidance history—shipped in 60 days so care teams stop rebuilding the patient story from fragments.",
    result: "Patient MIS · enrollment to guidance history · 60 days",
    beforeAfter: "Fragmented patient records → One care operations system",
    pillar: "build",
    pillars: ["build", "transform", "automate"],
    serviceIds: [
      "custom-software",
      "business-management-systems",
      "workflow-automation",
    ],
    outcomeIds: ["modernize", "automate", "create"],
    industryIds: ["healthcare"],
    engagement: "project",
    icon: HeartPulse,
    imageKey: "lungconnectIndiaHero",
    metaTitle: "LungConnect India — patient MIS",
    metaDescription:
      "Case study: LungConnect India Foundation—MIS software for cancer patient enrollment, follow-ups, data maintenance, patient profiles, and guidance history, delivered in 60 days.",
    ctaLabel: "Running care operations on fragments? Tell us your problem",
    ctaHref: "/contact?mode=unsure",
    deliveryNotes: [
      "Started from enrollment, follow-up, and guidance workflows — not a generic hospital template.",
      "Patient identity, profile history, and guidance trail became the product model.",
      "Shipped as one MIS from enrollment through ongoing follow-up and history in 60 days.",
    ],
  },
];

/** Documented outcomes only — never invent metrics here */
export const calicapDocumentedOutcomes = [
  {
    value: "23%",
    label: "Lower operational cost",
    detail: "Calicap India — custom CRM",
    href: "/work/calicap-india",
  },
  {
    value: "37%",
    label: "Higher average sales",
    detail: "Calicap India — custom CRM",
    href: "/work/calicap-india",
  },
  {
    value: "60 days",
    label: "Concept to delivery",
    detail: "Calicap India — custom CRM",
    href: "/work/calicap-india",
  },
  {
    value: "25+",
    label: "Program pages live",
    detail: "Yog Mantram — studio website",
    href: "/work/yog-mantram",
  },
  {
    value: "4 wks",
    label: "Concept to launch",
    detail: "Amazing Art Architects — website",
    href: "/work/amazing-art-architects",
  },
  {
    value: "3 wks",
    label: "Concept to launch",
    detail: "Chaitanya Computers — website, chatbot & ops",
    href: "/work/chaitanya-computers",
  },
  {
    value: "60 days",
    label: "Concept to delivery",
    detail: "LungConnect India — patient MIS",
    href: "/work/lungconnect-india",
  },
] as const;

export function getWorkStudyImage(study: CalicapWorkStudy) {
  return siteImages[study.imageKey];
}

export function getWorkStudyBySlug(slug: string) {
  return calicapWorkStudies.find((s) => s.slug === slug);
}

export function getWorkStudySlugs() {
  return calicapWorkStudies.map((s) => s.slug);
}

export function getWorkStudiesForPillar(pillar: PillarId) {
  return calicapWorkStudies.filter(
    (s) => s.pillar === pillar || s.pillars.includes(pillar),
  );
}

export function getWorkStudiesForService(serviceId: string) {
  return calicapWorkStudies.filter((s) => s.serviceIds.includes(serviceId));
}

export function getWorkStudiesForOutcome(outcomeId: string) {
  return calicapWorkStudies.filter((s) => s.outcomeIds?.includes(outcomeId));
}

export function getWorkStudyServices(study: CalicapWorkStudy) {
  return study.serviceIds
    .map((id) => getService(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
}
