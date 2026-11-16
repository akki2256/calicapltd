"use client";

import Link from "next/link";
import {
  Baby,
  Cookie,
  Database,
  Globe2,
  Info,
  Mail,
  RefreshCw,
  ScrollText,
  Server,
  Share2,
  Shield,
  ShieldCheck,
  UserRoundSearch,
  type LucideIcon,
} from "lucide-react";
import { CanvasIconMatrix } from "@/components/canvas/canvas-icon-matrix";
import { CanvasLegalBackdrop } from "@/components/canvas/canvas-legal-backdrop";
import { CanvasReveal } from "@/components/canvas/motion";
import {
  PRIVACY_POLICY_SECTIONS,
  calicapPrivacyPolicy,
} from "@/lib/calicap-privacy-policy";

const PRIVACY_TOC_ICONS: Record<
  (typeof PRIVACY_POLICY_SECTIONS)[number]["id"],
  LucideIcon
> = {
  introduction: ScrollText,
  "information-collected": UserRoundSearch,
  "technical-attribution": Info,
  "how-we-use": Database,
  "hosting-providers": Server,
  cookies: Cookie,
  "sharing-transfers": Share2,
  retention: Globe2,
  security: ShieldCheck,
  rights: Shield,
  children: Baby,
  updates: RefreshCw,
  contact: Mail,
};

function PolicyToc() {
  return (
    <nav aria-label="Privacy Policy sections">
      <p className="canvas-privacy__toc-label">On this page</p>
      <CanvasIconMatrix
        items={PRIVACY_POLICY_SECTIONS.map((section) => ({
          key: section.id,
          label: section.title,
          href: `#${section.id}`,
          icon: PRIVACY_TOC_ICONS[section.id],
        }))}
      />
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

export function PrivacyPolicyPageView() {
  const page = calicapPrivacyPolicy;

  return (
    <article className="canvas-privacy w-full min-w-0 pt-4 pb-0" data-canvas-authored="">
      <CanvasLegalBackdrop />
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
          <CanvasReveal variant="riseSoft" delay={0.14} className="mt-8">
            <PolicyToc />
          </CanvasReveal>
        </header>

        <div className="canvas-privacy__sections-wrap mt-10">
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
