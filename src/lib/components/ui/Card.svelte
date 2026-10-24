<script lang="ts">
import type { Snippet } from "svelte";

interface CardProps {
	children?: Snippet;
	class?: string;
	external?: boolean;
	href?: string;
}

const {
	children,
	class: className = "",
	external = false,
	href,
}: CardProps = $props();

const tag = $derived(href ? "a" : "div");
</script>

<svelte:element
	this={tag}
	class={className}
	{href}
	target={href && external ? "_blank" : undefined}
	rel={href && external ? "noopener noreferrer" : undefined}
>
	{@render children?.()}
</svelte:element>

<style>
div,
a {
	background-color: var(--card-colour);
	border: 1px solid var(--border-colour);
	border-radius: var(--radius-md);
	padding: 1.5rem;
	box-shadow: var(--shadow-md);
	transition:
		transform 0.2s,
		border-color 0.2s;
	color: inherit;
	font: inherit;
	text-align: inherit;
	text-decoration: none;
	width: 100%;
}
</style>
