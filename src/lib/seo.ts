import type { Metadata } from "next";
import { CALICON_SITE_NAME } from "@/lib/calicap-contact";

const fallbackSiteUrl = "http://localhost:3000";

export const SITE_NAME = CALICON_SITE_NAME;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl
).replace(/\/$/, "");

export const DEFAULT_DESCRIPTION =
  "Turn ideas and challenges into digital products, software, and technology that moves things forward. We understand before we build.";

export const DEFAULT_KEYWORDS = [
  "Calicon",
  "custom software",
  "digital products",
  "digital transformation",
  "workflow automation",
  "application development",
] as const;

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  noIndex?: boolean;
  ogType?: "website" | "article";
};

export function pageMetadata({
  title,
  description,
  path,
  imagePath,
  noIndex,
  ogType = "website",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : absoluteUrl(imagePath)
    : absoluteUrl("/opengraph-image");

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: ogType,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · Build what's next.`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [...DEFAULT_KEYWORDS],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    title: `${SITE_NAME} · Build what's next.`,
    description: DEFAULT_DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [{ url: absoluteUrl("/opengraph-image") }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · Build what's next.`,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl("/opengraph-image")],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};
