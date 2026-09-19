"use client";

import { CanvasArrow } from "@/components/canvas/canvas-arrow";
import { GenerativeField } from "@/components/canvas/generative-field";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { HOME_POSITIONING_ID, calicapHomeHero } from "@/lib/calicap-home";
import { MessageCircle, Layers } from "lucide-react";

export function CanvasHome() {
  return (
    <div className="canvas-home relative min-h-[100dvh] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <GenerativeField className="opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,transparent_0%,rgba(10,10,10,0.55)_55%,rgba(10,10,10,0.92)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/35 to-transparent" />
        <div className="canvas-home-grain absolute inset-0 opacity-[0.04]" />
      </div>

      <div className="canvas-home-copy-wrap relative z-10 flex min-h-[100dvh] items-end pb-16 sm:items-center sm:pb-0">
        <div className="canvas-home-copy w-full min-w-0 max-w-[min(100%,40rem)]">
          <p className="canvas-home-eyebrow text-[11px] font-medium uppercase tracking-[0.32em] text-white/55">
            {calicapHomeHero.eyebrow}
          </p>
          <h1 className="canvas-home-headline mt-6 font-[family-name:var(--font-display)] text-[clamp(2.75rem,8vw,5.5rem)] font-light leading-[0.95] tracking-[-0.04em] text-white">
            <span className="block">Build</span>
            <span className="block text-gradient">what&apos;s next.</span>
          </h1>
          <p className="canvas-home-body mt-8 max-w-md text-[15px] font-light leading-relaxed tracking-[0.02em] text-white/70 sm:text-base">
            {calicapHomeHero.body}
          </p>
          <div className="canvas-home-ctas mt-10 flex flex-wrap items-center gap-3">
            <ProblemCtaButton>
              <MessageCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
              {calicapHomeHero.primaryCta}
            </ProblemCtaButton>
            <ButtonLink href={calicapHomeHero.secondaryHref} variant="ghost">
              <Layers className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
              {calicapHomeHero.secondaryCta}
            </ButtonLink>
          </div>
          <a
            href={`#${HOME_POSITIONING_ID}`}
            className="canvas-welcome-cta group mt-14 inline-flex flex-col items-start text-white/50 transition hover:text-white"
            onClick={(event) => {
              const target = document.getElementById(HOME_POSITIONING_ID);
              if (!target) return;
              event.preventDefault();
              target.scrollIntoView({ behavior: "smooth", block: "start" });
              window.history.replaceState(null, "", `#${HOME_POSITIONING_ID}`);
            }}
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.28em]">
              Enter
            </span>
            <span className="canvas-welcome-arrow relative mt-3 block overflow-hidden">
              <CanvasArrow className="rotate-90 stroke-current transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-1.5" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
