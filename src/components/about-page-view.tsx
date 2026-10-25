"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { DeliveryProcess } from "@/components/delivery-process";
import {
  CanvasReveal,
  CanvasStagger,
  CanvasStaggerItem,
  CanvasTextReveal,
  CanvasTextScrub,
} from "@/components/canvas/motion";
import { CanvasWorldMap } from "@/components/canvas/canvas-world-map";
import {
  ABOUT_OBSERVATION_ID,
  ABOUT_RESPONSE_ID,
  ABOUT_STATS_ID,
  ABOUT_THE_APPROACH_ID,
  calicapAbout,
} from "@/lib/calicap-about";
import { calicapHomeImpact } from "@/lib/calicap-home";
import { canvasWordKey, resolveCanvasEmphasize } from "@/lib/canvas-dual-color";

const OBSERVATION_ACCENT = new Set(
  calicapAbout.observation.emphasize.map((w) => w.toLowerCase()),
);
const RESPONSE_ACCENT = new Set(
  calicapAbout.response.emphasize.map((w) => w.toLowerCase()),
);
const THE_APPROACH_ACCENT = new Set(
  calicapAbout.theApproach.emphasize.map((w) => w.toLowerCase()),
);

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

/** Matches home impact ledger: three gains, one cost reduction */
const ABOUT_STATS_DIRECTION = ["up", "up", "up", "down"] as const;

function AboutStatsColumns() {
  const metrics = calicapHomeImpact.metrics;

  return (
    <section
      id={ABOUT_STATS_ID}
      className="canvas-about-stats border-t"
      aria-label={calicapHomeImpact.title}
    >
      <CanvasStagger className="canvas-about-stats__grid" stagger={0.06}>
        {metrics.map((metric, i) => {
          const labelAccent = resolveCanvasEmphasize(
            metric.label.split(/\s+/).filter(Boolean),
          );
          const direction = ABOUT_STATS_DIRECTION[i] ?? "up";
          const arrow = direction === "up" ? "↑" : "↓";
          return (
            <CanvasStaggerItem key={metric.label} className="canvas-about-stats__col">
              <h3 className="canvas-about-stats__value">{metric.value}</h3>
              <p className="canvas-about-stats__label">
                <span
                  className={`canvas-about-stats__arrow canvas-about-stats__arrow--${direction}`}
                  aria-hidden
                >
                  {arrow}
                </span>
                <span className="canvas-about-stats__label-text">
                  <DualColorText
                    text={metric.label}
                    accentWords={labelAccent}
                    accentClass="canvas-em"
                  />
                </span>
              </p>
            </CanvasStaggerItem>
          );
        })}
      </CanvasStagger>
    </section>
  );
}

function AboutCloseCta() {
  const about = calicapAbout;

  return (
    <section className="canvas-about-close border-t" aria-labelledby="about-close-title">
      <CanvasReveal variant="riseSoft">
        <h2 id="about-close-title" className="canvas-about-close__title">
          {about.aboutCloseTitle}
        </h2>
      </CanvasReveal>
      <CanvasReveal variant="riseSoft" delay={0.08} className="canvas-about-close__actions">
        <ProblemCtaButton>{about.aboutCloseCta}</ProblemCtaButton>
        <ButtonLink href={about.aboutCloseWorkHref} variant="ghost">
          {about.aboutCloseWorkCta}
        </ButtonLink>
      </CanvasReveal>
    </section>
  );
}

function ObservationGaps() {
  const gaps = calicapAbout.observation.gaps;

  return (
    <CanvasStagger
      className="mt-6 grid grid-cols-2 gap-px border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)]"
      stagger={0.05}
    >
      {gaps.map(({ label, icon: Icon }) => (
        <CanvasStaggerItem key={label}>
          <article className="group flex h-full items-start gap-2.5 bg-[var(--color-surface)] px-3 py-3 transition-colors duration-300 hover:bg-[var(--color-surface-elevated)]">
            <Icon
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]"
              strokeWidth={1.6}
              aria-hidden
            />
            <p className="font-[family-name:var(--font-display)] text-[12px] font-medium leading-snug tracking-[-0.015em] text-[var(--color-text-strong)] sm:text-[13px]">
              <DualColorText
                text={label}
                accentWords={OBSERVATION_ACCENT}
                accentClass="canvas-em"
              />
            </p>
          </article>
        </CanvasStaggerItem>
      ))}
    </CanvasStagger>
  );
}

function splitMissionTitle(title: string): string[] {
  if (title.toLowerCase().includes("into technology")) {
    const end = title.trimEnd().endsWith(".") ? "." : "";
    return ["Convert Ideas", `Into Technology${end}`];
  }
  return [title];
}

/** Split "The Observation" / "The Response" for impact-style stacked headlines */
function splitSectionTitle(title: string): string[] {
  const parts = title.trim().split(/\s+/);
  if (parts.length >= 2) {
    return [parts[0]!, parts.slice(1).join(" ")];
  }
  return [title];
}

