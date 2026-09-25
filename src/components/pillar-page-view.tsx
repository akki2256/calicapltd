"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, MessageCircle, PhoneForwarded } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CanvasPillarView } from "@/components/canvas/canvas-pillar-view";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { JsonLd } from "@/components/JsonLd";
import { ProjectApproach } from "@/components/project-approach";
import { ThemeSplit } from "@/components/theme-split";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  calicapBuildDetailLinks,
  calicapServicesApproach,
  calicapServicesUnsure,
  getPillarPage,
  getPillarSection,
} from "@/lib/calicap-services";
import { calicapHomeProcess } from "@/lib/calicap-home";
import { getWorkStudiesForPillar, getWorkStudyImage } from "@/lib/calicap-work";
import { getPillar, type PillarId } from "@/lib/brand-architecture";
import { PILLAR_DELIVERY } from "@/lib/delivery-architecture";
import { siteImages } from "@/lib/site-images";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";

type Props = {
  pillarId: PillarId;
};

export function PillarPageView({ pillarId }: Props) {
  const page = getPillarPage(pillarId);
  const pillar = getPillar(pillarId);

  return (
    <>
      {page ? (
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: pillar.label, path: page.path },
            ]),
            serviceJsonLd({
              name: page.title,
              description: page.metaDescription,
              path: page.path,
            }),
          ]}
        />
      ) : null}
      <ThemeSplit
        canvas={<CanvasPillarView pillarId={pillarId} />}
        calicon={<CaliconPillarView pillarId={pillarId} />}
      />
    </>
  );
}

function CaliconProcessRail() {
  const steps = calicapHomeProcess.steps;
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const step = steps[active];
  const StepIcon = step.icon;

  return (
    <section className="mt-12 border-t border-[var(--color-border-subtle)] pt-8">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        {calicapHomeProcess.title}
      </h2>

      <div className="relative mt-7">
        <div
          className="pointer-events-none absolute left-0 right-0 top-[1.125rem] hidden h-px bg-[var(--color-border-subtle)] lg:block"
          aria-hidden
        />
        <ol className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isActive = active === index;
            return (
              <li key={s.n}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  className="group flex w-full flex-col items-start text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] lg:items-center lg:text-center"
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    className={`relative z-[1] flex h-9 w-9 items-center justify-center rounded-full border transition duration-300 ${
                      isActive
                        ? "border-gold-600 bg-gold-600 text-[var(--color-btn-primary-text)] shadow-[0_0_0_4px_var(--color-accent-soft)]"
                        : "border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-slate-500 group-hover:border-gold-500/50"
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="mt-3 text-[11px] font-mono text-gold-600">{s.n}</span>
                  <span
                    className={`mt-1 font-[family-name:var(--font-display)] text-base ${
                      isActive ? "text-slate-900" : "text-slate-500"
                    }`}
                  >
                    {s.t}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-7 min-h-[5.5rem] border-t border-[var(--color-border-subtle)] pt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.n}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-3"
          >
            <StepIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" strokeWidth={1.75} aria-hidden />
            <div>
              <p className="font-[family-name:var(--font-display)] text-lg text-slate-900">
                {step.t}
              </p>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-600">{step.d}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function CaliconPillarView({ pillarId }: Props) {
  const page = getPillarPage(pillarId);
  const section = getPillarSection(pillarId);
  if (!page || !section) return null;

  const unsure = calicapServicesUnsure;
  const approach = calicapServicesApproach;
  const related = getWorkStudiesForPillar(pillarId);

  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <header className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700/95">
            {page.eyebrow}
          </p>
          <h1 className="mt-3 max-w-xl text-balance font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900 md:text-[2.5rem] md:leading-[1.12]">
            {page.title}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">{page.body}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={page.contactHref}>
              <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {page.contactCta}
            </ButtonLink>
            {page.problemCta ? (
              <ProblemCtaButton variant="ghost">
                <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                {page.problemCta}
              </ProblemCtaButton>
            ) : null}
          </div>
        </div>
        <div className="relative aspect-[5/3] w-full overflow-hidden rounded-2xl shadow-lg shadow-slate-900/10 ring-1 ring-slate-200/80">
          <Image
            src={siteImages.cloudNetwork.src}
            alt={siteImages.cloudNetwork.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent"
            aria-hidden
          />
        </div>
      </header>

      <section className="mt-12 grid gap-8 border-t border-[var(--color-border-subtle)] pt-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
            {page.challengesTitle}
          </h2>
          <ul className="mt-5 space-y-0">
            {page.challenges.map((item, index) => (
              <li
                key={item}
                className="flex items-baseline gap-3 border-b border-[var(--color-border-subtle)] py-3.5 text-sm leading-relaxed text-slate-700"
              >
                <span className="shrink-0 font-mono text-[11px] text-gold-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
            {page.examplesTitle}
          </h2>
          <ul className="mt-5 space-y-0">
            {page.examples.map((item) => (
              <li
                key={item}
                className="border-l-2 border-gold-500/40 py-3 pl-4 text-sm leading-relaxed text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 border-l-2 border-gold-500/40 pl-4">
            <h3 className="font-[family-name:var(--font-display)] text-lg text-slate-900">
              {page.flexibleTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{page.flexibleBody}</p>
          </div>
        </div>
      </section>

      <section className="mt-12 border-t border-[var(--color-border-subtle)] pt-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
            {section.title}
          </h2>
          <p className="max-w-md text-sm text-slate-600 sm:text-right">{section.intro}</p>
        </div>
        <div className="mt-6 divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
          {section.groups.map((g) => (
            <div
              key={g.title}
              className="grid gap-2 py-5 sm:grid-cols-[minmax(9rem,14rem)_minmax(0,1fr)] sm:gap-8"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base text-slate-900">
                {g.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">{g.body}</p>
            </div>
          ))}
        </div>
        {pillarId === "build" ? (
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
            {calicapBuildDetailLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-700"
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                {label}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      <CaliconProcessRail />

      <ProjectApproach
        title={PILLAR_DELIVERY[pillarId].title}
        body={PILLAR_DELIVERY[pillarId].body}
      />

      {related.length > 0 ? (
        <section className="mt-12 border-t border-[var(--color-border-subtle)] pt-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
            Related work
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((s) => {
              const image = getWorkStudyImage(s);
              return (
                <Link key={s.slug} href={`/work/${s.slug}`} className="group block">
                  <div className="relative aspect-[2.2/1] w-full overflow-hidden rounded-xl ring-1 ring-slate-200/80">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg text-slate-900">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{s.result}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                    Read case study
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mt-12 grid gap-6 border-t border-[var(--color-border-subtle)] pt-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-slate-900">
            {approach.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{approach.body}</p>
        </div>
        <div className="flex flex-col justify-between gap-5 border-l-0 border-t border-[var(--color-border-subtle)] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-slate-900">
              {unsure.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{unsure.body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={page.contactHref}>
              <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {page.contactCta}
            </ButtonLink>
            <ProblemCtaButton variant="ghost">
              <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {unsure.cta}
            </ProblemCtaButton>
          </div>
        </div>
      </section>
    </div>
  );
}
