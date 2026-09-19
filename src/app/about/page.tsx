import Image from "next/image";
import { FileText, Lightbulb, MessageCircle, PhoneForwarded } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { calicapAbout } from "@/lib/calicap-about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: calicapAbout.metaTitle,
  description: calicapAbout.metaDescription,
  path: "/about",
});

export default function AboutPage() {
  const about = calicapAbout;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
            <Lightbulb className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
            {about.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
            {about.title}
          </h1>

          <section className="mt-10 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {about.visionTitle}
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">{about.visionBody}</p>
          </section>

          <section className="mt-10 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {about.philosophyTitle}
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">{about.philosophyBody}</p>
          </section>

          <section className="mt-10 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {about.howWeWorkTitle}
            </h2>
            <p className="mt-3 text-sm text-slate-500">{about.howWeWorkIntro}</p>
            <ol className="mt-6 space-y-4">
              {about.howWeWorkSteps.map((step) => (
                <li key={step.n} className="flex gap-3">
                  <span className="text-xs font-mono text-gold-600">{step.n}</span>
                  <div>
                    <p className="font-medium text-slate-800">{step.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {about.whereTitle}
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">{about.whereBody}</p>
          </section>

          <section className="mt-10 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {about.beliefsTitle}
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {about.beliefs.map((belief) => (
                <li key={belief} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-600" aria-hidden />
                  <span>{belief}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10 max-w-2xl space-y-6 text-slate-600 leading-relaxed">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {about.teamTitle}
            </h2>
            {about.paragraphs.map((paragraph, index) => {
              const Icon = paragraph.icon;
              return (
                <p key={index} className="relative pl-5">
                  <Icon
                    className="absolute left-0 top-1 h-4 w-4 text-gold-600"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {paragraph.blocks.map((block, blockIndex) =>
                    block.type === "em" ? (
                      <span key={blockIndex} className="text-slate-800">
                        {block.value}
                      </span>
                    ) : (
                      <span key={blockIndex}>{block.value}</span>
                    ),
                  )}
                </p>
              );
            })}
          </section>

          <div className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href={about.primaryHref}>
              <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {about.primaryCta}
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              <FileText className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {about.secondaryCta}
            </ButtonLink>
          </div>
          <div className="mt-14 border-t border-[var(--color-border-subtle)] pt-10">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
              {about.aboutCloseTitle}
            </h2>
            <div className="mt-6">
              <ProblemCtaButton>
                <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                {about.aboutCloseCta}
              </ProblemCtaButton>
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl shadow-slate-900/12 ring-1 ring-slate-200/90 lg:sticky lg:top-24 lg:aspect-[3/4]">
          <Image
            src={about.image.src}
            alt={about.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </div>
    </div>
  );
}