export function AboutPageView() {
  const about = calicapAbout;
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const mapBackdrop =
    portalReady &&
    createPortal(
      <div className="canvas-about__backdrop" aria-hidden>
        <div className="canvas-about__map">
          <CanvasWorldMap />
        </div>
      </div>,
      document.body,
    );

  return (
    <article className="canvas-about w-full min-w-0 pt-4 pb-0">
      {mapBackdrop}
      <div className="canvas-about__content">
        <section className="canvas-about__mission">
          <CanvasReveal variant="riseSoft">
            <p className="font-[family-name:var(--font-display)] text-sm font-medium tracking-[0.14em] text-[var(--color-text-muted)] uppercase sm:text-base">
              {about.missionEyebrow}
            </p>
          </CanvasReveal>
          <div className="mt-5 min-w-0">
            <CanvasTextReveal
              as="h1"
              lines={splitMissionTitle(about.missionTitle)}
              className="w-full max-w-full font-[family-name:var(--font-display)] text-[clamp(2rem,5.5vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.04em] text-[var(--color-text-strong)]"
              delay={0.1}
              emphasize={[...about.missionEmphasize]}
            />
          </div>
        </section>

        <section
          id={ABOUT_OBSERVATION_ID}
          className="canvas-about__split border-t"
          aria-labelledby="about-observation-label"
        >
          <div className="canvas-about__split-layout">
            <aside>
              <CanvasTextScrub
                as="h2"
                id="about-observation-label"
                lines={splitSectionTitle(about.observation.eyebrow)}
                className="canvas-about__split-title"
                lineClassName="canvas-about__split-title-line"
                emphasize={["Observation"]}
              />
            </aside>
            <div className="canvas-about__split-body">
              <CanvasReveal variant="blurIn" className="space-y-4">
                {about.observation.paragraphs.map((p) => (
                  <p key={p} className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
                    <DualColorText
                      text={p}
                      accentWords={OBSERVATION_ACCENT}
                      accentClass="canvas-em"
                    />
                  </p>
                ))}
                <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
                  <DualColorText
                    text={about.observation.listIntro}
                    accentWords={OBSERVATION_ACCENT}
                    accentClass="canvas-em"
                  />
                </p>
              </CanvasReveal>
              <ObservationGaps />
              <CanvasReveal variant="blurIn" className="mt-8 space-y-4">
                <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
                  <DualColorText
                    text={about.observation.secondaryIntro}
                    accentWords={OBSERVATION_ACCENT}
                    accentClass="canvas-em"
                  />
                </p>
                {about.observation.secondaryParagraphs.map((p) => (
                  <p key={p} className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
                    <DualColorText
                      text={p}
                      accentWords={OBSERVATION_ACCENT}
                      accentClass="canvas-em"
                    />
                  </p>
                ))}
                <p className="text-[15px] font-medium leading-[1.75] text-[var(--color-text-strong)]">
                  <DualColorText
                    text={about.observation.close}
                    accentWords={OBSERVATION_ACCENT}
                    accentClass="canvas-em"
                  />
                </p>
              </CanvasReveal>
            </div>
          </div>
        </section>

        <section
          id={ABOUT_RESPONSE_ID}
          className="canvas-about__split border-t"
          aria-labelledby="about-response-label"
        >
          <div className="canvas-about__split-layout">
            <aside>
              <CanvasTextScrub
                as="h2"
                id="about-response-label"
                lines={splitSectionTitle(about.response.eyebrow)}
                className="canvas-about__split-title"
                lineClassName="canvas-about__split-title-line"
                emphasize={["Response"]}
              />
            </aside>
            <div className="canvas-about__split-body">
              <CanvasReveal variant="blurIn" className="space-y-4">
                {about.response.paragraphs.map((p) => (
                  <p key={p} className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
                    <DualColorText
                      text={p}
                      accentWords={RESPONSE_ACCENT}
                      accentClass="canvas-em"
                    />
                  </p>
                ))}
              </CanvasReveal>
            </div>
          </div>
        </section>

        <section
          id={ABOUT_THE_APPROACH_ID}
          className="canvas-about__split border-t"
          aria-labelledby="about-the-approach-label"
        >
          <div className="canvas-about__split-layout">
            <aside>
              <CanvasTextScrub
                as="h2"
                id="about-the-approach-label"
                lines={splitSectionTitle(about.theApproach.eyebrow)}
                className="canvas-about__split-title"
                lineClassName="canvas-about__split-title-line"
                emphasize={["Approach"]}
              />
            </aside>
            <div className="canvas-about__split-body">
              <CanvasReveal variant="blurIn">
                <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
                  <DualColorText
                    text={about.theApproach.lead}
                    accentWords={THE_APPROACH_ACCENT}
                    accentClass="canvas-em"
                  />
                </p>
              </CanvasReveal>
              <DeliveryProcess />
            </div>
          </div>
        </section>

        <AboutStatsColumns />
        <AboutCloseCta />
      </div>
    </article>
  );
}
