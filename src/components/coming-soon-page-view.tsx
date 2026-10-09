"use client";

import { ThemeSplit } from "@/components/theme-split";
import { ButtonLink } from "@/components/button-link";

export function ComingSoonPageView({ title }: { title: string }) {
  return (
    <ThemeSplit
      canvas={<CanvasComingSoon title={title} />}
      calicon={<CaliconComingSoon title={title} />}
    />
  );
}

function CanvasComingSoon({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
      <p className="canvas-micro text-[var(--color-accent)]">{title}</p>
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-[-0.035em] text-[var(--color-text-strong)]">
        Coming Soon
      </h1>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--color-text-muted)]">
        This page is being prepared. Check back shortly, or head home in the meantime.
      </p>
      <div className="mt-10">
        <ButtonLink href="/">Home</ButtonLink>
      </div>
    </div>
  );
}

function CaliconComingSoon({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8 lg:py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
        {title}
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
        Coming Soon
      </h1>
      <p className="mt-5 max-w-md text-lg text-slate-600">
        This page is being prepared. Check back shortly, or head home in the meantime.
      </p>
      <div className="mt-10">
        <ButtonLink href="/">Home</ButtonLink>
      </div>
    </div>
  );
}
