import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LayoutTemplate,
  Megaphone,
  Monitor,
  PhoneForwarded,
  Search,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Web app development",
  description:
    "Web experiences with React, Node.js, Spring, AI integrations, and AWS or Azure—plus SEO, content, and performance marketing.",
};

const offerings: { title: string; icon: LucideIcon; points: string[] }[] = [
  {
    title: "Website design & build",
    icon: LayoutTemplate,
    points: [
      "Positioning, IA, and UX flows grounded in conversion",
      "React ecosystems for the UI (including Next.js where it fits), with Node.js or Spring for APIs, jobs, and integrations—plus AI features when the product case is clear",
      "Analytics, consent-aware tagging, technical SEO, and observability from day one",
    ],
  },
  {
    title: "Organic growth",
    icon: Search,
    points: [
      "Keyword strategy tied to revenue stages—not vanity volume",
      "Content systems: briefs, templates, and internal linking architecture—with AI assist for research and drafts where editors stay accountable",
      "Core Web Vitals, schema, and index hygiene as ongoing hygiene",
    ],
  },
  {
    title: "Performance marketing",
    icon: Megaphone,
    points: [
      "Paid search and paid social when creative and landing pages are ready",
      "Attribution that respects privacy changes—offline imports where needed",
      "Creative testing cadence with guardrails on CAC and payback, with infrastructure on AWS or Azure sized to traffic reality",
    ],
  },
];

export default function WebAppDevelopmentPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-700/90 hover:text-gold-600"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        Services
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
            <Monitor className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
            Web app development
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
            Web experiences built to sell and scale.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            From marketing sites to app-like web products—strategy, implementation,
            and distribution aligned so design never fights demand gen. We build with{" "}
            <span className="font-medium text-slate-800">
              React, Node.js, and Spring
            </span>
            , adopt{" "}
            <span className="font-medium text-slate-800">
              AI integrations (LLMs, retrieval, workflow automation)
            </span>{" "}
            where they improve outcomes—not slide decks—and host on{" "}
            <span className="font-medium text-slate-800">AWS</span> or{" "}
            <span className="font-medium text-slate-800">Azure</span> to match your
            enterprise requirements.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/contact">
              <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Discuss scope
            </ButtonLink>
            <ButtonLink href="/services/mobile-app-development" variant="ghost">
              <Smartphone className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Mobile app development
            </ButtonLink>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80">
          <Image
            src={siteImages.heroWorkspace.src}
            alt={siteImages.heroWorkspace.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      <div className="mt-16 space-y-8">
        {offerings.map((o) => {
          const Icon = o.icon;
          return (
            <div key={o.title} className="surface-card rounded-2xl p-8 md:p-10">
              <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl text-slate-900">
                <Icon className="h-7 w-7 text-gold-600" strokeWidth={1.75} aria-hidden />
                {o.title}
              </h2>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-600">
                {o.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-gold-600"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-14 text-sm text-slate-600">
        Need both web and mobile?{" "}
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 font-semibold text-gold-600 hover:text-gold-700"
        >
          Tell us about the full roadmap
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        </Link>
        .
      </p>
    </div>
  );
}
