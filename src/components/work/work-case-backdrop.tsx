"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CanvasCaseField = dynamic(
  () =>
    import("@/components/canvas/canvas-case-field").then((m) => m.CanvasCaseField),
  { ssr: false },
);

/**
 * Shared fixed full-viewport backdrop for every case study detail page (/work/*),
 * excluded on the /work index page.
 */
export function WorkCaseBackdrop() {
  const pathname = usePathname();
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const isCaseDetail =
    typeof pathname === "string" &&
    pathname.startsWith("/work/") &&
    pathname !== "/work/";

  if (!portalReady || !isCaseDetail) return null;

  return createPortal(
    <div className="canvas-case__backdrop" aria-hidden>
      <div className="canvas-case-field">
        <CanvasCaseField />
      </div>
    </div>,
    document.body,
  );
}
