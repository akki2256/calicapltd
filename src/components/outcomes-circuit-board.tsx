"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PillarEmbeddedView } from "@/components/pillar-page-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { calicapHomeDiscovery, calicapHomeOutcomes } from "@/lib/calicap-home";

/** Softer engineered motion — controlled attack, longer settle */
const easeCircuit = [0.4, 0.0, 0.2, 1] as const;
const easeSettle = [0.22, 1, 0.36, 1] as const;
const easePanel = [0.22, 1, 0.36, 1] as const;

const DUR = {
  exit: 0.52,
  select: 0.62,
  traces: 0.64,
  panel: 0.68,
  settle: 0.48,
  scroll: 780,
} as const;

/** easeOutCubic — used for viewport framing scrolls */
function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

const OUTCOME_IDS = [
  "create",
  "modernize",
  "automate",
  "connect",
  "scale",
] as const;
type OutcomeId = (typeof OUTCOME_IDS)[number];

function isOutcomeId(value: string): value is OutcomeId {
  return (OUTCOME_IDS as readonly string[]).includes(value);
}

/** Idle board placement — CREATE left edge aligns with section title */
const NODE_LAYOUT: Record<
  OutcomeId,
  { left: number; top: number; w: number; h: number }
> = {
  create: { left: 0, top: 4, w: 21, h: 27 },
  modernize: { left: 39, top: 2, w: 21, h: 27 },
  automate: { left: 78, top: 14, w: 21, h: 27 },
  connect: { left: 5.5, top: 52, w: 21, h: 27 },
  scale: { left: 49.5, top: 55, w: 21, h: 27 },
};

/** Active dock for the selected node (percent of board) */
const DOCK = { left: 0, top: 28, w: 26, h: 36 };

type JunctionKind = "glow" | "hollow" | "solid";
type TraceSeg = {
  d: string;
  junctions?: { x: number; y: number; kind?: JunctionKind }[];
};

/**
 * Ambient field wires — dense PCB texture that fills the board edge-to-edge.
 * Orthogonal + 45° routing; glowing terminals read as live junctions.
 */
