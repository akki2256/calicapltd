/**
 * Marketing measurement model — primary outcomes first.
 * Channel metrics are secondary. No dashboard UI until there is data to show.
 *
 * Website analytics (src/lib/analytics.ts) exists to support these outcomes.
 * Review pages when evidence shows a problem. Do not chase traffic volume,
 * time-on-site, or social engagement as success.
 *
 * Nurture philosophy: understand → educate → build confidence → continue
 * the conversation. Never an aggressive automated sales sequence.
 */
export const MEASUREMENT_HIERARCHY = [
  "business_value",
  "qualified_inquiries",
  "conversion_quality",
  "relevant_user_behavior",
  "traffic",
] as const;

export const PRIMARY_GROWTH_METRICS = [
  "qualified_inquiries",
  "qualified_opportunities",
  "conversations",
  "projects_generated",
  "business_results",
] as const;

export const SECONDARY_GROWTH_METRICS = [
  "conversion_behavior",
  "service_interest",
  "case_study_engagement",
  "content_engagement",
  "organic_traffic",
  "search_impressions",
  "referral_activity",
] as const;

export type PrimaryGrowthMetric = (typeof PRIMARY_GROWTH_METRICS)[number];
export type SecondaryGrowthMetric = (typeof SECONDARY_GROWTH_METRICS)[number];

export const GROWTH_CHANNELS = [
  "seo",
  "content",
  "case-study",
  "referral",
  "outbound",
  "partnership",
  "email",
  "direct",
] as const;

export type GrowthChannel = (typeof GROWTH_CHANNELS)[number];

/** How a lead can be understood later — not a public form taxonomy */
export type LeadSegment = {
  inquiryType: "know" | "unsure";
  channel?: GrowthChannel;
  source?: string;
  medium?: string;
  campaign?: string;
  landingPath?: string;
  pillarInterest?: string;
};

type AttributionInput = {
  inquiryType: "know" | "unsure";
  source?: string;
  medium?: string;
  campaign?: string;
  landingPath?: string;
};

function inferChannel(input: AttributionInput): GrowthChannel | undefined {
  const medium = input.medium?.toLowerCase();
  const source = input.source?.toLowerCase();
  if (medium === "email") return "email";
  if (medium === "organic" || medium === "seo") return "seo";
  if (medium === "referral" || source === "referral") return "referral";
  if (source === "partner" || medium === "partner") return "partnership";
  if (medium === "cpc" || medium === "paid" || medium === "outbound") {
    return "outbound";
  }
  if (source === "linkedin" || medium === "social") return "content";
  if (input.landingPath?.startsWith("/work/")) return "case-study";
  if (!input.source && !input.medium && !input.campaign) return "direct";
  return undefined;
}

/** Quiet segmentation for enquiry handling — not a visitor-facing quiz */
export function segmentFromEnquiry(input: AttributionInput): LeadSegment {
  return {
    inquiryType: input.inquiryType,
    source: input.source,
    medium: input.medium,
    campaign: input.campaign,
    landingPath: input.landingPath,
    channel: inferChannel(input),
  };
}
