<script lang="ts">
import { onDestroy, onMount } from "svelte";
import { ConsoleData } from "#data/index.ts";

interface ConsoleLine {
	id: number;
	text: string;
	color?: string;
}

const JITTER_MAX = 30;
const JITTER_MIN = 10;
const DEFAULT_COLOR = "inherit";
const INITIAL_DELAY = 800;

type SequenceItem = (typeof ConsoleData)[number];

const displayedLines = $state<ConsoleLine[]>([]);
let currentLineText = $state("");
let currentLineColor = $state("");
let isTyping = $state(true);
let destroyed = $state(false);

async function typeWriter(text: string) {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		currentLineText = text;
		return;
	}

	for (const char of text) {
		if (destroyed) return;

		currentLineText += char;
		const jitter = Math.random() * JITTER_MAX + JITTER_MIN;
		await new Promise((resolve) => setTimeout(resolve, jitter));
	}
}

async function processLine(line: SequenceItem, index: number) {
	currentLineColor = line.color || DEFAULT_COLOR;

	if (line.text.startsWith(">")) {
		await typeWriter(line.text);
	} else {
		currentLineText = line.text;
	}

	displayedLines.push({
		color: currentLineColor,
		id: index,
		text: currentLineText,
	});
	currentLineText = "";

	if (line.delay) {
		await new Promise((resolve) => setTimeout(resolve, line.delay));
	}
}

async function processAllLines() {
	for (const [lineIndex, line] of ConsoleData.entries()) {
		await processLine(line, lineIndex);
	}
}

async function processSequence() {
	await new Promise((resolve) => setTimeout(resolve, INITIAL_DELAY));
	await processAllLines();
	isTyping = false;
}

onDestroy(() => {
	destroyed = true;
});

onMount(processSequence);
</script>

<figure class="reveal" style="--reveal-delay: 0.6s; --reveal-duration: 0.5s">
	<figcaption>
		<div class="dots">
			<span style="background-color: oklch(65% 0.2 25deg);"></span>
			<span style="background-color: oklch(80% 0.15 90deg);"></span>
			<span style="background-color: oklch(75% 0.18 145deg);"></span>
		</div>

		<span class="title">TERMINAL</span>
	</figcaption>

	<div aria-live="polite" class="terminal-body" role="log">
		{#each displayedLines as line (line.id)}
			<div class="line">
				<code style:color={line.color}>{line.text}</code>
			</div>
		{/each}

		{#if isTyping}
			<div class="line active" aria-hidden="true">
				<code style:color={currentLineColor}>
					{currentLineText}<span class="cursor"></span>
				</code>
			</div>
		{/if}

		{#if !isTyping}
			<div class="line input-line">
				<code>
					<span style="color: var(--text-colour);">~/portfolio</span>
					<span class="prompt-arrow">&gt;</span>
					<span
						class="cursor"
						style="animation: blink 1s step-end infinite;"
					></span>
				</code>
			</div>
		{/if}
	</div>

	<div class="status-bar" aria-hidden="true">
		<span>UTF-8</span>
		<span>main</span>
		<span>C#</span>
		<span>Ln 7, Col 12</span>
	</div>
</figure>

<style>
figure {
	margin: 0;
	background-color: var(--card-colour);
	border-radius: var(--radius-md);
	border: 1px solid var(--border-colour);
	font-family: var(--font-mono), monospace;
	overflow: hidden;
	box-shadow: var(--shadow-md);
	width: 100%;
	font-size: 0.85rem;
	line-height: 1.4;
}

code {
	font-family: inherit;
	background: transparent;
}

figcaption {
	background-color: var(--bg-colour);
	padding: 0.5rem 1rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	border-bottom: 1px solid var(--border-colour);
}

.title {
	margin-right: auto;
	color: var(--text-muted);
	font-size: 0.75rem;
	font-weight: 600;
	opacity: 0.7;
}

.dots {
	display: flex;
	gap: 0.4rem;

	> span {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 50%;
	}
}

.terminal-body {
	padding: 1rem;
	display: flex;
	flex-direction: column;
	min-height: 180px;
	align-items: flex-start;
}

.line {
	word-break: break-all;
	color: var(--text-colour);
}

.prompt-arrow {
	color: var(--primary-accent);
	font-weight: bold;
}

.cursor {
	display: inline-block;
	width: 0.6em;
	height: 1.1em;
	background-color: var(--text-colour);
	vertical-align: sub;
	margin-left: 4px;
}

.status-bar {
	display: flex;
	gap: 1rem;
	padding: 0.35rem 1rem;
	background-color: var(--primary-accent);
	color: oklch(15% 0 0);
	font-size: 0.7rem;
	font-family: var(--font-mono), monospace;
	border-radius: 0 0 var(--radius-md) var(--radius-md);
}
</style>
