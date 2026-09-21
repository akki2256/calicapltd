import { WorkIndexView } from "@/components/work-index-view";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { calicapWorkIndex } from "@/lib/calicap-work";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: calicapWorkIndex.metaTitle,
  description: calicapWorkIndex.metaDescription,
  path: "/work",
});

export default function WorkIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <WorkIndexView />
    </>
  );
}
