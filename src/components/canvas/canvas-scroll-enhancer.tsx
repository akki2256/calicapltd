"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Applies scroll reveals to section / card blocks inside Canvas pages
 * without forking shared page markup.
 */
export function CanvasScrollEnhancer({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const targets = root.querySelectorAll<HTMLElement>(
      "section, article, .surface-card, .home-band",
    );

    targets.forEach((el, i) => {
      if (el.closest(".canvas-home")) return;
      el.classList.add("scroll-reveal");
      el.style.setProperty("--reveal-delay", `${Math.min(i % 5, 4) * 60}ms`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-reveal-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => {
      if (!el.classList.contains("canvas-home") && !el.closest(".canvas-home")) {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, [reduced]);

  return (
    <div ref={rootRef} className="canvas-scroll-root">
      {children}
    </div>
  );
}
