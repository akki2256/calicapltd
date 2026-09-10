import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const paths = [
    "/",
    "/services",
    "/services/web-app-development",
    "/services/mobile-app-development",
    "/work",
<<<<<<< HEAD
=======
    "/work/calicap-india",
>>>>>>> 4c896421623002b20fad236becc872417032659e
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
