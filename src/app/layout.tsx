import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Calicap · Websites & digital growth",
    template: "%s · Calicap",
  },
  description:
    "Web and mobile delivery with React, Node.js, Spring, and AI integrations; native iOS and Android or React Native; cloud on AWS and Azure—plus digital marketing that compounds.",
  openGraph: {
    title: "Calicap · Websites & digital growth",
    description:
      "Web and mobile with React, Node.js, Spring, AI, and cloud on AWS or Azure—plus growth marketing.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calicap · Websites & digital growth",
    description:
      "React, Node.js, Spring, mobile native & React Native, AWS/Azure—plus growth marketing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="min-h-dvh antialiased">
        <div className="noise-overlay" aria-hidden />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
