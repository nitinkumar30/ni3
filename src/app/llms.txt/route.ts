import { portfolioData } from "@/lib/portfolio-data";

export async function GET() {
  const p = portfolioData.personal_info;
  const sections = portfolioData.website_metadata.navigation;

  const text = `# ${p.name} - Portfolio
> ${p.headline}
> ${p.current_role} @ ${p.current_company} | ${p.current_location}

## Sections
${sections.map((s) => `- ${s}`).join("\n")}

## About
${portfolioData.about.summary}

## Skills
${portfolioData.skills.map((s) => `- ${s.name}: ${s.proficiency}`).join("\n")}

## Projects
${portfolioData.projects.map((p) => `- ${p.name}: ${p.description}`).join("\n")}

## Social
- GitHub: ${portfolioData.social_links.github}
- LinkedIn: ${portfolioData.social_links.linkedin}
- Twitter: ${portfolioData.social_links.twitter}
- Instagram: ${portfolioData.social_links.instagram}
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
