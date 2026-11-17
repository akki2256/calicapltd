import { CalicapIndiaCaseView } from "@/components/work/calicap-india-case-view";
import { JsonLd } from "@/components/JsonLd";
import { getWorkStudyBySlug, getWorkStudyImage } from "@/lib/calicap-work";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, creativeWorkJsonLd } from "@/lib/structured-data";

const study = getWorkStudyBySlug("calicap-india")!;
const studyImage = getWorkStudyImage(study);

export const metadata = pageMetadata({
  title: study.metaTitle,
  description: study.metaDescription,
  path: `/work/${study.slug}`,
  imagePath: studyImage.src,
  ogType: "article",
});

export default function CalicapIndiaCasePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: study.title, path: `/work/${study.slug}` },
          ]),
          creativeWorkJsonLd({
            name: study.title,
            description: study.metaDescription,
            path: `/work/${study.slug}`,
            imagePath: studyImage.src,
          }),
        ]}
      />
      <CalicapIndiaCaseView />
    </>
  );
}
