import { definePageMetaTags } from "svelte-meta-tags";
import type { PageLoad } from "./$types";

export const load: PageLoad = () =>
	definePageMetaTags({
		description:
			"About Dihan Britz: a Bachelor of IT student at Eduvos specialising in software engineering, working with C#, .NET, Java, Android and SQL.",
		title: "About Me",
	});
