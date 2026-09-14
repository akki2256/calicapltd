import { Building2, Flower2, type LucideIcon } from "lucide-react";
import { siteImages, type SiteImageKey } from "@/lib/site-images";

export const calicapWorkIndex = {
  eyebrow: "Work",
  title: "Selected work.",
  intro:
    "Real engagements—challenge, approach, and result. Written so you can judge fit before we speak.",
  ctaLabel: "Talk about your roadmap",
  heroImage: siteImages.strategySession,
  metaTitle: "Work",
  metaDescription:
    "Selected Calicon case studies: custom software and digital products with real constraints and outcomes.",
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
      "Custom CRM around their loan workflow—shipped in 60 days. 23% lower ops cost, 37% higher average sales.",
    result: "23% lower ops cost · 37% higher average sales",
    icon: Building2,
    imageKey: "calicapIndiaCrm",
    metaTitle: "Calicap India · custom CRM",
    metaDescription:
      "Case study: Calicap India Pvt. Ltd.—a custom CRM built around their process in 60 days, cutting operational cost 23% and lifting average sales 37%.",
  },
  {
    slug: "yog-mantram",
    label: "Web · brand · local SEO",
    title: "Yog Mantram",
    excerpt:
      "A cinematic, mobile-first studio site—25+ programs, WhatsApp enquire, and Bareilly pages built to turn seekers into students.",
    result: "25+ program pages · local search · enquire on every class",
    icon: Flower2,
    imageKey: "yogMantramStudio",
    metaTitle: "Yog Mantram — studio website & local SEO",
    metaDescription:
      "Case study: Yog Mantram in Bareilly—a conversion-first website with 25+ programs, WhatsApp enquire, and local search pages that turn seekers into students.",
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
