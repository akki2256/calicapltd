import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { allSitemapPaths } from "@/lib/structured-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return allSitemapPaths().map((path) => ({
    url: absoluteUrl(path),
    lastModified,
  }));
}
