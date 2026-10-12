"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  canvasDur,
  canvasEase,
  canvasStagger,
  viewportEager,
  viewportOnce,
} from "./tokens";

type Props = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: "div" | "ul" | "ol" | "dl";
  /**
   * Play on mount instead of whileInView.
   * Use for above-the-fold lists where a tall parent would delay intersection.
   */
  immediate?: boolean;
  /** Fire whileInView earlier (dense grids that should not wait mid-scroll). */
  eager?: boolean;
};

/** Parent that staggers child CanvasReveal / motion children */
export function CanvasStagger({
  children,
  className,
  stagger = canvasStagger.base,
  delayChildren = 0.08,
  as = "div",
  immediate = false,
  eager = false,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as];
  const Fallback = as;

  if (reduced) {
    const Tag = Fallback;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" as const }
        : {
            whileInView: "visible" as const,
            viewport: eager ? viewportEager : viewportOnce,
          })}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

type ItemTone = "default" | "soft";

type ItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "dt" | "dd";
  /** soft = opacity + slight rise only (no blur) — prefer on dense grids */
  tone?: ItemTone;
};

const itemVariants = {
  default: {
    hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: canvasDur.base, ease: canvasEase },
    },
  },
  soft: {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: canvasDur.fast, ease: canvasEase },
    },
  },
} as const;

export function CanvasStaggerItem({
  children,
  className,
  as = "div",
  tone = "default",
}: ItemProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as];
  const Fallback = as === "li" ? "li" : as === "dt" ? "dt" : as === "dd" ? "dd" : "div";

  if (reduced) {
    const Tag = Fallback;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={itemVariants[tone]}>
      {children}
    </MotionTag>
  );
}
