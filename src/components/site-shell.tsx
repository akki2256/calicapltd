"use client";

import { CanvasMenuProvider } from "@/components/canvas/canvas-menu-context";
import { CanvasHeader } from "@/components/canvas/canvas-header";
import { CanvasNav } from "@/components/canvas/canvas-nav";
import { CanvasMain } from "@/components/canvas/canvas-main";
import { CanvasFooter } from "@/components/canvas/canvas-footer";
import { CanvasProgressRail, CanvasCursor } from "@/components/canvas/motion";
import { FloatingActions } from "@/components/floating-actions";
import { ContactPathChooserProvider } from "@/components/contact-path-chooser";

type Props = {
  children: React.ReactNode;
};

export function SiteShell({ children }: Props) {
  return (
    <ContactPathChooserProvider>
      <CanvasMenuProvider>
        <CanvasHeader />
        <CanvasNav />
        <CanvasMain>{children}</CanvasMain>
        <CanvasFooter />
        <CanvasProgressRail />
        <CanvasCursor />
      </CanvasMenuProvider>
      <FloatingActions />
    </ContactPathChooserProvider>
  );
}
