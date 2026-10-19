import type { Metadata, Viewport } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import { Providers } from "@/components/providers";
import { textRulesScript } from "@/lib/text-overrides";
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
  // Only a few labels use it; let it load when needed instead of on every page
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    site.name,
    "team chat",
    "workplace messaging",
    "collaboration software",
    "AI agents",
    "channels",
    "huddles",
    "video meetings",
    "workflow automation",
    "project management",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "business",
  // Pages and the admin narrow this where needed (noindex)
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: { capable: true, title: site.name, statusBarStyle: "default" },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
    url: site.url,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", site: site.twitter, creator: site.twitter },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#051121" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Admin text changes, so client components render the same wording as the server
  const textRules = textRulesScript();
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {textRules && <script dangerouslySetInnerHTML={{ __html: textRules }} />}
      </head>
      <body className="flex min-h-dvh flex-col">
        {/* Public pages add the site header and footer in app/(site)/layout.tsx; the admin has its own chrome */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
