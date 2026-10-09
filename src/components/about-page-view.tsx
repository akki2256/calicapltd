"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DeliveryProcess } from "@/components/delivery-process";
import {
  CanvasReveal,
  CanvasStagger,
  CanvasStaggerItem,
  CanvasTextReveal,
  CanvasTextScrub,
} from "@/components/canvas/motion";
import { CanvasWorldMap } from "@/components/canvas/canvas-world-map";
import { ThemeSplit } from "@/components/theme-split";
import {
  ABOUT_OBSERVATION_ID,
  ABOUT_RESPONSE_ID,
  ABOUT_THE_APPROACH_ID,
  calicapAbout,
} from "@/lib/calicap-about";
import { canvasWordKey } from "@/lib/canvas-dual-color";

const OBSERVATION_ACCENT = new Set(
  calicapAbout.observation.emphasize.map((w) => w.toLowerCase()),
);
const RESPONSE_ACCENT = new Set(
  calicapAbout.response.emphasize.map((w) => w.toLowerCase()),
);
const THE_APPROACH_ACCENT = new Set(
  calicapAbout.theApproach.emphasize.map((w) => w.toLowerCase()),
);
const OBSERVATION_TITLE_ACCENT = new Set(["observation"]);
const RESPONSE_TITLE_ACCENT = new Set(["response"]);
const THE_APPROACH_TITLE_ACCENT = new Set(["approach"]);

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

function CanvasObservationGaps() {
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

function CaliconObservationGaps() {
  const gaps = calicapAbout.observation.gaps;

  return (
    <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {gaps.map(({ label, icon: Icon }) => (
        <li
          key={label}
          className="flex items-start gap-2.5 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)]/70 px-3 py-2.5"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gold-500/12 ring-1 ring-gold-500/25">
            <Icon className="h-3 w-3 text-gold-700" strokeWidth={2} aria-hidden />
          </span>
          <p className="text-[12px] font-medium leading-snug text-slate-800 sm:text-[13px]">
            <DualColorText
              text={label}
              accentWords={OBSERVATION_ACCENT}
              accentClass="text-gold-600"
            />
          </p>
        </li>
      ))}
    </ul>
  );
}

function CanvasAbout() {
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
    <article className="canvas-about w-full min-w-0 py-4">
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
          className="canvas-about__split"
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
              <CanvasObservationGaps />
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
          className="canvas-about__split"
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
          className="canvas-about__split"
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
      </div>
    </article>
  );
}

const MISSION_ACCENT = new Set(
  calicapAbout.missionEmphasize.map((w) => w.toLowerCase()),
);

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

function renderDualColorLine(
  line: string,
  accentWords: Set<string>,
  accentClass: string,
) {
  return (
    <DualColorText text={line} accentWords={accentWords} accentClass={accentClass} />
  );
}

function CaliconAbout() {
  const about = calicapAbout;

  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <section className="border-b border-[var(--color-border-subtle)] pb-10">
        <p className="font-[family-name:var(--font-display)] text-sm font-medium tracking-[0.14em] text-slate-500 uppercase sm:text-base">
          {about.missionEyebrow}
        </p>
        <h1 className="mt-4 w-full max-w-4xl min-w-0 font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.8vw,2.85rem)] font-medium leading-[1.1] tracking-tight text-slate-900">
          {splitMissionTitle(about.missionTitle).map((line) => (
            <span key={line} className="block">
              {renderDualColorLine(line, MISSION_ACCENT, "text-gold-600")}
            </span>
          ))}
        </h1>
      </section>

      <section
        id={ABOUT_OBSERVATION_ID}
        className="mt-10 scroll-mt-8 border-b border-[var(--color-border-subtle)] pb-10"
      >
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-12">
          <h2 className="max-w-[16rem] font-[family-name:var(--font-display)] text-[clamp(2.75rem,5vw,4.5rem)] font-medium uppercase leading-[0.95] tracking-tight text-slate-900 lg:sticky lg:top-28">
            {splitSectionTitle(about.observation.eyebrow).map((line) => (
              <span key={line} className="block">
                <DualColorText
                  text={line}
                  accentWords={OBSERVATION_TITLE_ACCENT}
                  accentClass="text-gold-600"
                />
              </span>
            ))}
          </h2>
          <div>
            <div className="space-y-4 text-sm leading-relaxed text-slate-600">
              {about.observation.paragraphs.map((p) => (
                <p key={p}>
                  <DualColorText
                    text={p}
                    accentWords={OBSERVATION_ACCENT}
                    accentClass="text-gold-600"
                  />
                </p>
              ))}
              <p>
                <DualColorText
                  text={about.observation.listIntro}
                  accentWords={OBSERVATION_ACCENT}
                  accentClass="text-gold-600"
                />
              </p>
            </div>
            <CaliconObservationGaps />
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-slate-600">
              <p>
                <DualColorText
                  text={about.observation.secondaryIntro}
                  accentWords={OBSERVATION_ACCENT}
                  accentClass="text-gold-600"
                />
              </p>
              {about.observation.secondaryParagraphs.map((p) => (
                <p key={p}>
                  <DualColorText
                    text={p}
                    accentWords={OBSERVATION_ACCENT}
                    accentClass="text-gold-600"
                  />
                </p>
              ))}
              <p className="font-medium text-slate-900">
                <DualColorText
                  text={about.observation.close}
                  accentWords={OBSERVATION_ACCENT}
                  accentClass="text-gold-600"
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id={ABOUT_RESPONSE_ID} className="mt-10 scroll-mt-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-12">
          <h2 className="max-w-[16rem] font-[family-name:var(--font-display)] text-[clamp(2.75rem,5vw,4.5rem)] font-medium uppercase leading-[0.95] tracking-tight text-slate-900 lg:sticky lg:top-28">
            {splitSectionTitle(about.response.eyebrow).map((line) => (
              <span key={line} className="block">
                <DualColorText
                  text={line}
                  accentWords={RESPONSE_TITLE_ACCENT}
                  accentClass="text-gold-600"
                />
              </span>
            ))}
          </h2>
          <div>
            <div className="space-y-4 text-sm leading-relaxed text-slate-600">
              {about.response.paragraphs.map((p) => (
                <p key={p}>
                  <DualColorText
                    text={p}
                    accentWords={RESPONSE_ACCENT}
                    accentClass="text-gold-600"
                  />
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id={ABOUT_THE_APPROACH_ID}
        className="mt-10 scroll-mt-8 border-t border-[var(--color-border-subtle)] pt-10"
      >
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-12">
          <h2 className="max-w-[16rem] font-[family-name:var(--font-display)] text-[clamp(2.75rem,5vw,4.5rem)] font-medium uppercase leading-[0.95] tracking-tight text-slate-900 lg:sticky lg:top-28">
            {splitSectionTitle(about.theApproach.eyebrow).map((line) => (
              <span key={line} className="block">
                <DualColorText
                  text={line}
                  accentWords={THE_APPROACH_TITLE_ACCENT}
                  accentClass="text-gold-600"
                />
              </span>
            ))}
          </h2>
          <div>
            <p className="text-sm leading-relaxed text-slate-600">
              <DualColorText
                text={about.theApproach.lead}
                accentWords={THE_APPROACH_ACCENT}
                accentClass="text-gold-600"
              />
            </p>
            <DeliveryProcess />
          </div>
        </div>
      </section>
    </div>
  );
}

export function AboutPageView() {
  return <ThemeSplit canvas={<CanvasAbout />} calicon={<CaliconAbout />} />;
}
