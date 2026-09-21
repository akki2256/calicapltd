"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { canvasDur, canvasEase } from "@/components/canvas/motion/tokens";

/**
 * Real Canvas motion for inner pages — titles, sections, images, CTAs.
 * Replaces the former pass-through enhancer.
 */
export function CanvasScrollEnhancer({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const headings = root.querySelectorAll<HTMLElement>("h1, h2");
    const images = root.querySelectorAll<HTMLElement>("img, [data-canvas-media]");
    const figures = root.querySelectorAll<HTMLElement>("figure");
    const blocks = root.querySelectorAll<HTMLElement>(
      "article > section, .canvas-pillar > section",
    );

    const mark = (els: NodeListOf<HTMLElement>, cls: string) => {
      els.forEach((el, i) => {
        if (el.hasAttribute("data-canvas-motion")) return;
        if (el.hasAttribute("data-canvas-authored")) return;
        if (el.closest("[data-canvas-motion], [data-canvas-authored]")) return;
        el.setAttribute("data-canvas-motion", cls);
        el.style.setProperty("--cm-delay", `${Math.min(i * 50, 280)}ms`);
      });
    };

    mark(headings, "title");
    mark(images, "media");
    mark(figures, "card");
    mark(blocks, "section");

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-canvas-motion]"));

    const reveal = (el: Element) => {
      el.classList.add("canvas-motion-in");
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { root: null, rootMargin: "0px 0px -4% 0px", threshold: [0, 0.05, 0.15] },
    );

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Already on screen at mount — reveal immediately (avoid stuck clip)
      if (rect.top < vh * 0.92 && rect.bottom > 0) {
        reveal(el);
      } else {
        io.observe(el);
      }
    });

    // Safety: never leave content permanently invisible
    const fallback = window.setTimeout(() => {
      targets.forEach(reveal);
    }, 1800);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [reduced, children]);

  return (
    <motion.div
      ref={rootRef}
      className="canvas-inner-motion"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: canvasDur.base, ease: canvasEase }}
    >
      {children}
    </motion.div>
  );
}
