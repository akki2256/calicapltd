import { SITE_NAME, SOCIAL_DESCRIPTION, pageMetadata } from "@/lib/seo";

/** Home UI is rendered by CanvasMain on `/`. This page only supplies metadata. */
export const metadata = {
  ...pageMetadata({
    title: "Build what's next",
    description:
      "Turn ideas and challenges into digital products, software, and technology that moves things forward. We understand before we build.",
    socialDescription: SOCIAL_DESCRIPTION,
    path: "/",
  }),
  title: {
    absolute: `${SITE_NAME} · Build what's next.`,
  },
};

export default function HomePage() {
  return null;
}
