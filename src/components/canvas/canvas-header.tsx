"use client";

import Link from "next/link";
import { useCanvasMenu } from "@/components/canvas/canvas-menu-context";

export function CanvasHeader() {
  const { open } = useCanvasMenu();

  return (
    <header
      className={`canvas-header fixed left-0 top-0 z-[700] transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${open ? "pointer-events-none translate-y-[-8px] opacity-0" : "translate-y-0 opacity-100"}`}
      role="banner"
    >
      <Link
        href="/"
        className="canvas-wordmark group inline-block px-[26px] py-6 transition-opacity duration-300 hover:opacity-70"
        rel="home"
      >
        <span className="sr-only">Calicon</span>
        <span
          aria-hidden
          className="relative block font-[family-name:var(--font-display)] text-[13px] font-extralight uppercase tracking-[0.48em] text-white md:text-[14px]"
        >
          Calicon
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/40 transition-all duration-500 group-hover:w-full" />
        </span>
      </Link>
    </header>
  );
}
