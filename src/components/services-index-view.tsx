"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { DeliveryPractices } from "@/components/delivery-process";
import {
  CanvasReveal,
  CanvasTextReveal,
  CanvasTextScrub,
} from "@/components/canvas/motion";
import {
  calicapServicesOverview,
  SERVICE_CATALOGUE,
} from "@/lib/calicap-services";
import { canvasServicePathForCategory } from "@/lib/canvas-service-details";
import {
  canvasWordKey,
  resolveCanvasEmphasize,
} from "@/lib/canvas-dual-color";

/** WebGL chunk stays out of the critical hydrate path; preload so backdrop is ready sooner */
const structureFormationImport = () =>
  import("@/components/canvas/canvas-structure-formation").then(
    (m) => m.CanvasStructureFormation,
  );

const CanvasStructureFormation = dynamic(structureFormationImport, {
  ssr: false,
});

if (typeof window !== "undefined") {
  void structureFormationImport();
}

/** Match About sticky split titles: first word, then the rest. */
function splitSectionTitle(title: string): string[] {
  const parts = title.trim().split(/\s+/);
  if (parts.length >= 2) {
    return [parts[0]!, parts.slice(1).join(" ")];
  }
  return [title];
}

function DualColorText({
  text,
  accentWords,
  accentClass,
}: {
  text: string;
  accentWords: Set<string>;
  accentClass: string;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  return words.map((word, i) => {
    const accent = accentWords.has(canvasWordKey(word));
    return (
      <span key={`${word}-${i}`}>
        <span className={accent ? accentClass : undefined}>{word}</span>
        {i < words.length - 1 ? " " : null}
      </span>
    );
  });
}

/** Static grid — dense catalogue must not hydrate dozens of motion nodes */
function CanvasServiceCards({
  services,
}: {
  services: (typeof SERVICE_CATALOGUE)[number]["services"];
}) {
  return (
    <div className="grid grid-cols-2 gap-px border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)]">
      {services.map((service) => {
        const href = canvasServicePathForCategory(service.categoryId);
        const cardClass =
          "group flex h-full flex-col gap-1.5 bg-[var(--color-surface)] px-3 py-3 transition-colors duration-300 hover:bg-[var(--color-surface-elevated)]";
        return (
          <Link key={service.id} href={href} className={cardClass}>
            <p className="font-[family-name:var(--font-display)] text-[12px] font-medium leading-snug tracking-[-0.015em] text-[var(--color-text-strong)] sm:text-[13px]">
              {service.name}
              <ArrowRight
                className="ml-1.5 inline h-3 w-3 -translate-y-px text-[var(--color-accent)] transition group-hover:translate-x-0.5"
                strokeWidth={1.75}
                aria-hidden
              />
            </p>
            <p className="text-[12px] leading-relaxed text-[var(--color-text-muted)] sm:text-[13px]">
              {service.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export function ServicesIndexView() {
  const overview = calicapServicesOverview;
  const [portalReady, setPortalReady] = useState(false);
  /** Scrub after first paint — title scroll listeners must not compete with hydrate */
  const [scrubReady, setScrubReady] = useState(false);

  useEffect(() => {
    /* Portal immediately (needs document.body). Structure fades in via CSS. */
    setPortalReady(true);

    let cancelled = false;
    let scrubIdle = 0;
    let scrubTimeout = 0;

    const enableScrub = () => {
      if (!cancelled) setScrubReady(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      scrubIdle = window.requestIdleCallback(enableScrub, { timeout: 400 });
    } else {
      scrubTimeout = window.setTimeout(enableScrub, 120);
    }

    return () => {
      cancelled = true;
      if (scrubIdle && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(scrubIdle);
      }
      if (scrubTimeout) window.clearTimeout(scrubTimeout);
    };
  }, []);

  const structureBackdrop =
    portalReady &&
    createPortal(
      <div className="canvas-services__backdrop" aria-hidden>
        <div className="canvas-services__structure">
          <CanvasStructureFormation />
        </div>
      </div>,
      document.body,
    );

  return (
    <article
      className="canvas-services w-full min-w-0 pt-4 pb-0"
      data-canvas-authored=""
    >
      {structureBackdrop}
      <div className="canvas-services__content">
        <section className="canvas-services__hero canvas-about__mission">
          <CanvasReveal variant="riseSoft" immediate>
            <p className="font-[family-name:var(--font-display)] text-sm font-medium tracking-[0.14em] text-[var(--color-text-muted)] uppercase sm:text-base">
              {overview.eyebrow}
            </p>
          </CanvasReveal>
          <div className="mt-5 min-w-0">
            <CanvasTextReveal
              as="h1"
              lines={[overview.title]}
              className="mx-auto w-full max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2rem,5.5vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.04em] text-[var(--color-text-strong)]"
              delay={0.06}
            />
          </div>
          <CanvasReveal
            variant="riseSoft"
            delay={0.08}
            immediate
            className="mx-auto mt-6 max-w-xl"
          >
            <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
              {overview.body}
            </p>
          </CanvasReveal>
          <CanvasReveal
            variant="riseSoft"
            delay={0.12}
            immediate
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <ProblemCtaButton>{overview.primaryCta}</ProblemCtaButton>
            <ButtonLink href={overview.secondaryHref} variant="ghost">
              {overview.secondaryCta}
            </ButtonLink>
          </CanvasReveal>
        </section>

        {SERVICE_CATALOGUE.map((category) => {
          const supportAccent = resolveCanvasEmphasize(
            category.description.split(/\s+/).filter(Boolean),
          );
          return (
            <section
              key={category.id}
              className="canvas-about__split border-t"
              aria-labelledby={`services-cat-${category.id}`}
            >
              <div className="canvas-about__split-layout">
                <aside className="canvas-services__cat-aside">
                  <CanvasTextScrub
                    as="h2"
                    id={`services-cat-${category.id}`}
                    lines={splitSectionTitle(category.name)}
                    className="canvas-about__split-title"
                    lineClassName="canvas-about__split-title-line"
                    scrub={scrubReady}
                  />
                  <CanvasReveal variant="riseSoft" delay={0.04}>
                    <p className="canvas-services__cat-support">
                      <DualColorText
                        text={category.description}
                        accentWords={supportAccent}
                        accentClass="canvas-em"
                      />
                    </p>
                  </CanvasReveal>
                </aside>
                <div className="canvas-about__split-body">
                  <CanvasServiceCards services={category.services} />
                </div>
              </div>
            </section>
          );
        })}

        <DeliveryPractices />
      </div>
    </article>
  );
}
