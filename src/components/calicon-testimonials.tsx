import {
  HOME_TESTIMONIALS_ID,
  calicapTestimonialsSection,
  getHomeTestimonials,
} from "@/lib/calicap-testimonials";

/**
 * Calicon-theme home testimonials — editorial columns (shared copy with Canvas).
 */
export function CaliconTestimonials() {
  const section = calicapTestimonialsSection;
  const items = getHomeTestimonials();

  return (
    <section
      id={HOME_TESTIMONIALS_ID}
      className="scroll-mt-24 border-t border-[var(--color-border-subtle)]"
      aria-labelledby="calicon-testimonials-heading"
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-700/95">
          {section.eyebrow}
        </p>
        <h2
          id="calicon-testimonials-heading"
          className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl"
        >
          {section.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          {section.intro}
        </p>

        <ul className="mt-14 grid gap-10 border-t border-[var(--color-border-subtle)] pt-12 lg:grid-cols-3 lg:gap-0">
          {items.map((item, i) => (
            <li
              key={item.id}
              className={`min-w-0 ${
                i > 0
                  ? "border-t border-[var(--color-border-subtle)] pt-10 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-8 xl:pl-10"
                  : ""
              }`}
            >
              <blockquote>
                <p className="font-[family-name:var(--font-display)] text-lg font-medium leading-snug tracking-tight text-slate-800 sm:text-xl">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-6">
                  <cite className="not-italic">
                    <span className="block text-sm font-semibold text-slate-900">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-sm text-slate-500">
                      {item.role}
                      <span aria-hidden>{" / "}</span>
                      {item.company}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
