"use client";

import Link from "next/link";
import { CanvasReveal } from "@/components/canvas/motion";
import {
  PRIVACY_POLICY_SECTIONS,
  calicapPrivacyPolicy,
} from "@/lib/calicap-privacy-policy";

function PolicyToc() {
  return (
    <nav className="canvas-privacy__toc" aria-label="Privacy Policy sections">
      <p className="canvas-privacy__toc-label">On this page</p>
      <ol className="canvas-privacy__toc-list">
        {PRIVACY_POLICY_SECTIONS.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>{section.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function linkPrivacyEmail(text: string) {
  const email = calicapPrivacyPolicy.privacyEmail;
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

function PolicySections() {
  return (
    <div className="canvas-privacy__sections">
      {PRIVACY_POLICY_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="canvas-privacy__section"
          aria-labelledby={`${section.id}-title`}
        >
          <h2 id={`${section.id}-title`} className="canvas-privacy__h2">
            {section.title}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="canvas-privacy__p">
              {linkPrivacyEmail(paragraph)}
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
  if (!calicapPrivacyPolicy.requiresOwnerReview) return null;
  const banner = calicapPrivacyPolicy.reviewBanner;

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

export function PrivacyPolicyPageView() {
  const page = calicapPrivacyPolicy;

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
          <PolicyToc />
          <PolicySections />
        </div>

        <p className="canvas-privacy__related">
          Related:{" "}
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
          {" · "}
          <Link href="/contact">Contact</Link>
          {" · "}
          <Link href="/faqs">FAQs</Link>
        </p>
      </div>
    </article>
  );
}
