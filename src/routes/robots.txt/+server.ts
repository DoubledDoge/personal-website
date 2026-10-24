import { site } from "#lib/site.ts";

export const prerender = true;

export function GET(): Response {
	const robotsTxt: string = `
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /*.json$
Disallow: /*?*utm_source=

# Bad bots
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Claude-User
Disallow: /

# Good bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Crawl-delay: 10

Sitemap: ${site.url}/sitemap.xml
`.trim();

	return new Response(robotsTxt, {
		headers: {
			"Cache-Control": "max-age=3600",
			"Content-Type": "text/plain",
		},
	});
}
