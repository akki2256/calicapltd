import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const paths = [
    "/",
    "/services",
    "/services/web-app-development",
    "/services/mobile-app-development",
    "/work",
    "/work/calicap-india",
    "/work/retail-growth",
    "/work/saas-launch",
    "/about",
    "/contact",
    "/privacy",
  ];

  return paths.map((path) => ({
    url: path === "/" ? base : `${base}${path}`,
    lastModified: new Date(),
  }));
}
