"use client";

import { useRouter } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { CanvasOutcomeView } from "@/components/canvas/canvas-outcome-view";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { ThemeSplit } from "@/components/theme-split";
import { getOutcomeDetail } from "@/lib/calicap-services";
import { MessageCircle } from "lucide-react";

type Props = {
  outcomeId: string;
  embedded?: boolean;
};

function CaliconOutcomeView({ outcomeId, embedded = true }: Props) {
  const router = useRouter();
  const page = getOutcomeDetail(outcomeId);
  if (!page) return null;

  const sectionGap = embedded ? "mt-8 pt-6" : "mt-12 pt-8";

  return (
    <div
      className={
        embedded
          ? "w-full min-w-0 cursor-pointer px-0 py-0"
          : "mx-auto w-full max-w-6xl cursor-pointer px-4 py-12"
      }
      onClick={() => router.push("/services")}
    >
      <header>
        <h1
          className={`max-w-xl text-balance font-[family-name:var(--font-display)] font-medium tracking-tight text-slate-900 ${
            embedded
              ? "text-2xl leading-snug md:text-[1.75rem] md:leading-[1.2]"
              : "text-4xl md:text-[2.5rem] md:leading-[1.12]"
          }`}
        >
          {page.title}
        </h1>
        <p
          className={`mt-4 max-w-lg leading-relaxed text-slate-600 ${
            embedded ? "text-sm" : "text-base"
          }`}
        >
          {page.body}
        </p>
      </header>

      <section className={`border-t border-[var(--color-border-subtle)] ${sectionGap}`}>
        <h2
          className={`font-[family-name:var(--font-display)] font-medium tracking-tight text-slate-900 ${
            embedded ? "text-xl" : "text-2xl"
          }`}
        >
          {page.examplesTitle}
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {page.groups.map((g) => (
            <li
              key={g.title}
              className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/5"
            >
              <h3 className="font-[family-name:var(--font-display)] text-sm font-medium text-slate-900">
                {g.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{g.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <div
        className={`flex flex-wrap gap-3 border-t border-[var(--color-border-subtle)] ${sectionGap}`}
      >
        <span
          className="inline-flex"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <ProblemCtaButton variant="primary">
            <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            Tell us your problem
          </ProblemCtaButton>
        </span>
        <ButtonLink href="/services" variant="ghost">
          Explore services
        </ButtonLink>
      </div>
    </div>
  );
}

/** Theme-aware outcome body for the circuit detail panel (e.g. Integrations). */
export function OutcomeEmbeddedView({ outcomeId, embedded = true }: Props) {
  return (
    <ThemeSplit
      canvas={<CanvasOutcomeView outcomeId={outcomeId} embedded={embedded} />}
      calicon={<CaliconOutcomeView outcomeId={outcomeId} embedded={embedded} />}
    />
  );
}
