import type { Metadata } from "next";
import Image from "next/image";
import { FileText, Lightbulb, PhoneForwarded, Scale, Target, BarChart3 } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior-led web and mobile practice—React, Node.js, Spring, AI integrations, native iOS and Android, React Native, AWS and Azure.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
            <Lightbulb className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
            About
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
            Small team by design.
          </h1>
          <div className="mt-10 max-w-2xl space-y-6 text-slate-600 leading-relaxed">
            <p className="relative pl-5">
              <Target className="absolute left-0 top-1 h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
              Calicap sits at the intersection of engineering taste and commercial
              reality. We work in the stacks clients actually hire for—
              <span className="text-slate-800">
                React for product UIs, Node.js and Spring for services and APIs,
                thoughtful AI integrations, and native iOS, Android, or React
                Native on mobile
              </span>
              . Cloud defaults lean toward{" "}
              <span className="text-slate-800">AWS</span> and{" "}
              <span className="text-slate-800">Azure</span>, aligned to your
              residency and compliance story—because fragile marketing stacks waste
              attention and budget.
            </p>
            <p className="relative pl-5">
              <Scale className="absolute left-0 top-1 h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
              Engagements are lead-senior: you work with the people shipping the
              work, not a revolving cast. We are comfortable saying no when the
              timing, offer, or tracking is not ready for scale.
            </p>
            <p className="relative pl-5">
              <BarChart3 className="absolute left-0 top-1 h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
              If you are comparing agencies, ask how they measure success in the
              first ninety days. If the answer is only traffic, keep looking.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href="/contact">
              <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Start a conversation
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              <FileText className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Read case studies
            </ButtonLink>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl shadow-slate-900/12 ring-1 ring-slate-200/90 lg:sticky lg:top-24 lg:aspect-[3/4]">
          <Image
            src={siteImages.teamCollaboration.src}
            alt={siteImages.teamCollaboration.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </div>
    </div>
  );
}
