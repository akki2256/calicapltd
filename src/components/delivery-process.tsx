"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ThemeSplit } from "@/components/theme-split";
import {
  CanvasTextScrub,
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
    <section className="mt-14 border-t border-[var(--color-border-subtle)] pt-10">
      <CanvasTextScrub
        as="h2"
        text={DELIVERY_PROCESS.title}
        className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
      />

      <div ref={ref} className="relative mt-8">
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

/** Calicon: timeline — no card chrome */
function CaliconDeliveryProcess() {
  const steps = DELIVERY_PROCESS.steps;
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const step = steps[active];
  const StepIcon = step.icon;

  return (
    <section className="mt-12">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        {DELIVERY_PROCESS.title}
      </h2>

      {/* Timeline rail */}
      <div className="relative mt-8">
        <div
          className="pointer-events-none absolute left-0 right-0 top-[1.125rem] hidden h-px bg-[var(--color-border-subtle)] sm:block"
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute left-0 top-[1.125rem] hidden h-px origin-left bg-gold-600 sm:block"
          style={{
            width: `${(active / Math.max(steps.length - 1, 1)) * 100}%`,
          }}
          aria-hidden
        />
        <ol className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-0">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isActive = active === index;
            return (
              <li key={s.n} className="relative">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  className="group flex w-full flex-col items-start text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] sm:items-center sm:text-center"
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    className={`relative z-[1] flex h-9 w-9 items-center justify-center rounded-full border transition duration-300 ${
                      isActive
                        ? "border-gold-600 bg-gold-600 text-[var(--color-btn-primary-text)] shadow-[0_0_0_4px_var(--color-accent-soft)]"
                        : "border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-slate-500 group-hover:border-gold-500/50 group-hover:text-gold-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <span
                    className={`mt-3 font-[family-name:var(--font-display)] text-base transition ${
                      isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-800"
                    }`}
                  >
                    {s.t}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Single detail stage */}
      <div className="mt-8 min-h-[7.5rem] border-t border-[var(--color-border-subtle)] pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.n}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6"
          >
            <div className="flex items-center gap-2 sm:pt-1">
              <StepIcon className="h-5 w-5 text-gold-600" strokeWidth={1.75} aria-hidden />
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] text-xl text-slate-900">
                {step.t}
                <span className="mx-2 text-gold-600/50" aria-hidden>
                  ·
                </span>
                <span className="text-base font-medium text-slate-700">{step.lead}</span>
              </p>
              <ul className="mt-3 max-w-2xl space-y-1.5 text-sm leading-relaxed text-slate-600">
                {step.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-gold-600" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function CanvasDeliveryPractices() {
  return (
    <dl className="mt-14 grid gap-x-8 gap-y-6 border-t border-[var(--color-border-subtle)] pt-10 sm:grid-cols-2 lg:grid-cols-3">
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

function CaliconDeliveryPractices() {
  const reduced = usePrefersReducedMotion();
  const [practiceIndex, setPracticeIndex] = useState(0);
  const practice = DELIVERY_PRACTICES[practiceIndex];
  const PracticeIcon = practice.icon;

  return (
    <div className="mt-12 grid gap-8 border-t border-[var(--color-border-subtle)] pt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
      <ul className="divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
        {DELIVERY_PRACTICES.map((item, index) => {
          const Icon = item.icon;
          const isActive = practiceIndex === index;
          return (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => setPracticeIndex(index)}
                onMouseEnter={() => setPracticeIndex(index)}
                className={`flex w-full items-center gap-3 py-3.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
                  isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-800"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${isActive ? "text-gold-600" : "text-slate-400"}`}
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                  {item.label}
                </span>
                <span
                  className={`ml-auto hidden max-w-[14rem] truncate text-sm sm:block ${
                    isActive ? "text-slate-700" : "text-slate-400"
                  }`}
                >
                  {item.lead}
                </span>
                {isActive ? (
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
                ) : (
                  <span className="w-3.5 shrink-0" aria-hidden />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence mode="wait">
        <motion.div
          key={practice.label}
          initial={reduced ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? undefined : { opacity: 0, x: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pt-1"
        >
          <div className="flex items-center gap-2">
            <PracticeIcon className="h-5 w-5 text-gold-600" strokeWidth={1.75} aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {practice.label}
            </p>
          </div>
          <p className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-snug tracking-tight text-slate-900">
            {practice.lead}
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600">{practice.value}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Process steps — About. */
export function DeliveryProcess() {
  return (
    <ThemeSplit canvas={<CanvasDeliveryProcess />} calicon={<CaliconDeliveryProcess />} />
  );
}

/** Practice principles grid — Services. */
export function DeliveryPractices() {
  return (
    <ThemeSplit canvas={<CanvasDeliveryPractices />} calicon={<CaliconDeliveryPractices />} />
  );
}
