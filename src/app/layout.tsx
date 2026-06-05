import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { JsonLd } from "@/components/json-ld";
import { Analytics } from "@vercel/analytics/next";
import { ThemeInit } from "@/components/theme-init";
import { LoadingScreen } from "@/components/loading-screen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ni3.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NI3 — Developer Operating System | Nitin Kumar",
    template: "%s | NI3 — Developer Operating System",
  },
  description:
    "Futuristic portfolio of Nitin Kumar — Senior Automation Engineer at Happiest Minds Technologies. Python, automation, AI, cybersecurity, and 3D interactive experiences.",
  keywords: [
    "Nitin Kumar",
    "Python Developer",
    "Automation Engineer",
    "Cyber Security",
    "Data Science",
    "Senior Automation Engineer",
    "Happiest Minds",
    "Portfolio",
    "Developer OS",
  ],
  authors: [{ name: "Nitin S Kumar", url: siteUrl }],
  creator: "Nitin S Kumar",
  publisher: "Nitin S Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NI3 — Developer Operating System",
    title: "NI3 — Developer Operating System | Nitin Kumar",
    description:
      "Futuristic portfolio of Nitin Kumar — Senior Automation Engineer navigating through a digital universe. Python, AI, automation, cybersecurity, and 3D interactive experiences.",
    url: siteUrl,
    images: [
      {
        url: "/images/nitin.jpg",
        width: 400,
        height: 400,
        alt: "Nitin Kumar — Senior Automation Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NI3 — Developer Operating System | Nitin Kumar",
    description:
      "Futuristic portfolio of Nitin Kumar — Senior Automation Engineer navigating through a digital universe.",
    creator: "@nitinkumar30",
    images: ["/images/nitin.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification: "Portfolio",
  other: {
    "color-scheme": "dark",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="alternate" type="application/atom+xml" title="NI3 — Articles by Nitin Kumar" href="/feed.xml" />
        <link rel="alternate" type="text/markdown" title="NI3 — LLMs.txt" href="/llms.txt" />
        <meta name="theme-color" content="#050816" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <JsonLd />
      </head>
      <body className="min-h-screen text-white" style={{ background: "var(--background)" }}>
        <a
          href="#main-content"
          className="fixed -top-40 left-4 z-[100] p-3 bg-[#00E5FF] text-[#050816] font-medium rounded-b-lg transition-all duration-300 focus:top-0 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
        >
          Skip to main content
        </a>
        <LoadingScreen />
        <Providers>
          <ThemeInit />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
