"use client";

import { SiteImage } from "@/components/site-image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  GitMerge,
  LayoutDashboard,
  MessageCircle,
  Target,
  UsersRound,
  Workflow,
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
import { getWorkStudyBySlug } from "@/lib/calicap-work";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const study = getWorkStudyBySlug("calicap-india")!;
/** Self-contained product guide (copied from Quick Funding CRM docs). */
const productGuideHref = "/guides/quick-funding-crm-guide.html";

const productSnapshots = [
  {
    src: "/images/case-studies/crm-login.jpeg",
    alt: "CRM login — Quick Funding workspace sign-in",
    caption:
      "Secure workspace entry — branded sign-in into the loan operations CRM",
    label: "01 · Login",
  },
  {
    src: "/images/case-studies/crm-dashboard.png",
    alt: "CRM analytics dashboard — pipeline snapshot and team performance",
    caption:
      "Overview dashboard — pipeline snapshot, settlements, and team performance at a glance",
    label: "02 · Dashboard",
  },
  {
    src: "/images/case-studies/crm-deals.jpeg",
    alt: "Deals pipeline board — Open, Closed Won, Deferred, Closed Lost",
    caption:
      "Deals board — Open, Closed Won, Deferred, and Closed Lost without hunting for status",
    label: "03 · Pipeline",
  },
  {
    src: "/images/case-studies/crm-deal-detail.jpeg",
    alt: "CRM deal detail — loan stage workflow from lead through application",
    caption:
      "Deal detail — stage-by-stage loan workflow from lead through application",
    label: "04 · Deal detail",
  },
  {
    src: "/images/case-studies/crm-admin.png",
    alt: "CRM control center for users, workflow, lenders, and communications",
    caption:
      "Control center — users, stage checks, lenders, email, and message templates in one admin surface",
    label: "05 · Admin",
  },
] as const;

const snapshot = [
  { value: "23%", label: "Lower operational cost" },
  { value: "37%", label: "Higher average sales" },
  { value: "60 days", label: "Concept to delivery" },
] as const;

const meta = [
  { label: "Client", value: "Calicap India Pvt. Ltd." },
  { label: "Industry", value: "Financial services · loan operations" },
  { label: "Services", value: "Custom CRM · loan operations software" },
  { label: "Timeline", value: "60 days" },
  { label: "Engagement", value: "Discovery, product design, build" },
  { label: "Agency", value: "Calicon" },
] as const;

const challenges = [
  {
    t: "Customer and deal files split across systems",
    d: "An existing CRM, spreadsheets, email, and chat each did a job — but they did not share a picture of the customer, the deal, or who owned the next step. The team rebuilt the story before they could act.",
    icon: Target,
  },
  {
    t: "Follow-ups that lived in someone’s head",
    d: "Warm customers went quiet because follow-up was manual. Repeat business depended on who remembered to call, not on a process the floor could trust.",
    icon: UsersRound,
  },
  {
    t: "Informal handoffs and invisible pipeline",
    d: "Work allocation was informal. Managers could not see pipeline, load, or risk without assembling a report by hand. Useful knowledge sat with individuals instead of the organization.",
    icon: Workflow,
  },
] as const;

const objectives = [
  "Give the floor one customer and deal record they can trust.",
  "Make follow-ups and ownership run on the loan process, not memory.",
  "Replace the tool patchwork with one platform from first contact through settlement.",
] as const;

const capabilities = [
  {
    t: "A single customer record",
    d: "Identity, history, documents, and related opportunities sit in one profile. Staff stop reconstructing a file from a CRM, a sheet, and a chat thread before they can act.",
    icon: Target,
  },
  {
    t: "A visible path from lead to settlement",
    d: "Every opportunity moves through a structured pipeline. Teams can see stage, owner, and delay — so stalled work is obvious instead of buried in inboxes.",
    icon: GitMerge,
  },
  {
    t: "Follow-ups that run on the process, not memory",
    d: "The system schedules the next action from the deal stage and surfaces it when it is due. Confirm, reschedule, or message the customer from the same workflow.",
    icon: Workflow,
  },
  {
    t: "Work that lands with the right person",
    d: "Ownership, roles, and queues replace informal handoffs. The floor knows what is theirs; managers can see load and progress without assembling a status report.",
    icon: UsersRound,
  },
  {
    t: "Intake without re-keying",
    d: "Inbound leads come in from the team’s existing spreadsheet, skip duplicates, and become CRM records. Less typing, fewer missed rows.",
    icon: LayoutDashboard,
  },
] as const;

