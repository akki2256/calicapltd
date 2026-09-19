"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import {
  CanvasReveal,
  CanvasStagger,
  CanvasStaggerItem,
  CanvasTextRevealInView,
  canvasDur,
  canvasEase,
} from "@/components/canvas/motion";
import { ThemeSplit } from "@/components/theme-split";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  calicapWorkIndex,
  calicapWorkStudies,
  getWorkStudyImage,
} from "@/lib/calicap-work";

function CanvasWorkIndex() {
  const index = calicapWorkIndex;
  const reduced = usePrefersReducedMotion();

  return (
    <div className="mx-auto max-w-[920px] py-4">
      <CanvasReveal variant="riseSoft">
        <p className="canvas-micro text-[var(--color-accent)]">{index.eyebrow}</p>
      </CanvasReveal>
      <div className="mt-6">
        <CanvasTextRevealInView
          as="h1"
          lines={[index.title]}
          className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,3.5rem)] font-medium tracking-[-0.035em] text-[var(--color-text-strong)]"
        />
      </div>
      <CanvasReveal variant="blurIn" delay={0.1} className="mt-6 max-w-xl">
        <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">{index.intro}</p>
      </CanvasReveal>
      <CanvasReveal variant="rise" delay={0.18} className="mt-10">
        <ProblemCtaButton>{index.ctaLabel}</ProblemCtaButton>
      </CanvasReveal>

      <div className="mt-20 space-y-20">
        {calicapWorkStudies.map((s) => {
          const image = getWorkStudyImage(s);
          return (
            <Link key={s.slug} href={`/work/${s.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden border border-[var(--color-border-subtle)]">
                <motion.div
                  className="absolute inset-0"
                  initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: canvasDur.slow, ease: canvasEase }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 920px) 100vw, 920px"
                  />
                </motion.div>
              </div>
              <CanvasStagger className="mt-6" stagger={0.08} delayChildren={0.12}>
                <CanvasStaggerItem>
                  <p className="canvas-micro text-[var(--color-text-muted)]">{s.label}</p>
                </CanvasStaggerItem>
                <CanvasStaggerItem>
                  <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)] sm:text-3xl">
                    {s.title}
                  </h2>
                </CanvasStaggerItem>
                <CanvasStaggerItem>
                  <div className="mt-6 grid gap-6 sm:grid-cols-3">
                    <div>
                      <p className="canvas-micro text-[var(--color-accent)]">Challenge</p>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                        {s.context}
                      </p>
                    </div>
                    <div>
                      <p className="canvas-micro text-[var(--color-accent)]">Solution</p>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                        {s.built}
                      </p>
                    </div>
                    <div>
                      <p className="canvas-micro text-[var(--color-accent)]">Outcome</p>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-strong)]">
                        {s.result}
                      </p>
                    </div>
                  </div>
                </CanvasStaggerItem>
              </CanvasStagger>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function CaliconWorkIndex() {
  const index = calicapWorkIndex;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <div className="relative mb-12 aspect-[2.5/1] w-full max-h-64 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80 sm:max-h-80">
        <Image
          src={index.heroImage.src}
          alt={index.heroImage.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1152px) 100vw, 1152px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-slate-900/15" aria-hidden />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
        {index.eyebrow}
      </p>
      <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
        {index.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-600">{index.intro}</p>
      <div className="mt-10">
        <ProblemCtaButton>{index.ctaLabel}</ProblemCtaButton>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {calicapWorkStudies.map((s) => {
          const image = getWorkStudyImage(s);
          return (
            <Link
              key={s.slug}
              href={`/work/${s.slug}`}
              className="group surface-card block overflow-hidden rounded-2xl transition hover:border-gold-500/25"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col p-8 md:p-10">
                <span className="text-xs font-medium text-slate-500">{s.label}</span>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-slate-900">
                  {s.title}
                </h2>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Challenge
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.context}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Solution
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{s.built}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Outcome
                </p>
                <p className="mt-1 text-sm font-medium text-slate-800">{s.result}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function WorkIndexView() {
  return (
    <ThemeSplit canvas={<CanvasWorkIndex />} calicon={<CaliconWorkIndex />} />
  );
}
