import { definePageMetaTags } from "svelte-meta-tags";
import { site } from "#lib/site.ts";
import type { PageLoad } from "./$types";

export const load: PageLoad = () =>
	definePageMetaTags({
		description: site.description,
		title: "Home",
	});
