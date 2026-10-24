<script lang="ts">
import { onMount } from "svelte";
import { fly } from "svelte/transition";
import Moon from "~icons/lucide/moon";
import Sun from "~icons/lucide/sun";

type Theme = "light" | "dark";
let theme = $state<Theme | undefined>(undefined);
let reduceMotion = $state(false);

function toggleTheme() {
	const current = theme ?? "light";
	const newTheme = current === "light" ? "dark" : "light";
	theme = newTheme;
	localStorage.setItem("theme", newTheme);
	document.documentElement.setAttribute("data-theme", newTheme);
}

onMount(() => {
	reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const currentAttr = document.documentElement.getAttribute("data-theme");
	if (currentAttr === "dark" || currentAttr === "light") {
		theme = currentAttr;
	} else {
		theme = window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	}
});
</script>

<button
	type="button"
	aria-label="Toggle theme"
	class="theme-toggle"
	onclick={toggleTheme}
	title="Toggle theme"
>
	{#if theme === "light"}
		<span
			class="icon-wrapper"
			in:fly={{ y: -8, duration: reduceMotion ? 0 : 300 }}
			out:fly={{ y: 8, duration: reduceMotion ? 0 : 300 }}
		>
			<Sun />
		</span>
	{:else if theme === "dark"}
		<span
			class="icon-wrapper"
			in:fly={{ y: -8, duration: reduceMotion ? 0 : 300 }}
			out:fly={{ y: 8, duration: reduceMotion ? 0 : 300 }}
		>
			<Moon />
		</span>
	{:else}
		<div class="placeholder"></div>
	{/if}
</button>

<style>
button {
	align-items: center;
	background-color: transparent;
	border: 1px solid transparent;
	border-radius: var(--radius-md);
	color: var(--text-colour);
	cursor: pointer;
	display: flex;
	justify-content: center;
	min-height: 2.5rem;
	min-width: 2.5rem;
	padding: 0.5rem;
	transition:
		background-color 0.3s ease,
		border-color 0.3s ease;

	&:hover {
		background-color: var(--card-hover-colour);
		border-color: var(--border-colour);
	}

	&:focus-visible {
		outline: 2px solid var(--primary-accent);
		outline-offset: 2px;
	}

	:global(svg) {
		height: 1.25rem;
		stroke-width: 2px;
		width: 1.25rem;
	}
}

.placeholder {
	width: 1.25rem;
	height: 1.25rem;
}

.icon-wrapper {
	display: flex;
}
</style>
