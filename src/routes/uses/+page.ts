import { definePageMetaTags } from "svelte-meta-tags";
import type { PageLoad } from "./$types";

export const load: PageLoad = () =>
	definePageMetaTags({
		description: "Software and hardware Dihan Britz uses.",
		title: "Uses",
	});
