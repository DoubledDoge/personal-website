<script lang="ts">
import {
	Card,
	PageHeader,
	ProjectData,
	ProjectsPageData,
	toCamelCase,
} from "#lib";
import { asset } from "$app/paths";
import type { AssetPath } from "$app/types";
import Github from "~icons/lucide/github";
import Globe from "~icons/lucide/globe";
</script>

<section>
	<PageHeader {...ProjectsPageData} />

	<div class="project-list">
		<p class="collection" aria-hidden="true">
			<span class="ty">List</span>&lt;<span class="ty">Project</span>&gt;
			<span class="var">projects</span>
			= [
		</p>
		<ul>
			{#each ProjectData as project, i (project.id)}
				<li style="--reveal-delay: {(i + 1) * 0.06}s">
					<Card class="project-card reveal" href={project.gitURL} external>
						<div class="hover-overlay" aria-hidden="true">
							<a class="icon-button" href={project.gitURL}>
								<Github />
							</a>

							{#if project.webURL}
								<a class="icon-button" href={project.webURL}>
									<Globe />
								</a>
							{/if}
						</div>

						{#if project.image}
							<picture>
								<img
									src={asset(`projects/${project.image}` as AssetPath)}
									alt={project.imageAlt ?? `Screenshot of ${project.title}`}
									loading="lazy"
								/>
							</picture>
						{/if}

						<div class="content">
							<h2 class="sr-only">{project.title}</h2>
							<p class="declaration" aria-hidden="true">
								<span class="ty">Project</span>
								<span class="var">{toCamelCase(project.id)}</span>
								= <span class="kw">new</span>()
							</p>

							<p class="com">
								<span aria-hidden="true">//</span>
								{project.description}
							</p>

							<ul class="tags" aria-label="Technologies">
								{#each project.technologies as tech (tech)}
									<li>{tech}</li>
								{/each}
							</ul>

							<span class="sr-only"
								>(opens the GitHub repository in a new tab)</span
							>
						</div>
					</Card>
				</li>
			{/each}
		</ul>
		<p class="collection" aria-hidden="true">];</p>
	</div>
</section>

<style>
section {
	display: flex;
	flex-direction: column;
	gap: 3rem;
	padding: clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem);
	max-width: var(--max-width);
	width: 100%;
	margin: 0 auto;
}

.project-list {
	display: flex;
	flex-direction: column;
	font-family: var(--font-mono), monospace;
	gap: 0.75rem;
}

.collection {
	margin: 0;
	overflow-wrap: anywhere;
}

.project-list > ul {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: 2rem;
	list-style: none;
	margin: 0;
	padding: 0;

	@media (min-width: 700px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (min-width: 1100px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
}

.hover-overlay {
	position: absolute;
	inset: 0;
	background-color: color-mix(in oklch, var(--bg-colour) 70%, transparent);
	backdrop-filter: blur(4px);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	z-index: 10;
	transition: opacity 0.3s ease;
}

.icon-button {
	background-color: var(--bg-colour);
	color: var(--text-colour);
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px solid var(--border-colour);
	transition:
		transform 0.2s ease,
		background-color 0.2s ease,
		color 0.2s ease,
		border-color 0.2s ease;
	box-shadow: var(--shadow-md);

	& :global(svg) {
		width: 2rem;
		height: 2rem;
	}
}

/* Outranks Card's own `a` styles (a.svelte-xyz). */
.project-list > ul :global(.project-card) {
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
	padding: 0;
	position: relative;
	transition:
		opacity 0.45s ease var(--reveal-delay, 0s),
		translate 0.45s ease var(--reveal-delay, 0s),
		transform 0.3s ease,
		border-color 0.3s ease,
		box-shadow 0.3s ease;

	&:hover,
	&:focus-visible {
		transform: translateY(-5px);
		border-color: var(--primary-accent);
		box-shadow: var(--shadow-md);

		.hover-overlay {
			opacity: 1;
		}

		.icon-button {
			border-color: var(--primary-accent);
		}

		.icon-button:hover {
			background-color: var(--primary-accent);
			color: var(--bg-colour);
			transform: scale(1.1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;

		&:hover,
		&:focus-visible {
			transform: none;
		}
	}
}

picture {
	width: 100%;
	aspect-ratio: 16 / 9;
	background-color: var(--bg-colour);
	border-bottom: 1px solid var(--border-colour);
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

.content {
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	flex: 1;
	font-family: var(--font-mono), monospace;
	font-size: 0.95rem;

	.declaration {
		margin-bottom: 1rem;
		font-size: 0.9rem;
		overflow-wrap: anywhere;
	}

	.com {
		line-height: 1.6;
		margin-bottom: 1.5rem;
		font-family: var(--font-family), sans-serif;
	}
}

.tags {
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
	list-style: none;
	margin-top: auto;
	padding: 0;

	li {
		font-family: var(--font-family), monospace;
		font-size: 0.75rem;
		background: color-mix(in oklch, var(--primary-accent) 15%, transparent);
		color: var(--primary-accent);
		padding: 0.25rem 0.6rem;
		border-radius: var(--radius-sm);
		font-weight: 600;
	}
}
</style>
