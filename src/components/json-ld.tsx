"use client";

import { portfolioData } from "@/lib/portfolio-data";

const siteUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL || "https://nitinkumar.dev";

export function JsonLd() {
  const p = portfolioData.personal_info;

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
      portfolioData.social_links.github,
      portfolioData.social_links.linkedin,
      portfolioData.social_links.twitter,
      portfolioData.social_links.instagram,
    ],
    knowsAbout: portfolioData.about.interests,
    worksFor: {
      "@type": "Organization",
      name: p.current_company,
      location: p.current_location,
    },
    alumniOf: portfolioData.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
