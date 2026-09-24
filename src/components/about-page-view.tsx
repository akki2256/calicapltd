"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, FileText, Lightbulb, MessageCircle, PhoneForwarded } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { DeliveryProcess } from "@/components/delivery-process";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import {
  CanvasReveal,
  CanvasStagger,
  CanvasStaggerItem,
  CanvasTextReveal,
  CanvasTextRevealInView,
} from "@/components/canvas/motion";
import { ThemeSplit } from "@/components/theme-split";
import { calicapAbout } from "@/lib/calicap-about";
import { calicapContact } from "@/lib/calicap-contact";

function CanvasAbout() {
  const about = calicapAbout;

  return (
    <article className="canvas-about mx-auto max-w-[920px] py-4">
      <CanvasReveal variant="riseSoft">
        <p className="canvas-micro text-[var(--color-accent)]">{about.eyebrow}</p>
      </CanvasReveal>
      <div className="mt-6">
        <CanvasTextReveal
          as="h1"
          lines={splitAboutTitle(about.title)}
          className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-[var(--color-text-strong)]"
          delay={0.12}
        />
      </div>

      <section className="mt-14 grid gap-10 border-t border-[var(--color-border-subtle)] pt-10 md:grid-cols-2 md:gap-12">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-text-muted)]">{about.visionTitle}</p>
          <p className="mt-4 text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
            {about.visionBody}
          </p>
        </CanvasReveal>
        <CanvasReveal variant="blurIn" delay={0.08}>
          <p className="canvas-micro text-[var(--color-text-muted)]">{about.philosophyTitle}</p>
          <p className="mt-4 text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
            {about.philosophyBody}
          </p>
        </CanvasReveal>
      </section>

      <section className="mt-14 border-t border-[var(--color-border-subtle)] pt-10">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-accent)]">{about.howWeWorkTitle}</p>
        </CanvasReveal>
        <CanvasStagger
          className="mt-8 flex flex-col gap-0 md:flex-row md:flex-wrap md:items-stretch md:gap-y-6"
          as="ol"
          stagger={0.08}
        >
          {about.howWeWorkSteps.map((step, index) => (
            <CanvasStaggerItem
              key={step.n}
              as="li"
              className="relative flex flex-1 flex-col border-t border-[var(--color-border-subtle)] py-5 md:min-w-[9.5rem] md:border-t-0 md:border-l md:px-4 md:py-0 md:first:border-l-0 md:first:pl-0"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[var(--color-accent)]">{step.n}</span>
                <span className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text-strong)]">
                  {step.t}
                </span>
                {index < about.howWeWorkSteps.length - 1 ? (
                  <ArrowRight
                    className="ml-auto hidden h-3.5 w-3.5 text-[var(--color-accent)] md:block"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                ) : null}
              </div>
              <span className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {step.d}
              </span>
            </CanvasStaggerItem>
          ))}
        </CanvasStagger>
      </section>

      <DeliveryProcess />

      <section className="mt-14 grid gap-10 border-t border-[var(--color-border-subtle)] pt-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-text-muted)]">{about.whereTitle}</p>
          <p className="mt-4 text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
            {about.whereBody}
          </p>
        </CanvasReveal>
        <div>
          <CanvasReveal variant="riseSoft">
            <p className="canvas-micro text-[var(--color-accent)]">{about.beliefsTitle}</p>
          </CanvasReveal>
          <CanvasStagger className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2" as="ul" stagger={0.05}>
            {about.beliefs.map((belief) => (
              <CanvasStaggerItem
                key={belief}
                as="li"
                className="flex items-start gap-2 border-l border-[var(--color-accent)]/40 pl-3 font-[family-name:var(--font-display)] text-base tracking-[-0.02em] text-[var(--color-text-strong)]"
              >
                {belief}
              </CanvasStaggerItem>
            ))}
          </CanvasStagger>
        </div>
      </section>

      <section className="mt-14 border-t border-[var(--color-border-subtle)] pt-10">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-text-muted)]">{about.teamTitle}</p>
        </CanvasReveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {about.paragraphs.map((paragraph, index) => (
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

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasTextRevealInView
          as="h2"
          lines={calicapContact.footerTagline.split(". ").map((p, i, a) =>
            i < a.length - 1 ? `${p}.` : p,
          )}
          className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-medium leading-snug tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <CanvasReveal variant="rise" delay={0.15} className="mt-8 flex flex-wrap gap-3">
          <ProblemCtaButton>{about.aboutCloseCta}</ProblemCtaButton>
          <ButtonLink href="/work" variant="ghost" magnetic={false}>
            {about.secondaryCta}
          </ButtonLink>
        </CanvasReveal>
      </section>
    </article>
  );
}

function splitAboutTitle(title: string): string[] {
  const lower = title.toLowerCase();
  if (lower.includes("before we build")) {
    return ["We understand", "before we build."];
  }
  return [title];
}

function CaliconAbout() {
  const about = calicapAbout;
  const [journeyStep, setJourneyStep] = useState(0);
  const activeJourney = about.howWeWorkSteps[journeyStep];
  const JourneyIcon = activeJourney.icon;

  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <header className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700/95">
            <Lightbulb className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
            {about.eyebrow}
          </p>
          <h1 className="mt-4 max-w-xl text-balance font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900 md:text-[2.65rem] md:leading-[1.1]">
            {about.title}
          </h1>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={about.primaryHref}>
              <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {about.primaryCta}
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              <FileText className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {about.secondaryCta}
            </ButtonLink>
          </div>
        </div>
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl shadow-xl shadow-slate-900/10 ring-1 ring-slate-200/90 sm:aspect-[4/3] lg:aspect-[5/4]">
          <Image
            src={about.image.src}
            alt={about.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
        </div>
      </header>

      <section className="mt-12 grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="border-l-2 border-gold-500/40 pl-5">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-slate-900">
            {about.visionTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{about.visionBody}</p>
        </div>
        <div className="border-l-2 border-gold-500/40 pl-5">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-slate-900">
            {about.philosophyTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{about.philosophyBody}</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
          {about.howWeWorkTitle}
        </h2>

        <div className="relative mt-8">
          <div
            className="pointer-events-none absolute left-0 right-0 top-[1.125rem] hidden h-px bg-[var(--color-border-subtle)] md:block"
            aria-hidden
          />
          <ol className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-5 md:gap-0">
            {about.howWeWorkSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = journeyStep === index;
              return (
                <li key={step.n}>
                  <button
                    type="button"
                    onClick={() => setJourneyStep(index)}
                    onMouseEnter={() => setJourneyStep(index)}
                    className="group flex w-full flex-col items-start text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] md:items-center md:text-center"
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span
                      className={`relative z-[1] flex h-9 w-9 items-center justify-center rounded-full border transition duration-300 ${
                        isActive
                          ? "border-gold-600 bg-gold-600 text-[var(--color-btn-primary-text)] shadow-[0_0_0_4px_var(--color-accent-soft)]"
                          : "border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-slate-500 group-hover:border-gold-500/50"
                      }`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </span>
                    <span className="mt-3 text-[11px] font-mono text-gold-600">{step.n}</span>
                    <span
                      className={`mt-1 font-[family-name:var(--font-display)] text-base ${
                        isActive ? "text-slate-900" : "text-slate-500"
                      }`}
                    >
                      {step.t}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-8 flex items-start gap-4 border-t border-[var(--color-border-subtle)] pt-6">
          <JourneyIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" strokeWidth={1.75} aria-hidden />
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl text-slate-900">
              {activeJourney.t}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              {activeJourney.d}
            </p>
          </div>
        </div>
      </section>

      <DeliveryProcess />

      <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
            {about.whereTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{about.whereBody}</p>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
            {about.beliefsTitle}
          </h2>
          <ul className="mt-5 columns-1 gap-x-10 sm:columns-2">
            {about.beliefs.map((belief, index) => (
              <li
                key={belief}
                className="mb-3 flex break-inside-avoid items-baseline gap-2.5 text-sm text-slate-700"
              >
                <span className="font-mono text-[11px] text-gold-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{belief}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
          {about.teamTitle}
        </h2>
        <ul className="mt-5 divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
          {about.paragraphs.map((paragraph, index) => {
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

      <section className="mt-12 flex flex-col gap-4 border-t border-[var(--color-border-subtle)] pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-slate-900 sm:text-2xl">
          {about.aboutCloseTitle}
        </h2>
        <ProblemCtaButton className="shrink-0">
          <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          {about.aboutCloseCta}
        </ProblemCtaButton>
      </section>
    </div>
  );
}

export function AboutPageView() {
  return <ThemeSplit canvas={<CanvasAbout />} calicon={<CaliconAbout />} />;
}
