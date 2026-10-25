"use client";

import Link from "next/link";
import { CanvasReveal } from "@/components/canvas/motion";
import { TERMS_SECTIONS, calicapTerms } from "@/lib/calicap-terms";

function TermsToc() {
  return (
    <nav className="canvas-privacy__toc" aria-label="Terms & Conditions sections">
      <p className="canvas-privacy__toc-label">On this page</p>
      <ol className="canvas-privacy__toc-list">
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

function TermsSections() {
  return (
    <div className="canvas-privacy__sections">
      {TERMS_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="canvas-privacy__section"
          aria-labelledby={`${section.id}-title`}
        >
          <div className="canvas-legal__heading-row">
            <h2 id={`${section.id}-title`} className="canvas-privacy__h2">
              {section.title}
            </h2>
            {section.preliminary ? (
              <span className="canvas-legal__prelim">Preliminary — legal review</span>
            ) : null}
          </div>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="canvas-privacy__p">
              {linkInlinePaths(paragraph)}
            </p>
          ))}
          {section.bullets ? (
            <ul className="canvas-privacy__list">
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {section.note ? (
            <p className="canvas-privacy__note">{section.note}</p>
          ) : null}
        </section>
      ))}
    </div>
  );
}

function ReviewBanner() {
  if (!calicapTerms.requiresOwnerReview) return null;
  const banner = calicapTerms.reviewBanner;

  return (
    <aside
      className="canvas-privacy__banner"
      role="note"
      aria-label={banner.title}
    >
      <p className="canvas-privacy__banner-title">{banner.title}</p>
      <p className="canvas-privacy__banner-body">{banner.body}</p>
    </aside>
  );
}

export function TermsPageView() {
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

        <ReviewBanner />

        <div className="canvas-privacy__layout">
          <TermsToc />
          <TermsSections />
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
