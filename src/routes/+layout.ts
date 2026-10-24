import { defineBaseMetaTags } from "svelte-meta-tags";
import { absoluteUrl, site } from "#lib/site.ts";
import type { LayoutLoad } from "./$types";

export const prerender = true;
export const ssr = true;
export const trailingSlash = "never";
export const csr = true;

export const load: LayoutLoad = ({ route }) => {
	const url: string = absoluteUrl(route.id ?? "/");
	const image: string = absoluteUrl(site.previewImage);
	const imageAlt = `Preview of ${site.name}'s personal website`;

	return defineBaseMetaTags({
		additionalMetaTags: [
			{
				content: "strict-origin-when-cross-origin",
				name: "referrer",
			},
			{
				content: site.name,
				name: "application-name",
			},
		],
		additionalRobotsProps: {
			maxImagePreview: "standard",
			maxSnippet: -1,
			maxVideoPreview: -1,
		},
		canonical: url,
		description: site.description,
		openGraph: {
			images: [{ alt: imageAlt, url: image }],
			locale: "en_ZA",
			siteName: site.name,
			type: "website",
			url,
		},
		robots: "index,follow",
		titleTemplate: `%s | ${site.name}`,
		twitter: {
			cardType: "summary_large_image",
			image,
			imageAlt,
		},
	});
};
