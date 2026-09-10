import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Cloud,
  Code2,
  Compass,
  FileText,
  Gauge,
  Handshake,
  Layers,
  MessageCircle,
  Monitor,
  Palette,
  PhoneForwarded,
  Rocket,
  ShoppingBag,
  Smartphone,
  TrendingUp,
  UsersRound,
<<<<<<< HEAD
=======
  Building2,
>>>>>>> 4c896421623002b20fad236becc872417032659e
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { siteImages } from "@/lib/site-images";

const services = [
  {
    title: "Web app development",
    body: "React-led UIs, Node.js and Spring services, AI integrations where they earn their place—and cloud on AWS or Azure. Built for conversion and iteration.",
    href: "/services/web-app-development",
    icon: Monitor,
  },
  {
    title: "Mobile app development",
    body: "Native iOS and Android, plus React Native when one codebase should carry both stores—wired to the same API and cloud patterns as web.",
    href: "/services/mobile-app-development",
    icon: Smartphone,
  },
];

const workTeaser = [
  {
<<<<<<< HEAD
=======
    slug: "calicap-india",
    title: "Calicap India Pvt. Ltd.",
    result: "23% lower ops cost · 37% higher average sales",
    icon: Building2,
    image: siteImages.calicapIndiaCrm,
  },
  {
>>>>>>> 4c896421623002b20fad236becc872417032659e
    slug: "retail-growth",
    title: "Retail brand lift",
    result: "Organic visibility up, clearer path to enquiry",
    icon: ShoppingBag,
    image: siteImages.retailStore,
  },
  {
    slug: "saas-launch",
    title: "SaaS launch site",
    result: "Launch-ready positioning in six weeks",
    icon: Rocket,
    image: siteImages.productLaunch,
  },
];

const steps = [
  {
    n: "01",
    t: "Discovery",
    d: "Goals, audience, constraints, and success metrics—locked early.",
    icon: Compass,
  },
  {
    n: "02",
    t: "Design",
    d: "Typography, motion, and UX that match the calibre of your offer.",
    icon: Palette,
  },
  {
    n: "03",
    t: "Build",
    d: "React and modern web tooling, Node.js and Spring for APIs, intentional AI integrations, and hardened AWS or Azure environments.",
    icon: Code2,
  },
  {
    n: "04",
    t: "Grow",
    d: "Content, campaigns, and experiments with reporting you can trust.",
    icon: TrendingUp,
  },
];

const heroStats = [
  { label: "Core Web Vitals", value: "Built-in", icon: Gauge },
  { label: "Engagement model", value: "Project + growth", icon: Handshake },
  { label: "Delivery", value: "Senior-led, no bait-and-switch", icon: UsersRound },
];

