"use client";

import { useTheme } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CanvasMenuProvider } from "@/components/canvas/canvas-menu-context";
import { CanvasHeader } from "@/components/canvas/canvas-header";
import { CanvasNav } from "@/components/canvas/canvas-nav";
import { CanvasMain } from "@/components/canvas/canvas-main";
import { CanvasFooter } from "@/components/canvas/canvas-footer";

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
      </CanvasMenuProvider>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
