"use client";

import { useTheme } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CaliconScrollEnhancer } from "@/components/calicon/calicon-scroll-enhancer";
import { CanvasMenuProvider } from "@/components/canvas/canvas-menu-context";
import { CanvasHeader } from "@/components/canvas/canvas-header";
import { CanvasNav } from "@/components/canvas/canvas-nav";
import { CanvasMain } from "@/components/canvas/canvas-main";
import { CanvasFooter } from "@/components/canvas/canvas-footer";
import { CanvasScrollProgress } from "@/components/canvas/motion";
import { FloatingActions } from "@/components/floating-actions";
import { ContactPathChooserProvider } from "@/components/contact-path-chooser";

type Props = {
  children: React.ReactNode;
};

export function SiteShell({ children }: Props) {
  const { theme } = useTheme();

  const chrome =
    theme === "canvas" ? (
      <CanvasMenuProvider>
        <CanvasHeader />
        <CanvasNav />
        <CanvasMain>{children}</CanvasMain>
        <CanvasFooter />
        <CanvasScrollProgress />
        <FloatingActions />
      </CanvasMenuProvider>
    ) : (
      <>
        <SiteHeader />
        <main className="min-w-0 flex-1 overflow-x-clip">
          <CaliconScrollEnhancer>{children}</CaliconScrollEnhancer>
        </main>
        <SiteFooter />
        <FloatingActions />
      </>
    );

  return <ContactPathChooserProvider>{chrome}</ContactPathChooserProvider>;
}