export default function HomePage() {
  return (
    <>
      <section>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0">
            <Image
              src="/images/home-hero-banner.png"
              alt=""
              fill
              quality={92}
              className="object-cover object-center contrast-[1.08] saturate-[1.06]"
              sizes="100vw"
              priority
              aria-hidden
            />
            {/* Lighter wash on the right so the photo stays crisp; stronger on the left for headline contrast */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface)]/78 via-[var(--color-surface)]/42 to-[var(--color-surface)]/14"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--color-surface)]/25"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-gold-500/[0.06] via-transparent to-gold-400/[0.04]"
              aria-hidden
            />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl px-6 pb-12 pt-16 md:pb-14 md:pt-20 lg:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
                  <Layers className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
                  Websites · organic · paid
                </p>
                <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium leading-tight tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.08]">
                  Digital presence that feels{" "}
                  <span className="text-gradient">expensive</span>—and converts.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                  Calicon partners with ambitious operators on high-craft websites and
                  measurable marketing. Strategy first, execution without theatre. We
                  ship with current stacks—
                  <span className="text-slate-800">
                    React, Node.js, Spring, AI features where they make sense, and
                    mobile via native iOS and Android or React Native
                  </span>
                  —hosted on <span className="text-slate-800">AWS</span> or{" "}
                  <span className="text-slate-800">Azure</span> to match your
                  security and scale needs.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href="/contact">
                    <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                    Start a project
                  </ButtonLink>
                  <ButtonLink href="/work" variant="ghost">
                    <FileText className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                    View selected work
                  </ButtonLink>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none lg:pt-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-slate-900/12 ring-1 ring-slate-200/90">
                  <Image
                    src={siteImages.heroWorkspace.src}
                    alt={siteImages.heroWorkspace.alt}
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
                Engineering footprint
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                <span className="font-medium text-slate-800">Web &amp; APIs:</span>{" "}
                React ecosystems, Node.js and Java/Spring services, and
                product-grade AI integrations (assistants, retrieval, automation)
                grounded in your data policies.{" "}
                <span className="font-medium text-slate-800">Mobile:</span> native
                SDKs for iOS and Android, or React Native for shared business logic.{" "}
                <span className="font-medium text-slate-800">Cloud:</span> AWS and
                Azure—networking, observability, and releases tuned to how your
                team operates.
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl border-t border-[var(--color-border-subtle)] px-6 pb-24 pt-10 md:pb-28 lg:px-8">
          <dl className="grid gap-8 sm:grid-cols-3">
            {heroStats.map(({ label, value, icon: Icon }) => (
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
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:items-center lg:gap-12">
            <div>
              <h2 className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
                <Briefcase className="h-8 w-8 text-gold-600" strokeWidth={1.75} aria-hidden />
                Capability across the full funnel
              </h2>
              <p className="mt-4 text-slate-600">
                Everything tied to acquisition—so design decisions do not fight
                distribution.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg shadow-slate-900/10 ring-1 ring-slate-200/80">
              <Image
                src={siteImages.analyticsDashboard.src}
                alt={siteImages.analyticsDashboard.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((s) => {
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
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {s.body}
                      </p>
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
              Services overview
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              <FileText className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Case studies
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border-subtle)]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="relative mb-12 aspect-[2.4/1] w-full max-h-60 overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/80 sm:max-h-72">
            <Image
              src={siteImages.teamCollaboration.src}
              alt={siteImages.teamCollaboration.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-slate-900/5" aria-hidden />
          </div>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h2 className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
                <FileText className="h-8 w-8 text-gold-600" strokeWidth={1.75} aria-hidden />
                Proof, not posturing
              </h2>
              <p className="mt-4 max-w-xl text-slate-600">
                Case studies written for decision-makers—constraints, decisions,
                and outcomes.{" "}
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1 font-semibold text-gold-600 hover:text-gold-700"
                >
                  Browse all case studies
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                </Link>
                .
              </p>
            </div>
            <ButtonLink href="/work" variant="ghost">
              <FileText className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              All case studies
            </ButtonLink>
          </div>
<<<<<<< HEAD
          <div className="mt-12 grid gap-6 md:grid-cols-2">
=======
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
>>>>>>> 4c896421623002b20fad236becc872417032659e
            {workTeaser.map((w) => {
              const Icon = w.icon;
              return (
                <Link
                  key={w.slug}
                  href={`/work/${w.slug}`}
                  className="group surface-card block overflow-hidden rounded-2xl transition hover:border-gold-500/25"
                >
                  <div className="relative aspect-[2/1] w-full overflow-hidden">
                    <Image
                      src={w.image.src}
                      alt={w.image.alt}
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
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div>
              <h2 className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
                <Compass className="h-8 w-8 text-gold-600" strokeWidth={1.75} aria-hidden />
                How we work
              </h2>
              <p className="mt-4 max-w-2xl text-slate-600">
                Predictable phases, async by default, with live sessions when they
                save time.
              </p>
              <ol className="mt-12 grid gap-6 sm:grid-cols-2">
                {steps.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.n} className="surface-card rounded-2xl p-6">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-gold-600" strokeWidth={2} aria-hidden />
                        <span className="text-xs font-mono text-gold-600">{s.n}</span>
                      </div>
                      <p className="mt-3 font-medium text-slate-800">{s.t}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        {s.d}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="relative aspect-[3/4] max-h-[560px] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80 lg:sticky lg:top-24">
              <Image
                src={siteImages.strategySession.src}
                alt={siteImages.strategySession.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border-subtle)]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="surface-card relative min-h-[280px] overflow-hidden rounded-3xl px-8 py-14 md:min-h-0 md:px-14 md:py-16">
            <Image
              src={siteImages.cloudNetwork.src}
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
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-gold-500/20 blur-3xl" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
                <MessageCircle
                  className="h-9 w-9 text-gold-600 md:h-10 md:w-10"
                  strokeWidth={1.75}
                  aria-hidden
                />
                Tell us what you are building next.
              </h2>
              <p className="mt-4 text-slate-600">
                Share context in a few lines—we reply with{" "}
                <span className="inline-flex items-center gap-1 font-medium text-slate-800">
                  <PhoneForwarded className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
                  honest fit
                </span>
                , timeline, and a suggested path forward. See{" "}
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1 font-semibold text-gold-600 hover:text-gold-700"
                >
                  selected work
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                </Link>{" "}
                for how we have helped similar teams.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="/contact">
                  <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  Request a call
                </ButtonLink>
                <ButtonLink href="/about" variant="ghost">
                  <UsersRound className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  About the practice
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
