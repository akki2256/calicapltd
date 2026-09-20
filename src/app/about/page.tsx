import { AboutPageView } from "@/components/about-page-view";
import { calicapAbout } from "@/lib/calicap-about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: calicapAbout.metaTitle,
  description: calicapAbout.metaDescription,
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageView />;
}
