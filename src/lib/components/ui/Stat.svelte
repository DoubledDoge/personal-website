<script lang="ts">
import type { Component } from "svelte";

interface Props {
	value: string | number;
	label: string;
	icon?: Component;
}

const { value, label, icon: Icon }: Props = $props();
</script>

<div class="stat">
	<p class="value" aria-hidden="true">
		{#if Icon}
			<Icon aria-hidden="true" class="icon" />
		{/if}
		<span class="num">{value}</span>
	</p>

	<p class="caption" aria-hidden="true">{label}</p>
	<p class="sr-only">{label}: {value}</p>
</div>

<style>
.stat {
	align-items: center;
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	text-align: center;
}

.stat :global(.icon) {
	color: var(--primary-accent);
	flex-shrink: 0;
	height: 1rem;
	width: 1rem;
}

.value {
	align-items: center;
	display: inline-flex;
	font-family: var(--font-mono), monospace;
	font-size: clamp(1.25rem, 2.5vw, 1.5rem);
	font-weight: 700;
	gap: 0.4rem;
	line-height: 1.1;
}

.value .num {
	color: var(--number-color);
}

.caption {
	color: var(--text-muted);
	font-size: 0.75rem;
}
</style>
