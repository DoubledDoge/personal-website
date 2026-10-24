import { definePageMetaTags } from "svelte-meta-tags";
import type { PageLoad } from "./$types";

export const load: PageLoad = () =>
	definePageMetaTags({
		description: "How this website was built.",
		title: "Colophon",
	});
