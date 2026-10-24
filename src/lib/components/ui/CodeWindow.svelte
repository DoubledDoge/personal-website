<script lang="ts">
import type { Snippet } from "svelte";

interface CodeWindowProps {
	children: Snippet;
	class?: string;
	filename: string;
	namespace?: string;
}

const {
	children,
	class: className = "",
	filename,
	namespace,
}: CodeWindowProps = $props();
</script>

<article class={["code-window", className]}>
	<header aria-hidden="true">
		{#if namespace}
			<span class="namespace"
				><span class="kw">namespace</span>
				DihanBritz.{namespace};</span
			>
		{/if}
		<span class="filename">{filename}</span>
	</header>

	<div class="code-content">
		{@render children()}
	</div>
</article>

<style>
.code-window {
	background-color: var(--card-colour);
	border: 1px solid var(--border-colour);
	border-radius: var(--radius-md);
	box-shadow: var(--shadow-md);
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

header {
	align-items: center;
	background-color: var(--bg-colour);
	border-bottom: 1px solid var(--border-colour);
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem 1rem;
	justify-content: space-between;
	min-width: 0;
	overflow-wrap: anywhere;
	padding: 0.75rem 1.5rem;
	font-family: var(--font-mono), monospace;
	font-size: 0.85rem;

	@media (max-width: 480px) {
		padding-inline: 1rem;
	}
}

.namespace {
	color: var(--text-colour);
	min-width: 0;
}

.filename {
	color: var(--text-muted);
	margin-left: auto;
}

.code-content {
	padding: 1.5rem;
	font-family: var(--font-mono), monospace;
	font-size: 0.95rem;
	line-height: 1.6;
	overflow-x: auto;
}
</style>
