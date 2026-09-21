"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Subtle system cursor — desktop Canvas only */
export function CanvasCursor() {
  const reduced = usePrefersReducedMotion();
  const [fine, setFine] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 280, damping: 28, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 280, damping: 28, mass: 0.2 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest(
        "a, button, [role='button'], input, textarea, select, .canvas-magnetic",
      );
      setHover(Boolean(interactive));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [fine, reduced, x, y]);

  if (!fine || reduced) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[800] mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      aria-hidden
    >
      <motion.div
        className="rounded-full border border-white"
        animate={{
          width: hover ? 36 : 14,
          height: hover ? 36 : 14,
          opacity: hover ? 0.85 : 0.55,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
