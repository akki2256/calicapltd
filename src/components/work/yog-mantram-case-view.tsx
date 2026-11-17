"use client";

import { SiteImage } from "@/components/site-image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  LayoutGrid,
  MessageCircle,
  Search,
  Smartphone,
  Target,
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import {
  CanvasReveal,
  CanvasStagger,
  CanvasStaggerItem,
  CanvasTextRevealInView,
  canvasDur,
  canvasEase,
} from "@/components/canvas/motion";
import { WorkViewTracker } from "@/components/work-view-tracker";
import { getWorkStudyBySlug, getWorkStudyImage } from "@/lib/calicap-work";
import { siteImages } from "@/lib/site-images";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const study = getWorkStudyBySlug("yog-mantram")!;
const studyImage = getWorkStudyImage(study);
const liveUrl = "https://www.yogmantram.com";
const liveHost = "yogmantram.com";

const productSnapshots = [
  {
    src: siteImages.yogMantramHero.src,
    alt: siteImages.yogMantramHero.alt,
    label: "Homepage hero",
    caption:
      "Full-bleed studio hero with clear next steps — Start Your Journey and Explore Programs.",
  },
  {
    src: siteImages.yogMantramVision.src,
    alt: siteImages.yogMantramVision.alt,
    label: "Vision & mission",
    caption:
      "Brand story laid out clearly — why the studio exists and what it commits to deliver.",
  },
  {
    src: siteImages.yogMantramPrograms.src,
    alt: siteImages.yogMantramPrograms.alt,
    label: "Program paths",
    caption:
      "Types of Yoga and sibling tracks — each style with a short description so visitors find their practice.",
  },
] as const;

const snapshot = [
  { value: "25+", label: "Program pages" },
  { value: "Local", label: "Bareilly search pages" },
  { value: "1 tap", label: "Enquire / WhatsApp" },
] as const;

const meta = [
  { label: "Client", value: "Yog Mantram" },
  { label: "Industry", value: "Fitness & wellness · yoga studio" },
  { label: "Services", value: "Brand · web · local SEO" },
  { label: "Stack", value: "Next.js · schema · Open Graph" },
  { label: "Agency", value: "Calicon" },
] as const;

const challenges = [
  {
    t: "Searchers had nowhere local to land",
    d: "People looking for yoga in Bareilly had no local, program-level page. The studio was known by students — not by Google.",
    icon: Search,
  },
  {
    t: "Many offerings, no clear next step",
    d: "Traditional asana, power yoga, kids, corporate wellness, teacher training, retreats — visitors could not tell which class was theirs or how to enquire.",
    icon: LayoutGrid,
  },
  {
    t: "Most first visits happen on a phone",
    d: "The studio needed a digital front desk that works in one hand — not a brochure that only holds up on a laptop.",
    icon: Smartphone,
  },
] as const;

const objectives = [
  "Build a premium digital front desk that feels as considered as the practice room.",
  "Give every program a findable URL with a clear enquire path.",
  "Win local Bareilly search intent without turning the team into a blog.",
] as const;

const capabilities = [
  {
    t: "A home that sells the practice",
    d: "A full-bleed video hero and a clear next step — Start Your Journey, Explore Programs, Book a Trial, or WhatsApp — so visitors choose instead of wandering.",
    icon: Target,
  },
  {
    t: "A URL for every class",
    d: "Twenty-five-plus program pages across five offering lines. Each one says who it is for, what a session includes, and what to do next.",
    icon: LayoutGrid,
  },
  {
    t: "Bareilly, on purpose",
    d: "A dedicated city landing page and search-intent titles built for people looking for yoga, meditation, kids classes, corporate wellness, and teacher training in Bareilly — not generic yoga copy.",
    icon: Search,
  },
  {
    t: "Enquire without a dead end",
    d: "Trial, contact, and WhatsApp sit on every program. Memberships and professional training are priced in the open, so “interested” has a next step.",
    icon: MessageCircle,
  },
  {
    t: "Built for a phone in one hand",
    d: "Mobile-first layout, instructor profiles, policies, schema, sitemap, and Open Graph — so the studio looks considered in search, shares, and on a small screen.",
    icon: Smartphone,
  },
] as const;

const impact = [
  {
    t: "Search-ready front desk",
    d: "Local pages and program URLs for people already looking for yoga in Bareilly.",
  },
  {
    t: "Conversion on every class",
    d: "Trial, enquire, and WhatsApp sit on the journey — no dead ends after interest.",
  },
  {
    t: "Brand that matches the room",
    d: "A cinematic, considered presence instead of a generic yoga template.",
  },
  {
    t: "Built to fill classes",
    d: "One site shaped to grow with the studio — educational pages support search without becoming a content burden.",
  },
] as const;

