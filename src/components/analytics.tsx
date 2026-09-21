"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { captureAttributionFromWindow } from "@/lib/attribution";
import {
  getGaMeasurementId,
  initGtag,
  outboundTypeFromHref,
  track,
  trackPageView,
} from "@/lib/analytics";

/** Captures campaign params; loads GA only when a measurement ID is set and DNT is off. */
export function Analytics() {
  const pathname = usePathname();
  const gaId = getGaMeasurementId();
  const [loadGa, setLoadGa] = useState(false);

  useEffect(() => {
    captureAttributionFromWindow();
    if (gaId && navigator.doNotTrack !== "1") {
      setLoadGa(true);
    }
  }, [gaId]);

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const outboundType = outboundTypeFromHref(href);
      if (!outboundType) return;
      track("outbound_clicked", { outbound_type: outboundType });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!loadGa || !gaId) return null;

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      strategy="afterInteractive"
      onLoad={() => initGtag(gaId)}
    />
  );
}
