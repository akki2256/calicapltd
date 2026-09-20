"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import {
  CanvasParallax,
  CanvasReveal,
  CanvasStagger,
  CanvasStaggerItem,
  CanvasTextRevealInView,
  canvasDur,
  canvasEase,
  canvasStagger,
} from "@/components/canvas/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  HOME_POSITIONING_ID,
  calicapHomeCta,
  calicapHomeOutcomes,
  calicapHomeProcess,
  calicapHomeRecognition,
  calicapHomeServices,
  calicapHomeWorkTeasers,
} from "@/lib/calicap-home";
import { calicapContact } from "@/lib/calicap-contact";
import { siteImages } from "@/lib/site-images";

function OutcomesRail() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduced) return;
    const idx = Math.min(
      calicapHomeOutcomes.length - 1,
      Math.max(0, Math.floor(v * calicapHomeOutcomes.length)),
    );
    setActive(idx);
  });

  return (
    <div ref={ref} className="mt-12">
      <div className="divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
        {calicapHomeOutcomes.map((o, i) => {
          const isActive = reduced || active === i;
          return (
            <Link
              key={o.label}
              href={o.href}
              onMouseEnter={() => setActive(i)}
              className="group relative block py-7"
            >
              <motion.div
                className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                animate={{
                  opacity: isActive ? 1 : 0.38,
                  x: isActive ? 0 : -8,
                }}
                transition={{ duration: canvasDur.fast, ease: canvasEase }}
              >
                <span
                  className={`font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.02em] sm:text-3xl ${
                    isActive
                      ? "text-[var(--color-text-strong)]"
                      : "text-[var(--color-text-muted)]"
                  } transition-colors group-hover:text-[var(--color-accent)]`}
                >
                  {o.label}
                </span>
                <motion.span
                  className="max-w-md text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-right"
                  animate={{ opacity: isActive ? 1 : 0.45 }}
                >
                  {o.value}
                </motion.span>
              </motion.div>
              <motion.span
                className="absolute bottom-0 left-0 h-px bg-[var(--color-accent)]"
                initial={false}
                animate={{ scaleX: isActive ? 1 : 0 }}
                style={{ originX: 0, width: "100%" }}
                transition={{ duration: canvasDur.fast, ease: canvasEase }}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ProcessStages() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const steps = calicapHomeProcess.steps;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.35"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduced) return;
    const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive(idx);
  });

  return (
    <div ref={ref} className="mt-12">
      <div className="mb-8 flex gap-2" aria-hidden>
        {steps.map((s, i) => (
          <motion.span
            key={s.n}
            className="h-px flex-1 bg-[var(--color-border-subtle)]"
            animate={{
              backgroundColor:
                i <= active ? "var(--color-accent)" : "var(--color-border-subtle)",
            }}
            transition={{ duration: canvasDur.fast }}
          />
        ))}
      </div>
      <ol>
        {steps.map((s, i) => {
          const isActive = reduced || i === active;
          return (
            <motion.li
              key={s.n}
              className="grid grid-cols-[3rem_1fr] gap-6 border-t border-[var(--color-border-subtle)] py-8 sm:grid-cols-[4rem_10rem_1fr] sm:gap-10"
              animate={{
                opacity: isActive ? 1 : 0.4,
              }}
              transition={{ duration: canvasDur.fast, ease: canvasEase }}
              onMouseEnter={() => setActive(i)}
            >
              <span className="font-mono text-xs text-[var(--color-accent)]">{s.n}</span>
              <span
                className={`font-[family-name:var(--font-display)] text-lg ${
                  isActive ? "text-[var(--color-text-strong)]" : "text-[var(--color-text-muted)]"
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

/**
 * Editorial Canvas homepage chapter — motion-led, not card-farm.
 */
export function CanvasHomeChapter() {
  const recognition = calicapHomeRecognition;
  const process = calicapHomeProcess;
  const cta = calicapHomeCta;
  const reduced = usePrefersReducedMotion();

  return (
    <div className="canvas-chapter">
      {/* Position / problems */}
      <section
        id={HOME_POSITIONING_ID}
        className="canvas-chapter-block scroll-mt-8 border-t border-[var(--color-border-subtle)]"
      >
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-accent)]">Position</p>
        </CanvasReveal>
        <div className="mt-5">
          <CanvasTextRevealInView
            as="h2"
            lines={splitTitle(recognition.title)}
            className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[var(--color-text-strong)]"
          />
        </div>
        <CanvasReveal variant="blurIn" delay={0.12} className="mt-6 max-w-xl">
          <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
            {recognition.intro}
          </p>
        </CanvasReveal>
        <CanvasStagger
          className="mt-10 grid max-w-2xl gap-x-10 gap-y-0 sm:grid-cols-2"
          stagger={canvasStagger.loose}
          as="ul"
        >
          {recognition.examples.map((item) => (
            <CanvasStaggerItem key={item} as="li" className="border-l border-[var(--color-accent)]/50 py-3 pl-4">
              <span className="text-sm leading-relaxed text-[var(--color-text-muted)]">{item}</span>
            </CanvasStaggerItem>
          ))}
        </CanvasStagger>
      </section>

      {/* Differentiation */}
      <section className="canvas-chapter-block border-t border-[var(--color-border-subtle)]">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-accent)]">Approach</p>
        </CanvasReveal>
        <div className="mt-5">
          <CanvasTextRevealInView
            as="h2"
            lines={splitTitle(recognition.differentiator)}
            className="max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[var(--color-text-strong)]"
          />
        </div>
        <CanvasReveal variant="rise" delay={0.1} className="mt-6 max-w-xl">
          <p className="text-lg font-light leading-relaxed text-[var(--color-text-strong)]">
            {recognition.differentiatorLead}
          </p>
        </CanvasReveal>
        <CanvasReveal variant="blurIn" delay={0.18} className="mt-4 max-w-xl">
          <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
            {recognition.differentiatorBody}
          </p>
        </CanvasReveal>
        <CanvasStagger className="mt-14 grid gap-10 sm:grid-cols-2" as="dl" stagger={canvasStagger.base}>
          {process.traits.slice(0, 4).map((t) => (
            <CanvasStaggerItem key={t.label} className="border-t border-[var(--color-border-subtle)] pt-5">
              <dt className="canvas-micro text-[var(--color-text-muted)]">{t.label}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-[var(--color-text-strong)]">{t.value}</dd>
            </CanvasStaggerItem>
          ))}
        </CanvasStagger>
      </section>

      {/* Outcomes — scroll-activated rail */}
      <section className="canvas-chapter-block border-t border-[var(--color-border-subtle)]">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-accent)]">Outcomes</p>
        </CanvasReveal>
        <div className="mt-5">
          <CanvasTextRevealInView
            as="h2"
            lines={["What do you need", "to move forward?"]}
            className="max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[var(--color-text-strong)]"
          />
        </div>
        <OutcomesRail />
      </section>

      {/* Pillars */}
      <section className="canvas-chapter-block border-t border-[var(--color-border-subtle)]">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-accent)]">Practice</p>
        </CanvasReveal>
        <div className="mt-5">
          <CanvasTextRevealInView
            as="h2"
            lines={["We build technology", "around your business."]}
            className="max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[var(--color-text-strong)]"
          />
        </div>
        <div className="mt-14 grid gap-0 lg:grid-cols-2">
          {calicapHomeServices.map((s, i) => (
            <CanvasReveal
              key={s.href}
              variant={i % 2 === 0 ? "slideRight" : "slideLeft"}
              delay={i * 0.08}
              className={`group border border-[var(--color-border-subtle)] p-8 transition hover:border-[var(--color-accent)]/40 sm:p-10 ${
                i % 2 === 1 ? "lg:border-l-0" : ""
              } ${i > 1 ? "border-t-0" : ""}`}
            >
              <Link href={s.href} className="block">
                <motion.p
                  className="canvas-micro text-[var(--color-text-muted)]"
                  whileHover={reduced ? undefined : { x: 4 }}
                >
                  0{i + 1}
                </motion.p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)]">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">{s.body}</p>
                <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)] opacity-0 transition group-hover:opacity-100">
                  Explore →
                </p>
              </Link>
            </CanvasReveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="canvas-chapter-block border-t border-[var(--color-border-subtle)]">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-accent)]">Process</p>
        </CanvasReveal>
        <CanvasReveal variant="clipUp" className="mt-5">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]">
            {process.title}
          </h2>
        </CanvasReveal>
        <ProcessStages />
      </section>

      {/* Work */}
      <section className="canvas-chapter-block border-t border-[var(--color-border-subtle)]">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <CanvasReveal variant="riseSoft">
              <p className="canvas-micro text-[var(--color-accent)]">Work</p>
            </CanvasReveal>
            <CanvasReveal variant="clipUp" className="mt-5">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]">
                What we&apos;ve built.
              </h2>
            </CanvasReveal>
          </div>
          <CanvasReveal variant="riseSoft" delay={0.15}>
            <Link
              href="/work"
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]"
            >
              View all work →
            </Link>
          </CanvasReveal>
        </div>
        <div className="mt-12 space-y-16">
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
                <CanvasReveal
                  variant="scaleIn"
                  className="relative aspect-[16/10] overflow-hidden border border-[var(--color-border-subtle)] lg:col-span-7"
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
                    whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: canvasDur.slow, ease: canvasEase, delay: 0.1 }}
                  >
                    <CanvasParallax distance={reduced ? 0 : 36} className="absolute inset-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </CanvasParallax>
                  </motion.div>
                </CanvasReveal>
                <CanvasStagger
                  className="flex flex-col justify-end lg:col-span-5"
                  stagger={canvasStagger.tight}
                  delayChildren={0.2}
                >
                  <CanvasStaggerItem>
                    <p className="canvas-micro text-[var(--color-text-muted)]">{w.label}</p>
                  </CanvasStaggerItem>
                  <CanvasStaggerItem>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)] sm:text-3xl">
                      {w.title}
                    </h3>
                  </CanvasStaggerItem>
                  <CanvasStaggerItem>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {w.context}
                    </p>
                  </CanvasStaggerItem>
                  <CanvasStaggerItem>
                    <p className="mt-6 text-sm text-[var(--color-text-strong)]">{w.result}</p>
                  </CanvasStaggerItem>
                </CanvasStagger>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Close CTA */}
      <section className="canvas-chapter-block border-t border-[var(--color-border-subtle)] pb-24">
        <CanvasTextRevealInView
          as="h2"
          lines={splitTitle(cta.title)}
          className="max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.85rem,4.5vw,3rem)] font-medium leading-[1.12] tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <CanvasReveal variant="blurIn" delay={0.12} className="mt-6 max-w-lg">
          <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">{cta.bodyLead}</p>
        </CanvasReveal>
        <CanvasReveal variant="rise" delay={0.2} className="mt-10 flex flex-wrap gap-3">
          <ProblemCtaButton>{cta.primaryCta}</ProblemCtaButton>
          <ButtonLink href={cta.secondaryHref} variant="ghost" magnetic={false}>
            {cta.secondaryCta}
          </ButtonLink>
        </CanvasReveal>
        <CanvasReveal variant="riseSoft" delay={0.28} className="mt-16">
          <p className="font-[family-name:var(--font-display)] text-xl font-light tracking-[-0.02em] text-[var(--color-text-muted)] sm:text-2xl">
            {calicapContact.footerTagline}
          </p>
        </CanvasReveal>
      </section>
    </div>
  );
}

function splitTitle(title: string): string[] {
  const parts = title.split(/(?<=\.)\s+/).filter(Boolean);
  if (parts.length > 1) return parts;
  const words = title.split(" ");
  if (words.length <= 4) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
