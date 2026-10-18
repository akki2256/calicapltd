/**
 * Quiet lead segmentation for enquiry handling — not a visitor-facing quiz.
 * Website analytics (src/lib/analytics.ts) exists to support commercial outcomes.
 */

const GROWTH_CHANNELS = [
  "seo",
  "content",
  "case-study",
  "referral",
  "outbound",
  "partnership",
  "email",
  "direct",
] as const;

type GrowthChannel = (typeof GROWTH_CHANNELS)[number];

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
