<script lang="ts">
import ThemeToggle from "#components/ui/ThemeToggle.svelte";
import { beforeNavigate } from "$app/navigation";
import { resolve } from "$app/paths";
import { page } from "$app/state";
import Menu from "~icons/lucide/menu";
import Close from "~icons/lucide/x";

interface NavLink {
	href: string;
	label: string;
	route: string;
}

const navLinks: NavLink[] = [
	{ href: resolve("/"), label: "~/Home.cs", route: "/" },
	{ href: resolve("/about"), label: "~/About.cs", route: "/about" },
	{ href: resolve("/projects"), label: "~/Projects.cs", route: "/projects" },
	{ href: resolve("/contact"), label: "~/Contact.cs", route: "/contact" },
];

const isCurrentRoute = (route: string): boolean =>
	route === "/"
		? page.route.id === "/"
		: (page.route.id?.startsWith(route) ?? false);

let mobileMenuOpen: boolean = $state(false);

const toggleMobileMenu = (): void => {
	mobileMenuOpen = !mobileMenuOpen;
};

beforeNavigate((): void => {
	mobileMenuOpen = false;
});
</script>

<header>
	<a
		aria-label="Branding logo"
		data-sveltekit-preload-data="hover"
		href={resolve("/")}
		title="Go to home"
	>
		<span class="kw">namespace</span>
		DihanBritz&semi;
	</a>

	<nav>
		<ul id="primary-navigation" data-state={mobileMenuOpen ? "open" : "closed"}>
			{#each navLinks as link (link.href)}
				<li>
					<a
						class="site-navigation-link"
						href={link.href}
						title={link.label}
						aria-current={isCurrentRoute(link.route) ? "page" : undefined}
						data-sveltekit-preload-data="hover"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<menu>
		<li>
			<ThemeToggle />
		</li>
		<li class="mobile-toggle">
			<button
				aria-controls="primary-navigation"
				aria-expanded={mobileMenuOpen}
				aria-label={mobileMenuOpen
					? "Close navigation menu"
					: "Open navigation menu"}
				onclick={toggleMobileMenu}
				type="button"
			>
				{#if mobileMenuOpen}
					<Close />
				{:else}
					<Menu />
				{/if}
			</button>
		</li>
	</menu>
</header>

<style>
header {
	background-color: var(--bg-colour);
	border-bottom: 1px solid var(--border-colour);
	position: sticky;
	top: 0;
	z-index: var(--z-sticky);
	view-transition-name: --persist-nav;

	> a {
		color: var(--text-colour);
		font-weight: bold;
		font-size: 1.125rem;
		z-index: 51;
		white-space: nowrap;
	}
}

menu {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	z-index: 51;
	padding: 0;
	margin: 0;
}

@media (max-width: 767px) {
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 4rem;
		padding: 1rem;
	}

	.mobile-toggle button {
		display: flex;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		color: var(--text-colour);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		text-align: center;
		font-size: 1.25rem;
		position: fixed;
		inset: 0;
		top: 4rem;
		background-color: var(--bg-colour);
		justify-content: center;
		padding: 2rem 0 0;
		transition:
			transform 0.3s ease-in-out,
			opacity 0.3s ease;
		transform: translateX(100%);
		opacity: 0;
		visibility: hidden;

		&[data-state="open"] {
			transform: translateX(0);
			opacity: 1;
			visibility: visible;
		}
	}
}

@media (min-width: 768px) {
	nav {
		display: contents;
	}

	header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: clamp(0.5rem, 2vw, 2rem);
		padding-inline: 2rem;
		height: var(--header-height);
		align-items: center;

		& > a {
			justify-self: start;
		}
	}

	menu {
		justify-self: end;
	}

	.mobile-toggle {
		display: none;
	}

	ul {
		display: flex;
		flex-direction: row;
		gap: clamp(1rem, 2.5vw, 2rem);
		font-size: 1rem;
		grid-column: 2;
		justify-self: center;
	}
}
</style>
