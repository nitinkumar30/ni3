import type { Metadata } from "next"
import { Shield, ChevronRight } from "lucide-react"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ni3.dev"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for NI3 — Developer Operating System by Nitin Kumar.",
  robots: { index: false, follow: false },
}

const sections = [
  {
    title: "Information We Collect",
    content: [
      "We collect minimal information to operate and improve this portfolio site:",
      "Page views and interaction data via Vercel Analytics (anonymized, no personal data stored)",
      "GitHub profile data fetched from the public GitHub API when you interact with the GitHub dashboard section",
      "Any information you voluntarily submit via the contact form (name, email, message)",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "To display relevant portfolio content and GitHub statistics",
      "To respond to inquiries submitted via the contact form",
      "To analyze anonymous usage patterns for site improvement",
      "We do not sell, trade, or share your personal information with third parties",
    ],
  },
  {
    title: "Cookies & Tracking",
    content: [
      "This site uses Vercel Analytics, which may set cookies for analytics purposes. These cookies are anonymized and do not contain personally identifiable information.",
      "No advertising cookies, tracking pixels, or third-party marketing scripts are used.",
      "You can disable analytics tracking by using browser privacy features or ad-blockers.",
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      "Vercel — hosting and analytics (privacy policy: vercel.com/legal/privacy)",
      "GitHub — public profile and repository data (privacy policy: docs.github.com/privacy)",
      "dev.to — public article data displayed in the blog section (privacy policy: dev.to/privacy)",
    ],
  },
  {
    title: "Data Retention",
    content: [
      "Contact form submissions are retained only as long as necessary to respond to your inquiry.",
      "Analytics data is retained by Vercel in accordance with their data retention policy.",
      "You may request deletion of any data by contacting us at the email below.",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data.",
      "You may opt out of analytics tracking at any time.",
      "To exercise these rights, please contact us using the information below.",
    ],
  },
  {
    title: "Contact",
    content: [
      "If you have questions about this privacy policy, please reach out via the contact form on this site or email the address listed there.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-5 h-5 text-[#00E5FF]" />
          <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">Privacy Policy</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          <span className="text-gradient">Privacy Policy</span>
        </h1>

        <p className="text-white/40 text-sm mb-2">
          Last updated: June 6, 2026
        </p>

        <p className="text-white/60 text-sm mb-12 leading-relaxed">
          This privacy policy explains how NI3 (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects your information when you visit {siteUrl}.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#00E5FF]" />
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.content.map((text, i) => (
                  <p key={i} className="text-white/50 text-sm leading-relaxed">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
