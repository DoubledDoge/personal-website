<script lang="ts">
import { onMount } from "svelte";
import {
	Button,
	CodeWindow,
	ContactData,
	ContactPageData,
	PageHeader,
	StatusCard,
	toPascalCase,
} from "#lib";
import Check from "~icons/lucide/check";
import Copy from "~icons/lucide/copy";

const primaryEmail = ContactData.find(
	(contact) => contact.id === "primary-email",
);

let copied = $state(false);
let resetTimer: ReturnType<typeof setTimeout> | undefined;

const copyEmail = async (): Promise<void> => {
	if (!primaryEmail) return;

	try {
		await navigator.clipboard.writeText(primaryEmail.contactText);
	} catch {
		// No clipboard access (insecure context or denied): open the mail client instead.
		window.location.href = primaryEmail.link;
		return;
	}

	copied = true;
	clearTimeout(resetTimer);
	resetTimer = setTimeout(() => {
		copied = false;
	}, 2000);
};

onMount(() => () => clearTimeout(resetTimer));
</script>

<section class="page-grid page-grid--contact">
	<PageHeader
		title={ContactPageData.title}
		subtitle={ContactPageData.subtitle}
	/>

	<div class="reveal" style="--reveal-delay: 0.06s">
		<CodeWindow filename="ContactInfo.cs" namespace="Contact">
			<p class="boilerplate" aria-hidden="true">
				<span class="kw">public static class</span>
				<span class="ty">ContactInfo</span>
				&#123;
			</p>

			<ul class="indent">
				{#each ContactData as contact (contact.id)}
					<li>
						<span aria-hidden="true">
							<span class="kw">public const string</span>
							<span class="var">{toPascalCase(contact.header)}</span>
							=
						</span>
						<span class="sr-only">{contact.header}:</span>
						<a
							class="str"
							href={contact.link}
							target={contact.external ? "_blank" : undefined}
							rel={contact.external ? "noopener noreferrer" : undefined}
						>
							<span aria-hidden="true">"</span>{contact.contactText}
							<span aria-hidden="true">"</span>
							{#if contact.external}
								<span class="sr-only">(opens in a new tab)</span>
							{/if}
						</a><span aria-hidden="true">;</span>
					</li>
				{/each}
			</ul>

			<p class="boilerplate" aria-hidden="true">&#125;</p>
		</CodeWindow>
	</div>

	<aside class="sidebar reveal" style="--reveal-delay: 0.12s">
		<StatusCard status={ContactPageData.status} />

		{#if primaryEmail}
			<div class="copy">
				<Button
					class="full-width"
					icon={copied ? Check : Copy}
					onclick={copyEmail}
					variant="outline"
				>
					Copy email address
				</Button>
				<p class="com copy-status" aria-live="polite">
					{copied ? "// copied!" : ""}
				</p>
			</div>
		{/if}
	</aside>
</section>

<style>
.indent {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	list-style: none;
	margin: 1rem 0;
	padding-left: clamp(1rem, 3vw, 2rem);
}

li {
	overflow-wrap: anywhere;
}

a {
	border-bottom: 1px dashed transparent;
	text-decoration: none;
	transition:
		border-color 0.2s ease,
		color 0.2s ease;

	&:hover {
		border-bottom-color: var(--primary-accent);
		color: var(--primary-accent);
	}
}

.sidebar {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	:global(.full-width) {
		width: 100%;
	}
}

.copy {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.copy-status {
	font-family: var(--font-mono), monospace;
	font-size: 0.85rem;
	min-height: 1.5em;
	text-align: center;
}
</style>
