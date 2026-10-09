"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { canvasDur, canvasEase } from "./tokens";
import { useCanvasPointer } from "./use-canvas-pointer";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Enable subtle pointer parallax on desktop */
  pointerDepth?: boolean;
};

/**
 * Clip-path image reveal + optional pointer depth.
 * Observe the unclipped frame — fully clipped elements never intersect the
 * viewport, so whileInView on the clipped node itself stays stuck closed.
 */
export function CanvasImageReveal({
  src,
  alt,
  sizes = "100vw",
  className = "",
  priority = false,
  pointerDepth = true,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -4% 0px",
  });
  const open = reduced || inView;
  const { active } = useCanvasPointer(pointerDepth && !reduced);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 22 });
  const sy = useSpring(my, { stiffness: 80, damping: 22 });
  const scale = useTransform([sx, sy], () => 1.04);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!active) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 12);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={frameRef}
      data-canvas-authored=""
      data-canvas-media=""
      className={`relative overflow-hidden border border-[var(--color-border-subtle)] ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          clipPath: open ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
        }}
        transition={{ duration: canvasDur.slow + 0.15, ease: canvasEase }}
      >
        <motion.div
          className="absolute inset-[-6%]"
          style={
            reduced
              ? undefined
              : {
                  x: sx,
                  y: sy,
                  scale,
                }
          }
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition duration-700"
            sizes={sizes}
            priority={priority}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export function CanvasClipReveal({ children, className }: PanelProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const open = reduced || inView;

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={
        open
          ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 }
          : { clipPath: "inset(12% 12% 12% 12%)", opacity: 0.4, scale: 0.98 }
      }
      transition={{ duration: canvasDur.slow, ease: canvasEase }}
    >
      {children}
    </motion.div>
  );
}
