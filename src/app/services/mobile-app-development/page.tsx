import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Monitor,
  PhoneForwarded,
  Smartphone,
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { calicapMobileAppService } from "@/lib/calicap-services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: calicapMobileAppService.metaTitle,
  description: calicapMobileAppService.metaDescription,
  path: calicapMobileAppService.path,
});

export default function MobileAppDevelopmentPage() {
  const service = calicapMobileAppService;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <Link
        href="/build"
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-700/90 hover:text-gold-600"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        Build
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
            <Smartphone className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
            {service.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">{service.body}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/contact">
              <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {service.cta}
            </ButtonLink>
            <ButtonLink href={service.siblingHref} variant="ghost">
              <Monitor className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              {service.siblingLabel}
            </ButtonLink>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-slate-900">
          What we can help with
        </h2>
        <div className="mt-8 space-y-8">
          {service.offerings.map((o) => {
            const Icon = o.icon;
            return (
              <div key={o.title} className="surface-card rounded-2xl p-8 md:p-10">
                <h3 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl text-slate-900">
                  <Icon className="h-6 w-6 text-gold-600" strokeWidth={1.75} aria-hidden />
                  {o.title}
                </h3>
                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-600">
                  {o.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-gold-600"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-slate-900">
          Typical use cases
        </h2>
        <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-600">
          {service.useCases.map((u) => (
            <li key={u} className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
              <span>{u}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-14 text-sm text-slate-600">
        {service.footerPrompt}{" "}
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 font-semibold text-gold-600 hover:text-gold-700"
        >
          {service.footerCta}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        </Link>
        .
      </p>
    </div>
  );
}
