import { data } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ni3.dev";

const articles: { title: string; url: string; published: string; reactions: number; comments: number }[] =
  (data as any).articles || [];

export async function GET() {
  const items = articles.map(
    (a) => `  <entry>
    <title>${escapeXml(a.title)}</title>
    <link href="${escapeXml(a.url)}" />
    <published>${new Date(a.published).toISOString()}</published>
    <updated>${new Date(a.published).toISOString()}</updated>
    <id>${escapeXml(a.url)}</id>
    <summary>${escapeXml(a.title)} — ${a.reactions} reactions, ${a.comments} comments</summary>
  </entry>`
  ).join("\n");

  const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>NI3 — Articles by Nitin Kumar</title>
  <subtitle>Latest articles on Python, automation, cybersecurity, and AI</subtitle>
  <link href="${siteUrl}/feed.xml" rel="self" />
  <link href="${siteUrl}" />
  <updated>${new Date().toISOString()}</updated>
  <id>${siteUrl}/</id>
  <author>
    <name>Nitin Kumar</name>
    <uri>${siteUrl}</uri>
  </author>
${items}
</feed>`;

  return new Response(feed, {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
