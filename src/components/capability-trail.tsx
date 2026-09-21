import Link from "next/link";
import { getPillar, getService, type PillarId } from "@/lib/brand-architecture";

type Props = {
  pillarIds: readonly PillarId[];
  serviceIds: readonly string[];
};

/** Problem → capability trail on case studies — existing labels, no extra chrome */
export function CapabilityTrail({ pillarIds, serviceIds }: Props) {
  const pillars = pillarIds.map((id) => getPillar(id));
  const services = serviceIds
    .map((id) => getService(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (pillars.length === 0 && services.length === 0) return null;

  return (
    <nav className="mt-14 border-t border-[var(--color-border-subtle)] pt-10" aria-label="Related capabilities">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
        Capabilities used
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {pillars.map((pillar) => (
          <li key={pillar.id}>
            <Link
              href={pillar.href}
              className="text-sm text-[var(--color-link)] transition hover:text-[var(--color-link-hover)]"
            >
              {pillar.label}
            </Link>
          </li>
        ))}
        {services.map((service) => {
          const href = service.hrefs?.[0] ?? `/${service.pillar}`;
          return (
            <li key={service.id}>
              <Link
                href={href}
                className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text-strong)]"
              >
                {service.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
