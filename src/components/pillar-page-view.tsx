"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CanvasPillarView } from "@/components/canvas/canvas-pillar-view";
import { JsonLd } from "@/components/JsonLd";
import { getPillarPage } from "@/lib/calicap-services";
import { getPillar, type PillarId } from "@/lib/brand-architecture";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";

type Props = {
  pillarId: PillarId;
  /** Denser chrome for constrained surfaces (circuit detail panel) */
  embedded?: boolean;
};

/** Canvas no longer ships standalone pillar pages — send visitors to Services. */
function CanvasPillarPageRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/services");
  }, [router]);
  return null;
}

export function PillarPageView({ pillarId }: Props) {
  const page = getPillarPage(pillarId);
  const pillar = getPillar(pillarId);

  return (
    <>
      {page ? (
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: pillar.label, path: page.path },
            ]),
            serviceJsonLd({
              name: page.title,
              description: page.metaDescription,
              path: page.path,
            }),
          ]}
        />
      ) : null}
      <CanvasPillarPageRedirect />
    </>
  );
}

/** Pillar body for the outcomes circuit detail panel */
export function PillarEmbeddedView({
  pillarId,
  embedded = true,
}: Props) {
  return <CanvasPillarView pillarId={pillarId} embedded={embedded} />;
}
