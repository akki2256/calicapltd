"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { canvasDur, canvasEase, viewportOnce } from "./tokens";

type Variant = "rise" | "riseSoft" | "clipUp" | "scaleIn" | "slideLeft" | "slideRight" | "blurIn";

const variants: Record<
  Variant,
  { hidden: Record<string, number | string>; visible: Record<string, number | string> }
> = {
  rise: {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 },
  },
  riseSoft: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  },
  clipUp: {
    hidden: { opacity: 0, y: 28, clipPath: "inset(100% 0 0 0)" },
    visible: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  blurIn: {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
};

type Props = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  once?: boolean;
};

/** Viewport-triggered reveal — not a plain fade */
export function CanvasReveal({
  children,
  variant = "rise",
  delay = 0,
  duration = canvasDur.base,
  once = true,
  className,
  ...rest
}: Props) {
  const reduced = usePrefersReducedMotion();
  const v = variants[variant];

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={once ? viewportOnce : { ...viewportOnce, once: false }}
      variants={{
        hidden: v.hidden,
        visible: {
          ...v.visible,
          transition: { duration, delay, ease: canvasEase },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
