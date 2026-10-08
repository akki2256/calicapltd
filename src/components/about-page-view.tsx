"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FileText, Lightbulb, MessageCircle, PhoneForwarded } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { DeliveryProcess } from "@/components/delivery-process";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import {
  CanvasReveal,
  CanvasTextReveal,
  CanvasTextRevealInView,
  canvasDur,
  canvasEase,
} from "@/components/canvas/motion";
import { CanvasWorldMap } from "@/components/canvas/canvas-world-map";
import { ThemeSplit } from "@/components/theme-split";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  ABOUT_APPROACH_ID,
  calicapAbout,
} from "@/lib/calicap-about";
import { calicapContact } from "@/lib/calicap-contact";

function CanvasApproachPrinciples() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = calicapAbout.approachPrinciples;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.35"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduced) return;
    setActive(Math.min(items.length - 1, Math.max(0, Math.floor(v * items.length))));
  });

  return (
    <div ref={ref} className="mt-12 space-y-0">
      {items.map((p, i) => {
        const isActive = reduced || i === active;
        return (
          <motion.div
            key={p.label}
            className="grid gap-2 border-t border-[var(--color-border-subtle)] py-7 sm:grid-cols-[minmax(8rem,12rem)_minmax(0,1fr)] sm:gap-6 lg:gap-8"
            animate={{
              opacity: isActive ? 1 : 0.35,
              x: isActive ? 0 : -6,
            }}
            transition={{ duration: canvasDur.fast, ease: canvasEase }}
            onMouseEnter={() => setActive(i)}
          >
            <p
              className={`font-[family-name:var(--font-display)] text-lg ${
                isActive ? "text-[var(--color-text-strong)]" : "text-[var(--color-text-muted)]"
              }`}
            >
              {p.label}
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{p.value}</p>
          </motion.div>
        );
      })}
    </div>
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

        <section className="mt-14 border-t border-[var(--color-border-subtle)] pt-10">
          <CanvasReveal variant="riseSoft">
            <p className="canvas-micro text-[var(--color-accent)]">{about.eyebrow}</p>
          </CanvasReveal>
          <div className="mt-6 min-w-0">
            <CanvasTextReveal
              as="h2"
              lines={splitAboutTitle(about.title)}
              className="w-full max-w-full font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.8vw,2.65rem)] font-medium leading-[1.2] tracking-[-0.035em] text-[var(--color-text-strong)]"
              delay={0.08}
              emphasize={[...about.titleEmphasize]}
            />
          </div>
          <CanvasReveal variant="blurIn" delay={0.16} className="mt-6 max-w-3xl">
            <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
              {about.lead}
            </p>
          </CanvasReveal>
        </section>

        <section
          id={ABOUT_APPROACH_ID}
          className="mt-14 scroll-mt-8 border-t border-[var(--color-border-subtle)] pt-10"
        >
          <CanvasReveal variant="riseSoft">
            <p className="canvas-micro text-[var(--color-accent)]">{about.approachEyebrow}</p>
          </CanvasReveal>
          <CanvasReveal variant="blurIn" className="mt-5 max-w-3xl">
            <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
              {about.approachBody}
            </p>
          </CanvasReveal>
          <CanvasApproachPrinciples />
        </section>

        <DeliveryProcess />

        <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
          <CanvasTextRevealInView
            as="h2"
            lines={calicapContact.footerTagline.split(". ").map((p, i, a) =>
              i < a.length - 1 ? `${p}.` : p,
            )}
            className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-medium leading-snug tracking-[-0.03em] text-[var(--color-text-strong)]"
          />
          <CanvasReveal variant="rise" delay={0.15} className="mt-8 flex flex-wrap gap-3">
            <ProblemCtaButton>{about.aboutCloseCta}</ProblemCtaButton>
            <ButtonLink href="/work" variant="ghost" magnetic={false}>
              {about.secondaryCta}
            </ButtonLink>
          </CanvasReveal>
        </section>
      </div>
    </article>
  );
}

const MISSION_ACCENT = new Set(
  calicapAbout.missionEmphasize.map((w) => w.toLowerCase()),
);
const ABOUT_TITLE_ACCENT = new Set(
  calicapAbout.titleEmphasize.map((w) => w.toLowerCase()),
);

function splitMissionTitle(title: string): string[] {
  if (title.toLowerCase().includes("into technology")) {
    const end = title.trimEnd().endsWith(".") ? "." : "";
    return ["Convert Ideas", `Into Technology${end}`];
  }
  return [title];
}

function splitAboutTitle(title: string): string[] {
  if (title.toLowerCase().includes("before we create")) {
    return ["We understand", "before we create."];
  }
  return [title];
}

function renderDualColorLine(
  line: string,
  accentWords: Set<string>,
  accentClass: string,
) {
  const words = line.split(/\s+/).filter(Boolean);
  return words.map((word, i) => {
    const key = word.replace(/[^\w']/g, "").toLowerCase();
    const accent = accentWords.has(key);
    return (
      <span key={`${word}-${i}`}>
        <span className={accent ? accentClass : undefined}>{word}</span>
        {i < words.length - 1 ? " " : null}
      </span>
    );
  });
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

      <header className="mt-10 grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700/95">
            <Lightbulb className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
            {about.eyebrow}
          </p>
          <h2 className="mt-4 w-full max-w-3xl min-w-0 font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.2vw,1.85rem)] font-medium leading-[1.25] tracking-tight text-slate-900">
            {splitAboutTitle(about.title).map((line) => (
              <span key={line} className="block">
                {renderDualColorLine(line, ABOUT_TITLE_ACCENT, "text-gold-600")}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600">
            {about.lead}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={about.primaryHref}>
              <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {about.primaryCta}
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              <FileText className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {about.secondaryCta}
            </ButtonLink>
          </div>
        </div>
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl shadow-xl shadow-slate-900/10 ring-1 ring-slate-200/90 sm:aspect-[4/3] lg:aspect-[5/4]">
          <Image
            src={about.image.src}
            alt={about.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
        </div>
      </header>

      <section
        id={ABOUT_APPROACH_ID}
        className="mt-12 scroll-mt-8 border-t border-[var(--color-border-subtle)] pt-10"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12">
          <div>
            <div className="border-l-2 border-gold-500/45 pl-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-700/90">
                {about.approachEyebrow}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {about.approachBody}
              </p>
            </div>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-[var(--color-border-subtle)] lg:border-y lg:border-[var(--color-border-subtle)]">
            {about.approachPrinciples.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)]/55 px-4 py-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-4"
              >
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
                  <span>{label}</span>
                </dt>
                <dd className="mt-2 text-sm font-medium leading-relaxed text-slate-800">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <DeliveryProcess />

      <section className="mt-12 flex flex-col gap-4 border-t border-[var(--color-border-subtle)] pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-slate-900 sm:text-2xl">
          {about.aboutCloseTitle}
        </h2>
        <ProblemCtaButton className="shrink-0">
          <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          {about.aboutCloseCta}
        </ProblemCtaButton>
      </section>
    </div>
  );
}

export function AboutPageView() {
  return <ThemeSplit canvas={<CanvasAbout />} calicon={<CaliconAbout />} />;
}
