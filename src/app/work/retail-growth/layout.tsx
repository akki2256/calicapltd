import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Retail brand lift",
  description:
    "Case study: retail brand organic lift with technical SEO and a rebuilt story-led experience.",
};

export default function RetailCaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
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
          src={siteImages.retailStore.src}
          alt={siteImages.retailStore.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 to-transparent" aria-hidden />
      </div>
      {children}
    </div>
  );
}
