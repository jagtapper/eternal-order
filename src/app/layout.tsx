import type { Metadata, Viewport } from "next";
import { Eczar, Geist_Mono, Inknut_Antiqua, Noto_Serif_Devanagari } from "next/font/google";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { ScrollWheel } from "@/components/motion/ScrollWheel";
import { site } from "@/lib/site";
import "./globals.css";

const display = Inknut_Antiqua({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inknut",
  display: "swap",
});

const sans = Eczar({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-eczar",
  display: "swap",
});

const deva = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600"],
  variable: "--font-deva",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0b0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${deva.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink font-sans text-ivory">
        <div className="grain" aria-hidden="true" />
        <div className="sutra hidden md:block" aria-hidden="true" />
        <ScrollWheel />
        <Nav />
        <MotionRoot />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: site.name,
              url: site.url,
              description: site.description,
            }),
          }}
        />
        <main className="relative z-[1] flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
