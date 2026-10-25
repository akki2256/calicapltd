"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useMemo, useRef } from "react";
import {
  isCanvasEmphasized,
  resolveCanvasEmphasize,
} from "@/lib/canvas-dual-color";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useCanvasScrollContainer } from "./canvas-scroll-container";

function splitWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

function DualWord({ word, hot }: { word: string; hot: boolean }) {
  return <span className={hot ? "canvas-em" : undefined}>{word}</span>;
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
      className={`whitespace-nowrap${hot ? " canvas-em" : ""}`}
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
  /**
   * Scroll-driven muted→strong word reveal. Set `false` for static dual-color
   * (e.g. nested detail panels where panel scroll should not scrub).
   */
  scrub?: boolean;
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
  scrub = true,
}: ScrubProps) {
  const ref = useRef<HTMLElement>(null);
  const scrollContainer = useCanvasScrollContainer();
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
    ...(scrollContainer ? { container: scrollContainer } : {}),
    offset: scrollContainer
      ? ["start 0.92", "start 0.18"]
      : ["start 0.9", "start 0.25"],
  });
  const Tag = as;
  const staticDual = reduced || !scrub;

  const headingClass = `${className ?? ""} canvas-wrap-heading canvas-text-safe flex flex-col gap-[0.14em]`;

  if (staticDual) {
    return (
      <Tag
        id={id}
        className={headingClass}
        ref={ref as never}
        data-canvas-authored=""
      >
        {lineList.map((line, lineIdx) => {
          const words = splitWords(line);
          return (
            <span key={`${line}-${lineIdx}`} className={`block min-w-0 ${lineClassName ?? ""}`}>
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
      className={headingClass}
      ref={ref as never}
      data-canvas-authored=""
    >
      {lineList.map((line, lineIdx) => {
        const words = splitWords(line);
        return (
          <span key={`${line}-${lineIdx}`} className={`block min-w-0 ${lineClassName ?? ""}`}>
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
