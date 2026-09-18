import { Building2, Flower2, type LucideIcon } from "lucide-react";
import { siteImages, type SiteImageKey } from "@/lib/site-images";

export const calicapWorkIndex = {
  eyebrow: "Work",
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

export type CalicapWorkPillar = "build" | "transform" | "automate" | "evolve";

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
  pillar: CalicapWorkPillar;
  icon: LucideIcon;
  imageKey: SiteImageKey;
  metaTitle: string;
  metaDescription: string;
  ctaLabel: string;
  ctaHref: string;
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
    icon: Building2,
    imageKey: "calicapIndiaCrm",
    metaTitle: "Calicap India · custom CRM",
    metaDescription:
      "Case study: Calicap India Pvt. Ltd.—a custom CRM built around their process in 60 days, cutting operational cost 23% and lifting average sales 37%.",
    ctaLabel: "Have a similar challenge? Tell us your problem",
    ctaHref: "/contact?mode=unsure",
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
    icon: Flower2,
    imageKey: "yogMantramStudio",
    metaTitle: "Yog Mantram — studio website & local SEO",
    metaDescription:
      "Case study: Yog Mantram in Bareilly—a conversion-first website with 25+ programs, WhatsApp enquire, and local search pages that turn seekers into students.",
    ctaLabel: "Looking to build something similar? Tell us your problem",
    ctaHref: "/contact",
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

export function getWorkStudiesForPillar(pillar: CalicapWorkPillar) {
  return calicapWorkStudies.filter((s) => s.pillar === pillar);
}
