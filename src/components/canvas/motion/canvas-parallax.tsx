"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max translate in px */
  distance?: number;
  /** Invert direction */
  invert?: boolean;
};

/** Subtle scroll parallax — desktop only intensity via distance */
export function CanvasParallax({
  children,
  className,
  distance = 48,
  invert = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    invert ? [distance, -distance] : [-distance, distance],
  );
  const y = useSpring(raw, { stiffness: 80, damping: 28, mass: 0.4 });

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
