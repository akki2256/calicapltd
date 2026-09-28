"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
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

/** Scroll progress where the ledger focus sequence runs (while stage is pinned) */
const FOCUS_START = 0.12;
const FOCUS_END = 0.9;

function MetricValue({
  value,
  focus,
}: {
  value: string;
  focus: MotionValue<number>;
}) {
  const reduced = usePrefersReducedMotion();
  const countable = isCountablePercentValue(value);
  const target = countable ? Number.parseFloat(value) : 0;
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) =>
    countable ? `${Math.round(v)}%` : value,
  );

  useMotionValueEvent(focus, "change", (v) => {
    if (!countable || reduced) return;
    const next = Math.round(target * Math.min(1, Math.max(0, v)));
    if (Math.abs(mv.get() - next) >= 1) mv.set(next);
  });

  useEffect(() => {
    if (reduced && countable) mv.set(target);
  }, [countable, mv, reduced, target]);

  if (!countable || reduced) {
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
  focus,
  reduced,
  rowRef,
}: {
  index: number;
  value: string;
  label: string;
  category: string;
  direction: "up" | "down";
  focus: MotionValue<number>;
  reduced: boolean;
  rowRef: (el: HTMLLIElement | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const pad = String(index + 1).padStart(2, "0");
  const arrow = direction === "up" ? "↑" : "↓";

  const rowOp = useTransform(focus, [0, 0.35, 1], reduced ? [1, 1, 1] : [0.28, 0.55, 1]);
  const numberScale = useTransform(focus, [0, 1], reduced ? [1, 1] : [0.96, 1.04]);
  const labelOp = useTransform(focus, [0, 1], reduced ? [1, 1] : [0.32, 1]);
  const catOp = useTransform(focus, [0, 1], reduced ? [0.55, 0.55] : [0.18, 0.85]);
  const ruleOp = useTransform(focus, [0, 1], reduced ? [0.4, 0.4] : [0.14, 0.82]);
  const signalX = useTransform(focus, [0.2, 1], reduced ? ["0%", "0%"] : ["0%", "100%"]);
  const signalOp = useTransform(
    focus,
    [0.15, 0.5, 0.9, 1],
    reduced ? [0, 0, 0, 0] : [0, 1, 0.35, 0.06],
  );
  const labelX = useTransform(focus, [0, 1], [0, 5]);

  return (
    <motion.li
      ref={rowRef}
      className={`canvas-impact-row${hovered ? " is-hovered" : ""}`}
      style={reduced ? undefined : { opacity: rowOp }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        className="canvas-impact-rule"
        style={{ opacity: ruleOp }}
        aria-hidden
      >
        <motion.span
          className="canvas-impact-signal"
          style={reduced ? undefined : { left: signalX, opacity: signalOp }}
        />
      </motion.div>

      <div className="canvas-impact-row-body">
        <span className="canvas-impact-index" aria-hidden>
          {pad}
        </span>

        <div className="canvas-impact-value-clip">
          <motion.p
            className="canvas-impact-value whitespace-nowrap"
            style={reduced ? undefined : { scale: numberScale }}
          >
            <MetricValue value={value} focus={focus} />
          </motion.p>
        </div>

        <motion.div
          className="canvas-impact-copy"
          style={reduced ? undefined : { opacity: labelOp, x: labelX }}
        >
          <p className="canvas-impact-label">{label}</p>
          <motion.p
            className="canvas-impact-category"
            style={{ opacity: catOp }}
            aria-hidden
          >
            <span>{arrow}</span> {category}
          </motion.p>
        </motion.div>
      </div>
    </motion.li>
  );
}

/**
 * Kinetic Results Ledger.
 * Desktop: useScroll-driven pin + ledger slides so the active row sits on the viewport center.
 */
export function CanvasImpactMetrics() {
  const impact = calicapHomeImpact;
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rowEls = useRef<(HTMLLIElement | null)[]>([]);
  const rulePulseY = useMotionValue(-1);
  const rulePulseOp = useMotionValue(0);
  const desktopRef = useRef(false);

  const f0 = useMotionValue(reduced ? 1 : 0);
  const f1 = useMotionValue(reduced ? 1 : 0);
  const f2 = useMotionValue(reduced ? 1 : 0);
  const f3 = useMotionValue(reduced ? 1 : 0);
  const focuses = [f0, f1, f2, f3];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Pin window: section top hits viewport top → section bottom hits viewport bottom
    offset: ["start start", "end end"],
  });

  const progress = scrollYProgress;

  const applyFrame = useCallback(
    (p: number) => {
      const stage = stageRef.current;
      const track = trackRef.current;
      const ledger = ledgerRef.current;
      const section = sectionRef.current;
      if (!stage || !track || !ledger || !section) return;

      const desktop = desktopRef.current;
      const vh = window.innerHeight;
      const focusList = [f0, f1, f2, f3];
      const metricCount = focusList.length;

      if (!desktop) {
        stage.style.transform = "";
        track.style.transform = "";

        const line = vh * 0.52;
        const distances = rowEls.current.map((el) => {
          if (!el) return Number.POSITIVE_INFINITY;
          const r = el.getBoundingClientRect();
          return Math.abs(r.top + r.height / 2 - line);
        });
        const best = distances.indexOf(Math.min(...distances));
        focusList.forEach((f, i) => {
          const dist = distances[i] ?? Number.POSITIVE_INFINITY;
          const proximity = Math.max(0, 1 - dist / 200);
          f.set(i === best ? Math.max(proximity, 0.65) : proximity * 0.7);
        });
        return;
      }

      const travel = Math.max(1, section.offsetHeight - vh);
      const sectionTop = section.getBoundingClientRect().top;

      /* Only pin once the section has reached the viewport top */
      if (sectionTop > 0.5) {
        stage.style.transform = "";
        track.style.transform = "";
        focusList.forEach((f, i) => f.set(i === 0 ? 0.22 : 0.12));
        return;
      }

      /* Fake-sticky: progress 0→1 maps to translate 0→travel */
      stage.style.transform = `translate3d(0, ${p * travel}px, 0)`;

      let y = 0;
      const centers: number[] = [];
      for (let i = 0; i < metricCount; i++) {
        const el = rowEls.current[i];
        const h = el?.offsetHeight ?? 0;
        centers.push(y + h / 2);
        y += h;
      }

      const span = Math.max(0.001, FOCUS_END - FOCUS_START);
      const focusFloat = Math.min(
        metricCount - 1,
        Math.max(0, ((p - FOCUS_START) / span) * (metricCount - 1)),
      );
      const i0 = Math.floor(focusFloat);
      const i1 = Math.min(metricCount - 1, i0 + 1);
      const t = focusFloat - i0;
      const focusCenter =
        (centers[i0] ?? 0) + ((centers[i1] ?? 0) - (centers[i0] ?? 0)) * t;

      const ledgerRect = ledger.getBoundingClientRect();
      const localCenter = vh * 0.5 - ledgerRect.top;
      track.style.transform = `translate3d(0, ${localCenter - focusCenter}px, 0)`;

      focusList.forEach((f, i) => {
        const dist = Math.abs(focusFloat - i);
        if (p < FOCUS_START) {
          f.set(i === 0 ? 0.45 : 0.14);
          return;
        }
        if (p > FOCUS_END) {
          f.set(i === metricCount - 1 ? 0.75 : 0.28);
          return;
        }
        const peak = Math.max(0, 1 - dist);
        f.set(peak * peak);
      });
    },
    [f0, f1, f2, f3],
  );

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced) return;
    applyFrame(p);
  });

  useEffect(() => {
    if (reduced) {
      f0.set(1);
      f1.set(1);
      f2.set(1);
      f3.set(1);
      return;
    }

    const syncDesktop = () => {
      desktopRef.current = window.innerWidth >= 1024;
      applyFrame(scrollYProgress.get());
    };

    syncDesktop();
    window.addEventListener("resize", syncDesktop, { passive: true });
    return () => {
      window.removeEventListener("resize", syncDesktop);
      const stage = stageRef.current;
      const track = trackRef.current;
      if (stage) stage.style.transform = "";
      if (track) track.style.transform = "";
    };
  }, [reduced, applyFrame, scrollYProgress, f0, f1, f2, f3]);

  const editorialOp = useTransform(progress, [0, 0.1], reduced ? [1, 1] : [0.35, 1]);
  const labelClip = useTransform(
    progress,
    [0, 0.08],
    reduced
      ? ["inset(0 0% 0 0)", "inset(0 0% 0 0)"]
      : ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const line0Y = useTransform(progress, [0.02, 0.1], reduced ? [0, 0] : [20, 0]);
  const line0Op = useTransform(progress, [0.02, 0.1], reduced ? [1, 1] : [0, 1]);
  const line1Y = useTransform(progress, [0.04, 0.12], reduced ? [0, 0] : [20, 0]);
  const line1Op = useTransform(progress, [0.04, 0.12], reduced ? [1, 1] : [0, 1]);
  const line2Y = useTransform(progress, [0.06, 0.14], reduced ? [0, 0] : [20, 0]);
  const line2Op = useTransform(progress, [0.06, 0.14], reduced ? [1, 1] : [0, 1]);
  const bodyY = useTransform(progress, [0.08, 0.16], reduced ? [0, 0] : [10, 0]);
  const bodyOp = useTransform(progress, [0.08, 0.16], reduced ? [1, 1] : [0, 1]);
  const lineYs = [line0Y, line1Y, line2Y];
  const lineOps = [line0Op, line1Op, line2Op];

  const scanY = useTransform(progress, [FOCUS_START, FOCUS_END], ["50%", "50%"]);
  const scanOp = useTransform(
    progress,
    [FOCUS_START - 0.04, FOCUS_START + 0.02, FOCUS_END - 0.02, FOCUS_END + 0.04],
    reduced ? [0, 0, 0, 0] : [0, 0.75, 0.6, 0],
  );

  const pulseTop = useMotionTemplate`${rulePulseY}px`;

  const onLedgerPointer = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (reduced || !ledgerRef.current) return;
      const rect = ledgerRef.current.getBoundingClientRect();
      rulePulseY.set(e.clientY - rect.top);
      rulePulseOp.set(0.5);
    },
    [reduced, rulePulseOp, rulePulseY],
  );

  const onLedgerLeave = useCallback(() => {
    animate(rulePulseOp, 0, { duration: 0.3, ease: canvasEase });
  }, [rulePulseOp]);

  const setRowRef = useCallback(
    (index: number) => (el: HTMLLIElement | null) => {
      rowEls.current[index] = el;
    },
    [],
  );

  return (
    <section
      ref={sectionRef}
      id={HOME_IMPACT_ID}
      className="canvas-impact"
      aria-labelledby="canvas-impact-heading"
      data-canvas-section="impact"
    >
      <div ref={stageRef} className="canvas-impact-stage">
        <div className="canvas-impact-frame">
          <div className="canvas-impact-layout">
            <motion.aside
              className="canvas-impact-editorial"
              style={reduced ? undefined : { opacity: editorialOp }}
            >
              <motion.p
                className="canvas-impact-eyebrow"
                style={reduced ? undefined : { clipPath: labelClip }}
              >
                {impact.eyebrow}
              </motion.p>

              <h2 id="canvas-impact-heading" className="canvas-impact-headline">
                {HEADLINE_LINES.map((line, i) => (
                  <span key={line} className="canvas-impact-headline-line">
                    <motion.span
                      className="canvas-impact-headline-inner"
                      style={
                        reduced
                          ? undefined
                          : { y: lineYs[i], opacity: lineOps[i] }
                      }
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h2>

              <motion.p
                className="canvas-impact-body"
                style={
                  reduced ? undefined : { y: bodyY, opacity: bodyOp }
                }
              >
                {impact.body}
              </motion.p>
            </motion.aside>

            <div
              ref={ledgerRef}
              className="canvas-impact-ledger"
              onPointerMove={onLedgerPointer}
              onPointerLeave={onLedgerLeave}
            >
              {!reduced ? (
                <motion.div
                  className="canvas-impact-scan"
                  style={{ top: scanY, opacity: scanOp }}
                  aria-hidden
                />
              ) : null}

              {!reduced ? (
                <motion.div
                  className="canvas-impact-rule-pulse"
                  style={{ top: pulseTop, opacity: rulePulseOp }}
                  aria-hidden
                />
              ) : null}

              <div ref={trackRef} className="canvas-impact-track">
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
                        focus={focuses[i] ?? f0}
                        reduced={reduced}
                        rowRef={setRowRef(i)}
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
