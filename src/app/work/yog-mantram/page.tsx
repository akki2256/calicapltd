import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileText,
  Flower2,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Search,
  Smartphone,
  Target,
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { JsonLd } from "@/components/JsonLd";
import { getWorkStudyBySlug, getWorkStudyImage } from "@/lib/calicap-work";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, creativeWorkJsonLd } from "@/lib/structured-data";

const study = getWorkStudyBySlug("yog-mantram")!;
const studyImage = getWorkStudyImage(study);
const liveUrl = "https://yogmantram.com";

export const metadata = pageMetadata({
  title: study.metaTitle,
  description: study.metaDescription,
  path: `/work/${study.slug}`,
  imagePath: studyImage.src,
});

const shipped = [
  {
    value: "25+",
    label: "Program pages",
    icon: LayoutGrid,
  },
  {
    value: "Local",
    label: "Bareilly search pages",
    icon: MapPin,
  },
  {
    value: "1 tap",
    label: "Enquire / WhatsApp",
    icon: MessageCircle,
  },
] as const;

const capabilities = [
  {
    t: "A home that sells the practice",
    d: "A full-bleed video hero and a clear next step—Start Your Journey, Explore Programs, Book a Trial, or WhatsApp—so visitors choose instead of wandering.",
    icon: Target,
  },
  {
    t: "A URL for every class",
    d: "Twenty-five-plus program pages across five offering lines. Each one says who it is for, what a session includes, and what to do next.",
    icon: LayoutGrid,
  },
  {
    t: "Bareilly, on purpose",
    d: "A dedicated city landing page and search-intent titles built for people looking for yoga, meditation, kids classes, corporate wellness, and teacher training in Bareilly—not generic yoga copy.",
    icon: Search,
  },
  {
    t: "Enquire without a dead end",
    d: "Trial, contact, and WhatsApp sit on every program. Memberships and professional training are priced in the open, so “interested” has a next step.",
    icon: MessageCircle,
  },
  {
    t: "Built for a phone in one hand",
    d: "Mobile-first layout, instructor profiles, policies, schema, sitemap, and Open Graph—so the studio looks considered in search, shares, and on a small screen.",
    icon: Smartphone,
  },
] as const;

const delivered = [
  "Next.js marketing site",
  "Cinematic video hero",
  "25+ program pages",
  "Memberships & training",
  "Bareilly landing page",
  "Trial / enquire / WhatsApp",
  "Local SEO & schema",
  "Educational yoga hub",
  "Instructor profiles",
  "Mobile-first UI",
] as const;

