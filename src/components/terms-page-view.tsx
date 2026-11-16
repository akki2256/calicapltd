"use client";

import Link from "next/link";
import {
  BadgeCheck,
  Ban,
  Briefcase,
  Building2,
  CircleDollarSign,
  Copyright,
  FileText,
  Globe,
  Mail,
  Plug,
  RefreshCw,
  Scale,
  ScrollText,
  Shield,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { CanvasIconMatrix } from "@/components/canvas/canvas-icon-matrix";
import { CanvasLegalBackdrop } from "@/components/canvas/canvas-legal-backdrop";
import { CanvasReveal } from "@/components/canvas/motion";
import { TERMS_SECTIONS, calicapTerms } from "@/lib/calicap-terms";

const TERMS_TOC_ICONS: Record<(typeof TERMS_SECTIONS)[number]["id"], LucideIcon> = {
  introduction: ScrollText,
  "about-calicon": Building2,
  "website-use": Globe,
  "services-agreements": Briefcase,
  "quotes-pricing": CircleDollarSign,
  "intellectual-property": Copyright,
  "client-responsibilities": Users,
  "third-party": Plug,
  "maintenance-support": Wrench,
  "confidentiality-privacy": Shield,
  warranties: BadgeCheck,
  liability: Scale,
  suspension: Ban,
  changes: RefreshCw,
  "governing-law": FileText,
  contact: Mail,
};

function TermsToc() {
  return (
    <nav aria-label="Terms & Conditions sections">
      <p className="canvas-privacy__toc-label">On this page</p>
      <CanvasIconMatrix
        items={TERMS_SECTIONS.map((section) => ({
          key: section.id,
          label: section.title,
          href: `#${section.id}`,
          icon: TERMS_TOC_ICONS[section.id],
        }))}
      />
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

export function TermsPageView() {
  const page = calicapTerms;

  return (
    <article
      className="canvas-privacy canvas-privacy--terms w-full min-w-0 pt-4 pb-0"
      data-canvas-authored=""
    >
      <CanvasLegalBackdrop />
      <div className="canvas-privacy__content">
        <header className="canvas-privacy__hero">
          {/* <CanvasReveal variant="riseSoft" immediate>
            <p className="canvas-micro text-[var(--color-accent)]">{page.hero.eyebrow}</p>
          </CanvasReveal> */}
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
            <TermsToc />
          </CanvasReveal>
        </header>

        <div className="canvas-privacy__sections-wrap mt-10">
          <TermsSections />
        </div>

        {/* <p className="canvas-privacy__related">
          Related:{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>
          {" · "}
          <Link href="/contact">Contact</Link>
          {" · "}
          <Link href="/faqs">FAQs</Link>
        </p> */}
      </div>
    </article>
  );
}
