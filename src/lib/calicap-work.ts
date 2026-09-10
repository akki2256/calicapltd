import { Building2, Rocket, ShoppingBag, type LucideIcon } from "lucide-react";
import { siteImages, type SiteImageKey } from "@/lib/site-images";

export const calicapWorkIndex = {
  eyebrow: "Work",
  title: "Narratives backed by numbers.",
  intro:
    "Each study outlines the brief, the trade-offs, and what moved—so you can judge fit before we speak.",
  ctaLabel: "Talk about your roadmap",
  heroImage: siteImages.strategySession,
  metaTitle: "Work",
  metaDescription:
    "Selected case studies in web, organic search, and growth campaigns.",
} as const;

export type CalicapWorkStudy = {
  slug: string;
  label: string;
  title: string;
  excerpt: string;
  /** Short result line used on the home teaser grid */
  result: string;
  icon: LucideIcon;
  imageKey: SiteImageKey;
  metaTitle: string;
  metaDescription: string;
};

export const calicapWorkStudies: CalicapWorkStudy[] = [
  {
    slug: "calicap-india",
    label: "Product · CRM · ops",
    title: "Calicap India Pvt. Ltd.",
    excerpt:
      "A process-fit CRM in 60 days—clearer delegation, smarter follow-ups, 23% lower ops cost and 37% higher average sales.",
    result: "23% lower ops cost · 37% higher average sales",
    icon: Building2,
    imageKey: "calicapIndiaCrm",
    metaTitle: "Calicap India · operations CRM",
    metaDescription:
      "Case study: Calicap India Pvt. Ltd.—a custom CRM delivered in 60 days that cut operational cost 23% and lifted average sales 37%.",
  },
  {
    slug: "retail-growth",
    label: "Retail · organic",
    title: "Retail brand lift",
    excerpt:
      "Rebuilt the story-led site experience, fixed technical debt, and installed a publishing cadence that matched inventory seasons.",
    result: "Organic visibility up, clearer path to enquiry",
    icon: ShoppingBag,
    imageKey: "retailStore",
    metaTitle: "Retail brand lift",
    metaDescription:
      "Case study: retail brand organic lift with technical SEO and a rebuilt story-led experience.",
  },
  {
    slug: "saas-launch",
    label: "SaaS · launch",
    title: "SaaS launch site",
    excerpt:
      "Positioning sprint, rapid UI system, and GTM landing architecture for a category-creating product.",
    result: "Launch-ready positioning in six weeks",
    icon: Rocket,
    imageKey: "productLaunch",
    metaTitle: "SaaS launch site",
    metaDescription:
      "Case study: SaaS launch positioning, design system, and GTM landing architecture.",
  },
];

export function getWorkStudyImage(study: CalicapWorkStudy) {
  return siteImages[study.imageKey];
}

export function getWorkStudyBySlug(slug: string) {
  return calicapWorkStudies.find((s) => s.slug === slug);
}

export function getWorkStudySlugs() {
  return calicapWorkStudies.map((s) => s.slug);
}
