"use client";

import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { ProjectApproach } from "@/components/project-approach";
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
};

/** Editorial Canvas pillar — type-led, minimal cards */
export function CanvasPillarView({ pillarId }: Props) {
  const page = getPillarPage(pillarId);
  const section = getPillarSection(pillarId);
  if (!page || !section) return null;

  const related = getWorkStudiesForPillar(pillarId);
  const process = calicapHomeProcess;
  const unsure = calicapServicesUnsure;
  const approach = calicapServicesApproach;

  return (
    <article className="canvas-pillar mx-auto max-w-[1080px] px-0 py-4">
      <p className="canvas-micro text-[var(--color-accent)]">{page.eyebrow}</p>
      <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.035em] text-[var(--color-text-strong)]">
        {page.title}
      </h1>
      <p className="mt-6 max-w-3xl text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
        {page.body}
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href={page.contactHref}>{page.contactCta}</ButtonLink>
        {page.problemCta ? (
          <ProblemCtaButton variant="ghost">{page.problemCta}</ProblemCtaButton>
        ) : null}
      </div>

      <section className="mt-20 border-t border-[var(--color-border-subtle)] pt-12">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)]">
          {page.challengesTitle}
        </h2>
        <ul className="mt-8 space-y-0">
          {page.challenges.map((item) => (
            <li
              key={item}
              className="border-b border-[var(--color-border-subtle)] py-5 text-sm leading-relaxed text-[var(--color-text-muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)]">
          {page.examplesTitle}
        </h2>
        <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {page.examples.map((item) => (
            <li
              key={item}
              className="border-l border-[var(--color-accent)]/40 pl-4 text-sm leading-relaxed text-[var(--color-text-muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-12 max-w-3xl">
          <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text-strong)]">
            {page.flexibleTitle}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {page.flexibleBody}
          </p>
        </div>
      </section>

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)]">
          {section.title}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
          {section.intro}
        </p>
        <div className="mt-10 divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
          {section.groups.map((g) => (
            <div key={g.title} className="grid gap-3 py-7 sm:grid-cols-[minmax(8rem,14rem)_minmax(0,1fr)] sm:gap-6 lg:gap-8">
              <h3 className="text-sm font-medium text-[var(--color-text-strong)]">{g.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{g.body}</p>
            </div>
          ))}
        </div>
        {pillarId === "build" ? (
          <div className="mt-8 flex flex-wrap gap-6">
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

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--color-text-strong)]">
          {process.title}
        </h2>
        <ol className="mt-8">
          {process.steps.map((s) => (
            <li
              key={s.n}
              className="grid grid-cols-[3rem_1fr] gap-4 border-t border-[var(--color-border-subtle)] py-6 sm:grid-cols-[3rem_8rem_1fr]"
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
        <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--color-text-strong)]">
            Related work
          </h2>
          <div className="mt-10 space-y-12">
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
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl text-[var(--color-text-strong)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{s.result}</p>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-text-strong)]">
          {approach.title}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
          {approach.body}
        </p>
      </section>

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12 pb-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)]">
          {unsure.title}
        </h2>
        <p className="mt-4 max-w-3xl text-sm text-[var(--color-text-muted)]">{unsure.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={page.contactHref}>{page.contactCta}</ButtonLink>
          <ProblemCtaButton variant="ghost">{unsure.cta}</ProblemCtaButton>
        </div>
      </section>
    </article>
  );
}
