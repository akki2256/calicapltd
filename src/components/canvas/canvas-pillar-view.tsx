"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { CanvasTextScrub } from "@/components/canvas/motion";
import {
  calicapBuildDetailLinks,
  getPillarPage,
  getPillarSection,
} from "@/lib/calicap-services";
import type { PillarId } from "@/lib/brand-architecture";

type Props = {
  pillarId: PillarId;
  /** Denser chrome for constrained surfaces (circuit detail panel) */
  embedded?: boolean;
};

const HEADLINE =
  "font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)]";

/** Editorial Canvas pillar — type-led, minimal cards */
export function CanvasPillarView({
  pillarId,
  embedded = false,
}: Props) {
  const router = useRouter();
  const page = getPillarPage(pillarId);
  const section = getPillarSection(pillarId);
  if (!page || !section) return null;

  const sectionGap = embedded ? "mt-8 pt-6" : "mt-12 pt-10";
  const firstGap = embedded ? "mt-10 pt-6" : "mt-14 pt-10";
  const titleClass = `max-w-4xl font-[family-name:var(--font-display)] font-medium leading-[1.1] tracking-[-0.035em] text-[var(--color-text-strong)] ${
    embedded
      ? "mt-0 text-[clamp(1.45rem,3.2vw,2rem)]"
      : "mt-6 text-[clamp(2rem,5vw,3.25rem)]"
  }`;

  /**
   * Circuit detail layout (Build reference): title, body, service cards under
   * examplesTitle, bottom CTAs. Card click → /services except problem CTA.
   */
  if (embedded) {
    return (
      <article
        className="canvas-pillar w-full min-w-0 cursor-pointer py-0"
        onClick={() => router.push("/services")}
      >
        <CanvasTextScrub
          as="h1"
          text={page.title}
          scrub={false}
          className={titleClass}
        />
        <p className="mt-4 max-w-3xl text-sm leading-[1.75] text-[var(--color-text-muted)]">
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
            {section.groups.map((g) => (
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
          <span
            className="inline-flex"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <ProblemCtaButton variant="primary">
              Tell us your problem
            </ProblemCtaButton>
          </span>
          <ButtonLink href="/services" variant="ghost">
            Explore services
          </ButtonLink>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`canvas-pillar w-full min-w-0 ${embedded ? "py-0" : "py-4"}`}
    >
      {!embedded ? (
        <p className="canvas-micro text-[var(--color-accent)]">{page.eyebrow}</p>
      ) : null}
      <CanvasTextScrub
        as="h1"
        text={page.title}
        scrub={!embedded}
        className={titleClass}
      />
      <p
        className={`max-w-3xl leading-[1.75] text-[var(--color-text-muted)] ${
          embedded ? "mt-4 text-sm" : "mt-6 text-[15px]"
        }`}
      >
        {page.body}
      </p>
      <div className={`flex flex-wrap gap-3 ${embedded ? "mt-6" : "mt-10"}`}>
        <ButtonLink href={page.contactHref}>{page.contactCta}</ButtonLink>
        {page.problemCta ? (
          <ProblemCtaButton variant="ghost">{page.problemCta}</ProblemCtaButton>
        ) : null}
      </div>

      <section className={`border-t border-[var(--color-border-subtle)] ${firstGap}`}>
        <CanvasTextScrub
          as="h2"
          text={page.examplesTitle}
          scrub={!embedded}
          className={HEADLINE}
        />
        <ul className="mt-6 space-y-3">
          {page.examples.map((item) => (
            <li
              key={item}
              className={`border-l border-[var(--color-accent)]/40 pl-4 text-sm leading-relaxed text-[var(--color-text-muted)]${
                embedded ? " canvas-detail-item" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={`border-t border-[var(--color-border-subtle)] ${sectionGap}`}>
        <CanvasTextScrub
          as="h2"
          text={section.title}
          scrub={!embedded}
          className={HEADLINE}
        />
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
          {section.intro}
        </p>
        <div className="mt-7 divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
          {section.groups.map((g) => (
            <div
              key={g.title}
              className={`grid gap-2 py-5 sm:grid-cols-[minmax(8rem,14rem)_minmax(0,1fr)] sm:gap-6 lg:gap-8${
                embedded ? " canvas-detail-item" : ""
              }`}
            >
              <h3 className="text-sm font-medium text-[var(--color-text-strong)]">{g.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{g.body}</p>
            </div>
          ))}
        </div>
        {pillarId === "build" ? (
          <div className="mt-7 flex flex-wrap gap-6">
            {calicapBuildDetailLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)] hover:text-[var(--color-link-hover)]"
              >
                {label} →
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </article>
  );
}
