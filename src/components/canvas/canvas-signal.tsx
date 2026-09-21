"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Pointer = { x: number; y: number };

type Props = {
  className?: string;
  pointer?: Pointer;
  /** Page or section scroll 0–1 */
  scrollProgress?: MotionValue<number>;
  /** Intensity 0–1 for mobile reduction */
  intensity?: number;
};

/**
 * Multi-layer art-directed technology field.
 * Layers: perspective grid, geometry, scanning signal, depth parallax, pointer.
 */
export function CanvasSignal({
  className = "",
  pointer,
  scrollProgress,
  intensity = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const pointerRef = useRef<Pointer>({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    if (pointer) pointerRef.current = pointer;
  }, [pointer]);

  useEffect(() => {
    if (!scrollProgress) return;
    return scrollProgress.on("change", (v) => {
      scrollRef.current = v;
    });
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let t = 0;
    let visible = true;
    const mobile = typeof window !== "undefined" && window.innerWidth < 768;
    const dens = mobile ? 0.55 : intensity;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (animate: boolean) => {
      if (animate) t += 0.006 + scrollRef.current * 0.01;
      ctx.clearRect(0, 0, w, h);

      const px = pointerRef.current.x;
      const py = pointerRef.current.y;
      const sc = scrollRef.current;
      const cx = w * 0.55 + px * w * 0.05 + sc * w * 0.04;
      const cy = h * 0.48 + py * h * 0.04 - sc * h * 0.06;
      const accent =
        getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() ||
        "#8aabbc";

      // Depth glow
      const depth = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.62);
      depth.addColorStop(0, `rgba(138, 171, 188, ${0.06 + sc * 0.05})`);
      depth.addColorStop(0.5, "rgba(255,255,255,0.015)");
      depth.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = depth;
      ctx.fillRect(0, 0, w, h);

      // Layer A — perspective grid
      ctx.save();
      ctx.translate(cx, cy + h * 0.08);
      ctx.transform(1, 0, sc * 0.08, 0.55 + sc * 0.12, 0, 0);
      ctx.strokeStyle = `rgba(242,242,240,${0.05 + dens * 0.04})`;
      ctx.lineWidth = 1;
      const grid = mobile ? 5 : 8;
      const span = Math.max(w, h) * 0.7;
      for (let i = -grid; i <= grid; i++) {
        const o = (i / grid) * span;
        ctx.beginPath();
        ctx.moveTo(-span, o);
        ctx.lineTo(span, o);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(o, -span);
        ctx.lineTo(o, span);
        ctx.stroke();
      }
      ctx.restore();

      // Horizon + measure
      ctx.strokeStyle = "rgba(242,242,240,0.1)";
      ctx.beginPath();
      ctx.moveTo(w * 0.06, cy);
      ctx.lineTo(w * 0.94, cy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, h * 0.1);
      ctx.lineTo(cx, h * 0.9);
      ctx.stroke();

      // Layer B — geometric planes (parallax rates)
      const planes = [
        { ox: -0.24, oy: -0.2, ww: 0.3, hh: 0.14, a: 0.05, rate: 0.4 },
        { ox: -0.1, oy: -0.1, ww: 0.36, hh: 0.24, a: 0.08, rate: 0.7 },
        { ox: 0.04, oy: 0.02, ww: 0.28, hh: 0.18, a: 0.11, rate: 1.1 },
      ];
      planes.forEach((p, i) => {
        const drift = animate ? Math.sin(t * p.rate + i) * (6 + sc * 8) : 0;
        const shiftX = px * (8 + i * 6) + sc * (12 + i * 10);
        const shiftY = py * (6 + i * 4) + drift;
        ctx.strokeStyle = `rgba(242,242,240,${p.a + 0.07})`;
        ctx.fillStyle = `rgba(242,242,240,${p.a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(cx + w * p.ox + shiftX, cy + h * p.oy + shiftY, w * p.ww, h * p.hh);
        ctx.fill();
        ctx.stroke();
      });

      // Layer C — scanning signal
      const scanY = ((t * 40) % (h * 0.7)) + h * 0.15;
      const grad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      grad.addColorStop(0, "rgba(138,171,188,0)");
      grad.addColorStop(0.5, `rgba(138,171,188,${0.18 * dens})`);
      grad.addColorStop(1, "rgba(138,171,188,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(w * 0.08, scanY - 20, w * 0.84, 40);

      // Rings / arcs
      const r = Math.min(w, h) * (0.18 + sc * 0.08);
      const rot = animate ? t * (0.28 + sc * 0.4) : 0.4;
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.arc(cx + w * 0.05, cy - h * 0.03, r, rot, rot + Math.PI * 1.2);
      ctx.stroke();
      ctx.globalAlpha = 0.22;
      ctx.beginPath();
      ctx.arc(cx + w * 0.05, cy - h * 0.03, r * 0.7, rot + 0.8, rot + Math.PI * 0.9);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Nodes along arc
      ctx.fillStyle = accent;
      for (let i = 0; i < 3; i++) {
        const a = rot + i * 0.55;
        ctx.beginPath();
        ctx.arc(
          cx + w * 0.05 + Math.cos(a) * r,
          cy - h * 0.03 + Math.sin(a) * r,
          2.2,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      // Tick marks
      ctx.strokeStyle = "rgba(242,242,240,0.16)";
      for (let i = 0; i < 6; i++) {
        const x = w * 0.1 + i * (w * 0.07);
        ctx.beginPath();
        ctx.moveTo(x, cy - 4);
        ctx.lineTo(x, cy + 4);
        ctx.stroke();
      }

      // System label
      ctx.fillStyle = "rgba(242,242,240,0.4)";
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillText(`SYS · ${String(Math.floor(sc * 99)).padStart(2, "0")}`, w * 0.1, h * 0.16);
      ctx.fillText("FIELD", w * 0.1, h * 0.16 + 14);
    };

    const loop = () => {
      if (visible) drawFrame(true);
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.04 },
    );
    io.observe(canvas);

    if (reduced) {
      drawFrame(false);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [reduced, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
