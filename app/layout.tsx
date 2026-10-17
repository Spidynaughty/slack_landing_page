import type { Metadata, Viewport } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import { Providers } from "@/components/providers";
import { themeScript } from "@/lib/theme";
import { site } from "@/lib/site";
import "./globals.css";

/** Google Sans for headings and body text alike; Google Sans Code for code. */
const sans = Google_Sans({
  variable: "--font-sans-family",
  subsets: ["latin"],
  display: "swap",
  // next/font has no fallback metrics for Google Sans; globals.css lists the fallbacks
  adjustFontFallback: false,
});

const mono = Google_Sans_Code({
  variable: "--font-mono-family",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
    url: site.url,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", creator: site.twitter },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#051121" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        {/* Public pages add the site header and footer in app/(site)/layout.tsx; the admin has its own chrome */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