const AMBIENT_TRACES: TraceSeg[] = [
  // Top rail / left margin
  {
    d: "M 8 40 H 90 V 18 H 170 L 210 58 H 280",
    junctions: [
      { x: 90, y: 40, kind: "solid" },
      { x: 170, y: 18, kind: "hollow" },
      { x: 210, y: 58, kind: "glow" },
    ],
  },
  {
    d: "M 300 12 H 380 V 48 H 460 L 500 88",
    junctions: [
      { x: 380, y: 12, kind: "solid" },
      { x: 460, y: 48, kind: "hollow" },
      { x: 500, y: 88, kind: "glow" },
    ],
  },
  {
    d: "M 520 10 H 610 V 42 L 650 82 H 730",
    junctions: [
      { x: 610, y: 10, kind: "solid" },
      { x: 610, y: 42, kind: "hollow" },
      { x: 730, y: 82, kind: "glow" },
    ],
  },
  {
    d: "M 760 20 V 70 H 850 L 900 115 H 980",
    junctions: [
      { x: 760, y: 70, kind: "hollow" },
      { x: 850, y: 70, kind: "solid" },
      { x: 980, y: 115, kind: "glow" },
    ],
  },
  {
    d: "M 1000 28 H 1050 V 95 H 1088",
    junctions: [
      { x: 1050, y: 28, kind: "solid" },
      { x: 1088, y: 95, kind: "hollow" },
    ],
  },
  // Mid-left weave
  {
    d: "M 12 130 H 70 V 185 H 130 L 175 230 V 280",
    junctions: [
      { x: 70, y: 130, kind: "solid" },
      { x: 130, y: 185, kind: "hollow" },
      { x: 175, y: 280, kind: "glow" },
    ],
  },
  {
    d: "M 40 220 H 110 V 270 H 180 L 220 310",
    junctions: [
      { x: 110, y: 220, kind: "hollow" },
      { x: 180, y: 270, kind: "solid" },
      { x: 220, y: 310, kind: "glow" },
    ],
  },
  {
    d: "M 18 360 H 95 L 140 405 V 470 H 210",
    junctions: [
      { x: 95, y: 360, kind: "solid" },
      { x: 140, y: 405, kind: "hollow" },
      { x: 210, y: 470, kind: "glow" },
    ],
  },
  {
    d: "M 8 500 V 555 H 75 V 600 H 160",
    junctions: [
      { x: 75, y: 555, kind: "solid" },
      { x: 160, y: 600, kind: "hollow" },
    ],
  },
  // Bottom spine
  {
    d: "M 200 545 H 290 L 335 590 H 450 V 608",
    junctions: [
      { x: 290, y: 545, kind: "solid" },
      { x: 335, y: 590, kind: "hollow" },
      { x: 450, y: 608, kind: "glow" },
    ],
  },
  {
    d: "M 480 555 H 570 V 600 H 680 L 720 608",
    junctions: [
      { x: 570, y: 555, kind: "solid" },
      { x: 680, y: 600, kind: "hollow" },
      { x: 720, y: 608, kind: "glow" },
    ],
  },
  {
    d: "M 760 530 H 850 L 900 575 V 608 H 1000",
    junctions: [
      { x: 850, y: 530, kind: "hollow" },
      { x: 900, y: 575, kind: "solid" },
      { x: 1000, y: 608, kind: "glow" },
    ],
  },
  {
    d: "M 1020 480 V 545 H 1070 V 600",
    junctions: [
      { x: 1020, y: 545, kind: "solid" },
      { x: 1070, y: 600, kind: "hollow" },
    ],
  },
  // Right margin stack
  {
    d: "M 920 150 H 990 V 210 L 1040 255 V 320",
    junctions: [
      { x: 990, y: 150, kind: "solid" },
      { x: 990, y: 210, kind: "hollow" },
      { x: 1040, y: 320, kind: "glow" },
    ],
  },
  {
    d: "M 900 280 H 970 V 340 H 1045 L 1080 380",
    junctions: [
      { x: 970, y: 280, kind: "solid" },
      { x: 1045, y: 340, kind: "hollow" },
      { x: 1080, y: 380, kind: "glow" },
    ],
  },
  {
    d: "M 880 400 H 960 V 460 H 1030 L 1075 505",
    junctions: [
      { x: 960, y: 400, kind: "solid" },
      { x: 1030, y: 460, kind: "hollow" },
      { x: 1075, y: 505, kind: "glow" },
    ],
  },
  {
    d: "M 1085 160 V 250 H 1055 V 340",
    junctions: [
      { x: 1085, y: 250, kind: "hollow" },
      { x: 1055, y: 340, kind: "solid" },
    ],
  },
  // Center field fill (between boxes)
  {
    d: "M 260 140 H 340 V 190 L 385 235 H 450",
    junctions: [
      { x: 340, y: 140, kind: "solid" },
      { x: 340, y: 190, kind: "hollow" },
      { x: 450, y: 235, kind: "glow" },
    ],
  },
  {
    d: "M 480 130 H 560 L 600 170 V 230 H 670",
    junctions: [
      { x: 560, y: 130, kind: "solid" },
      { x: 600, y: 170, kind: "hollow" },
      { x: 670, y: 230, kind: "glow" },
    ],
  },
  {
    d: "M 300 300 H 380 V 360 H 460 L 510 405",
    junctions: [
      { x: 380, y: 300, kind: "hollow" },
      { x: 460, y: 360, kind: "solid" },
      { x: 510, y: 405, kind: "glow" },
    ],
  },
  {
    d: "M 550 300 H 640 V 355 L 690 400 H 780",
    junctions: [
      { x: 640, y: 300, kind: "solid" },
      { x: 690, y: 400, kind: "hollow" },
      { x: 780, y: 400, kind: "glow" },
    ],
  },
  {
    d: "M 250 420 H 340 V 470 H 420 L 470 515",
    junctions: [
      { x: 340, y: 420, kind: "solid" },
      { x: 420, y: 470, kind: "hollow" },
      { x: 470, y: 515, kind: "glow" },
    ],
  },
  {
    d: "M 620 450 H 710 V 500 H 800 L 850 545",
    junctions: [
      { x: 710, y: 450, kind: "solid" },
      { x: 800, y: 500, kind: "hollow" },
      { x: 850, y: 545, kind: "glow" },
    ],
  },
  {
    d: "M 120 80 V 130 H 190 L 235 175 V 230",
    junctions: [
      { x: 120, y: 130, kind: "solid" },
      { x: 190, y: 130, kind: "hollow" },
      { x: 235, y: 230, kind: "glow" },
    ],
  },
  {
    d: "M 700 140 H 780 V 195 H 860 L 910 240",
    junctions: [
      { x: 780, y: 140, kind: "hollow" },
      { x: 860, y: 195, kind: "solid" },
      { x: 910, y: 240, kind: "glow" },
    ],
  },
  {
    d: "M 55 410 H 130 V 465 H 200",
    junctions: [
      { x: 130, y: 410, kind: "solid" },
      { x: 200, y: 465, kind: "hollow" },
    ],
  },
  {
    d: "M 400 50 H 470 V 95 H 540 L 580 135",
    junctions: [
      { x: 470, y: 50, kind: "solid" },
      { x: 540, y: 95, kind: "hollow" },
      { x: 580, y: 135, kind: "glow" },
    ],
  },
  {
    d: "M 820 320 H 890 V 380 H 955",
    junctions: [
      { x: 890, y: 320, kind: "solid" },
      { x: 955, y: 380, kind: "glow" },
    ],
  },
  {
    d: "M 160 520 H 240 V 565 H 320",
    junctions: [
      { x: 240, y: 520, kind: "hollow" },
      { x: 320, y: 565, kind: "solid" },
    ],
  },
  {
    d: "M 980 200 V 270 H 1025 V 350",
    junctions: [
      { x: 980, y: 270, kind: "hollow" },
      { x: 1025, y: 350, kind: "glow" },
    ],
  },
  {
    d: "M 330 250 H 410 L 455 295 V 350",
    junctions: [
      { x: 410, y: 250, kind: "solid" },
      { x: 455, y: 295, kind: "hollow" },
      { x: 455, y: 350, kind: "glow" },
    ],
  },
];

