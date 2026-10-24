import { definePageMetaTags } from "svelte-meta-tags";
import type { PageLoad } from "./$types";

export const load: PageLoad = () =>
	definePageMetaTags({
		description:
			"Projects by Dihan Britz, from a Java Android travel app to C# libraries, console tools and a SQL Server desktop application.",
		title: "Projects",
	});
