"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useCanvasMenu } from "@/components/canvas/canvas-menu-context";

export function CanvasHeader() {
  const { open } = useCanvasMenu();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [tucked, setTucked] = useState(false);
  /** Larger home lockup needs a taller clear band before it tucks away. */
  const brandClearancePx = isHome ? 112 : 88;

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('[data-canvas-section="hero"]');
    const headline =
      hero?.querySelector<HTMLElement>(".canvas-home-headline, h1") ??
      document.querySelector<HTMLElement>(".canvas-main-inner h1");

    const update = () => {
      if (headline) {
        const top = headline.getBoundingClientRect().top;
        setTucked(top < brandClearancePx);
        return;
      }

      // Inner pages without a measured headline: hide after leaving the first screen
      // so the fixed mark never stacks on the footer lockup.
      setTucked(window.scrollY > window.innerHeight * 0.55);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname, brandClearancePx]);

  const hidden = open || tucked;

  return (
    <header
      className={`canvas-header fixed left-0 top-0 z-[710] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${hidden ? "pointer-events-none -translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}
      role="banner"
      aria-hidden={hidden || undefined}
    >
      <Link
        href="/"
        className={`brand-logo-link canvas-brand group inline-flex items-center${isHome ? " canvas-brand--home" : ""}`}
        rel="home"
        aria-label="Calicon home"
        tabIndex={hidden ? -1 : undefined}
      >
        <BrandLogo
          size={isHome ? "lg" : "header"}
          variant="on-dark"
          layout="lockup"
          priority
          label=""
        />
      </Link>
    </header>
  );
}
