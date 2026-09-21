"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function WorkViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    track("work_item_viewed", { case_study: slug });
  }, [slug]);
  return null;
}
