"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { DeliveryPractices } from "@/components/delivery-process";
import {
  CanvasReveal,
  CanvasStagger,
  CanvasStaggerItem,
  CanvasTextReveal,
  CanvasTextScrub,
} from "@/components/canvas/motion";
import { CanvasStructureFormation } from "@/components/canvas/canvas-structure-formation";
import { ThemeSplit } from "@/components/theme-split";
import {
  calicapServicesOverview,
  calicapStrategicPillars,
  SERVICE_CATALOGUE,
} from "@/lib/calicap-services";
import {
  canvasWordKey,
  resolveCanvasEmphasize,
} from "@/lib/canvas-dual-color";

/** Match About sticky split titles: first word, then the rest. */
function splitSectionTitle(title: string): string[] {
  const parts = title.trim().split(/\s+/);
  if (parts.length >= 2) {
    return [parts[0]!, parts.slice(1).join(" ")];
  }
  return [title];
}

function DualColorText({
  text,
  accentWords,
  accentClass,
}: {
  text: string;
  accentWords: Set<string>;
  accentClass: string;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  return words.map((word, i) => {
    const accent = accentWords.has(canvasWordKey(word));
    return (
      <span key={`${word}-${i}`}>
        <span className={accent ? accentClass : undefined}>{word}</span>
        {i < words.length - 1 ? " " : null}
      </span>
    );
  });
}

function CanvasServiceCards({
  services,
}: {
  services: (typeof SERVICE_CATALOGUE)[number]["services"];
}) {
  return (
    <CanvasStagger
      className="grid grid-cols-2 gap-px border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)]"
      stagger={0.05}
    >
      {services.map((service) => {
        const cardClass =
          "group flex h-full flex-col gap-1.5 bg-[var(--color-surface)] px-3 py-3 transition-colors duration-300 hover:bg-[var(--color-surface-elevated)]";
        const body = (
          <>
            <p className="font-[family-name:var(--font-display)] text-[12px] font-medium leading-snug tracking-[-0.015em] text-[var(--color-text-strong)] sm:text-[13px]">
              {service.name}
              {service.href ? (
                <ArrowRight
                  className="ml-1.5 inline h-3 w-3 -translate-y-px text-[var(--color-accent)] transition group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                  aria-hidden
                />
              ) : null}
            </p>
            <p className="text-[12px] leading-relaxed text-[var(--color-text-muted)] sm:text-[13px]">
              {service.description}
            </p>
          </>
        );

        return (
          <CanvasStaggerItem key={service.id}>
            {service.href ? (
              <Link href={service.href} className={cardClass}>
                {body}
              </Link>
            ) : (
              <article className={cardClass}>{body}</article>
            )}
          </CanvasStaggerItem>
        );
      })}
    </CanvasStagger>
  );
}

function CanvasServicesIndex() {
  const overview = calicapServicesOverview;
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const structureBackdrop =
    portalReady &&
    createPortal(
      <div className="canvas-services__backdrop" aria-hidden>
        <div className="canvas-services__structure">
          <CanvasStructureFormation />
        </div>
      </div>,
      document.body,
    );

  return (
    <article className="canvas-services w-full min-w-0 py-4">
      {structureBackdrop}
      <div className="canvas-services__content">
        <section className="canvas-services__hero canvas-about__mission">
          <CanvasReveal variant="riseSoft">
            <p className="font-[family-name:var(--font-display)] text-sm font-medium tracking-[0.14em] text-[var(--color-text-muted)] uppercase sm:text-base">
              {overview.eyebrow}
            </p>
          </CanvasReveal>
          <div className="mt-5 min-w-0">
            <CanvasTextReveal
              as="h1"
              lines={[overview.title]}
              className="mx-auto w-full max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2rem,5.5vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.04em] text-[var(--color-text-strong)]"
              delay={0.1}
            />
          </div>
          <CanvasReveal variant="blurIn" delay={0.12} className="mx-auto mt-6 max-w-xl">
            <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
              {overview.body}
            </p>
          </CanvasReveal>
          <CanvasReveal
            variant="rise"
            delay={0.18}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <ProblemCtaButton>{overview.primaryCta}</ProblemCtaButton>
            <ButtonLink href={overview.secondaryHref} variant="ghost">
              {overview.secondaryCta}
            </ButtonLink>
          </CanvasReveal>
        </section>

        {SERVICE_CATALOGUE.map((category) => {
          const supportAccent = resolveCanvasEmphasize(
            category.description.split(/\s+/).filter(Boolean),
          );
          return (
            <section
              key={category.id}
              className="canvas-about__split border-t"
              aria-labelledby={`services-cat-${category.id}`}
            >
              <div className="canvas-about__split-layout">
                <aside className="canvas-services__cat-aside">
                  <CanvasTextScrub
                    as="h2"
                    id={`services-cat-${category.id}`}
                    lines={splitSectionTitle(category.name)}
                    className="canvas-about__split-title"
                    lineClassName="canvas-about__split-title-line"
                  />
                  <CanvasReveal variant="blurIn" delay={0.06}>
                    <p className="canvas-services__cat-support">
                      <DualColorText
                        text={category.description}
                        accentWords={supportAccent}
                        accentClass="canvas-em"
                      />
                    </p>
                  </CanvasReveal>
                </aside>
                <div className="canvas-about__split-body">
                  <CanvasServiceCards services={category.services} />
                </div>
              </div>
            </section>
          );
        })}

        <section
          className="canvas-about__split border-t"
          aria-labelledby="services-capability-label"
        >
          <div className="canvas-about__split-layout">
            <aside>
              <CanvasTextScrub
                as="h2"
                id="services-capability-label"
                lines={splitSectionTitle("Capability paths")}
                className="canvas-about__split-title"
                lineClassName="canvas-about__split-title-line"
                emphasize={["paths"]}
              />
            </aside>
            <div className="canvas-about__split-body">
              <CanvasReveal variant="blurIn" className="space-y-4">
                <p className="font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.5vw,1.75rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]">
                  Build · Transform · Automate · Evolve
                </p>
                <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
                  Brand capabilities for how engagements start — not additional service categories.
                </p>
              </CanvasReveal>

              <CanvasStagger
                className="mt-6 grid grid-cols-2 gap-px border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)]"
                stagger={0.05}
              >
                {calicapStrategicPillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <CanvasStaggerItem key={pillar.id}>
                      <Link
                        href={pillar.href}
                        className="group flex h-full flex-col gap-2 bg-[var(--color-surface)] px-3 py-3 transition-colors duration-300 hover:bg-[var(--color-surface-elevated)]"
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon
                            className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]"
                            strokeWidth={1.6}
                            aria-hidden
                          />
                          <span className="font-[family-name:var(--font-display)] text-[12px] font-medium leading-snug tracking-[-0.015em] text-[var(--color-text-strong)] sm:text-[13px]">
                            {pillar.label}
                          </span>
                        </span>
                        <span className="text-[12px] leading-relaxed text-[var(--color-text-muted)] sm:text-[13px]">
                          {pillar.tagline}
                        </span>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)] transition group-hover:text-[var(--color-link-hover)]">
                          {pillar.cta}
                          <ArrowRight className="h-3 w-3" strokeWidth={1.75} aria-hidden />
                        </span>
                      </Link>
                    </CanvasStaggerItem>
                  );
                })}
              </CanvasStagger>
            </div>
          </div>
        </section>

        <DeliveryPractices />
      </div>
    </article>
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

      <section className="mt-16" aria-label="Service catalogue">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
          Service catalogue
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
          What we deliver.
        </h2>

        <div className="mt-10 space-y-10">
          {SERVICE_CATALOGUE.map((category, index) => (
            <article
              key={category.id}
              className="border-t border-[var(--color-border-subtle)] pt-8"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] tracking-[0.14em] text-gold-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
                  {category.name}
                </h3>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                {category.description}
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {category.services.map((service) => (
                  <li key={service.id} className="min-w-0">
                    {service.href ? (
                      <Link
                        href={service.href}
                        className="group block rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)]/40 p-4 transition hover:border-gold-500/30"
                      >
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 group-hover:text-gold-700">
                          {service.name}
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-slate-600">
                          {service.description}
                        </span>
                      </Link>
                    ) : (
                      <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)]/40 p-4">
                        <p className="text-sm font-semibold text-slate-900">{service.name}</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {service.description}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-label="How we organise the work">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
          Capability paths
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
          Build · Transform · Automate · Evolve
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Brand capabilities for how engagements start — not additional service categories.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {calicapStrategicPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.id}
                href={pillar.href}
                className="group surface-card flex h-full flex-col rounded-2xl p-6 transition hover:border-gold-500/25"
              >
                <Icon className="h-5 w-5 text-gold-600" strokeWidth={1.75} aria-hidden />
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl text-slate-900">
                  {pillar.label}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-800">{pillar.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-700 transition group-hover:text-slate-900">
                  {pillar.cta}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <DeliveryPractices />
    </div>
  );
}

export function ServicesIndexView() {
  /* Structure formation + About-style layout: Canvas only. Calicon branch is untouched. */
  return (
    <ThemeSplit canvas={<CanvasServicesIndex />} calicon={<CaliconServicesIndex />} />
  );
}
