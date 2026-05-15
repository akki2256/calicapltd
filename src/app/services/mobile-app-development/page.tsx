import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Megaphone,
  Monitor,
  PhoneForwarded,
  Smartphone,
  Store,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Mobile app development",
  description:
    "Native iOS, Android, and React Native—with APIs on Node.js or Spring and cloud on AWS or Azure.",
};

const offerings: { title: string; icon: LucideIcon; points: string[] }[] = [
  {
    title: "Mobile product design & build",
    icon: Smartphone,
    points: [
      "Product definition, IA, and UX patterns tuned for iOS and Android—native Swift and Kotlin where performance and platform APIs matter, or React Native when delivery speed and shared logic win",
      "Backend contracts that align with your web estate: Node.js or Spring services, versioning, and CI so app releases are boring on purpose",
      "Instrumentation, consent-aware analytics, and release pipelines from day one—artifacts deployed through AWS or Azure alongside your existing cloud footprint",
    ],
  },
  {
    title: "Organic discovery",
    icon: Store,
    points: [
      "App store positioning and keyword strategy tied to category reality—not generic ASO lists",
      "Creative and editorial rhythm for ratings, featuring, and lifecycle engagement",
      "Technical health of listings, deep links, and share surfaces as part of growth hygiene",
    ],
  },
  {
    title: "Performance marketing",
    icon: Megaphone,
    points: [
      "Paid acquisition when product–market signals are ready: meta search, UAC, and partner networks",
      "Attribution and incrementality with privacy constraints—offline and SKAN where relevant",
      "Creative and cohort testing with guardrails on CAC, payback, and retention",
    ],
  },
];

export default function MobileAppDevelopmentPage() {
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
            <Smartphone className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
            Mobile app development
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
            Mobile products with the same commercial rigour as web.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            We mirror the web playbook—clarity of offer, disciplined build, and
            distribution that rolls up to numbers you can defend. Delivery spans{" "}
            <span className="font-medium text-slate-800">
              native iOS and Android
            </span>
            ,{" "}
            <span className="font-medium text-slate-800">
              React Native
            </span>{" "}
            when appropriate, and the same{" "}
            <span className="font-medium text-slate-800">Node.js / Spring</span> and{" "}
            <span className="font-medium text-slate-800">AWS / Azure</span> patterns
            your web teams already run.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/contact">
              <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Discuss scope
            </ButtonLink>
            <ButtonLink href="/services/web-app-development" variant="ghost">
              <Monitor className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Web app development
            </ButtonLink>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80">
          <Image
            src={siteImages.mobileHands.src}
            alt={siteImages.mobileHands.alt}
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
        Shipping web and mobile together?{" "}
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 font-semibold text-gold-600 hover:text-gold-700"
        >
          Outline your constraints
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        </Link>
        .
      </p>
    </div>
  );
}
