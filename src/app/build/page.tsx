import { PillarPageView } from "@/components/pillar-page-view";
import { getPillarPage } from "@/lib/calicap-services";
import { pageMetadata } from "@/lib/seo";

const page = getPillarPage("build")!;

export const metadata = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: page.path,
});

export default function BuildPage() {
  return <PillarPageView pillarId="build" />;
}
