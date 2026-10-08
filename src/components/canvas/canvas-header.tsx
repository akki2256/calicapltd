"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useCanvasMenu } from "@/components/canvas/canvas-menu-context";

/** Home hero lockup clearance — tuck only when the index headline rises into the mark. */
const BRAND_CLEARANCE_PX = 112;

export function CanvasHeader() {
  const { open } = useCanvasMenu();
  const pathname = usePathname();
  const [tucked, setTucked] = useState(false);

  useEffect(() => {
    const isHome = pathname === "/";

    const update = () => {
      if (isHome) {
        const hero = document.querySelector<HTMLElement>('[data-canvas-section="hero"]');
        const headline = hero?.querySelector<HTMLElement>(".canvas-home-headline, h1");
        if (headline) {
          setTucked(headline.getBoundingClientRect().top < BRAND_CLEARANCE_PX);
          return;
        }
      }

      // Inner pages: keep the index-scale mark visible at the top; tuck after
      // leaving the first screen so it never stacks on the footer lockup.
      setTucked(window.scrollY > window.innerHeight * 0.55);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const hidden = open || tucked;

  return (
    <header
      className={`canvas-header fixed left-0 top-0 z-[710] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${hidden ? "pointer-events-none -translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}
      role="banner"
      aria-hidden={hidden || undefined}
    >
      <Link
        href="/"
        className="brand-logo-link canvas-brand group inline-flex items-center"
        rel="home"
        aria-label="Calicon home"
        tabIndex={hidden ? -1 : undefined}
      >
        <BrandLogo
          size="lg"
          variant="on-dark"
          layout="lockup"
          priority
          label=""
        />
      </Link>
    </header>
  );
}
