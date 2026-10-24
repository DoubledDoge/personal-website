<script lang="ts">
import { toPascalCase } from "../../identifiers.ts";
import type { PageSection } from "../../types.ts";
import CodeSection from "../ui/CodeSection.svelte";
import PageHeader from "./PageHeader.svelte";

interface PageShellProps {
	sections: PageSection[];
	subtitle?: string;
	title: string;
}

const { sections, subtitle, title }: PageShellProps = $props();
</script>

<section class="page">
	<PageHeader {title} {subtitle} />

	<div class="content">
		{#each sections as section, i (`${section.kind}-${section.title}`)}
			<div class="reveal" style="--reveal-delay: {(i + 1) * 0.06}s">
				<CodeSection namespace={toPascalCase(title)} {section} />
			</div>
		{/each}
	</div>
</section>

<style>
.page {
	max-width: 1100px;
	width: 100%;
	margin: 0 auto;
	padding: clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem);
	min-height: 80vh;
}

.page :global(.code-content) {
	padding: clamp(1.25rem, 4vw, 3rem);
}

.page :global(.page-header) {
	margin-bottom: 3rem;
}

.content {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	grid-auto-flow: dense;
	align-items: start;
	gap: 2.5rem 3rem;
	margin-bottom: 3rem;
	font-family: var(--font-family), system-ui;
	color: var(--text-colour);
	line-height: 1.8;

	@media (min-width: 900px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
}
</style>
