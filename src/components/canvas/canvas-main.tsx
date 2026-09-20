"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCanvasMenu } from "@/components/canvas/canvas-menu-context";
import { CanvasHome } from "@/components/canvas/canvas-home";
import { CanvasHomeChapter } from "@/components/canvas/canvas-home-chapter";
import { CanvasScrollEnhancer } from "@/components/canvas/canvas-scroll-enhancer";

type Props = {
  children: React.ReactNode;
};

export function CanvasMain({ children }: Props) {
  const pathname = usePathname();
  const { open, closeMenu } = useCanvasMenu();
  const mainRef = useRef<HTMLElement>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    document.documentElement.classList.remove("canvas-out");
  }, [pathname]);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || !main.contains(anchor)) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      if (anchor.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === pathname) return;

      event.preventDefault();
      document.documentElement.classList.add("canvas-out");
      window.setTimeout(() => {
        window.location.assign(url.pathname + url.search + url.hash);
      }, 320);
    };

    main.addEventListener("click", handleClick);
    return () => main.removeEventListener("click", handleClick);
  }, [pathname]);

  return (
    <main
      ref={mainRef}
      id="canvas-main"
      className={`canvas-main site-main ${isHome ? "canvas-main-home" : "canvas-main-inner"} ${open ? "canvas-main-menu-open" : ""}`}
    >
      <div key={pathname} className="canvas-page">
        {isHome ? (
          <>
            <CanvasHome />
            <div className="canvas-home-chapter">
              <CanvasHomeChapter />
            </div>
            {/* Shared homepage markup stays in the tree for Calicon; hidden here */}
            <div className="hidden" aria-hidden>
              {children}
            </div>
          </>
        ) : (
          <div className="canvas-inner-content">
            <CanvasScrollEnhancer>{children}</CanvasScrollEnhancer>
          </div>
        )}
      </div>
    </main>
  );
}
