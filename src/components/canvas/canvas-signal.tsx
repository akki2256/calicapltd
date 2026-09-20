"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Pointer = { x: number; y: number };

/**
 * Art-directed digital architecture — ambient + optional pointer depth.
 * Not a particle network.
 */
export function CanvasSignal({
  className = "",
  pointer,
}: {
  className?: string;
  pointer?: Pointer;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const pointerRef = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    if (pointer) pointerRef.current = pointer;
  }, [pointer]);

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
      if (animate) t += 0.007;
      ctx.clearRect(0, 0, w, h);

      const px = pointerRef.current.x;
      const py = pointerRef.current.y;
      const cx = w * 0.58 + px * w * 0.04;
      const cy = h * 0.48 + py * h * 0.03;
      const accent =
        getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() ||
        "#8aabbc";

      const depth = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.55);
      depth.addColorStop(0, "rgba(138, 171, 188, 0.08)");
      depth.addColorStop(0.45, "rgba(255,255,255,0.02)");
      depth.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = depth;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(242,242,240,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.08, cy);
      ctx.lineTo(w * 0.92, cy);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, h * 0.12);
      ctx.lineTo(cx, h * 0.88);
      ctx.stroke();

      const planes = [
        { x: cx - w * 0.22, y: cy - h * 0.18, ww: w * 0.28, hh: h * 0.12, a: 0.06 },
        { x: cx - w * 0.08, y: cy - h * 0.08, ww: w * 0.34, hh: h * 0.22, a: 0.09 },
        { x: cx + w * 0.02, y: cy + h * 0.02, ww: w * 0.26, hh: h * 0.16, a: 0.12 },
      ];

      planes.forEach((p, i) => {
        const drift = animate ? Math.sin(t + i * 0.9) * 5 : 0;
        const breath = animate ? Math.sin(t * 0.55 + i) * 2 : 0;
        ctx.strokeStyle = `rgba(242,242,240,${p.a + 0.08})`;
        ctx.fillStyle = `rgba(242,242,240,${p.a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(p.x + breath, p.y + drift, p.ww, p.hh);
        ctx.fill();
        ctx.stroke();
      });

      const r = Math.min(w, h) * 0.2;
      const rot = animate ? t * 0.32 : 0.4;
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.arc(cx + w * 0.06, cy - h * 0.04, r, rot, rot + Math.PI * 1.15);
      ctx.stroke();
      ctx.globalAlpha = 0.22;
      ctx.beginPath();
      ctx.arc(cx + w * 0.06, cy - h * 0.04, r * 0.72, rot + 1, rot + Math.PI * 0.85);
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.strokeStyle = "rgba(242,242,240,0.18)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const x = w * 0.12 + i * (w * 0.08);
        ctx.beginPath();
        ctx.moveTo(x, cy - 5);
        ctx.lineTo(x, cy + 5);
        ctx.stroke();
      }

      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(
        cx + w * 0.06 + Math.cos(rot) * r,
        cy - h * 0.04 + Math.sin(rot) * r,
        2.5,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      ctx.fillStyle = "rgba(242,242,240,0.35)";
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillText("SYS · 01", w * 0.12, h * 0.18);
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
      { threshold: 0.05 },
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
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
