import { data } from "@/lib/data"

const siteUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL || "https://ni3.dev"

export function JsonLd() {
  const p = data.personal_info
  const sections = data.navigation || []

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    givenName: "Nitin",
    familyName: "Kumar",
    jobTitle: p.current_role,
    description: p.headline,
    url: siteUrl,
    image: `${siteUrl}/images/nitin.jpg`,
    email: p.email,
    telephone: p.phone,
    sameAs: [
      p.github,
      p.linkedin,
      p.twitter,
      p.instagram,
      p.stackoverflow,
      p.blog,
      p.hackerrank,
      p.whatsapp,
    ].filter(Boolean),
    knowsAbout: data.about?.interests || [],
    worksFor: {
      "@type": "Organization",
      name: p.current_company,
      location: p.current_location,
    },
    alumniOf: (data.education || []).map((e: { institution: string }) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
    })),
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NI3 — Developer Operating System",
    url: siteUrl,
    description: p.headline,
    author: {
      "@type": "Person",
      name: p.name,
      url: siteUrl,
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: (sections as { id: string; label: string }[]).map((s: { id: string; label: string }, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.label,
      item: `${siteUrl}/#${s.id}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