/**
 * Idle interconnect geometry in a 1100×620 viewBox.
 * Links the five outcome pads with engineered 90°/45° routes.
 */
const IDLE_TRACES: TraceSeg[] = [
  {
    d: "M 160 110 H 320 V 70 H 450 H 560",
    junctions: [
      { x: 320, y: 110, kind: "solid" },
      { x: 450, y: 70, kind: "glow" },
      { x: 560, y: 70, kind: "hollow" },
    ],
  },
  {
    d: "M 620 70 H 760 V 150 L 820 210 H 920",
    junctions: [
      { x: 760, y: 70, kind: "solid" },
      { x: 760, y: 150, kind: "hollow" },
      { x: 920, y: 210, kind: "glow" },
    ],
  },
  {
    d: "M 160 190 V 300 H 110 V 390 H 250",
    junctions: [
      { x: 160, y: 300, kind: "solid" },
      { x: 110, y: 390, kind: "hollow" },
      { x: 250, y: 390, kind: "glow" },
    ],
  },
  {
    d: "M 430 190 V 280 H 530 L 580 330 V 420 H 680",
    junctions: [
      { x: 430, y: 280, kind: "solid" },
      { x: 530, y: 280, kind: "hollow" },
      { x: 580, y: 330, kind: "solid" },
      { x: 680, y: 420, kind: "glow" },
    ],
  },
  {
    d: "M 920 250 V 340 H 820 V 470 H 720 L 660 520",
    junctions: [
      { x: 920, y: 340, kind: "solid" },
      { x: 820, y: 340, kind: "hollow" },
      { x: 720, y: 470, kind: "solid" },
      { x: 660, y: 520, kind: "glow" },
    ],
  },
  {
    d: "M 280 470 H 160 V 530 H 70 V 590",
    junctions: [
      { x: 160, y: 470, kind: "solid" },
      { x: 70, y: 530, kind: "hollow" },
      { x: 70, y: 590, kind: "glow" },
    ],
  },
  {
    d: "M 300 150 H 370 L 420 200 H 500",
    junctions: [
      { x: 370, y: 150, kind: "solid" },
      { x: 420, y: 200, kind: "hollow" },
      { x: 500, y: 200, kind: "glow" },
    ],
  },
  {
    d: "M 540 480 H 640 V 540 H 760 L 820 580",
    junctions: [
      { x: 640, y: 480, kind: "solid" },
      { x: 760, y: 540, kind: "hollow" },
      { x: 820, y: 580, kind: "glow" },
    ],
  },
  {
    d: "M 200 250 H 280 V 320 L 340 380",
    junctions: [
      { x: 280, y: 250, kind: "hollow" },
      { x: 280, y: 320, kind: "solid" },
      { x: 340, y: 380, kind: "glow" },
    ],
  },
  {
    d: "M 780 280 H 860 V 360 H 940",
    junctions: [
      { x: 860, y: 280, kind: "solid" },
      { x: 940, y: 360, kind: "glow" },
    ],
  },
];

