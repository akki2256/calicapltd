import type { Metadata } from "next";
<<<<<<< HEAD
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
=======
import { DM_Sans, Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/themes";
>>>>>>> 4c896421623002b20fad236becc872417032659e

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

<<<<<<< HEAD
=======
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var lk="calicap-theme";var d=${JSON.stringify(DEFAULT_THEME)};var t=localStorage.getItem(k);if(!t){var legacy=localStorage.getItem(lk);if(legacy==="calicap"){t="calicon";localStorage.setItem(k,t);localStorage.removeItem(lk)}else if(legacy==="canvas"||legacy==="calicon"){t=legacy;localStorage.setItem(k,t);localStorage.removeItem(lk)}}document.documentElement.setAttribute("data-theme",t==="canvas"||t==="calicon"?t:d)}catch(e){document.documentElement.setAttribute("data-theme",${JSON.stringify(DEFAULT_THEME)})}})();`;

>>>>>>> 4c896421623002b20fad236becc872417032659e
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Calicon · Websites & digital growth",
    template: "%s · Calicon",
  },
  description:
    "Web and mobile delivery with React, Node.js, Spring, and AI integrations; native iOS and Android or React Native; cloud on AWS and Azure—plus digital marketing that compounds.",
  openGraph: {
    title: "Calicon · Websites & digital growth",
    description:
      "Web and mobile with React, Node.js, Spring, AI, and cloud on AWS or Azure—plus growth marketing.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calicon · Websites & digital growth",
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
<<<<<<< HEAD
    <html lang="en-GB" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="min-h-dvh antialiased">
        <div className="noise-overlay" aria-hidden />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
=======
    <html
      lang="en-GB"
      className={`${dmSans.variable} ${fraunces.variable} ${outfit.variable}`}
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh antialiased">
        <ThemeProvider>
          <div className="calicon-noise noise-overlay" aria-hidden />
          <div className="relative z-10 flex min-h-dvh flex-col">
            <SiteShell>{children}</SiteShell>
          </div>
        </ThemeProvider>
>>>>>>> 4c896421623002b20fad236becc872417032659e
      </body>
    </html>
  );
}
