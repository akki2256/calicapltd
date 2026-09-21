"use client";

import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useRef, useState } from "react";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import {
  CanvasImageReveal,
  CanvasScrollScene,
  CanvasScrollMap,
  CanvasSectionTransition,
  CanvasTextScrub,
  CanvasWordReveal,
  canvasDur,
  canvasEase,
} from "@/components/canvas/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  HOME_POSITIONING_ID,
  calicapHomeCta,
  calicapHomeOutcomes,
  calicapHomePrinciples,
  calicapHomeProcess,
  calicapHomeRecognition,
  calicapHomeServices,
  calicapHomeWorkTeasers,
} from "@/lib/calicap-home";
import { calicapContact } from "@/lib/calicap-contact";
import { siteImages } from "@/lib/site-images";

function ProblemDiagnostics() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = calicapHomeRecognition.examples;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.35"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduced) return;
    setActive(Math.min(items.length - 1, Math.max(0, Math.floor(v * items.length))));
  });

  return (
    <div ref={ref} className="relative mt-12 max-w-2xl">
      <motion.div
        className="absolute bottom-0 left-0 top-0 w-px origin-top bg-[var(--color-accent)]"
        style={{ scaleY: lineScale }}
        aria-hidden
      />
      <ul className="space-y-0 pl-6">
        {items.map((item, i) => {
          const isActive = reduced || i === active;
          return (
            <motion.li
              key={item}
              className="relative border-b border-[var(--color-border-subtle)] py-5"
              animate={{
                opacity: isActive ? 1 : 0.28,
                x: isActive ? 0 : -6,
              }}
              transition={{ duration: canvasDur.fast, ease: canvasEase }}
              onMouseEnter={() => setActive(i)}
            >
              <span className="font-mono text-[10px] text-[var(--color-accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className={`mt-2 text-base leading-relaxed sm:text-lg ${
                  isActive ? "text-[var(--color-text-strong)]" : "text-[var(--color-text-muted)]"
                }`}
              >
                {item}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

function OutcomesRail() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.65", "end 0.3"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduced) return;
    setActive(
      Math.min(
        calicapHomeOutcomes.length - 1,
        Math.max(0, Math.floor(v * calicapHomeOutcomes.length)),
      ),
    );
  });

  const current = calicapHomeOutcomes[active] ?? calicapHomeOutcomes[0];

  return (
    <div ref={ref} className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
      <div>
        <div className="mb-6 h-px w-full overflow-hidden bg-[var(--color-border-subtle)]">
          <motion.div className="h-full origin-left bg-[var(--color-accent)]" style={{ scaleX: fill }} />
        </div>
        <div className="space-y-1">
          {calicapHomeOutcomes.map((o, i) => {
            const isActive = reduced || active === i;
            return (
              <Link
                key={o.label}
                href={o.href}
                onMouseEnter={() => setActive(i)}
                className="group block"
              >
                <motion.div
                  className="flex items-baseline justify-between gap-6 border-b border-[var(--color-border-subtle)] py-5"
                  animate={{
                    opacity: isActive ? 1 : 0.32,
                    x: isActive ? 4 : 0,
                  }}
                  transition={{ duration: canvasDur.fast, ease: canvasEase }}
                >
                  <span
                    className={`font-[family-name:var(--font-display)] text-2xl tracking-[-0.02em] sm:text-4xl ${
                      isActive ? "text-[var(--color-text-strong)]" : "text-[var(--color-text-muted)]"
                    }`}
                  >
                    {o.label}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--color-accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
      <motion.div
        key={current.label}
        className="flex flex-col justify-center border border-[var(--color-border-subtle)] p-8 lg:p-10"
        initial={reduced ? false : { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" }}
        animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: canvasDur.base, ease: canvasEase }}
      >
        <p className="canvas-micro text-[var(--color-accent)]">{current.label}</p>
        <p className="mt-4 font-[family-name:var(--font-display)] text-xl text-[var(--color-text-strong)] sm:text-2xl">
          {current.value}
        </p>
        <ul className="mt-8 space-y-2">
          {current.examples.map((ex) => (
            <li key={ex} className="text-sm text-[var(--color-text-muted)]">
              — {ex}
            </li>
          ))}
        </ul>
        <Link
          href={current.href}
          className="mt-10 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]"
        >
          {current.linkLabel} →
        </Link>
      </motion.div>
    </div>
  );
}

function PillarMark({ kind }: { kind: "build" | "transform" | "automate" | "evolve" }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  if (kind === "build") {
    return (
      <div className="mb-6 flex gap-1" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-8 w-8 border border-[var(--color-accent)]/50"
            initial={{ opacity: 0, y: 16, scale: 0.7 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 + i * 0.14, duration: 0.55, ease: canvasEase }}
          />
        ))}
      </div>
    );
  }
  if (kind === "transform") {
    return (
      <div className="mb-6 relative h-8 w-24" aria-hidden>
        <motion.span
          className="absolute left-0 top-3 h-px w-full bg-[var(--color-text-muted)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          style={{ originX: 0 }}
        />
        <motion.span
          className="absolute left-0 top-3 h-px w-full bg-[var(--color-accent)]"
          initial={{ scaleX: 0, y: 0 }}
          whileInView={{ scaleX: 1, y: -6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7, ease: canvasEase }}
          style={{ originX: 0 }}
        />
      </div>
    );
  }
  if (kind === "automate") {
    return (
      <div className="mb-6 flex items-center gap-3" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <motion.span key={i} className="relative flex items-center">
            <motion.span
              className="block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
              animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.15, 0.8] }}
              transition={{ duration: 1.6, delay: i * 0.22, repeat: Infinity, ease: "easeInOut" }}
            />
            {i < 3 ? (
              <motion.span
                className="ml-3 h-px w-6 origin-left bg-[var(--color-border-subtle)]"
                animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.6, delay: i * 0.22, repeat: Infinity, ease: "easeInOut" }}
              />
            ) : null}
          </motion.span>
        ))}
      </div>
    );
  }
  return (
    <div className="mb-6" aria-hidden>
      <motion.div
        className="h-8 w-8 border border-[var(--color-accent)]/60"
        animate={{ scale: [1, 1.2, 1], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function ProcessJourney() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const steps = calicapHomeProcess.steps;
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
    <div ref={ref} className="relative mt-14">
      <div className="mb-10 h-px w-full overflow-hidden bg-[var(--color-border-subtle)]">
        <motion.div className="h-full origin-left bg-[var(--color-accent)]" style={{ scaleX: path }} />
      </div>
      <ol className="space-y-0">
        {steps.map((s, i) => {
          const isActive = reduced || i <= active;
          const isCurrent = reduced || i === active;
          return (
            <motion.li
              key={s.n}
              className="grid grid-cols-[3.5rem_1fr] gap-6 border-t border-[var(--color-border-subtle)] py-8 sm:grid-cols-[4rem_9rem_1fr] sm:gap-10"
              animate={{
                opacity: isActive ? 1 : 0.25,
                x: isCurrent ? 0 : -6,
              }}
              transition={{ duration: canvasDur.fast, ease: canvasEase }}
              onMouseEnter={() => setActive(i)}
            >
              <span
                className={`font-mono text-xs ${isCurrent ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"}`}
              >
                {s.n}
              </span>
              <span
                className={`font-[family-name:var(--font-display)] text-lg sm:text-xl ${
                  isCurrent ? "text-[var(--color-text-strong)]" : "text-[var(--color-text-muted)]"
                }`}
              >
                {s.t}
              </span>
              <span className="col-span-2 text-sm leading-relaxed text-[var(--color-text-muted)] sm:col-span-1">
                {s.d}
              </span>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

function WhyUsSequence() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = calicapHomePrinciples.slice(0, 5);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.35"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduced) return;
    setActive(Math.min(items.length - 1, Math.max(0, Math.floor(v * items.length))));
  });

  return (
    <div ref={ref} className="mt-12 space-y-0">
      {items.map((p, i) => {
        const isActive = reduced || i === active;
        return (
          <motion.div
            key={p.label}
            className="grid gap-3 border-t border-[var(--color-border-subtle)] py-7 sm:grid-cols-[10rem_1fr] sm:gap-10"
            animate={{
              opacity: isActive ? 1 : 0.35,
              x: isActive ? 0 : -6,
            }}
            transition={{ duration: canvasDur.fast, ease: canvasEase }}
            onMouseEnter={() => setActive(i)}
          >
            <p
              className={`font-[family-name:var(--font-display)] text-lg ${
                isActive ? "text-[var(--color-text-strong)]" : "text-[var(--color-text-muted)]"
              }`}
            >
              {p.label}
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{p.value}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

/**
 * Motion-led Canvas homepage chapter — scroll choreography, not card farm.
 */
export function CanvasHomeChapter() {
  const recognition = calicapHomeRecognition;
  const process = calicapHomeProcess;
  const cta = calicapHomeCta;
  const reduced = usePrefersReducedMotion();
  const kinds = ["build", "transform", "automate", "evolve"] as const;

  return (
    <div className="canvas-chapter">
      {/* Problems */}
      <CanvasScrollScene
        id={HOME_POSITIONING_ID}
        className="canvas-chapter-block scroll-mt-8 border-t border-[var(--color-border-subtle)]"
        offset={["start end", "end start"]}
      >
        <CanvasSectionTransition variant="clipUp">
          <p className="canvas-micro text-[var(--color-accent)]">Position</p>
        </CanvasSectionTransition>
        <CanvasScrollMap y={[40, -20]} opacity={[0.4, 1]} from={0} to={0.45} className="mt-5">
          <CanvasWordReveal
            as="h2"
            text={recognition.title}
            className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[var(--color-text-strong)]"
          />
        </CanvasScrollMap>
        <CanvasSectionTransition variant="blurIn" className="mt-6 max-w-xl">
          <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
            {recognition.intro}
          </p>
        </CanvasSectionTransition>
        <ProblemDiagnostics />
      </CanvasScrollScene>

      {/* Differentiation — cinematic text scrub */}
      <CanvasScrollScene
        id="approach"
        className="canvas-chapter-block border-t border-[var(--color-border-subtle)]"
        offset={["start end", "end start"]}
      >
        <p className="canvas-micro text-[var(--color-accent)]">Approach</p>
        <div className="mt-5">
          <CanvasWordReveal
            as="h2"
            text={recognition.differentiator}
            className="max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[var(--color-text-strong)]"
            emphasize={["understand", "before", "build"]}
          />
        </div>
        <div className="mt-14 max-w-4xl">
          <CanvasTextScrub
            as="p"
            text={recognition.differentiatorLead}
            className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-[1.25] tracking-[-0.03em] text-[var(--color-text-strong)]"
            emphasize={["technology", "achieve"]}
          />
        </div>
        <CanvasSectionTransition variant="riseDepth" className="mt-8 max-w-xl">
          <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
            {recognition.differentiatorBody}
          </p>
        </CanvasSectionTransition>
        <WhyUsSequence />
      </CanvasScrollScene>

      {/* Outcomes */}
      <section
        id="outcomes"
        className="canvas-chapter-block border-t border-[var(--color-border-subtle)]"
      >
        <CanvasSectionTransition variant="wipeRight">
          <p className="canvas-micro text-[var(--color-accent)]">Outcomes</p>
        </CanvasSectionTransition>
        <CanvasSectionTransition variant="clipUp" className="mt-5">
          <h2 className="max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]">
            What do you need to move forward?
          </h2>
        </CanvasSectionTransition>
        <OutcomesRail />
      </section>

      {/* Pillars */}
      <section
        id="practice"
        className="canvas-chapter-block border-t border-[var(--color-border-subtle)]"
      >
        <CanvasSectionTransition variant="clipLeft">
          <p className="canvas-micro text-[var(--color-accent)]">Practice</p>
        </CanvasSectionTransition>
        <CanvasWordReveal
          as="h2"
          text="We build technology around your business."
          className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <div className="mt-14 grid gap-0 lg:grid-cols-2">
          {calicapHomeServices.map((s, i) => (
            <CanvasSectionTransition
              key={s.href}
              variant={i % 2 === 0 ? "clipLeft" : "clipUp"}
              className={`group border border-[var(--color-border-subtle)] p-8 sm:p-10 ${
                i % 2 === 1 ? "lg:border-l-0" : ""
              } ${i > 1 ? "border-t-0" : ""}`}
            >
              <Link href={s.href} className="block">
                <PillarMark kind={kinds[i] ?? "build"} />
                <p className="canvas-micro text-[var(--color-text-muted)]">0{i + 1}</p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)]">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">{s.body}</p>
                <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)] opacity-0 transition group-hover:opacity-100">
                  Explore →
                </p>
              </Link>
            </CanvasSectionTransition>
          ))}
        </div>
      </section>

      {/* Process */}
      <section
        id="process"
        className="canvas-chapter-block border-t border-[var(--color-border-subtle)]"
      >
        <CanvasSectionTransition variant="scaleBlur">
          <p className="canvas-micro text-[var(--color-accent)]">Process</p>
        </CanvasSectionTransition>
        <CanvasSectionTransition variant="clipUp" className="mt-5">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]">
            {process.title}
          </h2>
        </CanvasSectionTransition>
        <ProcessJourney />
      </section>

      {/* Work */}
      <section id="work" className="canvas-chapter-block border-t border-[var(--color-border-subtle)]">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="canvas-micro text-[var(--color-accent)]">Work</p>
            <CanvasWordReveal
              as="h2"
              text="What we've built."
              className="mt-5 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
            />
          </div>
          <Link
            href="/work"
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]"
          >
            View all work →
          </Link>
        </div>
        <div className="mt-12 space-y-20">
          {calicapHomeWorkTeasers.map((w, i) => {
            const image = siteImages[w.imageKey];
            return (
              <Link
                key={w.slug}
                href={`/work/${w.slug}`}
                className={`group grid gap-8 lg:grid-cols-12 lg:gap-10 ${
                  i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <CanvasImageReveal
                  src={image.src}
                  alt={image.alt}
                  className="aspect-[16/10] lg:col-span-7"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  pointerDepth={!reduced}
                />
                <div className="flex flex-col justify-end lg:col-span-5">
                  <CanvasSectionTransition variant="riseDepth">
                    <p className="canvas-micro text-[var(--color-text-muted)]">{w.label}</p>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)] sm:text-3xl">
                      {w.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {w.context}
                    </p>
                    <p className="mt-6 text-sm text-[var(--color-text-strong)]">{w.result}</p>
                  </CanvasSectionTransition>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="canvas-chapter-block border-t border-[var(--color-border-subtle)] pb-24">
        <CanvasTextScrub
          as="h2"
          text={cta.title}
          className="max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.85rem,4.5vw,3rem)] font-medium leading-[1.12] tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <CanvasSectionTransition variant="blurIn" className="mt-6 max-w-lg">
          <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">{cta.bodyLead}</p>
        </CanvasSectionTransition>
        <CanvasSectionTransition variant="clipUp" className="mt-10 flex flex-wrap gap-3">
          <ProblemCtaButton>{cta.primaryCta}</ProblemCtaButton>
          <ButtonLink href={cta.secondaryHref} variant="ghost" magnetic>
            {cta.secondaryCta}
          </ButtonLink>
        </CanvasSectionTransition>
        <p className="mt-16 font-[family-name:var(--font-display)] text-xl font-light tracking-[-0.02em] text-[var(--color-text-muted)] sm:text-2xl">
          {calicapContact.footerTagline}
        </p>
      </section>
    </div>
  );
}
