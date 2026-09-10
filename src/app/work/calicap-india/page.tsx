import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Clock3,
  FileText,
  Gauge,
  PhoneForwarded,
  Shield,
  Target,
  TrendingUp,
  UsersRound,
  Workflow,
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { JsonLd } from "@/components/JsonLd";
import { getWorkStudyBySlug, getWorkStudyImage } from "@/lib/calicap-work";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, creativeWorkJsonLd } from "@/lib/structured-data";

const study = getWorkStudyBySlug("calicap-india")!;
const studyImage = getWorkStudyImage(study);

export const metadata = pageMetadata({
  title: study.metaTitle,
  description: study.metaDescription,
  path: `/work/${study.slug}`,
  imagePath: studyImage.src,
});

const snapshots = [
  {
    src: "/images/case-studies/crm-dashboard.png",
    alt: "CRM analytics dashboard with sensitive values redacted",
    caption: "Live operations dashboard — performance, sources, and win rate at a glance",
    label: "01 · Dashboard",
  },
  {
    src: "/images/case-studies/crm-deals.png",
    alt: "Deals pipeline board with customer and amount details redacted",
    caption: "Pipeline board — clear ownership, stage visibility, and follow-through",
    label: "02 · Deals",
  },
  {
    src: "/images/case-studies/crm-workflow.png",
    alt: "Lead import workflow screen with emails and names redacted",
    caption: "Automated lead intake — Google Sheet sync into the CRM without manual re-entry",
    label: "03 · Workflow",
  },
] as const;

export default function CalicapIndiaCasePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: study.title, path: `/work/${study.slug}` },
          ]),
          creativeWorkJsonLd({
            name: study.title,
            description: study.metaDescription,
            path: `/work/${study.slug}`,
            imagePath: studyImage.src,
          }),
        ]}
      />
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-700/90 hover:text-gold-600"
      >
        <ArrowLeft className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
        <FileText className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
        Work
      </Link>

      <div className="relative mb-10 mt-8 aspect-[2.2/1] w-full max-h-56 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80 sm:max-h-64">
        <Image
          src="/images/case-studies/crm-dashboard.png"
          alt="Calicap India CRM dashboard preview with sensitive data redacted"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 720px"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent"
          aria-hidden
        />
        <p className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-slate-950/55 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
          <Shield className="h-3 w-3" strokeWidth={2} aria-hidden />
          Sensitive details redacted
        </p>
      </div>

      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
        <Building2 className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
        Product · CRM · ops
      </p>

      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
        Calicap India Pvt. Ltd.
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-slate-600">
        A process-fit CRM that turned scattered follow-ups into a system the team
        could run—and customers could feel.
      </p>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Challenge
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Calicap India was losing customers they should have kept—and burning
        team hours they could not afford to waste. Without a data system shaped
        around their real process, retention depended on memory and spreadsheets.
        Work bounced between people without clear ownership, so effort went into
        chasing status instead of closing the next conversation.
      </p>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        The brief was not “another CRM.” It was an operating layer that matched
        how the business already worked—delegation, follow-ups, and customer
        timing—without a six-month implementation tax.
      </p>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Approach
      </h2>
      <ul className="mt-4 space-y-3 text-slate-600">
        <li className="flex gap-2 leading-relaxed">
          <Target className="mt-1 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
          <span>
            Mapped the live sales and servicing flow first—then modelled the
            product around stages, owners, and handoffs the team already used.
          </span>
        </li>
        <li className="flex gap-2 leading-relaxed">
          <UsersRound className="mt-1 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
          <span>
            Built role-aware work queues so leads and deals land with the right
            person, with visible ownership instead of informal delegation.
          </span>
        </li>
        <li className="flex gap-2 leading-relaxed">
          <Workflow className="mt-1 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
          <span>
            Automated inbound lead capture and customer communication triggers so
            high-intent contacts get a timely response—without manual re-entry.
          </span>
        </li>
      </ul>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Product snapshots
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Interface captures from the live system. Names, emails, amounts, and
        partner labels are redacted for privacy.
      </p>

      <div className="mt-8 space-y-8">
        {snapshots.map((shot) => (
          <figure key={shot.src} className="group">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              {shot.label}
            </p>
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-slate-200/80 shadow-lg">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={1024}
                height={474}
                className="h-auto w-full object-cover object-top"
                sizes="(max-width: 768px) 100vw, 720px"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent opacity-80"
                aria-hidden
              />
            </div>
            <figcaption className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-slate-600">
              <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Outcomes
      </h2>
      <ul className="mt-4 space-y-3 text-slate-600">
        <li className="flex gap-2 leading-relaxed">
          <Clock3 className="mt-1 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
          <span>
            <strong className="font-medium text-slate-800">Shipped in 60 days</strong>
            —a production CRM the team could run without a long change programme.
          </span>
        </li>
        <li className="flex gap-2 leading-relaxed">
          <Gauge className="mt-1 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
          <span>
            <strong className="font-medium text-slate-800">23% lower operational cost</strong>
            {" "}
            from clearer delegation and less time spent rediscovering work status.
          </span>
        </li>
        <li className="flex gap-2 leading-relaxed">
          <TrendingUp className="mt-1 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
          <span>
            <strong className="font-medium text-slate-800">37% higher average sales</strong>
            {" "}
            through smarter customer identification and automated follow-up that
            kept warm opportunities moving.
          </span>
        </li>
      </ul>

      <blockquote className="mt-8 border-l-2 border-gold-400 pl-4 text-slate-600 italic">
        Retention improved when the system could see who needed attention—and the
        team spent their hours on conversations, not coordination.
      </blockquote>

      <div className="mt-12 flex flex-wrap gap-4">
        <ButtonLink href="/contact">
          <PhoneForwarded className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Start a similar project
        </ButtonLink>
        <ButtonLink href="/work" variant="ghost">
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          More case studies
        </ButtonLink>
      </div>
    </article>
  );
}
