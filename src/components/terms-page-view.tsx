"use client";

import Link from "next/link";
import { CanvasReveal } from "@/components/canvas/motion";
import { ThemeSplit } from "@/components/theme-split";
import { TERMS_SECTIONS, calicapTerms } from "@/lib/calicap-terms";

type Variant = "canvas" | "calicon";

function TermsToc({ variant }: { variant: Variant }) {
  const isCanvas = variant === "canvas";

  return (
    <nav
      className={isCanvas ? "canvas-privacy__toc" : "calicon-privacy__toc"}
      aria-label="Terms & Conditions sections"
    >
      <p className={isCanvas ? "canvas-privacy__toc-label" : "calicon-privacy__toc-label"}>
        On this page
      </p>
      <ol className={isCanvas ? "canvas-privacy__toc-list" : "calicon-privacy__toc-list"}>
        {TERMS_SECTIONS.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>{section.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function linkContactEmail(text: string) {
  const email = calicapTerms.contactEmail;
  if (!text.includes(email)) return text;
  const parts = text.split(email);
  return parts.flatMap((part, index) =>
    index === 0
      ? [part]
      : [
          <a key={`email-${index}`} href={`mailto:${email}`}>
            {email}
          </a>,
          part,
        ],
  );
}

function linkInlinePaths(text: string) {
  const withEmail = linkContactEmail(text);
  if (typeof withEmail !== "string") return withEmail;
  if (!withEmail.includes("Privacy Policy")) return withEmail;
  const parts = withEmail.split("Privacy Policy");
  return parts.flatMap((part, index) =>
    index === 0
      ? [part]
      : [
          <Link key={`privacy-${index}`} href="/privacy-policy">
            Privacy Policy
          </Link>,
          part,
        ],
  );
}

function TermsSections({ variant }: { variant: Variant }) {
  const isCanvas = variant === "canvas";

  return (
    <div className={isCanvas ? "canvas-privacy__sections" : "calicon-privacy__sections"}>
      {TERMS_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={isCanvas ? "canvas-privacy__section" : "calicon-privacy__section"}
          aria-labelledby={`${section.id}-title`}
        >
          <div className={isCanvas ? "canvas-legal__heading-row" : "calicon-legal__heading-row"}>
            <h2
              id={`${section.id}-title`}
              className={isCanvas ? "canvas-privacy__h2" : "calicon-privacy__h2"}
            >
              {section.title}
            </h2>
            {section.preliminary ? (
              <span
                className={
                  isCanvas ? "canvas-legal__prelim" : "calicon-legal__prelim"
                }
              >
                Preliminary — legal review
              </span>
            ) : null}
          </div>
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className={isCanvas ? "canvas-privacy__p" : "calicon-privacy__p"}
            >
              {linkInlinePaths(paragraph)}
            </p>
          ))}
          {section.bullets ? (
            <ul className={isCanvas ? "canvas-privacy__list" : "calicon-privacy__list"}>
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {section.note ? (
            <p className={isCanvas ? "canvas-privacy__note" : "calicon-privacy__note"}>
              {section.note}
            </p>
          ) : null}
        </section>
      ))}
    </div>
  );
}

function ReviewBanner({ variant }: { variant: Variant }) {
  if (!calicapTerms.requiresOwnerReview) return null;
  const banner = calicapTerms.reviewBanner;
  const isCanvas = variant === "canvas";

  return (
    <aside
      className={isCanvas ? "canvas-privacy__banner" : "calicon-privacy__banner"}
      role="note"
      aria-label={banner.title}
    >
      <p className={isCanvas ? "canvas-privacy__banner-title" : "calicon-privacy__banner-title"}>
        {banner.title}
      </p>
      <p className={isCanvas ? "canvas-privacy__banner-body" : "calicon-privacy__banner-body"}>
        {banner.body}
      </p>
    </aside>
  );
}

function CanvasTerms() {
  const page = calicapTerms;

  return (
    <article className="canvas-privacy w-full min-w-0 pt-4 pb-0" data-canvas-authored="">
      <div className="canvas-privacy__content">
        <header className="canvas-privacy__hero">
          <CanvasReveal variant="riseSoft" immediate>
            <p className="canvas-micro text-[var(--color-accent)]">{page.hero.eyebrow}</p>
          </CanvasReveal>
          <CanvasReveal variant="riseSoft" delay={0.04} immediate>
            <h1 className="canvas-privacy__title">{page.hero.title}</h1>
          </CanvasReveal>
          <CanvasReveal variant="blurIn" delay={0.08} className="mt-5 max-w-2xl">
            <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
              {page.hero.intro}
            </p>
          </CanvasReveal>
          <CanvasReveal variant="riseSoft" delay={0.1} className="mt-4">
            <p className="canvas-privacy__updated">
              Last updated: {page.lastUpdatedLabel}
            </p>
          </CanvasReveal>
        </header>

        <ReviewBanner variant="canvas" />

        <div className="canvas-privacy__layout">
          <TermsToc variant="canvas" />
          <TermsSections variant="canvas" />
        </div>

        <p className="canvas-privacy__related">
          Related:{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>
          {" · "}
          <Link href="/contact">Contact</Link>
          {" · "}
          <Link href="/faqs">FAQs</Link>
        </p>
      </div>
    </article>
  );
}

function CaliconTerms() {
  const page = calicapTerms;

  return (
    <div className="calicon-privacy mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
          {page.hero.eyebrow}
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
          {page.hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          {page.hero.intro}
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Last updated: {page.lastUpdatedLabel}
        </p>
      </header>

      <ReviewBanner variant="calicon" />

      <div className="calicon-privacy__layout mt-12">
        <TermsToc variant="calicon" />
        <TermsSections variant="calicon" />
      </div>

      <p className="mt-12 text-sm text-slate-600">
        Related:{" "}
        <Link
          href="/privacy-policy"
          className="font-semibold text-gold-700 transition hover:text-slate-900"
        >
          Privacy Policy
        </Link>
        {" · "}
        <Link
          href="/contact"
          className="font-semibold text-gold-700 transition hover:text-slate-900"
        >
          Contact
        </Link>
        {" · "}
        <Link
          href="/faqs"
          className="font-semibold text-gold-700 transition hover:text-slate-900"
        >
          FAQs
        </Link>
      </p>
    </div>
  );
}

export function TermsPageView() {
  return <ThemeSplit canvas={<CanvasTerms />} calicon={<CaliconTerms />} />;
}
