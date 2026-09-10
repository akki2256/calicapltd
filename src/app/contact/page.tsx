import Image from "next/image";
import { Clock, Mail, MapPin, PhoneForwarded } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/JsonLd";
import { calicapContact } from "@/lib/calicap-contact";
import { siteImages } from "@/lib/site-images";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const bulletIcons = [Clock, PhoneForwarded, MapPin] as const;

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us about your website or growth goals—we respond with fit, timeline, and next steps.",
  path: "/contact",
});

export default function ContactPage() {
  const page = calicapContact.page;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
            <Mail className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
            {page.eyebrow}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900">
            {page.title}
          </h1>
          <p className="mt-6 text-slate-600 leading-relaxed">{page.intro}</p>
          <ul className="mt-8 space-y-3 text-sm text-slate-500">
            {page.bullets.map((text, index) => {
              const Icon = bulletIcons[index] ?? Clock;
              return (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
                  <span>{text}</span>
                </li>
              );
            })}
          </ul>
          <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/80 lg:block">
            <Image
              src={siteImages.modernOffice.src}
              alt={siteImages.modernOffice.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1152px) 100vw, 480px"
            />
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
