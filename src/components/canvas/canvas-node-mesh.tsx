"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Tone = "dark" | "light";

type Props = {
  className?: string;
  /** Dark editorial (Canvas) vs light marketing (Calicon) */
  tone?: Tone;
  /** Overall draw strength 0–1 */
  intensity?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
};

/**
 * Shape.xyz-style sparse white particle mesh.
 * Faithful to their Framer "Lines" config:
 * white circles, link distance ~100, linksOpacity 0.15, linksWidth 1,
 * slow free movement, density-scaled count (~50).
 */
export function CanvasNodeMesh({
  className = "",
  tone = "dark",
  intensity = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

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
    const particles: Particle[] = [];

    const seed = (i: number) => {
      const s = Math.sin(i * 12.9898) * 43758.5453;
      return s - Math.floor(s);
    };

    const targetCount = () => {
      /* Shape: number 50 + densityArea 5000 — scale with stage area */
      const area = Math.max(1, w * h);
      const n = Math.round((area / 5000) * 0.55);
      return Math.max(36, Math.min(64, n));
    };

    const spawn = (i: number): Particle => {
      const a = seed(i) * Math.PI * 2;
      const speed = 0.22 + seed(i + 31) * 0.55; /* ~Shape moveSpeed:1 scaled */
      return {
        x: seed(i + 7) * w,
        y: seed(i + 19) * h,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
        /* opacityType random between min/max — creates depth without 3D */
        opacity: 0.35 + seed(i + 53) * 0.65,
      };
    };

    const rebuild = () => {
      const n = targetCount();
      particles.length = 0;
      for (let i = 0; i < n; i++) particles.push(spawn(i));
    };

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
      rebuild();
    };

    /* Shape linksDistance:100 on ~820px stage → ~12% of min side */
    const linkDistance = () => Math.min(w, h) * 0.14;
    const linkOpacity = 0.15 * intensity;
    const linkWidth = 1;
    const nodeRadius = 1.15;

    const [cr, cg, cb] =
      tone === "dark" ? ([255, 255, 255] as const) : ([71, 85, 105] as const);
    const baseMul = tone === "dark" ? 1 : 0.75;

    const step = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        /* moveOut: "out" — wrap so the field stays full-bleed */
        if (p.x < -4) p.x = w + 4;
        else if (p.x > w + 4) p.x = -4;
        if (p.y < -4) p.y = h + 4;
        else if (p.y > h + 4) p.y = -4;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (w < 2 || h < 2) return;

      const dist = linkDistance();
      const distSq = dist * dist;

      ctx.lineCap = "round";
      ctx.lineWidth = linkWidth;

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > distSq) continue;
          const t = 1 - Math.sqrt(d2) / dist;
          const alpha = linkOpacity * t * t * baseMul;
          if (alpha < 0.01) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha})`;
          ctx.stroke();
        }
      }

      for (const p of particles) {
        const alpha = p.opacity * intensity * baseMul;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.fill();
      }
    };

    const loop = () => {
      if (visible) {
        step();
        draw();
      }
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
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [reduced, intensity, tone]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
