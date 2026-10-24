<!--suppress CssUnusedSymbol -->
<script lang="ts">
import type { Component, Snippet } from "svelte";
import type {
	HTMLAnchorAttributes,
	HTMLButtonAttributes,
} from "svelte/elements";

type Props = (HTMLAnchorAttributes & HTMLButtonAttributes) & {
	variant?: "solid" | "outline";
	class?: string;
	children: Snippet;
	icon?: Component;
};

const {
	variant = "solid",
	class: className = "",
	children,
	icon: Icon,
	href,
	onclick,
	...rest
}: Props = $props();
</script>

<svelte:element
	this={href ? "a" : "button"}
	class="{variant} {className}"
	{href}
	{onclick}
	role={href ? undefined : "button"}
	type={href ? undefined : (rest.type ?? "button")}
	{...rest}
>
	{#if Icon}
		<span class="icon">
			<Icon />
		</span>
	{/if}

	{@render children()}
</svelte:element>

<style>
button,
a {
	align-items: center;
	border: 2px solid transparent;
	border-radius: var(--radius-md);
	cursor: pointer;
	display: inline-flex;
	font-size: 1rem;
	font-weight: 600;
	gap: 0.75rem;
	justify-content: center;
	line-height: 1;
	padding: 0.75rem 1.5rem;
	text-decoration: none;
	transition: all 0.2s ease;
}

.solid {
	background: var(--primary-accent);
	color: var(--bg-colour);
	transition: transform 0.2s ease;

	&:hover {
		transform: translateY(-2px);
	}

	&:focus-visible {
		outline: 2px solid var(--primary-accent);
	}
}

.outline {
	background-color: transparent;
	border-color: var(--primary-accent);
	color: var(--text-colour);

	&:hover {
		background-color: var(--primary-transparent);
	}

	&:focus-visible {
		outline: 2px solid var(--primary-accent);
	}
}

.icon {
	display: flex;
	height: 1.25em;
	width: 1.25em;
}
</style>
