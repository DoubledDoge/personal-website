<script lang="ts">
import { onDestroy, onMount } from "svelte";
import type { StatusEntry } from "../../types.ts";
import CodeWindow from "./CodeWindow.svelte";

interface Props {
	status: readonly StatusEntry[];
}

let { status }: Props = $props();

let currentTime = $state(formatSastTime());
let timer: ReturnType<typeof setInterval>;

const statusWithTime = $derived(
	status.map((entry) =>
		entry.name === "CurrentTime" ? { ...entry, value: currentTime } : entry,
	),
);

function formatSastTime(): string {
	const now = new Date();
	const utc = now.getTime() + now.getTimezoneOffset() * 60000;
	const sast = new Date(utc + 2 * 3600000);
	const hours = sast.getHours().toString().padStart(2, "0");
	const minutes = sast.getMinutes().toString().padStart(2, "0");

	return `${hours}:${minutes}`;
}

onMount(() => {
	timer = setInterval(() => {
		currentTime = formatSastTime();
	}, 60000);
});

onDestroy(() => {
	clearInterval(timer);
});
</script>

<CodeWindow namespace="Contact" filename="Status.cs">
	<h2 class="sr-only">Status</h2>
	<div class="status-code" aria-hidden="true">
		<p>
			<span class="ty">Status</span> <span class="var">status</span> =
			<span class="kw">new</span>() &#123;
		</p>

		{#each statusWithTime as entry (entry.name)}
			<p class="indent">
				<span class="var">{entry.name}</span>
				=
				{#if typeof entry.value === "string"}
					<span class="str">"{entry.value}"</span>
				{:else}
					<span class="kw">{entry.value}</span>
				{/if}
				,
			</p>
		{/each}
		<p>&#125;;</p>
	</div>

	<dl class="sr-only">
		{#each statusWithTime as entry (entry.name)}
			<div>
				<dt>{entry.label}</dt>
				<dd>{entry.value}</dd>
			</div>
		{/each}
	</dl>
</CodeWindow>

<style>
.status-code {
	font-family: var(--font-mono), monospace;
	text-wrap: pretty;

	p {
		margin: 0 0 0.5rem;
		overflow-wrap: anywhere;
	}

	.indent {
		padding-left: 1.25rem;
	}
}
</style>
