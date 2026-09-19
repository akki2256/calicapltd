import { PillarPageView } from "@/components/pillar-page-view";
import { getPillarPage } from "@/lib/calicap-services";
import { pageMetadata } from "@/lib/seo";

const page = getPillarPage("evolve")!;

export const metadata = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: page.path,
});

export default function EvolvePage() {
  return <PillarPageView pillarId="evolve" />;
}
