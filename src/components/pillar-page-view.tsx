"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MessageCircle, PhoneForwarded } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CanvasPillarView } from "@/components/canvas/canvas-pillar-view";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { JsonLd } from "@/components/JsonLd";
import { ThemeSplit } from "@/components/theme-split";
import {
  calicapBuildDetailLinks,
  calicapServicesApproach,
  calicapServicesUnsure,
  getPillarPage,
  getPillarSection,
} from "@/lib/calicap-services";
import { getWorkStudiesForPillar, getWorkStudyImage } from "@/lib/calicap-work";
import { getPillar, type PillarId } from "@/lib/brand-architecture";
import { siteImages } from "@/lib/site-images";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";

type Props = {
  pillarId: PillarId;
  /** Hide Related work — used when embedding in the home circuit panel */
  omitRelatedWork?: boolean;
  /** Denser chrome for constrained surfaces (circuit detail panel) */
  embedded?: boolean;
};

/** Canvas no longer ships standalone pillar pages — send visitors to Services. */
function CanvasPillarPageRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/services");
  }, [router]);
  return null;
}

export function PillarPageView({ pillarId }: Props) {
  const page = getPillarPage(pillarId);
  const pillar = getPillar(pillarId);

  return (
    <>
      {page ? (
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: pillar.label, path: page.path },
            ]),
            serviceJsonLd({
              name: page.title,
              description: page.metaDescription,
              path: page.path,
            }),
          ]}
        />
      ) : null}
      <ThemeSplit
        canvas={<CanvasPillarPageRedirect />}
        calicon={<CaliconPillarView pillarId={pillarId} />}
      />
    </>
  );
}

/** Theme-aware pillar body for the outcomes circuit detail panel */
export function PillarEmbeddedView({
  pillarId,
  omitRelatedWork = true,
  embedded = true,
}: Props) {
  return (
    <ThemeSplit
      canvas={<CanvasPillarView pillarId={pillarId} embedded={embedded} />}
      calicon={
        <CaliconPillarView
          pillarId={pillarId}
          omitRelatedWork={omitRelatedWork}
          embedded={embedded}
        />
      }
    />
  );
}

