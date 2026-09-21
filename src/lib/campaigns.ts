/**
 * Campaign landing catalog.
 *
 * Campaign pages reuse the existing design system, CTAs, and enquiry paths.
 * Do not invent landings. Keep this empty until a real campaign exists.
 */
import type { PillarId } from "@/lib/brand-architecture";

export type CampaignLanding = {
  slug: string;
  title: string;
  summary: string;
  path: string;
  pillarIds: readonly PillarId[];
  serviceIds: readonly string[];
  relatedWorkSlugs: readonly string[];
  cta: "problem" | "contact";
  seoTitle: string;
  seoDescription: string;
  status: "draft" | "published";
};

export const CAMPAIGN_LANDINGS: readonly CampaignLanding[] = [];

export function getPublishedCampaigns() {
  return CAMPAIGN_LANDINGS.filter((item) => item.status === "published");
}

export function getCampaignBySlug(slug: string) {
  return CAMPAIGN_LANDINGS.find((item) => item.slug === slug);
}
