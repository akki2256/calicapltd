"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import {
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
    <section className="mt-10" aria-label={DELIVERY_PROCESS.title}>
      <div ref={ref} className="relative">
        <div className="mb-6 h-px w-full overflow-hidden bg-[var(--color-border-subtle)]">
          <motion.div
            className="h-full origin-left bg-[var(--color-accent)]"
            style={{ scaleX: path }}
            aria-hidden
          />
        </div>
        <ol className="grid gap-0 sm:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = reduced || i <= active;
            const isCurrent = reduced || i === active;
            return (
              <motion.li
                key={step.n}
                className="relative border-t border-[var(--color-border-subtle)] py-5 sm:border-l sm:border-t-0 sm:px-4 sm:first:border-l-0 sm:first:pl-0"
                animate={{ opacity: isActive ? 1 : 0.32 }}
                transition={{ duration: canvasDur.fast, ease: canvasEase }}
                onMouseEnter={() => setActive(i)}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    className={`h-3.5 w-3.5 shrink-0 ${
                      isCurrent ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"
                    }`}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span
                    className={`font-[family-name:var(--font-display)] text-lg ${
                      isCurrent
                        ? "text-[var(--color-text-strong)]"
                        : "text-[var(--color-text-muted)]"
                    }`}
                  >
                    {step.t}
                  </span>
                </div>
                <p
                  className={`mt-2 text-sm font-medium ${
                    isCurrent
                      ? "text-[var(--color-text-strong)]"
                      : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {step.lead}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span
                        className={`mt-[0.55em] h-1 w-1 shrink-0 rounded-full ${
                          isCurrent ? "bg-[var(--color-accent)]" : "bg-[var(--color-text-muted)]"
                        }`}
                        aria-hidden
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function CanvasDeliveryPractices() {
  return (
    <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-[var(--color-border-subtle)] pt-10 sm:grid-cols-2 lg:grid-cols-3">
      {DELIVERY_PRACTICES.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="border-l border-[var(--color-accent)]/35 pl-3.5">
            <dt className="flex items-center gap-2">
              <Icon
                className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]"
                strokeWidth={1.75}
                aria-hidden
              />
              <span className="canvas-micro text-[var(--color-text-muted)]">{item.label}</span>
            </dt>
            <dd className="mt-2 font-[family-name:var(--font-display)] text-base tracking-[-0.02em] text-[var(--color-text-strong)]">
              {item.lead}
            </dd>
            <dd className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {item.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

/** Process steps — About. */
export function DeliveryProcess() {
  return <CanvasDeliveryProcess />;
}

/** Practice principles grid — Services. */
export function DeliveryPractices() {
  return <CanvasDeliveryPractices />;
}