function CaliconPillarView({
  pillarId,
  omitRelatedWork = false,
  embedded = false,
}: Props) {
  const router = useRouter();
  const page = getPillarPage(pillarId);
  const section = getPillarSection(pillarId);
  if (!page || !section) return null;

  const unsure = calicapServicesUnsure;
  const approach = calicapServicesApproach;
  const related = omitRelatedWork ? [] : getWorkStudiesForPillar(pillarId);
  const sectionGap = embedded ? "mt-8 pt-6" : "mt-12 pt-8";

  /** Circuit detail — same layout as Build for every embedded pillar */
  if (embedded) {
    return (
      <div
        className="w-full min-w-0 cursor-pointer px-0 py-0"
        onClick={() => router.push("/services")}
      >
        <header>
          <h1 className="max-w-xl text-balance font-[family-name:var(--font-display)] text-2xl font-medium leading-snug tracking-tight text-slate-900 md:text-[1.75rem] md:leading-[1.2]">
            {page.title}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-600">
            {page.body}
          </p>
        </header>

        <section className={`border-t border-[var(--color-border-subtle)] ${sectionGap}`}>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-slate-900">
            {page.examplesTitle}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {section.groups.map((g) => (
              <li
                key={g.title}
                className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/5"
              >
                <h3 className="font-[family-name:var(--font-display)] text-sm font-medium text-slate-900">
                  {g.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{g.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <div
          className={`flex flex-wrap gap-3 border-t border-[var(--color-border-subtle)] ${sectionGap}`}
        >
          <span
            className="inline-flex"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <ProblemCtaButton variant="primary">
              <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Tell us your problem
            </ProblemCtaButton>
          </span>
          <ButtonLink href="/services" variant="ghost">
            Explore services
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        embedded
          ? "w-full min-w-0 px-0 py-0"
          : "mx-auto w-full min-w-0 max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14"
      }
    >
      <header
        className={
          embedded
            ? "grid items-end gap-5"
            : "grid items-end gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10"
        }
      >
        <div>
          {!embedded ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700/95">
              {page.eyebrow}
            </p>
          ) : null}
          <h1
            className={`max-w-xl text-balance font-[family-name:var(--font-display)] font-medium tracking-tight text-slate-900 ${
              embedded
                ? "mt-0 text-2xl leading-snug md:text-[1.75rem] md:leading-[1.2]"
                : "mt-3 text-4xl md:text-[2.5rem] md:leading-[1.12]"
            }`}
          >
            {page.title}
          </h1>
          <p
            className={`mt-4 max-w-lg leading-relaxed text-slate-600 ${
              embedded ? "text-sm" : "text-base"
            }`}
          >
            {page.body}
          </p>
          <div className={`flex flex-wrap gap-3 ${embedded ? "mt-5" : "mt-7"}`}>
            <ButtonLink href={page.contactHref}>
              <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {page.contactCta}
            </ButtonLink>
            {page.problemCta ? (
              <ProblemCtaButton variant="ghost">
                <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                {page.problemCta}
              </ProblemCtaButton>
            ) : null}
          </div>
        </div>
        {!embedded ? (
          <div className="relative aspect-[5/3] w-full overflow-hidden rounded-2xl shadow-lg shadow-slate-900/10 ring-1 ring-slate-200/80">
            <Image
              src={siteImages.cloudNetwork.src}
              alt={siteImages.cloudNetwork.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        ) : null}
      </header>

      <section
        className={`grid gap-8 border-t border-[var(--color-border-subtle)] lg:grid-cols-2 lg:gap-12 ${sectionGap}`}
      >
        <div>
          <h2
            className={`font-[family-name:var(--font-display)] font-medium tracking-tight text-slate-900 ${
              embedded ? "text-xl" : "text-2xl"
            }`}
          >
            {page.challengesTitle}
          </h2>
          <ul className="mt-5 space-y-0">
            {page.challenges.map((item, index) => (
              <li
                key={item}
                className="flex items-baseline gap-3 border-b border-[var(--color-border-subtle)] py-3.5 text-sm leading-relaxed text-slate-700"
              >
                <span className="shrink-0 font-mono text-[11px] text-gold-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2
            className={`font-[family-name:var(--font-display)] font-medium tracking-tight text-slate-900 ${
              embedded ? "text-xl" : "text-2xl"
            }`}
          >
            {page.examplesTitle}
          </h2>
          <ul className="mt-5 space-y-0">
            {page.examples.map((item) => (
              <li
                key={item}
                className="border-l-2 border-gold-500/40 py-3 pl-4 text-sm leading-relaxed text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`border-t border-[var(--color-border-subtle)] ${sectionGap}`}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <h2
            className={`font-[family-name:var(--font-display)] font-medium tracking-tight text-slate-900 ${
              embedded ? "text-xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {section.title}
          </h2>
          <p className="max-w-md text-sm text-slate-600 sm:text-right">{section.intro}</p>
        </div>
        <div className="mt-6 divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
          {section.groups.map((g) => (
            <div
              key={g.title}
              className="grid gap-2 py-5 sm:grid-cols-[minmax(9rem,14rem)_minmax(0,1fr)] sm:gap-8"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base text-slate-900">
                {g.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">{g.body}</p>
            </div>
          ))}
        </div>
        {pillarId === "build" ? (
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
            {calicapBuildDetailLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-700"
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                {label}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      {related.length > 0 ? (
        <section className={`border-t border-[var(--color-border-subtle)] ${sectionGap}`}>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
            Related work
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((s) => {
              const image = getWorkStudyImage(s);
              return (
                <Link key={s.slug} href={`/work/${s.slug}`} className="group block">
                  <div className="relative aspect-[2.2/1] w-full overflow-hidden rounded-xl ring-1 ring-slate-200/80">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg text-slate-900">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{s.result}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                    Read case study
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section
        className={`grid gap-6 border-t border-[var(--color-border-subtle)] lg:grid-cols-2 lg:gap-10 ${sectionGap}`}
      >
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-slate-900">
            {approach.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{approach.body}</p>
        </div>
        <div className="flex flex-col justify-between gap-5 border-l-0 border-t border-[var(--color-border-subtle)] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-slate-900">
              {unsure.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{unsure.body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={page.contactHref}>
              <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {page.contactCta}
            </ButtonLink>
            <ProblemCtaButton variant="ghost">
              <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {unsure.cta}
            </ProblemCtaButton>
          </div>
        </div>
      </section>
    </div>
  );
}