const delivered = [
  "Next.js marketing site",
  "Cinematic video hero",
  "25+ program pages",
  "Memberships & training",
  "Bareilly landing page",
  "Trial / enquire / WhatsApp",
  "Local SEO & schema",
  "Educational yoga hub",
  "Instructor profiles",
  "Mobile-first UI",
] as const;

function VisitSiteLink({
  className,
  children = liveHost,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
    </a>
  );
}

function SharedTracker() {
  return <WorkViewTracker slug={study.slug} />;
}

function CanvasCase() {
  const reduced = usePrefersReducedMotion();

  return (
    <article className="w-full min-w-0 py-4">
      <SharedTracker />

      <CanvasReveal variant="riseSoft">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition hover:text-[var(--color-text-strong)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
          Work
        </Link>
      </CanvasReveal>

      <CanvasReveal variant="riseSoft" delay={0.06} className="mt-10">
        <p className="canvas-micro text-[var(--color-accent)]">
          Transform · Web · Local SEO
        </p>
      </CanvasReveal>

      <div className="mt-5">
        <CanvasTextRevealInView
          as="h1"
          lines={["Yog Mantram"]}
          className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[var(--color-text-strong)]"
        />
      </div>

      <CanvasReveal variant="blurIn" delay={0.12} className="mt-6 max-w-2xl">
        <p className="text-[17px] leading-[1.7] text-[var(--color-text-muted)]">
          From neighbourhood studio to the yoga destination Bareilly searches for.
        </p>
      </CanvasReveal>

      <CanvasReveal variant="rise" delay={0.18} className="mt-8">
        <VisitSiteLink className="inline-flex items-center gap-2 border border-[var(--color-border-subtle)] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-strong)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
          Visit website
        </VisitSiteLink>
      </CanvasReveal>

      <CanvasReveal variant="rise" delay={0.1} className="mt-14">
        <div className="relative aspect-[1024/571] overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
          <motion.div
            className="absolute inset-0"
            initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: canvasDur.slow, ease: canvasEase, delay: 0.2 }}
          >
            <SiteImage
              src={studyImage.src}
              alt={studyImage.alt}
              fill
              className="object-contain object-center"
              sizes="(max-width: 960px) 100vw, 1200px"
              priority
            />
          </motion.div>
        </div>
      </CanvasReveal>

      <CanvasStagger
        className="mt-10 grid gap-px border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] sm:grid-cols-3"
        stagger={0.08}
      >
        {snapshot.map(({ value, label }) => (
          <CanvasStaggerItem key={label} className="bg-[var(--color-surface)] px-5 py-6">
            <p className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-[var(--color-text-strong)]">
              {value}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
              {label}
            </p>
          </CanvasStaggerItem>
        ))}
      </CanvasStagger>

      <section className="mt-20 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-text-muted)]">Engagement</p>
        </CanvasReveal>
        <dl className="mt-8 grid gap-8 sm:grid-cols-2">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                {item.label}
              </dt>
              <dd className="mt-2 text-sm text-[var(--color-text-strong)]">{item.value}</dd>
            </div>
          ))}
          <div>
            <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Live
            </dt>
            <dd className="mt-2">
              <VisitSiteLink className="inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] transition hover:text-[var(--color-text-strong)]" />
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-20 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasTextRevealInView
          as="h2"
          lines={["Overview"]}
          className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <CanvasReveal variant="blurIn" delay={0.08} className="mt-6 max-w-2xl space-y-4">
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Yog Mantram is a boutique yoga and wellness studio in Rampur Garden,
            Bareilly. Students already knew the mats. Google, WhatsApp, and
            first-time visitors did not.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Calicon designed and built yogmantram.com as a digital front desk: a
            premium Next.js site with a cinematic hero, program-by-program
            conversion, and enquire paths that go straight to the studio.
          </p>
        </CanvasReveal>
      </section>

      <section className="mt-20 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasTextRevealInView
          as="h2"
          lines={["The challenge"]}
          className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <CanvasStagger className="mt-10 space-y-8" stagger={0.1}>
          {challenges.map(({ t, d, icon: Icon }) => (
            <CanvasStaggerItem
              key={t}
              className="grid gap-4 sm:grid-cols-[3rem_1fr] sm:gap-6"
            >
              <span className="flex h-10 w-10 items-center justify-center border border-[var(--color-border-subtle)] text-[var(--color-accent)]">
                <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text-strong)]">
                  {t}
                </p>
                <p className="mt-2 text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
                  {d}
                </p>
              </div>
            </CanvasStaggerItem>
          ))}
        </CanvasStagger>
      </section>

      <section className="mt-20 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasTextRevealInView
          as="h2"
          lines={["Our approach"]}
          className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <CanvasReveal variant="blurIn" delay={0.08} className="mt-6 max-w-2xl space-y-4">
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Educational “Know About Yoga” pages support search without turning the
            team into a blog. Under the calm surface: local business schema,
            sitemap, Open Graph, policies, and instructor profiles.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Leads go to the studio. No clutter. No dead ends. A pretty yoga
            template would not have held that.
          </p>
        </CanvasReveal>
        {study.deliveryNotes?.length ? (
          <CanvasReveal variant="riseSoft" delay={0.1} className="mt-8">
            <ul className="max-w-2xl space-y-3">
              {study.deliveryNotes.map((note) => (
                <li
                  key={note}
                  className="flex gap-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]"
                >
                  <span
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]"
                    aria-hidden
                  />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </CanvasReveal>
        ) : null}
        <CanvasReveal variant="riseSoft" delay={0.12} className="mt-8">
          <p className="canvas-micro text-[var(--color-accent)]">Three objectives</p>
          <ol className="mt-5 space-y-3">
            {objectives.map((item, i) => (
              <li
                key={item}
                className="grid grid-cols-[2rem_1fr] gap-4 text-[15px] leading-relaxed text-[var(--color-text-muted)]"
              >
                <span className="font-mono text-xs text-[var(--color-accent)]">
                  0{i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </CanvasReveal>
      </section>

      <section className="mt-20 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasTextRevealInView
          as="h2"
          lines={["What we built"]}
          className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <CanvasStagger className="mt-10 space-y-8" stagger={0.1}>
          {capabilities.map(({ t, d, icon: Icon }) => (
            <CanvasStaggerItem
              key={t}
              className="grid gap-4 sm:grid-cols-[3rem_1fr] sm:gap-6"
            >
              <span className="flex h-10 w-10 items-center justify-center border border-[var(--color-border-subtle)] text-[var(--color-accent)]">
                <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text-strong)]">
                  {t}
                </p>
                <p className="mt-2 text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
                  {d}
                </p>
              </div>
            </CanvasStaggerItem>
          ))}
        </CanvasStagger>
        <ul className="mt-10 grid gap-px border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] sm:grid-cols-2">
          {delivered.map((item) => (
            <li
              key={item}
              className="bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasTextRevealInView
          as="h2"
          lines={["Before / after"]}
          className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <div className="mt-10 grid gap-px border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] sm:grid-cols-2">
          <div className="bg-[var(--color-surface)] px-6 py-7">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Before
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-lg text-[var(--color-text-strong)]">
              Word of mouth
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <li>Studio known by students, not by search</li>
              <li>Programs without a public URL</li>
              <li>Enquire meant “ask a friend”</li>
              <li>No digital front desk on mobile</li>
            </ul>
          </div>
          <div className="bg-[var(--color-surface)] px-6 py-7">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              After
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-lg text-[var(--color-text-strong)]">
              A site that books
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <li>Local pages for Bareilly intent</li>
              <li>Every class has a findable page</li>
              <li>Trial, enquire, WhatsApp on the journey</li>
              <li>Thumbs-first layout, conversion underneath</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-20 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasTextRevealInView
          as="h2"
          lines={["Product snapshots"]}
          className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <CanvasReveal variant="blurIn" delay={0.08} className="mt-6 max-w-2xl">
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Captures from the live site and the studio atmosphere behind it.
          </p>
        </CanvasReveal>
        <div className="mt-10 space-y-12">
          {productSnapshots.map((shot) => (
            <CanvasReveal key={shot.src} variant="riseSoft">
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                {shot.label}
              </p>
              <div className="relative aspect-[1024/571] overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                <SiteImage
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 960px) 100vw, 1200px"
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {shot.caption}
              </p>
            </CanvasReveal>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasTextRevealInView
          as="h2"
          lines={["The result"]}
          className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <CanvasReveal variant="blurIn" delay={0.08} className="mt-6 max-w-2xl space-y-4">
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            The studio that used to live on word of mouth now has a search-ready
            front desk: clear programs, a path from “yoga in Bareilly” to a
            conversation with the team, and a brand that looks as considered as
            the practice. Enquiry numbers stay off this page until they are real.
          </p>
        </CanvasReveal>
      </section>

      <section className="mt-20 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-accent)]">Impact</p>
        </CanvasReveal>
        <CanvasStagger className="mt-10 grid gap-10 sm:grid-cols-2" stagger={0.08}>
          {impact.map((item) => (
            <CanvasStaggerItem key={item.t}>
              <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text-strong)]">
                {item.t}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {item.d}
              </p>
            </CanvasStaggerItem>
          ))}
        </CanvasStagger>
      </section>

      <div className="mt-12 flex flex-wrap gap-4">
        <ProblemCtaButton>
          <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
          {study.ctaLabel}
        </ProblemCtaButton>
        <ButtonLink href={liveUrl} target="_blank" rel="noopener noreferrer" variant="ghost">
          <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
          Visit website
        </ButtonLink>
        <ButtonLink href="/work" variant="ghost">
          More case studies
        </ButtonLink>
      </div>
    </article>
  );
}

export function YogMantramCaseView() {
  return <CanvasCase />;
}
