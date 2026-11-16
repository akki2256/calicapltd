"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CanvasLegalField = dynamic(
  () =>
    import("@/components/canvas/canvas-legal-field").then((m) => m.CanvasLegalField),
  { ssr: false },
);

/**
 * Shared fixed full-viewport backdrop for legal/governance pages
 * (Terms & Conditions, Privacy Policy).
 */
export function CanvasLegalBackdrop() {
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  if (!portalReady) return null;

  return createPortal(
    <div className="canvas-legal__backdrop" aria-hidden>
      <div className="canvas-legal-field">
        <CanvasLegalField />
      </div>
    </div>,
    document.body,
  );
}
