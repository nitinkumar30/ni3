import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { JsonLd } from "@/components/json-ld";
import { Analytics } from "@vercel/analytics/react";
import { ThemeInit } from "@/components/theme-init";
import { LoadingScreen } from "@/components/loading-screen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nitinkumar.dev"),
  title: "Nitin Kumar | Python Developer & Automation Engineer",
  description:
    "A passionate Python Developer with interest in Automation and Data Science along with good knowledge of Ethical Hacking. Senior Automation Engineer at Happiest Minds Technologies.",
  keywords: [
    "Nitin Kumar",
    "Python Developer",
    "Automation Engineer",
    "Cyber Security",
    "Data Science",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Nitin Kumar" }],
  openGraph: {
    title: "Nitin Kumar | Python Developer & Automation Engineer",
    description:
      "A passionate Python Developer with interest in Automation and Data Science along with good knowledge of Ethical Hacking.",
    type: "website",
    locale: "en_US",
    siteName: "Nitin Kumar Portfolio",
    images: [
      {
        url: "/images/nitin.jpg",
        width: 400,
        height: 400,
        alt: "Nitin Kumar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitin Kumar | Python Developer & Automation Engineer",
    description:
      "A passionate Python Developer with interest in Automation and Data Science.",
    creator: "@nitinkumar30",
    images: ["/images/nitin.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
          <link rel="icon" href="/images/favicon-1.png" />
          <link rel="apple-touch-icon" href="/images/favicon-1.png" />
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
