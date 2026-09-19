import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces, Outfit, Syne } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/site-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/themes";
import { rootMetadata } from "@/lib/seo";
import {
  localBusinessJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";

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

const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var lk="calicap-theme";var d=${JSON.stringify(DEFAULT_THEME)};var t=localStorage.getItem(k);if(!t){var legacy=localStorage.getItem(lk);if(legacy==="calicap"){t="calicon";localStorage.setItem(k,t);localStorage.removeItem(lk)}else if(legacy==="canvas"||legacy==="calicon"){t=legacy;localStorage.setItem(k,t);localStorage.removeItem(lk)}}document.documentElement.setAttribute("data-theme",t==="canvas"||t==="calicon"?t:d)}catch(e){document.documentElement.setAttribute("data-theme",${JSON.stringify(DEFAULT_THEME)})}})();`;

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
      className={`${dmSans.variable} ${fraunces.variable} ${outfit.variable} ${syne.variable}`}
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd
          data={[organizationJsonLd(), localBusinessJsonLd(), websiteJsonLd()]}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <ThemeProvider>
          <div className="calicon-noise noise-overlay" aria-hidden />
          <div className="relative z-10 flex min-h-dvh flex-col">
            <SiteShell>{children}</SiteShell>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
