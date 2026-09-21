import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { allSitemapPaths } from "@/lib/structured-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return allSitemapPaths().map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" || path === "/work" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/work/") ? 0.8 : 0.6,
  }));
}
