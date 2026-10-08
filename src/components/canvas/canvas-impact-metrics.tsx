"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CanvasNodeMesh } from "@/components/canvas/canvas-node-mesh";
import { CanvasTextScrub, canvasEase } from "@/components/canvas/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  HOME_IMPACT_ID,
  calicapHomeImpact,
  isCountablePercentValue,
} from "@/lib/calicap-home";

const HEADLINE_LINES = ["What changes", "when we work."] as const;

const ROW_DIRECTION = ["up", "up", "up", "down"] as const;

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
  direction,
  active,
}: {
  index: number;
  value: string;
  label: string;
  direction: "up" | "down";
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const arrow = direction === "up" ? "↑" : "↓";

  return (
    <li
      className={`canvas-impact-row${hovered ? " is-hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Skip the first top rule — section already has a border; avoids the extra small line */}
      {index > 0 ? <div className="canvas-impact-rule" aria-hidden /> : null}
      <div className="canvas-impact-row-body">
        <p className="canvas-impact-value whitespace-nowrap">
          <MetricValue value={value} active={active} />
        </p>
        <p className="canvas-impact-copy">
          <span className="canvas-impact-arrow" aria-hidden>
            {arrow}
          </span>
          <span className="canvas-impact-label">{label}</span>
        </p>
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
              <CanvasTextScrub
                as="h2"
                id="canvas-impact-heading"
                lines={[...HEADLINE_LINES]}
                className="canvas-impact-headline"
                lineClassName="canvas-impact-headline-line"
                emphasize={["changes", "work"]}
              />
              <p className="canvas-impact-body">{impact.body}</p>
            </aside>

            <div className="canvas-impact-ledger">
              <div className="canvas-impact-track">
                <ul className="canvas-impact-rows">
                  {impact.metrics.map((metric, i) => {
                    const direction = ROW_DIRECTION[i] ?? "up";
                    return (
                      <ResultRow
                        key={metric.label}
                        index={i}
                        value={metric.value}
                        label={metric.label}
                        direction={direction}
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
