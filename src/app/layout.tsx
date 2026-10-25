import type { Metadata, Viewport } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/site-shell";
import { Analytics } from "@/components/analytics";
import { rootMetadata } from "@/lib/seo";
import {
  localBusinessJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${outfit.variable} ${syne.variable}`}
      data-theme="canvas"
      suppressHydrationWarning
    >
      <head>
        <JsonLd
          data={[organizationJsonLd(), localBusinessJsonLd(), websiteJsonLd()]}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <Analytics />
        <div className="site-noise noise-overlay" aria-hidden />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <SiteShell>{children}</SiteShell>
        </div>
      </body>
    </html>
  );
}
