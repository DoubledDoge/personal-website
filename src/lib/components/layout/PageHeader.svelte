<script lang="ts">
interface Props {
	subtitle?: string;
	title: string;
}

let { subtitle, title }: Props = $props();
</script>

<header class="page-header reveal" style="--reveal-delay: 0s">
	<h1>{title}</h1>
	{#if subtitle}
		<p class="com"><span aria-hidden="true">//</span> {subtitle}</p>
	{/if}
</header>

<style>
.page-header {
	grid-column: 1 / -1;

	h1 {
		color: var(--primary-accent);
		font-family: var(--font-family), system-ui;
		font-size: clamp(2.25rem, 5vw, 3rem);
		line-height: 1.2;
		margin-bottom: 0.5rem;
	}

	p {
		font-family: var(--font-mono), monospace;
		font-size: 1.1rem;
	}
}
</style>
