"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useCanvasMenu } from "@/components/canvas/canvas-menu-context";

/** Fallback when the lockup has not painted yet. */
const BRAND_CLEARANCE_FALLBACK_PX = 112;
/** Breathing room below the lockup before a headline may enter. */
const BRAND_CLEARANCE_GAP_PX = 28;

function findPageHeadline(): HTMLElement | null {
  const home = document.querySelector<HTMLElement>(
    '[data-canvas-section="hero"] .canvas-home-headline, [data-canvas-section="hero"] h1',
  );
  if (home) return home;
  return document.querySelector<HTMLElement>("#canvas-main h1");
}

function brandClearancePx(): number {
  const brand = document.querySelector<HTMLElement>(".canvas-header .canvas-brand");
  if (!brand) return BRAND_CLEARANCE_FALLBACK_PX;
  return brand.getBoundingClientRect().bottom + BRAND_CLEARANCE_GAP_PX;
}

export function CanvasHeader() {
  const { open } = useCanvasMenu();
  const pathname = usePathname();
  const [tucked, setTucked] = useState(false);

  useLayoutEffect(() => {
    const update = () => {
      const headline = findPageHeadline();
      const pastMidPage = window.scrollY > window.innerHeight * 0.55;

      if (headline) {
        // Hide while the headline occupies the lockup band, and stay hidden
        // deeper on the page so the mark never stacks on the footer lockup.
        setTucked(headline.getBoundingClientRect().top < brandClearancePx() || pastMidPage);
        return;
      }

      setTucked(pastMidPage);
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
          priority
          label=""
        />
      </Link>
    </header>
  );
}
