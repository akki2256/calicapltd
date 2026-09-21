/**
 * Growth content catalog.
 *
 * Case studies are the primary published format (via /work).
 * Insights, technical notes, and perspective pieces can be added here
 * when they exist — do not invent filler. No Blog nav item.
 */
import {
  getPillar,
  type PillarId,
} from "@/lib/brand-architecture";
import {
  calicapWorkStudies,
  getWorkStudiesForService,
  getWorkStudyImage,
  type CalicapWorkStudy,
} from "@/lib/calicap-work";

export const CONTENT_TYPES = [
  "case-study",
  "insight",
  "technical",
  "transformation",
  "perspective",
] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];

export const CONTENT_AUDIENCES = [
  "business-owner",
  "operator",
  "technical",
] as const;

export type ContentAudience = (typeof CONTENT_AUDIENCES)[number];

export type ContentStatus = "draft" | "published";

export type ContentEntry = {
  slug: string;
  title: string;
  summary: string;
  type: ContentType;
  status: ContentStatus;
  audiences: readonly ContentAudience[];
  pillarIds: readonly PillarId[];
  serviceIds: readonly string[];
  outcomeIds: readonly string[];
  industryIds?: readonly string[];
  relatedWorkSlugs: readonly string[];
  relatedContentSlugs?: readonly string[];
  publishedAt?: string;
  author?: string;
  tags?: readonly string[];
  seoTitle: string;
  seoDescription: string;
  path: string;
  canonicalPath?: string;
};

function studyToCaseStudy(study: CalicapWorkStudy): ContentEntry {
  return {
    slug: study.slug,
    title: study.title,
    summary: study.excerpt,
    type: "case-study",
    status: "published",
    audiences: ["business-owner", "operator"],
    pillarIds: study.pillars,
    serviceIds: study.serviceIds,
    outcomeIds: study.outcomeIds ?? [],
    industryIds: study.industryIds,
    relatedWorkSlugs: [study.slug],
    publishedAt: undefined,
    author: "Calicon",
    tags: [study.label],
    seoTitle: study.metaTitle,
    seoDescription: study.metaDescription,
    path: `/work/${study.slug}`,
  };
}

/** Published case studies — derived from real Work, never invented */
export const CASE_STUDY_CONTENT: readonly ContentEntry[] =
  calicapWorkStudies.map(studyToCaseStudy);

/**
 * Insights / technical / perspective pieces.
 * Keep empty until a real article exists. Do not publish placeholders.
 */
export const EDITORIAL_CONTENT: readonly ContentEntry[] = [];

export const ALL_CONTENT: readonly ContentEntry[] = [
  ...CASE_STUDY_CONTENT,
  ...EDITORIAL_CONTENT,
];

export function getPublishedContent(type?: ContentType) {
  return ALL_CONTENT.filter(
    (entry) => entry.status === "published" && (!type || entry.type === type),
  );
}

export function getContentBySlug(slug: string) {
  return ALL_CONTENT.find((entry) => entry.slug === slug);
}

export function getContentForPillar(pillar: PillarId, type?: ContentType) {
  return getPublishedContent(type).filter((entry) =>
    entry.pillarIds.includes(pillar),
  );
}

export function getContentForService(serviceId: string) {
  return getPublishedContent().filter((entry) =>
    entry.serviceIds.includes(serviceId),
  );
}

export function getRelatedWorkForContent(entry: ContentEntry): CalicapWorkStudy[] {
  const slugs = new Set(entry.relatedWorkSlugs);
  return calicapWorkStudies.filter((study) => slugs.has(study.slug));
}

export function getRelatedWorkForService(serviceId: string): CalicapWorkStudy[] {
  return getWorkStudiesForService(serviceId);
}

export function getPublishedContentPaths() {
  return getPublishedContent().map((entry) => entry.canonicalPath ?? entry.path);
}

export { getPillar, getWorkStudyImage };
