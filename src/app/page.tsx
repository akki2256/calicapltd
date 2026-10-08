import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Layers,
  MessageCircle,
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CaliconOutcomesRail } from "@/components/calicon/calicon-outcomes-rail";
import { CaliconImpactMetrics } from "@/components/calicon-impact-metrics";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { SITE_NAME, pageMetadata } from "@/lib/seo";
import {
  calicapHomeCta,
  calicapHomeEntryDoors,
  calicapHomeHero,
  calicapHomeOutcomesSection,
  calicapHomeRecognition,
  calicapHomeWorkSection,
  calicapHomeWorkTeasers,
} from "@/lib/calicap-home";
import { calicapDocumentedOutcomes } from "@/lib/calicap-work";
import { siteImages } from "@/lib/site-images";

export const metadata = {
  ...pageMetadata({
    title: "Build what's next",
    description:
      "Turn ideas and challenges into digital products, software, and technology that moves things forward. We understand before we build.",
    path: "/",
  }),
  title: {
    absolute: `${SITE_NAME} · Build what's next.`,
  },
};

export default function HomePage() {
  const hero = calicapHomeHero;
  const recognition = calicapHomeRecognition;
  const workSection = calicapHomeWorkSection;
  const cta = calicapHomeCta;

  return (
    <>
      <section className="scroll-mt-0">
        {/* Full viewport below sticky Calicon header (4.25rem) — Calicon home only */}
        <div className="relative flex min-h-[calc(100dvh-4.25rem)] flex-col justify-center overflow-hidden">
          <div className="home-hero-media pointer-events-none absolute inset-0 z-0">
            <Image
              src={hero.bannerSrc}
              alt=""
              fill
              quality={92}
              className="object-cover object-center contrast-[1.08] saturate-[1.06]"
              sizes="100vw"
              priority
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface)]/78 via-[var(--color-surface)]/42 to-[var(--color-surface)]/14"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--color-surface)]/25"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/[0.06] via-transparent to-[var(--color-accent)]/[0.04]"
              aria-hidden
            />
          </div>
          <div className="relative z-10 mx-auto w-full min-w-0 max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="home-hero-layout grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="flex min-w-0 flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-gold-700/95 sm:tracking-[0.2em]">
                  <Layers className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
                  {hero.eyebrow}
                </p>
                <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium leading-tight tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.08]">
                  {hero.headlineBefore}{" "}
                  <span className="text-gradient">{hero.headlineAccent}</span>
                  {hero.headlineAfter}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                  {hero.body}
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ProblemCtaButton>
                    <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                    {hero.primaryCta}
                  </ProblemCtaButton>
                  <ButtonLink href={hero.secondaryHref} variant="ghost">
                    <Layers className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                    {hero.secondaryCta}
                  </ButtonLink>
                </div>
              </div>
              <div className="home-brochure-figure relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none lg:pt-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-slate-900/12 ring-1 ring-slate-200/90">
                  <Image
                    src={hero.sideImage.src}
                    alt={hero.sideImage.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border-subtle)]">
        <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <CaliconOutcomesRail />

          <div className="mt-12 border-t border-[var(--color-border-subtle)] pt-10">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {recognition.bridgeTitle}
            </h3>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {calicapHomeEntryDoors.map(({ label, value, icon: Icon }) => (
                <li key={label} className="surface-card rounded-2xl p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
                    <span>{label}</span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{value}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)]/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6">
              <div className="min-w-0 max-w-xl">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-slate-900">
                  {recognition.problemCtaTitle}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600">{recognition.problemCtaBody}</p>
              </div>
              <ProblemCtaButton className="shrink-0">
                <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                {recognition.problemCtaLabel}
              </ProblemCtaButton>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border-subtle)]">
        <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="relative mb-8 aspect-[2.4/1] w-full max-h-52 overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/80 sm:max-h-64">
            <Image
              src={workSection.banner.src}
              alt={workSection.banner.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-slate-900/5" aria-hidden />
          </div>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="flex min-w-0 flex-wrap items-center gap-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
                <FileText className="h-7 w-7 text-gold-600" strokeWidth={1.75} aria-hidden />
                {workSection.title}
              </h2>
              <p className="mt-3 max-w-xl text-slate-600">
                {workSection.intro}{" "}
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1 font-semibold text-gold-600 hover:text-gold-700"
                >
                  {workSection.browseLabel}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                </Link>
                .
              </p>
            </div>
            <ButtonLink href="/work" variant="ghost">
              <FileText className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {workSection.allLabel}
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {calicapHomeWorkTeasers.map((w) => {
              const Icon = w.icon;
              const image = siteImages[w.imageKey];
              return (
                <Link
                  key={w.slug}
                  href={`/work/${w.slug}`}
                  className="group surface-card block overflow-hidden rounded-2xl transition hover:border-gold-500/25"
                >
                  <div className="relative aspect-[2.2/1] w-full overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" aria-hidden />
                  </div>
                  <div className="p-5 sm:p-6">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold-700/95">
                      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                      <span>{w.label}</span>
                    </span>
                    <h3 className="mt-2.5 font-[family-name:var(--font-display)] text-xl text-slate-900 group-hover:text-slate-900">
                      {w.title}
                    </h3>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Challenge
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{w.context}</p>
                    <p className="mt-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Solution
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">{w.built}</p>
                    <p className="mt-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Outcome
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-800">{w.result}</p>
                    <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                      Read the case study
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact categories — after work evidence, before attributable documented KPIs */}
      <CaliconImpactMetrics />

      <section className="border-t border-[var(--color-border-subtle)]">
        <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
            {calicapHomeOutcomesSection.title}
          </h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {calicapDocumentedOutcomes.map((o) => (
              <Link
                key={`${o.href}-${o.label}`}
                href={o.href}
                className="group surface-card block rounded-2xl p-5 transition hover:border-gold-500/30"
              >
                <p className="font-[family-name:var(--font-display)] text-3xl font-medium text-slate-900 group-hover:text-slate-950">
                  {o.value}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-800">{o.label}</p>
                <p className="mt-1 text-xs text-slate-500">{o.detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border-subtle)]">
        <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="surface-card relative min-h-[240px] overflow-hidden rounded-3xl px-6 py-10 md:min-h-0 md:px-12 md:py-12">
            <Image
              src={cta.backdrop.src}
              alt=""
              fill
              className="object-cover opacity-[0.18]"
              sizes="(max-width: 1152px) 100vw, 1152px"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface-elevated)] via-[var(--color-surface-elevated)]/95 to-[var(--color-surface-elevated)]/75"
              aria-hidden
            />
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-[var(--color-accent)]/20 blur-3xl" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_auto] lg:items-end">
              <div className="max-w-2xl">
                <h2 className="flex min-w-0 flex-wrap items-center gap-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900 md:text-[2.15rem] md:leading-snug">
                  <MessageCircle
                    className="h-8 w-8 shrink-0 text-gold-600 md:h-9 md:w-9"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  {cta.title}
                </h2>
                <p className="mt-3 text-slate-600">
                  {cta.bodyLead}{" "}
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-1 font-semibold text-gold-600 hover:text-gold-700"
                  >
                    {cta.workLabel}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  </Link>{" "}
                  {cta.bodyTail}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ProblemCtaButton>
                  <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  {cta.primaryCta}
                </ProblemCtaButton>
                <ButtonLink href={cta.secondaryHref} variant="ghost">
                  <Layers className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  {cta.secondaryCta}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
