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

type ScrubProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  emphasize?: string[];
};

/** Scroll scrub — words resolve from muted → strong as section progresses */
export function CanvasTextScrub({
  text,
  className,
  as = "h2",
  emphasize = [],
}: ScrubProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const emp = new Set(emphasize.map((w) => w.toLowerCase()));
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });
  const Tag = as;

  if (reduced) {
    return (
      <Tag className={`${className ?? ""} canvas-wrap-heading`} ref={ref as never}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag className={`${className ?? ""} canvas-wrap-heading`} ref={ref as never}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, (i + 1.2) / words.length);
        const hot = emp.has(word.replace(/[^\w']/g, "").toLowerCase());
        return (
          <Fragment key={`${word}-${i}`}>
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
    </Tag>
  );
}
