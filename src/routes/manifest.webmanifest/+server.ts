import { site } from "#lib/site.ts";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = ({ url }) => {
	const _scope: string = new URL(".", url).pathname;

	const manifest = {
		background_color: site.themeColour.dark,
		description: site.description,
		display: "standalone",
		icons: [
			{
				purpose: "any",
				sizes: "192x192",
				src: `icon-192.png`,
				type: "image/png",
			},
		],
		lang: "en-ZA",
		name: site.name,
		scope: "./",
		short_name: site.name,
		start_url: "./",
		theme_color: site.themeColour.dark,
	};

	return new Response(JSON.stringify(manifest, null, "\t"), {
		headers: {
			"Cache-Control": "max-age=3600",
			"Content-Type": "application/manifest+json",
		},
	});
};
