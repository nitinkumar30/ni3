import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ni3.dev";

const sections = [
  { url: "/", priority: 1, changeFrequency: "monthly" as const },
  { url: "/#hero", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/#playground", priority: 0.7, changeFrequency: "weekly" as const },
  { url: "/#about", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/#experience", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/#education", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/#skills", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/#certifications", priority: 0.6, changeFrequency: "monthly" as const },
  { url: "/#projects", priority: 0.9, changeFrequency: "weekly" as const },
  { url: "/#github", priority: 0.7, changeFrequency: "weekly" as const },
  { url: "/#ai-lab", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/#blog", priority: 0.9, changeFrequency: "weekly" as const },
  { url: "/#testimonials", priority: 0.6, changeFrequency: "monthly" as const },
  { url: "/#recommendations", priority: 0.6, changeFrequency: "monthly" as const },
  { url: "/#achievements", priority: 0.6, changeFrequency: "monthly" as const },
  { url: "/#contact", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return sections.map((s) => ({
    url: `${siteUrl}${s.url}`,
    lastModified: new Date(),
    changeFrequency: s.changeFrequency,
    priority: s.priority,
  }));
}
