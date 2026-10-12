"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { calicapHomeDiscovery, calicapHomeOutcomes } from "@/lib/calicap-home";

/** Timeline rail for home discovery outcomes — Calicon */
export function CaliconOutcomesRail() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const current = calicapHomeOutcomes[active] ?? calicapHomeOutcomes[0];
  const CurrentIcon = current.icon;

  return (
    <div className="mt-12 border-t border-[var(--color-border-subtle)] pt-10">
      <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        {calicapHomeDiscovery.title}
      </h3>

      <div className="relative mt-8">
        <div
          className="pointer-events-none absolute left-0 right-0 top-[1.125rem] hidden h-px bg-[var(--color-border-subtle)] lg:block"
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute left-0 top-[1.125rem] hidden h-px origin-left bg-gold-600 lg:block"
          style={{
            width: `${(active / Math.max(calicapHomeOutcomes.length - 1, 1)) * 100}%`,
          }}
          aria-hidden
        />
        <ol className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0">
          {calicapHomeOutcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            const isActive = active === index;
            return (
              <li key={outcome.label}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  className="group flex w-full flex-col items-start text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] lg:items-center lg:text-center"
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
                  <span className="mt-3 text-[11px] font-mono text-gold-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`mt-1 font-[family-name:var(--font-display)] text-base uppercase tracking-[0.06em] transition ${
                      isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-800"
                    }`}
                  >
                    {outcome.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-8 min-h-[9.5rem] border-t border-[var(--color-border-subtle)] pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.label}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6"
          >
            <div className="flex items-center gap-2 sm:pt-1">
              <CurrentIcon className="h-5 w-5 text-gold-600" strokeWidth={1.75} aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">
                {current.label}
              </span>
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] text-xl text-slate-900">
                {current.value}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                {current.examples.slice(0, 3).map((ex) => (
                  <li key={ex} className="text-sm text-slate-600">
                    <span className="mr-1.5 text-gold-600" aria-hidden>
                      —
                    </span>
                    {ex}
                  </li>
                ))}
              </ul>
              <Link
                href={current.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 transition hover:text-gold-700"
              >
                {current.linkLabel}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
