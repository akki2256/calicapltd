import { absoluteUrl, SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION } from "@/lib/seo";
import { PILLAR_PATHS, SERVICE_PAGE_PATHS } from "@/lib/brand-architecture";
import { calicapContact } from "@/lib/calicap-contact";
import { getPublishedCampaigns } from "@/lib/campaigns";
import { getPublishedContentPaths } from "@/lib/content";
import { getWorkStudySlugs } from "@/lib/calicap-work";

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/brand/calicon-logo.png"),
    description: DEFAULT_DESCRIPTION,
    ...(calicapContact.email ? { email: calicapContact.email } : {}),
  };
}

export function localBusinessJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    ...(calicapContact.email ? { email: calicapContact.email } : {}),
    areaServed: "Worldwide",
    priceRange: "$$",
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function creativeWorkJsonLd(input: {
  name: string;
  description: string;
  path: string;
  imagePath?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    ...(input.imagePath
      ? {
          image: input.imagePath.startsWith("http")
            ? input.imagePath
            : absoluteUrl(input.imagePath),
        }
      : {}),
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

/** Static marketing paths included in the sitemap (plus dynamic work slugs). */
export const STATIC_SITEMAP_PATHS = [
  "/",
  ...PILLAR_PATHS,
  ...SERVICE_PAGE_PATHS,
  "/work",
  "/about",
  "/contact",
  "/privacy",
] as const;

export function allSitemapPaths(): string[] {
  const workPaths = getWorkStudySlugs().map((slug) => `/work/${slug}`);
  const contentPaths = getPublishedContentPaths();
  const campaignPaths = getPublishedCampaigns().map((item) => item.path);
  return [
    ...new Set([
      ...STATIC_SITEMAP_PATHS,
      ...workPaths,
      ...contentPaths,
      ...campaignPaths,
    ]),
  ];
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: "Worldwide",
  };
}
