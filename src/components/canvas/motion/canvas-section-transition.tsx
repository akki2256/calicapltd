"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { canvasDur, canvasEase } from "./tokens";

type Props = {
  children: ReactNode;
  className?: string;
  /** Entrance style */
  variant?: "clipUp" | "clipLeft" | "scaleBlur" | "riseDepth" | "wipeRight" | "blurIn";
};

const initialMap = {
  clipUp: { opacity: 0, y: 64, clipPath: "inset(100% 0 0 0)" },
  clipLeft: { opacity: 0, x: 48, clipPath: "inset(0 100% 0 0)" },
  scaleBlur: { opacity: 0, scale: 0.92, filter: "blur(10px)" },
  riseDepth: { opacity: 0, y: 80, rotateX: 8 },
  wipeRight: { opacity: 0, clipPath: "inset(0 0 0 100%)" },
  blurIn: { opacity: 0, y: 24, filter: "blur(8px)" },
} as const;

const animateMap = {
  clipUp: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" },
  clipLeft: { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" },
  scaleBlur: { opacity: 1, scale: 1, filter: "blur(0px)" },
  riseDepth: { opacity: 1, y: 0, rotateX: 0 },
  wipeRight: { opacity: 1, clipPath: "inset(0 0 0 0%)" },
  blurIn: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const;

/** Section entrance — cinematic, not a plain fade */
export function CanvasSectionTransition({
  children,
  className,
  variant = "clipUp",
}: Props) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={initialMap[variant]}
      whileInView={animateMap[variant]}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -6% 0px" }}
      transition={{ duration: canvasDur.slow, ease: canvasEase }}
      style={variant === "riseDepth" ? { transformPerspective: 1100 } : undefined}
    >
      {children}
    </motion.div>
  );
}
