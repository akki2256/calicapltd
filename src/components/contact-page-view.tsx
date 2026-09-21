"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Clock, Compass, Mail, MapPin, PhoneForwarded } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/JsonLd";
import {
  CanvasReveal,
  CanvasStagger,
  CanvasStaggerItem,
  CanvasTextRevealInView,
} from "@/components/canvas/motion";
import { ThemeSplit } from "@/components/theme-split";
import { track } from "@/lib/analytics";
import { calicapContact } from "@/lib/calicap-contact";
import { calicapDiscovery, type ContactMode } from "@/lib/calicap-discovery";
import { siteImages } from "@/lib/site-images";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const bulletIcons = [Clock, PhoneForwarded, Compass, MapPin] as const;

type Props = {
  initialMode: ContactMode;
};

function CanvasContact({ initialMode }: Props) {
  const page = calicapContact.page;
  const copy = calicapDiscovery;

  return (
    <article className="canvas-contact mx-auto max-w-[920px] py-4">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <CanvasReveal variant="riseSoft">
        <p className="canvas-micro text-[var(--color-accent)]">{page.eyebrow}</p>
      </CanvasReveal>
      <div className="mt-6">
        <CanvasTextRevealInView
          as="h1"
          lines={["Tell us", "your problem."]}
          className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[var(--color-text-strong)]"
        />
      </div>
      <CanvasReveal variant="blurIn" delay={0.12} className="mt-8 max-w-xl">
        <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">{page.intro}</p>
      </CanvasReveal>

      <CanvasStagger
        className="mt-14 grid gap-0 border border-[var(--color-border-subtle)] sm:grid-cols-2"
        stagger={0.12}
      >
        <CanvasStaggerItem>
          <Link
            href="/contact?mode=know"
            scroll={false}
            onClick={() => track("contact_path_selected", { contact_path: "know" })}
            className={`group block border-[var(--color-border-subtle)] p-7 transition sm:border-r ${
              initialMode === "know"
                ? "bg-[var(--color-surface-elevated)]"
                : "hover:bg-[var(--color-surface-muted)]"
            }`}
          >
            <p className="canvas-micro text-[var(--color-accent)]">01</p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)] transition group-hover:translate-x-1 sm:text-2xl">
              {copy.knowTitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {copy.knowIntro}
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)] opacity-0 transition group-hover:opacity-100">
              Continue →
            </p>
          </Link>
        </CanvasStaggerItem>
        <CanvasStaggerItem>
          <Link
            href="/contact?mode=unsure"
            scroll={false}
            onClick={() => track("contact_path_selected", { contact_path: "unsure" })}
            className={`group block p-7 transition ${
              initialMode === "unsure"
                ? "bg-[var(--color-surface-elevated)]"
                : "hover:bg-[var(--color-surface-muted)]"
            }`}
          >
            <p className="canvas-micro text-[var(--color-accent)]">02</p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)] transition group-hover:translate-x-1 sm:text-2xl">
              {copy.unsureTitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {copy.unsureIntro}
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)] opacity-0 transition group-hover:opacity-100">
              Continue →
            </p>
          </Link>
        </CanvasStaggerItem>
      </CanvasStagger>

      <CanvasStagger className="mt-10 space-y-3" as="ul" stagger={0.08}>
        {page.bullets.map((text) => (
          <CanvasStaggerItem key={text} as="li" className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
            <span className="mt-2 h-px w-4 shrink-0 bg-[var(--color-accent)]" aria-hidden />
            <span>{text}</span>
          </CanvasStaggerItem>
        ))}
      </CanvasStagger>

      <CanvasReveal variant="rise" delay={0.1} className="mt-14 border-t border-[var(--color-border-subtle)] pt-12">
        <Suspense
          fallback={
            <div className="min-h-[24rem] animate-pulse border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)]" />
          }
        >
          <ContactForm initialMode={initialMode} />
        </Suspense>
      </CanvasReveal>
    </article>
  );
}

function CaliconContact({ initialMode }: Props) {
  const page = calicapContact.page;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
            <Mail className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
            {page.eyebrow}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
            {page.title}
          </h1>
          <p className="mt-6 text-slate-600 leading-relaxed">{page.intro}</p>
          <ul className="mt-8 space-y-3 text-sm text-slate-500">
            {page.bullets.map((text, index) => {
              const Icon = bulletIcons[index] ?? Clock;
              return (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
                  <span>{text}</span>
                </li>
              );
            })}
          </ul>
          <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80 lg:block">
            <Image
              src={siteImages.modernOffice.src}
              alt={siteImages.modernOffice.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1152px) 100vw, 480px"
            />
          </div>
        </div>
        <Suspense
          fallback={
            <div className="surface-card min-h-[24rem] animate-pulse rounded-2xl p-8 md:p-10" />
          }
        >
          <ContactForm initialMode={initialMode} />
        </Suspense>
      </div>
    </div>
  );
}

export function ContactPageView({ initialMode }: Props) {
  return (
    <ThemeSplit
      canvas={<CanvasContact initialMode={initialMode} />}
      calicon={<CaliconContact initialMode={initialMode} />}
    />
  );
}
