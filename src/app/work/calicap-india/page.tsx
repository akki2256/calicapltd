import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  Clock3,
  FileText,
  Gauge,
  GitMerge,
  LayoutDashboard,
  MessageCircle,
  Target,
  TrendingUp,
  UsersRound,
  Workflow,
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CapabilityTrail } from "@/components/capability-trail";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { JsonLd } from "@/components/JsonLd";
import { WorkViewTracker } from "@/components/work-view-tracker";
import { WorkDeliveryNotes } from "@/components/work-delivery-notes";
import { getWorkStudyBySlug, getWorkStudyImage } from "@/lib/calicap-work";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, creativeWorkJsonLd } from "@/lib/structured-data";

const study = getWorkStudyBySlug("calicap-india")!;
const studyImage = getWorkStudyImage(study);
/** Self-contained product guide (copied from Quick Funding CRM docs). */
const productGuideHref = "/guides/quick-funding-crm-guide.html";

export const metadata = pageMetadata({
  title: study.metaTitle,
  description: study.metaDescription,
  path: `/work/${study.slug}`,
  imagePath: studyImage.src,
  ogType: "article",
});

const results = [
  {
    value: "23%",
    label: "Lower operational cost",
    icon: Gauge,
  },
  {
    value: "37%",
    label: "Higher average sales",
    icon: TrendingUp,
  },
  {
    value: "60 days",
    label: "Concept to delivery",
    icon: Clock3,
  },
] as const;

