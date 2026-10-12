"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  activeIndex: number;
  voiceCount: number;
  className?: string;
};

type NetNode = {
  x: number;
  y: number;
  z: number;
  bx: number;
  by: number;
  ox: number;
  oy: number;
  phase: number;
  speed: number;
  kind: "voice" | "ambient";
  voiceIndex: number;
  bright: number;
  brightTarget: number;
};

type NetEdge = {
  a: number;
  b: number;
  lit: number;
  litTarget: number;
  voiceBias: number;
};

/**
 * Hand-composed constellation (normalized 0–1).
 * Kept in the margins so the quote reading zone stays clear.
 * Voice slots are fixed indices into this set (see VOICE_SLOTS).
 */
const CONSTELLATION: { x: number; y: number; z: number }[] = [
  /* left field */
  { x: 0.06, y: 0.18, z: 0.55 },
  { x: 0.12, y: 0.32, z: 0.7 },
  { x: 0.08, y: 0.48, z: 0.45 },
  { x: 0.14, y: 0.62, z: 0.6 },
  { x: 0.07, y: 0.78, z: 0.4 },
  { x: 0.18, y: 0.88, z: 0.5 },
  /* upper band */
  { x: 0.28, y: 0.1, z: 0.35 },
  { x: 0.42, y: 0.06, z: 0.3 },
  { x: 0.58, y: 0.12, z: 0.45 },
  { x: 0.72, y: 0.08, z: 0.55 },
  /* right field */
  { x: 0.86, y: 0.16, z: 0.65 },
  { x: 0.92, y: 0.3, z: 0.75 },
  { x: 0.88, y: 0.46, z: 0.5 },
  { x: 0.94, y: 0.6, z: 0.7 },
  { x: 0.84, y: 0.74, z: 0.55 },
  { x: 0.9, y: 0.88, z: 0.4 },
  /* lower band */
  { x: 0.32, y: 0.9, z: 0.35 },
  { x: 0.48, y: 0.86, z: 0.45 },
  { x: 0.64, y: 0.92, z: 0.4 },
  /* bridging satellites (still off the quote core) */
  { x: 0.22, y: 0.22, z: 0.5 },
  { x: 0.78, y: 0.38, z: 0.6 },
  { x: 0.7, y: 0.68, z: 0.48 },
  { x: 0.24, y: 0.72, z: 0.42 },
];

/** Which constellation points are the voice nodes for testimonials 0..n */
const VOICE_SLOTS = [1, 11, 14, 17, 20] as const;

/** Explicit edges so the graph reads as designed, not random k-NN soup */
const EDGE_PAIRS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [0, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [12, 13],
  [13, 14],
  [14, 15],
  [5, 16],
  [16, 17],
  [17, 18],
  [18, 15],
  [1, 19],
  [19, 6],
  [11, 20],
  [20, 12],
  [14, 21],
  [21, 17],
  [3, 22],
  [22, 16],
  /* cross-links that activate with voices */
  [1, 11],
  [11, 14],
  [1, 14],
  [19, 20],
  [20, 21],
  [22, 21],
];

