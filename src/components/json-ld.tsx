"use client"

import { data } from "@/lib/data"

const siteUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL || "https://nitinkumar.dev"

export function JsonLd() {
  const p = data.personal_info

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    givenName: "Nitin",
    familyName: "Kumar",
    jobTitle: p.current_role,
    description: p.headline,
    url: siteUrl,
    sameAs: [
      p.github,
      p.linkedin,
      p.twitter,
      p.instagram,
      p.stackoverflow,
      p.devto,
    ],
    knowsAbout: data.about.interests,
    worksFor: {
      "@type": "Organization",
      name: p.current_company,
      location: p.current_location,
    },
    alumniOf: data.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
