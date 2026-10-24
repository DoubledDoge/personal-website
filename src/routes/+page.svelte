<script lang="ts">
import { Button, Card, Console, HeroImage, Resume, Stat, StatData } from "#lib";
import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import Bug from "~icons/lucide/bug";
import Calendar from "~icons/lucide/calendar";
import Coffee from "~icons/lucide/coffee";
import Download from "~icons/lucide/download";
import Mail from "~icons/lucide/mail";
import Play from "~icons/lucide/play";
import ShieldAlert from "~icons/lucide/shield-alert";

const runPortfolio = () => {
	goto(resolve("/projects"));
};

const iconMap = {
	Bug,
	Calendar,
	Coffee,
	ShieldAlert,
};
</script>

<section>
	<article>
		<header aria-hidden="true" class="boilerplate reveal">
			<p>
				<span class="kw">using</span>
				System;
			</p>

			<p>
				<span class="kw">using</span>
				Portfolio.Components;
			</p>
		</header>

		<div class="code-block">
			<p aria-hidden="true" class="boilerplate reveal">
				<span class="kw">public class</span>
				<span class="ty">Program</span>
				<span>&#123;</span>
			</p>

			<div class="indent">
				<div aria-hidden="true" class="codelens reveal">
					<button type="button" onclick={runPortfolio} tabindex="-1">
						<Play style="width: 10px;" />
						Run
					</button>
					<span>|</span>
					<span>Debug</span>
				</div>

				<p aria-hidden="true" class="boilerplate method-declaration reveal">
					<span class="kw">public static void</span>
					<span class="fn">Main</span><span>() &#123;</span>
				</p>

				<div class="indent">
					<p class="com reveal">// Initializing profile...</p>

					<h1 class="reveal">
						Hi, I'm
						<span class="gradient-text">"Dihan Britz"</span>;
					</h1>

					<p class="variable-declaration reveal" aria-hidden="true">
						<span class="ty">string</span>
						Location =
						<span class="str">"Cape Town, South Africa"</span>;
					</p>

					<p class="sr-only">Location: Cape Town, South Africa</p>

					<p class="com bio reveal">
						// Third Year Software Engineering Student <br />
						// Aspiring Full Stack .NET Engineer
					</p>
					<footer class="reveal">
						<Button href={Resume} icon={Download} variant="solid">
							Download CV
						</Button>

						<Button href={resolve("/contact")} icon={Mail} variant="outline">
							Contact Me
						</Button>
					</footer>

					<Card class="stats-row reveal">
						{#each StatData as stat}
							<Stat
								icon={iconMap[stat.icon as keyof typeof iconMap]}
								value={stat.value}
								label={stat.label}
							/>
						{/each}
					</Card>

					<Console />
				</div>

				<p aria-hidden="true" class="boilerplate reveal">&#125;</p>
			</div>
			<p aria-hidden="true" class="boilerplate reveal">&#125;</p>
		</div>
	</article>

	<aside>
		<enhanced:img
			alt="Dihan Britz"
			fetchpriority="high"
			loading="eager"
			src="{HeroImage}"
		/>
	</aside>
</section>

<style>
section {
	align-items: center;
	display: grid;
	gap: 6rem;
	isolation: isolate;
	margin: 0 auto;
	max-width: var(--max-width);
	min-height: calc(100vh - 4rem);
	overflow: hidden;
	padding: 4rem 6vw;
	position: relative;
	width: 100%;
	grid-template-columns: 1fr;
	grid-template-areas:
		"content"
		"image";

	@media (min-width: 768px) {
		padding: 6rem 8vw;
	}
}

article {
	grid-area: content;
	width: 100%;

	p {
		margin: 0;
	}
}

aside {
	align-items: center;
	display: flex;
	grid-area: image;
	justify-content: center;
	position: relative;
	width: 100%;

	& :global(img) {
		aspect-ratio: 2 / 3;
		background-color: var(--card-colour);
		border: 2px solid var(--border-colour);
		border-radius: var(--radius-lg);
		max-width: 450px;
		position: relative;
		width: 100%;
		z-index: var(--z-normal);
	}

	& :global(picture) {
		align-items: center;
		display: flex;
		justify-content: center;
		width: 100%;
	}
}

.gradient-text {
	background-image: linear-gradient(
		135deg,
		var(--primary-accent),
		oklch(from var(--primary-accent) calc(l + 0.08) c h)
	);
	background-clip: text;
	-webkit-background-clip: text;
	color: transparent;
	display: inline-block;
}

header {
	font-family: var(--font-mono), monospace;
	font-size: 0.9rem;
	margin-bottom: 1.5rem;
	--reveal-delay: 0s;
}

.code-block > p:first-child {
	--reveal-delay: 0.06s;
}

.codelens {
	align-items: center;
	color: var(--text-muted);
	display: flex;
	font-family: sans-serif;
	font-size: 0.75rem;
	gap: 0.5rem;
	margin-bottom: 0.2rem;
	user-select: none;
	--reveal-delay: 0.12s;

	button {
		align-items: center;
		background: none;
		border: none;
		color: inherit;
		cursor: pointer;
		display: flex;
		gap: 0.25rem;
		padding: 0;
		transition: color 0.2s;

		&:hover {
			color: var(--primary-accent);
		}
	}
}

.method-declaration {
	display: block;
	font-family: var(--font-mono), monospace;
	margin-bottom: 0.5rem;
	white-space: pre-wrap;
	--reveal-delay: 0.18s;
}

p.com:not(.bio) {
	--reveal-delay: 0.24s;
}

.code-block {
	color: var(--text-colour);
	font-family: var(--font-mono), monospace;
	font-size: 1rem;
	line-height: 1.6;
}

.indent {
	display: flex;
	flex-direction: column;
	padding-left: 2rem;
}

h1 {
	color: var(--text-colour);
	font-family: var(--font-family), system-ui;
	font-size: clamp(2.25rem, 4.5vw, 4rem);
	font-weight: 800;
	letter-spacing: -0.02em;
	margin: 2rem 0;
	--reveal-delay: 0.3s;
}

.variable-declaration {
	font-size: 1rem;
	margin-bottom: 3rem;
	--reveal-delay: 0.36s;
}

.bio {
	color: var(--comment-color);
	font-size: 1rem;
	line-height: 1.8;
	margin-bottom: 2rem;
	--reveal-delay: 0.42s;
}

footer {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1.5rem;
	margin-block: 3rem;
	max-width: 750px;
	width: 100%;
	--reveal-delay: 0.48s;
}

:global(.stats-row) {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	margin-bottom: 3rem;
	max-width: 750px;
	--reveal-delay: 0.54s;

	& :global(.stat) {
		border-inline-start: 1px solid var(--border-colour);
		padding-inline: 0.75rem;
	}

	& :global(.stat:first-child) {
		border-inline-start: none;
		padding-inline-start: 0;
	}

	@media (max-width: 640px) {
		grid-template-columns: repeat(2, 1fr);
		row-gap: 1rem;

		& :global(.stat:nth-child(odd)) {
			border-inline-start: none;
		}

		& :global(.stat:nth-child(n + 3)) {
			border-top: 1px solid var(--border-colour);
			padding-top: 0.75rem;
		}
	}
}

.indent > p.boilerplate:last-child {
	--reveal-delay: 0.66s;
}
.code-block > p:last-child {
	--reveal-delay: 0.72s;
}

/* Outranks Card's own padding (div.svelte-xyz). */
article :global(.stats-row) {
	padding: 1rem 1.25rem;
}

@media (min-width: 1024px) {
	section {
		grid-template-areas: "content image";
		grid-template-columns: 1.2fr 0.8fr;
		padding: 6rem 8vw;
	}

	aside {
		justify-content: flex-end;
	}
}
</style>
