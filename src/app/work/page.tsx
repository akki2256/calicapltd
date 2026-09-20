import { WorkIndexView } from "@/components/work-index-view";
import { pageMetadata } from "@/lib/seo";
import { calicapWorkIndex } from "@/lib/calicap-work";

export const metadata = pageMetadata({
  title: calicapWorkIndex.metaTitle,
  description: calicapWorkIndex.metaDescription,
  path: "/work",
});

export default function WorkIndexPage() {
  return <WorkIndexView />;
}
