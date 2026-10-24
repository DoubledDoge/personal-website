<script lang="ts">
import type { Snippet } from "svelte";
import { deepMerge, JsonLd, MetaTags } from "svelte-meta-tags";
import {
	Backdrop,
	Footer,
	InterFontUrl,
	JetBrainsMonoFontUrl,
	Navbar,
} from "#lib";
import { personSchema, site } from "#lib/site.ts";
import { onNavigate } from "$app/navigation";
import { asset, resolve } from "$app/paths";
import { page } from "$app/state";
import "#styles/main.css";

const { children }: { children: Snippet } = $props();

const metaTags = $derived(
	deepMerge(page.data.baseMetaTags, page.data.pageMetaTags),
);

onNavigate((navigation) => {
	if (
		!document.startViewTransition ||
		window.matchMedia("(prefers-reduced-motion: reduce)").matches
	) {
		return;
	}

	return new Promise<void>((resolveNavigation) => {
		document.startViewTransition(async () => {
			resolveNavigation();
			await navigation.complete;
		});
	});
});
</script>

<svelte:head>
	<meta
		content={site.themeColour.light}
		media="(prefers-color-scheme: light)"
		name="theme-color"
	/>
	<meta
		content={site.themeColour.dark}
		media="(prefers-color-scheme: dark)"
		name="theme-color"
	/>
	<link href={asset("favicon.svg")} rel="icon" type="image/svg+xml" />
	<link href={resolve("/manifest.webmanifest")} rel="manifest" />
	<link
		as="font"
		crossorigin="anonymous"
		href={InterFontUrl}
		rel="preload"
		type="font/woff2"
	/>
	<link
		as="font"
		crossorigin="anonymous"
		href={JetBrainsMonoFontUrl}
		rel="preload"
		type="font/woff2"
	/>
</svelte:head>

<MetaTags {...metaTags} />
<JsonLd output="head" schema={personSchema} />

<a class="skip-link" href="#main-content">Skip to main content</a>

<Backdrop />
<Navbar />

<main id="main-content">
	{@render children?.()}
</main>

<Footer />

<style>
main {
	display: flex;
	flex: 1;
	flex-direction: column;
	width: 100%;
}
</style>
