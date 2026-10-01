"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useMemo, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { canvasDur, canvasEase, canvasStagger } from "./tokens";

type WordRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  emphasize?: string[];
};

/** Word-level entrance for major statements */
export function CanvasWordReveal({
  text,
  className,
  as = "h2",
  delay = 0,
  emphasize = [],
}: WordRevealProps) {
  const reduced = usePrefersReducedMotion();
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const Tag = as;
  const emp = new Set(emphasize.map((w) => w.toLowerCase()));

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={`${className ?? ""} canvas-wrap-heading`}>
      {words.map((word, i) => {
        const hot = emp.has(word.replace(/[^\w']/g, "").toLowerCase());
        return (
          <Fragment key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                className={`inline-block whitespace-nowrap ${hot ? "text-[var(--color-accent)]" : ""}`}
                initial={{ y: "115%", opacity: 0, rotateX: 18 }}
                whileInView={{ y: "0%", opacity: 1, rotateX: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: canvasDur.slow,
                  delay: delay + i * canvasStagger.tight,
                  ease: canvasEase,
                }}
                style={{ transformPerspective: 800 }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </Tag>
  );
}

function ScrubWord({
  word,
  progress,
  start,
  end,
  hot,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  hot: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.22, 1]);
  return (
    <motion.span
      className={`inline-block whitespace-nowrap ${hot ? "text-[var(--color-accent)]" : ""}`}
      style={{ opacity }}
    >
      {word}
    </motion.span>
  );
}

function splitWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

type ScrubProps = {
  /** Single string — words scrub in sequence */
  text?: string;
  /** Explicit line breaks — preferred for display headlines */
  lines?: string[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "p";
  emphasize?: string[];
  id?: string;
};

/**
 * Scroll scrub — words resolve from muted → strong as the headline progresses
 * through the viewport. Default Canvas treatment for section headlines.
 */
export function CanvasTextScrub({
  text,
  lines,
  className,
  lineClassName,
  as = "h2",
  emphasize = [],
  id,
}: ScrubProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const lineList = useMemo(() => {
    if (lines?.length) return lines;
    if (text) return [text];
    return [];
  }, [lines, text]);
  const flatWords = useMemo(
    () => lineList.flatMap((line) => splitWords(line)),
    [lineList],
  );
  const total = Math.max(flatWords.length, 1);
  const emp = new Set(emphasize.map((w) => w.toLowerCase()));
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"],
  });
  const Tag = as;

  if (reduced) {
    return (
      <Tag id={id} className={`${className ?? ""} canvas-wrap-heading`} ref={ref as never}>
        {lineList.map((line) => (
          <span key={line} className={`block ${lineClassName ?? ""}`}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  let wordIndex = 0;

  return (
    <Tag
      id={id}
      className={`${className ?? ""} canvas-wrap-heading`}
      ref={ref as never}
      data-canvas-authored=""
    >
      {lineList.map((line, lineIdx) => {
        const words = splitWords(line);
        return (
          <span key={`${line}-${lineIdx}`} className={`block ${lineClassName ?? ""}`}>
            {words.map((word, i) => {
              const idx = wordIndex++;
              const start = idx / total;
              const end = Math.min(1, (idx + 1.35) / total);
              const hot = emp.has(word.replace(/[^\w']/g, "").toLowerCase());
              return (
                <Fragment key={`${word}-${idx}`}>
                  <ScrubWord
                    word={word}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                    hot={hot}
                  />
                  {i < words.length - 1 ? " " : null}
                </Fragment>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
