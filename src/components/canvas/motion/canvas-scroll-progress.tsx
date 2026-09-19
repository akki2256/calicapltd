"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Thin vertical progress rail — Canvas only, subtle */
export function CanvasScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.35,
  });

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-[18%] left-3 top-[18%] z-[520] hidden w-px bg-[var(--color-border-subtle)] md:block"
      aria-hidden
    >
      <motion.div
        className="origin-top w-px bg-[var(--color-accent)]"
        style={{ scaleY, height: "100%" }}
      />
    </div>
  );
}
