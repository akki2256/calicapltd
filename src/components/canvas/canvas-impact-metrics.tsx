"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CanvasNodeMesh } from "@/components/canvas/canvas-node-mesh";
import { canvasEase } from "@/components/canvas/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  HOME_IMPACT_ID,
  calicapHomeImpact,
  isCountablePercentValue,
} from "@/lib/calicap-home";

const HEADLINE_LINES = ["Built for", "measurable", "impact."] as const;

const ROW_META = [
  { category: "GROWTH", direction: "up" as const },
  { category: "VISIBILITY", direction: "up" as const },
  { category: "PERFORMANCE", direction: "up" as const },
  { category: "EFFICIENCY", direction: "down" as const },
] as const;

function MetricValue({ value, active }: { value: string; active: boolean }) {
  const reduced = usePrefersReducedMotion();
  const countable = isCountablePercentValue(value);
  const target = countable ? Number.parseFloat(value) : 0;
  const mv = useMotionValue(reduced || !countable ? target : 0);
  const display = useTransform(mv, (v) =>
    countable ? `${Math.round(v)}%` : value,
  );

  useEffect(() => {
    if (!countable || reduced) {
      mv.set(target);
      return;
    }
    if (!active) return;
    const controls = animate(mv, target, {
      duration: 1.1,
      ease: canvasEase,
    });
    return () => controls.stop();
  }, [active, countable, mv, reduced, target]);

  if (!countable) {
    return <span className="tabular-nums">{value}</span>;
  }

  return <motion.span className="tabular-nums">{display}</motion.span>;
}

function ResultRow({
  index,
  value,
  label,
  category,
  direction,
  active,
}: {
  index: number;
  value: string;
  label: string;
  category: string;
  direction: "up" | "down";
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const pad = String(index + 1).padStart(2, "0");
  const arrow = direction === "up" ? "↑" : "↓";

  return (
    <li
      className={`canvas-impact-row${hovered ? " is-hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="canvas-impact-rule" aria-hidden />
      <div className="canvas-impact-row-body">
        <span className="canvas-impact-index" aria-hidden>
          {pad}
        </span>
        <div className="canvas-impact-value-clip">
          <p className="canvas-impact-value whitespace-nowrap">
            <MetricValue value={value} active={active} />
          </p>
        </div>
        <div className="canvas-impact-copy">
          <p className="canvas-impact-label">{label}</p>
          <p className="canvas-impact-category">
            <span aria-hidden>{arrow} </span>
            {category}
          </p>
        </div>
      </div>
    </li>
  );
}

/**
 * Results ledger — static stack (no scroll-pinned carousel).
 */
export function CanvasImpactMetrics() {
  const impact = calicapHomeImpact;
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });

  return (
    <section
      ref={sectionRef}
      id={HOME_IMPACT_ID}
      className="canvas-impact"
      aria-labelledby="canvas-impact-heading"
      data-canvas-section="impact"
    >
      <div className="canvas-impact-stage">
        <div className="canvas-impact-mesh" aria-hidden>
          <CanvasNodeMesh tone="dark" intensity={1} />
        </div>
        <div className="canvas-impact-frame">
          <div className="canvas-impact-layout">
            <aside className="canvas-impact-editorial">
              <p className="canvas-impact-eyebrow">{impact.eyebrow}</p>
              <h2 id="canvas-impact-heading" className="canvas-impact-headline">
                {HEADLINE_LINES.map((line) => (
                  <span key={line} className="canvas-impact-headline-line">
                    <span className="canvas-impact-headline-inner">{line}</span>
                  </span>
                ))}
              </h2>
              <p className="canvas-impact-body">{impact.body}</p>
            </aside>

            <div className="canvas-impact-ledger">
              <div className="canvas-impact-track">
                <ul className="canvas-impact-rows">
                  {impact.metrics.map((metric, i) => {
                    const meta = ROW_META[i] ?? ROW_META[0];
                    return (
                      <ResultRow
                        key={metric.label}
                        index={i}
                        value={metric.value}
                        label={metric.label}
                        category={meta.category}
                        direction={meta.direction}
                        active={reduced || inView}
                      />
                    );
                  })}
                </ul>
                <div
                  className="canvas-impact-rule canvas-impact-rule--exit"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
