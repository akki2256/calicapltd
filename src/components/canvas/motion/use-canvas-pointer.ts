"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Pointer = { x: number; y: number };

/** Normalized pointer (-0.5…0.5) for subtle visual response. Disabled on touch. */
export function useCanvasPointer(enabled = true) {
  const reduced = usePrefersReducedMotion();
  const [pointer, setPointer] = useState<Pointer>({ x: 0, y: 0 });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || reduced || !fine) return;

    let raf = 0;
    let target = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      target = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
      if (!raf) {
        raf = requestAnimationFrame(() => {
          setPointer(target);
          raf = 0;
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, reduced, fine]);

  return { pointer, active: enabled && !reduced && fine };
}
