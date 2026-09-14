import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Cloud,
  Compass,
  FileText,
  Layers,
  MessageCircle,
  PhoneForwarded,
  UsersRound,
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { SITE_NAME, pageMetadata } from "@/lib/seo";
import {
  calicapHomeCta,
  calicapHomeHero,
  calicapHomeHeroStats,
  calicapHomeProcess,
  calicapHomeServices,
  calicapHomeServicesSection,
  calicapHomeWorkSection,
  calicapHomeWorkTeasers,
} from "@/lib/calicap-home";
import { siteImages } from "@/lib/site-images";

export const metadata = {
  ...pageMetadata({
    title: "Websites & digital growth",
    description:
      "Web and mobile delivery with React, Node.js, Spring, and AI integrations; native iOS and Android or React Native; cloud on AWS and Azure—plus digital marketing that compounds.",
    path: "/",
  }),
  title: {
    absolute: `${SITE_NAME} · Websites & digital growth`,
  },
};

export default function HomePage() {
  const hero = calicapHomeHero;
  const servicesSection = calicapHomeServicesSection;
  const workSection = calicapHomeWorkSection;
  const process = calicapHomeProcess;
  const cta = calicapHomeCta;

  return (
    <>
      <section>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0">
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
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
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
                  {hero.bodyLead}
                  <span className="text-slate-800">{hero.bodyStack}</span>
                  {hero.bodyMid}{" "}
                  <span className="text-slate-800">{hero.bodyCloud[0]}</span> or{" "}
                  <span className="text-slate-800">{hero.bodyCloud[1]}</span>{" "}
                  {hero.bodyTail}
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href="/contact">
                    <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                    {hero.primaryCta}
                  </ButtonLink>
                  <ButtonLink href="/work" variant="ghost">
                    <FileText className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                    {hero.secondaryCta}
                  </ButtonLink>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none lg:pt-2">
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
            <div className="mt-12 surface-card max-w-3xl rounded-2xl p-6 md:p-8">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                <Cloud className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
                {hero.engineeringTitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                <span className="font-medium text-slate-800">{hero.engineeringWebLabel}</span>{" "}
                {hero.engineeringWeb}{" "}
                <span className="font-medium text-slate-800">{hero.engineeringMobileLabel}</span>{" "}
                {hero.engineeringMobile}{" "}
                <span className="font-medium text-slate-800">{hero.engineeringCloudLabel}</span>{" "}
                {hero.engineeringCloud}
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full min-w-0 max-w-6xl border-t border-[var(--color-border-subtle)] px-4 pb-24 pt-10 sm:px-6 md:pb-28 lg:px-8">
          <dl className="grid gap-8 sm:grid-cols-3">
            {calicapHomeHeroStats.map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <dt className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                  <Icon className="h-3.5 w-3.5 text-gold-600" strokeWidth={2} aria-hidden />
                  {label}
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-800">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-[var(--color-border-subtle)] bg-slate-400/35">
        <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:items-center lg:gap-12">
            <div>
              <h2 className="flex min-w-0 flex-wrap items-center gap-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
                <Briefcase className="h-8 w-8 text-gold-600" strokeWidth={1.75} aria-hidden />
                {servicesSection.title}
              </h2>
              <p className="mt-4 text-slate-600">{servicesSection.intro}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg shadow-slate-900/10 ring-1 ring-slate-200/80">
              <Image
                src={servicesSection.image.src}
                alt={servicesSection.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
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
                        Learn more
                        <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link
              href="/services"
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
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                      Case study
                    </span>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl text-slate-900 group-hover:text-slate-900">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{w.result}</p>
                    <p className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                      Read the narrative
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border-subtle)] bg-slate-400/35">
        <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div>
              <h2 className="flex min-w-0 flex-wrap items-center gap-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
                <Compass className="h-8 w-8 text-gold-600" strokeWidth={1.75} aria-hidden />
                {process.title}
              </h2>
              <p className="mt-4 max-w-2xl text-slate-600">{process.intro}</p>
              <ol className="mt-12 grid gap-6 sm:grid-cols-2">
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
            </div>
            <div className="relative aspect-[3/4] max-h-[560px] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80 lg:sticky lg:top-24">
              <Image
                src={process.image.src}
                alt={process.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
            </div>
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
                <span className="inline-flex items-center gap-1 font-medium text-slate-800">
                  <PhoneForwarded className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
                  {cta.fitLabel}
                </span>
                {cta.bodyMid}{" "}
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
                <ButtonLink href="/contact">
                  <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  {cta.primaryCta}
                </ButtonLink>
                <ButtonLink href="/about" variant="ghost">
                  <UsersRound className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
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
