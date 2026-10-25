"use client";

import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import {
  CanvasReveal,
  CanvasTextRevealInView,
} from "@/components/canvas/motion";
import { WorkProjectFlipCard } from "@/components/work-project-flip-card";
import {
  calicapWorkIndex,
  getWorkStudyBySlug,
  getWorkStudyImage,
  type CalicapWorkStudy,
} from "@/lib/calicap-work";

/** 1, 2, 2 row setup for Canvas work index */
const WORK_INDEX_ROW_2_SLUGS = [
  "amazing-art-architects",
  "yog-mantram",
] as const;

const WORK_INDEX_ROW_3_SLUGS = [
  "lungconnect-india",
  "chaitanya-computers",
] as const;

function studyCard(
  study: CalicapWorkStudy,
  opts: { priority?: boolean; featured?: boolean; sizes: string },
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
      featured={opts.featured}
      priority={opts.priority}
      sizes={opts.sizes}
    />
  );
}

function WorkProjectGrid() {
  const top = getWorkStudyBySlug("calicap-india")!;
  const row2 = WORK_INDEX_ROW_2_SLUGS.map((slug) => getWorkStudyBySlug(slug)!);
  const row3 = WORK_INDEX_ROW_3_SLUGS.map((slug) => getWorkStudyBySlug(slug)!);

  return (
    <div className="work-flip-layout">
      <div className="work-flip-grid work-flip-grid--featured">
        {studyCard(top, {
          priority: true,
          featured: true,
          sizes: "(max-width: 920px) 100vw, 1400px",
        })}
      </div>
      <div className="work-flip-grid work-flip-grid--pair">
        {row2.map((s) =>
          studyCard(s, {
            sizes: "(max-width: 820px) 100vw, 50vw",
          }),
        )}
      </div>
      <div className="work-flip-grid work-flip-grid--pair">
        {row3.map((s) =>
          studyCard(s, {
            sizes: "(max-width: 820px) 100vw, 50vw",
          }),
        )}
      </div>
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

export function WorkIndexView() {
  const index = calicapWorkIndex;

  return (
    <div className="w-full min-w-0 pt-4 pb-0">
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
        <WorkProjectGrid />
      </div>
    </div>
  );
}
