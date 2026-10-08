"use client";

import { motion } from "motion/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import {
  isCanvasEmphasized,
  resolveCanvasEmphasize,
} from "@/lib/canvas-dual-color";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { CanvasTextScrub } from "./canvas-word-reveal";
import { canvasDur, canvasEase, canvasStagger } from "./tokens";

function splitWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  animate?: boolean;
  delay?: number;
  as?: "h1" | "h2" | "p";
  /** Accent words. Omit for auto dual-color; pass `[]` to disable. */
  emphasize?: string[];
};

/** Line-level reveal (mount choreography) — use for above-the-fold heroes only */
export function CanvasTextReveal({
  lines,
  className,
  lineClassName,
  animate = true,
  delay = 0,
  as = "h1",
  emphasize,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const Tag = as;
  const flatWords = useMemo(
    () => lines.flatMap((line) => splitWords(line)),
    [lines],
  );
  const emp = useMemo(
    () => resolveCanvasEmphasize(flatWords, emphasize),
    [flatWords, emphasize],
  );

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const renderLine = (line: string) => {
    const words = splitWords(line);
    return words.map((word, i) => (
      <Fragment key={`${word}-${i}`}>
        <span className={isCanvasEmphasized(word, emp) ? "canvas-em" : undefined}>
          {word}
        </span>
        {i < words.length - 1 ? " " : null}
      </Fragment>
    ));
  };

  if (reduced || !animate) {
    return (
      <Tag className={`${className ?? ""} canvas-text-safe`}>
        {lines.map((line) => (
          <span key={line} className={`block ${lineClassName ?? ""}`}>
            {renderLine(line)}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={`${className ?? ""} canvas-text-safe`} data-canvas-authored="">
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="canvas-text-line-mask">
          <motion.span
            className={`block max-w-full ${lineClassName ?? ""}`}
            initial={{ y: "100%", opacity: 0 }}
            animate={ready ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: canvasDur.slow,
              delay: delay + i * canvasStagger.loose,
              ease: canvasEase,
            }}
          >
            {renderLine(line)}
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
