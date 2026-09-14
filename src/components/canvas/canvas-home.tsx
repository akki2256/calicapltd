"use client";

import Image from "next/image";
import { CanvasArrow } from "@/components/canvas/canvas-arrow";
import { HOME_POSITIONING_ID, calicapHomeHero } from "@/lib/calicap-home";
import { siteImages } from "@/lib/site-images";

export function CanvasHome() {
  return (
    <div className="canvas-home relative min-h-[100dvh] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="canvas-home-media absolute inset-0">
          <Image
            src={siteImages.heroWorkspace.src}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[var(--color-surface)]/72" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-surface)_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface)]/80 via-[var(--color-surface)]/35 to-transparent" />
        <div className="canvas-home-grain absolute inset-0 opacity-[0.045]" />
      </div>

      <div className="canvas-home-copy-wrap relative z-10 flex min-h-[100dvh] items-center justify-center">
        <div className="canvas-home-copy w-full min-w-0 max-w-[min(100%,28rem)] text-center sm:max-w-xl">
          <p className="canvas-home-eyebrow mx-auto max-w-full text-balance text-[11px] font-light uppercase tracking-[0.28em] text-[var(--color-text-muted)] sm:tracking-[0.36em]">
            {calicapHomeHero.splash}
          </p>
          <a
            href={`#${HOME_POSITIONING_ID}`}
            className="canvas-welcome-cta group mt-8 inline-flex flex-col items-center text-[var(--color-text-strong)] sm:mt-10"
            onClick={(event) => {
              const target = document.getElementById(HOME_POSITIONING_ID);
              if (!target) return;
              event.preventDefault();
              target.scrollIntoView({ behavior: "smooth", block: "start" });
              window.history.replaceState(null, "", `#${HOME_POSITIONING_ID}`);
            }}
          >
            <span className="font-[family-name:var(--font-display)] text-[20px] font-extralight tracking-[0.08em] transition-opacity duration-300 group-hover:opacity-70 sm:text-[22px] md:text-[26px]">
              Start here
            </span>
            <span className="canvas-welcome-arrow relative mt-3 block overflow-hidden">
              <CanvasArrow className="mx-auto rotate-90 stroke-current transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-1.5" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
