"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  ClipboardList,
  History,
  MessageCircle,
  Target,
  UserRound,
  UsersRound,
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

const study = getWorkStudyBySlug("lungconnect-india")!;
const studyImage = getWorkStudyImage(study);
/** Self-contained product guide for the LungConnect MIS. */
const productGuideHref = "/guides/lungconnect-mis-guide.html";

const productSnapshots = [
  {
    src: siteImages.lungconnectIndiaLogin.src,
    alt: siteImages.lungconnectIndiaLogin.alt,
    label: "Sign-in",
    caption:
      "Secure access to the LungConnect / Utsaah Foundation MIS for care operations teams.",
  },
  {
    src: siteImages.lungconnectIndiaHero.src,
    alt: siteImages.lungconnectIndiaHero.alt,
    label: "Reporting dashboard",
    caption:
      "Enrollment, follow-up, and service KPIs — with diagnosis mix and geographic distribution at a glance.",
  },
  {
    src: siteImages.lungconnectIndiaCharts.src,
    alt: siteImages.lungconnectIndiaCharts.alt,
    label: "Operational charts",
    caption:
      "Category and service-type caseload, outreach channels at enrollment, and ration distribution by item.",
  },
  {
    src: siteImages.lungconnectIndiaPatientData.src,
    alt: siteImages.lungconnectIndiaPatientData.alt,
    label: "Patient data",
    caption:
      "Filterable enrollment ledger with CSV and print export — navigators, service type, and case status in one table.",
  },
  {
    src: siteImages.lungconnectIndiaPatientDetail.src,
    alt: siteImages.lungconnectIndiaPatientDetail.alt,
    label: "Patient detail & follow-up",
    caption:
      "Profile, thoracic history, and guidance capture in one record — so the next conversation starts from what already happened.",
  },
] as const;

const snapshot = [
  { value: "60 days", label: "Concept to delivery" },
  { value: "MIS", label: "Patient care operations" },
  { value: "One record", label: "Enrollment → guidance history" },
] as const;

const meta = [
  { label: "Client", value: "LungConnect India Foundation" },
  { label: "Industry", value: "Healthcare · cancer care" },
  { label: "Services", value: "Custom MIS · care operations software" },
  { label: "Timeline", value: "60 days" },
  { label: "Agency", value: "Calicon" },
] as const;

const challenges = [
  {
    t: "Enrollment without a single source of truth",
    d: "Patient intake lived across forms, sheets, and individual knowledge. Rebuilding who was enrolled — and where they stood — slowed every next step.",
    icon: ClipboardList,
  },
  {
    t: "Follow-ups that depended on memory",
    d: "Care continuity needed scheduled attention. When follow-up lived in someone’s head or inbox, patients who needed contact were easy to miss.",
    icon: UsersRound,
  },
  {
    t: "History that left with the person who remembered it",
    d: "Profiles, data maintenance, and guidance history had to belong to the organization — not to a private note or a single coordinator.",
    icon: History,
  },
] as const;

const objectives = [
  "Give care teams one system for cancer patient enrollment and ongoing follow-up.",
  "Maintain patient profiles and operational data without rebuilding the file each time.",
  "Preserve guidance history so continuity of care does not depend on who is in the room.",
] as const;

const capabilities = [
  {
    t: "Enrollment that becomes a lasting record",
    d: "Intake creates a patient profile the whole team can trust — identity, status, and related history in one place instead of reconstructed packets.",
    icon: ClipboardList,
  },
  {
    t: "Follow-ups on the process, not memory",
    d: "Scheduled and due follow-ups surface from the care workflow so outreach is intentional, visible, and owned.",
    icon: Target,
  },
  {
    t: "Patient profiles that stay current",
    d: "Data maintenance sits inside the same MIS — updates land on the profile instead of drifting into side sheets and chat threads.",
    icon: UserRound,
  },
  {
    t: "Guidance history the organization keeps",
    d: "Advice, interventions, and prior guidance remain attached to the patient journey so the next conversation starts from what already happened.",
    icon: History,
  },
] as const;

const impact = [
  {
    t: "Operational continuity",
    d: "Enrollment, follow-up, and history live in one MIS shaped to cancer-care operations.",
  },
  {
    t: "Less reconstruction work",
    d: "Teams spend less time rebuilding patient context before they can act.",
  },
  {
    t: "Clear ownership of next steps",
    d: "Follow-ups and guidance trails are visible instead of buried in informal channels.",
  },
  {
    t: "Delivered in 60 days",
    d: "Concept to a working care-operations platform without waiting on a generic hospital product cycle.",
  },
] as const;

const delivered = [
  "Custom MIS platform",
  "Patient enrollment",
  "Follow-up management",
  "Patient profile maintenance",
  "Data maintenance workflows",
  "Guidance history",
  "Role-aware care operations",
  "Activity & audit trail",
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
          Build · Custom MIS · Healthcare
        </p>
      </CanvasReveal>

      <div className="mt-5">
        <CanvasTextRevealInView
          as="h1"
          lines={["LungConnect India", "Foundation"]}
          className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[var(--color-text-strong)]"
        />
      </div>

      <CanvasReveal variant="blurIn" delay={0.12} className="mt-6 max-w-2xl">
        <p className="text-[17px] leading-[1.7] text-[var(--color-text-muted)]">
          MIS software for cancer patient enrollment, follow-ups, data maintenance,
          patient profiles, and guidance history — so care operations run from one
          system instead of fragments.
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
            <Image
              src={studyImage.src}
              alt={studyImage.alt}
              fill
              className="object-contain object-center"
              sizes="(max-width: 960px) 100vw, 920px"
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
            LungConnect India Foundation needed technology that matched the seriousness
            of cancer-care operations — not another generic form stack dropped onto
            the team.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            The objective was to optimize how patients are enrolled, followed up,
            profiled, and guided over time — reducing operational friction and the
            cost of reconstructing context before care can continue.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Calicon designed and built a custom MIS around those workflows and
            delivered it in sixty days.
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
            We started from the live care workflow — enrollment, follow-up ownership,
            profile updates, and guidance — and made that the product model.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            Off-the-shelf hospital software would have asked the foundation to bend
            around someone else’s process. This MIS was shaped to how LungConnect
            already needed to work, with room to extend as programs grow.
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
              Fragmented patient records
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <li>Enrollment status rebuilt from multiple sources</li>
              <li>Follow-ups kept by hand or memory</li>
              <li>Profiles and guidance hard to trust over time</li>
              <li>Coordination cost hidden in every handoff</li>
            </ul>
          </div>
          <div className="bg-[var(--color-surface)] px-6 py-7">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              After
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-lg text-[var(--color-text-strong)]">
              One care operations system
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <li>Enrollment creates a durable patient record</li>
              <li>Follow-ups visible and owned in the workflow</li>
              <li>Profiles and data maintained in the same MIS</li>
              <li>Guidance history stays with the organization</li>
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
            Captures from the live MIS — sign-in, reporting, operational charts,
            patient ledger, and follow-up detail. For a full walkthrough of the
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
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 960px) 100vw, 920px"
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
            In sixty days, LungConnect India Foundation had a working MIS for the
            full operational loop — enrollment, follow-up, profile maintenance, and
            guidance history — so care teams can act from one picture instead of
            stitching fragments together.
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

export function LungconnectIndiaCaseView() {
  return <CanvasCase />;
}
