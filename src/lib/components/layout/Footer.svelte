<script lang="ts">
import { ContactData } from "#data/index.ts";
import { resolve } from "$app/paths";
import { page } from "$app/state";
import Github from "~icons/lucide/github";
import Linkedin from "~icons/lucide/linkedin";
import Mail from "~icons/lucide/mail";

const socialIcons = { github: Github, linkedin: Linkedin } as const;
type SocialIcon = keyof typeof socialIcons;

const socialOrder: readonly SocialIcon[] = ["github", "linkedin"];

const socials = socialOrder.flatMap((icon) =>
	ContactData.filter(
		(contact) => contact.type === "social" && contact.id === icon,
	).map((contact) => ({ ...contact, Icon: socialIcons[icon] })),
);

const buildDate = new Date(__BUILD_DATE__).toLocaleDateString("en-GB", {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
});

const pageLinks = [
	{ href: resolve("/now"), label: "~/Now.cs", route: "/now" },
	{ href: resolve("/uses"), label: "~/Uses.cs", route: "/uses" },
	{ href: resolve("/colophon"), label: "~/Colophon.cs", route: "/colophon" },
];
</script>

<footer>
	<p aria-hidden="true">
		<span class="kw">public readonly</span>
		<span class="ty">DateTime</span>
		LastUpdated =
		<span class="str">"{buildDate}"</span>;
	</p>

	<nav aria-label="Footer links" class="page-links">
		<ul>
			{#each pageLinks as link (link.href)}
				<li>
					<a
						class="site-navigation-link"
						href={link.href}
						aria-current={page.route.id === link.route ? "page" : undefined}
						data-sveltekit-preload-data="hover"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<nav aria-label="Social links" class="social-links">
		<ul>
			{#each socials as { header, id, Icon, link } (id)}
				<li>
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="{header} Profile"
					>
						<Icon />
					</a>
				</li>
			{/each}
			<li>
				<a href={resolve("/contact")} aria-label="Email Me">
					<Mail />
				</a>
			</li>
		</ul>
	</nav>
</footer>

<style>
footer {
	width: 100%;
	background-color: var(--bg-colour);
	border-top: 1px solid var(--border-colour);
	padding: 2rem 1rem;
	margin: auto auto 0;
	max-width: var(--max-width);
	display: flex;
	flex-direction: column;
	gap: 2rem;
	align-items: center;
	text-align: center;

	@media (min-width: 768px) {
		flex-direction: row;
		justify-content: space-between;
		text-align: left;
		padding-inline: 2rem;
	}
}

p {
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
	font-family: var(--font-mono), monospace;
	font-size: clamp(0.75rem, 1.5vw, 0.9rem);
	color: var(--text-muted);
	transition: color 0.3s ease;
}

ul {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1.5rem;
	list-style: none;
	padding: 0;
}

.page-links a {
	font-size: 0.9rem;
}

.social-links a {
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--text-muted);
	transition:
		color 0.2s ease,
		transform 0.2s ease;

	&:hover {
		color: var(--primary-accent);
		transform: translateY(-2px);
	}
}

.social-links :global(svg) {
	width: 1.5rem;
	height: 1.5rem;
}
</style>