export default function YogMantramCasePage() {
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
          src={studyImage.src}
          alt={studyImage.alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 720px"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent"
          aria-hidden
        />
        <p className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-slate-950/55 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
          Site captures to follow
        </p>
      </div>

      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
        <Flower2 className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
        Web · brand · local SEO
      </p>

      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
        Yog Mantram
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-slate-600">
        From neighbourhood studio to the yoga destination Bareilly searches for.
      </p>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="surface-card rounded-2xl p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Engagement
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-800">
            Brand, web, local SEO
          </dd>
        </div>
        <div className="surface-card rounded-2xl p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Scope
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-800">
            Studio marketing site
          </dd>
        </div>
        <div className="surface-card rounded-2xl p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Live
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-800">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gold-600 hover:text-gold-700"
            >
              yogmantram.com
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </a>
          </dd>
        </div>
      </dl>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {shipped.map(({ value, label, icon: Icon }) => (
          <div key={label} className="surface-card rounded-2xl p-5 text-center sm:text-left">
            <Icon className="mx-auto h-5 w-5 text-gold-600 sm:mx-0" strokeWidth={2} aria-hidden />
            <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900">
              {value}
            </p>
            <p className="mt-1 text-sm text-slate-600">{label}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Challenge
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Yog Mantram is a boutique yoga and wellness studio in Rampur Garden,
        Bareilly. Students already knew the mats. Google, WhatsApp, and
        first-time visitors did not.
      </p>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        The practice was serious—traditional asana, power yoga, kids, corporate
        wellness, teacher training, retreats—but the studio still lived on word
        of mouth. They needed a site that felt as considered as the room, and
        that could actually bring people through the door. A pretty yoga template
        would not hold that.
      </p>
      <ul className="mt-6 space-y-3 text-slate-600">
        <li className="flex gap-2 leading-relaxed">
          <Search className="mt-1 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
          <span>
            Searchers looking for yoga in Bareilly had no local, program-level
            page to land on.
          </span>
        </li>
        <li className="flex gap-2 leading-relaxed">
          <LayoutGrid className="mt-1 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
          <span>
            Offerings were many; the next step was not. Visitors could not tell
            which class was theirs or how to enquire.
          </span>
        </li>
        <li className="flex gap-2 leading-relaxed">
          <Smartphone className="mt-1 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
          <span>
            Most first visits happen on a phone. The studio needed a digital
            front desk—not a brochure that only works on a laptop.
          </span>
        </li>
      </ul>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Solution
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        We designed and built yogmantram.com as that front desk: a premium Next.js
        site with a cinematic hero, program-by-program conversion, and enquire
        paths that go straight to the studio.
      </p>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Educational “Know About Yoga” pages support search without turning the
        team into a blog. Under the calm surface: local business schema, sitemap,
        Open Graph, policies, and instructor profiles. Leads go to the studio.
        No clutter. No dead ends.
      </p>
      <ul className="mt-6 space-y-4 text-slate-600">
        {capabilities.map(({ t, d, icon: Icon }) => (
          <li key={t} className="flex gap-3 leading-relaxed">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)]">
              <Icon className="h-4 w-4 text-gold-700" strokeWidth={2} aria-hidden />
            </span>
            <span>
              <span className="font-medium text-slate-800">{t}.</span> {d}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        What we delivered
      </h2>
      <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {delivered.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)]/50 px-3 py-2 text-sm text-slate-700"
          >
            <span
              className="h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-base leading-relaxed text-slate-600">
        One site, built to fill classes as the studio grows.
      </p>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Before / after
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="surface-card rounded-2xl p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Before
          </p>
          <p className="mt-2 text-sm font-medium text-slate-800">Word of mouth</p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
            <li>Studio known by students, not by search</li>
            <li>Programs without a public URL</li>
            <li>Enquire meant “ask a friend”</li>
            <li>No digital front desk on mobile</li>
          </ul>
        </div>
        <div className="surface-card rounded-2xl p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-700/90">
            After
          </p>
          <p className="mt-2 text-sm font-medium text-slate-800">A site that books</p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
            <li>Local pages for Bareilly intent</li>
            <li>Every class has a findable page</li>
            <li>Trial, enquire, WhatsApp on the journey</li>
            <li>Thumbs-first layout, conversion underneath</li>
          </ul>
        </div>
      </div>

      <h2 className="mt-14 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-slate-900">
        Product snapshots
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Live site captures will sit here. Until then, the studio is live at{" "}
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-gold-600 hover:text-gold-700"
        >
          yogmantram.com
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        </a>
        .
      </p>

      <p className="mt-14 text-base leading-relaxed text-slate-600">
        The studio that used to live on word of mouth now has a search-ready
        front desk: clear programs, a path from “yoga in Bareilly” to a
        conversation with the team, and a brand that looks as considered as the
        practice. Enquiry numbers stay off this page until they are real.
      </p>

      <div className="mt-12 flex flex-wrap gap-4">
        <ProblemCtaButton>
          <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          {study.ctaLabel}
        </ProblemCtaButton>
        <ButtonLink href={liveUrl} target="_blank" rel="noopener noreferrer" variant="ghost">
          <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          View live site
        </ButtonLink>
        <ButtonLink href="/work" variant="ghost">
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          More case studies
        </ButtonLink>
      </div>
    </article>
  );
}
