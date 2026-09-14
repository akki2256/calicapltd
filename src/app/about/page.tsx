import Image from "next/image";
import { FileText, Lightbulb, PhoneForwarded } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
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
          <div className="mt-10 max-w-2xl space-y-6 text-slate-600 leading-relaxed">
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
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href="/contact">
              <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {about.primaryCta}
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              <FileText className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {about.secondaryCta}
            </ButtonLink>
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
