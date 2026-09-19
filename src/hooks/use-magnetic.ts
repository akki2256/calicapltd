"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type MagneticOptions = {
  /** Max pixel pull toward cursor */
  strength?: number;
  /** Only active when true (e.g. Canvas theme) */
  enabled?: boolean;
};

/**
 * Magnetic pull toward pointer — Canvas CTAs.
 * Returns style + handlers to spread onto the interactive element.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: MagneticOptions = {},
): {
  ref: RefObject<T | null>;
  style: CSSProperties;
  onPointerMove: (event: ReactPointerEvent<T>) => void;
  onPointerLeave: () => void;
} {
  const { strength = 18, enabled = true } = options;
  const reduced = usePrefersReducedMotion();
  const ref = useRef<T | null>(null);
  const frame = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const active = enabled && !reduced;

  const tick = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    current.current.x += (target.current.x - current.current.x) * 0.18;
    current.current.y += (target.current.y - current.current.y) * 0.18;
    el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
    if (
      Math.abs(target.current.x - current.current.x) > 0.05 ||
      Math.abs(target.current.y - current.current.y) > 0.05
    ) {
      frame.current = requestAnimationFrame(tick);
    } else {
      frame.current = null;
    }
  }, []);

  const schedule = useCallback(() => {
    if (frame.current == null) frame.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    return () => {
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      if (!active || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (event.clientX - cx) / (rect.width / 2);
      const dy = (event.clientY - cy) / (rect.height / 2);
      target.current = {
        x: Math.max(-1, Math.min(1, dx)) * strength,
        y: Math.max(-1, Math.min(1, dy)) * strength,
      };
      schedule();
    },
    [active, schedule, strength],
  );

  const onPointerLeave = useCallback(() => {
    target.current = { x: 0, y: 0 };
    schedule();
  }, [schedule]);

  return {
    ref,
    style: active ? { willChange: "transform" } : {},
    onPointerMove,
    onPointerLeave,
  };
}
