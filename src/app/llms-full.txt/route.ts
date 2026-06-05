import { data } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ni3.dev";

export async function GET() {
  const p = data.personal_info;
  const nav = data.navigation;
  const exp = data.work_experience || [];
  const edu = data.education || [];
  const groups = data.skill_groups || [];
  const projects = data.projects || [];

  const skillsText = groups.length > 0
    ? groups.map((g) => `### ${g.category}\n${g.skills.map((s: string) => `- ${s}`).join("\n")}`).join("\n\n")
    : (data.skills || []).map((s) => `- ${s.name}`).join("\n");

  const text = `# NI3 — Developer Operating System

> ${p.headline}
> ${p.current_role} @ ${p.current_company} | ${p.current_location}

Site URL: ${siteUrl}

## About

${p.name} is a ${p.current_role} at ${p.current_company}, based in ${p.current_location}.
${data.about?.summary || p.headline}

### Roles
${(data.about?.roles || []).map((r: string) => `- ${r}`).join("\n")}

### Interests
${(data.about?.interests || []).map((i: string) => `- ${i}`).join("\n")}

## Navigation

${nav.map((n) => `- [${n.label}](${siteUrl}/#${n.id})`).join("\n")}

## Work Experience

${exp.map((e) => `### ${e.position} @ ${e.company} (${e.duration})
${e.description}
`).join("\n")}

## Education

${edu.map((e) => `### ${e.degree}
${e.institution} — ${e.duration || ""}
${e.description}
`).join("\n")}

## Skills

${skillsText}

## Projects

${projects.map((pr) => `### ${pr.name}
${pr.description}
${pr.url ? `URL: ${pr.url}` : ""}
`).join("\n")}

## Contact

- Email: ${p.email}
- Phone: ${p.phone}
- Location: ${p.current_location}
- GitHub: ${p.github}
- LinkedIn: ${p.linkedin}
- Twitter: ${p.twitter}
- Dev.to: ${p.blog}

---

*Generated from NI3 — Developer Operating System (${siteUrl})*
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
