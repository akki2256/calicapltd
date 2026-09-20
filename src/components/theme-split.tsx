"use client";

import { useTheme } from "@/components/theme-provider";
import type { ReactNode } from "react";

/** Renders Canvas or Calicon presentation without damaging either theme */
export function ThemeSplit({
  canvas,
  calicon,
}: {
  canvas: ReactNode;
  calicon: ReactNode;
}) {
  const { theme } = useTheme();
  return theme === "canvas" ? <>{canvas}</> : <>{calicon}</>;
}
