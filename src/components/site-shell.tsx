"use client";

import { useTheme } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CanvasMenuProvider } from "@/components/canvas/canvas-menu-context";
import { CanvasHeader } from "@/components/canvas/canvas-header";
import { CanvasNav } from "@/components/canvas/canvas-nav";
import { CanvasMain } from "@/components/canvas/canvas-main";
import { CanvasFooter } from "@/components/canvas/canvas-footer";
import { FloatingActions } from "@/components/floating-actions";

type Props = {
  children: React.ReactNode;
};

export function SiteShell({ children }: Props) {
  const { theme } = useTheme();

  if (theme === "canvas") {
    return (
      <CanvasMenuProvider>
        <CanvasHeader />
        <CanvasNav />
        <CanvasMain>{children}</CanvasMain>
        <CanvasFooter />
        <FloatingActions />
      </CanvasMenuProvider>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}
