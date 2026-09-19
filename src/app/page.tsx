import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Compass,
  FileText,
  Handshake,
  Layers,
  MessageCircle,
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { SITE_NAME, pageMetadata } from "@/lib/seo";
import {
  HOME_BUILD_ID,
  HOME_POSITIONING_ID,
  calicapHomeCta,
  calicapHomeDiscovery,
  calicapHomeEntryDoors,
  calicapHomeHero,
  calicapHomeOutcomes,
  calicapHomeOutcomesSection,
  calicapHomePrinciples,
  calicapHomeProcess,
  calicapHomeRecognition,
  calicapHomeServices,
  calicapHomeServicesSection,
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
  const servicesSection = calicapHomeServicesSection;
  const workSection = calicapHomeWorkSection;
  const process = calicapHomeProcess;
  const cta = calicapHomeCta;

  return (
    <>
      <section id={HOME_POSITIONING_ID} className="scroll-mt-0">
        <div className="relative overflow-hidden">
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
          <div className="relative z-10 mx-auto w-full min-w-0 max-w-6xl px-4 pb-12 pt-16 sm:px-6 md:pb-14 md:pt-20 lg:px-8">
            <div className="home-hero-layout grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
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
        <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
            {recognition.title}
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">{recognition.intro}</p>
          <ul className="mt-6 grid max-w-2xl gap-2.5 sm:grid-cols-2">
            {recognition.examples.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-600" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-lg font-medium leading-relaxed text-slate-800">
            {recognition.differentiator}
          </p>
          <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-slate-800">
            {recognition.differentiatorLead}
          </p>
          <p className="mt-3 max-w-2xl text-slate-600">{recognition.differentiatorBody}</p>

          <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {calicapHomePrinciples.map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <dt className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                  <Icon className="h-3.5 w-3.5 text-gold-600" strokeWidth={2} aria-hidden />
                  {label}
                </dt>
                <dd className="mt-2 text-base font-medium leading-relaxed text-slate-800">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
            <h3 className="max-w-2xl font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {calicapHomeDiscovery.title}
            </h3>
            <p className="mt-3 max-w-2xl text-slate-600">{calicapHomeDiscovery.intro}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {calicapHomeOutcomes.map(({ label, value, examples, href, linkLabel, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="group surface-card block rounded-2xl p-5 transition hover:border-gold-500/30"
                >
                  <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                    <Icon className="h-3.5 w-3.5 text-gold-600" strokeWidth={2} aria-hidden />
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-800 group-hover:text-slate-950">
                    {value}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {examples.slice(0, 3).map((ex) => (
                      <li key={ex} className="text-xs leading-relaxed text-slate-500">
                        {ex}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold-600">
                    {linkLabel}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
            <h3 className="max-w-2xl font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {recognition.bridgeTitle}
            </h3>
            <p className="mt-4 max-w-2xl text-slate-600">{recognition.bridgeBody}</p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {calicapHomeEntryDoors.map(({ label, value, icon: Icon }) => (
                <li key={label} className="surface-card rounded-2xl p-6">
                  <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                    <Icon className="h-3.5 w-3.5 text-gold-600" strokeWidth={2} aria-hidden />
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{value}</p>
                </li>
              ))}
            </ul>
            <div className="mt-12 max-w-2xl">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
                {recognition.problemCtaTitle}
              </h3>
              <p className="mt-3 text-slate-600">{recognition.problemCtaBody}</p>
              <div className="mt-6">
                <ProblemCtaButton>
                  <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  {recognition.problemCtaLabel}
                </ProblemCtaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id={HOME_BUILD_ID}
        className="home-band scroll-mt-8 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)]"
      >
        <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="home-split grid gap-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:items-center lg:gap-12">
            <div>
              <h2 className="flex min-w-0 flex-wrap items-center gap-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
                <Briefcase className="h-8 w-8 text-gold-600" strokeWidth={1.75} aria-hidden />
                {servicesSection.title}
              </h2>
              <p className="mt-4 text-slate-600">{servicesSection.intro}</p>
            </div>
            <div className="home-brochure-figure relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg shadow-slate-900/10 ring-1 ring-slate-200/80">
              <Image
                src={servicesSection.image.src}
                alt={servicesSection.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {calicapHomeServices.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group surface-card block rounded-2xl p-8 transition hover:border-gold-500/30"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)]">
                      <Icon className="h-5 w-5 text-gold-700" strokeWidth={2} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg text-slate-900 group-hover:text-slate-950">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.body}</p>
                      <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                        Explore
                        <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-slate-500">
            <Handshake className="mb-0.5 mr-1.5 inline h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
            {hero.stayOn}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link
              href="/build"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-700"
            >
              <Layers className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {servicesSection.overviewLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              <FileText className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {servicesSection.workLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border-subtle)]">
        <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="flex min-w-0 flex-wrap items-center gap-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
            <Compass className="h-8 w-8 text-gold-600" strokeWidth={1.75} aria-hidden />
            {process.title}
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">{process.intro}</p>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
            {process.steps.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.n} className="surface-card rounded-2xl p-6">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-gold-600" strokeWidth={2} aria-hidden />
                    <span className="text-xs font-mono text-gold-600">{s.n}</span>
                  </div>
                  <p className="mt-3 font-medium text-slate-800">{s.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.d}</p>
                </li>
              );
            })}
          </ol>
          <h3 className="mt-12 max-w-2xl font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
            {process.traitsTitle}
          </h3>
          <dl className="mt-8 grid gap-8 border-t border-[var(--color-border-subtle)] pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {process.traits.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-[var(--color-border-subtle)]">
        <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative mb-12 aspect-[2.4/1] w-full max-h-60 overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/80 sm:max-h-72">
            <Image
              src={workSection.banner.src}
              alt={workSection.banner.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-slate-900/5" aria-hidden />
          </div>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h2 className="flex min-w-0 flex-wrap items-center gap-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
                <FileText className="h-8 w-8 text-gold-600" strokeWidth={1.75} aria-hidden />
                {workSection.title}
              </h2>
              <p className="mt-4 max-w-xl text-slate-600">
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
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {calicapHomeWorkTeasers.map((w) => {
              const Icon = w.icon;
              const image = siteImages[w.imageKey];
              return (
                <Link
                  key={w.slug}
                  href={`/work/${w.slug}`}
                  className="group surface-card block overflow-hidden rounded-2xl transition hover:border-gold-500/25"
                >
                  <div className="relative aspect-[2/1] w-full overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" aria-hidden />
                  </div>
                  <div className="p-8">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gold-700/95">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                      {w.label}
                    </span>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl text-slate-900 group-hover:text-slate-900">
                      {w.title}
                    </h3>
                    <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                      Challenge
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{w.context}</p>
                    <p className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                      Solution
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">{w.built}</p>
                    <p className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                      Outcome
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-800">{w.result}</p>
                    <p className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
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

      <section className="border-t border-[var(--color-border-subtle)]">
        <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
            {calicapHomeOutcomesSection.title}
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">{calicapHomeOutcomesSection.intro}</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {calicapDocumentedOutcomes.map((o) => (
              <Link
                key={`${o.href}-${o.label}`}
                href={o.href}
                className="group surface-card block rounded-2xl p-6 transition hover:border-gold-500/30"
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
        <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="surface-card relative min-h-[280px] overflow-hidden rounded-3xl px-8 py-14 md:min-h-0 md:px-14 md:py-16">
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
            <div className="relative z-10 max-w-2xl">
              <h2 className="flex min-w-0 flex-wrap items-center gap-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
                <MessageCircle
                  className="h-9 w-9 text-gold-600 md:h-10 md:w-10"
                  strokeWidth={1.75}
                  aria-hidden
                />
                {cta.title}
              </h2>
              <p className="mt-4 text-slate-600">
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
              <div className="mt-8 flex flex-wrap gap-4">
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
