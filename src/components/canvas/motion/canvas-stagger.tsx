"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { canvasDur, canvasEase, canvasStagger, viewportOnce } from "./tokens";

type Props = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: "div" | "ul" | "ol" | "dl";
};

/** Parent that staggers child CanvasReveal / motion children */
export function CanvasStagger({
  children,
  className,
  stagger = canvasStagger.base,
  delayChildren = 0.08,
  as = "div",
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
      whileInView="visible"
      viewport={viewportOnce}
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

type ItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "dt" | "dd";
};

export function CanvasStaggerItem({ children, className, as = "div" }: ItemProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as];
  const Fallback = as === "li" ? "li" : as === "dt" ? "dt" : as === "dd" ? "dd" : "div";

  if (reduced) {
    const Tag = Fallback;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: canvasDur.base, ease: canvasEase },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
