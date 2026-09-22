"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  DraftingCompass,
  ExternalLink,
  Eye,
  FileText,
  LayoutGrid,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  Sparkles,
  Target,
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CapabilityTrail } from "@/components/capability-trail";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import {
  CanvasReveal,
  CanvasStagger,
  CanvasStaggerItem,
  CanvasTextRevealInView,
  canvasDur,
  canvasEase,
} from "@/components/canvas/motion";
import { ThemeSplit } from "@/components/theme-split";
import { WorkViewTracker } from "@/components/work-view-tracker";
import { getWorkStudyBySlug, getWorkStudyImage } from "@/lib/calicap-work";
import { siteImages } from "@/lib/site-images";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const study = getWorkStudyBySlug("amazing-art-architects")!;
const studyImage = getWorkStudyImage(study);
const portfolioImage = siteImages.amazingArtPortfolio;
const liveUrl = "https://www.amazingartarchitects.com";
const liveHost = "amazingartarchitects.com";

const snapshot = [
  { value: "4 wks", label: "Concept to launch", icon: Sparkles },
  { value: "End-to-end", label: "UI/UX → React build", icon: Palette },
  { value: "Live", label: "Enquiries from the site", icon: Target },
] as const;

const meta = [
  { label: "Client", value: "Amazing Art Architects" },
  { label: "Industry", value: "Architecture & interior design" },
  { label: "Services", value: "UI/UX · Web design & development" },
  { label: "Stack", value: "React · JavaScript · HTML5 · CSS3" },
  { label: "Timeline", value: "4 weeks" },
  { label: "Agency", value: "Calicon" },
] as const;

const challenges = [
  {
    t: "A large portfolio without the clutter",
    d: "Architecture is visual. Projects needed room to land — without the site feeling crowded or hard to navigate.",
    icon: LayoutGrid,
  },
  {
    t: "Imagery first, always",
    d: "The firm’s work had to stay primary. Interface chrome had to complement renders, not compete with them.",
    icon: Eye,
  },
  {
    t: "One experience, every screen",
    d: "Visual quality and usability had to hold on desktop, tablet, and mobile — not degrade into a scaled brochure.",
    icon: MonitorSmartphone,
  },
] as const;

const objectives = [
  "Establish a premium and distinctive digital identity.",
  "Create an engaging experience for exploring the firm’s portfolio.",
  "Turn website visitors into potential client enquiries.",
] as const;

const impact = [
  {
    t: "Premium brand presence",
    d: "A refined digital identity designed to represent the firm’s positioning and design philosophy.",
  },
  {
    t: "Portfolio experience",
    d: "A visually-led portfolio that lets visitors explore diverse projects without feeling overwhelmed.",
  },
  {
    t: "Lead generation",
    d: "A clear journey from interest in the work to a conversation with the practice.",
  },
  {
    t: "Responsive experience",
    d: "A consistent, carefully considered experience across desktop, tablet, and mobile.",
  },
] as const;

