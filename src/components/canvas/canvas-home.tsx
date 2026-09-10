"use client";

import Link from "next/link";
import Image from "next/image";
import { CanvasArrow } from "@/components/canvas/canvas-arrow";
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
        <div className="absolute inset-0 bg-[#141414]/72" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#141414_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/80 via-[#141414]/35 to-transparent" />
        <div className="canvas-home-grain absolute inset-0 opacity-[0.045]" />
      </div>

      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-8 pb-[78px] pt-[115px] md:pr-[78px]">
        <div className="canvas-home-copy text-center">
          <p className="canvas-home-eyebrow text-[11px] font-light uppercase tracking-[0.42em] text-[#7d7d7d]">
            Websites &amp; digital growth
          </p>
          <Link
            href="/work"
            className="canvas-welcome-cta group mt-10 inline-flex flex-col items-center text-white"
          >
            <span className="font-[family-name:var(--font-display)] text-[22px] font-extralight tracking-[0.08em] transition-opacity duration-300 group-hover:opacity-70 md:text-[26px]">
              Start here
            </span>
            <span className="canvas-welcome-arrow relative mt-3 block overflow-hidden">
              <CanvasArrow className="mx-auto rotate-90 stroke-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-1.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
