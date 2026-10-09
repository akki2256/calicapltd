import { ComingSoonPageView } from "@/components/coming-soon-page-view";
import { comingSoonMeta } from "@/lib/coming-soon-pages";
import { pageMetadata } from "@/lib/seo";

const page = { href: "/terms", label: "Terms & Conditions" } as const;

export const metadata = pageMetadata(comingSoonMeta(page));

export default function TermsPage() {
  return <ComingSoonPageView title={page.label} />;
}