/**
 * Active link — short run from docked card into the gap before the panel.
 * Must end left of the panel edge (~38% of board) so the terminal isn't cropped.
 */
const ACTIVE_TRACE: TraceSeg = {
  d: "M 286 310 H 400",
  junctions: [
    { x: 286, y: 310, kind: "glow" },
    { x: 400, y: 310, kind: "glow" },
  ],
};

const ACTIVE_TRACES: Record<OutcomeId, TraceSeg> = {
  create: ACTIVE_TRACE,
  modernize: ACTIVE_TRACE,
  automate: ACTIVE_TRACE,
  connect: ACTIVE_TRACE,
  scale: ACTIVE_TRACE,
};

function useIsNarrow(breakpoint = 768) {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return narrow;
}

type Props = {
  /** When true, render the section title inside the component (Calicon). Canvas keeps its own heading. */
  showTitle?: boolean;
  className?: string;
};

export function OutcomesCircuitBoard({
  showTitle = false,
  className = "",
}: Props) {
  const reducedHook = usePrefersReducedMotion();
  const reducedMotion = useReducedMotion();
  const reduced = reducedHook || Boolean(reducedMotion);
  const narrow = useIsNarrow();
  const boardRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState({ w: 1, h: 1 });
  const [selectedId, setSelectedId] = useState<OutcomeId | null>(null);
  const [panelReady, setPanelReady] = useState(false);
  const [tracesReady, setTracesReady] = useState(false);
  const genRef = useRef(0);
  const scrollAnimRef = useRef<number | null>(null);
  const scrollBehaviorPrevRef = useRef<string>("");
  const uid = useId();

  const releaseScrollBehavior = useCallback(() => {
    if (typeof document === "undefined") return;
    document.documentElement.style.scrollBehavior = scrollBehaviorPrevRef.current;
  }, []);

  const lockScrollBehavior = useCallback(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (root.style.scrollBehavior !== "auto") {
      scrollBehaviorPrevRef.current = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
    }
  }, []);

  const cancelScrollAnim = useCallback(() => {
    if (scrollAnimRef.current != null) {
      window.cancelAnimationFrame(scrollAnimRef.current);
      scrollAnimRef.current = null;
    }
    releaseScrollBehavior();
  }, [releaseScrollBehavior]);

  /**
   * Single live-tracking scroll: each frame re-reads the board rect (which grows
   * while active) and eases toward that moving target — no mid-flight restarts.
   */
  const followBoardIntoView = useCallback(
    (duration = DUR.scroll) => {
      const stage = boardRef.current;
      if (!stage) return;

      const idealTop = () => {
        const board =
          stage.querySelector<HTMLElement>(".outcomes-circuit__board") ??
          stage;
        const rect = board.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const margin = Math.min(12, Math.round(vh * 0.012));
        let next =
          rect.height >= vh * 0.82
            ? window.scrollY + rect.top - margin
            : window.scrollY + rect.top - (vh - rect.height) / 2;
        const maxScroll = Math.max(
          0,
          (document.documentElement.scrollHeight ||
            document.body.scrollHeight) - vh,
        );
        return Math.max(0, Math.min(next, maxScroll));
      };

      if (reduced) {
        cancelScrollAnim();
        lockScrollBehavior();
        window.scrollTo({ top: idealTop(), behavior: "auto" });
        releaseScrollBehavior();
        return;
      }

      cancelScrollAnim();
      lockScrollBehavior();

      const startY = window.scrollY;
      const t0 = performance.now();
      const settleMs = 320;

      const step = (now: number) => {
        const ideal = idealTop();
        const elapsed = now - t0;
        const p = Math.min(1, elapsed / duration);

        if (p < 1) {
          // Ease from the original start toward the *live* ideal
          const y = startY + (ideal - startY) * easeOutCubic(p);
          window.scrollTo(0, y);
          scrollAnimRef.current = window.requestAnimationFrame(step);
          return;
        }

        // Short settle tail while the board min-height finishes expanding
        const gap = ideal - window.scrollY;
        if (Math.abs(gap) > 1.5 && elapsed < duration + settleMs) {
          window.scrollTo(0, window.scrollY + gap * 0.22);
          scrollAnimRef.current = window.requestAnimationFrame(step);
          return;
        }

        window.scrollTo(0, ideal);
        scrollAnimRef.current = null;
        releaseScrollBehavior();
      };

      scrollAnimRef.current = window.requestAnimationFrame(step);
    },
    [cancelScrollAnim, lockScrollBehavior, reduced, releaseScrollBehavior],
  );

  useEffect(() => () => cancelScrollAnim(), [cancelScrollAnim]);

  useLayoutEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setBoardSize({ w: r.width || 1, h: r.height || 1 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const selected =
    selectedId == null
      ? null
      : (calicapHomeOutcomes.find((o) => o.id === selectedId) ?? null);
  const isActive = selectedId != null;

  const outcomeIdOf = (raw: string): OutcomeId =>
    isOutcomeId(raw) ? raw : "create";

  const close = useCallback(() => {
    const gen = ++genRef.current;
    cancelScrollAnim();
    setPanelReady(false);
    if (reduced) {
      setTracesReady(false);
      setSelectedId(null);
      return;
    }
    // 1) panel exits right → 2) traces retract → 3) nodes restore
    window.setTimeout(() => {
      if (gen !== genRef.current) return;
      setTracesReady(false);
    }, DUR.panel * 1000 * 0.35);
    window.setTimeout(() => {
      if (gen !== genRef.current) return;
      setSelectedId(null);
    }, DUR.panel * 1000 + DUR.traces * 1000 * 0.45);
  }, [cancelScrollAnim, reduced]);

  // Start one continuous follow-scroll as soon as a card opens (board expands)
  useEffect(() => {
    if (selectedId == null) return;
    followBoardIntoView(DUR.scroll + 120);
  }, [selectedId, followBoardIntoView]);

  // Click empty board / Escape → restore the idle circuit board
  useEffect(() => {
    if (!isActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isActive, close]);

  const open = useCallback(
    (id: OutcomeId) => {
      const gen = ++genRef.current;
      if (selectedId === id) return;
      if (selectedId != null && selectedId !== id) {
        // Swap: retract panel/traces, then open the new node
        setPanelReady(false);
        setTracesReady(false);
        if (reduced) {
          setSelectedId(id);
          setTracesReady(true);
          setPanelReady(true);
          return;
        }
        window.setTimeout(() => {
          if (gen !== genRef.current) return;
          setSelectedId(id);
          window.setTimeout(() => {
            if (gen !== genRef.current) return;
            setTracesReady(true);
          }, DUR.select * 1000 * 0.45);
          window.setTimeout(() => {
            if (gen !== genRef.current) return;
            setPanelReady(true);
          }, DUR.select * 1000 * 0.55);
        }, DUR.panel * 1000 * 0.55);
        return;
      }
      setSelectedId(id);
      if (reduced) {
        setTracesReady(true);
        setPanelReady(true);
        return;
      }
      window.setTimeout(() => {
        if (gen !== genRef.current) return;
        setTracesReady(true);
      }, DUR.exit * 1000 * 0.55);
      window.setTimeout(() => {
        if (gen !== genRef.current) return;
        setPanelReady(true);
      }, DUR.exit * 1000 * 0.7 + DUR.select * 1000 * 0.25);
    },
    [reduced, selectedId],
  );

  const onNodeClick = (id: OutcomeId) => {
    if (selectedId === id) {
      close();
      return;
    }
    open(id);
  };

  const nodeMotion = (id: OutcomeId, index: number) => {
    const layout = NODE_LAYOUT[id];
    if (reduced) {
      if (!isActive) return { x: 0, y: 0, scale: 1, opacity: 1 };
      if (selectedId === id) return { x: 0, y: 0, scale: 1.02, opacity: 1 };
      return { x: 0, y: 0, scale: 1, opacity: 0 };
    }

    if (!isActive) {
      return { x: 0, y: 0, scale: 1, opacity: 1 };
    }

    if (selectedId === id) {
      if (narrow) {
        return { x: 0, y: 0, scale: 1.04, opacity: 1 };
      }
      const dx =
        ((DOCK.left - layout.left) / 100) * boardSize.w +
        (((DOCK.w - layout.w) / 100) * boardSize.w) / 2;
      const dy =
        ((DOCK.top - layout.top) / 100) * boardSize.h +
        (((DOCK.h - layout.h) / 100) * boardSize.h) / 2;
      return { x: dx, y: dy, scale: 1.08, opacity: 1 };
    }

    // Non-selected: decisive exit to the left
    const exitX = -(boardSize.w * 1.15 + index * 36);
    const exitY = (index - 2) * 12;
    return { x: exitX, y: exitY, scale: 0.96, opacity: 1 };
  };

  const activeTrace = selectedId ? ACTIVE_TRACES[selectedId] : null;

  return (
    <div
      className={`outcomes-circuit ${isActive ? "outcomes-circuit--active" : ""} ${className}`}
      data-active={selectedId ?? undefined}
    >
      {showTitle ? (
        <h3 className="outcomes-circuit__title font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-[var(--color-text-strong)]">
          {calicapHomeDiscovery.title}
        </h3>
      ) : null}

      <div
        ref={boardRef}
        className="outcomes-circuit__stage"
        role="group"
        aria-label="Business outcomes"
      >
        <div className="outcomes-circuit__board" aria-hidden={!isActive}>
          {/* Ambient PCB field */}
          <div className="outcomes-circuit__field" aria-hidden />

          {/* Background ambient wires — behind boxes */}
          <svg
            className={`outcomes-circuit__svg outcomes-circuit__svg--ambient ${
              isActive ? "outcomes-circuit__svg--dim" : ""
            }`}
            viewBox="0 0 1100 620"
            preserveAspectRatio="none"
            aria-hidden
          >
            {AMBIENT_TRACES.map((t, i) => (
              <g key={`amb-${i}`}>
                <path
                  d={t.d}
                  className="outcomes-circuit__trace outcomes-circuit__trace--ambient"
                />
                {t.junctions?.map((j, ji) => (
                  <circle
                    key={ji}
                    cx={j.x}
                    cy={j.y}
                    r={j.kind === "glow" ? 3.6 : j.kind === "hollow" ? 3.8 : 2.2}
                    className={`outcomes-circuit__junction outcomes-circuit__junction--ambient outcomes-circuit__junction--${j.kind ?? "solid"}`}
                  />
                ))}
              </g>
            ))}
          </svg>

          {/* Idle interconnect traces */}
          <svg
            className={`outcomes-circuit__svg outcomes-circuit__svg--idle ${
              isActive ? "outcomes-circuit__svg--dim" : ""
            }`}
            viewBox="0 0 1100 620"
            preserveAspectRatio="none"
            aria-hidden
          >
            {IDLE_TRACES.map((t, i) => (
              <g key={`idle-${i}`}>
                <path
                  d={t.d}
                  className="outcomes-circuit__trace outcomes-circuit__trace--idle"
                  pathLength={1}
                />
                {t.junctions?.map((j, ji) => (
                  <circle
                    key={ji}
                    cx={j.x}
                    cy={j.y}
                    r={j.kind === "glow" ? 4.6 : j.kind === "hollow" ? 4.8 : 2.8}
                    className={`outcomes-circuit__junction outcomes-circuit__junction--${j.kind ?? "solid"}`}
                  />
                ))}
              </g>
            ))}
            {!reduced &&
              IDLE_TRACES.map((t, i) => (
                <path
                  key={`pulse-${i}`}
                  d={t.d}
                  className="outcomes-circuit__signal"
                  pathLength={1}
                  style={{ animationDelay: `${(i % 5) * 0.75}s` }}
                />
              ))}
          </svg>

          {/* Active traces toward panel */}
          <AnimatePresence>
            {isActive && activeTrace && tracesReady ? (
              <motion.svg
                key={`active-${selectedId}`}
                className="outcomes-circuit__svg outcomes-circuit__svg--active"
                viewBox="0 0 1100 620"
                preserveAspectRatio="none"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: DUR.settle, ease: easeSettle }}
                aria-hidden
              >
                <motion.path
                  d={activeTrace.d}
                  className="outcomes-circuit__trace outcomes-circuit__trace--active"
                  pathLength={1}
                  initial={reduced ? false : { pathLength: 0, opacity: 0.4 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={reduced ? undefined : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: DUR.traces, ease: easeCircuit }}
                />
                {activeTrace.junctions?.map((j, ji) => {
                  const kind = j.kind ?? (ji === (activeTrace.junctions?.length ?? 0) - 1 ? "glow" : "solid");
                  return (
                    <motion.circle
                      key={ji}
                      cx={j.x}
                      cy={j.y}
                      r={kind === "glow" ? 4 : kind === "hollow" ? 3.8 : 2.4}
                      className={`outcomes-circuit__junction outcomes-circuit__junction--${kind} outcomes-circuit__junction--lit`}
                      initial={reduced ? false : { scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: reduced ? 0 : 0.12 + ji * 0.06,
                        duration: 0.28,
                        ease: easeSettle,
                      }}
                    />
                  );
                })}
                {!reduced ? (
                  <motion.path
                    d={activeTrace.d}
                    className="outcomes-circuit__signal outcomes-circuit__signal--active"
                    pathLength={1}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0.6] }}
                    transition={{
                      duration: DUR.traces + 0.35,
                      ease: easeCircuit,
                      repeat: Infinity,
                      repeatDelay: 1.6,
                    }}
                  />
                ) : null}
              </motion.svg>
            ) : null}
          </AnimatePresence>

          {/* Outcome nodes */}
          <ul className="outcomes-circuit__nodes">
            {calicapHomeOutcomes.map((outcome, index) => {
              const id = outcomeIdOf(outcome.id);
              const layout = NODE_LAYOUT[id];
              const Icon = outcome.icon;
              const isSelected = selectedId === id;
              const isExiting = isActive && !isSelected;
              const motionState = nodeMotion(id, index);

              return (
                <motion.li
                  key={id}
                  className={`outcomes-circuit__node ${
                    isSelected ? "outcomes-circuit__node--selected" : ""
                  } ${isExiting ? "outcomes-circuit__node--exiting" : ""}`}
                  style={
                    narrow
                      ? undefined
                      : {
                          left: `${layout.left}%`,
                          top: `${layout.top}%`,
                          width: `${layout.w}%`,
                          height: `${layout.h}%`,
                        }
                  }
                  initial={false}
                  animate={motionState}
                  transition={
                    reduced
                      ? { duration: 0.01 }
                      : {
                          duration: isExiting ? DUR.exit : DUR.select,
                          ease: easeSettle,
                          delay: isExiting
                            ? index * 0.028
                            : isSelected && isActive
                              ? 0.06
                              : index * 0.018,
                        }
                  }
                >
                  <button
                    type="button"
                    className="outcomes-circuit__node-btn"
                    onClick={() => onNodeClick(id)}
                    aria-pressed={isSelected}
                    aria-expanded={isSelected && panelReady}
                    aria-controls={
                      isSelected ? `${uid}-panel` : undefined
                    }
                  >
                    <span className="outcomes-circuit__node-pad" aria-hidden />
                    <span className="outcomes-circuit__node-pad outcomes-circuit__node-pad--tr" aria-hidden />
                    <span className="outcomes-circuit__node-pad outcomes-circuit__node-pad--bl" aria-hidden />
                    <span className="outcomes-circuit__node-pad outcomes-circuit__node-pad--br" aria-hidden />
                    <span className="outcomes-circuit__node-icon" aria-hidden>
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="outcomes-circuit__node-label">
                      {outcome.label}
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </ul>

          {/* Click-away above nodes, below detail panel */}
          {isActive ? (
            <button
              type="button"
              className="outcomes-circuit__dismiss"
              aria-label="Back to all outcomes"
              onClick={close}
            />
          ) : null}

          {/* Detail panel */}
          <AnimatePresence>
            {selected && panelReady ? (
              <motion.aside
                id={`${uid}-panel`}
                key={`panel-${selected.id}`}
                className="outcomes-circuit__panel"
                role="region"
                aria-label={`${selected.label}: ${selected.value}`}
                onClick={(e) => e.stopPropagation()}
                initial={
                  reduced
                    ? false
                    : narrow
                      ? { opacity: 0, y: 36 }
                      : { opacity: 0, x: "38%" }
                }
                animate={
                  narrow
                    ? { opacity: 1, y: 0 }
                    : { opacity: 1, x: 0 }
                }
                exit={
                  reduced
                    ? undefined
                    : narrow
                      ? { opacity: 0, y: 28 }
                      : { opacity: 0, x: "32%" }
                }
                transition={{
                  duration: reduced ? 0.01 : DUR.panel,
                  ease: easePanel,
                }}
              >
                <div className="outcomes-circuit__panel-inner">
                  <div className="outcomes-circuit__panel-head">
                    <button
                      type="button"
                      className="outcomes-circuit__back"
                      onClick={close}
                    >
                      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                      View all
                    </button>
                    <div className="outcomes-circuit__panel-head-meta">
                      <p className="outcomes-circuit__panel-kicker">
                        {selected.label}
                      </p>
                      <Link
                        href={selected.href}
                        className="outcomes-circuit__panel-cta"
                      >
                        {selected.linkLabel}
                        <ArrowRight
                          className="h-3.5 w-3.5"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="outcomes-circuit__panel-scroll">
                    <PillarEmbeddedView pillarId={selected.primaryPillar} />
                  </div>
                </div>
              </motion.aside>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
