"use client";

import type { ReactNode } from "react";

/**
 * Legacy IO fade enhancer — homepage now uses Motion primitives.
 * Kept as a pass-through wrapper for non-home Canvas pages that
 * gradually adopt CanvasReveal themselves.
 */
export function CanvasScrollEnhancer({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
