import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, ShoppingBag } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { pageMetadata } from "@/lib/seo";
import {
  calicapWorkIndex,
  calicapWorkStudies,
  getWorkStudyImage,
} from "@/lib/calicap-work";

export const metadata = pageMetadata({
  title: calicapWorkIndex.metaTitle,
  description: calicapWorkIndex.metaDescription,
  path: "/work",
});

export default function WorkIndexPage() {
  const index = calicapWorkIndex;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <div className="relative mb-12 aspect-[2.5/1] w-full max-h-64 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80 sm:max-h-80">
        <Image
          src={index.heroImage.src}
          alt={index.heroImage.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1152px) 100vw, 1152px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-slate-900/15" aria-hidden />
      </div>
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
        <FileText className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
        {index.eyebrow}
      </p>
      <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
        {index.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-600">{index.intro}</p>
      <div className="mt-10">
        <ButtonLink href="/contact">
          <ShoppingBag className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          {index.ctaLabel}
        </ButtonLink>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {calicapWorkStudies.map((s) => {
          const Icon = s.icon;
          const image = getWorkStudyImage(s);
          return (
            <Link
              key={s.slug}
              href={`/work/${s.slug}`}
              className="group surface-card block overflow-hidden rounded-2xl transition hover:border-gold-500/25"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 to-transparent opacity-85 transition group-hover:opacity-95" aria-hidden />
              </div>
              <div className="flex flex-col p-8 md:p-10">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Icon className="h-3.5 w-3.5 text-gold-600" strokeWidth={2} aria-hidden />
                  {s.label}
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-slate-900 group-hover:text-slate-900">
                  {s.title}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                  {s.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                  Open case study
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
