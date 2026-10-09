import { ComingSoonPageView } from "@/components/coming-soon-page-view";
import { comingSoonMeta } from "@/lib/coming-soon-pages";
import { pageMetadata } from "@/lib/seo";

const page = { href: "/online-safety", label: "Online Safety" } as const;

export const metadata = pageMetadata(comingSoonMeta(page));

export default function OnlineSafetyPage() {
  return <ComingSoonPageView title={page.label} />;
}
