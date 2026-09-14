import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} · Build what's next.`,
    short_name: SITE_NAME,
    description:
      "Turn business ideas and challenges into digital products, custom software, and AI — then stay after launch.",
    start_url: "/",
    display: "standalone",
    background_color: "#141414",
    theme_color: "#141414",
    id: SITE_URL,
  };
}
