import { TermsPageView } from "@/components/terms-page-view";
import { JsonLd } from "@/components/JsonLd";
import { calicapTerms } from "@/lib/calicap-terms";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: calicapTerms.metaTitle,
  description: calicapTerms.metaDescription,
  path: calicapTerms.path,
  // Keep noIndex until TERMS_REVIEW_CHECKLIST is cleared and
  // calicapTerms.requiresOwnerReview is set to false.
  noIndex: calicapTerms.requiresOwnerReview,
});

export default function TermsAndConditionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms-and-conditions" },
        ])}
      />
      <TermsPageView />
    </>
  );
}
