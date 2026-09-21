import { ContactPageView } from "@/components/contact-page-view";
import { JsonLd } from "@/components/JsonLd";
import { parseContactMode } from "@/lib/calicap-discovery";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us what you're trying to achieve — or start the guided path if you're not sure what you need yet.",
  path: "/contact",
});

type Props = {
  searchParams?: Promise<{ mode?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};
  const initialMode = parseContactMode(params.mode);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactPageView initialMode={initialMode} />
    </>
  );
}