function seed(i: number) {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

/**
 * Connected Voices — composed constellation behind Canvas testimonials.
 * No glow blobs. Active voice = slightly brighter point + a few hairline edges.
 */
export function CanvasConnectedVoicesNetwork({
  activeIndex,
  voiceCount,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(activeIndex);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let visible = true;
    let mobile = false;
    let pointerX = 0;
    let pointerY = 0;
    let targetPX = 0;
    let targetPY = 0;
    let finePointer = false;

    const nodes: NetNode[] = [];
    const edges: NetEdge[] = [];
    /** constellation index → nodes array index */
    const indexMap = new Map<number, number>();

    const build = () => {
      nodes.length = 0;
      edges.length = 0;
      indexMap.clear();

      const voices = Math.max(1, Math.min(voiceCount, VOICE_SLOTS.length));
      const voiceSet = new Set<number>(VOICE_SLOTS.slice(0, voices));

      /* On mobile, drop farthest ambient points for clarity */
      const points = mobile
        ? CONSTELLATION.filter((_, i) => voiceSet.has(i) || i % 2 === 0)
        : CONSTELLATION;

      const originalIndex = (p: (typeof CONSTELLATION)[number]) =>
        CONSTELLATION.indexOf(p);

      points.forEach((p, local) => {
        const oi = originalIndex(p);
        const isVoice = voiceSet.has(oi);
        const voiceIndex = isVoice
          ? VOICE_SLOTS.slice(0, voices).indexOf(
              oi as (typeof VOICE_SLOTS)[number],
            )
          : -1;
        indexMap.set(oi, local);
        nodes.push({
          x: p.x * w,
          y: p.y * h,
          z: p.z,
          bx: p.x * w,
          by: p.y * h,
          ox: 0,
          oy: 0,
          phase: seed(oi + 3) * Math.PI * 2,
          speed: 0.08 + seed(oi + 11) * 0.06,
          kind: isVoice ? "voice" : "ambient",
          voiceIndex,
          bright: isVoice && voiceIndex === activeRef.current ? 1 : 0.2,
          brightTarget: isVoice && voiceIndex === activeRef.current ? 1 : 0.2,
        });
      });

      for (const [ia, ib] of EDGE_PAIRS) {
        const a = indexMap.get(ia);
        const b = indexMap.get(ib);
        if (a == null || b == null) continue;
        const na = nodes[a];
        const nb = nodes[b];
        let voiceBias = -1;
        if (na.kind === "voice") voiceBias = na.voiceIndex;
        else if (nb.kind === "voice") voiceBias = nb.voiceIndex;
        edges.push({
          a,
          b,
          lit: 0,
          litTarget: 0,
          voiceBias,
        });
      }

      applyActiveTargets(activeRef.current);
    };

    const applyActiveTargets = (active: number) => {
      const voice = nodes.find(
        (n) => n.kind === "voice" && n.voiceIndex === active,
      );

      for (const n of nodes) {
        if (n.kind === "voice") {
          n.brightTarget = n.voiceIndex === active ? 1 : 0.22;
        } else if (voice) {
          const dx = (n.bx - voice.bx) / Math.max(w, 1);
          const dy = (n.by - voice.by) / Math.max(h, 1);
          const near = Math.max(0, 1 - Math.hypot(dx, dy) / 0.36);
          n.brightTarget = 0.14 + n.z * 0.12 + near * 0.22;
        } else {
          n.brightTarget = 0.14 + n.z * 0.12;
        }
      }

      for (const e of edges) {
        const na = nodes[e.a];
        const nb = nodes[e.b];
        if (!na || !nb) {
          e.litTarget = 0;
          continue;
        }
        const touches =
          (na.kind === "voice" && na.voiceIndex === active) ||
          (nb.kind === "voice" && nb.voiceIndex === active);
        if (touches) {
          e.litTarget = 0.85;
        } else if (e.voiceBias === active) {
          e.litTarget = 0.4;
        } else if (voice) {
          const mx = (na.bx + nb.bx) * 0.5;
          const my = (na.by + nb.by) * 0.5;
          const dx = (mx - voice.bx) / Math.max(w, 1);
          const dy = (my - voice.by) / Math.max(h, 1);
          const near = Math.max(0, 1 - Math.hypot(dx, dy) / 0.32);
          e.litTarget = 0.04 + near * 0.1;
        } else {
          e.litTarget = 0.04;
        }
      }
    };

    const step = (t: number) => {
      applyActiveTargets(activeRef.current);
      pointerX += (targetPX - pointerX) * 0.05;
      pointerY += (targetPY - pointerY) * 0.05;

      const time = t * 0.001;
      for (const n of nodes) {
        const amp = n.kind === "voice" ? 1.6 : 2.8;
        n.ox = Math.sin(time * n.speed + n.phase) * amp * (0.35 + n.z * 0.4);
        n.oy =
          Math.cos(time * n.speed * 0.9 + n.phase * 1.2) * amp * 0.55;
        const para = (0.3 + n.z * 0.5) * (mobile ? 3 : 7);
        n.x = n.bx + n.ox + pointerX * para;
        n.y = n.by + n.oy + pointerY * para * 0.65;
        n.bright += (n.brightTarget - n.bright) * 0.05;
      }
      for (const e of edges) {
        e.lit += (e.litTarget - e.lit) * 0.045;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (w < 2 || h < 2) return;

      ctx.lineCap = "round";

      for (const e of edges) {
        const na = nodes[e.a];
        const nb = nodes[e.b];
        if (!na || !nb) continue;
        const depth = (na.z + nb.z) * 0.5;
        const alpha = (0.045 + e.lit * 0.2) * (0.55 + depth * 0.45);
        if (alpha < 0.02) continue;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.lineWidth = 0.5 + e.lit * 0.35;
        ctx.strokeStyle = `rgba(220, 226, 232, ${alpha})`;
        ctx.stroke();
      }

      for (const n of nodes) {
        const isVoice = n.kind === "voice";
        const r = isVoice ? 1.35 + n.bright * 0.55 : 0.85 + n.z * 0.35;
        const alpha = isVoice
          ? 0.35 + n.bright * 0.5
          : (0.12 + n.bright * 0.35) * (0.5 + n.z * 0.5);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 236, 240, ${alpha})`;
        ctx.fill();
      }
    };

    const paintStatic = () => {
      applyActiveTargets(activeRef.current);
      for (const n of nodes) {
        n.bright = n.brightTarget;
        n.x = n.bx;
        n.y = n.by;
      }
      for (const e of edges) e.lit = e.litTarget;
      draw();
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      mobile = w < 720;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reduced) paintStatic();
    };

    let lastActive = activeRef.current;

    const loop = (t: number) => {
      if (visible) {
        if (reduced) {
          if (activeRef.current !== lastActive) {
            lastActive = activeRef.current;
            paintStatic();
          }
        } else {
          step(t);
          draw();
        }
      }
      raf = requestAnimationFrame(loop);
    };

    const host: HTMLElement | null =
      (canvas.closest(".canvas-testimonials") as HTMLElement | null) ??
      canvas.parentElement;

    const onPointer = (e: PointerEvent) => {
      if (!finePointer || reduced || !host) return;
      const rect = host.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      targetPX = (e.clientX - rect.left) / rect.width - 0.5;
      targetPY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const onPointerLeave = () => {
      targetPX = 0;
      targetPY = 0;
    };

    const mq = window.matchMedia("(pointer: fine)");
    const syncPointer = () => {
      finePointer = mq.matches;
    };
    syncPointer();
    mq.addEventListener("change", syncPointer);

    resize();
    window.addEventListener("resize", resize);
    host?.addEventListener("pointermove", onPointer, { passive: true });
    host?.addEventListener("pointerleave", onPointerLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.04 },
    );
    io.observe(canvas);

    if (reduced) paintStatic();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      mq.removeEventListener("change", syncPointer);
      host?.removeEventListener("pointermove", onPointer);
      host?.removeEventListener("pointerleave", onPointerLeave);
      io.disconnect();
    };
  }, [reduced, voiceCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`canvas-connected-voices pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
