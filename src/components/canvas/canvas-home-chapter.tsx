"use client";

import Link from "next/link";
import {
  CanvasSectionTransition,
  CanvasTextScrub,
} from "@/components/canvas/motion";
import { WorkProjectFlipCard } from "@/components/work-project-flip-card";
import { OutcomesCircuitBoard } from "@/components/outcomes-circuit-board";
import { calicapHomeWorkTeasers } from "@/lib/calicap-home";
import { siteImages } from "@/lib/site-images";

/** Website cases — share one row, sandwiched between the two full-width product cases */
const HOME_WORK_TRIO_SLUGS = [
  "yog-mantram",
  "chaitanya-computers",
  "amazing-art-architects",
] as const;

/** Outcomes discovery — sits below the tech marquee on Canvas home */
export function CanvasHomeOutcomes() {
  return (
    <div className="canvas-chapter">
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
        <OutcomesCircuitBoard className="mt-14" />
      </section>
    </div>
  );
}

/**
 * Work chapter — premium flip cards after outcomes, before About.
 * Same canvas-content-frame as testimonials so left/right edges match.
 */
export function CanvasHomeChapter() {
  const top = calicapHomeWorkTeasers.find((t) => t.slug === "calicap-india");
  const bottom = calicapHomeWorkTeasers.find(
    (t) => t.slug === "lungconnect-india",
  );
  const trio = HOME_WORK_TRIO_SLUGS.map((slug) =>
    calicapHomeWorkTeasers.find((t) => t.slug === slug),
  ).filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <section
      id="work"
      className="canvas-work-home border-t border-[var(--color-border-subtle)]"
    >
      <div className="canvas-content-frame canvas-work-home__frame">
        <div className="canvas-work-home__header">
          <div>
            <CanvasTextScrub
              as="h2"
              text="What we've built."
              className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
              emphasize={["built"]}
            />
          </div>
          <Link href="/work" className="canvas-work-home__all">
            View all work →
          </Link>
        </div>
        <div className="work-flip-layout canvas-work-home__grid">
          {top ? (
            <div className="work-flip-grid">
              <WorkProjectFlipCard
                href={`/work/${top.slug}`}
                title={top.title}
                label={top.label}
                description={top.context}
                result={top.result}
                image={siteImages[top.imageKey]}
                priority
                sizes="(max-width: 1024px) 100vw, 1320px"
              />
            </div>
          ) : null}
          <div className="work-flip-grid work-flip-grid--trio">
            {trio.map((w) => (
              <WorkProjectFlipCard
                key={w.slug}
                href={`/work/${w.slug}`}
                title={w.title}
                label={w.label}
                description={w.context}
                result={w.result}
                image={siteImages[w.imageKey]}
                sizes="(max-width: 900px) 100vw, 33vw"
              />
            ))}
          </div>
          {bottom ? (
            <div className="work-flip-grid">
              <WorkProjectFlipCard
                href={`/work/${bottom.slug}`}
                title={bottom.title}
                label={bottom.label}
                description={bottom.context}
                result={bottom.result}
                image={siteImages[bottom.imageKey]}
                sizes="(max-width: 1024px) 100vw, 1320px"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
