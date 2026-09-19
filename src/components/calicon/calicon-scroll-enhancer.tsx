"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Soft section fades for Calicon — restrained, premium */
export function CaliconScrollEnhancer({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const targets = root.querySelectorAll<HTMLElement>("section");
    targets.forEach((el) => {
      el.classList.add("calicon-reveal");
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("calicon-reveal-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.06 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  return <div ref={rootRef}>{children}</div>;
}
