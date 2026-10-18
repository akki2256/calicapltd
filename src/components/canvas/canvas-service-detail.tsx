import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { JsonLd } from "@/components/JsonLd";
import {
  canvasServiceImage,
  type CanvasServiceDetail,
} from "@/lib/canvas-service-details";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";

type Props = {
  detail: CanvasServiceDetail;
};

/** Canvas service family page — one route shared by every card in the category */
export function CanvasServiceDetail({ detail }: Props) {
  const image = canvasServiceImage(detail);

  return (
    <article className="canvas-service-detail w-full min-w-0 pt-4 pb-4" data-canvas-authored="">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: detail.metaTitle, path: detail.path },
          ]),
          serviceJsonLd({
            name: detail.title,
            description: detail.metaDescription,
            path: detail.path,
          }),
        ]}
      />

      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)] hover:text-[var(--color-link-hover)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
        Services
      </Link>

      <p className="canvas-micro mt-8 text-[var(--color-accent)]">{detail.eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.035em] text-[var(--color-text-strong)]">
        {detail.title}
      </h1>
      <p className="mt-6 max-w-3xl text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
        {detail.body}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/contact">{detail.cta}</ButtonLink>
        {detail.siblingHref && detail.siblingLabel ? (
          <ButtonLink href={detail.siblingHref} variant="ghost">
            {detail.siblingLabel}
          </ButtonLink>
        ) : null}
      </div>

      <div className="relative mt-12 aspect-[16/8] w-full overflow-hidden border border-[var(--color-border-subtle)]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1100px"
          priority
        />
      </div>

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.15rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]">
          {detail.aspectsTitle}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
          {detail.aspectsIntro}
        </p>
        <div className="mt-8 divide-y divide-[var(--color-border-subtle)] border-y border-[var(--color-border-subtle)]">
          {detail.aspects.map((aspect) => (
            <div key={aspect.title} className="grid gap-4 py-8 lg:grid-cols-[minmax(14rem,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)]">
                  {aspect.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {aspect.summary}
                </p>
              </div>
              <ul className="space-y-3">
                {aspect.points.map((point) => (
                  <li
                    key={point}
                    className="border-l border-[var(--color-accent)]/40 pl-4 text-sm leading-relaxed text-[var(--color-text-muted)]"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.15rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]">
          {detail.contextsTitle}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
          {detail.contextsIntro}
        </p>
        <ul className="mt-8 grid gap-px border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] sm:grid-cols-2">
          {detail.contexts.map((context) => (
            <li key={context.label} className="bg-[var(--color-surface)] px-5 py-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
                {context.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {context.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.15rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]">
          Typical situations
        </h2>
        <ul className="mt-6 max-w-3xl space-y-3">
          {detail.useCases.map((useCase) => (
            <li
              key={useCase}
              className="border-l border-[var(--color-accent)]/40 pl-4 text-sm leading-relaxed text-[var(--color-text-muted)]"
            >
              {useCase}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
          Approach
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-start sm:gap-10">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.15rem)] font-medium tracking-[-0.03em] text-[var(--color-text-strong)]">
            {detail.deliveryTitle}
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
            {detail.deliveryBody}
          </p>
        </div>
      </section>

      <p className="mt-14 max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
        {detail.footerPrompt}{" "}
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 font-medium text-[var(--color-link)] hover:text-[var(--color-link-hover)]"
        >
          {detail.footerCta}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
        </Link>
      </p>
    </article>
  );
}
