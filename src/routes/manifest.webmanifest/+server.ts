import { site } from "#lib/site.ts";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = ({ url }) => {
	const scope: string = new URL(".", url).pathname;

	const manifest = {
		background_color: site.themeColour.dark,
		description: site.description,
		display: "standalone",
		icons: [
			{
				purpose: "any",
				sizes: "any",
				src: `${scope}favicon.svg`,
				type: "image/svg+xml",
			},
		],
		lang: "en-ZA",
		name: site.name,
		scope,
		short_name: site.name,
		start_url: scope,
		theme_color: site.themeColour.dark,
	};

	return new Response(JSON.stringify(manifest, null, "\t"), {
		headers: {
			"Cache-Control": "max-age=3600",
			"Content-Type": "application/manifest+json",
		},
	});
};
