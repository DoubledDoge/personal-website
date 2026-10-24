<script lang="ts">
import type { Component } from "svelte";

interface Props {
	name: string;
	icon?: Component;
}

const { name, icon: Icon }: Props = $props();
</script>

<div>
	{#if Icon}
		<span class="icon">
			<Icon />
		</span>
	{/if}
	<span class="name">{name}</span>
</div>

<style>
div {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.4rem 0.8rem;
	background-color: var(--card-colour);
	border: 1px solid var(--border-colour);
	border-radius: 2rem;
	font-size: 0.9rem;
	color: var(--text-colour);
	transition:
		border-color 0.2s ease,
		color 0.2s ease,
		transform 0.2s ease;
	user-select: none;

	&:hover {
		border-color: var(--primary-accent);
		color: var(--primary-accent);
	}
}

.icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 1.1em;
	height: 1.1em;
}
</style>
