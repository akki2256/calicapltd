import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import {
  calicapServicePillars,
  calicapServicesOverview,
} from "@/lib/calicap-services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: calicapServicesOverview.metaTitle,
  description: calicapServicesOverview.metaDescription,
  path: "/services",
});

export default function ServicesPage() {
  const overview = calicapServicesOverview;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <div className="relative mb-12 aspect-[2.5/1] w-full max-h-64 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80 sm:max-h-80">
        <Image
          src={overview.heroImage.src}
          alt={overview.heroImage.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1152px) 100vw, 1152px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/45 to-slate-900/20" aria-hidden />
      </div>
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
        <Briefcase className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
        {overview.eyebrow}
      </p>
      <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
        {overview.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-600">
        {overview.introLead}{" "}
        <span className="font-medium text-slate-800">{overview.introStacks.web}</span>{" "}
        for web;{" "}
        <span className="font-medium text-slate-800">{overview.introStacks.mobile}</span>{" "}
        for mobile; and{" "}
        <span className="font-medium text-slate-800">{overview.introStacks.cloud}</span>{" "}
        {overview.introTail}
      </p>
      <div className="mt-10">
        <ButtonLink href="/contact">
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          {overview.ctaLabel}
        </ButtonLink>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {calicapServicePillars.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.href}
              href={p.href}
              className="group surface-card block overflow-hidden rounded-2xl transition hover:border-gold-500/30"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-80 transition group-hover:opacity-90" aria-hidden />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-accent-soft)]">
                  <Icon className="h-6 w-6 text-gold-700" strokeWidth={2} aria-hidden />
                </div>
                <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl text-slate-900 group-hover:text-slate-950">
                  {p.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {p.description}
                </p>
                <p className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                  View details
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="mt-14 text-sm text-slate-600">
        {overview.hybridPrompt}{" "}
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 font-semibold text-gold-600 hover:text-gold-700"
        >
          {overview.hybridCta}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        </Link>{" "}
        {overview.hybridTail}
      </p>
    </div>
  );
}
