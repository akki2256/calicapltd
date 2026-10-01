"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { CanvasTextScrub } from "./canvas-word-reveal";
import { canvasDur, canvasEase, canvasStagger } from "./tokens";

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  animate?: boolean;
  delay?: number;
  as?: "h1" | "h2" | "p";
};

/** Line-level reveal (mount choreography) — use for above-the-fold heroes only */
export function CanvasTextReveal({
  lines,
  className,
  lineClassName,
  animate = true,
  delay = 0,
  as = "h1",
}: Props) {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const Tag = as;

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

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
    <Tag className={className} data-canvas-authored="">
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "100%", opacity: 0 }}
            animate={ready ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
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
  emphasize?: string[];
  id?: string;
};

/**
 * Canvas headline rule — scroll-scrub highlight (muted → strong).
 * Prefer this for section headlines across the Canvas theme.
 */
export function CanvasTextRevealInView({
  lines,
  className,
  lineClassName,
  as = "h2",
  emphasize,
  id,
}: ScrollLinesProps) {
  return (
    <CanvasTextScrub
      lines={lines}
      className={className}
      lineClassName={lineClassName}
      as={as}
      emphasize={emphasize}
      id={id}
    />
  );
}
