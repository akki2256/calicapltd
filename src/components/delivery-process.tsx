"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ThemeSplit } from "@/components/theme-split";
import {
  CanvasReveal,
  CanvasSectionTransition,
  canvasDur,
  canvasEase,
} from "@/components/canvas/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  DELIVERY_PRACTICES,
  DELIVERY_PROCESS,
} from "@/lib/delivery-architecture";

function CanvasDeliveryProcess() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const steps = DELIVERY_PROCESS.steps;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.25"],
  });
  const path = useSpring(scrollYProgress, { stiffness: 85, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduced) return;
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  return (
    <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
      <CanvasReveal variant="riseSoft">
        <p className="canvas-micro text-[var(--color-accent)]">{DELIVERY_PROCESS.eyebrow}</p>
      </CanvasReveal>
      <CanvasSectionTransition variant="clipUp" className="mt-3">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]">
          {DELIVERY_PROCESS.title}
        </h2>
      </CanvasSectionTransition>
      <CanvasReveal variant="blurIn" delay={0.08} className="mt-4 max-w-xl">
        <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
          {DELIVERY_PROCESS.intro}
        </p>
      </CanvasReveal>

      <div ref={ref} className="relative mt-12">
        <div className="mb-8 h-px w-full overflow-hidden bg-[var(--color-border-subtle)]">
          <motion.div
            className="h-full origin-left bg-[var(--color-accent)]"
            style={{ scaleX: path }}
            aria-hidden
          />
        </div>
        <ol>
          {steps.map((step, i) => {
            const isActive = reduced || i <= active;
            const isCurrent = reduced || i === active;
            return (
              <motion.li
                key={step.n}
                className="grid grid-cols-[3rem_1fr] gap-6 border-t border-[var(--color-border-subtle)] py-7 sm:grid-cols-[4rem_8rem_1fr] sm:gap-10"
                animate={{
                  opacity: isActive ? 1 : 0.28,
                  x: isCurrent ? 0 : -6,
                }}
                transition={{ duration: canvasDur.fast, ease: canvasEase }}
                onMouseEnter={() => setActive(i)}
              >
                <span
                  className={`font-mono text-xs ${
                    isCurrent ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {step.n}
                </span>
                <span
                  className={`font-[family-name:var(--font-display)] text-lg ${
                    isCurrent
                      ? "text-[var(--color-text-strong)]"
                      : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {step.t}
                </span>
                <span className="col-span-2 text-sm leading-relaxed text-[var(--color-text-muted)] sm:col-span-1">
                  {step.d}
                </span>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">
        {DELIVERY_PROCESS.principle}
      </p>

      <dl className="mt-12 grid gap-8 border-t border-[var(--color-border-subtle)] pt-10 sm:grid-cols-2">
        {DELIVERY_PRACTICES.map((item) => (
          <div key={item.label}>
            <dt className="canvas-micro text-[var(--color-text-muted)]">{item.label}</dt>
            <dd className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function CaliconDeliveryProcess() {
  const steps = DELIVERY_PROCESS.steps;

  return (
    <section className="mt-10 max-w-2xl">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        {DELIVERY_PROCESS.title}
      </h2>
      <p className="mt-3 text-sm text-slate-500">{DELIVERY_PROCESS.intro}</p>
      <ol className="mt-6 space-y-4">
        {steps.map((step) => (
          <li key={step.n} className="flex gap-3">
            <span className="text-xs font-mono text-gold-600">{step.n}</span>
            <div>
              <p className="font-medium text-slate-800">{step.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.d}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-sm leading-relaxed text-slate-600">
        {DELIVERY_PROCESS.principle}
      </p>
      <dl className="mt-8 grid gap-6 border-t border-[var(--color-border-subtle)] pt-8 sm:grid-cols-2">
        {DELIVERY_PRACTICES.map((item) => (
          <div key={item.label}>
            <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {item.label}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-600">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Full delivery process — About. Complements the customer journey, does not replace it. */
export function DeliveryProcess() {
  return (
    <ThemeSplit canvas={<CanvasDeliveryProcess />} calicon={<CaliconDeliveryProcess />} />
  );
}
