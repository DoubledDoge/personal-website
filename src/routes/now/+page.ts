import { definePageMetaTags } from "svelte-meta-tags";
import type { PageLoad } from "./$types";

export const load: PageLoad = () =>
	definePageMetaTags({
		description: "What Dihan Britz is doing right now.",
		title: "Now",
	});
