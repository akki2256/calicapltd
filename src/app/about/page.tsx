import { AboutPageView } from "@/components/about-page-view";
import { JsonLd } from "@/components/JsonLd";
import { calicapAbout } from "@/lib/calicap-about";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: calicapAbout.metaTitle,
  description: calicapAbout.metaDescription,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <AboutPageView />
    </>
  );
}
