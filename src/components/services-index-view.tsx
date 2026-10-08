"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { DeliveryPractices } from "@/components/delivery-process";
import {
  CanvasReveal,
  CanvasStagger,
  CanvasStaggerItem,
  CanvasTextRevealInView,
} from "@/components/canvas/motion";
import { ThemeSplit } from "@/components/theme-split";
import {
  calicapHowWeEngage,
  calicapServicesOverview,
  calicapStrategicPillars,
} from "@/lib/calicap-services";

function CanvasServicesIndex() {
  const overview = calicapServicesOverview;

  return (
    <div className="w-full min-w-0 py-4">
      <CanvasReveal variant="riseSoft">
        <p className="canvas-micro text-[var(--color-accent)]">{overview.eyebrow}</p>
      </CanvasReveal>
      <div className="mt-6">
        <CanvasTextRevealInView
          as="h1"
          lines={[overview.title]}
          className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,3.5rem)] font-medium tracking-[-0.035em] text-[var(--color-text-strong)]"
        />
      </div>
      <CanvasReveal variant="blurIn" delay={0.1} className="mt-6 max-w-xl">
        <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">{overview.body}</p>
      </CanvasReveal>
      <CanvasReveal variant="rise" delay={0.18} className="mt-10">
        <ProblemCtaButton>{overview.primaryCta}</ProblemCtaButton>
      </CanvasReveal>

      <CanvasStagger className="mt-16 border-t border-[var(--color-border-subtle)]">
        {calicapStrategicPillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <CanvasStaggerItem key={pillar.id}>
              <Link
                href={pillar.href}
                className="group grid gap-4 border-b border-[var(--color-border-subtle)] py-8 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-start sm:gap-8"
              >
                <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-3">
                    <Icon
                      className="h-4 w-4 shrink-0 text-[var(--color-accent)]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.03em] text-[var(--color-text-strong)]">
                      {pillar.label}
                    </span>
                  </span>
                  <span className="mt-3 block text-sm text-[var(--color-text-strong)]">
                    {pillar.tagline}
                  </span>
                  <span className="mt-2 block max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {pillar.body}
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)] transition group-hover:text-[var(--color-link-hover)]">
                  {pillar.cta}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                </span>
              </Link>
            </CanvasStaggerItem>
          );
        })}
      </CanvasStagger>

      <DeliveryPractices />

      <section className="mt-14 border-t border-[var(--color-border-subtle)] pt-10">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-text-muted)]">{calicapHowWeEngage.title}</p>
        </CanvasReveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {calicapHowWeEngage.paragraphs.map((paragraph, index) => (
            <CanvasReveal key={index} variant="blurIn" delay={index * 0.05}>
              <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
                {paragraph.blocks.map((block, blockIndex) =>
                  block.type === "em" ? (
                    <span key={blockIndex} className="text-[var(--color-text-strong)]">
                      {block.value}
                    </span>
                  ) : (
                    <span key={blockIndex}>{block.value}</span>
                  ),
                )}
              </p>
            </CanvasReveal>
          ))}
        </div>
      </section>
    </div>
  );
}

function CaliconServicesIndex() {
  const overview = calicapServicesOverview;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
        {overview.eyebrow}
      </p>
      <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
        {overview.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-600">{overview.body}</p>
      <div className="mt-10">
        <ProblemCtaButton>{overview.primaryCta}</ProblemCtaButton>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {calicapStrategicPillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Link
              key={pillar.id}
              href={pillar.href}
              className="group surface-card flex h-full flex-col rounded-2xl p-8 transition hover:border-gold-500/25"
            >
              <Icon className="h-5 w-5 text-gold-600" strokeWidth={1.75} aria-hidden />
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl text-slate-900">
                {pillar.label}
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-800">{pillar.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{pillar.body}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold-700 transition group-hover:text-slate-900">
                {pillar.cta}
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </span>
            </Link>
          );
        })}
      </div>

      <DeliveryPractices />

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
          {calicapHowWeEngage.title}
        </h2>
        <ul className="mt-5 divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
          {calicapHowWeEngage.paragraphs.map((paragraph, index) => {
            const Icon = paragraph.icon;
            return (
              <li key={index} className="flex gap-4 py-5">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" strokeWidth={1.75} aria-hidden />
                <p className="text-sm leading-relaxed text-slate-600">
                  {paragraph.blocks.map((block, blockIndex) =>
                    block.type === "em" ? (
                      <span key={blockIndex} className="font-medium text-slate-800">
                        {block.value}
                      </span>
                    ) : (
                      <span key={blockIndex}>{block.value}</span>
                    ),
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export function ServicesIndexView() {
  return (
    <ThemeSplit canvas={<CanvasServicesIndex />} calicon={<CaliconServicesIndex />} />
  );
}
