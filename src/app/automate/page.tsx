import { PillarPageView } from "@/components/pillar-page-view";
import { getPillarPage } from "@/lib/calicap-services";
import { pageMetadata } from "@/lib/seo";

const page = getPillarPage("automate")!;

export const metadata = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: page.path,
});

export default function AutomatePage() {
  return <PillarPageView pillarId="automate" />;
}
