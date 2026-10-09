import { ComingSoonPageView } from "@/components/coming-soon-page-view";
import { comingSoonMeta } from "@/lib/coming-soon-pages";
import { pageMetadata } from "@/lib/seo";

const page = { href: "/privacy-policy", label: "Privacy Policy" } as const;

export const metadata = pageMetadata(comingSoonMeta(page));

export default function PrivacyPolicyPage() {
  return <ComingSoonPageView title={page.label} />;
}
