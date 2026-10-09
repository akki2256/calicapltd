import { WorkProjectFlipCard } from "@/components/work-project-flip-card";
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
      <div className="work-flip-grid mt-8">
        {studies.map((study) => {
          const image = getWorkStudyImage(study);
          return (
            <WorkProjectFlipCard
              key={study.slug}
              href={`/work/${study.slug}`}
              title={study.title}
              label={study.label}
              description={study.context}
              result={study.result}
              image={image}
              sizes="(max-width: 768px) 100vw, 1400px"
            />
          );
        })}
      </div>
    </section>
  );
}
