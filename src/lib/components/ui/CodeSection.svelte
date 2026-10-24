<script lang="ts">
import { toPascalCase } from "#lib";
import type { PageSection } from "../../types.ts";
import CodeWindow from "./CodeWindow.svelte";

interface Props {
	namespace: string;
	section: PageSection;
}

let { namespace, section }: Props = $props();
</script>

<section>
	<CodeWindow filename={`${toPascalCase(section.title)}.cs`} {namespace}>
		<h2 class="sr-only">{section.title}</h2>
		{#if section.kind === "list"}
			<div class="code" aria-hidden="true">
				<p>
					<span class="kw">public string[]</span>
					<span class="var">{toPascalCase(section.title)}</span>
					= [
				</p>
				{#each section.items as item (item)}
					<p class="indent"><span class="str">"{item}"</span>,</p>
				{/each}
				<p>];</p>
			</div>
			<ul class="sr-only">
				{#each section.items as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
		{:else if section.kind === "object"}
			<div class="code" aria-hidden="true">
				<p>
					<span class="kw">public</span>
					<span class="ty">Setup</span>
					<span class="var">{toPascalCase(section.title)}</span>
					=
					<span class="kw">new</span>() &#123;
				</p>
				{#each section.entries as entry (entry.name)}
					<p class="indent">
						<span class="var">{toPascalCase(entry.name)}</span>
						=
						<span class="str">"{entry.value}"</span>,
					</p>
				{/each}
				<p>&#125;;</p>
			</div>
			<dl class="sr-only">
				{#each section.entries as entry (entry.name)}
					<div>
						<dt>{entry.name}</dt>
						<dd>{entry.value}</dd>
					</div>
				{/each}
			</dl>
		{:else}
			<div class="code" aria-hidden="true">
				<p>
					<span class="kw">public const string</span>
					<span class="var">{toPascalCase(section.title)}</span>
					=
					<span class="str">"""</span>
				</p>
				<p class="indent text">{section.text}</p>
				<p><span class="str">"""</span>;</p>
			</div>
			<p class="sr-only">{section.text}</p>
		{/if}
	</CodeWindow>
</section>

<style>
section {
	min-width: 0;
}

.code {
	font-family: var(--font-mono), monospace;
	text-wrap: pretty;
}

.code p {
	margin: 0 0 0.5rem;
	overflow-wrap: anywhere;
}

.indent {
	padding-left: 1.5rem;
}

.text {
	white-space: pre-wrap;
}

dl {
	display: grid;
	gap: 0.5rem;
}

dt {
	font-weight: 600;
}
</style>
