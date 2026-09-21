import Link from "next/link";
import Image from "next/image";
import { getWorkStudyImage, type CalicapWorkStudy } from "@/lib/calicap-work";

type Props = {
  studies: readonly CalicapWorkStudy[];
  heading?: string;
  intro?: string;
};

/** Theme-token related work — used on service pages; pillars keep their own layouts */
export function RelatedWork({
  studies,
  heading = "Related work",
  intro = "Real projects that show this kind of work in practice.",
}: Props) {
  if (studies.length === 0) return null;

  return (
    <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
      <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-[var(--color-text-strong)]">
        {heading}
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-[var(--color-text-muted)]">{intro}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {studies.map((study) => {
          const image = getWorkStudyImage(study);
          return (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="group surface-card block overflow-hidden rounded-2xl transition hover:border-[var(--color-accent)]/30"
            >
              <div className="relative aspect-[2/1] w-full overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-[var(--color-text-muted)]">{study.label}</p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg text-[var(--color-text-strong)]">
                  {study.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">{study.result}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
