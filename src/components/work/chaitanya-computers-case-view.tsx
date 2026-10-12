"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Clock3,
  ExternalLink,
  Globe2,
  MessageCircle,
  MonitorSmartphone,
  Package,
  ShoppingCart,
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
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const study = getWorkStudyBySlug("chaitanya-computers")!;
const studyImage = getWorkStudyImage(study);
const liveUrl = "https://chaitanyacomputers.com";
const liveHost = "chaitanyacomputers.com";

const snapshot = [
  { value: "3 wks", label: "Concept to launch", icon: Clock3 },
  { value: "Web + ops", label: "Presence & inventory/sales", icon: MonitorSmartphone },
  { value: "Live", label: liveHost, icon: Globe2 },
] as const;

const meta = [
  { label: "Client", value: "Chaitanya Computers" },
  { label: "Industry", value: "Computer retail & services" },
  { label: "Services", value: "Website · Inventory & sales management" },
  { label: "Timeline", value: "3 weeks" },
  { label: "Agency", value: "Calicon" },
] as const;

const challenges = [
  {
    t: "A business without a digital front door",
    d: "Customers already knew the counter. Search, WhatsApp referrals, and first-time visitors did not have a credible place to land.",
    icon: Globe2,
  },
  {
    t: "Stock and sales living in fragments",
    d: "Inventory movement and day-to-day sales sat across informal tools. Rebuilding the picture of what was in stock and what moved cost hours every week.",
    icon: Boxes,
  },
  {
    t: "Presence and operations as one problem",
    d: "A brochure site alone would not fix the floor. A back-office tool alone would not help the next customer find them. Both had to ship together.",
    icon: Target,
  },
] as const;

const objectives = [
  "Establish a clear, trustworthy digital presence for the retail business.",
  "Give the team a customized way to manage inventory and sales without generic retail software friction.",
  "Reduce the cost of coordination between what the public sees and how the shop actually runs.",
] as const;

const capabilities = [
  {
    t: "A website that represents the business",
    d: "chaitanyacomputers.com as the digital front desk — brand, offerings, and a path to contact — built to match the seriousness of the retail operation.",
    icon: Globe2,
  },
  {
    t: "Inventory shaped to how they stock",
    d: "Stock visibility and movement designed around their categories and day-to-day flow, not a one-size retail ERP drop-in.",
    icon: Package,
  },
  {
    t: "Sales that stay connected to stock",
    d: "Sales activity tied into the same operating picture so the floor stops reconciling what sold with what remains by hand.",
    icon: ShoppingCart,
  },
] as const;

const impact = [
  {
    t: "Digital presence",
    d: "A live public site that gives the business a searchable, referral-ready face online.",
  },
  {
    t: "Operational clarity",
    d: "Inventory and sales managed in a system built around their workflow instead of patched spreadsheets.",
  },
  {
    t: "Faster delivery",
    d: "Website and customized management solution shipped together in three weeks.",
  },
  {
    t: "Room to grow",
    d: "One engagement that strengthens both how customers find them and how the team runs the counter.",
  },
] as const;

const delivered = [
  "Public marketing website",
  "Brand-led digital presence",
  "Contact / enquiry paths",
  "Custom inventory management",
  "Sales management workflow",
  "Stock & sales visibility",
  "Responsive web build",
  "Ops-ready product model",
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
          Transform · Web · Inventory &amp; sales
        </p>
      </CanvasReveal>

      <div className="mt-5">
        <CanvasTextRevealInView
          as="h1"
          lines={["Chaitanya", "Computers"]}
          className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[var(--color-text-strong)]"
        />
      </div>

      <CanvasReveal variant="blurIn" delay={0.12} className="mt-6 max-w-2xl">
        <p className="text-[17px] leading-[1.7] text-[var(--color-text-muted)]">
          Enhancing digital presence and optimizing retail operations — a live
          website plus a customized inventory and sales management solution,
          delivered in three weeks.
        </p>
      </CanvasReveal>

      <CanvasReveal variant="rise" delay={0.18} className="mt-8">
        <VisitSiteLink className="inline-flex items-center gap-2 border border-[var(--color-border-subtle)] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-strong)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
          Visit website
        </VisitSiteLink>
      </CanvasReveal>

      <CanvasReveal variant="rise" delay={0.1} className="mt-14">
        <div className="relative aspect-[16/9] overflow-hidden border border-[var(--color-border-subtle)]">
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
            Atmosphere stand-in · product snapshots forthcoming
          </p>
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
            Chaitanya Computers approached Calicon to strengthen how the business
            shows up online and how inventory and sales are run day to day.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            The objective was dual: enhance digital presence for customers and
            optimize operations — and cost of coordination — with a customized
            inventory and sales management solution shaped to their retail floor.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Calicon delivered both surfaces in one engagement: the public website
            at {liveHost} and the internal management system behind the counter.
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
            We treated the website and the management system as one operating story:
            how customers find the business, and how the team runs stock and sales
            once demand arrives.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Off-the-shelf retail software would have forced process change first.
            This build started from their categories, counters, and handoffs — then
            fitted the product around that reality.
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
              Offline retail loop
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <li>Business known at the counter, thin online</li>
              <li>Stock and sales rebuilt from informal tools</li>
              <li>No single place for presence and ops</li>
              <li>Coordination cost hidden in every day</li>
            </ul>
          </div>
          <div className="bg-[var(--color-surface)] px-6 py-7">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              After
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-lg text-[var(--color-text-strong)]">
              Presence + managed operations
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <li>Live site at {liveHost}</li>
              <li>Inventory and sales in one customized system</li>
              <li>Public face and floor workflow delivered together</li>
              <li>Less time stitching tools to answer basic questions</li>
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
            Client product captures for the live site and inventory/sales system
            will be added here. Until then, visit{" "}
            <VisitSiteLink className="inline-flex items-center gap-1 font-medium text-[var(--color-accent)] transition hover:text-[var(--color-text-strong)]" />
            .
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
            Delivered in three weeks, the engagement gave Chaitanya Computers a
            digital front door and a customized way to run inventory and sales —
            presence and operations improved in the same build.
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
        Work
      </Link>

      <div className="relative mb-10 mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80">
        <Image
          src={studyImage.src}
          alt={studyImage.alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 720px"
          priority
        />
      </div>

      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
        <MonitorSmartphone className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
        Web · inventory · sales
      </p>

      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
        Chaitanya Computers
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-slate-600">
        Digital presence plus customized inventory and sales management — shipped
        in three weeks.
      </p>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="surface-card rounded-2xl p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Engagement
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-800">
            Website · inventory &amp; sales
          </dd>
        </div>
        <div className="surface-card rounded-2xl p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Timeline
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-800">3 weeks</dd>
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
        Chaitanya Computers needed a credible digital front door and a tighter grip
        on inventory and sales. Calicon delivered both: a public website and a
        customized management solution shaped to how the shop actually runs.
      </p>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        The challenge
      </h2>
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
        What we delivered
      </h2>
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

      <p className="mt-14 text-base leading-relaxed text-slate-600">
        Product snapshots will be added when client captures are available. See the
        live site at{" "}
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

export function ChaitanyaComputersCaseView() {
  return <ThemeSplit canvas={<CanvasCase />} calicon={<CaliconCase />} />;
}
