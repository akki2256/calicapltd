"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useCanvasMenu } from "@/components/canvas/canvas-menu-context";

export function CanvasHeader() {
  const { open } = useCanvasMenu();
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('[data-canvas-section="hero"]');

    if (hero) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setPastHero(!entry.isIntersecting);
        },
        { threshold: 0, rootMargin: "0px 0px -12% 0px" },
      );
      observer.observe(hero);
      return () => observer.disconnect();
    }

    // Inner pages: tuck the fixed mark away once past the first screen
    // so it never stacks on the footer lockup.
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.55);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const hidden = open || pastHero;

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
        <BrandLogo size="header" variant="on-dark" layout="lockup" priority label="" />
      </Link>
    </header>
  );
}