const delivered = [
  "Visual direction & UI design",
  "Brand-led homepage",
  "Portfolio browsing experience",
  "Project presentation layouts",
  "Enquiry / contact paths",
  "Responsive React build",
  "Mobile-first adaptation",
  "Performance-minded front end",
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
    <article className="mx-auto max-w-[920px] py-4">
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
          Transform · Web · Architecture
        </p>
      </CanvasReveal>

      <div className="mt-5">
        <CanvasTextRevealInView
          as="h1"
          lines={["Amazing Art", "Architects"]}
          className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[var(--color-text-strong)]"
        />
      </div>

      <CanvasReveal variant="blurIn" delay={0.12} className="mt-6 max-w-2xl">
        <p className="text-[17px] leading-[1.7] text-[var(--color-text-muted)]">
          Building a premium digital presence for an architecture practice —
          portfolio-first, enquiry-ready, and true to the quality of their built work.
        </p>
      </CanvasReveal>

      <CanvasReveal variant="rise" delay={0.18} className="mt-8">
        <VisitSiteLink className="inline-flex items-center gap-2 border border-[var(--color-border-subtle)] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-strong)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
          Visit website
        </VisitSiteLink>
      </CanvasReveal>

      <CanvasReveal variant="rise" delay={0.1} className="mt-14">
        <div className="relative aspect-[1024/469] overflow-hidden border border-[var(--color-border-subtle)]">
          <motion.div
            className="absolute inset-0"
            initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: canvasDur.slow, ease: canvasEase, delay: 0.2 }}
          >
            <Image
              src={studyImage.src}
              alt={studyImage.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 960px) 100vw, 920px"
              priority
            />
          </motion.div>
          <p className="pointer-events-none absolute bottom-4 left-4 z-10 text-[10px] uppercase tracking-[0.18em] text-white/85">
            Live site · brand &amp; composition
          </p>
        </div>
      </CanvasReveal>

      <CanvasStagger className="mt-10 grid gap-px border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] sm:grid-cols-3" stagger={0.08}>
        {snapshot.map(({ value, label }) => (
          <CanvasStaggerItem
            key={label}
            className="bg-[var(--color-surface)] px-5 py-6"
          >
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
            Amazing Art Architects approached Calicon to create a digital presence
            that reflected the quality, sophistication, and design-led approach of
            their work.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            The goal was more than a portfolio site. The platform needed to establish
            a premium brand presence, showcase a diverse body of projects, and create
            a clear path for potential clients to connect with the firm.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Calicon handled the project end-to-end — visual direction, interface
            design, development, and responsive implementation.
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
            <CanvasStaggerItem key={t} className="grid gap-4 sm:grid-cols-[3rem_1fr] sm:gap-6">
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
            We approached the website as an extension of Amazing Art Architects’
            design philosophy — clean, considered, and intentional.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            The visual language stayed refined and understated so projects and
            imagery could take centre stage. Hierarchy, spacing, and seamless
            browsing mattered more than decorative interface noise.
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
          lines={["Design & development"]}
          className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <CanvasReveal variant="blurIn" delay={0.08} className="mt-6 max-w-2xl space-y-4">
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Calicon created the visual direction and UI specifically for the practice.
            Typography, spacing, and project presentation were tuned for an editorial,
            sophisticated feel that still stays intuitive to use.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            The site was developed in React with a focus on performance,
            responsiveness, and consistency — translating a custom design into a
            flexible experience that can carry a substantial portfolio across devices.
          </p>
        </CanvasReveal>
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
        <CanvasReveal variant="riseSoft">
          <p className="canvas-micro text-[var(--color-accent)]">In the product</p>
        </CanvasReveal>
        <CanvasTextRevealInView
          as="h2"
          lines={["Portfolio that breathes"]}
          className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <CanvasReveal variant="blurIn" delay={0.08} className="mt-5 max-w-xl">
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Day and night residential renders sit in a calm grid — enough room for
            each project to land, without turning browsing into a scroll marathon.
          </p>
        </CanvasReveal>
        <CanvasReveal variant="rise" delay={0.1} className="mt-10">
          <div className="relative aspect-[1024/470] overflow-hidden border border-[var(--color-border-subtle)]">
            <Image
              src={portfolioImage.src}
              alt={portfolioImage.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 960px) 100vw, 920px"
            />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Portfolio grid · residential project captures
          </p>
        </CanvasReveal>
      </section>

      <section className="mt-20 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasTextRevealInView
          as="h2"
          lines={["The result"]}
          className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]"
        />
        <CanvasReveal variant="blurIn" delay={0.08} className="mt-6 max-w-2xl space-y-4">
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Delivered in four weeks, the site gave Amazing Art Architects a digital
            platform that better represents the quality and character of their work.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            After launch, the website began generating meaningful traffic and client
            enquiries — a stronger channel for showcasing the portfolio and connecting
            with prospective clients. Feedback centred on the premium presentation and
            how the portfolio came together as one cohesive experience.
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

      <section className="mt-20 border-t border-[var(--color-border-subtle)] pt-12">
        <CanvasReveal variant="blurIn" className="max-w-2xl">
          <p className="font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.5vw,1.75rem)] leading-snug tracking-[-0.02em] text-[var(--color-text-strong)]">
            Architecture deserves a digital experience with the same attention to
            detail as the spaces it creates.
          </p>
          <p className="mt-5 text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            For Amazing Art Architects, Calicon turned that philosophy into a modern
            presence designed to showcase their work, strengthen their brand, and open
            new opportunities for business.
          </p>
        </CanvasReveal>
      </section>

      <CapabilityTrail pillarIds={study.pillars} serviceIds={study.serviceIds} />

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
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
          More case studies
        </ButtonLink>
      </div>
    </article>
  );
}

