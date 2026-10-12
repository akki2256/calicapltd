"use client";

import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { CanvasTextScrub } from "@/components/canvas/motion";
import { getOutcomeDetail } from "@/lib/calicap-services";

type Props = {
  outcomeId: string;
  embedded?: boolean;
};

const HEADLINE =
  "font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)]";

/**
 * Canvas circuit detail for outcomes that aren't a pillar page (e.g. Connect).
 * Layout matches the Build circuit detail card.
 */
export function CanvasOutcomeView({ outcomeId, embedded = true }: Props) {
  const page = getOutcomeDetail(outcomeId);
  if (!page) return null;

  const sectionGap = embedded ? "mt-8 pt-6" : "mt-12 pt-10";
  const firstGap = embedded ? "mt-10 pt-6" : "mt-14 pt-10";

  return (
    <article
      className={`canvas-pillar w-full min-w-0 ${embedded ? "py-0" : "py-4"}`}
    >
      <CanvasTextScrub
        as="h1"
        text={page.title}
        scrub={false}
        className={`max-w-4xl font-[family-name:var(--font-display)] font-medium leading-[1.1] tracking-[-0.035em] text-[var(--color-text-strong)] ${
          embedded
            ? "mt-0 text-[clamp(1.45rem,3.2vw,2rem)]"
            : "mt-6 text-[clamp(2rem,5vw,3.25rem)]"
        }`}
      />
      <p
        className={`max-w-3xl leading-[1.75] text-[var(--color-text-muted)] ${
          embedded ? "mt-4 text-sm" : "mt-6 text-[15px]"
        }`}
      >
        {page.body}
      </p>

      <section className={`border-t border-[var(--color-border-subtle)] ${firstGap}`}>
        <CanvasTextScrub
          as="h2"
          text={page.examplesTitle}
          scrub={false}
          className={HEADLINE}
        />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {page.groups.map((g) => (
            <li
              key={g.title}
              className="canvas-detail-item border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/40 p-4"
            >
              <h3 className="font-[family-name:var(--font-display)] text-sm font-medium text-[var(--color-text-strong)]">
                {g.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {g.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div
        className={`flex flex-wrap gap-3 border-t border-[var(--color-border-subtle)] ${sectionGap}`}
      >
        <ProblemCtaButton variant="primary">
          Tell us your problem
        </ProblemCtaButton>
        <ButtonLink href="/services" variant="ghost">
          Explore services
        </ButtonLink>
      </div>
    </article>
  );
}
