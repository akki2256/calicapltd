"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  className?: string;
};

/**
 * Legal & governance backdrop (Terms & Conditions, Privacy Policy):
 * a quiet architectural folio grid with breathing registration crosshairs,
 * a slow right-flank compass meridian tied to scroll depth, and soft
 * pointer illumination. Kept serene so long-form legal text stays crisp.
 */
export function CanvasLegalField({ className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const canvas = document.createElement("canvas");
    canvas.className = "canvas-legal-field__canvas";
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.pointerEvents = "none";
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    wrap.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let disposed = false;
    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const pointer = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      nx: 0,
      ny: 0,
      tnx: 0,
      tny: 0,
      hover: 0,
      hoverTarget: 0,
    };

    const scroll = {
      current: 0,
      target: 0,
    };

    const readScrollProgress = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      return Math.max(0, Math.min(1, window.scrollY / max));
    };

    const resize = () => {
      const nextW = wrap.clientWidth;
      const nextH = wrap.clientHeight;
      if (nextW < 2 || nextH < 2) return;
      w = nextW;
      h = nextH;
      dpr = Math.min(window.devicePixelRatio || 1, w < 768 ? 1.5 : 1.75);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scroll.target = readScrollProgress();
      if (reduced) drawFrame(0);
    };

    const onScroll = () => {
      scroll.target = readScrollProgress();
      if (reduced && raf === 0) raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) {
        pointer.hoverTarget = 0;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      pointer.hoverTarget = inside ? 1 : 0;
      if (!inside) return;

      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
      pointer.tnx = (pointer.tx / rect.width) * 2 - 1;
      pointer.tny = (pointer.ty / rect.height) * 2 - 1;

      if (reduced && raf === 0) raf = requestAnimationFrame(tick);
    };

    const drawFrame = (now: number) => {
      if (w < 2 || h < 2) return;
      const t = reduced ? 0 : now * 0.001;
      ctx.clearRect(0, 0, w, h);

      const mobile = w < 768;
      const step = mobile ? 56 : 72;
      const sc = scroll.current;
      const hover = pointer.hover;
      const px = pointer.x;
      const py = pointer.y;

      // Subtle vertical ledger drift tied to scroll depth
      const yOffset = -((sc * 180) % step);

      // 1. Soft radial pointer aura
      if (hover > 0.01) {
        const aura = ctx.createRadialGradient(px, py, 0, px, py, mobile ? 190 : 280);
        aura.addColorStop(0, `rgba(138, 171, 188, ${0.075 * hover})`);
        aura.addColorStop(0.55, `rgba(138, 171, 188, ${0.025 * hover})`);
        aura.addColorStop(1, "rgba(138, 171, 188, 0)");
        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, w, h);
      }

      // 2. Architectural folio hairline grid (quieter under left reading column)
      const cols = Math.ceil(w / step) + 1;
      const rows = Math.ceil(h / step) + 2;

      ctx.lineWidth = 1;
      for (let c = 0; c <= cols; c++) {
        const x = Math.round(c * step) + 0.5;
        const xRatio = x / w;
        const zoneWeight = 0.45 + 0.55 * Math.min(1, Math.max(0, (xRatio - 0.12) / 0.72));
        const distX = hover > 0.01 ? Math.abs(x - px) : 9999;
        const prox = hover > 0.01 ? Math.max(0, 1 - distX / 210) * hover : 0;

        const alpha = 0.024 * zoneWeight + prox * 0.045;
        ctx.strokeStyle =
          prox > 0.15
            ? `rgba(138, 171, 188, ${alpha})`
            : `rgba(242, 242, 240, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let r = 0; r <= rows; r++) {
        const y = Math.round(r * step + yOffset) + 0.5;
        if (y < -2 || y > h + 2) continue;
        const distY = hover > 0.01 ? Math.abs(y - py) : 9999;
        const prox = hover > 0.01 ? Math.max(0, 1 - distY / 210) * hover : 0;

        const alpha = 0.022 + prox * 0.042;
        ctx.strokeStyle =
          prox > 0.15
            ? `rgba(138, 171, 188, ${alpha})`
            : `rgba(242, 242, 240, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 3. Precision registration crosshairs (+) with slow phase wave + pointer illumination
      const hoverRadius = mobile ? 170 : 250;
      for (let r = 0; r <= rows; r++) {
        const y = r * step + yOffset;
        if (y < -8 || y > h + 8) continue;

        for (let c = 0; c <= cols; c++) {
          const x = c * step;
          const xRatio = x / w;
          const edgeFade =
            Math.min(1, Math.min(xRatio / 0.12, (1 - xRatio) / 0.08)) *
            Math.min(1, Math.min((y + 8) / (h * 0.12), (h - y + 8) / (h * 0.12)));
          if (edgeFade <= 0.02) continue;

          const wave = Math.sin(c * 0.55 + r * 0.4 - t * 0.65) * 0.5 + 0.5;
          const dx = x - px;
          const dy = y - py;
          const dist = Math.hypot(dx, dy);
          const prox = hover > 0.01 ? Math.max(0, 1 - dist / hoverRadius) * hover : 0;
          const easeProx = prox * prox;

          const quietZone = 0.38 + 0.62 * Math.min(1, Math.max(0, (xRatio - 0.18) / 0.62));
          const tickAlpha = edgeFade * quietZone * (0.06 + wave * 0.075) + easeProx * 0.42;
          const arm = 2.5 + wave * 0.9 + easeProx * 3.8;

          ctx.strokeStyle =
            easeProx > 0.12
              ? `rgba(168, 203, 224, ${Math.min(0.68, tickAlpha)})`
              : `rgba(242, 242, 240, ${Math.min(0.28, tickAlpha)})`;
          ctx.lineWidth = easeProx > 0.25 ? 1.25 : 1;

          ctx.beginPath();
          ctx.moveTo(x - arm, y);
          ctx.lineTo(x + arm, y);
          ctx.moveTo(x, y - arm);
          ctx.lineTo(x, y + arm);
          ctx.stroke();

          if (easeProx > 0.35) {
            ctx.fillStyle = `rgba(245, 245, 243, ${easeProx * 0.55})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.35, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 4. Right-flank governance compass / seal arcs & scroll meridian
      const cx = (mobile ? w * 0.86 : w * 0.78) + pointer.nx * (mobile ? 6 : 16);
      const cy = h * 0.46 + pointer.ny * (mobile ? 5 : 12) - (sc - 0.5) * 32;
      const baseR = Math.min(w, h) * (mobile ? 0.22 : 0.26);

      ctx.save();
      ctx.translate(cx, cy);

      // Outer quiet ring
      ctx.strokeStyle = `rgba(138, 171, 188, ${0.075 + hover * 0.03})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, baseR, 0, Math.PI * 2);
      ctx.stroke();

      // Slowly counter-rotating broken seal arcs
      const a1 = t * 0.045 + sc * 0.65;
      ctx.strokeStyle = `rgba(138, 171, 188, ${0.14 + hover * 0.06})`;
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 0.78, a1, a1 + Math.PI * 0.85);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 0.78, a1 + Math.PI * 1.1, a1 + Math.PI * 1.78);
      ctx.stroke();

      const a2 = -t * 0.032 - sc * 0.4;
      ctx.strokeStyle = `rgba(242, 242, 240, ${0.08 + hover * 0.04})`;
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 0.54, a2, a2 + Math.PI * 1.15);
      ctx.stroke();

      // 12 radial index ticks along outer ring
      ctx.strokeStyle = "rgba(138, 171, 188, 0.13)";
      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * Math.PI * 2 + a2 * 0.35;
        const inner = i % 3 === 0 ? baseR * 0.91 : baseR * 0.95;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * inner, Math.sin(ang) * inner);
        ctx.lineTo(Math.cos(ang) * baseR, Math.sin(ang) * baseR);
        ctx.stroke();
      }

      ctx.restore();

      // 5. Right-margin reading meridian (desktop / tablet)
      if (!mobile) {
        const railX = Math.round(w * 0.915) + 0.5;
        const railTop = h * 0.16;
        const railBottom = h * 0.84;
        const railSpan = railBottom - railTop;

        ctx.strokeStyle = "rgba(242, 242, 240, 0.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(railX, railTop);
        ctx.lineTo(railX, railBottom);
        ctx.stroke();

        // Graduated folio ticks along meridian
        const ticks = 16;
        for (let i = 0; i <= ticks; i++) {
          const ty = railTop + (i / ticks) * railSpan;
          const major = i % 4 === 0;
          ctx.strokeStyle = major
            ? "rgba(138, 171, 188, 0.18)"
            : "rgba(242, 242, 240, 0.07)";
          ctx.beginPath();
          ctx.moveTo(railX - (major ? 7 : 3.5), ty);
          ctx.lineTo(railX + (major ? 3 : 0), ty);
          ctx.stroke();
        }

        // Active scroll indicator along the meridian
        const markerY = railTop + sc * railSpan;
        ctx.strokeStyle = "rgba(138, 171, 188, 0.48)";
        ctx.beginPath();
        ctx.moveTo(railX - 12, markerY);
        ctx.lineTo(railX + 6, markerY);
        ctx.stroke();

        ctx.fillStyle = "rgba(245, 245, 243, 0.72)";
        ctx.beginPath();
        ctx.arc(railX, markerY, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 6. Subtle drafting cursor hairlines on active hover
      if (hover > 0.02 && !mobile) {
        ctx.strokeStyle = `rgba(138, 171, 188, ${0.045 * hover})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, h);
        ctx.moveTo(0, py);
        ctx.lineTo(w, py);
        ctx.stroke();
      }
    };

    const settled = () =>
      Math.abs(pointer.tx - pointer.x) < 0.3 &&
      Math.abs(pointer.ty - pointer.y) < 0.3 &&
      Math.abs(pointer.hoverTarget - pointer.hover) < 0.008 &&
      Math.abs(scroll.target - scroll.current) < 0.002;

    const tick = (now: number) => {
      if (disposed) return;

      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      pointer.nx += (pointer.tnx - pointer.nx) * 0.08;
      pointer.ny += (pointer.tny - pointer.ny) * 0.08;
      pointer.hover += (pointer.hoverTarget - pointer.hover) * 0.08;
      scroll.current += (scroll.target - scroll.current) * 0.1;

      if (visible && document.visibilityState === "visible") {
        drawFrame(now);
      }

      if (!reduced || !settled()) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    scroll.current = readScrollProgress();
    scroll.target = scroll.current;
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
        if (visible && reduced) drawFrame(0);
      },
      { threshold: 0.02 },
    );
    io.observe(wrap);

    if (reduced) drawFrame(0);
    else raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (canvas.parentElement === wrap) wrap.removeChild(canvas);
    };
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className={`canvas-legal-field__stage ${className}`.trim()}
      aria-hidden
    />
  );
}
