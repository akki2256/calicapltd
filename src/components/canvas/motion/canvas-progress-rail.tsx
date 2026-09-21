"use client";

import { motion, useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const SECTIONS = [
  { id: "hero", label: "00" },
  { id: "positioning", label: "01" },
  { id: "approach", label: "02" },
  { id: "outcomes", label: "03" },
  { id: "practice", label: "04" },
  { id: "process", label: "05" },
  { id: "work", label: "06" },
] as const;

/** System-style progress instrument — desktop Canvas */
export function CanvasProgressRail() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.35,
  });
  const [pct, setPct] = useState("00");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPct(String(Math.round(v * 100)).padStart(2, "0"));
  });

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-[16%] left-3 top-[16%] z-[400] hidden w-10 lg:block"
      aria-hidden
    >
      <div className="relative h-full w-px bg-[var(--color-border-subtle)]">
        <motion.div
          className="absolute left-0 top-0 w-px origin-top bg-[var(--color-accent)]"
          style={{ scaleY, height: "100%" }}
        />
        {SECTIONS.map((s, i) => (
          <span
            key={s.id}
            className="absolute left-2 font-mono text-[8px] tracking-[0.14em] text-[var(--color-text-muted)]"
            style={{ top: `${(i / (SECTIONS.length - 1)) * 100}%` }}
          >
            {s.label}
          </span>
        ))}
      </div>
      <p className="mt-3 font-mono text-[9px] tracking-[0.18em] text-[var(--color-accent)]">
        {pct}
      </p>
    </div>
  );
}
