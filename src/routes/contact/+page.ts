import { definePageMetaTags } from "svelte-meta-tags";
import type { PageLoad } from "./$types";

export const load: PageLoad = () =>
	definePageMetaTags({
		description:
			"Get in touch with Dihan Britz by email, phone, LinkedIn or GitHub.",
		title: "Contact Me",
	});
