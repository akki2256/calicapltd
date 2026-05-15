import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Monitor, Smartphone } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web and mobile services: React, Node.js, Spring, AI, native iOS and Android, React Native, AWS and Azure.",
};

const pillars = [
  {
    href: "/services/web-app-development",
    title: "Web app development",
    description:
      "React-first front ends, Node.js and Spring backends, AI-enabled features, and delivery on AWS or Azure—plus SEO and performance marketing in the same engagement.",
    icon: Monitor,
    image: siteImages.heroWorkspace,
  },
  {
    href: "/services/mobile-app-development",
    title: "Mobile app development",
    description:
      "Native iOS and Android or React Native when it is the right trade-off—store presence, growth, and backends that plug into AWS or Azure like your web estate.",
    icon: Smartphone,
    image: siteImages.mobileHands,
  },
];

export default function ServicesPage() {
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
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/45 to-slate-900/20" aria-hidden />
      </div>
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
        <Briefcase className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
        Services
      </p>
      <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
        From first impression to repeatable demand.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-600">
        Engagements are scoped as projects with optional retained growth. Every
        line item maps to a milestone you can inspect—not a black box retainer.
        Under the hood we standardise on{" "}
        <span className="font-medium text-slate-800">
          React, Node.js, Spring, and pragmatic AI integrations
        </span>{" "}
        for web;{" "}
        <span className="font-medium text-slate-800">
          native iOS and Android or React Native
        </span>{" "}
        for mobile; and{" "}
        <span className="font-medium text-slate-800">AWS or Azure</span> for
        cloud—so handovers stay honest.
      </p>
      <div className="mt-10">
        <ButtonLink href="/contact">
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Discuss scope
        </ButtonLink>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {pillars.map((p) => {
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
        Looking for something hybrid?{" "}
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 font-semibold text-gold-600 hover:text-gold-700"
        >
          Outline your constraints
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        </Link>{" "}
        and we will propose a phased plan.
      </p>
    </div>
  );
}
