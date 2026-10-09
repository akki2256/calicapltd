"use client";

import { useState } from "react";
import Image from "next/image";
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
  getWorkStudiesForPillar,
  getWorkStudyImage,
  type CalicapWorkStudy,
} from "@/lib/calicap-work";
import { PILLARS, type PillarId } from "@/lib/brand-architecture";

type WorkFilter = "all" | PillarId;

function studiesForFilter(filter: WorkFilter): CalicapWorkStudy[] {
  if (filter === "all") return [...calicapWorkStudies];
  return getWorkStudiesForPillar(filter);
}

function WorkIndexFilter({
  value,
  onChange,
}: {
  value: WorkFilter;
  onChange: (next: WorkFilter) => void;
}) {
  const options: { id: WorkFilter; label: string }[] = [
    { id: "all", label: "All" },
    ...PILLARS.map((p) => ({ id: p.id as WorkFilter, label: p.label })),
  ];

  return (
    <div
      className="mt-8 flex flex-wrap gap-x-5 gap-y-2"
      role="tablist"
      aria-label="Filter work by capability"
    >
      {options.map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.id)}
            className={`text-xs uppercase tracking-[0.16em] transition ${
              active
                ? "text-[var(--color-text-strong)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-strong)]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function WorkProjectGrid({ studies }: { studies: CalicapWorkStudy[] }) {
  if (studies.length === 0) {
    return (
      <p className="text-sm text-[var(--color-text-muted)]">
        No published work in this capability yet.
      </p>
    );
  }

  return (
    <div className="work-flip-grid">
      {studies.map((s, i) => {
        const image = getWorkStudyImage(s);
        return (
          <WorkProjectFlipCard
            key={s.slug}
            href={`/work/${s.slug}`}
            title={s.title}
            label={s.label}
            description={s.context}
            result={s.result}
            image={image}
            priority={i === 0}
            sizes="(max-width: 920px) 100vw, 1400px"
          />
        );
      })}
    </div>
  );
}

function CanvasWorkIndex() {
  const index = calicapWorkIndex;
  const [filter, setFilter] = useState<WorkFilter>("all");
  const studies = studiesForFilter(filter);

  return (
    <div className="w-full min-w-0 py-4">
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
      <WorkIndexFilter value={filter} onChange={setFilter} />

      <div className="mt-16 sm:mt-20">
        <WorkProjectGrid studies={studies} />
      </div>
    </div>
  );
}

function CaliconWorkIndex() {
  const index = calicapWorkIndex;
  const [filter, setFilter] = useState<WorkFilter>("all");
  const studies = studiesForFilter(filter);

  return (
    <div className="mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="relative mb-12 aspect-[2.5/1] w-full max-h-64 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80 sm:max-h-80">
        <Image
          src={index.heroImage.src}
          alt={index.heroImage.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1440px) 100vw, 1440px"
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
      <WorkIndexFilter value={filter} onChange={setFilter} />

      <div className="mt-16">
        <WorkProjectGrid studies={studies} />
      </div>
    </div>
  );
}

export function WorkIndexView() {
  return (
    <ThemeSplit canvas={<CanvasWorkIndex />} calicon={<CaliconWorkIndex />} />
  );
}
