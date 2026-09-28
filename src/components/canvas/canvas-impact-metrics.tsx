"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
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
const FOCUS_START = 0.08;
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

  const rowOp = useTransform(focus, [0, 0.4, 1], reduced ? [1, 1, 1] : [0.5, 0.75, 1]);
  const numberScale = useTransform(focus, [0, 1], reduced ? [1, 1] : [0.97, 1.04]);
  const labelOp = useTransform(focus, [0, 1], reduced ? [1, 1] : [0.6, 1]);
  const catOp = useTransform(focus, [0, 1], reduced ? [0.7, 0.7] : [0.42, 0.9]);
  const ruleOp = useTransform(focus, [0, 1], reduced ? [0.45, 0.45] : [0.28, 0.85]);
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
 * Desktop: pinned stage + spring-smoothed ledger that slides each metric
 * through the viewport center — without harsh edge clipping.
 */
export function CanvasImpactMetrics() {
  const impact = calicapHomeImpact;
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const rowEls = useRef<(HTMLLIElement | null)[]>([]);
  const rulePulseY = useMotionValue(-1);
  const rulePulseOp = useMotionValue(0);
  const desktopRef = useRef(false);

  const f0 = useMotionValue(reduced ? 1 : 0.55);
  const f1 = useMotionValue(reduced ? 1 : 0.4);
  const f2 = useMotionValue(reduced ? 1 : 0.4);
  const f3 = useMotionValue(reduced ? 1 : 0.4);
  const focuses = [f0, f1, f2, f3];

  /** Target Y for the sliding track — spring smooths the motion */
  const trackY = useMotionValue(0);
  const smoothTrackY = useSpring(trackY, {
    stiffness: 90,
    damping: 26,
    mass: 0.45,
    restDelta: 0.1,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  });

  const progress = scrollYProgress;

  const rowCenterLocal = useCallback((index: number) => {
    let y = 0;
    for (let i = 0; i < index; i++) {
      y += rowEls.current[i]?.offsetHeight ?? 0;
    }
    const el = rowEls.current[index];
    return y + (el ? el.offsetHeight / 2 : 0);
  }, []);

  const applyPin = useCallback((p: number) => {
    const stage = stageRef.current;
    const section = sectionRef.current;
    if (!stage || !section) return;

    if (!desktopRef.current) {
      stage.style.transform = "";
      return;
    }

    const vh = window.innerHeight;
    const travel = Math.max(1, section.offsetHeight - vh);
    stage.style.transform = p <= 0 ? "" : `translate3d(0, ${p * travel}px, 0)`;
  }, []);

  const applyLedgerMotion = useCallback(
    (p: number) => {
      const ledger = ledgerRef.current;
      const focusList = [f0, f1, f2, f3];
      const metricCount = focusList.length;
      const vh = window.innerHeight;

      if (!desktopRef.current) {
        trackY.set(0);
        const line = vh * 0.52;
        const distances = rowEls.current.map((el) => {
          if (!el) return Number.POSITIVE_INFINITY;
          const r = el.getBoundingClientRect();
          return Math.abs(r.top + r.height / 2 - line);
        });
        const best = distances.indexOf(Math.min(...distances));
        focusList.forEach((f, i) => {
          const dist = distances[i] ?? Number.POSITIVE_INFINITY;
          const proximity = Math.max(0, 1 - dist / 220);
          f.set(i === best ? Math.max(proximity, 0.75) : Math.max(0.45, proximity * 0.8));
        });
        return;
      }

      if (!ledger) return;

      const track = ledger.querySelector(".canvas-impact-track") as HTMLElement | null;
      const padTop = track
        ? parseFloat(getComputedStyle(track).paddingTop) || 0
        : 0;

      const ledgerH = ledger.clientHeight || vh * 0.56;
      const span = Math.max(0.001, FOCUS_END - FOCUS_START);
      const focusFloat = Math.min(
        metricCount - 1,
        Math.max(0, ((p - FOCUS_START) / span) * (metricCount - 1)),
      );

      /*
       * Before the focus sequence: park the full stack just below the soft
       * fade so editorial + ledger tops read as one aligned composition.
       * During focus: slide the active row into the clear mid band.
       */
      if (p < FOCUS_START) {
        const clearTop = ledgerH * 0.1;
        trackY.set(clearTop - padTop);
      } else if (p > FOCUS_END) {
        const lastCenter = rowCenterLocal(metricCount - 1);
        trackY.set(ledgerH * 0.5 - padTop - lastCenter);
      } else {
        const i0 = Math.floor(focusFloat);
        const i1 = Math.min(metricCount - 1, i0 + 1);
        const t = focusFloat - i0;
        const focusCenter =
          rowCenterLocal(i0) + (rowCenterLocal(i1) - rowCenterLocal(i0)) * t;
        trackY.set(ledgerH * 0.5 - padTop - focusCenter);
      }

      focusList.forEach((f, i) => {
        const dist = Math.abs(focusFloat - i);
        if (p < FOCUS_START) {
          f.set(i === 0 ? 0.82 : 0.55);
          return;
        }
        if (p > FOCUS_END) {
          f.set(i === metricCount - 1 ? 0.9 : 0.5);
          return;
        }
        const peak = Math.max(0, 1 - dist * 0.85);
        f.set(0.45 + peak * 0.55);
      });
    },
    [f0, f1, f2, f3, rowCenterLocal, trackY],
  );

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced) return;
    applyPin(p);
  });

  useMotionValueEvent(smoothProgress, "change", (p) => {
    if (reduced) return;
    applyLedgerMotion(p);
  });

  useEffect(() => {
    if (reduced) {
      f0.set(1);
      f1.set(1);
      f2.set(1);
      f3.set(1);
      trackY.set(0);
      return;
    }

    const sync = () => {
      desktopRef.current = window.innerWidth >= 1024;
      applyPin(scrollYProgress.get());
      applyLedgerMotion(smoothProgress.get());
    };

    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      window.removeEventListener("resize", sync);
      const stage = stageRef.current;
      if (stage) stage.style.transform = "";
    };
  }, [
    reduced,
    applyPin,
    applyLedgerMotion,
    scrollYProgress,
    smoothProgress,
    trackY,
    f0,
    f1,
    f2,
    f3,
  ]);

  const editorialOp = useTransform(progress, [0, 0.08], reduced ? [1, 1] : [0.94, 1]);
  const labelClip = useTransform(
    progress,
    [0, 0.06],
    reduced
      ? ["inset(0 0% 0 0)", "inset(0 0% 0 0)"]
      : ["inset(0 8% 0 0)", "inset(0 0% 0 0)"],
  );
  const line0Y = useTransform(progress, [0, 0.08], reduced ? [0, 0] : [12, 0]);
  const line0Op = useTransform(progress, [0, 0.08], reduced ? [1, 1] : [0.9, 1]);
  const line1Y = useTransform(progress, [0.02, 0.1], reduced ? [0, 0] : [12, 0]);
  const line1Op = useTransform(progress, [0.02, 0.1], reduced ? [1, 1] : [0.9, 1]);
  const line2Y = useTransform(progress, [0.04, 0.12], reduced ? [0, 0] : [12, 0]);
  const line2Op = useTransform(progress, [0.04, 0.12], reduced ? [1, 1] : [0.9, 1]);
  const bodyY = useTransform(progress, [0.06, 0.14], reduced ? [0, 0] : [8, 0]);
  const bodyOp = useTransform(progress, [0.06, 0.14], reduced ? [1, 1] : [0.85, 1]);
  const lineYs = [line0Y, line1Y, line2Y];
  const lineOps = [line0Op, line1Op, line2Op];

  const scanY = useTransform(smoothProgress, [FOCUS_START, FOCUS_END], ["50%", "50%"]);
  const scanOp = useTransform(
    smoothProgress,
    [FOCUS_START - 0.03, FOCUS_START + 0.02, FOCUS_END - 0.02, FOCUS_END + 0.05],
    reduced ? [0, 0, 0, 0] : [0, 0.65, 0.5, 0],
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

              <motion.div
                className="canvas-impact-track"
                style={reduced ? undefined : { y: smoothTrackY }}
              >
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
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
