"use client";

import Image from "next/image";
import { FileText, Lightbulb, MessageCircle, PhoneForwarded } from "lucide-react";
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

      <section className="mt-20 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-text-muted)]">{about.visionTitle}</p>
        </CanvasReveal>
        <CanvasReveal variant="blurIn" delay={0.1} className="mt-5 max-w-2xl">
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">{about.visionBody}</p>
        </CanvasReveal>
      </section>

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasTextRevealInView
          as="h2"
          lines={["Use what's right.", "Build what's necessary."]}
          className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-medium leading-snug tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <CanvasReveal variant="blurIn" delay={0.12} className="mt-6 max-w-xl">
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            {about.philosophyBody}
          </p>
        </CanvasReveal>
      </section>

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-accent)]">{about.howWeWorkTitle}</p>
        </CanvasReveal>
        <CanvasReveal variant="riseSoft" delay={0.08}>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">{about.howWeWorkIntro}</p>
        </CanvasReveal>
        <CanvasStagger className="mt-10" as="ol" stagger={0.1}>
          {about.howWeWorkSteps.map((step) => (
            <CanvasStaggerItem
              key={step.n}
              as="li"
              className="grid grid-cols-[3rem_1fr] gap-6 border-t border-[var(--color-border-subtle)] py-7 sm:grid-cols-[4rem_10rem_1fr] sm:gap-10"
            >
              <span className="font-mono text-xs text-[var(--color-accent)]">{step.n}</span>
              <span className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text-strong)]">
                {step.t}
              </span>
              <span className="col-span-2 text-sm leading-relaxed text-[var(--color-text-muted)] sm:col-span-1">
                {step.d}
              </span>
            </CanvasStaggerItem>
          ))}
        </CanvasStagger>
      </section>

      <DeliveryProcess />

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-text-muted)]">{about.whereTitle}</p>
        </CanvasReveal>
        <CanvasReveal variant="blurIn" delay={0.1} className="mt-5 max-w-2xl">
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">{about.whereBody}</p>
        </CanvasReveal>
      </section>

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-accent)]">{about.beliefsTitle}</p>
        </CanvasReveal>
        <CanvasStagger
          className="mt-10 divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]"
          as="ul"
          stagger={0.08}
        >
          {about.beliefs.map((belief) => (
            <CanvasStaggerItem
              key={belief}
              as="li"
              className="py-5 font-[family-name:var(--font-display)] text-lg tracking-[-0.02em] text-[var(--color-text-strong)] sm:text-xl"
            >
              {belief}
            </CanvasStaggerItem>
          ))}
        </CanvasStagger>
      </section>

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-text-muted)]">{about.teamTitle}</p>
        </CanvasReveal>
        <div className="mt-8 max-w-2xl space-y-6">
          {about.paragraphs.map((paragraph, index) => (
            <CanvasReveal key={index} variant="blurIn" delay={index * 0.06}>
              <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
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

      <section className="mt-20 border-t border-[var(--color-border-subtle)] pt-14">
        <CanvasTextRevealInView
          as="h2"
          lines={calicapContact.footerTagline.split(". ").map((p, i, a) =>
            i < a.length - 1 ? `${p}.` : p,
          )}
          className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-medium leading-snug tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <CanvasReveal variant="rise" delay={0.15} className="mt-10 flex flex-wrap gap-3">
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

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
            <Lightbulb className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
            {about.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
            {about.title}
          </h1>

          <section className="mt-10 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {about.visionTitle}
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">{about.visionBody}</p>
          </section>

          <section className="mt-10 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {about.philosophyTitle}
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">{about.philosophyBody}</p>
          </section>

          <section className="mt-10 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {about.howWeWorkTitle}
            </h2>
            <p className="mt-3 text-sm text-slate-500">{about.howWeWorkIntro}</p>
            <ol className="mt-6 space-y-4">
              {about.howWeWorkSteps.map((step) => (
                <li key={step.n} className="flex gap-3">
                  <span className="text-xs font-mono text-gold-600">{step.n}</span>
                  <div>
                    <p className="font-medium text-slate-800">{step.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <DeliveryProcess />

          <section className="mt-10 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {about.whereTitle}
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">{about.whereBody}</p>
          </section>

          <section className="mt-10 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {about.beliefsTitle}
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {about.beliefs.map((belief) => (
                <li key={belief} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-600" aria-hidden />
                  <span>{belief}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10 max-w-2xl space-y-6 text-slate-600 leading-relaxed">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {about.teamTitle}
            </h2>
            {about.paragraphs.map((paragraph, index) => {
              const Icon = paragraph.icon;
              return (
                <p key={index} className="relative pl-5">
                  <Icon
                    className="absolute left-0 top-1 h-4 w-4 text-gold-600"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {paragraph.blocks.map((block, blockIndex) =>
                    block.type === "em" ? (
                      <span key={blockIndex} className="text-slate-800">
                        {block.value}
                      </span>
                    ) : (
                      <span key={blockIndex}>{block.value}</span>
                    ),
                  )}
                </p>
              );
            })}
          </section>

          <div className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href={about.primaryHref}>
              <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {about.primaryCta}
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              <FileText className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {about.secondaryCta}
            </ButtonLink>
          </div>
          <div className="mt-14 border-t border-[var(--color-border-subtle)] pt-10">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {about.aboutCloseTitle}
            </h2>
            <div className="mt-6">
              <ProblemCtaButton>
                <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                {about.aboutCloseCta}
              </ProblemCtaButton>
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl shadow-slate-900/12 ring-1 ring-slate-200/90 lg:sticky lg:top-24 lg:aspect-[3/4]">
          <Image
            src={about.image.src}
            alt={about.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </div>
    </div>
  );
}

export function AboutPageView() {
  return <ThemeSplit canvas={<CanvasAbout />} calicon={<CaliconAbout />} />;
}
