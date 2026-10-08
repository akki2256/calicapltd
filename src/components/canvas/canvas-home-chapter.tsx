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
  CanvasSectionTransition,
  CanvasTextScrub,
  canvasDur,
  canvasEase,
} from "@/components/canvas/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  calicapHomeCta,
  calicapHomeOutcomes,
  calicapHomeWorkTeasers,
} from "@/lib/calicap-home";
import { calicapContact } from "@/lib/calicap-contact";
import { siteImages } from "@/lib/site-images";

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
                  className="border-b border-[var(--color-border-subtle)] py-5"
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

/**
 * Motion-led Canvas homepage chapter — scroll choreography, not card farm.
 */
export function CanvasHomeChapter() {
  const cta = calicapHomeCta;
  const reduced = usePrefersReducedMotion();

  return (
    <div className="canvas-chapter">
      {/* Outcomes */}
      <section
        id="outcomes"
        className="canvas-chapter-block scroll-mt-8 border-t border-[var(--color-border-subtle)]"
      >
        <CanvasSectionTransition variant="wipeRight">
          <p className="canvas-micro text-[var(--color-accent)]">Outcomes</p>
        </CanvasSectionTransition>
        <div className="mt-5">
          <CanvasTextScrub
            as="h2"
            text="What we can help you with?"
            className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
            emphasize={["help"]}
          />
        </div>
        <OutcomesRail />
      </section>

      {/* Work */}
      <section id="work" className="canvas-chapter-block border-t border-[var(--color-border-subtle)]">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="canvas-micro text-[var(--color-accent)]">Work</p>
            <CanvasTextScrub
              as="h2"
              text="What we've built."
              className="mt-5 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
              emphasize={["built"]}
            />
          </div>
          <Link
            href="/work"
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition hover:text-[var(--color-link-hover)]"
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
          className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(1.85rem,4.5vw,3rem)] font-medium leading-[1.12] tracking-[-0.03em] text-[var(--color-text-strong)]"
          emphasize={["moves", "forward"]}
        />
        <CanvasSectionTransition variant="blurIn" className="mt-6 max-w-2xl">
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
