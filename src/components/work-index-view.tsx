"use client";

import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import {
  CanvasReveal,
  CanvasTextRevealInView,
} from "@/components/canvas/motion";
import { ThemeSplit } from "@/components/theme-split";
import { WorkProjectFlipCard } from "@/components/work-project-flip-card";
import {
  calicapWorkIndex,
  calicapWorkStudies,
  getWorkStudyBySlug,
  getWorkStudyImage,
  type CalicapWorkStudy,
} from "@/lib/calicap-work";

/** Website cases — share one row, sandwiched between the two full-width product cases */
const WORK_INDEX_TRIO_SLUGS = [
  "yog-mantram",
  "chaitanya-computers",
  "amazing-art-architects",
] as const;

function studyCard(
  study: CalicapWorkStudy,
  opts: { priority?: boolean; sizes: string },
) {
  const image = getWorkStudyImage(study);
  return (
    <WorkProjectFlipCard
      key={study.slug}
      href={`/work/${study.slug}`}
      title={study.title}
      label={study.label}
      description={study.context}
      result={study.result}
      image={image}
      priority={opts.priority}
      sizes={opts.sizes}
    />
  );
}

function CanvasWorkProjectGrid() {
  const top = getWorkStudyBySlug("calicap-india")!;
  const bottom = getWorkStudyBySlug("lungconnect-india")!;
  const trio = WORK_INDEX_TRIO_SLUGS.map((slug) => getWorkStudyBySlug(slug)!);

  return (
    <div className="work-flip-layout">
      <div className="work-flip-grid">
        {studyCard(top, {
          priority: true,
          sizes: "(max-width: 920px) 100vw, 1400px",
        })}
      </div>
      <div className="work-flip-grid work-flip-grid--trio">
        {trio.map((s) =>
          studyCard(s, {
            sizes: "(max-width: 900px) 100vw, 33vw",
          }),
        )}
      </div>
      <div className="work-flip-grid">
        {studyCard(bottom, {
          sizes: "(max-width: 920px) 100vw, 1400px",
        })}
      </div>
    </div>
  );
}

function WorkProjectGrid() {
  return (
    <div className="work-flip-grid">
      {calicapWorkStudies.map((s, i) =>
        studyCard(s, {
          priority: i === 0,
          sizes: "(max-width: 920px) 100vw, 1400px",
        }),
      )}
    </div>
  );
}

function WorkIndexActions({ className }: { className?: string }) {
  const index = calicapWorkIndex;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      <ProblemCtaButton>{index.ctaLabel}</ProblemCtaButton>
      <ButtonLink href="/services" variant="ghost">
        Explore services
      </ButtonLink>
    </div>
  );
}

function CanvasWorkIndex() {
  const index = calicapWorkIndex;

  return (
    <div className="w-full min-w-0 py-4">
      <div>
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
        <WorkIndexActions />
      </CanvasReveal>

      <div className="mt-16 sm:mt-20">
        <CanvasWorkProjectGrid />
      </div>
    </div>
  );
}

function CaliconWorkIndex() {
  const index = calicapWorkIndex;

  return (
    <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="relative mb-12 aspect-[2.5/1] w-full max-h-64 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80 sm:max-h-80">
        <Image
          src={index.heroImage.src}
          alt={index.heroImage.alt}
          fill
          className="object-contain"
          sizes="(max-width: 1440px) 100vw, 1440px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-slate-900/15" aria-hidden />
      </div>
      <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
        {index.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-600">{index.intro}</p>
      <WorkIndexActions className="mt-10" />

      <div className="mt-16">
        <WorkProjectGrid />
      </div>
    </div>
  );
}

export function WorkIndexView() {
  return (
    <ThemeSplit canvas={<CanvasWorkIndex />} calicon={<CaliconWorkIndex />} />
  );
}
