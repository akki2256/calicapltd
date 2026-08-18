import Link from "next/link";
import {
  Briefcase,
  CircleUser,
  FolderKanban,
  LayoutGrid,
  Monitor,
  Shield,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

const footerLinks: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/about", label: "About", icon: CircleUser },
  { href: "/services", label: "Services", icon: Briefcase },
  {
    href: "/services/web-app-development",
    label: "Web app development",
    icon: Monitor,
  },
  {
    href: "/services/mobile-app-development",
    label: "Mobile app development",
    icon: Smartphone,
  },
  { href: "/work", label: "Work", icon: FolderKanban },
  { href: "/privacy", label: "Privacy", icon: Shield },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-slate-300/50">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-xl text-slate-900">
              <LayoutGrid
                className="h-5 w-5 text-gold-600"
                strokeWidth={2}
                aria-hidden
              />
              Calicon
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
              Websites and digital marketing with a modern stack—React, Node.js,
              Spring, mobile native and React Native, AI where it earns its keep,
              and cloud on AWS or Azure.
            </p>
          </div>
          <nav className="flex max-w-xl flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
            {footerLinks.map((l) => {
              const Icon = l.icon;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-600 transition hover:text-slate-900"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <p className="mt-10 text-xs text-slate-500">
          © {new Date().getFullYear()} Calicon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
