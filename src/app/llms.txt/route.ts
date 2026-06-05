import { data } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ni3.dev";

export async function GET() {
  const p = data.personal_info;
  const nav = data.navigation;

  const skills = data.skill_groups?.flatMap((g) => g.skills.map((s: string) => s)) || data.skills?.map((s) => s.name) || [];
  const projects = data.projects?.slice(0, 6) || [];

  const text = `# NI3 — Developer Operating System
> ${p.headline}
> ${p.current_role} @ ${p.current_company} | ${p.current_location}

Site URL: ${siteUrl}

## About
${p.name} is a ${p.current_role} at ${p.current_company}. ${p.headline}

## Navigation
${nav.map((n) => `- [${n.label}](${siteUrl}/#${n.id})`).join("\n")}

## Skills
${skills.map((s) => `- ${s}`).join("\n")}

## Key Projects
${projects.map((pr) => `- [${pr.name}](${pr.url || siteUrl}): ${pr.description}`).join("\n")}

## Social
- GitHub: ${p.github}
- LinkedIn: ${p.linkedin}
- Twitter: ${p.twitter}
- Dev.to: ${p.blog}
- Stack Overflow: ${p.stackoverflow}

## Contact
- Email: ${p.email}
- Location: ${p.current_location}
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