const impact = [
  {
    t: "23% lower operational cost",
    d: "Less time reconstructing work across tools — the floor acts from one record.",
  },
  {
    t: "37% higher average sales",
    d: "Follow-ups and ownership that stick to the process, not to whoever remembered.",
  },
  {
    t: "Delivered in 60 days",
    d: "Concept to a working loan-operations platform without waiting on a generic CRM cycle.",
  },
  {
    t: "Room to extend",
    d: "One application shaped to their process — built to grow as the workflow changes, without returning to a patchwork of tools.",
  },
] as const;

const delivered = [
  "Custom CRM",
  "Loan operations",
  "Customer lifecycle",
  "Sales pipeline",
  "Workflow automation",
  "Task allocation",
  "Automated follow-ups",
  "Customer communications",
  "Digital document signing",
  "Dashboards & reporting",
  "Role-based access",
  "Audit & activity history",
] as const;

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
          Build · Custom CRM · Loan ops
        </p>
      </CanvasReveal>

      <div className="mt-5">
        <CanvasTextRevealInView
          as="h1"
          lines={["Calicap India", "Pvt. Ltd."]}
          className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[var(--color-text-strong)]"
        />
      </div>

      <CanvasReveal variant="blurIn" delay={0.12} className="mt-6 max-w-2xl">
        <p className="text-[17px] leading-[1.7] text-[var(--color-text-muted)]">
          A custom platform built around their loan workflow — so the team could
          run the business from one place instead of stitching tools together.
        </p>
      </CanvasReveal>

      <CanvasReveal variant="rise" delay={0.1} className="mt-14">
        <div className="relative aspect-[16/10] overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
          <motion.div
            className="absolute inset-0"
            initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: canvasDur.slow, ease: canvasEase, delay: 0.2 }}
          >
            <SiteImage
              src="/images/case-studies/crm-dashboard.png"
              alt="Calicap India CRM dashboard — pipeline snapshot and team performance"
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
            Calicap India’s loan work was growing faster than the way it was run.
            They did not need another product dropped onto the stack — they needed
            one system shaped to how the floor already worked.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Calicon designed and built a custom CRM around the live sales and
            servicing flow, and delivered it in sixty days — from first contact
            through settlement.
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
            We started with the live sales and servicing flow — not a generic CRM
            template. Stages, owners, handoffs, and the documents that already
            existed in the process became the product model.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Off-the-shelf software would have asked the team to change how they
            work. This build fitted around it — with room to grow without
            repeating the same patchwork.
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
              Four tools, one workflow
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <li>Files rebuilt from CRM, sheets, and chat</li>
              <li>Follow-up lists kept by hand</li>
              <li>Handoffs without a named owner</li>
              <li>Pipeline assembled for meetings</li>
            </ul>
          </div>
          <div className="bg-[var(--color-surface)] px-6 py-7">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              After
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-lg text-[var(--color-text-strong)]">
              One operating platform
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <li>A record the whole team can trust</li>
              <li>Next actions fired by stage</li>
              <li>Queues and named ownership</li>
              <li>Live view for the floor and managers</li>
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
            Captures from the live Quick Funding CRM — login through dashboard,
            pipeline, deal detail, and admin. For a full walkthrough of the
            product,{" "}
            <a
              href={productGuideHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--color-accent)] transition hover:text-[var(--color-text-strong)]"
            >
              read the product guide
            </a>
            .
          </p>
        </CanvasReveal>
        <div className="mt-10 space-y-12">
          {productSnapshots.map((shot) => (
            <CanvasReveal key={shot.src} variant="riseSoft">
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                {shot.label}
              </p>
              <div className="relative aspect-[16/10] overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
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
            The commercial result is above. On the floor, that meant less time
            spent reconstructing work, customers followed up when they needed to
            be, and a system the team could keep extending as the process
            changed — without going back to a patchwork of tools.
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
        <ButtonLink
          href={productGuideHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
        >
          <BookOpen className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
          Read product guide
        </ButtonLink>
        <ButtonLink href="/work" variant="ghost">
          More case studies
        </ButtonLink>
      </div>
    </article>
  );
}

export function CalicapIndiaCaseView() {
  return <CanvasCase />;
}