const capabilities = [
  {
    t: "A single customer record",
    d: "Identity, history, documents, and related opportunities sit in one profile. Staff stop reconstructing a file from a CRM, a sheet, and a chat thread before they can act.",
    icon: Target,
  },
  {
    t: "A visible path from lead to settlement",
    d: "Every opportunity moves through a structured pipeline. Teams can see stage, owner, and delay—so stalled work is obvious instead of buried in inboxes.",
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

const snapshots = [
  {
    src: "/images/case-studies/crm-login.jpg",
    alt: "CRM login — Quick Funding workspace sign-in",
    caption: "Secure workspace entry — branded sign-in into the loan operations CRM",
    label: "01 · Login",
    width: 1024,
    height: 571,
  },
  {
    src: "/images/case-studies/crm-dashboard.jpg",
    alt: "CRM analytics dashboard — pipeline snapshot and team performance",
    caption: "Overview dashboard — pipeline snapshot, settlements, and team performance at a glance",
    label: "02 · Dashboard",
    width: 1024,
    height: 571,
  },
  {
    src: "/images/case-studies/crm-deals.jpg",
    alt: "Deals pipeline board — Open, Closed Won, Deferred, Closed Lost",
    caption: "Deals board — Open, Closed Won, Deferred, and Closed Lost without hunting for status",
    label: "03 · Pipeline",
    width: 1024,
    height: 571,
  },
  {
    src: "/images/case-studies/crm-deal-detail.jpg",
    alt: "CRM deal detail — loan stage workflow from lead through application",
    caption: "Deal detail — stage-by-stage loan workflow from lead through application",
    label: "04 · Deal detail",
    width: 1024,
    height: 571,
  },
  {
    src: "/images/case-studies/crm-admin.jpg",
    alt: "CRM control center for users, workflow, lenders, and communications",
    caption: "Control center — users, stage checks, lenders, email, and message templates in one admin surface",
    label: "05 · Admin",
    width: 1024,
    height: 571,
  },
  {
    src: "/images/case-studies/crm-incentives.jpg",
    alt: "CRM user incentives — current-month totals by role",
    caption: "User incentives — current-month totals by role, expandable to deal-level detail",
    label: "06 · Incentives",
    width: 1024,
    height: 571,
  },
] as const;

export default function CalicapIndiaCasePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
      <WorkViewTracker slug={study.slug} />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: study.title, path: `/work/${study.slug}` },
          ]),
          creativeWorkJsonLd({
            name: study.title,
            description: study.metaDescription,
            path: `/work/${study.slug}`,
            imagePath: studyImage.src,
          }),
        ]}
      />
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-700/90 hover:text-gold-600"
      >
        <ArrowLeft className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
        <FileText className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
        Work
      </Link>

      <div className="relative mb-10 mt-8 aspect-[1024/571] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80">
        <Image
          src="/images/case-studies/crm-dashboard.jpg"
          alt="Calicap India CRM dashboard — pipeline snapshot and team performance"
          fill
          className="object-contain object-center"
          sizes="(max-width: 768px) 100vw, 720px"
          priority
        />
      </div>

      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
        <Building2 className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
        Product · CRM · ops
      </p>

      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
        Calicap India Pvt. Ltd.
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-slate-600">
        A custom platform built around their loan workflow—so the team could run
        the business from one place instead of stitching tools together.
      </p>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="surface-card rounded-2xl p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Engagement
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-800">
            Discovery, product design, build
          </dd>
        </div>
        <div className="surface-card rounded-2xl p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Scope
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-800">
            CRM and loan operations
          </dd>
        </div>
        <div className="surface-card rounded-2xl p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Role
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-800">
            Strategy, UX, engineering
          </dd>
        </div>
      </dl>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {results.map(({ value, label, icon: Icon }) => (
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
        Challenge
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Calicap India’s loan work was growing faster than the way it was run.
        An existing CRM, spreadsheets, email, and chat each did a job—but they
        did not share a picture of the customer, the deal, or who owned the next
        step.
      </p>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        That gap showed up as lost retention and wasted hours. People spent the
        day hunting for context and chasing status. Warm customers went quiet
        because follow-up lived in someone’s head. Managers could not see
        pipeline, load, or risk without assembling a report by hand. Useful
        knowledge sat with individuals instead of the organization.
      </p>
      <ul className="mt-6 space-y-3 text-slate-600">
        <li className="flex gap-2 leading-relaxed">
          <Target className="mt-1 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
          <span>
            Customer and deal files were split across systems, so the team rebuilt
            the story before they could act.
          </span>
        </li>
        <li className="flex gap-2 leading-relaxed">
          <UsersRound className="mt-1 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
          <span>
            Follow-ups were manual. Customers who needed attention were easy to
            miss; repeat business depended on who remembered to call.
          </span>
        </li>
        <li className="flex gap-2 leading-relaxed">
          <Workflow className="mt-1 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
          <span>
            Work allocation was informal. Effort went into coordination instead
            of conversations that move a deal.
          </span>
        </li>
      </ul>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        They did not need another product dropped onto the stack. They needed
        one system shaped to how the floor already worked—and room to grow
        without repeating the same patchwork.
      </p>

      <WorkDeliveryNotes notes={study.deliveryNotes} />

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Solution
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        We started with the live sales and servicing flow—not a generic CRM
        template. Stages, owners, handoffs, and the documents that already
        existed in the process became the product model. Off-the-shelf software
        would have asked the team to change how they work; this build fitted
        around it.
      </p>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        In sixty days we replaced the disconnected loop with one platform from
        first contact through settlement: records, pipeline, follow-ups,
        assignment, inbound intake, and a management view of what is actually
        happening. Communication and document steps sit in the same journey, so
        activity is logged instead of lost in inboxes.
      </p>
      <ul className="mt-6 space-y-4 text-slate-600">
        {capabilities.map(({ t, d, icon: Icon }) => (
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
      <p className="mt-6 text-base leading-relaxed text-slate-600">
        Dashboards, access control, and an activity history sit on top of that
        core—so the organization keeps a record of work as it scales, rather than
        depending on whoever is in the room.
      </p>

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
      <p className="mt-6 text-base leading-relaxed text-slate-600">
        One application, built to extend as the client’s process changes.
      </p>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Before / after
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="surface-card rounded-2xl p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Before
          </p>
          <p className="mt-2 text-sm font-medium text-slate-800">
            Four tools, one workflow
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
            <li>Files rebuilt from CRM, sheets, and chat</li>
            <li>Follow-up lists kept by hand</li>
            <li>Handoffs without a named owner</li>
            <li>Pipeline assembled for meetings</li>
          </ul>
        </div>
        <div className="surface-card rounded-2xl p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-700/90">
            After
          </p>
          <p className="mt-2 text-sm font-medium text-slate-800">
            One operating platform
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
            <li>A record the whole team can trust</li>
            <li>Next actions fired by stage</li>
            <li>Queues and named ownership</li>
            <li>Live view for the floor and managers</li>
          </ul>
        </div>
      </div>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Product snapshots
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Captures from the live Quick Funding CRM — login through pipeline, deal
        detail, and admin. For a full walkthrough of the product,{" "}
        <a
          href={productGuideHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold-600 hover:text-gold-700"
        >
          read the product guide
        </a>
        .
      </p>

      <div className="mt-8 space-y-8">
        {snapshots.map((shot) => (
          <figure key={shot.src}>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              {shot.label}
            </p>
            <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                className="h-auto w-full object-contain object-center"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-slate-600">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-14 text-base leading-relaxed text-slate-600">
        The commercial result is above. On the floor, that meant less time spent
        reconstructing work, customers followed up when they needed to be, and a
        system the team could keep extending as the process changed—without
        going back to a patchwork of tools.
      </p>

      <CapabilityTrail pillarIds={study.pillars} serviceIds={study.serviceIds} />

      <div className="mt-12 flex flex-wrap gap-4">
        <ProblemCtaButton>
          <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          {study.ctaLabel}
        </ProblemCtaButton>
        <ButtonLink href={productGuideHref} target="_blank" rel="noopener noreferrer" variant="ghost">
          <BookOpen className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Read product guide
        </ButtonLink>
        <ButtonLink href="/work" variant="ghost">
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          More case studies
        </ButtonLink>
      </div>
    </article>
  );
}