function CaliconCase() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
      <SharedTracker />

      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-700/90 hover:text-gold-600"
      >
        <ArrowLeft className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
        <FileText className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
        Work
      </Link>

      <div className="relative mb-10 mt-8 aspect-[1024/469] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80">
        <Image
          src={studyImage.src}
          alt={studyImage.alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 720px"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent"
          aria-hidden
        />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/55 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
            Live site capture
          </p>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold-600 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg transition hover:bg-gold-500"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            Visit website
          </a>
        </div>
      </div>

      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
        <DraftingCompass className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
        Web · UI/UX · architecture
      </p>

      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
        Amazing Art Architects
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-slate-600">
        Building a premium digital presence for an architecture practice.
      </p>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="surface-card rounded-2xl p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Engagement
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-800">
            UI/UX · web design &amp; development
          </dd>
        </div>
        <div className="surface-card rounded-2xl p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Timeline
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-800">4 weeks</dd>
        </div>
        <div className="surface-card rounded-2xl p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Live
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-800">
            <VisitSiteLink className="inline-flex items-center gap-1 text-gold-600 hover:text-gold-700" />
          </dd>
        </div>
      </dl>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {snapshot.map(({ value, label, icon: Icon }) => (
          <div key={label} className="surface-card rounded-2xl p-5 text-center sm:text-left">
            <Icon className="mx-auto h-5 w-5 text-gold-600 sm:mx-0" strokeWidth={2} aria-hidden />
            <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
              {value}
            </p>
            <p className="mt-1 text-sm text-slate-600">{label}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Overview
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Amazing Art Architects approached Calicon to create a digital presence that
        reflected the quality, sophistication, and design-led approach of their work.
      </p>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        The goal was to build more than a portfolio website. The new platform needed
        to establish a premium brand presence, showcase their diverse projects, and
        create a clear path for potential clients to connect with the firm.
      </p>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Calicon handled the project end-to-end — from visual direction and interface
        design to development and responsive implementation.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {meta.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)]/40 px-4 py-3"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {item.label}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800">{item.value}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        The challenge
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        The key challenge was presenting a large collection of architectural projects
        without making the website feel crowded or overwhelming — keeping the
        portfolio primary while the experience stayed clear and intuitive.
      </p>
      <ul className="mt-6 space-y-4 text-slate-600">
        {challenges.map(({ t, d, icon: Icon }) => (
          <li key={t} className="flex gap-3 leading-relaxed">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)]">
              <Icon className="h-4 w-4 text-gold-700" strokeWidth={2} aria-hidden />
            </span>
            <span>
              <span className="font-medium text-slate-800">{t}.</span> {d}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Our approach
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        We approached the website as an extension of Amazing Art Architects’ design
        philosophy — clean, considered, and intentional. The visual language was
        refined and understated so the firm’s projects could take centre stage.
      </p>
      {study.deliveryNotes?.length ? (
        <ul className="mt-6 space-y-3 text-slate-600">
          {study.deliveryNotes.map((note) => (
            <li key={note} className="flex gap-2 leading-relaxed">
              <span
                className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold-600"
                aria-hidden
              />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <ol className="mt-6 space-y-3">
        {objectives.map((item, i) => (
          <li key={item} className="flex gap-3 text-base leading-relaxed text-slate-600">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-600/15 text-[11px] font-semibold text-gold-700">
              {i + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Design &amp; development
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Calicon created the visual direction and UI design specifically for Amazing
        Art Architects — typography, spacing, content hierarchy, and project
        presentation tuned for a sophisticated, editorial feel that remains intuitive.
      </p>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        The website was developed with React and modern web technologies, with a
        strong focus on performance, responsiveness, and consistency across desktop,
        tablet, and mobile.
      </p>
      <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {delivered.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)]/50 px-3 py-2 text-sm text-slate-700"
          >
            <span
              className="h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Portfolio experience
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        A visually-led grid keeps residential work front and centre — day and night
        captures, enough space per project, and a browsing rhythm that never feels
        cramped.
      </p>
      <div className="relative mt-6 aspect-[1024/470] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80">
        <Image
          src={portfolioImage.src}
          alt={portfolioImage.alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>
      <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
        Portfolio grid · residential project captures
      </p>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        The result
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Delivered within four weeks, the new website gave Amazing Art Architects a
        digital platform that better represents the quality and character of their
        work. Following launch, the site began generating meaningful traffic and
        client enquiries — with positive feedback on the premium presentation and
        cohesive portfolio experience.
      </p>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Impact
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {impact.map((item) => (
          <div key={item.t} className="surface-card rounded-2xl p-5">
            <p className="text-sm font-medium text-slate-800">{item.t}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.d}</p>
          </div>
        ))}
      </div>

      <p className="mt-14 text-base leading-relaxed text-slate-600">
        Architecture deserves a digital experience with the same attention to detail
        as the spaces it creates. For Amazing Art Architects, Calicon transformed that
        philosophy into a modern digital presence — live at{" "}
        <VisitSiteLink className="inline-flex items-center gap-1 font-medium text-gold-600 hover:text-gold-700" />
        .
      </p>

      <CapabilityTrail pillarIds={study.pillars} serviceIds={study.serviceIds} />

      <div className="mt-12 flex flex-wrap gap-4">
        <ProblemCtaButton>
          <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          {study.ctaLabel}
        </ProblemCtaButton>
        <ButtonLink href={liveUrl} target="_blank" rel="noopener noreferrer" variant="ghost">
          <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Visit website
        </ButtonLink>
        <ButtonLink href="/work" variant="ghost">
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          More case studies
        </ButtonLink>
      </div>
    </article>
  );
}

export function AmazingArtCaseView() {
  return <ThemeSplit canvas={<CanvasCase />} calicon={<CaliconCase />} />;
}
