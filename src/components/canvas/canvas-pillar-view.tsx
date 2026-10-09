"use client";

import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { ProjectApproach } from "@/components/project-approach";
import { CanvasTextScrub } from "@/components/canvas/motion";
import {
  calicapBuildDetailLinks,
  calicapServicesApproach,
  calicapServicesUnsure,
  getPillarPage,
  getPillarSection,
} from "@/lib/calicap-services";
import { calicapHomeProcess } from "@/lib/calicap-home";
import { getWorkStudiesForPillar, getWorkStudyImage } from "@/lib/calicap-work";
import { PILLAR_DELIVERY } from "@/lib/delivery-architecture";
import type { PillarId } from "@/lib/brand-architecture";

type Props = {
  pillarId: PillarId;
  /** Hide Related work — used when embedding in the home circuit panel */
  omitRelatedWork?: boolean;
  /** Denser chrome for constrained surfaces (circuit detail panel) */
  embedded?: boolean;
};

const HEADLINE =
  "font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)]";

/** Editorial Canvas pillar — type-led, minimal cards */
export function CanvasPillarView({
  pillarId,
  omitRelatedWork = false,
  embedded = false,
}: Props) {
  const page = getPillarPage(pillarId);
  const section = getPillarSection(pillarId);
  if (!page || !section) return null;

  const related = omitRelatedWork ? [] : getWorkStudiesForPillar(pillarId);
  const process = calicapHomeProcess;
  const unsure = calicapServicesUnsure;
  const approach = calicapServicesApproach;
  const sectionGap = embedded ? "mt-8 pt-6" : "mt-12 pt-10";
  const firstGap = embedded ? "mt-10 pt-6" : "mt-14 pt-10";

  return (
    <article
      className={`canvas-pillar w-full min-w-0 ${embedded ? "py-0" : "py-4"}`}
    >
      <p className="canvas-micro text-[var(--color-accent)]">{page.eyebrow}</p>
      <CanvasTextScrub
        as="h1"
        text={page.title}
        className={`mt-4 max-w-4xl font-[family-name:var(--font-display)] font-medium leading-[1.1] tracking-[-0.035em] text-[var(--color-text-strong)] ${
          embedded
            ? "text-[clamp(1.45rem,3.2vw,2rem)]"
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
      <div className={`flex flex-wrap gap-3 ${embedded ? "mt-6" : "mt-10"}`}>
        <ButtonLink href={page.contactHref}>{page.contactCta}</ButtonLink>
        {page.problemCta ? (
          <ProblemCtaButton variant="ghost">{page.problemCta}</ProblemCtaButton>
        ) : null}
      </div>

      <section className={`border-t border-[var(--color-border-subtle)] ${firstGap}`}>
        <CanvasTextScrub as="h2" text={page.challengesTitle} className={HEADLINE} />
        <ul className="mt-6 space-y-0">
          {page.challenges.map((item, index) => (
            <li
              key={item}
              className="flex items-baseline gap-3 border-b border-[var(--color-border-subtle)] py-4 text-sm leading-relaxed text-[var(--color-text-muted)]"
            >
              <span className="shrink-0 font-mono text-[10px] text-[var(--color-accent)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={`border-t border-[var(--color-border-subtle)] ${sectionGap}`}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <CanvasTextScrub as="h2" text={page.examplesTitle} className={HEADLINE} />
            <ul className="mt-6 space-y-3">
              {page.examples.map((item) => (
                <li
                  key={item}
                  className="border-l border-[var(--color-accent)]/40 pl-4 text-sm leading-relaxed text-[var(--color-text-muted)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text-strong)]">
              {page.flexibleTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {page.flexibleBody}
            </p>
          </div>
        </div>
      </section>

      <section className={`border-t border-[var(--color-border-subtle)] ${sectionGap}`}>
        <CanvasTextScrub as="h2" text={section.title} className={HEADLINE} />
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
          {section.intro}
        </p>
        <div className="mt-7 divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
          {section.groups.map((g) => (
            <div key={g.title} className="grid gap-2 py-5 sm:grid-cols-[minmax(8rem,14rem)_minmax(0,1fr)] sm:gap-6 lg:gap-8">
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

      <section className={`border-t border-[var(--color-border-subtle)] ${sectionGap}`}>
        <CanvasTextScrub
          as="h2"
          text={process.title}
          className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--color-text-strong)]"
        />
        <ol className="mt-6">
          {process.steps.map((s) => (
            <li
              key={s.n}
              className="grid grid-cols-[3rem_1fr] gap-4 border-t border-[var(--color-border-subtle)] py-5 sm:grid-cols-[3rem_8rem_1fr]"
            >
              <span className="font-mono text-xs text-[var(--color-accent)]">{s.n}</span>
              <span className="text-sm font-medium text-[var(--color-text-strong)]">{s.t}</span>
              <span className="col-span-2 text-sm text-[var(--color-text-muted)] sm:col-span-1">
                {s.d}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <ProjectApproach
        title={PILLAR_DELIVERY[pillarId].title}
        body={PILLAR_DELIVERY[pillarId].body}
      />

      {related.length > 0 ? (
        <section className={`border-t border-[var(--color-border-subtle)] ${sectionGap}`}>
          <CanvasTextScrub
            as="h2"
            text="Related work"
            className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--color-text-strong)]"
          />
          <div className="mt-7 space-y-10">
            {related.map((s) => {
              const image = getWorkStudyImage(s);
              return (
                <Link key={s.slug} href={`/work/${s.slug}`} className="group block">
                  <div className="relative aspect-[2/1] overflow-hidden border border-[var(--color-border-subtle)]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 920px) 100vw, 920px"
                    />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl text-[var(--color-text-strong)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{s.result}</p>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section
        className={`grid gap-8 border-t border-[var(--color-border-subtle)] lg:grid-cols-2 lg:gap-12 ${sectionGap}`}
      >
        <div>
          <CanvasTextScrub
            as="h2"
            text={approach.title}
            className="font-[family-name:var(--font-display)] text-xl text-[var(--color-text-strong)]"
          />
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {approach.body}
          </p>
        </div>
        <div>
          <CanvasTextScrub as="h2" text={unsure.title} className={HEADLINE} />
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">{unsure.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={page.contactHref}>{page.contactCta}</ButtonLink>
            <ProblemCtaButton variant="ghost">{unsure.cta}</ProblemCtaButton>
          </div>
        </div>
      </section>
    </article>
  );
}
