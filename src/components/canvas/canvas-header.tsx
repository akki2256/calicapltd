"use client";

import Link from "next/link";
import { useCanvasMenu } from "@/components/canvas/canvas-menu-context";

export function CanvasHeader() {
  const { open } = useCanvasMenu();

  return (
    <header
      className={`canvas-header fixed left-0 top-0 z-[700] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "pointer-events-none -translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}
      role="banner"
    >
      <Link
        href="/"
        className="canvas-wordmark group inline-flex items-center gap-3 px-[26px] py-6"
        rel="home"
      >
        <span
          className="block h-px w-5 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-8"
          aria-hidden
        />
        <span className="sr-only">Calicon</span>
        <span
          aria-hidden
          className="font-[family-name:var(--font-display)] text-[13px] font-medium uppercase tracking-[0.36em] text-[var(--color-text-strong)] md:text-[14px]"
        >
          Calicon
        </span>
      </Link>
    </header>
  );
}
