import { JsonLd } from "@/components/JsonLd";
import { ServicesIndexView } from "@/components/services-index-view";
import { calicapServicesOverview } from "@/lib/calicap-services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: calicapServicesOverview.metaTitle,
  description: calicapServicesOverview.metaDescription,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          serviceJsonLd({
            name: calicapServicesOverview.metaTitle,
            description: calicapServicesOverview.metaDescription,
            path: "/services",
          }),
        ]}
      />
      <ServicesIndexView />
    </>
  );
}
