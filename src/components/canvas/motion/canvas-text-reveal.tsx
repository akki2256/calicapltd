"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { canvasDur, canvasEase, canvasStagger } from "./tokens";

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  /** Use for hero load choreography instead of whileInView */
  animate?: boolean;
  delay?: number;
  as?: "h1" | "h2" | "p";
};

/** Line-level clip + translate reveal */
export function CanvasTextReveal({
  lines,
  className,
  lineClassName,
  animate = true,
  delay = 0,
  as = "h1",
}: Props) {
  const reduced = usePrefersReducedMotion();
  const Tag = as;

  if (reduced || !animate) {
    return (
      <Tag className={className}>
        {lines.map((line) => (
          <span key={line} className={`block ${lineClassName ?? ""}`}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: canvasDur.slow,
              delay: delay + i * canvasStagger.loose,
              ease: canvasEase,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

type ScrollLinesProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "p";
};

/** Viewport-triggered line reveal — each line timed independently */
export function CanvasTextRevealInView({
  lines,
  className,
  lineClassName,
  as = "h2",
}: ScrollLinesProps) {
  const reduced = usePrefersReducedMotion();
  const Tag = as;

  if (reduced) {
    return (
      <Tag className={className}>
        {lines.map((line) => (
          <span key={line} className={`block ${lineClassName ?? ""}`}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="block overflow-hidden py-[0.06em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "108%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: canvasDur.slow,
              delay: 0.06 + i * canvasStagger.loose,
              ease: canvasEase,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
