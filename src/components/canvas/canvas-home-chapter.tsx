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
 * Work chapter — premium flip cards after impact / testimonials.
 * Same canvas-content-frame as testimonials so left/right edges match.
 */
export function CanvasHomeChapter() {
  return (
    <section
      id="work"
      className="canvas-work-home border-t border-[var(--color-border-subtle)]"
    >
      <div className="canvas-content-frame canvas-work-home__frame">
        <div className="canvas-work-home__header">
          <div>
            <p className="canvas-micro text-[var(--color-accent)]">Work</p>
            <CanvasTextScrub
              as="h2"
              text="What we've built."
              className="mt-5 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
              emphasize={["built"]}
            />
          </div>
          <Link href="/work" className="canvas-work-home__all">
            View all work →
          </Link>
        </div>
        <div className="work-flip-grid canvas-work-home__grid">
          {calicapHomeWorkTeasers.map((w, i) => {
            const image = siteImages[w.imageKey];
            return (
              <WorkProjectFlipCard
                key={w.slug}
                href={`/work/${w.slug}`}
                title={w.title}
                label={w.label}
                description={w.context}
                result={w.result}
                image={image}
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 1320px"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
