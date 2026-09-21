"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type SceneContextValue = {
  progress: MotionValue<number>;
  smooth: MotionValue<number>;
  reduced: boolean;
  ref: RefObject<HTMLElement | null>;
};

const SceneContext = createContext<SceneContextValue | null>(null);

export function useCanvasScrollScene() {
  const ctx = useContext(SceneContext);
  if (!ctx) {
    throw new Error("useCanvasScrollScene must be used within CanvasScrollScene");
  }
  return ctx;
}

export function useCanvasScrollSceneOptional() {
  return useContext(SceneContext);
}

type SceneProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Scroll mapping for progress 0→1 */
  offset?: [string, string];
  as?: "section" | "div" | "article";
};

/** Provides section-local scroll progress (0–1) to children */
export function CanvasScrollScene({
  children,
  className,
  id,
  offset = ["start end", "end start"],
  as = "section",
}: SceneProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // @ts-expect-error motion offset tuple
    offset,
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 32,
    mass: 0.35,
  });

  const value = useMemo(
    () => ({ progress: scrollYProgress, smooth, reduced, ref }),
    [scrollYProgress, smooth, reduced],
  );

  const MotionTag = as === "section" ? motion.section : as === "article" ? motion.article : motion.div;

  return (
    <SceneContext.Provider value={value}>
      <MotionTag ref={ref as never} id={id} className={className}>
        {children}
      </MotionTag>
    </SceneContext.Provider>
  );
}

/** Map scene progress to a MotionValue transform */
export function useSceneTransform<T>(
  input: number[],
  output: T[],
  useSmooth = true,
): MotionValue<T> {
  const { progress, smooth } = useCanvasScrollScene();
  const source = useSmooth ? smooth : progress;
  // Hooks must be unconditional — when reduced, still create transform but identity mid
  const transformed = useTransform(source, input, output);
  return transformed;
}

type MapProps = {
  children: ReactNode;
  className?: string;
  /** Progress range */
  from?: number;
  to?: number;
  y?: [number, number];
  x?: [number, number];
  scale?: [number, number];
  opacity?: [number, number];
  rotate?: [number, number];
  rotateX?: [number, number];
  clip?: [string, string];
};

/** Scroll-maps transform props from scene progress */
export function CanvasScrollMap({
  children,
  className,
  from = 0,
  to = 1,
  y,
  x,
  scale,
  opacity,
  rotate,
  rotateX,
  clip,
}: MapProps) {
  const { smooth, reduced } = useCanvasScrollScene();
  const source = smooth;

  const yMv = useTransform(source, [from, to], y ?? [0, 0]);
  const xMv = useTransform(source, [from, to], x ?? [0, 0]);
  const scaleMv = useTransform(source, [from, to], scale ?? [1, 1]);
  const opacityMv = useTransform(source, [from, to], opacity ?? [1, 1]);
  const rotateMv = useTransform(source, [from, to], rotate ?? [0, 0]);
  const rotateXMv = useTransform(source, [from, to], rotateX ?? [0, 0]);
  const clipMv = useTransform(
    source,
    [from, to],
    clip ?? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{
        y: y ? yMv : undefined,
        x: x ? xMv : undefined,
        scale: scale ? scaleMv : undefined,
        opacity: opacity ? opacityMv : undefined,
        rotate: rotate ? rotateMv : undefined,
        rotateX: rotateX ? rotateXMv : undefined,
        clipPath: clip ? clipMv : undefined,
        transformPerspective: rotateX ? 1200 : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}
