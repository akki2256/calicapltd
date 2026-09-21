"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { canvasDur, canvasEase, canvasStagger } from "./tokens";

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  animate?: boolean;
  delay?: number;
  as?: "h1" | "h2" | "p";
};

/** Line-level reveal (mount choreography) */
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
};

/** Viewport-triggered line reveal */
export function CanvasTextRevealInView({
  lines,
  className,
  lineClassName,
  as = "h2",
}: ScrollLinesProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
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
    <Tag ref={ref as never} className={className} data-canvas-authored="">
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="block overflow-hidden py-[0.06em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: canvasDur.slow,
              delay: 0.04 + i * canvasStagger.loose,
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
