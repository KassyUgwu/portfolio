import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/content";
import { defaultOgImage, githubUrl, indexRobots } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: githubUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [...site.keywords],
  robots: indexRobots,
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    site: site.twitterHandle,
    creator: site.twitterHandle,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F0E6" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1e26" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
