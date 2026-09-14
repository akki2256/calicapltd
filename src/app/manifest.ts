import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} · Websites & digital growth`,
    short_name: SITE_NAME,
    description:
      "Web and mobile delivery with React, Node.js, Spring, AI, and cloud on AWS or Azure—plus growth marketing.",
    start_url: "/",
    display: "standalone",
    background_color: "#141414",
    theme_color: "#141414",
    id: SITE_URL,
  };
}
