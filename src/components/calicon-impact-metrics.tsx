import {
  HOME_IMPACT_ID,
  calicapHomeImpact,
} from "@/lib/calicap-home";

/**
 * Calicon-theme impact / results — premium editorial columns (not Canvas cinematic).
 */
export function CaliconImpactMetrics() {
  const impact = calicapHomeImpact;

  return (
    <section
      id={HOME_IMPACT_ID}
      className="scroll-mt-24 border-t border-[var(--color-border-subtle)]"
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700/90">
          {impact.eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
          {impact.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          {impact.body}
        </p>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
          {impact.attribution}
        </p>

        <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-[var(--color-border-subtle)] pt-12 lg:grid-cols-4 lg:gap-y-0">
          {impact.metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`min-w-0 ${
                i > 0
                  ? "lg:border-l lg:border-[var(--color-border-subtle)] lg:pl-8 xl:pl-10"
                  : ""
              }`}
            >
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <p className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.5rem)] font-medium leading-none tracking-tight text-slate-900">
                  <span className="text-gradient tabular-nums">{metric.value}</span>
                </p>
                <p className="mt-4 max-w-[14rem] text-sm font-medium leading-snug text-slate-800">
                  {metric.label}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
