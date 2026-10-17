import { FaqPageView } from "@/components/faq-page-view";
import { JsonLd } from "@/components/JsonLd";
import { calicapFaqs, FAQ_ITEMS } from "@/lib/calicap-faqs";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: calicapFaqs.metaTitle,
  description: calicapFaqs.metaDescription,
  path: calicapFaqs.path,
});

export default function FaqsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "FAQs", path: "/faqs" },
          ]),
          faqPageJsonLd(
            FAQ_ITEMS.map((item) => ({
              question: item.question,
              answer: item.answer,
            })),
          ),
        ]}
      />
      <FaqPageView />
    </>
  );
}
