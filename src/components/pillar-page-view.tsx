import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, PhoneForwarded } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import {
  calicapBuildDetailLinks,
  calicapServicesApproach,
  calicapServicesUnsure,
  getPillarPage,
  getPillarSection,
} from "@/lib/calicap-services";
import { calicapHomeProcess } from "@/lib/calicap-home";
import { getWorkStudiesForPillar, getWorkStudyImage } from "@/lib/calicap-work";
import { siteImages } from "@/lib/site-images";

type Props = {
  pillarId: "build" | "transform" | "automate" | "evolve";
};

export function PillarPageView({ pillarId }: Props) {
  const page = getPillarPage(pillarId);
  const section = getPillarSection(pillarId);
  if (!page || !section) return null;

  const unsure = calicapServicesUnsure;
  const approach = calicapServicesApproach;
  const related = getWorkStudiesForPillar(pillarId);
  const process = calicapHomeProcess;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <div className="relative mb-12 aspect-[2.5/1] w-full max-h-64 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80 sm:max-h-80">
        <Image
          src={siteImages.cloudNetwork.src}
          alt={siteImages.cloudNetwork.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1152px) 100vw, 1152px"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/45 to-slate-900/20"
          aria-hidden
        />
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
        {page.eyebrow}
      </p>
      <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
        {page.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-600">{page.body}</p>
      <div className="mt-10 flex flex-wrap gap-4">
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

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
          {page.challengesTitle}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {page.challenges.map((item) => (
            <li key={item} className="surface-card rounded-2xl p-6 text-sm leading-relaxed text-slate-600">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
          {page.examplesTitle}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {page.examples.map((item) => (
            <li key={item} className="surface-card rounded-2xl p-6 text-sm leading-relaxed text-slate-600">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-10 max-w-2xl">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-slate-900">
            {page.flexibleTitle}
          </h3>
          <p className="mt-3 text-slate-600">{page.flexibleBody}</p>
        </div>
      </section>

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
          {section.title}
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600">{section.intro}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {section.groups.map((g) => (
            <div key={g.title} className="surface-card rounded-2xl p-6 md:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-lg text-slate-900">
                {g.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{g.body}</p>
            </div>
          ))}
        </div>
        {pillarId === "build" ? (
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
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

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
          {process.title}
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">{process.intro}</p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {process.steps.map((s) => (
            <li key={s.n} className="surface-card rounded-2xl p-5">
              <p className="text-xs font-mono text-gold-600">{s.n}</p>
              <p className="mt-2 font-medium text-slate-800">{s.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {related.length > 0 ? (
        <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
          <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
            Related work
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            Real projects that show this kind of work in practice.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {related.map((s) => {
              const image = getWorkStudyImage(s);
              return (
                <Link
                  key={s.slug}
                  href={`/work/${s.slug}`}
                  className="group surface-card block overflow-hidden rounded-2xl transition hover:border-gold-500/30"
                >
                  <div className="relative aspect-[2/1] w-full overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-display)] text-lg text-slate-900">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{s.result}</p>
                    <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                      Read case study
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mt-16 surface-card rounded-2xl p-8 md:p-10">
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
          {approach.title}
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600">{approach.body}</p>
      </section>

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
          {unsure.title}
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600">{unsure.body}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href={page.contactHref}>
            <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            {page.contactCta}
          </ButtonLink>
          <ProblemCtaButton variant="ghost">
            <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            {unsure.cta}
          </ProblemCtaButton>
        </div>
      </section>
    </div>
  );
}
