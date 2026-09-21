"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { useCanvasMenu } from "@/components/canvas/canvas-menu-context";

export function CanvasHeader() {
  const { open } = useCanvasMenu();

  return (
    <header
      className={`canvas-header fixed left-0 top-0 z-[710] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "pointer-events-none -translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}
      role="banner"
    >
      <Link
        href="/"
        className="brand-logo-link canvas-brand group inline-flex items-center"
        rel="home"
        aria-label="Calicon home"
      >
        <BrandLogo size="header" variant="on-dark" layout="lockup" priority label="" />
      </Link>
    </header>
  );
}
