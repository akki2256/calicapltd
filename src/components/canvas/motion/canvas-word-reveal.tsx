"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useMemo, useRef } from "react";
import {
  isCanvasEmphasized,
  resolveCanvasEmphasize,
} from "@/lib/canvas-dual-color";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { canvasDur, canvasEase, canvasStagger } from "./tokens";

type WordRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  /** Accent words. Omit for auto dual-color; pass `[]` to disable. */
  emphasize?: string[];
};

function splitWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

function DualWord({ word, hot }: { word: string; hot: boolean }) {
  return <span className={hot ? "canvas-em" : undefined}>{word}</span>;
}

/** Word-level entrance for major statements */
export function CanvasWordReveal({
  text,
  className,
  as = "h2",
  delay = 0,
  emphasize,
}: WordRevealProps) {
  const reduced = usePrefersReducedMotion();
  const words = useMemo(() => splitWords(text), [text]);
  const emp = useMemo(
    () => resolveCanvasEmphasize(words, emphasize),
    [words, emphasize],
  );
  const Tag = as;

  if (reduced) {
    return (
      <Tag className={`${className ?? ""} canvas-wrap-heading canvas-text-safe`}>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <DualWord word={word} hot={isCanvasEmphasized(word, emp)} />
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={`${className ?? ""} canvas-wrap-heading canvas-text-safe`}>
      {words.map((word, i) => {
        const hot = isCanvasEmphasized(word, emp);
        return (
          <Fragment key={`${word}-${i}`}>
            <span className="inline-block max-w-full overflow-hidden align-bottom">
              <motion.span
                className={`inline-block whitespace-nowrap${hot ? " canvas-em" : ""}`}
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
      className={`inline-block whitespace-nowrap${hot ? " canvas-em" : ""}`}
      style={{ opacity }}
    >
      {word}
    </motion.span>
  );
}

type ScrubProps = {
  /** Single string — words scrub in sequence */
  text?: string;
  /** Explicit line breaks — preferred for display headlines */
  lines?: string[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** Accent words. Omit for auto dual-color; pass `[]` to disable. */
  emphasize?: string[];
  id?: string;
};

/**
 * Scroll scrub — words resolve from muted → strong as the headline progresses
 * through the viewport. Default Canvas treatment for section headlines.
 * Dual-color: curated or auto accent words via `.canvas-em`.
 */
export function CanvasTextScrub({
  text,
  lines,
  className,
  lineClassName,
  as = "h2",
  emphasize,
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
  const emp = useMemo(
    () => resolveCanvasEmphasize(flatWords, emphasize),
    [flatWords, emphasize],
  );
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"],
  });
  const Tag = as;

  if (reduced) {
    return (
      <Tag
        id={id}
        className={`${className ?? ""} canvas-wrap-heading canvas-text-safe`}
        ref={ref as never}
      >
        {lineList.map((line, lineIdx) => {
          const words = splitWords(line);
          return (
            <span key={`${line}-${lineIdx}`} className={`block ${lineClassName ?? ""}`}>
              {words.map((word, i) => (
                <Fragment key={`${word}-${i}`}>
                  <DualWord word={word} hot={isCanvasEmphasized(word, emp)} />
                  {i < words.length - 1 ? " " : null}
                </Fragment>
              ))}
            </span>
          );
        })}
      </Tag>
    );
  }

  let wordIndex = 0;

  return (
    <Tag
      id={id}
      className={`${className ?? ""} canvas-wrap-heading canvas-text-safe`}
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
              const hot = isCanvasEmphasized(word, emp);
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
