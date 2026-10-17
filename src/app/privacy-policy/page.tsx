import { PrivacyPolicyPageView } from "@/components/privacy-policy-page-view";
import { JsonLd } from "@/components/JsonLd";
import { calicapPrivacyPolicy } from "@/lib/calicap-privacy-policy";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: calicapPrivacyPolicy.metaTitle,
  description: calicapPrivacyPolicy.metaDescription,
  path: calicapPrivacyPolicy.path,
  // Keep noIndex until PRIVACY_POLICY_REVIEW_CHECKLIST is cleared and
  // calicapPrivacyPolicy.requiresOwnerReview is set to false.
  noIndex: calicapPrivacyPolicy.requiresOwnerReview,
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <PrivacyPolicyPageView />
    </>
  );
}
